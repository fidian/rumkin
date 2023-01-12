/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Dropdown = require("../../../js/mithril/dropdown");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");
const TranspositionOperatingMode = require("../transposition-operating-mode");

module.exports = class RailFence {
    constructor() {
        this.direction = {};
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.rails = {
            label: "Number of rails",
            value: 5,
            onchange: () => this.updateOffset()
        };
        this.offset = {
            label: "Offset",
            value: "0"
        };
        this.input = {
            value: ""
        };
        this.updateOffset();
        this.transpositionOperatingMode = {
            value: "NORMAL"
        };
        cipherConduitSetup(this, "railFence", () => {
            this.updateOffset();
        });
    }

    updateOffset() {
        const options = {};
        const max = (this.rails.value - 1) * 2;

        for (let i = 0; i < max; i += 1) {
            options[i] = i.toString();
        }

        if (+this.offset.value >= max) {
            this.offset.value = (max - 1).toString();
        }

        this.offset.options = options;
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(NumericInput, this.rails)),
            m("p", m(Dropdown, this.offset)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m(
                "p",
                m(TranspositionOperatingMode, this.transpositionOperatingMode)
            ),
            m("p", m(AdvancedInputArea, this.input)),
            this.viewResult()
        ];
    }

    viewResult() {
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text to see the result here");
        }

        return m(CipherResult, {
            name: "railFence",
            direction: this.direction.value,
            message: this.input.value,
            alphabet:
                this.transpositionOperatingMode.value === "ALL_CHARS"
                    ? null
                    : this.alphabet.value,
            options: {
                keepCapitalization:
                    this.transpositionOperatingMode.value === "MOVE_CAPS",
                offset: +this.offset.value,
                rails: +this.rails.value
            }
        });
    }
};
