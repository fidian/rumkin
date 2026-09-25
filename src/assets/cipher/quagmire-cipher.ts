/**
 * The Quagmire page: <quagmire-cipher></quagmire-cipher>
 *
 * Its own component rather than a defineCipher() declaration, because it
 * takes two keyed alphabets instead of one and because the tableau is worth
 * showing. The tableau itself is built by quagmire-tableau.ts, which has no
 * DOM in it and is tested against the tables the ACA prints.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import { defaultAlphabet } from './alphabet.ts';
import { buildTableau, type Tableau } from './quagmire-tableau.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

component(
    'quagmire-cipher',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .keys {
                display: flex;
                flex-wrap: wrap;
                gap: 0 1.5em;
            }

            .alphabet {
                font-family: var(--font-anonymous-pro), monospace;
                font-weight: bold;
            }

            .tableau {
                font-family: var(--font-anonymous-pro), monospace;
                margin-top: 0.75em;
                max-height: 60vh;
                overflow: auto;
                white-space: pre;
            }

            .tableau-row {
                display: block;
            }

            .mark {
                background-color: #fdd;
                font-weight: bold;
            }
        `,
        template: html`
            <p class="field">
                <label>
                    Operating mode:
                    <select @input="setField('direction', $event)">
                        <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">
                            Encrypt
                        </option>
                        <option value="DECRYPT" .selected="direction === 'DECRYPT'">
                            Decrypt
                        </option>
                    </select>
                </label>
            </p>

            <div class="field keys">
                <p>
                    <label>
                        Plain alphabet key:
                        <input type="text" .value="plainKey"
                            @input="setField('plainKey', $event)" />
                    </label>
                </p>
                <p>
                    <label>
                        Cipher alphabet key:
                        <input type="text" .value="cipherKey"
                            @input="setField('cipherKey', $event)" />
                    </label>
                </p>
            </div>

            <p class="field">
                Plain alphabet: <span class="alphabet">{{tableau.header}}</span>
            </p>

            <div class="field keys">
                <p>
                    <label>
                        Indicator key:
                        <input type="text" .value="key"
                            @input="setField('key', $event)" />
                    </label>
                </p>
                <p>
                    <label>
                        Written under plaintext letter:
                        <input type="text" size="2" maxlength="1" .value="align"
                            @input="setField('align', $event)" />
                    </label>
                </p>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    label="Message"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                placeholder="Enter a message to see it enciphered or deciphered here"
            ></cipher-output>

            <p class="field">
                <button type="button" @click="toggleTableau()">
                    {{showTableau ? 'Hide' : 'Show'}} tableau
                </button>
            </p>

            <div class="tableau" *if="showTableau">
                <span class="tableau-row"
                    >&nbsp; | <span class="alphabet">{{tableau.header}}</span></span
                >
                <span class="tableau-row" *for="row of tableau.rows"
                    >{{row.label}} | {{row.before}}<span class="mark"
                        >{{row.letter}}</span
                    >{{row.after}}</span
                >
            </div>
        `,
    },
    class {
        align = 'A';
        cipherKey = '';
        direction: Direction = 'ENCRYPT';
        input = '';
        key = '';
        plainKey = '';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        showTableau = false;

        // Split around the marked column, because a template cannot slice a
        // string and the highlight has to sit inside the row.
        tableau: {
            header: string;
            rows: { after: string; before: string; label: string; letter: string }[];
        } = { header: '', rows: [] };

        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('quagmire', this, () =>
                this.recompute()
            );
        }

        onViewInit() {
            this.recompute();
        }

        onDestroy() {
            this.stopListening?.();
        }

        setField(name: 'align' | 'cipherKey' | 'direction' | 'key' | 'plainKey', event: Event) {
            const value = (event.target as HTMLInputElement | HTMLSelectElement).value;

            (this as Record<string, unknown>)[name] = value;
            this.recompute();
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        toggleTableau() {
            this.showTableau = !this.showTableau;
        }

        private recompute() {
            this.tableau = this.splitRows(
                buildTableau({
                    align: this.align,
                    cipherKey: this.cipherKey,
                    key: this.key,
                    plainKey: this.plainKey,
                })
            );

            this.outcome = this.input.trim()
                ? runCipher({
                      name: 'quagmire',
                      direction: this.direction,
                      message: this.input,
                      alphabet: defaultAlphabet(),
                      options: {
                          align: this.align,
                          cipherKey: this.cipherKey,
                          key: this.key,
                          plainKey: this.plainKey,
                      },
                  })
                : { text: '', display: '', warnings: [] };
        }

        private splitRows(tableau: Tableau) {
            return {
                header: tableau.header,
                rows: tableau.rows.map((row) => ({
                    after: row.letters.slice(row.markAt + 1),
                    before: row.letters.slice(0, row.markAt),
                    label: row.label,
                    letter: row.letters.charAt(row.markAt),
                })),
            };
        }
    }
);
