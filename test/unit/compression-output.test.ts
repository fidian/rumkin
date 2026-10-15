import { describe, expect, it } from 'vitest';
import rumkinCompression from '@fidian/rumkin-compression';
import {
    compressText,
    describeRatio,
    withDecompressor,
} from '@/assets/tools/compression-output.ts';

const codecs = {
    lz77: rumkinCompression.lz77Ascii,
    huffman: rumkinCompression.huffmanAscii,
};

/** Run a generated snippet the way a page would: as one expression. */
const run = (code: string) => new Function(`return ${code};`)();

const ascii = 'the quick brown fox jumps over the lazy dog';
const unicode = 'héllo wörld – “quotes” and 🙂';
// Long enough that the compressed data runs over several 60-byte lines.
const long = Array.from(
    { length: 40 },
    (_, i) => `line ${i}: ${ascii} ${i * 7}`
).join('\n');

describe('describeRatio', () => {
    it('says nothing about nothing', () => {
        expect(describeRatio(0, 0)).toBe('');
    });

    it('describes a saving', () => {
        expect(describeRatio(94, 60)).toBe(
            '94 → 60 bytes, using 63.83% of the uncompressed size by removing 34 bytes.'
        );
    });

    it('describes a loss', () => {
        expect(describeRatio(10, 15)).toBe(
            '10 → 15 bytes, using 150.00% of the uncompressed size by adding 5 bytes.'
        );
    });
});

describe.each(Object.entries(codecs))('%s', (_, codec) => {
    it.each([
        ['ASCII', ascii],
        ['non-ASCII', unicode],
        ['several lines of data', long],
    ])('gives back %s text from the snippet', (__, text) => {
        expect(run(compressText(codec, text, true).output)).toBe(text);
    });

    it('splits long data across lines', () => {
        const { output } = compressText(codec, long, true);

        expect(output).toContain('"+\n"');
    });

    it('decodes UTF-8 only when the text needs it', () => {
        expect(compressText(codec, ascii, true).output).not.toContain(
            'TextDecoder'
        );
        expect(compressText(codec, unicode, true).output).toContain(
            'TextDecoder'
        );
    });

    it('shows the bare compressed data without the decompressor', () => {
        const { output } = compressText(codec, ascii, false);

        expect(output).toBe(codec.compressSync(ascii));
    });

    it('measures the input in UTF-8 bytes', () => {
        const { output, ratio } = compressText(codec, unicode, false);
        const bytes = new TextEncoder().encode(unicode).length;

        expect(ratio).toBe(describeRatio(bytes, output.length));
    });
});

describe('withDecompressor', () => {
    it('wraps the call in one pair of parentheses', () => {
        expect(
            withDecompressor('function (s) { return s; }', 'abc', false)
        ).toBe('((function (s) { return s; })\n("abc"))');
    });
});
