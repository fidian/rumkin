/**
 * The geometry of the die roll histogram.
 *
 * Given the tallies and the size of the box to draw in, this works out where
 * every bar, tick and label goes. No DOM here, so the awkward parts - picking
 * round numbers for the axis, and thinning the labels so they do not collide -
 * are tested on their own.
 */

export interface Tally {
    roll: number;
    freq: number;
}

export interface Bar {
    roll: number;
    freq: number;
    /** Share of all rolls, 0 to 1. */
    probability: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Tick {
    value: number;
    label: string;
    y: number;
}

export interface Label {
    value: number;
    x: number;
}

export interface Plot {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface Histogram {
    bars: Bar[];
    plot: Plot;
    xLabels: Label[];
    yTicks: Tick[];
}

export interface HistogramRequest {
    tallies: Tally[];
    width: number;
    height: number;
    /** Room for the axis labels, in pixels. */
    gutterLeft?: number;
    gutterBottom?: number;
    /** Roughly how many pixels one x label needs to itself. */
    labelRoom?: number;
}

/**
 * Axis labels, short. A 10d10 has 627 million ways of coming out, and
 * "627000000" does not fit beside a chart - "627M" does.
 *
 * The locale is pinned so the label does not change with the reader's
 * settings, which would make the axis untestable and, for a European reader,
 * swap the meaning of the separators.
 */
export const compactNumber = (value: number): string => {
    if (!Number.isFinite(value)) return '';
    if (Math.abs(value) < 1000) return String(value);

    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
};

/**
 * A step that lands on 1, 2 or 5 times a power of ten, which is what makes an
 * axis readable. Returns the step, not the tick count, because the top of the
 * axis has to be a multiple of it.
 */
export const niceStep = (range: number, wanted: number): number => {
    if (!(range > 0) || !(wanted > 0)) return 1;

    const rough = range / wanted;
    const power = 10 ** Math.floor(Math.log10(rough));
    const scaled = rough / power;

    if (scaled <= 1) return power;
    if (scaled <= 2) return 2 * power;
    if (scaled <= 5) return 5 * power;

    return 10 * power;
};

/**
 * Show every nth label, chosen so that each one gets `room` pixels. Always at
 * least 1, so something is always labelled.
 */
export const labelEvery = (count: number, span: number, room: number) => {
    if (count < 2 || span <= 0) return 1;

    return Math.max(1, Math.ceil(count / Math.max(1, Math.floor(span / room))));
};

/**
 * Which bar sits under a point, or -1 for none. Hit testing is on the
 * column rather than the drawn bar, so a short bar is as easy to hit as a
 * tall one - the alternative is a chart whose rare values cannot be pointed
 * at.
 */
export const barAt = (histogram: Histogram, x: number, y: number): number => {
    const { plot } = histogram;

    if (y < plot.top || y > plot.bottom || x < plot.left || x > plot.right) {
        return -1;
    }

    for (let i = 0; i < histogram.bars.length; i += 1) {
        const bar = histogram.bars[i];

        if (x >= bar.x && x < bar.x + bar.width) return i;
    }

    // Past the last bar's right edge by a rounding error.
    return histogram.bars.length ? histogram.bars.length - 1 : -1;
};

export const buildHistogram = ({
    tallies,
    width,
    height,
    gutterLeft = 48,
    gutterBottom = 24,
    labelRoom = 34,
}: HistogramRequest): Histogram => {
    const plot: Plot = {
        left: gutterLeft,
        top: 8,
        right: Math.max(gutterLeft, width - 8),
        bottom: Math.max(0, height - gutterBottom),
    };

    const spanX = plot.right - plot.left;
    const spanY = plot.bottom - plot.top;
    const total = tallies.reduce((sum, tally) => sum + tally.freq, 0);
    const largest = tallies.reduce((most, tally) => Math.max(most, tally.freq), 0);

    if (!tallies.length || spanX <= 0 || spanY <= 0 || largest <= 0) {
        return { bars: [], plot, xLabels: [], yTicks: [] };
    }

    // Round the top of the axis up to a whole number of steps, so the topmost
    // gridline is also the top of the plot.
    const step = niceStep(largest, 4);
    const top = Math.ceil(largest / step) * step;

    const slot = spanX / tallies.length;
    // A hairline gap between bars, but never so much that a bar vanishes.
    const gap = Math.min(1, slot * 0.15);

    const bars = tallies.map((tally, i) => {
        const barHeight = (tally.freq / top) * spanY;

        return {
            roll: tally.roll,
            freq: tally.freq,
            probability: total > 0 ? tally.freq / total : 0,
            x: plot.left + i * slot,
            y: plot.bottom - barHeight,
            width: Math.max(slot - gap, slot * 0.5),
            height: barHeight,
        };
    });

    const yTicks: Tick[] = [];

    for (let value = 0; value <= top; value += step) {
        yTicks.push({
            value,
            label: compactNumber(value),
            y: plot.bottom - (value / top) * spanY,
        });
    }

    const every = labelEvery(tallies.length, spanX, labelRoom);
    const xLabels: Label[] = [];

    for (let i = 0; i < tallies.length; i += every) {
        xLabels.push({
            value: tallies[i].roll,
            x: bars[i].x + bars[i].width / 2,
        });
    }

    // The last roll is worth labelling whatever the spacing worked out to,
    // unless it would land on top of the one before it.
    const last = tallies.length - 1;
    const lastLabel = xLabels[xLabels.length - 1];
    const lastX = bars[last].x + bars[last].width / 2;

    if (lastLabel && lastX - lastLabel.x > labelRoom * 0.75) {
        xLabels.push({ value: tallies[last].roll, x: lastX });
    }

    return { bars, plot, xLabels, yTicks };
};
