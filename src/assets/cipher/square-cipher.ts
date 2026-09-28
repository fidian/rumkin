/**
 * Bifid and Playfair, which lay the alphabet out in a square grid.
 *
 *     <square-cipher code="bifid" topic="bifid"></square-cipher>
 *     <square-cipher code="playfair" topic="playfair" with-doubles></square-cipher>
 *
 * The square needs a square number of letters, so the reader is shown which
 * letters are being merged and can change them. See polybius-alphabet.ts.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';
import {
    collapseAlphabet,
    defaultTranslations,
    lettersOf,
    type Translation,
} from './polybius-alphabet.ts';

const DOUBLES = [
    { value: 'PAD', label: 'Insert a padding letter between them' },
    { value: 'KEEP', label: 'Leave them as they are' },
];

component(
    'square-cipher',
    {
        attr: ['code', 'topic', 'withDoubles'],
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .square {
                display: flex;
                justify-content: center;
            }

            .square pre {
                font-family: var(--font-anonymous-pro), monospace;
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

            <p class="field" *if="hasDoubles">
                <label>
                    How to handle double letters:
                    <select @input="setDoubles($event)">
                        <option
                            *for="option of doubleOptions"
                            .value="option.value"
                            .selected="option.value === doubles"
                        >
                            {{option.label}}
                        </option>
                    </select>
                </label>
            </p>

            <div class="field">
                <p>
                    The square holds {{squareSize}} letters, so these are
                    written as each other:
                </p>
                <p *for="row of translationRows">
                    <label>
                        Write
                        <select @input="setFrom(row.index, $event)">
                            <option
                                *for="letter of letters"
                                .value="letter"
                                .selected="letter === row.from"
                            >
                                {{letter}}
                            </option>
                        </select>
                        as
                        <select @input="setTo(row.index, $event)">
                            <option
                                *for="letter of letters"
                                .value="letter"
                                .selected="letter === row.to"
                            >
                                {{letter}}
                            </option>
                        </select>
                    </label>
                </p>
            </div>

            <div class="square">
                <pre>{{grid}}</pre>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    label="The message to encipher or decipher"
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
        code = '';
        topic = '';
        withDoubles: string | null = null;

        direction: Direction = 'ENCRYPT';
        alphabet: AlphabetSelection = defaultAlphabet();
        doubles = 'PAD';
        input = '';
        /** Space-separated letter pairs, the form the page examples use. */
        translations = '';

        hasDoubles = false;
        doubleOptions = DOUBLES;
        letters: string[] = [];
        translationRows: (Translation & { index: number })[] = [];
        squareSize = 0;
        grid = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };

        private pairs: Translation[] = [];
        private stopListening?: () => void;

        onInit() {
            this.pairs = defaultTranslations(this.alphabet);
            this.stopListening = listenForExample(
                this.topic || this.code,
                this,
                () => {
                    // An example carries its merges as "JI YX".
                    if (this.translations) {
                        this.pairs = this.translations
                            .split(' ')
                            .filter((pair) => pair.length === 2)
                            .map((pair) => ({ from: pair[0], to: pair[1] }));
                    }
                    this.recompute();
                }
            );
            this.recompute();
        }

        onViewInit() {
            this.hasDoubles =
                this.withDoubles !== null && this.withDoubles !== undefined;
        }

        onChange() {
            this.hasDoubles =
                this.withDoubles !== null && this.withDoubles !== undefined;
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
            // The old merges may name letters this alphabet does not have;
            // collapseAlphabet repairs them.
            this.recompute();
        }

        setDoubles(event: Event) {
            this.doubles = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        setFrom(index: number, event: Event) {
            this.pairs = this.pairs.map((pair, i) =>
                i === index
                    ? { ...pair, from: (event.target as HTMLSelectElement).value }
                    : pair
            );
            this.recompute();
        }

        setTo(index: number, event: Event) {
            this.pairs = this.pairs.map((pair, i) =>
                i === index
                    ? { ...pair, to: (event.target as HTMLSelectElement).value }
                    : pair
            );
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        private recompute() {
            const { alphabet, translations } = collapseAlphabet(
                this.alphabet,
                this.pairs
            );
            this.pairs = translations;
            this.translationRows = translations.map((pair, index) => ({
                ...pair,
                index,
            }));
            this.letters = lettersOf(this.alphabet);

            const letters = String(alphabet.letterOrder.upper);
            const side = Math.round(Math.sqrt(letters.length));
            this.squareSize = letters.length;
            this.grid = Array.from({ length: side }, (_, row) =>
                [...letters.slice(row * side, row * side + side)].join(' ')
            ).join('\n');

            this.outcome = this.input.trim()
                ? runCipher({
                      name: this.code,
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      squareAlphabet: alphabet,
                      options: this.hasDoubles ? { doubles: this.doubles } : undefined,
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
