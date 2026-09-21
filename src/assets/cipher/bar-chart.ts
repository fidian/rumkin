/**
 * A small table with a bar beside each number, scaled to the largest.
 *
 *     <bar-chart .rows="data"></bar-chart>
 *
 * Rows are { label, count }. Replaces the Mithril BarChart, which took a
 * column definition; every caller on the site drew the same three columns,
 * so this draws those.
 */
import { component, css, html } from 'fudgel';

export interface BarRow {
    label: string;
    count: number;
}

component(
    'bar-chart',
    {
        prop: ['rows'],
        style: css`
            :host {
                display: block;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            th,
            td {
                padding: 0 0.4em;
            }

            .char {
                font-family: var(--font-anonymous-pro), monospace;
                text-align: center;
                white-space: nowrap;
            }

            .count {
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
        `,
        template: html`
            <table>
                <thead>
                    <tr>
                        <th class="char">Char</th>
                        <th class="count">Count</th>
                        <th class="bar">Bar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *for="row of scaled">
                        <td class="char">{{row.label}}</td>
                        <td class="count">{{row.count}}</td>
                        <td class="bar">
                            <div style="width: {{row.percent}}%"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        `,
    },
    class {
        rows: BarRow[] = [];
        scaled: (BarRow & { percent: number })[] = [];

        onInit() {
            this.rescale();
        }

        onChange() {
            this.rescale();
        }

        private rescale() {
            const rows = this.rows ?? [];
            const largest = Math.max(0, ...rows.map((row) => row.count));

            this.scaled = rows.map((row) => ({
                ...row,
                // A zero-width bar would be invisible, so an unused
                // character shows nothing rather than a sliver.
                percent: largest > 0 ? (row.count / largest) * 100 : 0,
            }));
        }
    }
);
