/**
 * Rot13: <rot13-cipher></rot13-cipher>
 *
 * Encoding and decoding are the same operation, so there is no direction to
 * pick. The alphabet has to have an even number of letters for the halfway
 * point to exist at all, which is why the alphabet can be changed here.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { buildAlphabet, defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

component(
    'rot13-cipher',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }
        `,
        template: html`
            <div class="field">
                <keyed-alphabet
                    .selection="alphabet"
                    @selection-change="setAlphabet($event)"
                ></keyed-alphabet>
            </div>

            <p class="field">
                <label>
                    <input
                        type="checkbox"
                        .checked="rot5"
                        @change="toggleRot5($event)"
                    />
                    Also ROT5 digits
                </label>
            </p>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                placeholder="{{placeholder}}"
            ></cipher-output>
        `,
    },
    class {
        alphabet: AlphabetSelection = defaultAlphabet();
        rot5 = false;
        input = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        placeholder = 'Enter text to see it encoded or decoded here';
        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('rot13', this, () =>
                this.recompute()
            );
            this.recompute();
        }

        onDestroy() {
            this.stopListening?.();
        }

        setAlphabet(event: CustomEvent<AlphabetSelection>) {
            this.alphabet = event.detail;
            this.recompute();
        }

        toggleRot5(event: Event) {
            this.rot5 = (event.target as HTMLInputElement).checked;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        private recompute() {
            const letters = String(
                buildAlphabet(this.alphabet).letterOrder.upper
            );

            // Rotating by half only works if there is a half to rotate by.
            if (letters.length % 2 === 1) {
                this.placeholder =
                    'This alphabet has an odd number of letters. Select another to encode or decode messages.';
                this.outcome = { text: '', display: '', warnings: [] };
                return;
            }

            this.placeholder = 'Enter text to see it encoded or decoded here';
            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'rot13',
                      direction: 'ENCRYPT',
                      message: this.input,
                      alphabet: this.alphabet,
                      options: { rot5Numbers: this.rot5 },
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
