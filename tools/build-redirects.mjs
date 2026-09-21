#!/usr/bin/env node
//
// Writes the 378 redirects the site has accumulated over the years.
//
// Astro's `redirects` config would emit these too, but it wants them in the
// config file and they are data, not configuration. They are also relative
// ("../" from the old path), which has to be resolved before anything can
// use them.
//
// Each one becomes a small HTML page with a meta refresh and a canonical
// link, which is what GitHub Pages can serve - it has no redirect rules.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://rumkin.com';

const redirects = JSON.parse(
    await readFile(new URL('./redirects.json', import.meta.url), 'utf8')
);

const page = (target) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body>
<p>This page has moved to <a href="${target}">${target}</a>.</p>
</body>
</html>
`;

// Resolve every target first, so a chain can be followed before anything
// is reported as a dead end. Several of these hop twice.
const targets = new Map();
for (const [from, to] of Object.entries(redirects)) {
    targets.set(`/${from}`, new URL(to, `${SITE}/${from}`).href.replace(SITE, ''));
}

/** Follow a chain of redirects to whatever it finally points at. */
const settle = (start) => {
    let at = start;
    for (let hops = 0; hops < 10; hops += 1) {
        const next = targets.get(at) ?? targets.get(`${at}index.html`);
        if (!next || next === at) return at;
        at = next;
    }
    return at;
};

let written = 0;
let skipped = 0;
const missing = [];

for (const [from, to] of Object.entries(redirects)) {
    const source = `/${from}`;

    // Resolve the target against the old location, so "../" means what it
    // meant when it was written.
    const target = new URL(to, `${SITE}${source}`).href.replace(SITE, '');
    const destination = join('dist', from);

    // A redirect must never shadow a real page.
    if (existsSync(destination)) {
        skipped += 1;
        continue;
    }

    // Warn only when the end of the chain is not a real page.
    const settled = settle(source);
    const settledFile = settled.endsWith('/')
        ? join('dist', settled, 'index.html')
        : join('dist', settled);
    if (!settled.startsWith('http') && !existsSync(settledFile)) {
        missing.push(`${source} -> ${settled}`);
    }

    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, page(target));
    written += 1;
}

console.log(
    `Wrote ${written} redirect(s).` +
        (skipped ? ` ${skipped} skipped; a real page is already there.` : '')
);

if (missing.length) {
    console.log(`\n  ${missing.length} end up somewhere that is not built:`);
    for (const line of missing.slice(0, 20)) console.log(`    ${line}`);
    if (missing.length > 20) console.log(`    ... and ${missing.length - 20} more`);
}
