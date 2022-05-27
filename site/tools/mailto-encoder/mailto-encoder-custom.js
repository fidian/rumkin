/* global m */

const emailEncoder = require("./email-encoder");

module.exports = class MailtoEncoderCustom {
    constructor() {
        this.to = "";
        this.cc = "";
        this.bcc = "";
        this.subject = "";
        this.body = "";
        this.encoding = "html";
        this.linkText = "";
        this.obfuscation = "shuffled";
    }

    update() {
        if (!this.to) {
            this.encoded = "";
        }

        this.encoded = emailEncoder({
            to: this.to,
            cc: this.cc,
            bcc: this.bcc,
            subject: this.subject,
            body: this.body,
            encoding: this.encoding,
            linkText: this.linkText,
            obfuscation: this.obfuscation
        });
    }

    view() {
        return [
            this.viewField("To:", "to"),
            this.viewField("Cc:", "cc"),
            this.viewField("Bcc:", "bcc"),
            this.viewField("Subject:", "subject"),
            this.viewField("Body:", "body"),
            this.viewRadioList("encoding", {
                none: "Skip encoding the link.",
                html: "Create a normal HTML link."
            }),
            this.viewField(
                "HTML Label: (Only works when creating an HTML link)",
                "linkText"
            ),
            this.viewRadioList("obfuscation", {
                none: "Skip JavaScript-based obfuscation.",
                break: "Break up strings.",
                shuffled: "Shuffled encoding."
            }),
            this.viewResult()
        ];
    }

    viewField(label, property) {
        const update = (e) => {
            this[property] = e.target.value;
            this.update();
        };

        return [
            m("p", label),
            m("input", {
                type: "text",
                style: "width: 100%",
                value: this[property],
                onkeyup: update,
                oninput: update
            })
        ];
    }

    viewRadioList(property, options) {
        return m(
            "p",
            Object.entries(options).map((e) =>
                this.viewRadioItem(property, e[0], e[1])
            )
        );
    }

    viewRadioItem(property, val, label) {
        return m(
            "div",
            m("label", [
                m("input", {
                    checked: this[property] === val,
                    type: "radio",
                    name: property,
                    value: val,
                    onchange: () => {
                        this[property] = val;
                        this.update();
                    }
                }),
                label
            ])
        );
    }

    viewResult() {
        if (this.encoded) {
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
