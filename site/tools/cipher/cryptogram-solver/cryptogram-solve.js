/* global m */

// parsed items:
// * chars - ciphertext
// * isLetter - true if this should be decoded as a word
// * key - Rekeyed word (HELLO becomes ABCCD)
// * rawMatches - Pointer to original array of matched words from wordlist
// * availableMatches - Copy of array of words that can still be used
// * selectedWord - Empty string or the selected word
// * isLoaded - If the drop-down list is loaded (false, true, null = loading)

const cryptogramShared = require("./cryptogram-shared");
const CryptogramWord = require("./cryptogram-word");
const session = require("./session");
const wordlists = require("./wordlists");

module.exports = class CryptogramSolve {
    constructor() {
        this.wordlist = session.wordlist;
        this.wordlistMeta = null;
        this.parsed = null;
        this.letterMap = new Map();
        this.bestGuessStatus = -1;
        this.bestGuessProgress = '';
        wordlists.getWordlists().then((wordlistsMeta) => {
            for (const wordlist of wordlistsMeta) {
                if (wordlist.filename === this.wordlist) {
                    this.wordlistMeta = wordlist;
                    this.loadWordlist();

                    return;
                }
            }

            m.route.set("/wordlist");
        });
    }

    // Pass in capital letters only
    keyWord(w) {
        let letterNumber = 65;
        const m = new Map();

        return w
            .split("")
            .map((l) => {
                let n = m.get(l);

                if (!n) {
                    n = letterNumber;
                    m.set(l, n);
                    letterNumber += 1;
                }

                return String.fromCharCode(n);
            })
            .join("");
    }

    keyWordlist(words) {
        const result = {};

        for (const word of words) {
            const keyed = this.keyWord(word);
            let a = result[keyed];

            if (!a) {
                a = [];
                result[keyed] = a;
            }

            a.push(word);
        }

        return result;
    }

    upper(s) {
        return s.toUpperCase().replace(/ß/g, "ẞ");
    }

    isLetter(c) {
        return !!c.match(
            /['·A-ZÀÁÂÄÅÃĄÆĈÇĆČÐĐÈÉÊËĘĜĤÌÍÎÏĴŁÑŃÒÓÔÖÕØŜŚŠŞẞÙÚÛÜŬÝŹŻАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ]/
        );
    }

    parseWords(allWordsKeyed) {
        const result = [];
        let last = null;

        for (const c of this.upper(session.cipherText).split("")) {
            const isLetter = this.isLetter(c);

            if (!last || last.isLetter !== isLetter) {
                last = {
                    chars: c,
                    isLetter: isLetter
                };
                result.push(last);
            } else {
                last.chars += c;
            }
        }

        for (const item of result) {
            item.key = this.keyWord(item.chars);
            item.rawMatches = allWordsKeyed[item.key] || [];
        }

        return result;
    }

    reset() {
        for (const item of this.parsed) {
            item.availableMatches = [...item.rawMatches];
            item.selectedWord = "";
            item.isLoaded = false;
        }

        this.letterMap = new Map();
        this.bestGuessStatus = -1;
        this.deduce([]);
    }

    loadWordlist() {
        wordlists.getWordlist(this.wordlistMeta.filename).then((words) => {
            const allWordsKeyed = this.keyWordlist(words);
            this.parsed = this.parseWords(allWordsKeyed);
            this.reset();
        });
    }

    // Queue: [[FROM_WORD, TO_WORD], ...]
    deduce(queue) {
        const thinkHard = () => {
            for (const item of this.parsed) {
                if (item.isLetter) {
                    this.updateAvailableMatches(item);

                    if (
                        item.availableMatches.length === 1 &&
                        !item.selectedWord
                    ) {
                        item.selectedWord = item.availableMatches[0];
                        queue.push([item.chars, item.selectedWord]);
                    }
                }
            }
        };

        thinkHard();

        while (queue.length) {
            const [from, to] = queue.shift();

            for (let i = 0; i < from.length; i += 1) {
                this.letterMap.set(from.charAt(i), to.charAt(i));
            }

            thinkHard();
        }
    }

    makePattern(chars, letterMap) {
        const currentlyMapped = [...this.letterMap.values()].join("");
        const notUsedLetters = currentlyMapped ? `[^${currentlyMapped}]` : '.';
        const pattern = chars
            .split("")
            .map((c) => letterMap.get(c) || notUsedLetters)
            .join("");

        return new RegExp(`^${pattern}$`);
    }

    updateAvailableMatches(item) {
        const regExp = this.makePattern(item.chars, this.letterMap);
        item.availableMatches = item.availableMatches.filter((x) =>
            x.match(regExp)
        );
    }

    startBestGuess() {
        // Sort by worst words first because we use pop/push instead of shift/unshift.
        const parsedSorted = this.parsed.filter(item => item.isLetter).sort((a, b) => {
            // Worst = fewest distinct letters
            const aLetterCode = Math.max(...a.key.split('').map(x => x.charCodeAt(0)));
            const bLetterCode = Math.max(...b.key.split('').map(x => x.charCodeAt(0)));
            const codeDiff = aLetterCode - bLetterCode;

            if (codeDiff) {
                return codeDiff;
            }

            // Worst = more dictionary entries
            const aMatches = a.availableMatches.length;
            const bMatches = b.availableMatches.length;
            const matchesDiff = bMatches - aMatches;

            return matchesDiff;
        });

        console.log(parsedSorted.map(x => `${x.key} ${x.availableMatches.length}`));

        for (const item of parsedSorted) {
            item.hits = new Set();
        }

        const first = parsedSorted.pop();
        const state = {
            current: this.makeCurrentState(first, '', ''),
            earlier: [],
            next: parsedSorted
        };

        this.processState(state);
    }

    makeCurrentState(item, letterMap, cipherText, plainText) {
        const map = new Map(letterMap);

        for (let i = 0; i < cipherText.length; i += 1) {
            map.set(cipherText.charAt(i), plainText.charAt(i));
        }

        const pattern = this.makePattern(item.chars, map);

        return {
            index: 0,
            item,
            map,
            pattern
        };
    }

    processState(state) {
        const start = Date.now();

        while (start + 200 > Date.now()) {
            if (state.current.index >= state.current.item.availableMatches.length) {
                // Pop state
                state.next.push(state.current.item);
                state.current = state.earlier.pop();

                if (!state.current) {
                    this.finishBestGuess(state.next);

                    return;
                }

                state.current.index += 1;
            } else {
                while (state.current.index < state.current.item.availableMatches.length && !state.current.item.availableMatches[state.current.index].match(state.current.pattern)) {
                    state.current.index += 1;
                }

                if (state.current.index < state.current.item.availableMatches.length) {
                    if (state.next.length) {
                        // Push state
                        const transition = state.current;
                        state.earlier.push(transition);
                        const item = state.next.pop();
                        state.current = this.makeCurrentState(item, transition.map, transition.item.chars, transition.item.availableMatches[transition.index]);
                    } else {
                        // Matched all words
                        for (const stateItem of state.earlier) {
                            stateItem.item.hits.add(stateItem.item.availableMatches[stateItem.index]);
                        }

                        state.current.index += 1;
                    }
                }
            }
        }

        this.bestGuessProgress = this.makeBestGuessProgress(state);

        setTimeout(() => {
            this.processState(state);
            m.redraw();
        }, 1);
    }

    makeBestGuessProgress(state) {
        const parts = [];

        for (const x of state.earlier) {
            parts.push(`[${x.index}/${x.item.availableMatches.length}]`);
        }

        parts.push(`[${state.current.index}/${state.current.item.availableMatches.length}]`);

        return parts.join(' ');
    }

    finishBestGuess(parsedSorted) {
        for (const item of parsedSorted) {
            if (item.hits.size) {
                item.availableMatches = item.availableMatches.filter(x => item.hits.has(x));
            }

            delete item.hits;
        }

        this.bestGuessStatus = 1;
        this.deduce([]);
    }

    view() {
        return [
            cryptogramShared.viewCipherText(),
            m("p", this.viewWordlist()),
            this.viewBestGuess(),
            this.viewParsed(),
            m("p", this.viewButtons())
        ];
    }

    viewWordlist() {
        if (!this.wordlistMeta) {
            return "Loading list of wordlists";
        }

        return m("p", [m("b", "Wordlist:"), ` ${this.wordlistMeta.name}`]);
    }

    viewBestGuess() {
        if (this.bestGuessStatus > 0 || !this.parsed || !this.parsed.length) {
            return null;
        }

        if (this.bestGuessStatus === 0) {
            return m("p", `Working on eliminating conflicting words ... ${this.bestGuessProgress}`);
        }

        return m("p", [
            m(
                "button",
                {
                    onclick: () => {
                        this.bestGuessStatus = 0;
                        this.startBestGuess();
                        return false;
                    }
                },
                "Eliminate Bad Combinations"
            ),
            " This can take a significant amount of time. Removes words from the lists that can not work with other cipher words. This will often help you find the deciphered text much quicker, but the entire cipher text must be dictionary words."
        ]);
    }

    viewParsed() {
        if (!this.parsed) {
            return "Loading dictionary...";
        }

        if (!this.parsed.length) {
            return "Nothing to decrypt";
        }

        if (this.bestGuessStatus === 0) {
            return null;
        }

        return m(
            "div",
            {
                class: "D(f) Fxw(w)"
            },
            this.parsed.map((data) =>
                m(CryptogramWord, {
                    data,
                    letterMap: this.letterMap,
                    setLetters: (from, to) => this.deduce([[from, to]])
                })
            )
        );
    }

    viewButtons() {
        return [
            m(
                "button",
                {
                    onclick: () => {
                        m.route.set("/");
                    }
                },
                "Start Over"
            ),
            m(
                "button",
                {
                    onclick: () => {
                        m.route.set("/wordlist");
                    }
                },
                "Go Back"
            ),
            m(
                "button",
                {
                    disabled: !this.parsed || !this.parsed.length,
                    onclick: () => {
                        this.reset();
                    }
                },
                "Reset Options"
            )
        ];
    }
};
