/**
 * The plain encode/decode form most of the code pages use: pick a
 * direction, type a message, read the result.
 *
 *     <simple-code code="morse" topic="morse" label="The text to encode or decode">
 *     </simple-code>
 *
 * Pages whose code takes extra settings (letter numbers, rot13, binary) have
 * their own component instead, built from the same shared widgets.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

component(
    'simple-code',
    {
        attr: ['code', 'topic', 'label', 'placeholder', 'symmetric', 'withAlphabet', 'verbs'],
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }
        `,
        template: html`
            <p class="field" *if="!isSymmetric">
                <label>
                    Operating mode:
                    <select @input="setDirection($event)">
                        <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">
                            {{encryptLabel}}
                        </option>
                        <option value="DECRYPT" .selected="direction === 'DECRYPT'">
                            {{decryptLabel}}
                        </option>
                    </select>
                </label>
            </p>

            <div class="field" *if="usesAlphabet">
                <keyed-alphabet
                    .selection="alphabet"
                    @selection-change="setAlphabet($event)"
                ></keyed-alphabet>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    .label="label"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                .placeholder="placeholderText"
            ></cipher-output>
        `,
    },
    class {
        code = '';
        topic = '';
        label = '';
        placeholder = '';
        /** Present when encoding and decoding are the same operation. */
        symmetric: string | null = null;
        /** Present when the reader may choose and key the alphabet. */
        withAlphabet: string | null = null;
        /** "code" for Encode/Decode, anything else for Encrypt/Decrypt. */
        verbs = 'code';

        direction: Direction = 'ENCRYPT';
        alphabet: AlphabetSelection = defaultAlphabet();
        input = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };

        isSymmetric = false;
        usesAlphabet = false;
        encryptLabel = 'Encode';
        decryptLabel = 'Decode';
        placeholderText = 'Enter text to see it encoded or decoded here';

        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample(
                this.topic || this.code,
                this,
                () => this.recompute()
            );
        }

        onViewInit() {
            this.readSettings();
            this.recompute();
        }

        onChange() {
            this.readSettings();
            this.recompute();
        }

        onDestroy() {
            this.stopListening?.();
        }

        private readSettings() {
            this.isSymmetric = this.symmetric !== null && this.symmetric !== undefined;
            this.usesAlphabet =
                this.withAlphabet !== null && this.withAlphabet !== undefined;

            const coding = this.verbs === 'code';
            this.encryptLabel = coding ? 'Encode' : 'Encrypt';
            this.decryptLabel = coding ? 'Decode' : 'Decrypt';
            this.placeholderText =
                this.placeholder ||
                (this.isSymmetric
                    ? 'Enter text to see the result here'
                    : 'Enter text to see it encoded or decoded here');
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

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        private recompute() {
            this.outcome = this.input.trim()
                ? runCipher({
                      name: this.code,
                      direction: this.isSymmetric ? 'ENCRYPT' : this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
