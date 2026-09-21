#!/usr/bin/env node
//
// Rewrites a cipher page's Metalsmith frontmatter and its two bits of
// embedded markup, leaving the prose alone:
//
//   - js/components frontmatter  ->  the cipher layout and breadcrumbs
//   - <span class="conduit" data-*>  ->  <cipher-example ...>
//   - <div class="module">           ->  the element named on the command line
//
//   tools/convert-cipher-page.mjs <page-dir> <element markup>
//
// e.g. tools/convert-cipher-page.mjs morse-code \
//          '<simple-code code="morse" topic="morse"></simple-code>'
import { readFile, writeFile } from 'node:fs/promises';

const [dir, element] = process.argv.slice(2);
if (!dir || !element) {
    console.error('usage: convert-cipher-page.mjs <page-dir> <element markup>');
    process.exit(2);
}

const path = `src/pages/tools/cipher/${dir}/index.md`;
const source = await readFile(path, 'utf8');
const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) throw new Error(`${path} has no frontmatter`);

const [, frontmatter, body] = match;
const read = (key) => frontmatter.match(new RegExp(`^${key}: (.*)$`, 'm'))?.[1]?.trim();

const title = read('title');
const summary = read('summary');
// The cipher index groups its children by these, so they have to survive.
const flags = ['code', 'cipher', 'tool'].filter((f) => read(f) === 'true');

// YAML needs quoting for anything with a colon or a leading quote in it.
const yaml = (value) =>
    /^[\w][\w .,'/()-]*$/.test(value) ? value : JSON.stringify(value);

const newFrontmatter = [
    'layout: "@/layouts/cipher-layout.astro"',
    `title: ${yaml(title)}`,
    summary && summary !== 'FIXME' ? `summary: ${yaml(summary)}` : null,
    ...flags.map((f) => `${f}: true`),
    'breadcrumbs:',
    '    - name: Rumkin.com',
    '      href: /',
    '    - name: Web-Based Tools',
    '      href: /tools/',
    '    - name: Ciphers and Codes',
    '      href: /tools/cipher/',
]
    .filter(Boolean)
    .join('\n');

let converted = body;

// The example buttons. Attribute values may span lines, so match lazily.
converted = converted.replace(
    /<span class="conduit"([\s\S]*?)><\/span>/g,
    (_, attrs) => {
        const pairs = [...attrs.matchAll(/data-([a-z-]+)="([\s\S]*?)"/g)].map(
            ([, name, value]) => {
                // Continuation lines were indented to sit under the list
                // item; that indentation is not part of the value.
                const cleaned = value.replace(/\n\s+/g, '\n');
                const key = name.startsWith('payload-') ? name : name;
                return `${key}="${cleaned}"`;
            }
        );
        return `<cipher-example ${pairs.join(' ')}></cipher-example>`;
    }
);

converted = converted.replace(/<div class="module"><\/div>/g, element);

await writeFile(path, `---\n${newFrontmatter}\n---\n${converted}`);
console.log(`converted ${dir}`);
