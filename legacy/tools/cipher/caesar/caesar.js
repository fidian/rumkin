/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const keyAlphabet = require("../key-alphabet");
const KeyedAlphabet = require("../keyed-alphabet");
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
        this.n = {
            label: "N",
            value: "3"
        };
        this.input = {
            value: ""
        };
        this.updateN();
        cipherConduitSetup(this, "caesar");
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
            m("p", m(KeyedAlphabet, this.alphabet)),
            m("p", m(Dropdown, this.n)),
            this.viewAlphabet(),
            m("p", m(AdvancedInputArea, this.input)),
            this.viewResult()
        ];
    }

    viewAlphabet() {
        const input = this.alphabet.value.letterOrder.upper;
        const keyed = keyAlphabet(this.alphabet).letterOrder.upper;
        const encoded =
            keyed.substr(+this.n.value) + keyed.substr(0, +this.n.value);

        return m(
            "div",
            {
                class: "D(f) Jc(c)"
            },
            m(
                "pre",
                `Letters: ${input}
  Keyed: ${keyed}
Encoded: ${encoded}`
            )
        );
    }

    viewResult() {
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text to see the result here");
        }

        return m(CipherResult, {
            name: "caesar",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: keyAlphabet(this.alphabet),
            options: {
                shift: +this.n.value
            }
        });
    }
};
