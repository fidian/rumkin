/* global m */

const emailEncoder = require("./email-encoder");

module.exports = class MailtoEncoderSimple {
    constructor() {
        this.email = "";
        this.linkText = "";
        this.encoded = "";
    }

    update() {
        if (!this.email) {
            this.encoded = "";
        }

        this.encoded = emailEncoder({
            to: this.email,
            encoding: "html",
            linkText: this.linkText || this.email,
            obfuscation: "shuffled"
        });
    }

    view() {
        return [
            m("p", "Email address:"),
            m("input", {
                type: "text",
                style: "width: 100%",
                placeholder: "user@example.com",
                value: this.email,
                onkeyup: (e) => {
                    this.email = e.target.value;
                    this.update();
                },
                oninput: (e) => {
                    this.email = e.target.value;
                    this.update();
                }
            }),
            m("p", "Do not worry. I do not harvest email addresses from here."),
            m("p", "Link text:"),
            m("input", {
                type: "text",
                style: "width: 100%",
                placeholder: "Defaults to email address",
                value: this.linkText,
                onkeyup: (e) => {
                    this.linkText = e.target.value;
                    this.update();
                },
                oninput: (e) => {
                    this.linkText = e.target.value;
                    this.update();
                }
            }),
            this.viewResult()
        ];
    }

    viewResult() {
        if (this.email) {
            return [
                m("p", "Result:"),
                m("pre", this.encoded),
                m(
                    "p",
                    "To use this, copy and paste the above into your HTML web page. When viewed in a browser, it will show a link to send you an email."
                )
            ];
        }

        return "Enter a valid email address above and see the generated code here.";
    }
};
