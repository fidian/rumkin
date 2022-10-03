/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const Checkbox = require("../../../js/mithril/checkbox");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const keyAlphabet = require("../key-alphabet");
const KeyedAlphabet = require("../keyed-alphabet");
const InputArea = require("../../../js/mithril/input-area");
const Result = require("../result");

module.exports = class OneTimePad {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => {
                this.updateFirstIsOne();
            }
        };
        this.firstIsOne = {
            label: 'Uninitialized',
            value: false
        };
        this.pad = {
            label: "The pad",
            value: ""
        };
        this.input = {
            alphabet: this.alphabet,
            label: "Text to encode or decode",
            value: ""
        };
        this.updateFirstIsOne();
    }

    updateFirstIsOne() {
        const letter = this.alphabet.value.toLetter(0);
        this.firstIsOne.label = `The letter ${letter} increments by 1 instead of 0`;
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(KeyedAlphabet, this.alphabet)),
            m("p", m(Checkbox, this.firstIsOne)),
            m("p", m(InputArea, this.pad)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text and see the result here");
        }

        if (this.pad.value.trim() === "") {
            return m(Result, "A pad needs to be used for encryption and decryption");
        }

        return m(CipherResult, {
            name: "oneTimePad",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: keyAlphabet(this.alphabet),
            options: {
                pad: new rumkinCipher.util.Message(this.pad.value),
                firstIsOne: this.firstIsOne.value
            }
        });
    }
};

