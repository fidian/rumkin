import { describe, expect, it } from 'vitest';
import {
    DIGITS,
    LOWERCASE,
    SYMBOLS,
    UPPERCASE,
    entropyBits,
    generatePassphrase,
    generatePassword,
    makeCharacterSet,
    parseWordlist,
} from '@/assets/tools/passwords.ts';
import { randomIndex, randomNumber } from '@/assets/tools/random.ts';

/** Deterministic picker, so a test is not a coin toss. */
const cycle = () => {
    let n = 0;
    return (max: number) => n++ % max;
};

describe('makeCharacterSet', () => {
    it('includes only the groups that were asked for', () => {
        expect(makeCharacterSet({ numbers: true })).toBe(DIGITS);
    });

    it('combines groups', () => {
        const set = makeCharacterSet({ uppercase: true, numbers: true });
        expect(set).toHaveLength(UPPERCASE.length + DIGITS.length);
    });

    it('adds whatever else was typed', () => {
        expect(makeCharacterSet({ other: 'xyz' })).toBe('xyz');
    });

    it('removes duplicates, so one character is not twice as likely', () => {
        // "A" typed by hand is already in the uppercase group.
        expect(makeCharacterSet({ uppercase: true, other: 'A' })).toHaveLength(
            UPPERCASE.length
        );
    });

    it('is sorted, so the same options always give the same set', () => {
        expect(makeCharacterSet({ other: 'cba' })).toBe('abc');
    });

    it('is empty when nothing is selected', () => {
        expect(makeCharacterSet({})).toBe('');
    });

    it('has all four groups when all four are on', () => {
        const set = makeCharacterSet({
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
        });
        for (const group of [UPPERCASE, LOWERCASE, DIGITS, SYMBOLS]) {
            for (const character of group) {
                expect(set).toContain(character);
            }
        }
    });
});

describe('generatePassword', () => {
    it('is the length that was asked for', () => {
        expect(generatePassword(24, LOWERCASE, cycle())).toHaveLength(24);
    });

    it('uses only the characters it was given', () => {
        const password = generatePassword(50, DIGITS, cycle());
        expect(password).toMatch(/^[0-9]+$/);
    });

    it('returns nothing when there is nothing to draw from', () => {
        expect(generatePassword(10, '', cycle())).toBe('');
    });

    it('returns nothing for a length of zero', () => {
        expect(generatePassword(0, LOWERCASE, cycle())).toBe('');
    });
});

describe('entropyBits', () => {
    it('is length times the log of the alphabet', () => {
        // 26 letters is about 4.7 bits each.
        expect(entropyBits(10, 26)).toBeCloseTo(47.0, 0);
    });

    it('is zero when there is no choice to make', () => {
        expect(entropyBits(10, 1)).toBe(0);
    });

    it('rises with a bigger alphabet', () => {
        expect(entropyBits(10, 62)).toBeGreaterThan(entropyBits(10, 26));
    });
});

describe('parseWordlist', () => {
    it('takes one word per line', () => {
        expect(parseWordlist('able\nbaker\ncharlie')).toEqual([
            'able',
            'baker',
            'charlie',
        ]);
    });

    it('copes with Windows line endings and blank lines', () => {
        expect(parseWordlist('able\r\n\r\nbaker\n  \n')).toEqual([
            'able',
            'baker',
        ]);
    });

    it('trims each word', () => {
        expect(parseWordlist('  able  ')).toEqual(['able']);
    });
});

describe('generatePassphrase', () => {
    const words = ['able', 'baker', 'charlie', 'dog'];

    it('has the number of words asked for', () => {
        expect(generatePassphrase(3, words, ' ', cycle()).split(' ')).toHaveLength(
            3
        );
    });

    it('uses the separator given', () => {
        expect(generatePassphrase(3, words, '-', cycle())).toBe(
            'able-baker-charlie'
        );
    });

    it('returns nothing when the list is empty', () => {
        expect(generatePassphrase(3, [], ' ', cycle())).toBe('');
    });
});

describe('the random source', () => {
    it('stays inside the range', () => {
        for (let i = 0; i < 500; i += 1) {
            const value = randomIndex(10);
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(10);
        }
    });

    it('returns 0 when there is only one choice', () => {
        expect(randomIndex(1)).toBe(0);
    });

    it('covers the whole range rather than favouring the low end', () => {
        // Taking a random value modulo the range would skew the counts;
        // this is what the masking and redrawing is for.
        const counts = new Array(10).fill(0);
        for (let i = 0; i < 20000; i += 1) counts[randomIndex(10)] += 1;

        for (const count of counts) {
            // 2000 expected each; allow generous slack for a fair sample.
            expect(count).toBeGreaterThan(1500);
            expect(count).toBeLessThan(2500);
        }
    });

    it('gives numbers below one', () => {
        for (let i = 0; i < 200; i += 1) {
            const value = randomNumber();
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(1);
        }
    });
});
