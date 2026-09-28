/**
 * Sample output from a D&D Helper rules file: <psr-sample source="..."></psr-sample>
 *
 * The rules files are random-table definitions. This rolls on one so the
 * page can show what the file produces before anyone downloads it. The
 * file is only fetched when someone asks for a sample, because this page
 * carries fourteen of these.
 */
import { component, css, html } from 'fudgel';
import Psr from 'psr';

component(
    'psr-sample',
    {
        attr: ['source'],
        style: css`
            :host {
                display: block;
                margin: 0.5em 0;
            }

            .output {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
                white-space: pre-wrap;
            }
        `,
        template: html`
            <button type="button" *if="!shown" @click="open()">
                Generate Samples
            </button>

            <div *if="shown">
                <div *if="loading" class="output">Loading rules</div>
                <div *if="problem" class="output">Error loading rules</div>
                <div *if="ready">
                    <button type="button" @click="again()">
                        Generate another
                    </button>
                    <button type="button" @click="close()">Hide</button>
                    <div class="output">{{sample}}</div>
                </div>
            </div>
        `,
    },
    class {
        source = '';
        shown = false;
        loading = false;
        problem = false;
        ready = false;
        sample = '';

        private psr: { generate(): string } | null = null;

        async open() {
            this.shown = true;

            if (this.psr) {
                this.again();
                return;
            }

            this.loading = true;
            try {
                const response = await fetch(this.source);
                if (!response.ok) throw new Error(String(response.status));
                this.psr = new Psr(await response.text());
                this.ready = true;
                this.again();
            } catch {
                this.problem = true;
            }
            this.loading = false;
        }

        again() {
            this.sample = this.psr?.generate() ?? '';
        }

        close() {
            this.shown = false;
        }
    }
);
