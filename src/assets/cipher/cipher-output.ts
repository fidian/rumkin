/**
 * The box a cipher's result appears in, with any warnings above it.
 *
 *     <cipher-output .outcome="result" placeholder="Enter text..."></cipher-output>
 */
import { component, css, html } from 'fudgel';
import type { CipherOutcome } from './cipher-result.ts';

component(
    'cipher-output',
    {
        prop: ['outcome'],
        attr: ['placeholder'],
        style: css`
            :host {
                display: block;
            }

            .box {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                overflow-wrap: anywhere;
                padding: 0.5em;
                white-space: pre-line;
            }

            .box tt {
                font-family: var(--font-anonymous-pro), monospace;
            }

            .warnings {
                background-color: #faa;
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
            }

            .error {
                color: #a00;
                font-weight: bold;
            }
        `,
        template: html`
            <div class="warnings" *if="outcome.warnings.length">
                {{warningIntro}}
                <ul>
                    <li *for="warning of outcome.warnings">{{warning}}</li>
                </ul>
            </div>

            <div class="box">
                <tt *if="!outcome.error">{{body}}</tt>
                <span class="error" *if="outcome.error">{{outcome.error}}</span>
            </div>
        `,
    },
    class {
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        placeholder = '';
        body = '';
        warningIntro = '';

        onInit() {
            this.recompute();
        }

        onChange() {
            this.recompute();
        }

        private recompute() {
            const warnings = this.outcome?.warnings ?? [];
            this.warningIntro =
                warnings.length > 1
                    ? 'The following problems have been detected.'
                    : 'The following problem has been detected.';
            this.body = this.outcome?.display || this.placeholder;
        }
    }
);
