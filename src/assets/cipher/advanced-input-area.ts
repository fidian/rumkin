/**
 * The message box that sits on every cipher page, with the tidying actions
 * underneath it: strip characters, change case, and regroup into blocks.
 *
 *     <advanced-input-area
 *         .value="input"
 *         @value-change="setInput($event.detail)"
 *     ></advanced-input-area>
 *
 * Event names are written dashed because emit() passes the name through
 * verbatim, and these components are used from plain Astro markup where the
 * listener is an ordinary addEventListener('value-change').
 *
 * The transforms themselves are in text-transforms.ts, with no DOM in them.
 */
import { component, css, emit, html } from 'fudgel';
import {
    makeGroups,
    removeLetters,
    removeNumbers,
    removeOther,
    removeWhitespace,
    reverse,
    swapCase,
    toLowerCase,
    toNaturalCase,
    toTitleCase,
    toUpperCase,
} from './text-transforms.ts';

interface Action {
    label: string;
    apply: (text: string) => string;
}

const REMOVE: Action[] = [
    { label: 'letters', apply: removeLetters },
    { label: 'numbers', apply: removeNumbers },
    { label: 'whitespace', apply: removeWhitespace },
    { label: 'other things', apply: removeOther },
];

const CHANGE: Action[] = [
    { label: 'lowercase', apply: toLowerCase },
    { label: 'Natural case', apply: toNaturalCase },
    { label: 'Title Case', apply: toTitleCase },
    { label: 'UPPERCASE', apply: toUpperCase },
    { label: 'swap case', apply: swapCase },
    { label: 'reverse', apply: reverse },
];

component(
    'advanced-input-area',
    {
        prop: ['value'],
        attr: ['label'],
        style: css`
            :host {
                display: block;
            }

            .actions {
                font-size: 0.9em;
                margin-top: 0.25em;
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

            .link:not(:last-child)::after {
                content: ", ";
                text-decoration: none;
            }

            .size {
                width: 4em;
            }

            textarea {
                height: 8em;
                max-height: 75vh;
                width: 100%;
            }
        `,
        template: html`
            <label *if="label">{{label}}:<br /></label>
            <textarea
                placeholder="Enter text here"
                spellcheck="false"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                .value="value"
                @input="onType($event)"
            ></textarea>

            <div class="actions">
                Remove:
                <button
                    *for="action of removeActions"
                    class="link"
                    type="button"
                    @click="run(action)"
                >
                    {{action.label}}
                </button>
            </div>

            <div class="actions">
                Change:
                <button
                    *for="action of changeActions"
                    class="link"
                    type="button"
                    @click="run(action)"
                >
                    {{action.label}}
                </button>
            </div>

            <div class="actions">
                <button class="link" type="button" @click="group()">
                    Make groups
                </button>
                of
                <input
                    class="size"
                    type="number"
                    min="0"
                    .value="groupSize"
                    @input="setGroupSize($event)"
                />
                and next line after
                <input
                    class="size"
                    type="number"
                    min="0"
                    .value="lineSize"
                    @input="setLineSize($event)"
                />
                groups
            </div>
        `,
    },
    class {
        value = '';
        label = '';
        groupSize = 5;
        lineSize = 10;
        removeActions = REMOVE;
        changeActions = CHANGE;

        onType(event: Event) {
            this.value = (event.target as HTMLTextAreaElement).value;
            emit(this, 'value-change', this.value);
        }

        run(action: Action) {
            this.setValue(action.apply(this.value ?? ''));
        }

        group() {
            this.setValue(
                makeGroups(this.value ?? '', this.groupSize, this.lineSize)
            );
        }

        setGroupSize(event: Event) {
            this.groupSize = Number((event.target as HTMLInputElement).value);
        }

        setLineSize(event: Event) {
            this.lineSize = Number((event.target as HTMLInputElement).value);
        }

        private setValue(next: string) {
            if (next === this.value) return;
            this.value = next;
            emit(this, 'value-change', next);
        }
    }
);
