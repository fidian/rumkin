/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const Result = require("../result");
const TextInput = require("../../../js/mithril/text-input");

module.exports = class Ubchi {
    constructor() {
        this.direction = {
            value: "ENCRYPT"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English(),
            onchange: () => {
                this.setPadCharacterOptions();
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
            label: "Charcter to use when padding the message",
            value: ""
        };
        this.setPadCharacterOptions();
        cipherConduitSetup(this, "ubchi", () => {
            this.setPadCharacterOptions();
        });
    }

    parseColumnKey() {
        return rumkinCipher.util.columnKey(
            this.alphabet.value,
            this.columnKey.value,
            {
                columnOrder: this.columnOrder.value,
                dupesBackwards: this.dupesBackwards.value
            }
        );
    }

    setPadCharacterOptions() {
        this.padCharacter.options = {};
        let found = false;

        for (const letter of this.alphabet.value.letterOrder.upper.split("")) {
            this.padCharacter.options[letter] = letter;

            if (this.padCharacter.value === letter) {
                found = true;
            }
        }

        if (!found) {
            this.padCharacter.value =
                this.alphabet.value.letterOrder.upper.substr(-1, 1);
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
        const columnKeyParsed = this.parseColumnKey();

        if (columnKeyParsed.length > 1) {
            return m(
                "p",
                `The resulting columnar key: ${columnKeyParsed
                    .map((x) => x + 1)
                    .join(" ")}`
            );
        }

        return m("p", "Enter numbers or words to generate a column key");
    }

    viewResult() {
        const columnKeyParsed = this.parseColumnKey();

        if (columnKeyParsed.length < 2) {
            return m(
                Result,
                "You need at least two columns in order to encode anything"
            );
        }

        if (!this.input.value) {
            return m(Result, "Enter text and see the result here");
        }

        const columnOptions = {
            columnKey: columnKeyParsed
        };
        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.columnarTransposition;
        const isEncrypt = this.direction.value === "ENCRYPT";

        if (isEncrypt) {
            const intermediate = module.encipher(
                message,
                this.alphabet.value,
                columnOptions
            );
            intermediate.append(
                new rumkinCipher.util.MessageChunk(this.padCharacter.value, [
                    -1
                ])
            );
            const result = module.encipher(
                intermediate,
                this.alphabet.value,
                columnOptions
            );

            return m(Result, result.toString());
        }

        const intermediate = module.decipher(
            message,
            this.alphabet.value,
            columnOptions
        );
        const withoutLastLetter = intermediate.filter(
            (chunk, index) => index < intermediate.length - 1
        );
        const result = module.decipher(
            withoutLastLetter,
            this.alphabet.value,
            columnOptions
        );

        return m(Result, result.toString());
    }
};
