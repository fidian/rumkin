/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const keyAlphabet = require("../key-alphabet");
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");

module.exports = class LetterNumbers {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.direction = {};
        this.input = {
            label: "The text to encode or decode",
            value: ""
        };
        this.delimiterOptions = {
            value: "-",
            options: {
                "-": "Hyphen",
                " ": "Space",
                "": "None"
            },
            label: "Delimiter between encoded letters"
        };
        this.padWithZeros = {
            label: "Pad the numbers with zeros so all codes are the same length",
            value: false
        };
        cipherConduitSetup(this, "morse");
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(KeyedAlphabet, this.alphabet)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", m(Dropdown, this.delimiterOptions)),
            m("p", m(Checkbox, this.padWithZeros)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "letterNumber",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: keyAlphabet(this.alphabet),
            options: {
                delimiter: this.delimiterOptions.value,
                padWithZeros: this.padWithZeros.value
            }
        });
    }
};
