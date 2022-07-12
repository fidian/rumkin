/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const DirectionSelector = require("../direction-selector");
const Dropdown = require('../../../js/mithril/dropdown');
const KeyedAlphabet = require("../keyed-alphabet");
const Result = require("../result");

module.exports = class Caesar {
    constructor() {
        this.direction = {};
        this.alphabet = {
            alphabet: new rumkinCipher.alphabet.English(),
            value: new rumkinCipher.alphabet.English(),
            onchange: () => {
                this.updateN();
            }
        };
        this.n = {
            label: 'N',
            value: '3'
        };
        this.input = {
            alphabet: this.alphabet,
            value: ''
        };
        this.updateN();
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
            m('p', m(KeyedAlphabet, this.alphabet)),
            m('p', m(Dropdown, this.n)),
            this.viewAlphabet(),
            m('p', m(AdvancedInputArea, this.input)),
            this.viewResult()
        ];
    }

    viewAlphabet() {
        const input = this.alphabet.alphabet.letterOrder.upper;
        const keyed = this.alphabet.value.letterOrder.upper;
        const encoded = keyed.substr(+this.n.value) + keyed.substr(0, +this.n.value);

        return m('div', {
            class: 'D(f) Jc(c)'
        }, m('pre', `Letters: ${input}
  Keyed: ${keyed}
Encoded: ${encoded}`));
    }

    viewResult() {
        if (this.input.value.trim() === '') {
            return m(Result, "Enter text to see the result here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.caesar;
        const result = module[this.direction.cipher](message, this.alphabet.value, {
            shift: +this.n.value
        });

        return m(Result, result.toString());
    }
};
