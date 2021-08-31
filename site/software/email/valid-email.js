/* global m, isValidEmail */

"use strict";

module.exports = class ValidEmail {
    constructor() {
        this.email = "test-me@example.com";
        this.check();
    }

    check() {
        this.valid = isValidEmail(this.email);
    }

    results() {
        if (this.valid) {
            return m("span", "This is a valid email address");
        }

        return m("span", "Invalid email format.");
    }

    view() {
        return [
            m("input", {
                type: "text",
                oninput: (e) => {
                    this.email = e.target.value;
                    this.check();
                },
                style: "width: 100%",
                value: this.email
            }),
            this.results()
        ];
    }
};
