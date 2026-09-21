/**
 * The dictionary-backed cryptogram solver: <cryptogram-solver></cryptogram-solver>
 *
 * Two screens - choose a wordlist and paste the cipher text, then work on it.
 * The Mithril version used a router for the two; one element with a `screen`
 * property is less machinery for the same result, and keeps the page's own
 * address rather than putting the solver's state in the URL.
 *
 * The solving itself is in cryptogram-solver.ts, with no DOM in it.
 */
import { component, css, html } from 'fudgel';
import './advanced-input-area.ts';
import {
    applySearch,
    createSearch,
    currentPlaintext,
    deduce,
    keyWordlist,
    parseWords,
    resetSegments,
    searchProgress,
    stepSearch,
    type Segment,
} from './cryptogram-solver.ts';

interface WordlistMeta {
    filename: string;
    name: string;
    description: string;
    wordCount: number;
}

interface WordView {
    index: number;
    isWord: boolean;
    cipher: string;
    plain: string;
    open: boolean;
    choices: string[];
    tooMany: number;
}

const STORE = 'cryptogramSolver.';
const DEFAULT_LIST = 'american-english-50-medium.txt';
/** Rendering thousands of options locks the page up; offer a slice. */
const MAX_CHOICES = 200;

const remember = (key: string, value: string) => {
    try {
        sessionStorage.setItem(STORE + key, value);
    } catch {
        // Private browsing, or storage turned off. Not worth failing over.
    }
};

const recall = (key: string, fallback: string) => {
    try {
        return sessionStorage.getItem(STORE + key) ?? fallback;
    } catch {
        return fallback;
    }
};

