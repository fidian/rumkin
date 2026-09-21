/**
 * Letter numbers: <letter-numbers-code></letter-numbers-code>
 *
 * A is 1, B is 2, and so on, with the reader choosing what separates the
 * numbers and whether they are padded to the same width.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

const DELIMITERS = [
    { value: '-', label: 'Hyphen' },
    { value: ' ', label: 'Space' },
    { value: '', label: 'None' },
];

component(
    'letter-numbers-code',
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
                <keyed-alphabet
                    .selection="alphabet"
                    @selection-change="setAlphabet($event)"
                ></keyed-alphabet>
            </div>

            <p class="field">
                <label>
                    Delimiter between encoded letters:
                    <select @input="setDelimiter($event)">
                        <option
                            *for="option of delimiters"
                            .value="option.value"
                            .selected="option.value === delimiter"
                        >
                            {{option.label}}
                        </option>
                    </select>
                </label>
            </p>

            <p class="field">
                <label>
                    <input
                        type="checkbox"
                        .checked="padWithZeros"
                        @change="togglePad($event)"
                    />
                    Pad the numbers with zeros so all codes are the same length
                </label>
            </p>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    label="The text to encode or decode"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                placeholder="Enter text to see it encoded or decoded here"
            ></cipher-output>
        `,
    },
    class {
        direction: Direction = 'ENCRYPT';
        alphabet: AlphabetSelection = defaultAlphabet();
        delimiter = '-';
        padWithZeros = false;
        input = '';
        delimiters = DELIMITERS;
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        private stopListening?: () => void;

        onInit() {
            // The page's own examples use the "morse" topic; that is what is
            // written into its markup, so that is what has to be listened for.
            this.stopListening = listenForExample('morse', this, () =>
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

        setAlphabet(event: CustomEvent<AlphabetSelection>) {
            this.alphabet = event.detail;
            this.recompute();
        }

        setDelimiter(event: Event) {
            this.delimiter = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        togglePad(event: Event) {
            this.padWithZeros = (event.target as HTMLInputElement).checked;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        private recompute() {
            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'letterNumber',
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      options: {
                          delimiter: this.delimiter,
                          padWithZeros: this.padWithZeros,
                      },
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
