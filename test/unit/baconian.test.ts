import { describe, expect, it } from 'vitest';
import {
    baconianAlphabet,
    embed,
    encodeBaconian,
    normalizeCode,
    swapAB,
} from '@/assets/cipher/baconian.ts';
import { defaultAlphabet } from '@/assets/cipher/alphabet.ts';

const alphabet = defaultAlphabet();
const plain = (e: ReturnType<typeof embed>) =>
    e.runs.map((r) => r.text).join('');
const styled = (e: ReturnType<typeof embed>) =>
    e.runs.filter((r) => r.styled).map((r) => r.text).join('');

describe('normalizeCode', () => {
    it('accepts a, b, A, B, 0 and 1 alike', () => {
        expect(normalizeCode('ABab01')).toBe('abababab'.slice(0, 6));
    });

    it('drops anything that is not part of the code', () => {
        expect(normalizeCode('aab bab\nxyz')).toBe('aabbab');
    });
});

describe('swapAB', () => {
    it('swaps in every notation', () => {
        expect(swapAB('abAB01')).toBe('baBA10');
    });

    it('is its own inverse', () => {
        expect(swapAB(swapAB('aabAB01'))).toBe('aabAB01');
    });

    it('leaves other characters alone', () => {
        expect(swapAB('a b, c')).toBe('b a, c');
    });
});

describe('baconianAlphabet', () => {
    it('keeps every letter distinct by default', () => {
        expect(baconianAlphabet(alphabet, false).length).toBe(26);
    });

    it('merges I/J and U/V for the original alphabet', () => {
        // Bacon had 24 letters; I/J and U/V were not yet distinguished.
        expect(baconianAlphabet(alphabet, true).length).toBe(24);
    });

    it('encodes differently under each', () => {
        expect(encodeBaconian(alphabet, false, 'Test It')).not.toBe(
            encodeBaconian(alphabet, true, 'Test It')
        );
    });
});

describe('embed', () => {
    it('leaves the cover text exactly as it was', () => {
        const cover = 'This is a test message with bold for b.';
        expect(plain(embed(alphabet, 'aabbb', cover))).toBe(cover);
    });

    it('styles the letters where the code says b', () => {
        // Code "abab" over four letters styles the second and fourth.
        expect(styled(embed(alphabet, 'abab', 'abcd'))).toBe('bd');
    });

    it('passes over anything that is not a letter', () => {
        // The spaces carry nothing, so the code still lands on a, b, c, d.
        expect(styled(embed(alphabet, 'abab', 'a b c d'))).toBe('bd');
    });

    it('reports when the cover text is too short for the code', () => {
        expect(embed(alphabet, 'aaaaabbbbb', 'abc').fits).toBe(false);
    });

    it('reports a fit when there is room', () => {
        expect(embed(alphabet, 'ab', 'abcdef').fits).toBe(true);
    });

    it('joins neighbouring letters of the same kind into one run', () => {
        // aabb over abcd is one plain run then one styled run, not four.
        expect(embed(alphabet, 'aabb', 'abcd').runs).toHaveLength(2);
    });

    it('handles an empty code', () => {
        const result = embed(alphabet, '', 'hello');
        expect(plain(result)).toBe('hello');
        expect(styled(result)).toBe('');
    });

    it('handles empty cover text', () => {
        expect(embed(alphabet, 'abab', '').runs).toEqual([]);
    });
});
