/**
 * A worked example sitting in the prose of the Baconian page, showing a
 * fixed code hidden inside a fixed sentence.
 *
 *     <baconian-example
 *         message="This is a test message..."
 *         code="baabbaabaabaababaabb abaaabaabb"
 *         style-name="bold-italic"
 *     ></baconian-example>
 */
import { component, css, html } from 'fudgel';
import { defaultAlphabet } from './alphabet.ts';
import { embed, type Run } from './baconian.ts';

component(
    'baconian-example',
    {
        attr: ['message', 'code', 'styleName'],
        style: css`
            :host {
                display: block;
            }

            .example {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                overflow-wrap: anywhere;
                padding: 0.5em;
            }

            .bold {
                font-weight: bold;
            }

            .italic {
                font-style: italic;
            }

            .bold-italic {
                font-style: italic;
                font-weight: bold;
            }
        `,
        template: html`
            <div class="example">
                <span *for="run of runs" class="{{run.className}}"
                    >{{run.text}}</span
                >
            </div>
        `,
    },
    class {
        message = '';
        code = '';
        styleName = 'bold';
        runs: (Run & { className: string })[] = [];

        onViewInit() {
            this.recompute();
        }

        onChange() {
            this.recompute();
        }

        private recompute() {
            this.runs = embed(
                defaultAlphabet(),
                this.code ?? '',
                this.message ?? ''
            ).runs.map((run) => ({
                ...run,
                className: run.styled ? this.styleName : '',
            }));
        }
    }
);
