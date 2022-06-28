/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Result = require("../result");

module.exports = class Atbash {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.input = {
            value: ""
        };
    }

    view() {
        return [
            m('p', m(AlphabetSelector, this.alphabet)),
            m('p', m(AdvancedInputArea, this.input)),
            m('p', this.viewResult())
        ];
    }

    viewResult() {
        if (this.input.value.trim() === '') {
            return m(Result, "Enter text to see it encoded here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.atbash;
        const result = module.encipher(message, this.alphabet.value);

        return m(Result, result.toString());
    }
};
