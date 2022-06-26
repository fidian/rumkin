/* global m, md5 */

"use strict";

module.exports = class Md5Hash {
    constructor() {
        this.md5 = md5("");
    }

    view() {
        return [
            m("textarea", {
                class: "W(100%)",
                oninput: (e) => {
                    this.md5 = md5(e.target.value);
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
