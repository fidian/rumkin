/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");
const ShowHide = require("../show-hide");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Vigenere {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.alphabet.alphabet = this.alphabet.value;
        this.cipherKey = {
            label: "Cipher key",
            value: ""
        };
        this.autokey = {
            label: 'Use "autokey" variant to extend the key with plaintext',
            value: false
        };
        this.input = {
            alphabet: this.alphabet,
            value: ""
        };
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
        // Keyed alphabet
        const keyedAlphabetDoubled = (
            this.alphabet.value.letterOrder.upper +
            this.alphabet.value.letterOrder.upper
        ).split("");
        const rows = this.tableauRows();

        return m("table", [
            this.viewTableauHeader(),
            ...rows.map((letter) => {
                // Keyed alphabet
                const index = this.alphabet.value.toIndex(letter);
                const shiftedAlphabet = keyedAlphabetDoubled.slice(
                    index,
                    index + this.alphabet.value.letterOrder.upper.length
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
        const alphabet = this.alphabet.alphabet;

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
        // Keyed alphabet
        const letters = this.alphabet.value.letterOrder.upper.split("");

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

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.vigenère;
        const result = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                key: this.cipherKey.value,
                autokey: this.autokey.value
            }
        );

        return m(Result, result.toString());
    }
};
