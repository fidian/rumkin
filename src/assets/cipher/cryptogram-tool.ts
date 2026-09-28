/**
 * The cryptogram worksheet: <cryptogram-tool></cryptogram-tool>
 *
 * Paste the cipher text, guess what each symbol stands for, and read the
 * message forming underneath. The layout logic is in cryptogram.ts.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import {
    buildMappings,
    HIGHLIGHTS,
    layout,
    mappingList,
    translate,
    type LayoutLetter,
    type LetterMapping,
} from './cryptogram.ts';

interface Row {
    index: number;
    words: { letters: LayoutLetter[] }[];
}

component(
    'cryptogram-tool',
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
                justify-content: center;
            }

            .key {
                align-items: center;
                border: 1px solid;
                display: flex;
                flex-direction: column;
                font-size: 1.2em;
                margin: 0.5em;
                padding: 0.5em;
            }

            .key input {
                font-size: 1.2em;
                text-align: center;
                width: 2em;
            }

            .line {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            .word {
                display: flex;
                margin: 0.1em 0.25em;
            }

            .letter {
                align-items: center;
                display: flex;
                flex-direction: column;
            }

            .letter tt {
                font-family: var(--font-anonymous-pro), monospace;
            }

            .red {
                background-color: lightcoral;
            }
            .orange {
                background-color: orange;
            }
            .yellow {
                background-color: yellow;
            }
            .green {
                background-color: lightgreen;
            }
            .blue {
                background-color: lightblue;
            }
            .purple {
                background-color: orchid;
            }
        `,
        template: html`
            <div class="field">
                <advanced-input-area
                    .value="input"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <div class="keys">
                <div *for="entry of keys" class="key {{entry.colour}}">
                    <div>{{entry.from}}</div>
                    <input
                        type="text"
                        maxlength="1"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        .value="entry.to"
                        @input="setGuess(entry.from, $event)"
                    />
                    <select @input="setColour(entry.from, $event)">
                        <option
                            *for="choice of highlights"
                            .value="choice.value"
                            .selected="choice.value === entry.colour"
                        >
                            {{choice.label}}
                        </option>
                    </select>
                </div>
            </div>

            <div *for="row of rows" class="line">
                <div *for="word of row.words" class="word">
                    <div *for="letter of word.letters" class="letter">
                        <tt>{{letter.from}}</tt>
                        <tt class="{{letter.colour}}">{{letter.to}}</tt>
                    </div>
                </div>
            </div>

            <p *if="input">
                <button type="button" @click="copy()" .disabled="copied">
                    {{copied ? 'Copied!' : 'Copy Result'}}
                </button>
            </p>
        `,
    },
    class {
        input = '';
        keys: LetterMapping[] = [];
        rows: Row[] = [];
        highlights = HIGHLIGHTS;
        copied = false;

        private mappings = new Map<string, LetterMapping>();
        private copyTimer?: ReturnType<typeof setTimeout>;

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.mappings = buildMappings(this.input, this.mappings);
            this.rebuild();
        }

        setGuess(from: string, event: Event) {
            const mapping = this.mappings.get(from);
            if (!mapping) return;
            mapping.to = (event.target as HTMLInputElement).value;
            this.rebuild();
        }

        setColour(from: string, event: Event) {
            const mapping = this.mappings.get(from);
            if (!mapping) return;
            mapping.colour = (event.target as HTMLSelectElement).value;
            this.rebuild();
        }

        copy() {
            navigator.clipboard?.writeText(translate(this.input, this.mappings));
            this.copied = true;
            clearTimeout(this.copyTimer);
            this.copyTimer = setTimeout(() => {
                this.copied = false;
            }, 2000);
        }

        onDestroy() {
            clearTimeout(this.copyTimer);
        }

        private rebuild() {
            // New arrays, so the bindings see a top-level assignment.
            this.keys = mappingList(this.mappings).map((mapping) => ({
                ...mapping,
            }));
            this.rows = layout(this.input, this.mappings).map((words, index) => ({
                index,
                words: words.map((letters) => ({ letters })),
            }));
        }
    }
);
