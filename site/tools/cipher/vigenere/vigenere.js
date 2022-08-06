/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Vigenere {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.key = {
            label: "Key",
            value: ""
        };
        this.autokey = {
            label: "Use \"autokey\" variant to extend the key with plaintext",
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
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(TextInput, this.key)),
            m("p", m(Checkbox, this.autokey)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (this.key.value.length < 1) {
            return m(Result, "You must specify a key");
        }

        if (this.input.value.length < 1) {
            return m(Result, "Enter words to see it encoded or decoded here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.vigenere;
        const result = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                key: this.key.value,
                autokey: this.autokey.value
            }
        );

        return m(Result, result.toString());
    }
};
