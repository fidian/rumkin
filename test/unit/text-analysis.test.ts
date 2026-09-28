import { describe, expect, it } from 'vitest';
import {
    characterProperties,
    frequencyView,
    labelFor,
    matchesView,
    measure,
    nearbyView,
    propertyMatches,
    tallyProperties,
} from '@/assets/cipher/text-analysis.ts';
import { defaultAlphabet } from '@/assets/cipher/alphabet.ts';

const find = (name: string) => tallyProperties(name);
const basicLatin = () =>
    characterProperties.find((p) => p.name === 'Block: Basic Latin')!;

describe('characterProperties', () => {
    it('loads the Unicode table', () => {
        expect(characterProperties.length).toBeGreaterThan(400);
    });

    it('computes a usable min and max for every property', () => {
        // The original used Math.min(array), which is always NaN, so the
        // early rejection never fired and every property walked all of its
        // ranges for every character of the text.
        for (const property of characterProperties) {
            expect(Number.isNaN(property.min)).toBe(false);
            expect(Number.isNaN(property.max)).toBe(false);
            expect(property.min).toBeLessThanOrEqual(property.max);
        }
    });
});

describe('propertyMatches', () => {
    it('accepts a character inside the range', () => {
        expect(propertyMatches(basicLatin(), 'A'.charCodeAt(0))).toBe(true);
    });

    it('rejects one outside it', () => {
        expect(propertyMatches(basicLatin(), 0x4e00)).toBe(false);
    });
});

describe('tallyProperties', () => {
    it('counts each character once per property it belongs to', () => {
        const latin = find('AAB').find((t) => t.name === 'Block: Basic Latin')!;
        expect(latin.count).toBe(3);
        expect(latin.matches.get('A')).toBe(2);
        expect(latin.matches.get('B')).toBe(1);
    });

    it('puts a letter in more than one property', () => {
        // "A" is in a block, a script and a derived property at once.
        expect(find('A').length).toBeGreaterThan(1);
    });

    it('returns the properties in name order', () => {
        const names = find('Aa1 ').map((t) => t.name);
        expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    });

    it('finds nothing in an empty string', () => {
        expect(find('')).toEqual([]);
    });
});

describe('labelFor', () => {
    it('names control characters that have no glyph', () => {
        expect(labelFor('\n')).toBe('LF');
        expect(labelFor(' ')).toBe('SP');
        expect(labelFor('\t')).toBe('TAB');
    });

    it('leaves a printable character alone', () => {
        expect(labelFor('A')).toBe('A');
    });
});

describe('the three views', () => {
    const tally = () =>
        find('BBBAAC').find((t) => t.name === 'Block: Basic Latin')!;

    it('lists matches in code point order', () => {
        expect(matchesView(tally()).map((d) => d.character)).toEqual([
            'A',
            'B',
            'C',
        ]);
    });

    it('lists by frequency, commonest first', () => {
        expect(frequencyView(tally()).map((d) => d.character)).toEqual([
            'B',
            'A',
            'C',
        ]);
    });

    it('breaks ties in the frequency view by code point', () => {
        const t = find('ZA').find((x) => x.name === 'Block: Basic Latin')!;
        expect(frequencyView(t).map((d) => d.character)).toEqual(['A', 'Z']);
    });

    it('keeps the unused characters near the used ones', () => {
        const lists = nearbyView(tally());
        const characters = lists.flat().map((d) => d.character);
        expect(characters).toContain('A');
        // "D" was never used but sits right beside characters that were.
        expect(characters).toContain('D');
    });

    it('cuts out the long empty stretches', () => {
        // Basic Latin is 128 code points; only a handful are near the text.
        expect(nearbyView(tally()).flat().length).toBeLessThan(128);
    });

    it('reports counts of zero for the unused neighbours', () => {
        const unused = nearbyView(tally()).flat().filter((d) => d.count === 0);
        expect(unused.length).toBeGreaterThan(0);
    });
});

describe('measure', () => {
    it('reports the length in characters', () => {
        expect(measure('HELLO', defaultAlphabet()).length).toBe(5);
    });

    it('gives a higher index of coincidence to English than to random letters', () => {
        // This is the whole point of the statistic: real text repeats.
        const english = measure(
            'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOGTHEQUICKBROWNFOX',
            defaultAlphabet()
        );
        const flat = measure(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXY',
            defaultAlphabet()
        );
        expect(english.indexOfCoincidence).toBeGreaterThan(
            flat.indexOfCoincidence
        );
    });
});
