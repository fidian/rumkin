/* global m */

"use strict";

const random = require("../../js/module/random");

module.exports = class Generate {
    constructor() {
        this.passwordList = [];
        this.preset(24, {
            lowercase: true,
            numbers: true,
            uppercase: true
        });
    }

    preset(len, flags, other) {
        this.length = len;
        this.uppercase = !!flags.uppercase;
        this.lowercase = !!flags.lowercase;
        this.numbers = !!flags.numbers;
        this.symbols = !!flags.symbols;
        this.other = other || "";
    }

    view() {
        return [
            m("p", [
                "I have a few presets you may try: ",
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(24, {
                                uppercase: true,
                                lowercase: true,
                                numbers: true
                            })
                    },
                    "Reasonable Password"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(32, {
                                uppercase: true,
                                lowercase: true,
                                numbers: true,
                                symbols: true
                            })
                    },
                    "Strong Password"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                64,
                                {
                                    numbers: true
                                },
                                "ABCDEF"
                            )
                    },
                    "Fake SHA256"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                32,
                                {
                                    numbers: true
                                },
                                "ABCDEF"
                            )
                    },
                    "Fake MD5"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                26,
                                {
                                    numbers: true
                                },
                                "ABCDEF"
                            )
                    },
                    "128-bit WEP"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                10,
                                {
                                    numbers: true
                                },
                                "ABCDEF"
                            )
                    },
                    "64-bit WEP"
                ),
                m(
                    "button",
                    {
                        onclick: () => this.preset(8, {}, "01")
                    },
                    "Byte in Binary"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                2,
                                {
                                    numbers: true
                                },
                                "abcdef"
                            )
                    },
                    "Byte in Hex"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(20, {}, "Il10OoCcKkPpSs5UuVvWwXXZz2")
                    },
                    "Look-alikes"
                ),
                m(
                    "button",
                    {
                        onclick: () =>
                            this.preset(
                                48,
                                {
                                    uppercase: true,
                                    lowercase: true,
                                    symbols: true
                                },
                                "äàáãâąāḃćçċḑđḋëèéêęēėḟģġḩïìíĩîįīıj́ķĺļṁńñņöòóõôǫōṗŕŗśşṡßţŧṫüùúũûųūŵÿýŷźżÄÀÁÃÂĄĀḂĆÇĊḐĐḊËÈÉÊĘĒĖḞĢĠḨÏÌÍĩÎĮĪİJ́ĹĻ£ṀŃÑŅÖÒÓÕÔǪŌṖŔŖŚŞṠẞŢŦṪÜÙÚŨÛŲŪŴŸÝŶ¥ŹŻ° ☃±ⒸⓇ™£¹²³⁴⁵⁶⁷⁸⁹⁰½⅓⅔¼¾αβδεφγηιθκλμνοπχρστυωξψζΑΒΔΕΦΓΗΙΘΚΛΜΝΟΠΧΡΣΤΥΩΞΨΖ"
                            )
                    },
                    "Extra Mean"
                )
            ]),
            m("p", [
                m("input", {
                    type: "number",
                    min: 1,
                    style: "width: 3em",
                    value: this.length
                }),
                " characters long",
                m("br"),
                m("label", [
                    m("input", {
                        type: "checkbox",
                        checked: this.uppercase,
                        onclick: () => {
                            this.uppercase = !this.uppercase;
                        }
                    }),
                    " Use uppercase, capital letters"
                ]),
                m("br"),
                m("label", [
                    m("input", {
                        type: "checkbox",
                        checked: this.lowercase,
                        onclick: () => {
                            this.lowercase = !this.lowercase;
                        }
                    }),
                    " Use lowercase letters"
                ]),
                m("br"),
                m("label", [
                    m("input", {
                        type: "checkbox",
                        checked: this.numbers,
                        onclick: () => {
                            this.numbers = !this.numbers;
                        }
                    }),
                    " Use numbers"
                ]),
                m("br"),
                m("label", [
                    m("input", {
                        type: "checkbox",
                        checked: this.symbols,
                        onclick: () => {
                            this.symbols = !this.symbols;
                        }
                    }),
                    " Use mathematical symbols and punctuation"
                ]),
                m("br"),
                "Include extra characters: ",
                m("input", {
                    type: "text",
                    value: this.other,
                    oninput: (e) => {
                        this.other = e.target.value;
                    }
                })
            ]),
            this.actionButton(),
            this.showPasswordList()
        ];
    }

    actionButton() {
        if (
            this.length &&
            (this.uppercase ||
                this.lowercase ||
                this.numbers ||
                this.symbols ||
                this.other !== "")
        ) {
            return m(
                "p",
                m(
                    "button",
                    {
                        onclick: () => this.generatePassword()
                    },
                    "Generate a Password"
                )
            );
        }

        return m(
            "p",
            "You must have something selected in order to generate a password."
        );
    }

    makeCharSet() {
        const set = {};

        function add(str) {
            for (const c of str.split("")) {
                set[c] = true;
            }
        }

        add(this.other);

        if (this.uppercase) {
            add("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }

        if (this.lowercase) {
            add("abcdefghijklmnopqrstuvwxyz");
        }

        if (this.numbers) {
            add("0123456789");
        }

        if (this.symbols) {
            add("`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?");
        }

        return Object.keys(set)
            .sort()
            .join("");
    }

    generatePassword() {
        const chars = this.makeCharSet();
        let pass = "";

        while (pass.length < this.length) {
            pass += chars[random.index(chars.length)];
        }

        this.passwordList.unshift(pass);
        this.passwordList.splice(10);
    }

    showPasswordList() {
        if (this.passwordList.length === 0) {
            return m(
                "p",
                { class: "output" },
                "Try pressing the button and see a new password."
            );
        }

        return m(
            "div",
            { class: "output" },
            m(
                "ul",
                this.passwordList.map((x) => m("li", x))
            )
        );
    }
};
