import { describe, expect, it } from 'vitest';
import { morseRows } from '@/assets/cipher/morse-data.ts';

const sample = [
    { code: '.-', text: ['A', 'a'] },
    { code: '-.-.', text: ['C', 'c', '[CORRECT]', '[AFFIRMATIVE]'] },
    { code: '/', text: [' '] },
    { code: '----', text: ['CH', 'ch'] },
];

const short = (label: string) => label.length < 3;
const long = (label: string) => label.length > 2;

describe('morseRows', () => {
    it('lists a letter once rather than in both cases', () => {
        expect(morseRows([sample[0]], short)).toEqual([
            { labels: 'A', code: '.-' },
        ]);
    });

    it('names the space rather than printing one', () => {
        // "Space" is five characters, so it lands in the second list with
        // the prosigns rather than among the single letters.
        expect(morseRows([sample[2]], short)).toEqual([]);
        expect(morseRows([sample[2]], long)).toEqual([
            { labels: 'Space', code: '/' },
        ]);
    });

    it('keeps CH with the letters, since it is one code', () => {
        // Only single characters are upper-cased, so CH and ch are two
        // labels rather than one. That matches the live site; it is a
        // cosmetic wart, not a decoding difference.
        expect(morseRows([sample[3]], short)).toEqual([
            { labels: 'CH, ch', code: '----' },
        ]);
    });

    it('splits prosigns away from the plain letters', () => {
        expect(morseRows([sample[1]], short)).toEqual([
            { labels: 'C', code: '-.-.' },
        ]);
        expect(morseRows([sample[1]], long)).toEqual([
            { labels: '[CORRECT], [AFFIRMATIVE]', code: '-.-.' },
        ]);
    });

    it('drops an entry with nothing left to show', () => {
        expect(morseRows([sample[0]], long)).toEqual([]);
    });

    it('covers every entry across the two filters', () => {
        const total = morseRows(sample, short).length + morseRows(sample, long).length;
        expect(total).toBeGreaterThanOrEqual(sample.length);
    });
});
