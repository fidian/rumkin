/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");

module.exports = class Base64 {
    constructor() {
        this.direction = {};
        this.input = {
            label: "Message to encode or decode",
            value: ""
        };
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
            return m(Result, "Enter your text and see the convered message here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.code.base64;
        const result = module[this.direction.code](message).toString();

        return m(Result, result);
    }
};
