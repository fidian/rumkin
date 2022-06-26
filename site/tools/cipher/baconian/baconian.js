/* global m, rumkinCipher */

const baconianApplier = require("./baconian-applier");
const Dropdown = require("../../../js/mithril/dropdown");
const EncryptionDirectionSelector = require("../encryption-direction-selector");
const InputArea = require("../../../js/mithril/input-area");
const Result = require("../result");

module.exports = class Baconian {
    constructor() {
        this.alphabetInstance = new rumkinCipher.alphabet.English();
        this.alphabet = {
            value: this.alphabetInstance
        };
        this.lastAlphabet = this.alphabetInstance;
        this.lastResult = "";
        this.condensingOptions = {
            label: "Alphabet style",
            options: {
                DISTINCT: "Each letter has a different code",
                CONDENSED: "Replace J with I and replace V with U"
            },
            value: "DISTINCT"
        };
        this.encryptionDirection = {
            value: "ENCRYPT"
        };
        this.input = {
            label: "The hidden message",
            value: ""
        };
        this.embeddingOptions = {
            label: "Embedding options",
            options: {
                BOLD: "Bold",
                EMPHASIS: "Emphasis",
                BOLD_EMPHASIS: "Bold and emphasis"
            },
            value: "BOLD"
        };
        this.embeddingText = {
            label: "Embed your message in this text",
            value: ""
        };
    }

    isEncrypt() {
        return this.encryptionDirection.value === "ENCRYPT";
    }

    view() {
        return [
            m("p", m(EncryptionDirectionSelector, this.encryptionDirection)),
            m("p", m(Dropdown, this.condensingOptions)),
            m("p", m(InputArea, this.input)),
            this.viewSwapAB(),
            m("p", this.viewResult()),
            this.viewEmbed()
        ];
    }

    viewEmbed() {
        if (!this.isEncrypt()) {
            return [];
        }

        return [
            m("p", m(Dropdown, this.embeddingOptions)),
            m("p", m(InputArea, this.embeddingText)),
            m("p", this.viewEmbedResult())
        ];
    }

    viewEmbedResult() {
        if (this.embeddingText.value.length === 0) {
            return "Enter some text in order to see your message hidden within.";
        }

        let classes;

        if (this.embeddingOptions.value === "BOLD") {
            classes = "Fw(b)";
        } else if (this.embeddingOptions.value === "EMPHASIS") {
            classes = "Fs(i)";
        } else {
            classes = "Fw(b) Fs(i)";
        }

        const applied = baconianApplier(
            this.lastAlphabet,
            this.lastResult,
            this.embeddingText.value,
            classes
        );

        return [
            m(Result, applied.result),
            this.viewEmbedResultFits(applied.encodedMessageFits)
        ];
    }

    viewEmbedResultFits(fits) {
        if (fits) {
            return [];
        }

        return m(
            "p",
            "The cipher did not fit into the text provided. Try making it longer. You will need one character per A or B letter in the code."
        );
    }

    viewResult() {
        if (this.input.value.trim() === "") {
            return m(Result, "Enter text to see it encoded here");
        }

        this.lastAlphabet = this.alphabet.value;

        if (this.condensingOptions.value === "CONDENSED") {
            this.lastAlphabet = this.lastAlphabet
                .collapse("J", "I")
                .collapse("V", "U");
        }

        const message = new rumkinCipher.util.Message(this.input.value);
        const module = rumkinCipher.code.baconian;
        const method = this.isEncrypt() ? "encode" : "decode";
        this.lastResult = module[method](message, this.lastAlphabet).toString();

        return m(Result, this.lastResult);
    }

    viewSwapAB() {
        if (this.isEncrypt()) {
            return [];
        }

        return m(
            "p",
            m(
                "a",
                {
                    href: "#",
                    onclick: () => {
                        this.input.value = this.input.value.replace(
                            /[0Aa1Bb]/g,
                            (match) => {
                                switch (match) {
                                    case "0":
                                        return "1";

                                    case "1":
                                        return "0";

                                    case "A":
                                        return "B";

                                    case "B":
                                        return "A";

                                    case "a":
                                        return "b";

                                    case "b":
                                        return "a";

                                    default:
                                        return match;
                                }
                            }
                        );
                        return false;
                    }
                },
                "Swap A and B"
            )
        );
    }
};
