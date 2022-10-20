/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const keyAlphabet = require("../key-alphabet");
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");

module.exports = class Bifid {
    constructor() {
        this.direction = {};
        const english = new rumkinCipher.alphabet.English();
        this.alphabet = {
            value: english,
            onchange: () => this.resetTranslations()
        };
        this.input = {
            label: "The message to encipher or decipher",
            value: ""
        };
        this.resetTranslations();
        cipherConduitSetup(this, "bifid", (msg) => {
            this.resetTranslations();
            const translations = msg.translations || "";
            let index = 0;
            for (const fromTo of translations.split(" ")) {
                const dest = this.translations[index];

                if (dest) {
                    dest.from = fromTo[0];
                    dest.to = fromTo[1];
                }

                index += 1;
            }
        });
    }

    resetTranslations() {
        let alphabet = keyAlphabet(this.alphabet);
        const squareSize = Math.floor(Math.sqrt(alphabet.length));
        const desiredAlphabetSize = squareSize * squareSize;
        const necessaryTranslations = alphabet.length - desiredAlphabetSize;
        this.translations = [];

        while (this.translations.length < necessaryTranslations) {
            let from = alphabet.toLetter(0);
            let to = alphabet.toLetter(1);
            const indexI = alphabet.toIndex("I");
            const indexJ = alphabet.toIndex("J");

            if (indexI !== -1 && indexJ !== -1) {
                from = "J";
                to = "I";
            }

            this.translations.push({ from, to, sourceAlphabet: alphabet });
            alphabet = alphabet.collapse(from, to);
        }

        this.alphabetInstance = alphabet;
    }

    updateAlphabet() {
        let alphabet = keyAlphabet(this.alphabet);

        for (const translation of this.translations) {
            const indexFrom = alphabet.toIndex(translation.from);
            const indexTo = alphabet.toIndex(translation.to);

            if (indexFrom === -1) {
                translation.from = alphabet.toLetter(0);
            }

            if (indexTo === -1) {
                translation.to = alphabet.toLetter(0);
            }

            if (translation.from === translation.to) {
                translation.to = alphabet.toLetter(0);

                if (translation.from === translation.to) {
                    translation.to = alphabet.toLetter(1);
                }
            }

            translation.sourceAlphabet = alphabet;
            alphabet = alphabet.collapse(translation.from, translation.to);
        }

        this.alphabetInstance = alphabet;
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(KeyedAlphabet, this.alphabet)),
            this.viewTranslations(),
            this.viewTableau(),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded here");
        }

        return m(CipherResult, {
            name: "bifid",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: this.alphabetInstance
        });
    }

    viewTableau() {
        const alphabet = this.alphabetInstance;
        const size = Math.sqrt(alphabet.length);
        let letters = "";

        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                letters += alphabet.toLetter(row * size + col) + " ";
            }

            letters = letters.trim() + "\n";
        }

        return m("p", [
            "Your tableau: ",
            m(
                "span",
                {
                    class: "D(if) Jc(c)"
                },
                m(
                    "pre",
                    {
                        class: "Mt(0)"
                    },
                    letters
                )
            )
        ]);
    }

    viewTranslations() {
        if (this.translations.length === 0) {
            return null;
        }

        return this.translations.map((translation) => {
            const from = {
                options: {},
                value: translation.from,
                onchange: (e) => {
                    translation.from = e.target.value;
                    this.updateAlphabet();
                }
            };

            const to = {
                options: {},
                value: translation.to,
                onchange: (e) => {
                    translation.to = e.target.value;
                    this.updateAlphabet();
                }
            };

            for (let i = 0; i < translation.sourceAlphabet.length; i += 1) {
                const letter = translation.sourceAlphabet.toLetter(i);
                from.options[letter] = letter;

                if (letter !== from.value) {
                    to.options[letter] = letter;
                }
            }

            return m("p", [
                "Translate ",
                m(Dropdown, from),
                " into ",
                m(Dropdown, to)
            ]);
        });
    }
};
