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
        cipherConduitSetup(this, "spiritDvd");
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
                    const noBars = this.input.value.split('|');

                    for (let i = 0; i < noBars.length; i += 1) {
                        noBars[i] = noBars[i].split('-').join('|');
                    }

                    this.input.value = noBars.join('-');
                }
            }, "Swap dots and bars");
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded or decoded here");
        }

        return m(CipherResult, {
            name: "spiritDvd",
            direction: this.direction.value,
            message: this.input.value,
            alphabet: null
        });
    }
};
