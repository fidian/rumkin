/**
 * Marco registration: <marco-register></marco-register>
 *
 * The algorithm is in marco-register.ts.
 */
import { component, css, html } from 'fudgel';
import { MESSAGES, unlockCodeFor } from './marco-register.ts';

component(
    'marco-register',
    {
        style: css`
            :host {
                display: block;
            }

            input {
                font: inherit;
                width: 100%;
            }

            .output {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
            }
        `,
        template: html`
            <p>
                <label>
                    Registration code
                    <input
                        type="text"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        @input="check($event)"
                    />
                </label>
            </p>
            <div class="output">{{message}}</div>
        `,
    },
    class {
        message = MESSAGES.EMPTY;

        check(event: Event) {
            const result = unlockCodeFor(
                (event.target as HTMLInputElement).value
            );
            this.message = result.unlockCode
                ? `Your unlock code is ${result.unlockCode}`
                : MESSAGES[result.errorCode!];
        }
    }
);
