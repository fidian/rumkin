/* global m, rumkinCipher */

const EncryptionDirectionSelector = require("../encryption-direction-selector");
const InputArea = require("../../../js/mithril/input-area");
const Result = require("../result");

module.exports = class Base64 {
    constructor() {
        this.encryptionDirection = {
            value: "ENCRYPT"
        };
        this.input = {
            label: "Message to encode or decode",
            value: ""
        };
    }

    view() {
        return [
            m("p", m(EncryptionDirectionSelector, this.encryptionDirection)),
            m("p", m(InputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter your text and see the convered message here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.code.base64;
        const method = this.encryptionDirection.value === "ENCRYPT" ? "encode" : "decode";
        const result = module[method](message).toString();

        return m(Result, result);
    }
};
