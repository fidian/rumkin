import { describe, expect, it } from 'vitest';
import Parser from '@/assets/dice/parser.ts';
import Roller from '@/assets/dice/roller.ts';

// These distributions were worked out BY HAND in the original test runner,
// which was a script nobody ran. They are the reason this port can be
// trusted; do not "fix" one to match the code.
const VECTORS: [string, Record<number, number>][] = [
    [
        "1d2",
        {
            1: 1,
            2: 1
        }
    ],
    [
        "2d4-2",
        {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 3,
            5: 2,
            6: 1
        }
    ],
    [
        "(1d6,1d6)D1",
        {
            1: 1,
            2: 3,
            3: 5,
            4: 7,
            5: 9,
            6: 11
        }
    ],
    [
        "(1d6,1d6)P1",
        {
            1: 11,
            2: 9,
            3: 7,
            4: 5,
            5: 3,
            6: 1
        }
    ],
    [
        "(2d4,1d8+1,1d10)D1P1",
        {
            2: 24 + 2 * 2 + 2 * 3 + 2 * 4 + 2 * 3 + 2 * 2 + 2,
            3: 14 + 36 * 2 + 4 * 3 + 4 * 4 + 4 * 3 + 4 * 2 + 4,
            4: 12 + 12 * 2 + 44 * 3 + 6 * 4 + 6 * 3 + 6 * 2 + 6,
            5: 10 + 10 * 2 + 10 * 3 + 48 * 4 + 8 * 3 + 8 * 2 + 8,
            6: 8 + 8 * 2 + 8 * 3 + 8 * 4 + 48 * 3 + 10 * 2 + 10,
            7: 6 + 6 * 2 + 6 * 3 + 6 * 4 + 6 * 3 + 44 * 2 + 12,
            8: 4 + 4 * 2 + 4 * 3 + 4 * 4 + 4 * 3 + 4 * 2 + 36,
            9: 2 + 2 * 2 + 2 * 3 + 2 * 4 + 2 * 3 + 2 * 2 + 2
        }
    ]
];

const distributionOf = (notation: string) =>
    new Promise<Record<number, number>>((resolve, reject) => {
        try {
            new Roller().calculate(
                new Parser().parse(notation),
                (final: any) => resolve(final.rolls.snapshot().map),
                () => {}
            );
        } catch (e) {
            reject(e);
        }
    });

describe('dice distributions', () => {
    for (const [notation, expected] of VECTORS) {
        it(`matches the hand calculation for ${notation}`, async () => {
            const actual = await distributionOf(notation);
            for (const [total, count] of Object.entries(expected)) {
                expect(Number(actual[Number(total)]), `total ${total}`).toBe(
                    count
                );
            }
            expect(Object.keys(actual).length).toBe(
                Object.keys(expected).length
            );
        });
    }
});

describe('parsing', () => {
    const parse = (notation: string) => new Parser().parse(notation);

    it('rejects a die with no sides', () => {
        expect(() => parse('1d')).toThrow();
    });

    it('rejects zero dice', () => {
        expect(() => parse('0d6')).toThrow(/positive/);
    });

    it('rejects zero sides', () => {
        expect(() => parse('1d0')).toThrow(/positive/);
    });

    it('rejects trailing rubbish rather than ignoring it', () => {
        expect(() => parse('1d6 and then some')).toThrow(/unparseable/i);
    });

    it('accepts a bonus and a penalty', () => {
        expect(() => parse('2d6+3')).not.toThrow();
        expect(() => parse('2d6-3')).not.toThrow();
    });

    it('accepts a group with a drop', () => {
        expect(() => parse('(1d6,1d6)D1')).not.toThrow();
    });
});
