/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const Result = require("../result");

module.exports = class SpiritDvd {
    constructor() {
        this.direction = {};
        this.input = {
            label: "The text to encode or decode",
            value: ""
        };
        cipherConduitSetup(this, "binary");
    }

    view() {
        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewAdditionalActions()),
            m("p", this.viewResult())
        ];
    }

    viewAdditionalActions() {
        return m("a", {
                href: "#",
                onclick: () => {
                    const noOnes = this.input.value.split('1');

                    for (let i = 0; i < noOnes.length; i += 1) {
                        noOnes[i] = noOnes[i].split('0').join('1');
                    }

                    this.input.value = noOnes.join('0');
                }
            }, "Swap zeros and ones");
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "binary",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: null
        });
    }
};
