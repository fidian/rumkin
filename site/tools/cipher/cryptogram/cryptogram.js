/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Dropdown = require("../../../js/mithril/dropdown");
const LetterMapping = require("./letter-mapping");

module.exports = class Cryptogram {
    constructor() {
        this.input = {
            value: "",
            oninput: () => {
                this.buildLetterMaps();
            }
        };
        this.buildLetterMaps();
        this.wasCopied = false;
    }

    buildLetterMaps() {
        const oldLetterMaps = this.letterMaps || {};
        this.letterMaps = {};

        for (const letter of this.input.value.split("")) {
            if (!this.letterMaps[letter]) {
                if (oldLetterMaps[letter]) {
                    this.letterMaps[letter] = oldLetterMaps[letter];
                } else {
                    this.letterMaps[letter] = new LetterMapping(letter);
                }
            }
        }
    }

    isWhitespace(c) {
        return " \n\r\t\v".indexOf(c) >= 0;
    }

    view() {
        return [
            m(AdvancedInputArea, this.input),
            this.viewLetterMaps(),
            this.viewTranslation(),
            this.viewCopyButton()
        ];
    }

    viewCopyButton() {
        if (!this.input.value) {
            return null;
        }

        return m(
            "button",
            {
                disabled: this.wasCopied,
                onclick: () => {
                    const text = this.input.value.split("").map((c) => {
                        return this.letterMaps[c].to;
                    }).join("");
                    navigator.clipboard.writeText(text);
                    this.wasCopied = true;
                    setTimeout(() => {
                        this.wasCopied = false;
                        m.redraw();
                    }, 2000);
                }
            },
            this.wasCopied ? 'Copied!' : 'Copy Result'
        );
    }

    viewLetterMaps() {
        const sorted = Object.values(this.letterMaps)
            .filter((a) => {
                return !this.isWhitespace(a.from);
            })
            .sort((a, b) => {
                const aCode = a.from.charCodeAt(0);
                const bCode = b.from.charCodeAt(0);

                return aCode - bCode;
            });

        return m(
            "div",
            {
                class: "D(f) Fxw(w) Jc(c)"
            },
            sorted.map((letterMapping) => {
                return this.viewLetterMap(letterMapping);
            })
        );
    }

    viewLetterMap(letterMapping) {
        return m(
            "div",
            {
                class: `P(0.5em) Bdw(1px) D(f) Fxd(c) Ai(c) Fz(1.2em) M(0.5em) ${letterMapping.value}`
            },
            [
                m("div", letterMapping.from),
                m("input", {
                    type: "text",
                    class: "W(2em) Ta(c) Fz(1.2em)",
                    value: letterMapping.to,
                    oninput: (e) => {
                        letterMapping.to = e.target.value;
                    }
                }),
                m(Dropdown, letterMapping)
            ]
        );
    }

    viewTranslation() {
        return this.input.value.split(/\r\n?|\n|\v/).map((line) =>
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Jc(c)"
                },
                line.split(/[ \t]/).map((w) => this.viewTranslationWord(w))
            )
        );
    }

    viewTranslationWord(w) {
        return m(
            "div",
            {
                class: "Mx(0.25em) D(f) My(0.1em)"
            },
            w.split("").map((c) => this.viewTranslationLetter(c))
        );
    }

    viewTranslationLetter(c) {
        const letterMapping = this.letterMaps[c];
        const to = letterMapping.to;

        return m(
            "div",
            {
                class: "D(f) Fxd(c) Ai(c)"
            },
            [
                m("tt", c),
                m(
                    "tt",
                    {
                        class: `${letterMapping.value}`
                    },
                    to
                )
            ]
        );
    }
};
