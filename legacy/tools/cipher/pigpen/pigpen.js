/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Dropdown = require("../../../js/mithril/dropdown");
const Result = require("../result");

module.exports = class Pigpen {
    constructor() {
        this.options = {
            label: "Pigpen variant",
            value: "pigpen-hhxx",
            options: {
                "pigpen-hhxx": "Original Version",
                "pigpen-hxhx": "Modified Version",
            }
        };
        this.input = {
            label: "The text to encode",
            value: ""
        };
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
                    class: this.options.value
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
                    class: this.options.value
                },
                this.input.value
            )
        );
    }
};
