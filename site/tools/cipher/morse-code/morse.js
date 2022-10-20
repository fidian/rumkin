/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");

module.exports = class Morse {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.Generic()
        };
        this.direction = {};
        this.input = {
            label: "The text to encode or decode",
            value: ""
        };
        cipherConduitSetup(this, "morse");
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewAdditionalActions()),
            m("p", this.viewResult())
        ];
    }

    viewAdditionalActions() {
        return m("a", {
                href: "#",
                onclick: () => {}
            }, "Swap dits and dahs");
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "morse",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: this.alphabet.value
        });
    }
};
