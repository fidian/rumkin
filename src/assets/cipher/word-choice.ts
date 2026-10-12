/**
 * One word of the cryptogram solver, as a drop-down:
 *
 *     <word-choice .view="word" @word-pick="choose($event)"></word-choice>
 *
 * A native <select> because that is the control a phone already knows how to
 * show - a full-screen picker with a thumb-sized row per word, where the
 * scrolling box this replaces was a small target inside a page that also
 * scrolls.
 *
 * The catch is size. A five letter word has 4,400 candidates in the medium
 * dictionary and 16,700 in the largest, and a message has twenty such words,
 * so building every <option> up front is tens of thousands of elements to
 * show a page nobody has touched yet. So the list holds only what it is
 * showing until it is about to open, and is filled then. Every event that
 * comes before a list opens is listened for; whichever arrives first does
 * the work and the rest find it done.
 *
 * The options are built by hand rather than with *for, which would give each
 * of those thousands its own scope and bindings.
 */
import { component, css, emit, html } from 'fudgel';

export interface WordChoiceView {
    /** Read out by a screen reader, since the cipher word is not a <label>. */
    label: string;
    /** The word showing: the reader's pick or the only one that fits. */
    value: string;
    /** The letters known so far, shown while the word is still open. */
    plain: string;
    /** True for the reader's own pick, which is the kind that can be cleared. */
    picked: boolean;
    /** Every word to offer. Not called until the list is about to open. */
    choices: () => string[];
}

const EMPTY: WordChoiceView = {
    label: '',
    value: '',
    plain: '',
    picked: false,
    choices: () => [],
};

component(
    'word-choice',
    {
        prop: ['view', 'disabled'],
        style: css`
            :host {
                display: block;
            }

            select {
                font-family: var(--font-anonymous-pro), monospace;
                /* Safari on a phone zooms the page to any control under 16px. */
                font-size: max(1em, 16px);
                margin: 0;
            }

            select.picked {
                font-weight: bold;
            }

            /* Room for a fingertip, where a mouse pointer needs none. */
            @media (pointer: coarse) {
                select {
                    min-height: 44px;
                }
            }
        `,
        template: html`
            <select
                #ref="select"
                .disabled="disabled"
                @pointerdown="fill()"
                @mousedown="fill()"
                @touchstart="fill()"
                @keydown="fill()"
                @focus="fill()"
                @change="pick()"
            ></select>
        `,
    },
    class {
        view: WordChoiceView = EMPTY;
        disabled = false;
        select?: HTMLSelectElement;

        private filled = false;

        onViewInit() {
            this.show();
        }

        onChange(name: string) {
            if (name === 'view') this.show();
        }

        /** The closed list: one entry, which is whatever it is showing. */
        private show() {
            const { select, view } = this;
            if (!select) return;

            select.setAttribute('aria-label', view.label);
            select.classList.toggle('picked', view.picked);
            select.style.width = '';
            select.replaceChildren(
                new Option(view.value || view.plain, view.value)
            );
            this.filled = false;
        }

        fill() {
            const { select, view } = this;
            if (!select || this.filled) return;
            this.filled = true;

            // Every word is the same length in a fixed-width face, so the
            // list is already as wide as it needs to be. Hold it there, or
            // the longer "(clear)" would resize it as it opens.
            select.style.width = `${select.getBoundingClientRect().width}px`;

            const options = document.createDocumentFragment();

            // Leaving a word open is only on offer where it means something:
            // a word the dictionary allows just one reading of has no other
            // state to go back to.
            if (view.picked) options.append(new Option('(clear)', ''));
            else if (!view.value) options.append(new Option(view.plain, ''));

            for (const word of view.choices()) {
                options.append(new Option(word, word));
            }

            select.replaceChildren(options);
            select.value = view.value;
        }

        pick() {
            if (this.select) emit(this, 'word-pick', this.select.value);
        }
    }
);
