/**
 * The symbol-font pages: pigpen, wingdings, semaphore, ASL and the rest.
 * Each shows a palette of characters to click, a message box, and the
 * message rendered in a font that draws the symbols.
 *
 *     <font-code
 *         font="wingdings"
 *         rows='[{"label":"Uppercase:","chars":"ABC..."}]'
 *     ></font-code>
 *
 * Some have more than one drawing of the same alphabet, which becomes a
 * dropdown:
 *
 *     <font-code
 *         rows='[...]'
 *         variants='[{"font":"pigpen-hhxx","label":"Original Version"}]'
 *         variant-label="Pigpen variant"
 *     ></font-code>
 *
 * There is no encoding step here - the letters are the same, only drawn
 * differently - so there is no direction to choose and nothing to decode.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';

interface PaletteRow {
    label: string;
    chars: string;
}

interface Variant {
    font: string;
    label: string;
}

const parseJson = <T>(value: string, fallback: T): T => {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        // A malformed attribute should not blank the page.
        console.error('font-code: could not parse', value);
        return fallback;
    }
};

component(
    'font-code',
    {
        attr: ['font', 'rows', 'variants', 'variantLabel', 'label'],
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .palette {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding: 0.25em 0;
            }

            .palette button {
                cursor: pointer;
                line-height: 1;
                padding: 0.1em 0.2em;
            }

            .result {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                overflow-wrap: anywhere;
                padding: 0.5em;
                white-space: pre-line;
            }
        `,
        template: html`
            <p class="field" *if="hasVariants">
                <label>
                    {{variantLabel}}:
                    <select @input="setVariant($event)">
                        <option
                            *for="variant of variantList"
                            .value="variant.font"
                            .selected="variant.font === activeFont"
                        >
                            {{variant.label}}
                        </option>
                    </select>
                </label>
            </p>

            <p>
                Use these buttons to insert the corresponding letter in the
                input area below.
            </p>

            <div *for="row of rowList">
                <div class="palette">
                    <span *if="row.label">{{row.label}}&nbsp;</span>
                    <button
                        *for="character of row.list"
                        type="button"
                        @click="insert(character)"
                    >
                        <span class="{{activeFont}}">{{character}}</span>
                    </button>
                </div>
            </div>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    .label="label"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <div class="result">
                <span class="{{activeFont}}" *if="input">{{input}}</span>
                <span *if="!input">Enter text to see it encoded here</span>
            </div>
        `,
    },
    class {
        font = '';
        rows = '';
        variants = '';
        variantLabel = 'Variant';
        label = 'The text to encode';

        input = '';
        activeFont = '';
        hasVariants = false;
        variantList: Variant[] = [];
        rowList: (PaletteRow & { list: string[] })[] = [];

        onViewInit() {
            this.readSettings();
        }

        onChange() {
            this.readSettings();
        }

        private readSettings() {
            this.variantList = parseJson<Variant[]>(this.variants, []);
            this.hasVariants = this.variantList.length > 0;

            // Spread, so a character outside the basic plane stays whole.
            this.rowList = parseJson<PaletteRow[]>(this.rows, []).map((row) => ({
                ...row,
                list: [...row.chars],
            }));

            if (!this.activeFont) {
                this.activeFont = this.font || this.variantList[0]?.font || '';
            }
        }

        setVariant(event: Event) {
            this.activeFont = (event.target as HTMLSelectElement).value;
        }

        insert(character: string) {
            this.input = this.input + character;
        }

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
        }
    }
);
