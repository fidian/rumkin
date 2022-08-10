/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const Result = require("../result");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Ubchi {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => {
                this.setPadCharacter();
            }
        };
        this.columnOrder = {
            value: false,
            label: "Use the key as a column order instead of column labels"
        };
        this.dupesBackwards = {
            label: "Number duplicate entries backwards instead of forwards",
            value: false
        };
        this.columnKey = {
            label: "Columnar key",
            value: ""
        };
        this.input = {
            alphabet: this.alphabet,
            value: ""
        };
        this.padCharacter = {
            label: "Charcter to use when padding the message"
        };
        this.columnKeyParsed = null;
        this.setPadCharacter();
    }

    setPadCharacter() {
        this.padCharacter.options = {};

        for (const letter of this.alphabet.value.letterOrder.upper.split("")) {
            this.padCharacter.options[letter] = letter;
            this.padCharacter.value = letter;
        }
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", m(TextInput, this.columnKey)),
            m("p", m(Checkbox, this.dupesBackwards)),
            m("p", m(Checkbox, this.columnOrder)),
            m("p", this.viewKey()),
            m("p", m(Dropdown, this.padCharacter)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewKey() {
        this.columnKeyParsed = rumkinCipher.util.columnKey(
            this.alphabet.value,
            this.columnKey.value,
            {
                columnOrder: this.columnOrder.value,
                dupesBackwards: this.dupesBackwards.value
            }
        );

        if (this.columnKeyParsed.length > 1) {
            return m(
                "p",
                `The resulting columnar key: ${this.columnKeyParsed
                    .map((x) => x + 1)
                    .join(" ")}`
            );
        }

        return m("p", "Enter numbers or words to generate a column key");
    }

    viewResult() {
        if (this.columnKeyParsed.length < 2) {
            return m(
                Result,
                "You need at least two columns in order to encode anything"
            );
        }

        if (!this.input.value) {
            return m(Result, "Enter text and see the result here");
        }

        const columnOptions = {
            columnKey: this.columnKeyParsed
        };
        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.columnarTransposition;

        if (this.direction.value === 'ENCRYPT') {
            const intermediate = module[this.direction.cipher](
                message,
                this.alphabet.value,
                columnOptions
            );
            intermediate.append(new rumkinCipher.util.MessageChunk(this.padCharacter.value, [-1]));
            const result = module[this.direction.cipher](
                intermediate,
                this.alphabet.value,
                columnOptions
            );

            return m(Result, result.toString());
        }

        const intermediate = module[this.direction.cipher](
            message,
            this.alphabet.value,
            columnOptions
        );
        const withoutLastLetter = intermediate.filter((chunk, index) => index < intermediate.length - 1);
        const result = module[this.direction.cipher](
            withoutLastLetter,
            this.alphabet.value,
            columnOptions
        );

        return m(Result, result.toString());
    }
};
