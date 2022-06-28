/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetKey = require("../alphabet-key");
const AlphabetSelector = require("../alphabet-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const EncryptionDirectionSelector = require("../encryption-direction-selector");
const keyAlphabet = require("../key-alphabet");
const Result = require("../result");

module.exports = class Bifid {
    constructor() {
        this.encryptionDirection = {
            value: "ENCRYPT"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => this.resetTranslations()
        };
        this.alphabetKey = {
            options: {},
            value: ""
        };
        this.input = {
            label: "The message to encipher or decipher",
            value: ""
        };
        this.resetTranslations();
    }

    resetTranslations() {
        let alphabet = this.alphabet.value;
        const squareSize = Math.floor(Math.sqrt(alphabet.length));
        const desiredAlphabetSize = squareSize * squareSize;
        const necessaryTranslations =
            this.alphabet.value.length - desiredAlphabetSize;
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
        this.input.alphabet = alphabet;
    }

    updateAlphabet() {
        let alphabet = this.alphabet.value;

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
        this.input.alphabet = alphabet;
    }

    view() {
        return [
            m("p", m(EncryptionDirectionSelector, this.encryptionDirection)),
            m("p", m(AlphabetSelector, this.alphabet)),
            this.viewTranslations(),
            m("p", m(AlphabetKey, this.alphabetKey)),
            this.viewTableau(),
            m("p", m(AdvancedInputArea, this.input)),
            // Add an action to remove non-letters from the text
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const alphabet = keyAlphabet(this.alphabetInstance, this.alphabetKey);
        const module = rumkinCipher.cipher.bifid;
        const method = this.encryptionDirection.value === 'ENCRYPT' ? 'encipher' : 'decipher';
        const result = module[method](message, alphabet);

        return m(Result, result.toString());
    }

    viewTableau() {
        const size = Math.sqrt(this.alphabetInstance.length);
        let letters = "";
        const alphabet = keyAlphabet(this.alphabetInstance, this.alphabetKey);

        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                letters +=
                    alphabet.toLetter(row * size + col) + " ";
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
