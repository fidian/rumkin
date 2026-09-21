/**
 * Builds a cipher page's form.
 *
 * Every keyed cipher has the same chrome - a direction, maybe an alphabet, a
 * message box and an output box - and differs only in the handful of
 * settings between them and in how those settings become options for the
 * library. So each one declares its fields and an options function, and this
 * builds the element:
 *
 *     defineCipher({
 *         tag: 'vigenere-cipher',
 *         code: 'vigenère',
 *         topic: 'vigenere',
 *         fields: [
 *             { name: 'cipherKey', type: 'text', label: 'Cipher key' },
 *             { name: 'autokey', type: 'checkbox', label: 'Use autokey' },
 *         ],
 *         options: (s) => ({ key: s.cipherKey, autokey: s.autokey }),
 *     });
 *
 * Field names are the controller's property names, which are also the names
 * the pages' example buttons use in their payload-* attributes, so an
 * example applies with nothing in between.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

export type FieldValue = string | number | boolean;

export interface Field {
    /** Controller property, and the name an example payload uses. */
    name: string;
    type: 'text' | 'number' | 'checkbox' | 'select';
    label: string;
    value?: FieldValue;
    /** For type "select": the choices, in order. */
    choices?: { value: string; label: string }[];
    min?: number;
}

export interface CipherState {
    direction: Direction;
    alphabet: AlphabetSelection;
    input: string;
    [field: string]: unknown;
}

export interface CipherSpec {
    tag: string;
    /** Key in rumkinCipher.cipher or .code. */
    code: string;
    /** Example topic, when it differs from the tag's cipher name. */
    topic?: string;
    /** Omit the direction selector for a cipher that is its own inverse. */
    direction?: false;
    /** "Encode/Decode" rather than "Encrypt/Decrypt". */
    verbs?: 'code' | 'cipher';
    /** Show the alphabet picker. Most keyed ciphers want it. */
    alphabet?: boolean;
    fields?: Field[];
    /** Turn the current settings into the library's options object. */
    options?: (state: CipherState) => Record<string, unknown>;
    /**
     * Some transpositions work on every character rather than on an
     * alphabet. Return false to pass no alphabet at all.
     */
    useAlphabet?: (state: CipherState) => boolean;
    inputLabel?: string;
    placeholder?: string;
}

const defaultFor = (field: Field): FieldValue => {
    if (field.value !== undefined) return field.value;
    if (field.type === 'checkbox') return false;
    if (field.type === 'number') return 0;
    if (field.type === 'select') return field.choices?.[0]?.value ?? '';
    return '';
};

const fieldMarkup = (field: Field): string => {
    const label = field.label.replace(/"/g, '&quot;');

    if (field.type === 'checkbox') {
        return `<p class="field"><label><input type="checkbox" .checked="${field.name}" @change="setChecked('${field.name}', $event)" /> ${label}</label></p>`;
    }

    if (field.type === 'select') {
        const choices = (field.choices ?? [])
            .map(
                (c) =>
                    `<option value="${c.value}" .selected="${field.name} === '${c.value}'">${c.label}</option>`
            )
            .join('');
        return `<p class="field"><label>${label}: <select @input="setText('${field.name}', $event)">${choices}</select></label></p>`;
    }

    if (field.type === 'number') {
        const min = field.min === undefined ? '' : ` min="${field.min}"`;
        return `<p class="field"><label>${label}: <input class="number" type="number"${min} .value="${field.name}" @input="setNumber('${field.name}', $event)" /></label></p>`;
    }

    return `<p class="field"><label>${label}: <input type="text" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" .value="${field.name}" @input="setText('${field.name}', $event)" /></label></p>`;
};

export const defineCipher = (spec: CipherSpec) => {
    const fields = spec.fields ?? [];
    const verbs = spec.verbs ?? 'cipher';
    const encrypt = verbs === 'code' ? 'Encode' : 'Encrypt';
    const decrypt = verbs === 'code' ? 'Decode' : 'Decrypt';

    const directionMarkup =
        spec.direction === false
            ? ''
            : `<p class="field"><label>Operating mode: <select @input="setDirection($event)">
                   <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">${encrypt}</option>
                   <option value="DECRYPT" .selected="direction === 'DECRYPT'">${decrypt}</option>
               </select></label></p>`;

    const alphabetMarkup = spec.alphabet
        ? `<div class="field"><keyed-alphabet .selection="alphabet" @selection-change="setAlphabet($event)"></keyed-alphabet></div>`
        : '';

    const template = `
        ${directionMarkup}
        ${alphabetMarkup}
        ${fields.map(fieldMarkup).join('\n')}
        <div class="field">
            <advanced-input-area
                .value="input"
                label="${(spec.inputLabel ?? '').replace(/"/g, '&quot;')}"
                @value-change="setInput($event)"
            ></advanced-input-area>
        </div>
        <cipher-output .outcome="outcome" placeholder="${(spec.placeholder ?? 'Enter text to see the result here').replace(/"/g, '&quot;')}"></cipher-output>
    `;

    component(
        spec.tag,
        {
            style: css`
                :host {
                    display: block;
                }

                .field {
                    margin: 0.75em 0;
                }

                .number {
                    width: 5em;
                }
            `,
            template: html([template] as unknown as TemplateStringsArray),
        },
        class {
            direction: Direction = 'ENCRYPT';
            alphabet: AlphabetSelection = defaultAlphabet();
            input = '';
            outcome: CipherOutcome = { text: '', display: '', warnings: [] };
            private stopListening?: () => void;

            constructor() {
                for (const field of fields) {
                    (this as Record<string, unknown>)[field.name] =
                        defaultFor(field);
                }
            }

            onInit() {
                this.stopListening = listenForExample(
                    spec.topic ?? spec.code,
                    this,
                    () => this.recompute()
                );
                this.recompute();
            }

            onDestroy() {
                this.stopListening?.();
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

            setText(name: string, event: Event) {
                (this as Record<string, unknown>)[name] = (
                    event.target as HTMLInputElement
                ).value;
                this.recompute();
            }

            setNumber(name: string, event: Event) {
                (this as Record<string, unknown>)[name] = Number(
                    (event.target as HTMLInputElement).value
                );
                this.recompute();
            }

            setChecked(name: string, event: Event) {
                (this as Record<string, unknown>)[name] = (
                    event.target as HTMLInputElement
                ).checked;
                this.recompute();
            }

            private recompute() {
                if (!this.input.trim()) {
                    this.outcome = { text: '', display: '', warnings: [] };
                    return;
                }

                const state = this as unknown as CipherState;
                const alphabet = spec.useAlphabet && !spec.useAlphabet(state)
                    ? null
                    : this.alphabet;

                this.outcome = runCipher({
                    name: spec.code,
                    direction: spec.direction === false ? 'ENCRYPT' : this.direction,
                    message: this.input,
                    alphabet: alphabet ?? defaultAlphabet(),
                    noAlphabet: alphabet === null,
                    options: spec.options?.(state),
                });
            }
        }
    );
};
