/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const Result = require("../result");

module.exports = class Atbash {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.input = {
            value: ""
        };
        cipherConduitSetup(this, "atbash");
    }

    view() {
        return [
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text to see it encoded here");
        }

        return m(CipherResult, {
            name: "atbash",
            // No need for a direction - encode is the same as decode
            message: this.input.value,
            alphabet: this.alphabet.value
        });
    }
};
