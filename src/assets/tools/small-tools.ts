/**
 * The small single-purpose tools. Each is a thin view over conversions.ts.
 */
import { component, css, html } from 'fudgel';
import {
    characterCodes,
    convertBase,
    encodeAsScript,
    formatDegrees,
} from './conversions.ts';

const SHARED = css`
    :host {
        display: block;
    }

    .field {
        margin: 0.75em 0;
    }

    input[type='text'],
    textarea {
        font: inherit;
        width: 100%;
    }

    textarea {
        height: 8em;
    }

    .output {
        background-color: #ddd;
        border: 1px solid;
        margin: 0.5em 0;
        overflow-wrap: anywhere;
        padding: 0.5em;
        white-space: pre-wrap;
    }
`;

const NO_ASSIST = `spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"`;

/* ------------------------------------------------------------------ */

component(
    'degree-converter',
    {
        style: SHARED,
        template: html`
            <p class="field">
                Enter the value here:
                <input type="text" .value="input" @input="setInput($event)" />
            </p>
            <p *if="input">
                Degrees: {{formats.degrees}}<br />
                Degrees Minutes: {{formats.degreesMinutes}}<br />
                Degrees Minutes Seconds: {{formats.degreesMinutesSeconds}}
            </p>
        `,
    },
    class {
        input = '';
        formats = formatDegrees('');

        setInput(event: Event) {
            this.input = (event.target as HTMLInputElement).value;
            this.formats = formatDegrees(this.input.trim());
        }
    }
);

/* ------------------------------------------------------------------ */

const BASES = Array.from({ length: 31 }, (_, i) => i + 2);

component(
    'base-converter',
    {
        style: SHARED,
        template: html`
            <p class="field">
                <label>
                    Input base:
                    <select @input="setFromBase($event)">
                        <option
                            *for="base of bases"
                            .value="base"
                            .selected="base === fromBase"
                        >
                            {{base}}
                        </option>
                    </select>
                </label>
            </p>
            <p class="field">
                Input number:
                <input type="text" .value="input" @input="setInput($event)" />
            </p>
            <p class="field">
                <label>
                    Output base:
                    <select @input="setToBase($event)">
                        <option
                            *for="base of bases"
                            .value="base"
                            .selected="base === toBase"
                        >
                            {{base}}
                        </option>
                    </select>
                </label>
            </p>
            <p class="output">{{output}}</p>
        `,
    },
    class {
        bases = BASES;
        fromBase = 10;
        toBase = 10;
        input = '';
        output = '0';

        setFromBase(event: Event) {
            this.fromBase = Number((event.target as HTMLSelectElement).value);
            this.recalculate();
        }

        setToBase(event: Event) {
            this.toBase = Number((event.target as HTMLSelectElement).value);
            this.recalculate();
        }

        setInput(event: Event) {
            this.input = (event.target as HTMLInputElement).value;
            this.recalculate();
        }

        private recalculate() {
            this.output = convertBase(this.input, this.fromBase, this.toBase);
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'character-codes',
    {
        style: SHARED,
        template: html`
            <textarea ${NO_ASSIST} @input="setInput($event)"></textarea>
            <p>This is the character codes for whatever is in the text box.</p>
            <div class="output">{{output}}</div>
        `,
    },
    class {
        output = 'Enter text and see the character codes here.';

        setInput(event: Event) {
            const text = (event.target as HTMLTextAreaElement).value;
            this.output = text
                ? characterCodes(text).join(' ')
                : 'Enter text and see the character codes here.';
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'html-preview',
    {
        style: css`
            :host {
                display: block;
            }

            textarea {
                font: inherit;
                height: 8em;
                width: 100%;
            }

            iframe {
                background-color: white;
                border: 1px solid;
                height: 20em;
                margin: 0.5em 0;
                width: 100%;
            }
        `,
        template: html`
            <textarea ${NO_ASSIST} @input="setInput($event)"></textarea>
            <iframe
                title="Rendered result"
                sandbox=""
                #ref="frame"
            ></iframe>
        `,
    },
    class {
        frame?: HTMLIFrameElement;

        setInput(event: Event) {
            const markup = (event.target as HTMLTextAreaElement).value;

            // The page exists to render whatever you type, so the markup
            // goes in as it is. An empty sandbox means it renders but runs
            // no scripts and has no access to this page or its origin - the
            // Mithril version put it straight into the page instead.
            if (this.frame) {
                this.frame.srcdoc = markup;
            }
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'script-encoder',
    {
        style: SHARED,
        template: html`
            <p class="field">
                Enter the text to hide:<br />
                <textarea ${NO_ASSIST} @input="setInput($event)"></textarea>
            </p>
            <p *if="output">
                Paste this into your page where the text should appear:
            </p>
            <div class="output" *if="output">{{output}}</div>
        `,
    },
    class {
        output = '';

        setInput(event: Event) {
            const text = (event.target as HTMLTextAreaElement).value;
            this.output = text ? encodeAsScript(text) : '';
        }
    }
);
