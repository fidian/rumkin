/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");

module.exports = class Base64 {
    constructor() {
        this.direction = {
            code: true
        };
        this.input = {
            label: "Message to encode or decode",
            value: ""
        };
        cipherConduitSetup(this, "base64");
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
            return m(
                Result,
                "Enter your text and see the convered message here"
            );
        }

        return m(CipherResult, {
            name: "base64",
            direction: this.direction.value,
            message: this.input.value
        });
    }
};
