/**
 * The live validator on the email page: <email-validator></email-validator>
 *
 * Type an address and see whether isValidEmail accepts it.
 */
import { component, css, html } from 'fudgel';
import isValidEmail from './is-valid-email.ts';

component(
    'email-validator',
    {
        style: css`
            :host {
                display: block;
            }

            input {
                font: inherit;
                width: 100%;
            }

            .verdict {
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
            }

            .yes {
                background-color: #cfc;
            }

            .no {
                background-color: #fcc;
            }

            .waiting {
                background-color: #ddd;
            }
        `,
        template: html`
            <p>
                <label>
                    Email address
                    <input
                        type="text"
                        placeholder="user@example.com"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        @input="check($event)"
                    />
                </label>
            </p>
            <div class="verdict {{state}}">{{message}}</div>
        `,
    },
    class {
        state = 'waiting';
        message = 'Enter an email address above to see whether it is valid.';

        check(event: Event) {
            const address = (event.target as HTMLInputElement).value;

            if (!address) {
                this.state = 'waiting';
                this.message =
                    'Enter an email address above to see whether it is valid.';
                return;
            }

            const valid = isValidEmail(address);
            this.state = valid ? 'yes' : 'no';
            this.message = valid
                ? 'This address appears to be valid.'
                : 'This address is not valid.';
        }
    }
);
