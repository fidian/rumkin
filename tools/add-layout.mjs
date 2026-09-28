#!/usr/bin/env node
//
// Gives a static Markdown page its layout and breadcrumbs.
//
//   tools/add-layout.mjs src/pages/software/burp/index.md ...
//
// The breadcrumb trail is the page's ancestors, titled from each ancestor's
// own frontmatter, which is how Metalsmith built it. The page itself is the
// last crumb and is not repeated.
import { glob, readFile, writeFile } from 'node:fs/promises';

const titles = new Map();

// Every page's title, so an ancestor can be named.
for await (const file of glob('src/pages/**/index.{md,astro}')) {
    const source = await readFile(file, 'utf8');
    const title =
        source.match(/^title:\s*(.*)$/m)?.[1]?.trim() ??
        source.match(/^export const title\s*=\s*["'](.*)["'];/m)?.[1];
    if (title) {
        const url = '/' + file.replace(/^src\/pages\//, '').replace(/index\.(md|astro)$/, '');
        titles.set(url, title.replace(/^["'](.*)["']$/, '$1'));
    }
}

/** The ancestors of a page URL, nearest last, each with a title. */
const trailFor = (url) => {
    const parts = url.split('/').filter(Boolean);
    const trail = [{ name: titles.get('/') ?? 'Rumkin.com', href: '/' }];

    for (let depth = 1; depth < parts.length; depth += 1) {
        const ancestor = `/${parts.slice(0, depth).join('/')}/`;
        const name = titles.get(ancestor);
        if (name) trail.push({ name, href: ancestor });
    }

    return trail;
};

const quote = (value) =>
    /^[\w][\w .,'/()+-]*$/.test(value) ? value : JSON.stringify(value);

let changed = 0;

for (const path of process.argv.slice(2)) {
    const source = await readFile(path, 'utf8');
    const parsed = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!parsed) {
        console.error(`${path}: no frontmatter`);
        continue;
    }

    const [, frontmatter, body] = parsed;

    if (/^layout:/m.test(frontmatter)) {
        continue;
    }

    const read = (key) =>
        frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]?.trim();

    const url = '/' + path.replace(/^src\/pages\//, '').replace(/index\.md$/, '');
    const title = read('title');
    const summary = read('summary');

    const lines = ['layout: "@/layouts/default-layout.astro"', `title: ${quote(title)}`];
    if (summary && summary !== 'FIXME') lines.push(`summary: ${quote(summary)}`);

    lines.push('breadcrumbs:');
    for (const crumb of trailFor(url)) {
        lines.push(`    - name: ${quote(crumb.name)}`);
        lines.push(`      href: ${crumb.href}`);
    }

    await writeFile(path, `---\n${lines.join('\n')}\n---\n${body}`);
    changed += 1;
}

console.log(`Added a layout to ${changed} page(s).`);
