/* global m */

// parsed items:
// * chars - ciphertext
// * isLetter - true if this should be decoded as a word
// * key - Rekeyed word (HELLO becomes ABCCD)
// * rawMatches - Pointer to original array of matched words from wordlist
// * availableMatches - Copy of array of words that can still be used
// * selectedWord - Empty string or the selected word
// * isLoaded - If the drop-down list is loaded (false, true, null = loading)
// * showingIndex - Index of the item we're showing in availableMatches

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
        this.bestGuessProgress = "";
        this.showList = 0;
        wordlists.getWordlists().then((wordlistsMeta) => {
            for (const wordlist of wordlistsMeta) {
                if (wordlist.filename === this.wordlist) {
                    this.wordlistMeta = wordlist;
                    this.loadWordlist();

                    return;
                }
            }

            m.route.set("/");
        });
    }

    // Pass in capital letters only
    keyWord(w) {
        let letterNumber = 65;
        let letterCount = 0;
        const m = new Map();

        const key = w
            .split("")
            .map((l) => {
                let n = m.get(l);

                if (!n) {
                    n = letterNumber;
                    m.set(l, n);
                    letterNumber += 1;
                    letterCount += 1;
                }

                return String.fromCharCode(n);
            })
            .join("");

        return {
            key,
            letterCount
        };
    }

    keyWordlist(words) {
        const result = {};

        for (const word of words) {
            const { key } = this.keyWord(word);
            let a = result[key];

            if (!a) {
                a = [];
                result[key] = a;
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

    incrementShowingIndex(list) {
        let index = list.length - 1;

        while (index >= 0) {
            const item = list[index];
            item.showingIndex += 1;

            if (item.showingIndex >= item.availableMatches.length) {
                item.showingIndex = 0;
                index -= 1;
            } else {
                return true;
            }
        }

        return false
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
            if (item.isLetter) {
                const { key, letterCount } = this.keyWord(item.chars);
                item.key = key;
                item.letterCount = letterCount;
                item.rawMatches = allWordsKeyed[item.key] || [];
                item.showingIndex = 0;
            }
        }

        return result;
    }

    reset() {
        for (const item of this.parsed) {
            if (item.isLetter) {
                item.availableMatches = [...item.rawMatches];
                item.selectedWord = "";
                item.isLoaded = false;
            }
        }

        this.letterMap = new Map();
        this.bestGuessStatus = 1;
        this.deduce([]);

        for (const item of this.parsed) {
            if (!item.selectedWord && item.isLetter) {
                this.bestGuessStatus = -1;
            }
        }
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
        const notUsedLetters = currentlyMapped ? `[^${currentlyMapped}]` : ".";
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

    sortParsedWords() {
        return (
            this.parsed
                .filter((item) => item.isLetter)
                // Sort by worst words first because we use pop/push instead of
                // shift/unshift.
                .sort((a, b) => {
                    // Worst = fewest distinct letters
                    const letterCountDiff = a.letterCount - b.letterCount;

                    if (letterCountDiff) {
                        return letterCountDiff;
                    }

                    // Worst = more dictionary entries
                    const aMatches = a.availableMatches.length;
                    const bMatches = b.availableMatches.length;
                    const matchesDiff = bMatches - aMatches;

                    return matchesDiff;
                })
        );
    }

    startBestGuess() {
        const parsedSorted = this.sortParsedWords();

        for (const item of parsedSorted) {
            item.hits = new Set();
        }

        const first = parsedSorted.pop();
        const state = {
            current: this.makeCurrentState(first, "", ""),
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
            if (
                state.current.index >=
                state.current.item.availableMatches.length
            ) {
                // Pop state
                state.next.push(state.current.item);
                state.current = state.earlier.pop();

                if (!state.current) {
                    this.finishBestGuess(state.next);

                    return;
                }

                state.current.index += 1;
            } else {
                while (
                    state.current.index <
                        state.current.item.availableMatches.length &&
                    !state.current.item.availableMatches[
                        state.current.index
                    ].match(state.current.pattern)
                ) {
                    state.current.index += 1;
                }

                if (
                    state.current.index <
                    state.current.item.availableMatches.length
                ) {
                    if (state.next.length) {
                        // Push state
                        const transition = state.current;
                        state.earlier.push(transition);
                        const item = state.next.pop();
                        state.current = this.makeCurrentState(
                            item,
                            transition.map,
                            transition.item.chars,
                            transition.item.availableMatches[transition.index]
                        );
                    } else {
                        // Matched all words
                        for (const stateItem of state.earlier) {
                            stateItem.item.hits.add(
                                stateItem.item.availableMatches[stateItem.index]
                            );
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

        parts.push(
            `[${state.current.index}/${state.current.item.availableMatches.length}]`
        );

        return parts.join(" ");
    }

    finishBestGuess(parsedSorted) {
        let wordsTested = 0;
        let modifiedWords = 0;
        let failedWords = 0;
        let possibilitiesRemoved = 0;

        for (const item of parsedSorted) {
            wordsTested += 1;

            if (item.hits.size) {
                modifiedWords += 1;
                const sizeBefore = item.availableMatches.length;
                item.availableMatches = item.availableMatches.filter((x) =>
                    item.hits.has(x)
                );
                const sizeAfter = item.availableMatches.length;
                possibilitiesRemoved = sizeBefore - sizeAfter;
            } else {
                failedWords += 1;
            }

            delete item.hits;
        }

        this.bestGuessStatus = 1;

        if (failedWords === wordsTested) {
            this.bestGuessProgress =
                "The words in this dictionary are unable to fully decode this message. Try a larger dictionary or attempt to pick words yourself to find a solution.";
        } else {
            this.bestGuessProgress = `Updated ${modifiedWords} out of ${wordsTested} words and removed ${possibilitiesRemoved} possibilities.`;
        }

        this.deduce([]);
    }

    view() {
        return [
            cryptogramShared.viewCipherText(),
            m("p", this.viewWordlist()),
            this.viewBestGuess(),
            this.viewParsed(),
            m("p", this.viewButtons()),
            this.viewList()
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
            return m("p", this.bestGuessProgress);
        }

        if (this.bestGuessStatus === 0) {
            return m(
                "p",
                `Working on eliminating conflicting words ... ${this.bestGuessProgress}`
            );
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
            " This can take a significant amount of time. Removes words from the lists that can not work with other cipher words. This will often help you find the deciphered text quicker, but limits you to using only dictionary words."
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
                "Go Back"
            ),
            m(
                "button",
                {
                    disabled:
                        !this.parsed ||
                        !this.parsed.length ||
                        this.bestGuessStatus === 0,
                    onclick: () => {
                        this.reset();
                    }
                },
                "Reset Options"
            )
        ];
    }

    viewList() {
        if (!this.parsed || this.bestGuessStatus === 0) {
            return [];
        }

        let max = 1;

        for (const item of this.parsed) {
            if (item.isLetter) {
                max *= item.availableMatches.length;
            }
        }

        if (max > 1000000) {
            return m(
                "p",
                "There are too many possibilities. Viewing the options has been disabled until you can narrow down the options."
            );
        }

        return [this.viewListWords(), this.viewListButton(max)];
    }

    viewListWords() {
        if (!this.showList) {
            return [];
        }

        for (const item of this.parsed) {
            item.showingIndex = 0;
        }

        const sorted = this.sortParsedWords();

        let showing = 0;
        const result = [];

        while (showing < this.showList) {
            result.push(this.viewSingleListEntry());
            showing += 1;

            if (!this.incrementShowingIndex(sorted)) {
                return result;
            }
        }

        return result;
    }

    viewSingleListEntry() {
        const entry = this.parsed.map((item) => {
            if (!item.isLetter) {
                return item.chars;
            }

            if (item.selectedWord) {
                return item.selectedWord;
            }

            return item.availableMatches[item.showingIndex];
        });

        return m("div", { class: "My(0.25em)" }, entry.join(""));
    }

    viewListButton(max) {
        if (max <= this.showList) {
            return m("p", "No further solutions exist with this dictionary.");
        }

        const chunkSize = 1000;

        return m(
            "p",
            m(
                "button",
                {
                    onclick: () => {
                        this.showList += chunkSize;
                    }
                },
                this.viewListButtonLabel(max, chunkSize)
            )
        );
    }

    viewListButtonLabel(max, chunkSize) {
        if (this.showList === 0 && chunkSize >= max) {
            return `Show all ${max.toLocaleString()} solutions`;
        }

        if (this.showList + chunkSize > max) {
            return `Show remaining ${(max - this.showList).toLocaleString()} solutions`;
        }

        if (this.showList === 0) {
            return `Show first ${chunkSize.toLocaleString()} solutions out of ${max.toLocaleString()}`;
        }

        return `Show next ${chunkSize.toLocaleString()} solutions out of ${max.toLocaleString()}`;
    }
};
