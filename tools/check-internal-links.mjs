#!/usr/bin/env node
//
// Every page, image, script, stylesheet and frame the built HTML refers to
// has to exist, and every #fragment has to name an element on its page.
// Stylesheets are read too, inline and in files, so a url() inside one has
// to point at a file as well.
//
// linkinator serves the directory on 127.0.0.1 and requests each reference,
// which is close to what the browser does. A link to a directory without
// its trailing slash gets a redirect from that server, and is reported,
// because nothing later would catch it.
//
// Every HTML and CSS file is a starting point, not only the home page.
// That way a page nothing links to is still checked, and so is every
// stylesheet: linkinator only follows a link further when it sits below
// the URL it started from, so starting from pages alone never opens the
// stylesheets they use.
//
// Anything not on that server is skipped; npm run verify-external-links is
// for those.
//
// Usage: node tools/check-internal-links.mjs [directory]   (default: dist)
import { glob } from 'node:fs/promises';
import { LinkChecker } from 'linkinator';

const root = process.argv[2] ?? 'dist';
const local = 'http://127.0.0.1:';

// The TiddlyWiki copy advertises an RSS feed that was never part of the
// site.
const ignored = [/\/tools\/tiddlywiki\/index\.xml$/];

const files = await Array.fromAsync(
    glob(['**/*.html', '**/*.css'], { cwd: root })
);
const result = await new LinkChecker().check({
    path: files,
    serverRoot: root,
    checkCss: true,
    checkFragments: true,
    redirects: 'error',
    linksToSkip: async (url) =>
        !url.startsWith(local) || ignored.some((re) => re.test(url)),
});

const broken = result.links.filter((link) => link.state === 'BROKEN');
const checked = result.links.filter((link) => link.state === 'OK');

// A skip rule that matches too much leaves nothing to check and reports a
// pass, so make sure every file was actually read. linkinator reports URLs
// relative to the directory it serves.
const read = new Set(checked.map((link) => link.url));
const unread = files.filter((file) => !read.has(file));

if (unread.length) {
    console.error(`\n  ❌ ${unread.length} file(s) were never checked:\n`);
    for (const file of unread.slice(0, 20)) console.error(`  ${file}`);
    process.exit(1);
}

if (broken.length) {
    console.error(`\n  ❌ ${broken.length} broken internal link(s):\n`);
    for (const link of broken) {
        const reason =
            link.failureDetails
                ?.map((detail) => detail?.message)
                .filter(Boolean)
                .join('; ') || `HTTP ${link.status}`;
        console.error(`  ${link.url}\n    from ${link.parent}\n    ${reason}\n`);
    }
    process.exit(1);
}

console.log(
    `  ✅ ${checked.length} internal links in ${files.length} pages and stylesheets all resolve.`
);
