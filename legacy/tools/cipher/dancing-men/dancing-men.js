/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const cipherConduitSetup = require("../cipher-conduit-setup");
const Dropdown = require("../../../js/mithril/dropdown");
const Result = require("../result");

module.exports = class DancingMen {
    constructor() {
        this.input = {
            label: "The text to encode",
            value: ""
        };
        this.options = {
            label: "Which Dancing Men set to use",
            value: "dancing-men-gl",
            options: {
                "dancing-men-gl": "Gutenberg Labo",
                "dancing-men-ars": "Aage Rieck Sørensen"
            }
        };
        cipherConduitSetup(this, "dancingMen");
    }

    view() {
        return [
            m("p", m(Dropdown, this.options)),
            m("p", this.viewButtons()),
            m("p", m(AdvancedInputArea, this.input)),
            m("p", this.viewResult())
        ];
    }

    viewButtons() {
        return [
            m(
                "p",
                "Use these buttons to insert the corresponding letter in the input area below."
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm"
                },
                this.viewButtonList("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm"
                },
                this.viewButtonList("0123456789 ")
            )
        ];
    }

    viewButtonList(chars) {
        return chars.split("").map((c) => this.viewButtonForChar(c));
    }

    viewButtonForChar(c) {
        return m(
            "button",
            {
                onclick: () => {
                    this.input.value += c;
                }
            },
            this.viewSpanForChar(c)
        );
    }

    viewSpanForChar(c) {
        if (c === " ") {
            return m("span", ["Add", m("br"), "Flag"]);
        }

        return m("span", { class: this.options.value }, c.toLowerCase());
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded here");
        }

        const message = this.input.value
            .replace(/[A-Z]{1,}/g, (m) => m.toLowerCase())
            .replace(/[a-z] /g, (m) => m.charAt(0).toUpperCase());

        return m(
            Result,
            m(
                "span",
                {
                    class: this.options.value
                },
                message
            )
        );
    }
};
