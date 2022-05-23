/* global m, window */

"use strict";

module.exports = class Md5Hash {
    constructor() {
        this.md5 = window.md5("");
    }

    view() {
        return [
            m("textarea", {
                style: "width: 100%",
                oninput: (e) => {
                    this.md5 = window.md5(e.target.value);
                }
            }),
            m(
                "div",
                {
                    class: "output"
                },
                `MD5: ${this.md5}`
            )
        ];
    }
};
