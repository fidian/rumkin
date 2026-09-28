/**
 * Baconian: <baconian-cipher></baconian-cipher>
 *
 * Encoding has a second half the other ciphers do not: once the message is
 * letters, it can be hidden inside an innocent cover text by styling the
 * letters that carry a "b". The logic is in baconian.ts.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';
import {
    baconianAlphabet,
    embed,
    encodeBaconian,
    swapAB,
    type Run,
} from './baconian.ts';

const CONDENSING = [
    { value: 'DISTINCT', label: 'Each letter has a different code' },
    { value: 'CONDENSED', label: 'Replace J with I and replace V with U' },
];

const EMBEDDING = [
    { value: 'BOLD', label: 'Bold' },
    { value: 'EMPHASIS', label: 'Emphasis' },
    { value: 'BOLD_EMPHASIS', label: 'Bold and emphasis' },
];

component(
    'baconian-cipher',
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

            .embedded {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                overflow-wrap: anywhere;
                padding: 0.5em;
                white-space: pre-line;
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
                    Alphabet style:
                    <select @input="setCondensing($event)">
                        <option
                            *for="option of condensingChoices"
                            .value="option.value"
                            .selected="option.value === condensingOptions"
                        >
                            {{option.label}}
                        </option>
                    </select>
                </label>
            </p>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    label="The hidden message"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <p class="field">
                <button class="link" type="button" @click="swap()">
                    Swap A and B
                </button>
            </p>

            <cipher-output
                .outcome="outcome"
                placeholder="Enter text to see it encoded here"
            ></cipher-output>

            <div *if="isEncoding">
                <p class="field">
                    <label>
                        Embedding options:
                        <select @input="setEmbedding($event)">
                            <option
                                *for="option of embeddingChoices"
                                .value="option.value"
                                .selected="option.value === embeddingOptions"
                            >
                                {{option.label}}
                            </option>
                        </select>
                    </label>
                </p>

                <div class="field">
                    <advanced-input-area
                        .value="embeddingText"
                        label="Embed your message in this text"
                        @value-change="setEmbeddingText($event)"
                    ></advanced-input-area>
                </div>

                <div class="embedded" *if="embeddingText">
                    <span *for="run of runs" class="{{run.className}}"
                        >{{run.text}}</span
                    >
                </div>
                <p *if="!embeddingText">
                    Enter some text in order to see your message hidden within.
                </p>
                <p *if="embeddingText && !fits">
                    The cipher did not fit into the text provided. Try making
                    it longer. You will need one character per A or B letter in
                    the code.
                </p>
            </div>
        `,
    },
    class {
        direction: Direction = 'ENCRYPT';
        alphabet: AlphabetSelection = defaultAlphabet();
        condensingOptions = 'DISTINCT';
        embeddingOptions = 'BOLD';
        input = '';
        embeddingText = '';

        condensingChoices = CONDENSING;
        embeddingChoices = EMBEDDING;
        isEncoding = true;
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        runs: (Run & { className: string })[] = [];
        fits = true;

        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('baconian', this, () =>
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

        setCondensing(event: Event) {
            this.condensingOptions = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        setEmbedding(event: Event) {
            this.embeddingOptions = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        setEmbeddingText(event: CustomEvent<string>) {
            this.embeddingText = event.detail;
            this.recompute();
        }

        swap() {
            this.input = swapAB(this.input);
            this.recompute();
        }

        private recompute() {
            this.isEncoding = this.direction !== 'DECRYPT';

            const condensed = this.condensingOptions === 'CONDENSED';

            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'baconian',
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      squareAlphabet: baconianAlphabet(this.alphabet, condensed),
                  })
                : { text: '', display: '', warnings: [] };

            if (!this.isEncoding || !this.embeddingText) {
                this.runs = [];
                this.fits = true;
                return;
            }

            const className =
                this.embeddingOptions === 'BOLD'
                    ? 'bold'
                    : this.embeddingOptions === 'EMPHASIS'
                      ? 'italic'
                      : 'bold-italic';

            const result = embed(
                this.alphabet,
                encodeBaconian(this.alphabet, condensed, this.input),
                this.embeddingText
            );

            this.runs = result.runs.map((run) => ({
                ...run,
                className: run.styled ? className : '',
            }));
            this.fits = result.fits;
        }
    }
);
