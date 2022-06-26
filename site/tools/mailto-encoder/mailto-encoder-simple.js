/* global m */

const emailEncoder = require("./email-encoder");
const TextInput = require("../../js/mithril/text-input");

module.exports = class MailtoEncoderSimple {
    constructor() {
        this.email = {
            label: "Email address",
            placeholder: "user@example.com",
            class: "W(100%)",
            value: ""
        };
        this.linkText = {
            label: "Link text",
            class: "W(100%)",
            placeholder: "Defaults to email address",
            value: ""
        };
    }

    view() {
        return [
            m("p", m(TextInput, this.email)),
            m("p", "Do not worry. I do not harvest email addresses from here."),
            m("p", m(TextInput, this.linkText)),
            this.viewResult()
        ];
    }

    viewResult() {
        if (!this.email.value) {
            return "Enter a valid email address above and see the generated code here.";
        }

        const encoded = emailEncoder({
            to: this.email,
            encoding: "html",
            linkText: this.linkText.value || this.email.value,
            obfuscation: "shuffled"
        });

        return [
            m("p", "Result:"),
            m("pre", encoded),
            m(
                "p",
                "To use this, copy and paste the above into your HTML web page. When viewed in a browser, it will show a link to send you an email."
            )
        ];
    }
};
