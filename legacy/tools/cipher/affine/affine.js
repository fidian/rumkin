/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const ErrorMessage = require("../error-message");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");

module.exports = class Affine {
    constructor() {
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
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
        this.direction = {};
        this.input = {
            value: ""
        };
        cipherConduitSetup(this, "affine");
    }

    modifyA(direction) {
        let a = this.a.value;

        a += direction;

        while (
            a >= 1 &&
            !rumkinCipher.util.coprime(a, this.alphabet.value.length)
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
            m("p", m(DirectionSelector, this.direction)),
            m("p", this.viewAlphabet()),
            m("p", this.viewA()),
            m("p", this.viewB()),
            m("p", m(AdvancedInputArea, this.input)),
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
        const upperAndLower =
            this.alphabet.value.letterOrder.upper &&
            this.alphabet.value.letterOrder.lower;
        const upperAndLowerText = upperAndLower ? " and lowercase" : "";

        return [
            m(AlphabetSelector, this.alphabet),
            ` (m = ${this.alphabet.value.length})`,
            m("br"),
            `Letters: ${this.alphabet.value.letterOrder.upper}`,
            upperAndLowerText,
            this.viewAlphabetTranslations()
        ];
    }

    viewAlphabetTranslations() {
        const keys = Object.keys(this.alphabet.value.translations);

        if (keys.length === 0) {
            return null;
        }

        return [" (also these are translated: ", keys.join(""), ")"];
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
            return m(ErrorMessage, [
                "The value of ",
                m("tt", "a"),
                " must be greater than zero."
            ]);
        }

        if (Math.floor(a) !== a) {
            return m(ErrorMessage, [
                "The value of ",
                m("tt", "b"),
                " must be an integer."
            ]);
        }

        if (
            !rumkinCipher.util.coprime(this.a.value, this.alphabet.value.length)
        ) {
            return m(ErrorMessage, [
                "The value of ",
                m("tt", "a"),
                " must be coprime to the alphabet length."
            ]);
        }

        if (Math.floor(b) !== b) {
            return m(ErrorMessage, [
                "The value of ",
                m("tt", b),
                " must be an integer."
            ]);
        }

        if (this.input.value.trim() === "") {
            return m(Result, "Enter text to see it encoded here");
        }

        return m(CipherResult, {
            name: "affine",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: this.alphabet.value,
            options: {
                multiplier: this.a.value,
                shift: this.b.value
            }
        });
    }
};
