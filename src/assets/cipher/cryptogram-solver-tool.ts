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
import './word-choice.ts';
import {
    applySearch,
    createListing,
    createSearch,
    currentPlaintext,
    deduce,
    keyWordlist,
    listingProgress,
    listingSummary,
    MAX_COMBINATIONS,
    parseWords,
    resetSegments,
    searchProgress,
    stepListing,
    stepSearch,
    type ListingState,
    type Segment,
} from './cryptogram-solver.ts';
import type { WordChoiceView } from './word-choice.ts';

interface WordlistMeta {
    filename: string;
    name: string;
    description: string;
    wordCount: number;
}

interface WordView extends WordChoiceView {
    index: number;
    cipher: string;
    /** False for the text between words, and for a word nothing fits. */
    pickable: boolean;
}

/** A search runs in slices; this is which one, so Stop sits beside it. */
type Job = '' | 'eliminate' | 'list';

const STORE = 'cryptogramSolver.';
const DEFAULT_LIST = 'american-english-50-medium.txt';

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
                margin: 0 0.3em 0.6em 0;
            }

            /*
             * Padded like the drop-down beneath it, so a cipher letter sits
             * over the plain letter it stands for.
             */
            .word tt {
                border: 0 solid transparent;
                border-width: 0 1px;
                display: block;
                font-family: var(--font-anonymous-pro), monospace;
                font-size: max(1em, 16px);
                padding: 0 0.3em;
                white-space: pre;
            }

            /* A word with no drop-down still lines up with those that have. */
            .word tt.plain-word {
                border-width: 1px;
                padding: 0.3em;
            }

            .combinations {
                font-family: var(--font-anonymous-pro), monospace;
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
                        class="solve"
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
                    <p class="plain so-far">{{plaintext}}</p>

                    <div class="words">
                        <div *for="word of words" class="word">
                            <tt>{{word.cipher}}</tt>
                            <tt class="plain-word" *if="!word.pickable"
                                >{{word.plain}}</tt
                            >
                            <word-choice
                                *if="word.pickable"
                                .view="word"
                                .disabled="searching"
                                @word-pick="choose(word.index, $event)"
                            ></word-choice>
                        </div>
                    </div>

                    <p>
                        {{progress}}
                        <button
                            type="button"
                            *if="job === 'eliminate'"
                            @click="stop()"
                        >
                            Stop
                        </button>
                    </p>

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
                        <button
                            type="button"
                            class="list-all"
                            @click="listAll()"
                            .disabled="searching"
                        >
                            Show All Combinations
                        </button>
                        Lists every way the words can be read together, up to
                        {{limit}}, starting from the first option for each
                        word. The words you have picked stay as they are.
                    </p>

                    <p>
                        <button type="button" @click="reset()">Reset</button>
                        <button type="button" @click="back()">
                            Start over
                        </button>
                    </p>

                    <p class="list-status">
                        {{listStatus}}
                        <button
                            type="button"
                            *if="job === 'list'"
                            @click="stop()"
                        >
                            Stop
                        </button>
                    </p>
                    <p class="note stale" *if="listStale">
                        This list was made before your last change.
                    </p>
                    <ol class="combinations" #ref="listEl"></ol>
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
        job: Job = '';
        searching = false;
        listStatus = '';
        listStale = false;
        limit = MAX_COMBINATIONS.toLocaleString('en-US');
        listEl?: HTMLOListElement;

        private segments: Segment[] = [];
        private listing?: ListingState;
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
            this.clearList();
            this.wordlistName =
                this.lists.find((l) => l.filename === this.wordlist)?.name ?? '';

            try {
                const response = await fetch(`../wordlists/${this.wordlist}`);
                const words = (await response.text()).trim().split(/[\r\n]+/);
                this.segments = parseWords(this.cipherText, keyWordlist(words));
                this.rebuild();
            } catch {
                this.progress = 'Could not load that wordlist.';
            }

            this.loading = false;
        }

        back() {
            this.halt();
            this.screen = 'start';
        }

        reset() {
            this.halt();
            resetSegments(this.segments);
            this.progress = '';
            this.clearList();
            this.rebuild();
        }

        /** A word picked from its list, or '' to leave it open again. */
        choose(index: number, event: CustomEvent<string>) {
            const segment = this.segments[index];
            if (!segment || this.job) return;

            segment.selectedWord = event.detail;
            this.listStale = !!this.listStatus;
            this.rebuild();
        }

        /**
         * The search is exponential in the worst case, so it runs in slices
         * with a yield between them. Without that the tab locks up for as
         * long as it takes, with no way to tell whether it is working.
         */
        eliminate() {
            if (this.job) return;

            const state = createSearch(this.segments);

            this.run('eliminate', () => {
                if (!stepSearch(state)) {
                    this.progress = `Working on eliminating conflicting words ... ${searchProgress(state)}`;
                    return false;
                }

                const outcome = applySearch(state);
                this.progress = outcome.hopeless
                    ? 'The words in this dictionary are unable to fully decode this message. Try a larger dictionary or attempt to pick words yourself to find a solution.'
                    : `Updated ${outcome.narrowedWords} out of ${outcome.wordsTested} words and removed ${outcome.possibilitiesRemoved} possibilities.`;
                this.listStale = !!this.listStatus;
                this.rebuild();
                return true;
            });
        }

        /**
         * The list goes up as it is found rather than all at the end, so a
         * long search shows what it has and Stop keeps it. It is built by
         * hand for the same reason the drop-downs are: ten thousand lines
         * is too many to give a scope and a binding each.
         */
        listAll() {
            if (this.job) return;

            const state = createListing(this.segments);
            let shown = 0;

            this.clearList();
            this.listing = state;

            this.run('list', () => {
                const finished = stepListing(state);
                const lines = document.createDocumentFragment();

                for (; shown < state.found.length; shown += 1) {
                    const line = document.createElement('li');
                    line.textContent = state.found[shown];
                    lines.append(line);
                }

                this.listEl?.append(lines);
                this.listStatus = finished
                    ? listingSummary(state)
                    : `Looking for combinations, ${shown.toLocaleString('en-US')} so far ... ${listingProgress(state)}`;
                return finished;
            });
        }

        stop() {
            const stopped = this.job;
            this.halt();

            if (stopped === 'eliminate') {
                this.progress = 'Stopped. No words were removed.';
            } else if (stopped === 'list' && this.listing) {
                this.listStatus = listingSummary(this.listing, true);
            }
        }

        /** Run `slice` until it reports that it has finished. */
        private run(job: Job, slice: () => boolean) {
            this.job = job;
            this.searching = true;

            const turn = () => {
                if (slice()) this.halt();
                else this.searchTimer = setTimeout(turn, 1);
            };

            turn();
        }

        private halt() {
            clearTimeout(this.searchTimer);
            this.job = '';
            this.searching = false;
        }

        private clearList() {
            this.listing = undefined;
            this.listStatus = '';
            this.listStale = false;
            this.listEl?.replaceChildren();
        }

        private rebuild() {
            const { letterMap, candidates } = deduce(this.segments);
            this.plaintext = currentPlaintext(this.segments, letterMap);

            const views = this.segments.map((segment, index) => {
                const matches = candidates[index];
                const picked = !!segment.selectedWord;
                // The space around punctuation is dropped: the words are
                // already set apart, and a row of them that wraps should
                // start at the margin rather than a space in from it.
                const cipher = segment.chars.trim();
                const plain = segment.isWord
                    ? [...segment.chars]
                          .map((c) => letterMap.get(c) ?? '?')
                          .join('')
                    : cipher;

                return {
                    index,
                    cipher,
                    plain,
                    pickable: matches.length > 0,
                    label: `Plain text for ${segment.chars}`,
                    value: matches.length === 1 ? matches[0] : '',
                    picked,
                    choices: () =>
                        picked ? this.alternatives(index) : matches,
                };
            });

            this.words = views.filter((view) => view.cipher);
        }

        /**
         * What a picked word could be instead: everything that fits the
         * other picks, worked out as though this one had not been made.
         * Only done when its list opens, since it costs a whole deduction.
         */
        private alternatives(index: number) {
            const picked = this.segments[index].selectedWord;
            const others = deduce(this.segments, index).candidates[index];

            // Another pick may since have ruled this one out. It is still
            // what the word is set to, so it still has to be in its list.
            return others.includes(picked) ? others : [picked, ...others];
        }
    }
);
