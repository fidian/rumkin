/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const Checkbox = require("../../../js/mithril/checkbox");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");

module.exports = class Rotate {
    constructor() {
        this.direction = {
            value: "ENCRYPT"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.offset = {
            value: 1,
            label: "Number of letters to bypass before starting"
        };
        this.skip = {
            value: 1,
            label: "Number of letters to skip"
        };
        this.input = {
            value: ""
        };
        this.moveAllCharacters = {
            label: "Encode whitespace, symbols, and everything",
            value: false
        };
        cipherConduitSetup(this, "skip");
    }

    isSkipValid(skip, messageLength) {
        return rumkinCipher.util.coprime(messageLength, skip + 1);
    }

    changeSkipButton(label, direction, messageLength) {
        let next = this.skip.value + direction;

        while (
            next > 0 &&
            next < messageLength &&
            !this.isSkipValid(next, messageLength)
        ) {
            next += direction;
        }

        return m(
            "button",
            {
                disabled: next <= 0 || next >= messageLength,
                onclick: () => {
                    this.skip.value = next;
                }
            },
            label
        );
    }

    view() {
        let messageLength = this.input.value.length;

        if (!this.moveAllCharacters) {
            messageLength = new rumkinCipher.util.Message(
                this.input.value
            ).separate(this.alphabet.value).length;
        }

        if (this.skip.value < 0) {
            this.skip.value = 0;
        }

        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(Checkbox, this.moveAllCharacters)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", [
                m(NumericInput, this.skip),
                this.changeSkipButton("+", 1, messageLength),
                this.changeSkipButton("-", -1, messageLength)
            ]),
            m("p", m(NumericInput, this.offset)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult(messageLength))
        ];
    }

    viewResult(messageLength) {
        if (!this.isSkipValid(this.skip.value, messageLength)) {
            return m(
                Result,
                "The number of letters to skip is incompatible with the length of the message."
            );
        }

        return m(CipherResult, {
            name: "skip",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: this.moveAllCharacters.value
                ? new rumkinCipher.alphabet.Generic()
                : this.alphabet.value,
            options: {
                offset: this.offset.value,
                skip: this.skip.value
            }
        });
    }
};
