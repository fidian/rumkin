/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Dropdown = require("../../../js/mithril/dropdown");
const Result = require("../result");

module.exports = class LegoBionicle {
    constructor() {
        this.language = {
            label: "Which language to use",
            value: "metrumatoran",
            options: {
                metrumatoran: "Metru Nui and Mata Nui",
                voyamatoran: "Voya Nui and Mahri Nui",
                okoto: "Okoto"
            }
        };
        this.input = {
            label: "The text to encode",
            value: ""
        };
    }

    view() {
        return [
            m("p", m(Dropdown, this.language)),
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
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--m"
                },
                this.viewButtonList("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--m"
                },
                this.viewButtonList("0123456789")
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
            m(
                "span",
                {
                    class: this.language.value
                },
                c
            )
        );
    }

    viewResult() {
        if (!this.input.value) {
            return m(Result, "Enter text to see it encoded here");
        }

        return m(
            Result,
            m(
                "span",
                {
                    class: this.language.value
                },
                this.input.value
            )
        );
    }
};
