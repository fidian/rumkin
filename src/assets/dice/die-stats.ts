/**
 * Dice roll statistics: <die-stats></die-stats>
 *
 * Type a dice expression and see the whole distribution, not a simulation -
 * every combination is enumerated, so the numbers are exact.
 *
 * The parser and roller are ported straight from the Mithril version and
 * are covered by the distributions its author worked out by hand.
 */
import { component, css, html } from 'fudgel';
import './roll-histogram.ts';
import Parser from './parser.ts';
import Roller from './roller.ts';

interface Row {
    roll: number;
    freq: number;
    probability: string;
    percent: number;
}

const parser = new Parser();
const roller = new Roller();

component(
    'die-stats',
    {
        style: css`
            :host {
                display: block;
            }

            input {
                font: inherit;
            }

            table {
                border-collapse: collapse;
                max-width: 580px;
                width: 100%;
            }

            th,
            td {
                padding: 0 0.4em;
                text-align: right;
            }

            .bar {
                width: 100%;
            }

            .bar div {
                background-color: #6a9fd8;
                height: 0.8em;
                min-width: 1px;
            }

            .problem {
                color: #a00;
            }
        `,
        template: html`
            <p>
                What do you want to roll?<br />
                <input
                    type="text"
                    spellcheck="false"
                    autocapitalize="off"
                    autocomplete="off"
                    autocorrect="off"
                    .value="input"
                    .disabled="working"
                    @input="setInput($event)"
                />
            </p>

            <p class="problem" *if="problem">
                Syntax is invalid and needs to be corrected: {{problem}}
            </p>

            <p *if="working">Calculating statistics: {{progress}}</p>

            <div *if="hasResult">
                <p>
                    Min: {{min}}<br />
                    Max: {{max}}<br />
                    Average (Mean): {{average}}<br />
                    Standard Deviation: {{deviation}}
                </p>

                <roll-histogram .tallies="tallies"></roll-histogram>

                <table>
                    <thead>
                        <tr>
                            <th>Roll</th>
                            <th>Freq</th>
                            <th>Prob</th>
                            <th class="bar">Bar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *for="row of rows">
                            <td>{{row.roll}}</td>
                            <td>{{row.freq}}</td>
                            <td>{{row.probability}}</td>
                            <td class="bar">
                                <div style="width: {{row.percent}}%"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
    },
    class {
        input = '';
        working = false;
        hasResult = false;
        problem = '';
        progress = '';
        min = 0;
        max = 0;
        average = 0;
        deviation = 0;
        rows: Row[] = [];
        tallies: { roll: number; freq: number }[] = [];

        private stopListening?: () => void;

        onInit() {
            const handler = (event: Event) => {
                this.input = (event as CustomEvent<string>).detail ?? '';
                this.update();
            };
            document.addEventListener('dice-example', handler);
            this.stopListening = () =>
                document.removeEventListener('dice-example', handler);
        }

        onDestroy() {
            this.stopListening?.();
        }

        setInput(event: Event) {
            this.input = (event.target as HTMLInputElement).value;
            this.update();
        }

        private update() {
            // Only the characters the notation uses; anything else is a typo
            // rather than something to complain about.
            const notation = this.input.replace(/[^-+0-9dDP,()]/g, '');

            this.problem = '';
            this.working = false;

            if (!notation) {
                this.hasResult = false;
                return;
            }

            let parsed;
            try {
                parsed = parser.parse(notation);
            } catch (e) {
                this.hasResult = false;
                this.problem = e instanceof Error ? e.message : String(e);
                return;
            }

            this.working = true;
            this.progress = 'Initial setup';

            roller.calculate(
                parsed,
                (result: any) => {
                    this.working = false;
                    this.show(result);
                },
                (message: string) => {
                    this.progress = message;
                }
            );
        }

        private show(result: any) {
            this.min = result.minRolls;
            this.max = result.maxRolls;
            this.average = result.avg;
            this.deviation = result.stdDev;

            const rows: Row[] = [];
            let largest = 0;

            result.rolls.forEach((rollsArray: number[], count: number) => {
                const probability = count / result.totalRolls;
                largest = Math.max(largest, probability);
                rows.push({
                    roll: rollsArray[0],
                    freq: count,
                    probability: `${(probability * 100).toFixed(5)}%`,
                    percent: probability,
                });
            });

            this.rows = rows.map((row) => ({
                ...row,
                percent: largest > 0 ? (row.percent / largest) * 100 : 0,
            }));
            this.tallies = rows.map((row) => ({
                roll: row.roll,
                freq: row.freq,
            }));
            this.hasResult = true;
        }
    }
);

/**
 * A clickable example in the page's prose:
 *
 *     <dice-example notation="4d6D1"></dice-example>
 *
 * Clicking it fills the calculator in. The die-stats element listens on the
 * document, so the two need no reference to each other.
 */
export const DICE_EXAMPLE_EVENT = 'dice-example';

export class DiceExample extends HTMLElement {
    connectedCallback() {
        if (this.querySelector('button')) return;

        const notation = this.getAttribute('notation') ?? '';
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = notation;
        button.addEventListener('click', () => {
            document.dispatchEvent(
                new CustomEvent(DICE_EXAMPLE_EVENT, {
                    bubbles: true,
                    detail: notation,
                })
            );
        });
        this.append(button);
    }
}

if (!customElements.get('dice-example')) {
    customElements.define('dice-example', DiceExample);
}
