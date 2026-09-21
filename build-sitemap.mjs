#!/usr/bin/env node
import { glob, writeFile } from 'node:fs/promises';

const SITE = 'https://rumkin.com';

const urls = [];

for await (const file of glob('dist/**/*.html')) {
    const path = file.replace(/^dist\//, '').replace(/(^|\/)index\.html$/, '$1');

    // The 404 page is served for unknown URLs, not browsed to directly, and
    // the Google verification file is not content.
    if (path === '404.html' || path.startsWith('google')) {
        continue;
    }

    urls.push(`${SITE}/${path}`);
}

urls.sort();

const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `<url><loc>${url}</loc></url>`),
    '</urlset>',
].join('\n');

await writeFile('dist/sitemap.xml', sitemap);
console.log(`Wrote dist/sitemap.xml with ${urls.length} URLs.`);
