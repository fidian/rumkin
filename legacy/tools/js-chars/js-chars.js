/* global m */

"use strict";

module.exports = class JsChars {
    constructor() {
        this.values = this.jsChars();
    }

    jsChars(text) {
        if (!text) {
            return ["Enter text and see the character codes here."];
        }

        return text
            .split("")
            .map((c) => ("0000" + c.charCodeAt(0).toString(16)).substr(-4));
    }

    view() {
        return [
            m("textarea", {
                class: "W(100%)",
                oninput: (e) => {
                    this.values = this.jsChars(e.target.value);
                }
            }),
            m(
                "p",
                "This is the character codes for whatever is in the text box."
            ),
            m(
                "div",
                {
                    class: "output"
                },
                this.values.join(" ")
            )
        ];
    }
};