component(
    'cryptogram-solver',
    {
        style: css`
            :host {
                display: block;
            }

            .field {
                margin: 0.75em 0;
            }

            .words {
                display: flex;
                flex-wrap: wrap;
            }

            .word {
                margin: 0 0.3em 0.4em 0;
            }

            .word tt {
                display: block;
                font-family: var(--font-anonymous-pro), monospace;
                white-space: pre;
            }

            .word button {
                background: none;
                border: 0;
                cursor: pointer;
                font: inherit;
                padding: 0;
                text-align: start;
            }

            .word button tt {
                text-decoration: underline;
            }

            .choices {
                border: 1px solid;
                margin: 0.25em 0;
                max-height: 12em;
                overflow-y: auto;
                padding: 0.25em;
            }

            .choices button {
                display: block;
                text-decoration: none;
                width: 100%;
            }

            .plain {
                background-color: #ddd;
                border: 1px solid;
                margin: 0.5em 0;
                padding: 0.5em;
                white-space: pre-wrap;
            }

            .note {
                font-style: italic;
            }
        `,
        template: html`
            <div *if="screen === 'start'">
                <p *if="!listsLoaded">Loading the list of wordlists...</p>

                <p class="field" *if="listsLoaded">
                    <label>
                        Wordlist:
                        <select @input="setWordlist($event)">
                            <option
                                *for="list of lists"
                                .value="list.filename"
                                .selected="list.filename === wordlist"
                            >
                                {{list.label}}
                            </option>
                        </select>
                    </label>
                </p>

                <div class="field">
                    <advanced-input-area
                        .value="cipherText"
                        label="The cipher text to decode"
                        @value-change="setCipherText($event)"
                    ></advanced-input-area>
                </div>

                <p>
                    <button
                        type="button"
                        @click="start()"
                        .disabled="!listsLoaded || !cipherText"
                    >
                        Solve
                    </button>
                </p>
            </div>

            <div *if="screen === 'solve'">
                <p><b>Cipher text:</b></p>
                <p class="plain">{{cipherText}}</p>
                <p><b>Wordlist:</b> {{wordlistName}}</p>

                <p *if="loading">Loading dictionary...</p>

                <div *if="!loading">
                    <p class="plain">{{plaintext}}</p>

                    <div class="words">
                        <div *for="word of words" class="word">
                            <div *if="!word.isWord">
                                <tt>{{word.cipher}}</tt>
                                <tt>{{word.plain}}</tt>
                            </div>
                            <div *if="word.isWord">
                                <button
                                    type="button"
                                    @click="toggle(word.index)"
                                >
                                    <tt>{{word.cipher}}</tt>
                                    <tt>{{word.plain}}</tt>
                                </button>
                                <div class="choices" *if="word.open">
                                    <button
                                        *for="choice of word.choices"
                                        type="button"
                                        @click="choose(word.index, choice)"
                                    >
                                        {{choice}}
                                    </button>
                                    <p class="note" *if="word.tooMany">
                                        and {{word.tooMany}} more
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>{{progress}}</p>

                    <p>
                        <button
                            type="button"
                            @click="eliminate()"
                            .disabled="searching"
                        >
                            Eliminate Bad Combinations
                        </button>
                        This can take a significant amount of time. Removes
                        words from the lists that can not work with other
                        cipher words. This will often help you find the
                        deciphered text quicker, but limits you to using only
                        dictionary words.
                    </p>

                    <p>
                        <button type="button" @click="reset()">Reset</button>
                        <button type="button" @click="back()">
                            Start over
                        </button>
                    </p>
                </div>
            </div>
        `,
    },
    class {
        screen: 'start' | 'solve' = 'start';
        listsLoaded = false;
        loading = false;
        lists: (WordlistMeta & { label: string })[] = [];
        wordlist = recall('wordlist', DEFAULT_LIST);
        wordlistName = '';
        cipherText = recall('cipherText', '');
        words: WordView[] = [];
        plaintext = '';
        progress = '';

        private segments: Segment[] = [];
        private letterMap = new Map<string, string>();
        private open = new Set<number>();
        searching = false;
        private searchTimer?: ReturnType<typeof setTimeout>;

        onDestroy() {
            clearTimeout(this.searchTimer);
        }

        onInit() {
            this.loadLists();
        }

        private async loadLists() {
            try {
                const response = await fetch('../wordlists/wordlists.json');
                const meta = (await response.json()) as WordlistMeta[];
                this.lists = meta.map((list) => ({
                    ...list,
                    label: `${list.name}, ${list.wordCount} words`,
                }));

                if (!this.lists.some((l) => l.filename === this.wordlist)) {
                    this.wordlist = this.lists[0]?.filename ?? DEFAULT_LIST;
                }

                this.listsLoaded = true;
            } catch {
                this.progress = 'Could not load the list of wordlists.';
            }
        }

        setWordlist(event: Event) {
            this.wordlist = (event.target as HTMLSelectElement).value;
            remember('wordlist', this.wordlist);
        }

        setCipherText(event: CustomEvent<string>) {
            this.cipherText = event.detail;
            remember('cipherText', this.cipherText);
        }

        async start() {
            this.screen = 'solve';
            this.loading = true;
            this.progress = '';
            this.wordlistName =
                this.lists.find((l) => l.filename === this.wordlist)?.name ?? '';

            try {
                const response = await fetch(`../wordlists/${this.wordlist}`);
                const words = (await response.text()).trim().split(/[\r\n]+/);
                this.segments = parseWords(this.cipherText, keyWordlist(words));
                this.runDeduction();
            } catch {
                this.progress = 'Could not load that wordlist.';
            }

            this.loading = false;
        }

        back() {
            this.screen = 'start';
        }

        reset() {
            resetSegments(this.segments);
            this.letterMap = new Map();
            this.open.clear();
            this.progress = '';
            this.runDeduction();
        }

        toggle(index: number) {
            if (this.open.has(index)) this.open.delete(index);
            else this.open.add(index);
            this.rebuild();
        }

        choose(index: number, word: string) {
            const segment = this.segments[index];
            if (!segment) return;

            segment.selectedWord = word;
            segment.availableMatches = [word];
            this.open.delete(index);
            this.runDeduction([[segment.chars, word]]);
        }

        /**
         * The search is exponential in the worst case, so it runs in slices
         * with a yield between them. Without that the tab locks up for as
         * long as it takes, with no way to tell whether it is working.
         */
        eliminate() {
            if (this.searching) return;

            this.searching = true;
            const state = createSearch(this.segments);

            const slice = () => {
                if (stepSearch(state)) {
                    const outcome = applySearch(state);
                    this.searching = false;
                    this.progress = outcome.hopeless
                        ? 'The words in this dictionary are unable to fully decode this message. Try a larger dictionary or attempt to pick words yourself to find a solution.'
                        : `Updated ${outcome.narrowedWords} out of ${outcome.wordsTested} words and removed ${outcome.possibilitiesRemoved} possibilities.`;
                    this.runDeduction();
                    return;
                }

                this.progress = `Working on eliminating conflicting words ... ${searchProgress(state)}`;
                this.searchTimer = setTimeout(slice, 1);
            };

            slice();
        }

        private runDeduction(initialQueue: [string, string][] = []) {
            const { letterMap } = deduce(
                this.segments,
                this.letterMap,
                initialQueue
            );
            this.letterMap = letterMap;
            this.rebuild();
        }

        private rebuild() {
            this.plaintext = currentPlaintext(this.segments, this.letterMap);

            this.words = this.segments.map((segment, index) => {
                const plain = segment.isWord
                    ? [...segment.chars]
                          .map((c) => this.letterMap.get(c) ?? '?')
                          .join('')
                    : segment.chars;

                return {
                    index,
                    isWord: segment.isWord,
                    cipher: segment.chars,
                    plain,
                    open: this.open.has(index),
                    choices: segment.availableMatches.slice(0, MAX_CHOICES),
                    tooMany: Math.max(
                        0,
                        segment.availableMatches.length - MAX_CHOICES
                    ),
                };
            });
        }
    }
);
