/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Result = require("../result");

module.exports = class Rot13 {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.input = {
            alphabet: this.alphabet,
            value: ""
        };
    }

    view() {
        return [
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (this.alphabet.value.letterOrder.upper.length % 2 === 1) {
            return m(
                Result,
                "This alphabet has an odd number of letters. Select another to encode or decode messages."
            );
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const result = rumkinCipher.cipher.caesar.encipher(
            message,
            this.alphabet.value,
            {
                shift: this.alphabet.value.letterOrder.upper.length / 2
            }
        );

        return m(Result, result.toString());
    }
};
