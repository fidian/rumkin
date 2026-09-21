#!/usr/bin/env node
//
// Two things that go wrong quietly in the built HTML.
//
// 1. Astro's compressHTML: 'jsx' strips whitespace at a line boundary next
//    to a tag, so an .astro source written as
//
//        see the <a href="../">handbook</a>
//        for details
//
//    renders as "handbook</a>for details".
//
//    Only links are checked. A word running straight into </code> or </b>
//    is usually deliberate - pluralizing a symbol name, or highlighting one
//    letter inside a block of cipher text - but a link butted against a word
//    is not.
//
// 2. A JSON attribute carrying a quote character ends its own attribute
//    early. The wingdings palette holds ' and " among its 147 symbols, and
//    an unescaped copy left the element on the page with nothing in it and
//    no error anyone would see.
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

// Attributes that hold JSON, and the element they belong to.
const JSON_ATTRS = /<(font-code)\b[^>]*?\s(rows|variants)=("([^"]*)"|'([^']*)')/g;

for await (const file of glob('dist/**/*.html')) {
    const html = await readFile(file, 'utf8');

    for (const m of html.matchAll(JSON_ATTRS)) {
        const [, element, attr] = m;
        const raw = m[4] ?? m[5] ?? '';
        // Entity-decode the way the browser will before the element sees it.
        // Numeric forms matter here: the escaper writes &#x27; for the
        // apostrophe that would otherwise end the attribute.
        const decoded = raw
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
            .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
                String.fromCodePoint(parseInt(n, 16))
            )
            .replace(/&amp;/g, '&');
        try {
            const parsed = JSON.parse(decoded);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                problems.push(`${file}\n    <${element} ${attr}> parsed but is empty`);
            }
        } catch {
            problems.push(
                `${file}\n    <${element} ${attr}> is not valid JSON; a quote in the value probably ended the attribute early`
            );
        }
    }
}

if (problems.length) {
    console.error(`\n  ❌ ${problems.length} markup problem(s):\n`);
    for (const p of problems) console.error(`  ${p}\n`);
    process.exit(1);
}

console.log('  ✅ Markup checks passed.');
