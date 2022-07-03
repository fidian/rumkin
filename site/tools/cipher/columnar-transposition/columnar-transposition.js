/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class ColumnarTransposition {
    constructor() {
        this.direction = {};
        this.columnOrder = {
            value: false,
            label: "Use the key as a column order instead of column labels"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.key = {
            label: "Column key",
            value: ""
        };
        this.dupesBackwards = {
            label: "Number duplicate entries backwards instead of forwards",
            value: false
        };
        this.input = {
            alphabet: this.alphabet,
            value: ""
        };
        this.columnKey = null;
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(TextInput, this.key)),
            m("p", m(Checkbox, this.dupesBackwards)),
            m("p", this.viewKey()),
            m("p", m(Checkbox, this.columnOrder)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewKey() {
        this.columnKey = rumkinCipher.util.columnKey(
            this.alphabet.value,
            this.key.value,
            {
                columnOrder: this.columnOrder.value,
                dupesBackwards: this.dupesBackwards.value
            }
        );

        if (this.columnKey.length > 1) {
            return m(
                "p",
                `The resulting columnar key: ${this.columnKey
                    .map((x) => x + 1)
                    .join(" ")}`
            );
        }

        return m("p", "Enter numbers or words to generate a column key");
    }

    viewResult() {
        if (this.columnKey.length < 2) {
            return m(
                Result,
                "You need at least two columns to encode anything"
            );
        }

        if (!this.input.value) {
            return m(Result, "Enter text and see the result here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.columnarTransposition;
        const result = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                columnKey: this.columnKey
            }
        );

        return m(Result, result.toString());
    }
};
