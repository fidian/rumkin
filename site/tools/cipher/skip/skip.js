/* global m, rumkinCipher */

const AdvancedInputArea = require("../advanced-input-area");
const AlphabetSelector = require("../alphabet-selector");
const cipherConduitSetup = require("../cipher-conduit-setup");
const CipherResult = require("../cipher-result");
const DirectionSelector = require("../direction-selector");
const NumericInput = require("../../../js/mithril/numeric-input");
const Result = require("../result");
const TranspositionOperatingMode = require("../transposition-operating-mode");

module.exports = class Rotate {
    constructor() {
        this.displayEveryPossibility = false;
        this.direction = {
            value: "ENCRYPT"
        };
        this.alphabet = {
            value: new rumkinCipher.alphabet.English()
        };
        this.offset = {
            value: 0,
            label: "Number of letters to bypass before starting"
        };
        this.skip = {
            value: 1,
            label: "Number of letters to skip"
        };
        this.input = {
            value: ""
        };
        this.transpositionOperatingMode = {
            value: "NORMAL"
        };
        cipherConduitSetup(this, "skip");
    }

    isSkipValid(skip, messageLength) {
        return rumkinCipher.util.coprime(messageLength, skip + 1);
    }

    changeSkipButton(label, direction, messageLength) {
        let next = this.skip.value + direction;

        while (
            next > 0 &&
            next < messageLength &&
            !this.isSkipValid(next, messageLength)
        ) {
            next += direction;
        }

        return m(
            "button",
            {
                disabled: next <= 0 || next >= messageLength,
                onclick: () => {
                    this.skip.value = next;
                }
            },
            label
        );
    }

    view() {
        let messageLength = this.input.value.length;

        if (this.transpositionOperatingMode.value !== "ALL_CHARS") {
            messageLength = new rumkinCipher.util.Message(
                this.input.value
            ).separate(this.alphabet.value).length;
        }

        if (this.skip.value < 0) {
            this.skip.value = 0;
        }

        if (this.offset.value < 0) {
            this.offset.value = 0;
        }

        return [
            m("p", m(DirectionSelector, this.direction)),
            m("p", m(AlphabetSelector, this.alphabet)),
            m("p", [
                m(NumericInput, this.skip),
                this.changeSkipButton("+", 1, messageLength),
                this.changeSkipButton("-", -1, messageLength)
            ]),
            m("p", m(NumericInput, this.offset)),
            m(
                "p",
                m(TranspositionOperatingMode, this.transpositionOperatingMode)
            ),
            m("p", m(AdvancedInputArea, this.input)),
            this.viewWarning(),
            m("p", this.viewResult(messageLength)),
            m("p", this.viewAllSkipValues(messageLength))
        ];
    }

    viewAllSkipValues(messageLength) {
        const result = [
            m(
                "button",
                {
                    onclick: () =>
                        (this.displayEveryPossibility = !this.displayEveryPossibility)
                },
                `${this.displayEveryPossibility ? "Hide" : "Show"} every possible outcome`
            )
        ];

        if (this.displayEveryPossibility) {
            for (let i = 1; i < messageLength; i += 1) {
                if (this.isSkipValid(i, messageLength)) {
                    result.push(m("p", [
                        m("b", `Skip ${i}:`),
                        this.viewResultForSkip(i)
                    ]));
                }
            }
        }

        return result;
    }

    viewResult(messageLength) {
        if (!this.isSkipValid(this.skip.value, messageLength)) {
            return m(
                Result,
                "The number of letters to skip is incompatible with the length of the message."
            );
        }

        if (!this.input.value.trim()) {
            return m(Result, "Enter text and see it encoded or decoded here");
        }

        return this.viewResultForSkip(this.skip.value);
    }

    viewResultForSkip(skip) {
        return m(CipherResult, {
            name: "skip",
            direction: this.direction.value,
            message: this.input.value,
            alphabet:
                this.transpositionOperatingMode.value === "ALL_CHARS"
                    ? null
                    : this.alphabet.value,
            options: {
                keepCapitalization:
                    this.transpositionOperatingMode.value === "MOVE_CAPS",
                offset: this.offset.value,
                skip
            }
        });
    }

    viewWarning() {
        const method = this.direction.value === "ENCRYPT" ? "encipher" : "decipher";
        const module = rumkinCipher.cipher.skip;
        const message = new rumkinCipher.util.Message(this.input.value);
        const alphabet = this.transpositionOperatingMode.value === "ALL_CHARS" ? null : this.alphabet.value;
        const options = {
            // Can disregard keepCapitalization - only care about spaces
            offset: this.offset.value,
            skip: this.skip.value
        };
        const result = module[method](message, alphabet, options).toString();
        const problems = [];

        if (result.match(/^ /m)) {
            problems.push("Leading spaces in output");
        }

        if (result.match(/ $/m)) {
            problems.push("Trailing spaces in output");
        }

        if (result.match(/ {2,}/)) {
            problems.push("Two or more consecutive spaces in output");
        }

        if (problems.length === 0) {
            return [];
        }

        return m("div", {
            class: "Bdw(1px) Bgc(#ebb) P(0.5em) My(0.5em)"
        }, [
            "The following problems have been detected and may be hard to spot.",
            m("ul", problems.map(p => m("li", p)))
        ]);
    }
};
