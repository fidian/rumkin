/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");

module.exports = class GoldBug {
    constructor() {
        this.direction = {};
        this.input = {
            label: "The text to encode or decode",
            value: ""
        };
        cipherConduitSetup(this, "goldBug");
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "goldBug",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: null
        });
    }
};
