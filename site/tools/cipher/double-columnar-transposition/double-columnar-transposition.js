/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class DoubleColumnarTransposition {
    constructor() {
        this.direction = {};
        this.columnOrder = {
            value: false,
            label: "Use the key as a column order instead of column labels"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.firstKey = {
            label: "First column key",
            value: ""
        };
        this.secondKey = {
            label: "Second column key",
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
        this.firstColumnKey = null;
        this.secondColumnKey = null;
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(TextInput, this.firstKey)),
            m("p", this.viewKey(this.firstKey.value, "firstColumnKey")),
            m("p", m(TextInput, this.secondKey)),
            m("p", this.viewKey(this.secondKey.value, "secondColumnKey")),
            m("p", m(Checkbox, this.dupesBackwards)),
            m("p", m(Checkbox, this.columnOrder)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewKey(key, columnKeyProperty) {
        this[columnKeyProperty] = rumkinCipher.util.columnKey(
            this.alphabet.value,
            key,
            {
                columnOrder: this.columnOrder.value,
                dupesBackwards: this.dupesBackwards.value
            }
        );

        if (this[columnKeyProperty].length > 1) {
            return m(
                "p",
                `The resulting columnar key: ${this[columnKeyProperty]
                    .map((x) => x + 1)
                    .join(" ")}`
            );
        }

        return m("p", "Enter numbers or words to generate a column key");
    }

    viewResult() {
        if (this.firstColumnKey.length < 2 || this.secondColumnKey.length < 2) {
            return m(
                Result,
                "You need at least two columns for each column key in order to encode anything"
            );
        }

        if (!this.input.value) {
            return m(Result, "Enter text and see the result here");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.columnarTransposition;
        const intermediate = module[this.direction.cipher](
            message,
            this.alphabet.value,
            {
                columnKey: this.direction.obfuscate
                    ? this.firstColumnKey
                    : this.secondColumnKey
            }
        );
        const result = module[this.direction.cipher](
            intermediate,
            this.alphabet.value,
            {
                columnKey: this.direction.obfuscate
                    ? this.secondColumnKey
                    : this.firstColumnKey
            }
        );

        return m(Result, result.toString());
    }
};
