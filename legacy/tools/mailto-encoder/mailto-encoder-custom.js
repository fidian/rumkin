/* global m */

const emailEncoder = require("./email-encoder");
const TextInput = require("../../js/mithril/text-input");
const Dropdown = require("../../js/mithril/dropdown");

module.exports = class MailtoEncoderCustom {
    constructor() {
        this.to = {
            label: "To",
            class: "W(100%)",
            value: ""
        };
        this.cc = {
            label: "Cc",
            class: "W(100%)",
            value: ""
        };
        this.bcc = {
            label: "Bcc",
            class: "W(100%)",
            value: ""
        };
        this.subject = {
            label: "Subject",
            class: "W(100%)",
            value: ""
        };
        this.body = {
            label: "Body",
            class: "W(100%)",
            value: ""
        };
        this.linkText = {
            label: "HTML label (only works when creating an HTML link)",
            class: "W(100%)",
            value: "",
            placeholder: "This defaults to the email address"
        };
        this.linkExtra = {
            label: ["Extra link attributes (like ", m("tt", "class"), " or ", m("tt", "id"), "; only works when creating an HTML link)"],
            class: "W(100%)",
            value: "",
            placeholder: "This defaults to the email address"
        };
        this.encoding = {
            label: "Method of encoding",
            options: {
                none: "Skip encoding the link",
                html: "Create a normal HTML link"
            },
            value: "html"
        };
        this.obfuscation = {
            label: "Method of obfuscation",
            options: {
                none: "Skip JavaScript-based obfuscation",
                break: "Break up strings",
                shuffled: "Shuffled encoding"
            },
            value: "shuffled"
        };
    }

    view() {
        return [
            m("p", m(TextInput, this.to)),
            m("p", m(TextInput, this.cc)),
            m("p", m(TextInput, this.bcc)),
            m("p", m(TextInput, this.subject)),
            m("p", m(TextInput, this.body)),
            m("p", m(Dropdown, this.encoding)),
            m("p", m(TextInput, this.linkText)),
            m("p", m(TextInput, this.linkExtra)),
            m("p", m(Dropdown, this.obfuscation)),
            this.viewResult()
        ];
    }

    viewResult() {
        if (!this.to.value) {
            return "Enter a valid email address above and see the generated code here.";
        }

        const encoded = emailEncoder({
            to: this.to.value,
            cc: this.cc.value,
            bcc: this.bcc.value,
            subject: this.subject.value,
            body: this.body.value,
            encoding: this.encoding.value,
            linkText:
                this.linkText.value ||
                this.to.value ||
                this.cc.value ||
                this.bcc.value,
            linkExtra: this.linkExtra.value,
            obfuscation: this.obfuscation.value
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
