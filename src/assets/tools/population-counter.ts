/**
 * Live population estimates: <population-counter></population-counter>
 *
 * Shows a list of countries and regions; picking one projects its snapshot
 * forward to now, ticking as you watch. The arithmetic is in population.ts.
 */
import { component, css, html } from 'fudgel';
import {
    formatCount,
    projectArea,
    splitAreas,
    type Area,
    type RawArea,
} from './population.ts';

/** The counters move about ten times a second, as they always have. */
const TICK_MS = 100;

component(
    'population-counter',
    {
        style: css`
            :host {
                display: block;
            }

            .columns {
                columns: 2;
            }

            @media (max-width: 40em) {
                .columns {
                    columns: 1;
                }
            }

            ul {
                list-style: none;
                padding: 0;
            }

            button {
                background: none;
                border: 0;
                color: inherit;
                cursor: pointer;
                font: inherit;
                padding: 0;
                text-align: start;
                text-decoration: underline;
            }

            .figure {
                font-family: var(--font-anonymous-pro), monospace;
                font-size: 1.4em;
            }

            table {
                border-collapse: collapse;
            }

            td {
                padding: 0.1em 0.5em 0.1em 0;
            }

            td.number {
                font-family: var(--font-anonymous-pro), monospace;
                text-align: right;
            }
        `,
        template: html`
            <p *if="loading">Loading the population statistics.</p>
            <p *if="problem">{{problem}}</p>

            <div *if="!loading && !problem && !selected">
                <p>
                    Select a country or region in order to see details on its
                    estimated population.
                </p>

                <h2>Regions</h2>
                <ul class="columns">
                    <li *for="region of regions">
                        <button type="button" @click="select(region.I)">
                            {{region.L}}
                        </button>
                    </li>
                </ul>

                <h2>Countries</h2>
                <ul class="columns">
                    <li *for="country of countries">
                        <button type="button" @click="select(country.I)">
                            {{country.L}}
                        </button>
                    </li>
                </ul>
            </div>

            <div *if="selected">
                <p>
                    <button type="button" @click="back()">
                        Back to the whole list
                    </button>
                </p>
                <h2>{{selected.L}}</h2>
                <p class="figure">{{population}}</p>
                <table>
                    <tr>
                        <td>Births since {{sinceLabel}}</td>
                        <td class="number">{{births}}</td>
                    </tr>
                    <tr>
                        <td>Deaths since {{sinceLabel}}</td>
                        <td class="number">{{deaths}}</td>
                    </tr>
                    <tr>
                        <td>Net migration since {{sinceLabel}}</td>
                        <td class="number">{{migrations}}</td>
                    </tr>
                </table>
            </div>
        `,
    },
    class {
        loading = true;
        problem = '';
        countries: RawArea[] = [];
        regions: RawArea[] = [];
        selected: Area | null = null;
        population = '';
        births = '';
        deaths = '';
        migrations = '';
        sinceLabel = '';

        private data: Record<string, RawArea> = {};
        private since = new Date();
        private timer?: ReturnType<typeof setInterval>;

        async onInit() {
            try {
                const [populations, renames, startDate] = await Promise.all([
                    fetch('populations.json').then((r) => r.json()),
                    fetch('regions-rename.json').then((r) => r.json()),
                    fetch('stats-start-date.json').then((r) => r.json()),
                ]);

                this.data = populations;
                this.since = new Date(startDate);
                this.sinceLabel = this.since.toLocaleDateString();

                const split = splitAreas(populations, renames);
                this.countries = split.countries;
                this.regions = split.regions;
            } catch {
                this.problem = 'Could not load the population statistics.';
            }

            this.loading = false;
        }

        onDestroy() {
            clearInterval(this.timer);
        }

        select(id: number) {
            const area = this.data[String(id)];
            if (!area) return;

            // Keep the renamed label the list is showing.
            const named =
                [...this.regions, ...this.countries].find((a) => a.I === id) ??
                area;

            clearInterval(this.timer);
            const tick = () => {
                this.selected = projectArea(named, this.since);
                this.population = formatCount(this.selected.population);
                this.births = formatCount(this.selected.births);
                this.deaths = formatCount(this.selected.deaths);
                this.migrations = formatCount(this.selected.migrations);
            };

            tick();
            this.timer = setInterval(tick, TICK_MS);
        }

        back() {
            clearInterval(this.timer);
            this.timer = undefined;
            this.selected = null;
        }
    }
);
