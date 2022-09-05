/* global m */

const Checkbox = require("../../js/mithril/checkbox");
const InputArea = require("../../js/mithril/input-area");
const encoder = require("./encoder");

module.exports = class MailtoEncoderCustom {
    constructor() {
        this.input = {
            value: ""
        };
        this.scriptTags = {
            label: ["Surround JavaScript in ", m("tt", "script"), " tags"],
            value: true
        };
    }

    view() {
        return [
            m("p", m(InputArea, this.input)),
            m("p", m(Checkbox, this.scriptTags)),
            this.viewResult()
        ];
    }

    viewResult() {
        if (!this.input.value) {
            return "Enter some HTML and you'll see generated JavaScript code.";
        }

        let encoded = encoder(this.input.value);
        let help = 'To use this, copy and paste this into a JavaScript file and ensure it is loaded at the appropriate time, or else wrap it in script tags and embed it into HTML.';

        if (this.scriptTags.value) {
            encoded = `<script>${encoded}</script>`;
            help = 'To use this, copy and paste the above into your HTML web page. When viewed in a browser, the code will show the original HTML.';
        }

        return [
            m("p", "Result:"),
            m("pre", encoded),
            m("p", help)
        ];
    }
};
