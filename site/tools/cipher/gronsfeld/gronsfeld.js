/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const DirectionSelector = require("../direction-selector");
const KeyedAlphabet = require("../keyed-alphabet");
const TextInput = require("../../../js/mithril/text-input");
const Result = require("../result");

module.exports = class Gronsfeld {
    constructor() {
        this.direction = {};
        this.alphabet = {};
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
            m("p", m(TextInput, this.cipherKey)),
            m("p", this.viewVigenereKey()),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewVigenereKey() {
        const alpha = "ABCDEFGHIJ";
        this.vigenereKey = this.cipherKey.value
            .replace(/[^0-9]/g, "")
            .replace(/[0-9]/g, (match) => alpha[+match]);

        return `Vigenère equivalent key: ${this.vigenereKey}`;
    }

    viewResult() {
        if (this.vigenereKey.length === 0) {
            return m(Result, "A cipher key is required");
        }

        if (this.input.value.trim() === "") {
            return m(Result, "Enter text and see the result here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.vigenere;
        const result = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                key: this.vigenereKey
            }
        );

        return m(Result, result.toString());
    }
};
