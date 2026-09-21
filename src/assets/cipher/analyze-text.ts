/**
 * The text analysis tool: <analyze-text></analyze-text>
 *
 * Shows how long a message is, how evenly its letters are spread, and which
 * Unicode blocks and scripts its characters come from. The work is in
 * text-analysis.ts.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './bar-chart.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import {
    frequencyView,
    matchesView,
    measure,
    nearbyView,
    tallyProperties,
    type Datum,
    type Measurements,
    type PropertyTally,
} from './text-analysis.ts';

type ViewName = 'matches' | 'frequency' | 'nearby';

interface Section {
    name: string;
    heading: string;
    open: boolean;
    view: ViewName;
    charts: { label: string; count: number }[][];
}

const toRows = (data: Datum[]) =>
    data.map((d) => ({ label: d.label, count: d.count }));

component(
    'analyze-text',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .summary {
                margin: 0.75em 0;
            }

            .toggle {
                background: none;
                border: 0;
                color: inherit;
                cursor: pointer;
                font: inherit;
                padding: 0;
                text-align: start;
            }

            .tabs {
                display: flex;
                gap: 0.2em;
                margin-top: 0.25em;
            }

            .tabs button {
                background-color: lightgrey;
                border: 1px solid;
                border-bottom: 0;
                border-radius: 0.75em 0.75em 0 0;
                cursor: pointer;
                font: inherit;
                padding: 0.25em 0.75em 0.1em;
            }

            .tabs button.on {
                background-color: white;
            }

            .panel {
                border: 1px solid;
                padding: 0.5em;
            }

            .panel bar-chart + bar-chart {
                border-top: 1px dashed #999;
                display: block;
                margin-top: 0.5em;
                padding-top: 0.5em;
            }
        `,
        template: html`
            <div class="field">
                <keyed-alphabet
                    .selection="alphabet"
                    @selection-change="setAlphabet($event)"
                ></keyed-alphabet>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <div *if="hasText">
                <p class="summary">
                    Length: {{measurements.length}}<br />
                    Kappa plaintext: {{kappa}}<br />
                    Friedman index of coincidence: {{indexOfCoincidence}}
                </p>

                <div *for="section of sections">
                    <p>
                        <button
                            class="toggle"
                            type="button"
                            @click="toggle(section.name)"
                        >
                            {{section.open ? '▼' : '▲'}}
                            <b>{{section.name}}</b> {{section.heading}}
                        </button>
                    </p>

                    <div *if="section.open">
                        <div class="tabs">
                            <button
                                type="button"
                                class="{{section.view === 'matches' ? 'on' : ''}}"
                                @click="setView(section.name, 'matches')"
                            >
                                Matches
                            </button>
                            <button
                                type="button"
                                class="{{section.view === 'frequency' ? 'on' : ''}}"
                                @click="setView(section.name, 'frequency')"
                            >
                                By Frequency
                            </button>
                            <button
                                type="button"
                                class="{{section.view === 'nearby' ? 'on' : ''}}"
                                @click="setView(section.name, 'nearby')"
                            >
                                With Nearby
                            </button>
                        </div>
                        <div class="panel">
                            <bar-chart
                                *for="chart of section.charts"
                                .rows="chart"
                            ></bar-chart>
                        </div>
                    </div>
                </div>
            </div>
        `,
    },
    class {
        alphabet: AlphabetSelection = defaultAlphabet();
        input = '';
        hasText = false;
        measurements: Measurements = {
            length: 0,
            kappaPlaintext: 0,
            indexOfCoincidence: 0,
        };
        kappa = '';
        indexOfCoincidence = '';
        sections: Section[] = [];

        private open = new Map<string, boolean>();
        private views = new Map<string, ViewName>();
        private tallies: PropertyTally[] = [];

        setAlphabet(event: CustomEvent<AlphabetSelection>) {
            this.alphabet = event.detail;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        toggle(name: string) {
            this.open.set(name, !this.open.get(name));
            this.rebuild();
        }

        setView(name: string, view: ViewName) {
            this.views.set(name, view);
            this.rebuild();
        }

        private recompute() {
            this.hasText = this.input.length > 0;

            if (!this.hasText) {
                this.sections = [];
                this.tallies = [];
                return;
            }

            this.measurements = measure(this.input, this.alphabet);
            this.kappa = this.measurements.kappaPlaintext.toLocaleString();
            this.indexOfCoincidence =
                this.measurements.indexOfCoincidence.toLocaleString();
            this.tallies = tallyProperties(this.input);
            this.rebuild();
        }

        /** Only the open sections build their charts; there can be hundreds. */
        private rebuild() {
            this.sections = this.tallies.map((tally) => {
                const open = !!this.open.get(tally.name);
                const view = this.views.get(tally.name) ?? 'matches';

                return {
                    name: tally.name,
                    heading: `(${tally.count} occurrences, ${tally.matches.size} distinct)`,
                    open,
                    view,
                    charts: open ? this.chartsFor(tally, view) : [],
                };
            });
        }

        private chartsFor(tally: PropertyTally, view: ViewName) {
            if (view === 'nearby') {
                return nearbyView(tally).map(toRows);
            }

            return [
                toRows(
                    view === 'frequency' ? frequencyView(tally) : matchesView(tally)
                ),
            ];
        }
    }
);
