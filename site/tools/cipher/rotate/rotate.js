/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const Dropdown = require("../../../js/mithril/dropdown");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");
// Can't use TranspositionOperatingMode because this requires a pad character

module.exports = class Rotate {
    constructor() {
        this.direction = {
            value: "CLOCKWISE",
            options: {
                CLOCKWISE: "Clockwise (to the right)",
                COUNTER_CLOCKWISE: "Counter-clockwise (to the left)"
            },
            label: "Direction of rotation"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => this.updatePadCharacter()
        };
        this.width = {
            value: 1,
            label: "Width of the table"
        };
        this.padCharacter = {
            label: "Pad character"
        };
        this.input = {
            value: ""
        };
        this.moveCaps = {
            label: "Move capitalization with the transposed letter",
            value: false
        };
        this.updatePadCharacter();
        cipherConduitSetup(this, "rotate");
    }

    updatePadCharacter() {
        const options = {};

        for (const letter of this.alphabet.value.letterOrder.upper.split('')) {
            options[letter] = letter;
        }

        this.padCharacter.options = options;
        this.padCharacter.value = this.alphabet.value.padChar;
    }

    view() {
        return [
            m("p", m(Dropdown, this.direction)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(NumericInput, this.width)),
            m("p", m(Dropdown, this.padCharacter)),
            m("p", m(Checkbox, this.moveCaps)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (this.input.value.trim().length === 0) {
            return m(Result, "Enter text to see it encoded here");
        }

        this.alphabet.value.padChar = this.padCharacter.value;

        return m(CipherResult, {
            name: "rotate",
            direction: "ENCRYPT",
            message: this.input.value,
            alphabet: this.alphabet.value,
            options: {
                clockwise: this.direction.value === "CLOCKWISE",
                keepCapitalization: this.moveCaps.value,
                width: this.width.value
            }
        });
    }
};
