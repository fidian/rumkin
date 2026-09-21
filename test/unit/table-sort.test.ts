import { describe, expect, it } from 'vitest';
import { isNumericColumn, sortedOrder } from '@/assets/table-sort.ts';

describe('isNumericColumn', () => {
    it('accepts integers, decimals and negatives', () => {
        expect(isNumericColumn(['1', '2.5', '-3', '.5'])).toBe(true);
    });

    it('ignores empty cells when deciding', () => {
        expect(isNumericColumn(['1', '', '3'])).toBe(true);
    });

    it('rejects a column with any non-number in it', () => {
        expect(isNumericColumn(['1', '2', 'n/a'])).toBe(false);
    });

    it('rejects a column that is entirely empty', () => {
        expect(isNumericColumn(['', ''])).toBe(false);
    });

    it('rejects scores written as fractions', () => {
        expect(isNumericColumn(['4/5', '3/5'])).toBe(false);
    });

    it('treats "?" as a blank, not as text', () => {
        // The whiteboard tables use "?" for untested products. One of those
        // must not force the whole score column to sort as text, which would
        // put 10 before 9.
        expect(isNumericColumn(['1', '?', '5'])).toBe(true);
    });

    it('rejects a column of nothing but blanks and question marks', () => {
        expect(isNumericColumn(['?', '', '?'])).toBe(false);
    });
});

describe('sortedOrder', () => {
    const order = (values: string[], desc = false) =>
        sortedOrder(values, desc).map((i) => values[i]);

    it('sorts numbers by value, not as text', () => {
        // The bug this guards: text sorting puts 10 before 9.
        expect(order(['9', '10', '1'])).toEqual(['1', '9', '10']);
    });

    it('reverses when descending', () => {
        expect(order(['9', '10', '1'], true)).toEqual(['10', '9', '1']);
    });

    it('sorts text case-insensitively', () => {
        expect(order(['banana', 'Apple', 'cherry'])).toEqual([
            'Apple',
            'banana',
            'cherry',
        ]);
    });

    it('orders embedded numbers naturally', () => {
        expect(order(['Item 10', 'Item 9', 'Item 1'])).toEqual([
            'Item 1',
            'Item 9',
            'Item 10',
        ]);
    });

    it('is stable, so ties keep the order the page gave them', () => {
        const values = ['5', '5', '5', '1'];
        expect(sortedOrder(values, false)).toEqual([3, 0, 1, 2]);
    });

    it('keeps ties in page order when descending too', () => {
        const values = ['5', '5', '1'];
        expect(sortedOrder(values, true)).toEqual([0, 1, 2]);
    });

    it('puts empty cells last in both directions', () => {
        expect(order(['3', '', '1'])).toEqual(['1', '3', '']);
        expect(order(['3', '', '1'], true)).toEqual(['3', '1', '']);
    });

    it('puts "?" last too, and still sorts the rest as numbers', () => {
        expect(order(['3', '?', '10', '1'])).toEqual(['1', '3', '10', '?']);
        expect(order(['3', '?', '10', '1'], true)).toEqual(['10', '3', '1', '?']);
    });

    it('keeps blanks and question marks in page order among themselves', () => {
        expect(sortedOrder(['?', '', '1'], false)).toEqual([2, 0, 1]);
    });

    it('returns an index for every row', () => {
        const values = ['c', 'a', '', 'b', 'a', '?'];
        expect([...sortedOrder(values, false)].sort()).toEqual([0, 1, 2, 3, 4, 5]);
    });
});
