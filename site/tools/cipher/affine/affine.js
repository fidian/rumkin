/* global m */

const AlphabetSelector = require("../alphabet-selector");
const EncryptionDirectionSelector = require("../encryption-direction-selector");
const ErrorMessage = require("../error-message");
const InputArea = require("../input-area");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");
const rumkinCipher = require("@fidian/rumkin-cipher");

module.exports = class Affine {
    constructor() {
        this.alphabet = {
            value: "English",
            onchange: () => {
                this.updateAlphabet();
            }
        };
        this.a = {
            label: ["Multiplier (", m("tt", "a"), ")"],
            value: 1,
            class: "W(4em)"
        };
        this.b = {
            label: ["Shift (", m("tt", "b"), ")"],
            value: 1,
            class: "W(4em)"
        };
        this.encryptDecrypt = {
            value: "ENCRYPT"
        };
        this.input = {
            value: ""
        };
        this.updateAlphabet();
    }

    updateAlphabet() {
        const C = rumkinCipher.alphabet[this.alphabet.value];
        this.alphabetObject = new C();
    }

    modifyA(direction) {
        let a = this.a.value;

        a += direction;

        while (
            a >= 1 &&
            !rumkinCipher.util.coprime(a, this.alphabetObject.length)
        ) {
            a += direction;
        }

        if (a < 1) {
            a = 1;
        }

        this.a.value = a;
    }

    view() {
        return [
            m("p", m(EncryptionDirectionSelector, this.encryptDecrypt)),
            m("p", this.viewAlphabet()),
            m("p", this.viewA()),
            m("p", this.viewB()),
            m("p", m(InputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewA() {
        return [
            m(NumericInput, this.a),
            " ",
            m(
                "button",
                {
                    class: "W(3em)",
                    onclick: () => {
                        this.modifyA(1);
                    }
                },
                "+"
            ),
            " ",
            m(
                "button",
                {
                    class: "W(3em)",
                    onclick: () => {
                        this.modifyA(-1);
                    }
                },
                "-"
            ),
            m("br"),
            "This must be at least 1 and coprime to the length of the alphabet. Using the plus and minus buttons will jump to the next valid value."
        ];
    }

    viewAlphabet() {
        const upperAndLower = this.alphabetObject.letterOrder.upper && this.alphabetObject.letterOrder.lower;
        const upperAndLowerText = upperAndLower ? ' and lowercase' : '';

        return [
            m(AlphabetSelector, this.alphabet),
            ` (m = ${this.alphabetObject.length})`,
            m("br"),
            `Letters: ${this.alphabetObject.letterOrder.upper}`,
            upperAndLowerText,
            this.viewAlphabetTranslations()
        ];
    }

    viewAlphabetTranslations() {
        const keys = Object.keys(this.alphabetObject.translations);

        if (keys.length === 0) {
            return null;
        }

        return [' (also these are translated: ', keys.join(''), ')'];
    }

    viewB() {
        return [
            m(NumericInput, this.b),
            m("br"),
            "This is the amount of characters to shift."
        ];
    }

    viewResult() {
        const a = this.a.value;
        const b = this.b.value || 0;

        if (a < 1) {
            return m(
                ErrorMessage,
                ["The value of ", m("tt", "a"), " must be greater than zero."]
            );
        }

        if (Math.floor(a) !== a) {
            return m(
                ErrorMessage,
                ["The value of ", m("tt", "b"), " must be an integer."]
            );
        }

        if (
            !rumkinCipher.util.coprime(
                this.a.value,
                this.alphabetObject.length
            )
        ) {
            return m(ErrorMessage, [
                "The value of ",
                m("tt", "a"),
                " must be coprime to the alphabet length."
            ]);
        }

        if (Math.floor(b) !== b) {
            return m(ErrorMessage, ["The value of ", m("tt", b), " must be an integer."]);
        }

        if (this.input.value.trim() === '') {
            return m(Result, "Enter text to see it encoded here");
        }

        return this.viewEncodeDecode();
    }

    viewEncodeDecode() {
        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.cipher.affine;
        const options = {
            multiplier: this.a.value,
            shift: this.b.value
        };
        const method = this.encryptDecrypt.value === 'ENCRYPT' ? 'encipher' : 'decipher';
        const result = module[method](message, this.alphabetObject, options);

        return m(Result, result.toString());
    }
};
