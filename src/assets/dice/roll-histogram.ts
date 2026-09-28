/**
 * The die roll distribution, drawn: <roll-histogram .tallies="rows">
 *
 * Full width, fixed height, and hovering or tapping a column names the roll
 * it belongs to. The table below it is exact to five decimal places; this is
 * for seeing the shape at a glance, which a column of numbers does not give
 * you.
 *
 * Drawn as SVG rather than with a charting library. The whole of it is one
 * rect per bar plus two axes, and the parts worth getting right - round
 * numbers on the axis, labels that do not collide, hit testing that works on
 * a one-pixel-tall bar - live in histogram.ts where they are tested.
 */
import { component, css, html } from 'fudgel';
import {
    barAt,
    buildHistogram,
    type Bar,
    type Histogram,
    type Tally,
} from './histogram.ts';

const EMPTY: Histogram = {
    bars: [],
    plot: { left: 0, top: 0, right: 0, bottom: 0 },
    xLabels: [],
    yTicks: [],
};

component(
    'roll-histogram',
    {
        prop: ['tallies'],
        style: css`
            :host {
                display: block;
                position: relative;
            }

            svg {
                display: block;
                height: 260px;
                touch-action: pan-y;
                width: 100%;
            }

            .bar {
                fill: #6a9fd8;
            }

            .bar-on {
                fill: #1f5c9e;
            }

            /* The whole column, so a tiny bar is still easy to point at. */
            .hit {
                fill: transparent;
            }

            .axis {
                stroke: #999;
                stroke-width: 1;
            }

            .grid {
                stroke: #ddd;
                stroke-width: 1;
            }

            .tick {
                fill: #555;
                font-size: 11px;
            }

            .tick-y {
                text-anchor: end;
            }

            .tick-x {
                text-anchor: middle;
            }

            .title {
                fill: #555;
                font-size: 11px;
                text-anchor: middle;
            }

            .tip {
                background: #fff;
                border: 1px solid #999;
                border-radius: 3px;
                font-size: 0.85em;
                padding: 0.2em 0.5em;
                pointer-events: none;
                position: absolute;
                white-space: nowrap;
                z-index: 1;
            }
        `,
        template: html`
            <svg
                #ref="svgEl"
                viewBox="0 0 {{width}} {{height}}"
                @pointermove="point($event)"
                @pointerdown="point($event)"
                @pointerleave="clear()"
                role="img"
                aria-label="Distribution of totals, frequency against roll"
            >
                <line
                    *for="tick of histogram.yTicks"
                    class="grid"
                    x1="{{histogram.plot.left}}"
                    y1="{{tick.y}}"
                    x2="{{histogram.plot.right}}"
                    y2="{{tick.y}}"
                ></line>
                <text
                    *for="tick of histogram.yTicks"
                    class="tick tick-y"
                    x="{{histogram.plot.left - 6}}"
                    y="{{tick.y + 4}}"
                >
                    {{tick.label}}
                </text>

                <rect
                    *for="bar of histogram.bars"
                    class="{{bar.roll === activeRoll ? 'bar-on' : 'bar'}}"
                    x="{{bar.x}}"
                    y="{{bar.y}}"
                    width="{{bar.width}}"
                    height="{{bar.height}}"
                ></rect>

                <line
                    class="axis"
                    x1="{{histogram.plot.left}}"
                    y1="{{histogram.plot.bottom}}"
                    x2="{{histogram.plot.right}}"
                    y2="{{histogram.plot.bottom}}"
                ></line>

                <text
                    *for="label of histogram.xLabels"
                    class="tick tick-x"
                    x="{{label.x}}"
                    y="{{height - 8}}"
                >
                    {{label.value}}
                </text>
            </svg>

            <div
                class="tip"
                *if="tip"
                style="left: {{tipLeft}}px; top: {{tipTop}}px"
            >
                {{tip}}
            </div>
        `,
    },
    class {
        tallies: Tally[] = [];
        histogram: Histogram = EMPTY;
        width = 700;
        height = 260;
        activeRoll: number | null = null;
        tip = '';
        tipLeft = 0;
        tipTop = 0;
        svgEl?: SVGSVGElement;

        private observer?: ResizeObserver;

        onViewInit() {
            // One SVG unit is one pixel, so text stays the size it was asked
            // to be however wide the page is.
            this.observer = new ResizeObserver(() => this.measure());
            this.svgEl && this.observer.observe(this.svgEl);
            this.measure();
        }

        onChange() {
            this.redraw();
        }

        onDestroy() {
            this.observer?.disconnect();
        }

        private measure() {
            const box = this.svgEl?.getBoundingClientRect();

            if (box && box.width > 0) {
                this.width = Math.round(box.width);
                this.height = Math.round(box.height);
            }

            this.redraw();
        }

        private redraw() {
            this.histogram = buildHistogram({
                tallies: this.tallies ?? [],
                width: this.width,
                height: this.height,
            });
        }

        point(event: PointerEvent) {
            const box = this.svgEl?.getBoundingClientRect();

            if (!box || !box.width) return;

            // The viewBox is in pixels, so this is only a scroll offset.
            const x = event.clientX - box.left;
            const y = event.clientY - box.top;
            const index = barAt(this.histogram, x, y);

            if (index < 0) {
                this.clear();
                return;
            }

            this.show(this.histogram.bars[index], x, y);
        }

        clear() {
            this.activeRoll = null;
            this.tip = '';
        }

        private show(bar: Bar, x: number, y: number) {
            this.activeRoll = bar.roll;
            this.tip = `${bar.roll}: ${(bar.probability * 100).toFixed(2)}%, ${bar.freq.toLocaleString()} of them`;

            // Keep the box inside the chart rather than off the right edge.
            const half = Math.min(120, this.width / 2);

            this.tipLeft = Math.max(0, Math.min(x + 12, this.width - half));
            this.tipTop = Math.max(0, y - 34);
        }
    }
);
