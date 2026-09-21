/**
 * The geocaching scoreboard: <score-board></score-board>
 *
 * Three views of the same tallies - the top ten, everyone by score, and
 * everyone by name. The counting is in scoreboard.ts; the tallies are in
 * src/data/scoreboard-tallies.json, which is the page's data rather than
 * its code.
 */
import { component, css, html } from 'fudgel';
import tallies from '@/data/scoreboard-tallies.json';
import { byName, byScore, countScores, topTen } from './scoreboard.ts';

const scores = countScores(tallies as string[]);

const VIEWS = [
    { key: 'top10', label: 'Top 10', entries: topTen(scores), ordered: true },
    { key: 'full', label: 'Full List', entries: byScore(scores), ordered: true },
    { key: 'name', label: 'By Name', entries: byName(scores), ordered: false },
];

component(
    'score-board',
    {
        style: css`
            :host {
                display: block;
            }

            .menu {
                margin: 0.5em 0;
            }

            .link {
                background: none;
                border: 0;
                color: inherit;
                cursor: pointer;
                font: inherit;
                padding: 0 0.5em;
                text-decoration: underline;
            }

            .link.active {
                font-weight: bold;
                text-decoration: none;
            }
        `,
        template: html`
            <div class="menu">
                <button
                    *for="view of views"
                    type="button"
                    class="link {{view.key === chosen ? 'active' : ''}}"
                    @click="choose(view.key)"
                >
                    {{view.label}}
                </button>
            </div>

            <ol *if="ordered">
                <li *for="entry of entries">{{entry.name}} = {{entry.count}}</li>
            </ol>
            <ul *if="!ordered">
                <li *for="entry of entries">{{entry.name}} = {{entry.count}}</li>
            </ul>
        `,
    },
    class {
        views = VIEWS;
        chosen = 'top10';
        entries = VIEWS[0].entries;
        ordered = true;

        choose(key: string) {
            const view = VIEWS.find((v) => v.key === key);
            if (!view) return;
            this.chosen = key;
            this.entries = view.entries;
            this.ordered = view.ordered;
        }
    }
);
