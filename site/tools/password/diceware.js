/* global m */

"use strict";

const Dropdown = require("../../js/mithril/dropdown");
const random = require("../../js/module/random");

module.exports = class Diceware {
    constructor() {
        this.loadingIndex = true;
        this.loadingWords = null;
        this.result = "";
        this.words = [];
        this.wordlistSelect = {
            options: {},
            onchange: () => {
                this.loadWordlist(this.wordlistSelect.value);
            }
        };

        m.request({
            url: "diceware-wordlists.json"
        }).then((wordlists) => {
            this.loadingIndex = false;
            this.wordlists = {};
            let defaultWordlist = null;

            for (const item of wordlists) {
                this.wordlists[item.uri] = item;
                this.wordlistSelect.options[item.uri] = `${item.code} - ${item.description}`;

                if (defaultWordlist === null || item.default) {
                    defaultWordlist = item.uri;
                }
            }

            this.wordlistSelect.value = defaultWordlist;
            this.loadWordlist(defaultWordlist);
        });
    }

    loadWordlist(key) {
        this.loadingWords = key;
        const entry = this.wordlists[key];
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
            this.loadingWords = null;
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
                    Dropdown, this.wordlistSelect
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
        if (this.loadingWords !== null) {
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
};
