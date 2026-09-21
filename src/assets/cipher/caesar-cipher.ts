/**
 * The Caesar shift tool: <caesar-cipher></caesar-cipher>
 *
 * This is the worked example the other keyed ciphers follow. The shape is
 * always the same: the controller owns plain properties, the shared widgets
 * edit them through events, and runCipher() does the work.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { buildAlphabet, defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

component(
    'caesar-cipher',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .alphabets {
                display: flex;
                justify-content: center;
            }

            .alphabets pre {
                font-family: var(--font-anonymous-pro), monospace;
                overflow-x: auto;
            }
        `,
        template: html`
            <p class="field">
                <label>
                    Operating mode:
                    <select @input="setDirection($event)">
                        <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">
                            Encrypt
                        </option>
                        <option value="DECRYPT" .selected="direction === 'DECRYPT'">
                            Decrypt
                        </option>
                    </select>
                </label>
            </p>

            <div class="field">
                <keyed-alphabet
                    .selection="alphabet"
                    @selection-change="setAlphabet($event)"
                ></keyed-alphabet>
            </div>

            <p class="field">
                <label>
                    N:
                    <select @input="setN($event)">
                        <option
                            *for="option of nOptions"
                            .value="option"
                            .selected="option === n"
                        >
                            {{option}}
                        </option>
                    </select>
                </label>
            </p>

            <div class="alphabets">
                <pre>{{alphabetTable}}</pre>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                placeholder="Enter text to see the result here"
            ></cipher-output>
        `,
    },
    class {
        direction: Direction = 'ENCRYPT';
        alphabet: AlphabetSelection = defaultAlphabet();
        n = 3;
        input = '';
        nOptions: number[] = [];
        alphabetTable = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('caesar', this, () =>
                this.recompute()
            );
            this.recompute();
        }

        onDestroy() {
            this.stopListening?.();
        }

        setDirection(event: Event) {
            this.direction = (event.target as HTMLSelectElement)
                .value as Direction;
            this.recompute();
        }

        setAlphabet(event: CustomEvent<AlphabetSelection>) {
            this.alphabet = event.detail;
            this.recompute();
        }

        setN(event: Event) {
            this.n = Number((event.target as HTMLSelectElement).value);
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        private recompute() {
            const keyed = buildAlphabet(this.alphabet);
            const letters = String(keyed.letterOrder.upper);

            // The shift can only be as large as the alphabet, and the
            // alphabet changes when the reader keys it.
            this.nOptions = [...letters].map((_, i) => i);
            if (this.n >= letters.length) this.n = letters.length - 1;

            const plain = String(
                buildAlphabet({ ...this.alphabet, alphabetKey: '' }).letterOrder
                    .upper
            );
            const encoded = letters.slice(this.n) + letters.slice(0, this.n);
            this.alphabetTable = `Letters: ${plain}\n  Keyed: ${letters}\nEncoded: ${encoded}`;

            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'caesar',
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      options: { shift: this.n },
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
