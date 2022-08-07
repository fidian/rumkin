/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");
const ShowHide = require("../show-hide");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Gronsfeld {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.alphabet.alphabet = this.alphabet.value;
        this.autokey = {
            label: 'Use "autokey" variant to extend the key with plaintext (not typical for Gronsfeld)',
            value: false
        };
        this.cipherKey = {
            label: "Cipher key",
            value: ""
        };
        this.input = {
            alphabet: this.alphabet,
            label: "Message to encode or decode",
            value: ""
        };
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(KeyedAlphabet, this.alphabet)),
            m("p", [
                m(TextInput, this.cipherKey),
                m("br"),
                this.viewVigenereKey()
            ]),
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

    viewVigenereKey() {
        this.vigenereKey = this.cipherKey.value
            .replace(/[^0-9]/g, "")
            .replace(/[0-9]/g, (match) => this.alphabet.value.letterOrder.upper.charAt(+match));

        return `Vigenère equivalent key: ${this.vigenereKey}`;
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
            ...rows.map((number) => {
                const shiftedAlphabet = keyedAlphabetDoubled.slice(
                    number,
                    number + this.alphabet.value.letterOrder.upper.length
                );

                return m("tr", [
                    m("th", m("tt", number)),
                    ...shiftedAlphabet.map((shiftedLetter) =>
                        m("td", m("tt", shiftedLetter))
                    )
                ]);
            }),
            this.viewTableauHeader()
        ]);
    }

    tableauRows() {
        const defaultRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        if (this.autokey.value) {
            return defaultRows;
        }

        const cipherKey = this.cipherKey.value.replace(/[^0-9]/g, "");

        if (cipherKey === "") {
            return defaultRows;
        }

        return cipherKey.split("").map(n => +n);
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
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text and see the result here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.vigenère;
        const result = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                key: this.vigenereKey,
                autokey: this.autokey.value
            }
        );

        return m(Result, result.toString());
    }
};
