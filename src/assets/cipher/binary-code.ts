/**
 * Binary: <binary-code></binary-code>
 *
 * Adds one action to the plain code form: swapping zeros for ones, which
 * turns an inverted transcription back into something the decoder can read.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import { defaultAlphabet } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';
import { swapZerosAndOnes } from './text-transforms.ts';

component(
    'binary-code',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .link {
                background: none;
                border: 0;
                color: inherit;
                cursor: pointer;
                font: inherit;
                padding: 0;
                text-decoration: underline;
            }
        `,
        template: html`
            <p class="field">
                <label>
                    Operating mode:
                    <select @input="setDirection($event)">
                        <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">
                            Encode
                        </option>
                        <option value="DECRYPT" .selected="direction === 'DECRYPT'">
                            Decode
                        </option>
                    </select>
                </label>
            </p>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    label="The text to encode or decode"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <p class="field">
                <button class="link" type="button" @click="swap()">
                    Swap zeros and ones
                </button>
            </p>

            <cipher-output
                .outcome="outcome"
                placeholder="Enter text to see it encoded or decoded here"
            ></cipher-output>
        `,
    },
    class {
        direction: Direction = 'ENCRYPT';
        input = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('binary', this, () =>
                this.recompute()
            );
            this.recompute();
        }

        onDestroy() {
            this.stopListening?.();
        }

        setDirection(event: Event) {
            this.direction = (event.target as HTMLSelectElement).value as Direction;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        swap() {
            this.input = swapZerosAndOnes(this.input);
            this.recompute();
        }

        private recompute() {
            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'binary',
                      direction: this.direction,
                      message: this.input,
                      alphabet: defaultAlphabet(),
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
