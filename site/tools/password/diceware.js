/* global m */

"use strict";

const random = require("../../js/module/random");

module.exports = class Diceware {
    constructor() {
        this.loadingIndex = true;
        this.loadingWords = false;
        this.result = "";
        this.words = [];

        m.request({
            extract: (x) => JSON.parse(x.responseText),
            url: "diceware-wordlists.json"
        }).then((wordlists) => {
            this.loadingIndex = false;
            this.wordlists = wordlists;
            let defaultWordlist = 0;

            for (let i = 0; i < wordlists.length; i += 1) {
                if (wordlists[i].default) {
                    defaultWordlist = i;
                }
            }

            this.loadWordlist(defaultWordlist);
        });
    }

    loadWordlist(number) {
        this.selectedWordlist = number;
        this.loadingWords = number;
        const entry = this.wordlists[number];
        m.request({
            extract: (response) =>
                response.responseText
                    .replace(/\r/, "\n")
                    .split("\n")
                    .map((x) => x.trim())
                    .filter((x) => !!x),
            url: entry.uri
        }).then((words) => {
            this.words = words;
            this.loadingWords = false;
        });
    }

    addWord() {
        this.result += ` ${this.words[random.index(this.words.length)]}`;
    }

    clear() {
        this.result = "";
    }

    view() {
        if (this.loadingIndex) {
            return m(
                "p",
                { class: "output" },
                "Loading list of different wordlists."
            );
        }

        return [
            m(
                "p",
                m(
                    "select",
                    {
                        onchange: (e) => {
                            this.loadWordlist(+e.target.value);
                        }
                    },
                    this.wordlistOptions()
                )
            ),
            this.actionButtons(),
            m(
                "p",
                {
                    class: "output"
                },
                this.result ||
                    'Generate a passphrase by pressing the "Add a Word" button a few times.'
            )
        ];
    }

    actionButtons() {
        // Note: 0 is a value indicating that we are loading words
        if (this.loadingWords !== false) {
            return m(
                "p",
                `Loading wordlinst: ${
                    this.wordlists[this.loadingWords].description
                }`
            );
        }

        return m("p", [
            m(
                "button",
                {
                    onclick: () => this.addWord()
                },
                "Add a word"
            ),
            m(
                "button",
                {
                    onclick: () => this.clear()
                },
                "Clear"
            )
        ]);
    }

    wordlistOptions() {
        return this.wordlists.map((entry, index) =>
            m(
                "option",
                {
                    value: index,
                    selected: this.selectedWordlist === index
                },
                `${entry.code} - ${entry.description}`
            )
        );
    }
};
