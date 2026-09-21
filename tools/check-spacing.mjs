#!/usr/bin/env node
//
// Astro's compressHTML: 'jsx' strips whitespace at a line boundary next to a
// tag, so an .astro source written as
//
//     see the <a href="../">handbook</a>
//     for details
//
// renders as "handbook</a>for details". It is easy to do and invisible in the
// source, so the build checks for it.
//
// Only links are checked. A word running straight into </code> or </b> is
// usually deliberate - pluralizing a symbol name, or highlighting one letter
// inside a block of cipher text - but a link butted against a word is not.
import { glob, readFile } from 'node:fs/promises';

const JOINED_AFTER = /<\/a>(?=[A-Za-z])/g;
const JOINED_BEFORE = /(?<=[A-Za-z])<a[ >]/g;

const problems = [];

for await (const file of glob('dist/**/*.html')) {
    const html = await readFile(file, 'utf8');

    for (const re of [JOINED_AFTER, JOINED_BEFORE]) {
        re.lastIndex = 0;
        for (const m of html.matchAll(re)) {
            const start = Math.max(0, m.index - 50);
            problems.push(
                `${file}\n    ...${html.slice(start, m.index + 40).replace(/\s+/g, ' ')}...`
            );
        }
    }
}

if (problems.length) {
    console.error(
        `\n  ❌ ${problems.length} link(s) run straight into the neighbouring word:\n`
    );
    for (const p of problems) console.error(`  ${p}\n`);
    console.error('  Separate them in the .astro source with {" "}.\n');
    process.exit(1);
}

console.log('  ✅ No links collide with neighbouring words.');
