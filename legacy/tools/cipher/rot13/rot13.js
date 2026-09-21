/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const Result = require("../result");

module.exports = class Rot13 {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.rot5 = {
            label: "Also ROT5 digits",
            value: false
        };
        this.input = {
            value: ""
        };
        cipherConduitSetup(this, "rot13");
    }

    view() {
        return [
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(Checkbox, this.rot5)),
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

        if (!this.input.value.trim().length) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "rot13",
            direction: "ENCRYPT",
            message: this.input.value,
            alphabet: this.alphabet.value,
            options: {
                rot5Numbers: this.rot5.value
            }
        });
    }
};
