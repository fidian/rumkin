/**
 * The small single-purpose tools. Each is a thin view over conversions.ts.
 */
import { component, css, html } from 'fudgel';
import {
    characterCodes,
    convertBase,
    encodeAsScript,
    formatDegrees,
    rainbow,
    rainbowHtml,
} from './conversions.ts';
import { describeEvent, EVENT_TYPES } from './keyboard-events.ts';

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

/* ------------------------------------------------------------------ */

component(
    'rainbow-text',
    {
        style: css`
            :host {
                display: block;
            }

            input {
                font: inherit;
                width: 100%;
            }

            .preview {
                background-color: #114;
                font-weight: bold;
                padding: 1em 0.3em;
            }

            code {
                background-color: #ddd;
                border: 1px solid;
                display: block;
                font-size: 0.8em;
                overflow-wrap: anywhere;
                padding: 0.5em;
            }
        `,
        template: html`
            <input
                type="text"
                spellcheck="false"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                @input="setInput($event)"
            />
            <p>This is the result:</p>
            <p class="preview">
                <span *for="letter of letters" style="color: {{letter.colour}}"
                    >{{letter.character}}</span
                >
            </p>
            <p>And here is the HTML for your use:</p>
            <code>{{markup}}</code>
        `,
    },
    class {
        letters = rainbow('Enter text to see it here!');
        markup = rainbowHtml('Enter text to see it here!');

        setInput(event: Event) {
            const text =
                (event.target as HTMLInputElement).value.trim() ||
                'Enter text to see it here!';
            this.letters = rainbow(text);
            this.markup = rainbowHtml(text);
        }
    }
);

/* ------------------------------------------------------------------ */

component(
    'keyboard-event-tester',
    {
        style: css`
            :host {
                display: block;
            }

            input {
                font: inherit;
                width: 100%;
            }

            .log div {
                margin: 0.5em 0;
            }
        `,
        template: html`
            <p><b>Your browser:</b> {{userAgent}}</p>

            <ul>
                <li *for="type of types">
                    <label>
                        <input
                            type="checkbox"
                            .checked="isEnabled(type, enabled)"
                            @change="toggle(type)"
                        />
                        Log on{{type}} events
                    </label>
                </li>
            </ul>

            <div>
                <input
                    type="text"
                    spellcheck="false"
                    autocapitalize="off"
                    autocomplete="off"
                    autocorrect="off"
                    @change="record('change', $event)"
                    @input="record('input', $event)"
                    @keydown="record('keydown', $event)"
                    @keypress="record('keypress', $event)"
                    @keyup="record('keyup', $event)"
                />
            </div>

            <p><button type="button" @click="clear()">Clear the log</button></p>

            <div class="log">
                <div *for="line of log">{{line}}</div>
            </div>
        `,
    },
    class {
        types = EVENT_TYPES;
        enabled: string[] = [...EVENT_TYPES];
        log: string[] = [];
        userAgent = navigator.userAgent;
        private started = Date.now();

        isEnabled(type: string, enabled: string[]) {
            return enabled.includes(type);
        }

        toggle(type: string) {
            this.enabled = this.enabled.includes(type)
                ? this.enabled.filter((t) => t !== type)
                : [...this.enabled, type];
        }

        record(type: string, event: Event) {
            if (!this.enabled.includes(type)) return;
            this.log = [
                describeEvent(type, event as never, Date.now() - this.started),
                ...this.log,
            ];
        }

        clear() {
            this.log = [];
        }
    }
);
