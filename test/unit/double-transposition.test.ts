import { describe, expect, it } from 'vitest';
import {
    columnKeyFor,
    describeColumnKey,
    runDoubleColumnar,
    runUbchi,
} from '@/assets/cipher/double-transposition.ts';
import { defaultAlphabet } from '@/assets/cipher/alphabet.ts';

const alphabet = defaultAlphabet();
const opts = { columnOrder: false, dupesBackwards: false };
const key = (text: string) => columnKeyFor(alphabet, text, opts);

describe('columnKeyFor', () => {
    it('orders the columns by the key letters', () => {
        // CAB -> C is third, A is first, B is second.
        expect([...key('CAB')]).toEqual([2, 0, 1]);
    });

    it('returns nothing usable for an empty key', () => {
        expect(key('').length).toBeLessThan(2);
    });
});

describe('describeColumnKey', () => {
    it('shows the order one-based, the way a person counts columns', () => {
        expect(describeColumnKey([2, 0, 1])).toBe(
            'The resulting columnar key: 3 1 2'
        );
    });

    it('asks for a key when there is not enough of one', () => {
        expect(describeColumnKey([0])).toContain('Enter numbers or words');
    });
});

describe('runUbchi', () => {
    const run = (direction: 'ENCRYPT' | 'DECRYPT', message: string) =>
        runUbchi({
            direction,
            message,
            alphabet,
            columnKey: key('CARGO'),
            padCharacter: 'X',
        });

    it('round-trips a message', () => {
        const encoded = run('ENCRYPT', 'ATTACK AT DAWN').text;
        expect(encoded).not.toBe('');
        expect(run('DECRYPT', encoded).text.replace(/\s/g, '')).toBe(
            'ATTACKATDAWN'
        );
    });

    it('refuses a key with fewer than two columns instead of failing oddly', () => {
        const result = runUbchi({
            direction: 'ENCRYPT',
            message: 'ATTACK',
            alphabet,
            columnKey: key('A'),
            padCharacter: 'X',
        });
        expect(result.error).toContain('at least two columns');
        expect(result.text).toBe('');
    });

    it('is not the same as a single transposition', () => {
        // If the second pass were skipped this would silently match.
        const twice = run('ENCRYPT', 'ATTACK AT DAWN').text;
        const once = runDoubleColumnar({
            direction: 'ENCRYPT',
            message: 'ATTACK AT DAWN',
            alphabet,
            firstColumnKey: key('CARGO'),
            secondColumnKey: key('CARGO'),
        }).text;
        expect(twice).not.toBe(once);
    });
});

describe('runDoubleColumnar', () => {
    const run = (direction: 'ENCRYPT' | 'DECRYPT', message: string) =>
        runDoubleColumnar({
            direction,
            message,
            alphabet,
            firstColumnKey: key('CARGO'),
            secondColumnKey: key('SHIP'),
        });

    it('round-trips a message', () => {
        const encoded = run('ENCRYPT', 'ATTACK AT DAWN').text;
        expect(encoded).not.toBe('');
        expect(run('DECRYPT', encoded).text.replace(/\s/g, '')).toBe(
            'ATTACKATDAWN'
        );
    });

    it('uses the keys in the other order when decrypting', () => {
        // Swapping the keys must not decode, or the order is being ignored.
        const encoded = run('ENCRYPT', 'ATTACK AT DAWN').text;
        const swapped = runDoubleColumnar({
            direction: 'DECRYPT',
            message: encoded,
            alphabet,
            firstColumnKey: key('SHIP'),
            secondColumnKey: key('CARGO'),
        }).text;
        expect(swapped.replace(/\s/g, '')).not.toBe('ATTACKATDAWN');
    });

    it('refuses when either key is too short', () => {
        expect(
            runDoubleColumnar({
                direction: 'ENCRYPT',
                message: 'ATTACK',
                alphabet,
                firstColumnKey: key('CARGO'),
                secondColumnKey: key('A'),
            }).error
        ).toContain('at least two columns');
    });
});
