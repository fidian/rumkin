import { describe, expect, it } from 'vitest';
import {
    barAt,
    buildHistogram,
    compactNumber,
    labelEvery,
    niceStep,
    type Tally,
} from '@/assets/dice/histogram.ts';

/** 3d6: the classic, and small enough to check by hand. */
const THREE_D_SIX: Tally[] = [
    { roll: 3, freq: 1 },
    { roll: 4, freq: 3 },
    { roll: 5, freq: 6 },
    { roll: 6, freq: 10 },
    { roll: 7, freq: 15 },
    { roll: 8, freq: 21 },
    { roll: 9, freq: 25 },
    { roll: 10, freq: 27 },
    { roll: 11, freq: 27 },
    { roll: 12, freq: 25 },
    { roll: 13, freq: 21 },
    { roll: 14, freq: 15 },
    { roll: 15, freq: 10 },
    { roll: 16, freq: 6 },
    { roll: 17, freq: 3 },
    { roll: 18, freq: 1 },
];

const chart = () =>
    buildHistogram({ tallies: THREE_D_SIX, width: 700, height: 260 });

describe('compactNumber', () => {
    it('leaves small numbers alone', () => {
        expect(compactNumber(0)).toBe('0');
        expect(compactNumber(27)).toBe('27');
        expect(compactNumber(999)).toBe('999');
    });

    // A 10d10 has 627 million outcomes and the axis has 48 pixels for the
    // label.
    it('shortens the big ones', () => {
        expect(compactNumber(1000)).toBe('1K');
        expect(compactNumber(627000000)).toBe('627M');
        expect(compactNumber(1200000000)).toBe('1.2B');
    });
});

describe('niceStep', () => {
    it('lands on 1, 2 or 5 times a power of ten', () => {
        for (const range of [3, 27, 100, 216, 4021, 90000]) {
            const step = niceStep(range, 4);
            const scaled = step / 10 ** Math.floor(Math.log10(step));

            expect([1, 2, 5]).toContain(Math.round(scaled));
        }
    });

    it('gives roughly the number of ticks asked for', () => {
        const step = niceStep(27, 4);

        expect(Math.ceil(27 / step)).toBeGreaterThanOrEqual(3);
        expect(Math.ceil(27 / step)).toBeLessThanOrEqual(6);
    });

    it('survives a range of nothing', () => {
        expect(niceStep(0, 4)).toBe(1);
    });
});

describe('labelEvery', () => {
    it('labels every one when they all fit', () => {
        expect(labelEvery(10, 700, 34)).toBe(1);
    });

    // 400 columns of 20d20 cannot all carry a number.
    it('thins them out when they do not', () => {
        expect(labelEvery(400, 700, 34)).toBeGreaterThan(1);
    });

    it('never asks for every zeroth label', () => {
        expect(labelEvery(400, 10, 34)).toBeGreaterThanOrEqual(1);
        expect(labelEvery(1, 700, 34)).toBe(1);
    });
});

describe('buildHistogram', () => {
    it('draws one bar per roll', () => {
        expect(chart().bars).toHaveLength(THREE_D_SIX.length);
        expect(chart().bars[0].roll).toBe(3);
    });

    it('works out each roll s share of the total', () => {
        const bars = chart().bars;
        const total = THREE_D_SIX.reduce((sum, t) => sum + t.freq, 0);

        expect(total).toBe(216);
        expect(bars[0].probability).toBeCloseTo(1 / 216);
        // 10 and 11 tie for the top of a 3d6 curve.
        expect(bars[7].probability).toBeCloseTo(27 / 216);
    });

    it('puts the tallest bar at the top of the plot', () => {
        const { bars, plot, yTicks } = chart();
        const tallest = bars.reduce((a, b) => (a.height > b.height ? a : b));
        const top = yTicks[yTicks.length - 1];

        expect(tallest.y).toBeGreaterThanOrEqual(plot.top);
        // The axis rounds up to a whole step, so the bar reaches the top
        // gridline only when the count is already a multiple of the step.
        expect(top.value).toBeGreaterThanOrEqual(27);
    });

    it('keeps every bar inside the plot', () => {
        const { bars, plot } = chart();

        for (const bar of bars) {
            expect(bar.x).toBeGreaterThanOrEqual(plot.left);
            expect(bar.x + bar.width).toBeLessThanOrEqual(plot.right + 1);
            expect(bar.y).toBeGreaterThanOrEqual(plot.top - 0.001);
            expect(bar.y + bar.height).toBeCloseTo(plot.bottom);
        }
    });

    it('starts the y axis at zero and ends on a round number', () => {
        const { yTicks } = chart();

        expect(yTicks[0].value).toBe(0);
        expect(yTicks[0].label).toBe('0');
        expect(yTicks.length).toBeGreaterThan(1);

        const step = yTicks[1].value - yTicks[0].value;

        for (let i = 1; i < yTicks.length; i += 1) {
            expect(yTicks[i].value - yTicks[i - 1].value).toBeCloseTo(step);
        }
    });

    it('labels the first and last roll', () => {
        const { xLabels } = chart();

        expect(xLabels[0].value).toBe(3);
        expect(xLabels[xLabels.length - 1].value).toBe(18);
    });

    // 20d20 is the worst case the page warns about.
    it('copes with hundreds of columns', () => {
        const many = Array.from({ length: 381 }, (_, i) => ({
            roll: i + 20,
            freq: i + 1,
        }));
        const { bars, xLabels } = buildHistogram({
            tallies: many,
            width: 700,
            height: 260,
        });

        expect(bars).toHaveLength(381);
        expect(bars.every((bar) => bar.width > 0)).toBe(true);
        expect(xLabels.length).toBeLessThan(30);
    });

    it('draws nothing rather than throwing on no data', () => {
        const empty = buildHistogram({ tallies: [], width: 700, height: 260 });

        expect(empty.bars).toEqual([]);
        expect(empty.xLabels).toEqual([]);
    });

    it('draws nothing in a box with no room in it', () => {
        expect(
            buildHistogram({ tallies: THREE_D_SIX, width: 0, height: 0 }).bars
        ).toEqual([]);
    });
});

describe('barAt', () => {
    it('finds the bar under a point', () => {
        const histogram = chart();
        const bar = histogram.bars[5];
        const middle = bar.x + bar.width / 2;

        expect(barAt(histogram, middle, histogram.plot.bottom - 1)).toBe(5);
    });

    // A 1-in-216 roll is a bar one pixel tall. Hit testing the column rather
    // than the bar is what makes it reachable at all.
    it('finds a bar that is too short to see', () => {
        const histogram = chart();
        const bar = histogram.bars[0];

        expect(bar.height).toBeLessThan(10);
        expect(
            barAt(histogram, bar.x + bar.width / 2, histogram.plot.top + 2)
        ).toBe(0);
    });

    it('finds nothing outside the plot', () => {
        const histogram = chart();

        expect(barAt(histogram, 0, 0)).toBe(-1);
        expect(barAt(histogram, 5, histogram.plot.bottom - 1)).toBe(-1);
        expect(barAt(histogram, 400, histogram.plot.bottom + 20)).toBe(-1);
    });
});
