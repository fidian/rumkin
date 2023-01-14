/* global m */

const AdvancedInputArea = require("../advanced-input-area");
const Result = require("../result");

module.exports = class Wingdings {
    constructor() {
        this.input = {
            label: "The text to encode",
            value: ""
        };
    }

    view() {
        return [
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
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm Py(0.25em)"
                },
                ["Uppercase: ",
                this.viewButtonList("ABCDEFGHIJKLMNOPQRSTUVWXYZ")]
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm Py(0.25em)"
                },
                ["Lowercase: ",
                this.viewButtonList("abcdefghijklmnopqrstuvwxyz")]
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm Py(0.25em)"
                },
                ["Numbers: ",
                this.viewButtonList("0123456789")]
            ),
            m(
                "div",
                {
                    class: "D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm Py(0.25em)"
                },
                ["Other: ",
                this.viewButtonList("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ¡¢£¥§¨©ª«¬®¯°±´µ¶·¸º»¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜßàáâãäåæçèéêëìíîïñòóôõö÷øùúûüÿıŒœŸƒˆˇ˘˙˚˛˜˝ΔΩπ–—‘’‚“”„†‡•…‰‹›⁄€™∂")]

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
                    class: "wingdings"
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
                    class: "wingdings"
                },
                this.input.value
            )
        );
    }
};
