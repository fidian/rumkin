/* global m */

"use strict";

module.exports = class HtmlTest {
    constructor() {
        this.html = "";
    }

    view() {
        return [
            m("textarea", {
                class: "W(100%)",
                oninput: (e) => {
                    this.html = e.target.value;
                }
            }),
            m(
                "div",
                {
                    class: "output"
                },
                m.trust(this.html)
            )
        ];
    }
};
