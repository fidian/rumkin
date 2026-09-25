/**
 * The T9 page: <t9-code></t9-code>
 *
 * Encoding is one key press per letter and needs nothing. Decoding needs a
 * dictionary, so this is <simple-code> plus a word list picker and the fetch
 * that goes with it.
 *
 * The lists are the ones the cryptogram solver uses, served from
 * /tools/cipher/wordlists/. The smallest is 386 KB, so it is fetched the
 * first time it is actually needed rather than on page load, and kept after
 * that.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import './cipher-output.ts';
import { defaultAlphabet } from './alphabet.ts';
import { runCipher, type CipherOutcome, type Direction } from './cipher-result.ts';
import { listenForExample } from './listen-for-example.ts';

interface WordlistChoice {
    file: string;
    label: string;
}

// Only the English lists, and only the ones small enough to hand to a
// browser. The solver's own page offers the rest, up to 85 MB of Polish.
const WORDLISTS: WordlistChoice[] = [
    { file: '', label: 'No dictionary - first letter on each key' },
    { file: 'american-english-35-small.txt', label: 'American English (small)' },
    { file: 'american-english-50-medium.txt', label: 'American English (medium)' },
    { file: 'american-english-70-large.txt', label: 'American English (large)' },
];

component(
    't9-code',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .note {
                font-size: 0.9em;
            }
        `,
        template: html`
            <p class="field">
                <label>
                    Operating mode:
                    <select @input="setDirection($event)">
                        <option value="ENCRYPT" .selected="direction === 'ENCRYPT'">
                            Encode
                        </option>
                        <option value="DECRYPT" .selected="direction === 'DECRYPT'">
                            Decode
                        </option>
                    </select>
                </label>
            </p>

            <p class="field" *if="direction === 'DECRYPT'">
                <label>
                    Dictionary:
                    <select @input="setWordlist($event)">
                        <option
                            *for="choice of wordlists"
                            value="{{choice.file}}"
                            .selected="choice.file === wordlist"
                        >
                            {{choice.label}}
                        </option>
                    </select>
                </label>
                <span class="note" *if="status"> {{status}}</span>
            </p>

            <div class="field">
                <advanced-input-area
                    .value="input"
                    .label="label"
                    @value-change="setInput($event)"
                ></advanced-input-area>
            </div>

            <cipher-output
                .outcome="outcome"
                placeholder="{{placeholderText}}"
            ></cipher-output>
        `,
    },
    class {
        direction: Direction = 'ENCRYPT';
        input = '';
        label = 'Message to encode or decode';
        outcome: CipherOutcome = { text: '', display: '', warnings: [] };
        placeholderText = 'Enter text to see it encoded or decoded here';
        status = '';
        // Decoding without a dictionary only ever produces gibberish, so the
        // smallest list is the default and is fetched on the first decode.
        wordlist = 'american-english-35-small.txt';
        wordlists = WORDLISTS;

        private cache = new Map<string, string[]>();
        private stopListening?: () => void;

        onInit() {
            this.stopListening = listenForExample('t9', this, () =>
                this.recompute()
            );
        }

        onViewInit() {
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

        setInput(event: CustomEvent<string>) {
            this.input = event.detail;
            this.recompute();
        }

        setWordlist(event: Event) {
            this.wordlist = (event.target as HTMLSelectElement).value;
            this.recompute();
        }

        private async recompute() {
            if (!this.input.trim()) {
                this.outcome = { text: '', display: '', warnings: [] };
                return;
            }

            const words =
                this.direction === 'DECRYPT' && this.wordlist
                    ? await this.loadWords(this.wordlist)
                    : [];

            this.outcome = runCipher({
                name: 't9',
                direction: this.direction,
                message: this.input,
                alphabet: defaultAlphabet(),
                options: { words },
            });
        }

        /** Fetches a word list once and keeps it for the rest of the visit. */
        private async loadWords(file: string): Promise<string[]> {
            const cached = this.cache.get(file);

            if (cached) {
                return cached;
            }

            this.status = 'Loading the dictionary...';

            try {
                const response = await fetch(`../wordlists/${file}`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                // The lists are stored in capitals, one word per line. T9
                // output reads better in lower case.
                const words = (await response.text())
                    .split('\n')
                    .map((word) => word.trim().toLowerCase())
                    .filter(Boolean);

                this.cache.set(file, words);
                this.status = `${words.length.toLocaleString()} words`;

                return words;
            } catch (e) {
                this.status = `Could not load the dictionary (${
                    e instanceof Error ? e.message : String(e)
                }).`;

                return [];
            }
        }
    }
);
