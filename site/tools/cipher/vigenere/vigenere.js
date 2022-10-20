/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const keyAlphabet = require("../key-alphabet");
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");
const ShowHide = require("../show-hide");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Vigenere {
    constructor() {
        this.direction = {
            value: "ENCRYPT"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.cipherKey = {
            label: "Cipher key",
            value: ""
        };
        this.autokey = {
            label: 'Use "autokey" variant to extend the key with plaintext',
            value: false
        };
        this.input = {
            value: ""
        };
        cipherConduitSetup(this, "vigenere");
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(KeyedAlphabet, this.alphabet)),
            m("p", m(TextInput, this.cipherKey)),
            m(
                "p",
                m(ShowHide, {
                    label: "Tableau",
                    content: this.viewTableau()
                })
            ),
            m("p", m(Checkbox, this.autokey)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewTableau() {
        const keyedAlphabet = keyAlphabet(this.alphabet);
        const keyedAlphabetDoubled = (
            keyedAlphabet.letterOrder.upper + keyedAlphabet.letterOrder.upper
        ).split("");
        const rows = this.tableauRows();

        return m("table", [
            this.viewTableauHeader(),
            ...rows.map((letter) => {
                const index = keyedAlphabet.toIndex(letter);
                const shiftedAlphabet = keyedAlphabetDoubled.slice(
                    index,
                    index + keyedAlphabet.letterOrder.upper.length
                );

                return m("tr", [
                    m("th", m("tt", letter)),
                    ...shiftedAlphabet.map((shiftedLetter) =>
                        m("td", m("tt", shiftedLetter))
                    )
                ]);
            }),
            this.viewTableauHeader()
        ]);
    }

    tableauRows() {
        // Unkeyed alphabet for easier lookups
        const alphabet = this.alphabet.value;

        if (this.autokey.value) {
            return alphabet.letterOrder.upper.split("");
        }

        const m = new rumkinCipher.util.Message(this.cipherKey.value);
        const cipherKey = m.separate(alphabet).toString();

        if (cipherKey === "") {
            return alphabet.letterOrder.upper.split("");
        }

        return cipherKey.split("");
    }

    viewTableauHeader() {
        const keyedAlphabet = keyAlphabet(this.alphabet);
        const letters = keyedAlphabet.letterOrder.upper.split("");

        return m("tr", [
            m("th"),
            ...letters.map((letter) => m("th", m("tt", letter)))
        ]);
    }

    viewResult() {
        if (this.cipherKey.value.length < 1) {
            return m(Result, "You must specify a cipher key");
        }

        if (this.input.value.length < 1) {
            return m(Result, "Enter words to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "vigenère",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: keyAlphabet(this.alphabet),
            options: {
                key: this.cipherKey.value,
                autokey: this.autokey.value
            }
        });
    }
};
