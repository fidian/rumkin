/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Dropdown = require("../../../js/mithril/dropdown");
const session = require("./session");
const wordlists = require("./wordlists");

module.exports = class CryptogramStart {
    constructor() {
        this.wordlists = {
            label: "Wordlist",
            value: session.wordlist,
            options: {}
        };
        this.ready = false;
        this.input = {
            label: "The cipher text to decode",
            value: session.cipherText
        };
        wordlists.getWordlists().then((wordlistsMeta) => {
            const dest = this.wordlists.options;
            let first = null;
            let found = false;

            for (const wordlist of wordlistsMeta) {
                const fn = wordlist.filename;

                if (!first) {
                    first = fn;
                }

                if (fn === this.wordlists.value) {
                    found = true;
                }

                dest[fn] = `${wordlist.name}, ${wordlist.wordCount} words`;
            }

            if (!found) {
                this.wordlists.value = first;
            }

            this.ready = true;
        });
    }

    view() {
        return [
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewWordlist()),
            m(
                "p",
                m(
                    "button",
                    {
                        disabled: this.input.value.trim().length === 0,
                        onclick: () => {
                            session.cipherText = this.input.value.trim();
                            session.wordlist = this.wordlists.value;
                            m.route.set("/solve");
                        }
                    },
                    "Next step"
                )
            )
        ];
    }

    viewWordlist() {
        if (!this.ready) {
            return "Loading list of wordlists";
        }

        return m(Dropdown, this.wordlists);
    }
};
