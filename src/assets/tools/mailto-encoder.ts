/**
 * The mailto: link builders: <mailto-simple> and <mailto-custom>.
 *
 * The encoding itself is in email-encoder.ts.
 */
import { component, css, html } from 'fudgel';
import { encodeEmail, type EmailOptions } from './email-encoder.ts';

const SHARED = css`
    :host {
        display: block;
    }

    p {
        margin: 0.75em 0;
    }

    label {
        display: block;
    }

    input,
    select,
    textarea {
        font: inherit;
        width: 100%;
    }

    textarea {
        height: 5em;
    }

    pre {
        background-color: #ddd;
        border: 1px solid;
        overflow-wrap: anywhere;
        padding: 0.5em;
        white-space: pre-wrap;
    }
`;

const NO_ASSIST = `spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"`;

const PROMPT =
    'Enter a valid email address above and see the generated code here.';

component(
    'mailto-simple',
    {
        style: SHARED,
        template: html`
            <p>
                <label>
                    Email address
                    <input
                        type="email"
                        placeholder="user@example.com"
                        ${NO_ASSIST}
                        .value="to"
                        @input="set('to', $event)"
                    />
                </label>
            </p>
            <p>Do not worry. I do not harvest email addresses from here.</p>
            <p>
                <label>
                    Link text
                    <input
                        type="text"
                        placeholder="Defaults to email address"
                        ${NO_ASSIST}
                        .value="linkText"
                        @input="set('linkText', $event)"
                    />
                </label>
            </p>
            <p *if="!to">${PROMPT}</p>
            <pre *if="to">{{output}}</pre>
        `,
    },
    class {
        to = '';
        linkText = '';
        output = '';

        set(field: 'to' | 'linkText', event: Event) {
            this[field] = (event.target as HTMLInputElement).value;
            this.output = this.to
                ? encodeEmail({
                      to: this.to,
                      linkText: this.linkText || this.to,
                      encoding: 'html',
                      obfuscation: 'shuffled',
                  })
                : '';
        }
    }
);

const ENCODINGS = [
    { value: 'html', label: 'Create a normal HTML link' },
    { value: 'none', label: 'Skip encoding the link' },
];

const OBFUSCATIONS = [
    { value: 'shuffled', label: 'Shuffled encoding' },
    { value: 'break', label: 'Break up strings' },
    { value: 'none', label: 'Skip JavaScript-based obfuscation' },
];

component(
    'mailto-custom',
    {
        style: SHARED,
        template: html`
            <p *for="field of fields">
                <label>
                    {{field.label}}
                    <input
                        *if="!field.multiline"
                        type="text"
                        ${NO_ASSIST}
                        .value="values[field.name]"
                        @input="set(field.name, $event)"
                    />
                </label>
                <textarea
                    *if="field.multiline"
                    ${NO_ASSIST}
                    @input="set(field.name, $event)"
                ></textarea>
            </p>

            <p>
                <label>
                    Method of encoding
                    <select @input="set('encoding', $event)">
                        <option
                            *for="choice of encodings"
                            .value="choice.value"
                            .selected="choice.value === values.encoding"
                        >
                            {{choice.label}}
                        </option>
                    </select>
                </label>
            </p>

            <p>
                <label>
                    Method of obfuscation
                    <select @input="set('obfuscation', $event)">
                        <option
                            *for="choice of obfuscations"
                            .value="choice.value"
                            .selected="choice.value === values.obfuscation"
                        >
                            {{choice.label}}
                        </option>
                    </select>
                </label>
            </p>

            <p *if="!values.to">${PROMPT}</p>
            <pre *if="values.to">{{output}}</pre>
        `,
    },
    class {
        encodings = ENCODINGS;
        obfuscations = OBFUSCATIONS;
        output = '';

        fields = [
            { name: 'to', label: 'To', multiline: false },
            { name: 'cc', label: 'Cc', multiline: false },
            { name: 'bcc', label: 'Bcc', multiline: false },
            { name: 'subject', label: 'Subject', multiline: false },
            { name: 'body', label: 'Body', multiline: true },
            {
                name: 'linkText',
                label: 'HTML label (only works when creating an HTML link)',
                multiline: false,
            },
            {
                name: 'linkExtra',
                label: 'Extra link attributes (like class or id; only works when creating an HTML link)',
                multiline: false,
            },
        ];

        values: Record<string, string> = {
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            body: '',
            linkText: '',
            linkExtra: '',
            encoding: 'html',
            obfuscation: 'shuffled',
        };

        set(field: string, event: Event) {
            // A new object, so the bindings see a top-level assignment.
            this.values = {
                ...this.values,
                [field]: (event.target as HTMLInputElement).value,
            };
            this.rebuild();
        }

        private rebuild() {
            const values = this.values;

            this.output = values.to
                ? encodeEmail({
                      ...values,
                      linkText: values.linkText || values.to,
                  } as EmailOptions)
                : '';
        }
    }
);
