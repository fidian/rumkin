/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetKey = require("../alphabet-key");
const AlphabetSelector = require("../alphabet-selector");
const DirectionSelector = require("../direction-selector");
const Dropdown = require('../../../js/mithril/dropdown');
const keyAlphabet = require("../key-alphabet");
const Result = require("../result");

module.exports = class Caesar {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => {
                this.updateN();
            }
        };
        this.alphabetKey = {
            options: {},
            value: ""
        };
        this.n = {
            label: 'N',
            value: '3'
        };
        this.updateN();
        this.input = {
            alphabet: this.alphabet,
            value: ''
        };
    }

    updateN() {
        this.n.options = {};

        for (let n = 0; n < this.alphabet.value.length; n += 1) {
            this.n.options[n] = n.toString();
        }

        this.n.value = Math.min(3, this.alphabet.value.length);
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m('p', m(AlphabetSelector, this.alphabet)),
            m("p", m(AlphabetKey, this.alphabetKey)),
            m('p', m(Dropdown, this.n)),
            this.viewAlphabet(),
            m('p', m(AdvancedInputArea, this.input)),
            this.viewResult()
        ];
    }

    viewAlphabet() {
        const alphabet = keyAlphabet(this.alphabet.value, this.alphabetKey);
        const input = this.alphabet.value.letterOrder.upper;
        const keyed = alphabet.letterOrder.upper;
        const encoded = keyed.substr(+this.n.value) + keyed.substr(0, +this.n.value);

        return m('div', {
            class: 'D(f) Jc(c)'
        }, m('pre', `Letters: ${input}
  Keyed: ${keyed}
Encoded: ${encoded}`));
    }

    viewResult() {
        if (this.input.value.trim() === '') {
            return m(Result, "Enter text to see it encoded here");
        }

        const alphabet = keyAlphabet(this.alphabet.value, this.alphabetKey);
        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.caesar;
        const result = module[this.direction.cipher](message, alphabet, {
            shift: +this.n.value
        });

        return m(Result, result.toString());
    }
};
