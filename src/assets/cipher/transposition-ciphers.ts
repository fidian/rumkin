/**
 * Übchi and double columnar transposition: <ubchi-cipher>, <double-columnar-cipher>.
 *
 * Both transpose twice, which runCipher() cannot express, so they carry
 * their own logic in double-transposition.ts and their own elements here.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import './keyed-alphabet.ts';
import { defaultAlphabet, type AlphabetSelection } from './alphabet.ts';
import type { CipherOutcome, Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';
import { lettersOf } from './polybius-alphabet.ts';
import {
    columnKeyFor,
    describeColumnKey,
    runDoubleColumnar,
    runUbchi,
} from './double-transposition.ts';

const SHARED_STYLE = css`
    :host {
        display: block;
    }

    .field {
        margin: 0.75em 0;
    }

    .resolved {
        font-style: italic;
    }
`;

const DIRECTION = `
    <p class="field">
        <label>
            Operating mode:
            <select @input="setDirection($event)">
                <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">Encrypt</option>
                <option value="DECRYPT" .selected="direction === 'DECRYPT'">Decrypt</option>
            </select>
        </label>
    </p>`;

const KEY_OPTIONS = `
    <p class="field">
        <label>
            <input type="checkbox" .checked="columnOrder" @change="setColumnOrder($event)" />
            Use the key as a column order instead of column labels
        </label>
    </p>
    <p class="field">
        <label>
            <input type="checkbox" .checked="dupesBackwards" @change="setDupesBackwards($event)" />
            Number duplicate entries backwards instead of forwards
        </label>
    </p>`;

const MESSAGE_AND_RESULT = `
    <div class="field">
        <advanced-input-area .value="input" @value-change="setInput($event)"></advanced-input-area>
    </div>
    <cipher-output .outcome="outcome" placeholder="Enter text and see the result here"></cipher-output>`;

const textField = (name: string, label: string) => `
    <p class="field">
        <label>${label}:
            <input type="text" spellcheck="false" autocapitalize="off"
                autocomplete="off" autocorrect="off"
                .value="${name}" @input="setText('${name}', $event)" />
        </label>
    </p>`;

/** Everything the two share: direction, alphabet, key options, message. */
abstract class TranspositionController {
    direction: Direction = 'ENCRYPT';
    alphabet: AlphabetSelection = defaultAlphabet();
    columnOrder = false;
    dupesBackwards = false;
    input = '';
    outcome: CipherOutcome = { text: '', display: '', warnings: [] };
    protected stopListening?: () => void;

    abstract recompute(): void;
    protected abstract topic(): string;

    onInit() {
        this.stopListening = listenForExample(this.topic(), this, () =>
            this.recompute()
        );
        this.recompute();
    }

    onDestroy() {
        this.stopListening?.();
    }

    setDirection(event: Event) {
        this.direction = (event.target as HTMLSelectElement).value as Direction;
        this.recompute();
    }

    setAlphabet(event: CustomEvent<AlphabetSelection>) {
        this.alphabet = event.detail;
        this.recompute();
    }

    setColumnOrder(event: Event) {
        this.columnOrder = (event.target as HTMLInputElement).checked;
        this.recompute();
    }

    setDupesBackwards(event: Event) {
        this.dupesBackwards = (event.target as HTMLInputElement).checked;
        this.recompute();
    }

    setInput(event: CustomEvent<string>) {
        this.input = event.detail;
        this.recompute();
    }

    setText(name: string, event: Event) {
        (this as unknown as Record<string, unknown>)[name] = (
            event.target as HTMLInputElement
        ).value;
        this.recompute();
    }

    protected keyOptions() {
        return {
            columnOrder: this.columnOrder,
            dupesBackwards: this.dupesBackwards,
        };
    }
}

component(
    'ubchi-cipher',
    {
        style: SHARED_STYLE,
        template: html([
            `${DIRECTION}
            <div class="field">
                <keyed-alphabet .selection="alphabet" @selection-change="setAlphabet($event)"></keyed-alphabet>
            </div>
            ${KEY_OPTIONS}
            ${textField('columnKey', 'Columnar key')}
            <p class="resolved">{{resolvedKey}}</p>
            <p class="field">
                <label>Character to use when padding the message:
                    <select @input="setPadCharacter($event)">
                        <option *for="letter of letters" .value="letter" .selected="letter === padCharacter">{{letter}}</option>
                    </select>
                </label>
            </p>
            ${MESSAGE_AND_RESULT}`,
        ] as unknown as TemplateStringsArray),
    },
    class extends TranspositionController {
        columnKey = '';
        padCharacter = '';
        letters: string[] = [];
        resolvedKey = '';

        protected topic() {
            return 'ubchi';
        }

        setPadCharacter(event: Event) {
            this.padCharacter = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        recompute() {
            this.letters = lettersOf(this.alphabet);

            // The alphabet can change under the pad character; fall back to
            // its last letter, as the original did.
            if (!this.letters.includes(this.padCharacter)) {
                this.padCharacter = this.letters[this.letters.length - 1] ?? '';
            }

            const columnKey = columnKeyFor(
                this.alphabet,
                this.columnKey,
                this.keyOptions()
            );
            this.resolvedKey = describeColumnKey([...columnKey]);

            this.outcome = this.input.trim()
                ? runUbchi({
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      columnKey,
                      padCharacter: this.padCharacter,
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);

component(
    'double-columnar-cipher',
    {
        style: SHARED_STYLE,
        template: html([
            `${DIRECTION}
            <div class="field">
                <keyed-alphabet .selection="alphabet" @selection-change="setAlphabet($event)"></keyed-alphabet>
            </div>
            ${KEY_OPTIONS}
            ${textField('firstKey', 'First column key')}
            <p class="resolved">{{resolvedFirst}}</p>
            ${textField('secondKey', 'Second column key')}
            <p class="resolved">{{resolvedSecond}}</p>
            ${MESSAGE_AND_RESULT}`,
        ] as unknown as TemplateStringsArray),
    },
    class extends TranspositionController {
        firstKey = '';
        secondKey = '';
        resolvedFirst = '';
        resolvedSecond = '';

        protected topic() {
            return 'doubleColumnarTransposition';
        }

        recompute() {
            const first = columnKeyFor(
                this.alphabet,
                this.firstKey,
                this.keyOptions()
            );
            const second = columnKeyFor(
                this.alphabet,
                this.secondKey,
                this.keyOptions()
            );
            this.resolvedFirst = describeColumnKey([...first]);
            this.resolvedSecond = describeColumnKey([...second]);

            this.outcome = this.input.trim()
                ? runDoubleColumnar({
                      direction: this.direction,
                      message: this.input,
                      alphabet: this.alphabet,
                      firstColumnKey: first,
                      secondColumnKey: second,
                  })
                : { text: '', display: '', warnings: [] };
        }
    }
);
