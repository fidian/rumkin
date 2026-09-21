import { describe, expect, it } from 'vitest';
import {
    characterCodes,
    convertBase,
    encodeAsScript,
    formatDegrees,
    parseDegrees,
    splitDegrees,
} from '@/assets/tools/conversions.ts';

describe('parseDegrees', () => {
    it('reads plain decimal degrees', () => {
        expect(parseDegrees('N45.12345')).toBeCloseTo(45.12345, 5);
    });

    it('reads degrees and minutes', () => {
        expect(parseDegrees('N 45 7.407')).toBeCloseTo(45 + 7.407 / 60, 6);
    });

    it('reads degrees, minutes and seconds', () => {
        expect(parseDegrees('N45 7 24.42')).toBeCloseTo(
            45 + 7 / 60 + 24.42 / 3600,
            6
        );
    });

    it('reads the symbols people actually type', () => {
        expect(parseDegrees(`45° 7' 24.42"`)).toBeCloseTo(
            45 + 7 / 60 + 24.42 / 3600,
            6
        );
    });

    it('treats W and S as negative wherever they appear', () => {
        expect(parseDegrees('W 93.87654')).toBeCloseTo(-93.87654, 5);
        expect(parseDegrees('93 52.592W')).toBeLessThan(0);
        expect(parseDegrees('-093 52.592')).toBeLessThan(0);
    });

    it('accepts a comma as the decimal separator', () => {
        expect(parseDegrees('45,5')).toBeCloseTo(45.5, 5);
    });

    it('returns zero for nothing', () => {
        expect(parseDegrees('')).toBe(0);
        expect(parseDegrees('N')).toBe(0);
    });
});

describe('splitDegrees', () => {
    it('splits into degrees, minutes and seconds', () => {
        const parts = splitDegrees(45 + 7 / 60 + 24.42 / 3600);
        expect(parts.wholeDegrees).toBe(45);
        expect(parts.wholeMinutes).toBe(7);
        expect(parts.seconds).toBeCloseTo(24.42, 2);
    });

    it('keeps the sign on the degrees', () => {
        expect(splitDegrees(-45.5).wholeDegrees).toBe(-45);
    });
});

describe('formatDegrees', () => {
    it('produces all three forms of the same bearing', () => {
        const result = formatDegrees('N45 7 24.42');
        expect(result.degrees).toBe('45.12345');
        expect(result.degreesMinutes).toBe('45° 7.407');
        expect(result.degreesMinutesSeconds).toBe(`45° 7' 24.42"`);
    });
});

describe('convertBase', () => {
    it('converts between the usual bases', () => {
        expect(convertBase('255', 10, 16)).toBe('FF');
        expect(convertBase('FF', 16, 10)).toBe('255');
        expect(convertBase('1010', 2, 10)).toBe('10');
    });

    it('is case-insensitive', () => {
        expect(convertBase('ff', 16, 10)).toBe('255');
    });

    it('gives zero for zero, and for nothing', () => {
        expect(convertBase('0', 10, 2)).toBe('0');
        expect(convertBase('', 10, 2)).toBe('0');
    });

    it('skips characters that are not digits of the input base', () => {
        // A 9 is not a digit in base 8, so it is passed over.
        expect(convertBase('1 0', 2, 10)).toBe('2');
        expect(convertBase('19', 8, 10)).toBe('1');
    });

    it('round-trips', () => {
        for (const n of ['7', '42', '1000', '65535']) {
            expect(convertBase(convertBase(n, 10, 7), 7, 10)).toBe(n);
        }
    });
});

describe('characterCodes', () => {
    it('gives four hex digits per character', () => {
        expect(characterCodes('AB')).toEqual(['0041', '0042']);
    });

    it('pads short codes', () => {
        expect(characterCodes('\n')).toEqual(['000a']);
    });

    it('handles an accented letter', () => {
        expect(characterCodes('é')).toEqual(['00e9']);
    });
});

describe('encodeAsScript', () => {
    // A fixed order, so the output can be checked rather than guessed at.
    const inOrder = (letters: string[]) => [...letters];

    it('produces a script carrying the text', () => {
        const script = encodeAsScript('abc', inOrder);
        expect(script).toContain('"abc"');
        expect(script).toContain('document.write');
    });

    it('decodes back to the original', () => {
        const text = 'name@example.com';
        const script = encodeAsScript(text, inOrder);

        // Run the generated decoder the way a browser would, but collecting
        // the output rather than writing it to a page.
        const written: string[] = [];
        const runner = new Function(
            'document',
            `return ${script}`
        );
        runner({ write: (s: string) => written.push(s) });

        expect(written.join('')).toBe(text);
    });

    it('puts "<" last, so the output cannot open a tag', () => {
        const script = encodeAsScript('a<b');
        const letters = script.match(/\("([^"]*)"/)![1];
        expect(letters.endsWith('<')).toBe(true);
    });
});
