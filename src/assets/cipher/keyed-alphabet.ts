/**
 * Picks the alphabet a cipher works in and, optionally, shuffles it with a
 * key word.
 *
 *     <keyed-alphabet
 *         .selection="alphabet"
 *         @selection-change="setAlphabet($event.detail)"
 *     ></keyed-alphabet>
 *
 * The detail of the event is a whole AlphabetSelection, so the page owns the
 * state and this element only edits it.
 */
import { component, css, emit, html } from 'fudgel';
import {
    alphabetNames,
    buildAlphabet,
    defaultAlphabet,
    type AlphabetSelection,
} from './alphabet.ts';

component(
    'keyed-alphabet',
    {
        prop: ['selection'],
        style: css`
            :host {
                display: block;
            }

            .row {
                margin: 0.15em 0;
            }

            .result {
                font-family: var(--font-anonymous-pro), monospace;
                overflow-wrap: anywhere;
            }
        `,
        template: html`
            <div class="row">
                <label>
                    Alphabet:
                    <select @input="setName($event)">
                        <option
                            *for="name of names"
                            .value="name"
                            .selected="name === selection.name"
                        >
                            {{name}}
                        </option>
                    </select>
                </label>
            </div>

            <div class="row">
                <label>
                    Alphabet key:
                    <input
                        type="text"
                        spellcheck="false"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                        .value="selection.alphabetKey"
                        @input="setKey($event)"
                    />
                </label>
            </div>

            <div class="row" *for="option of options">
                <label>
                    <input
                        type="checkbox"
                        .checked="isSet(option.key, selection)"
                        @change="toggle(option.key)"
                    />
                    {{option.label}}
                </label>
            </div>

            <div class="row">
                Resulting alphabet:
                <span class="result">{{resultingAlphabet}}</span>
            </div>
        `,
    },
    class {
        selection: AlphabetSelection = defaultAlphabet();
        names = alphabetNames();
        resultingAlphabet = '';

        options = [
            {
                key: 'useLastInstance',
                label: 'Use the last occurrence of a letter instead of the first',
            },
            { key: 'reverseKey', label: 'Reverse the key before keying' },
            {
                key: 'reverseAlphabet',
                label: 'Reverse the alphabet before keying',
            },
            {
                key: 'keyAtEnd',
                label: 'Put the key at the end instead of the beginning',
            },
        ];

        onInit() {
            this.recompute();
        }

        onChange() {
            this.recompute();
        }

        /** Used by the template; a method keeps the checkbox binding honest. */
        isSet(key: string, selection: AlphabetSelection) {
            return !!selection[key as keyof AlphabetSelection];
        }

        setName(event: Event) {
            this.update({ name: (event.target as HTMLSelectElement).value });
        }

        setKey(event: Event) {
            this.update({ alphabetKey: (event.target as HTMLInputElement).value });
        }

        toggle(key: string) {
            const current = this.selection[key as keyof AlphabetSelection];
            this.update({ [key]: !current });
        }

        private update(change: Partial<AlphabetSelection>) {
            // A new object, so the binding sees a top-level assignment.
            this.selection = { ...this.selection, ...change };
            this.recompute();
            emit(this, 'selection-change', this.selection);
        }

        private recompute() {
            this.resultingAlphabet = String(
                buildAlphabet(this.selection).letterOrder.upper
            );
        }
    }
);
