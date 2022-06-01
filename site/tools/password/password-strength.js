/* global m */

const PasswordStrengthModule = require("tai-password-strength/lib/password-strength");

module.exports = class PasswordStrength {
    constructor() {
        this.password = "";
        this.showPassword = false;
        this.strengthScore = null;
        this.commonPasswords = null;
        this.passwordStrength = new PasswordStrengthModule();
        this.filesLoading = 2;

        m.request({
            extract: (x) => JSON.parse(x.responseText),
            url: "common-passwords.json"
        }).then((data) => {
            this.passwordStrength.addCommonPasswords(data);
            this.filesLoading -= 1;
        });
        m.request({
            extract: (x) => JSON.parse(x.responseText),
            url: "trigraphs.json"
        }).then((data) => {
            this.passwordStrength.addTrigraphMap(data);
            this.filesLoading -= 1;
        });
    }

    updatePassword(newPass) {
        this.password = newPass;

        if (newPass) {
            this.strengthScore = this.passwordStrength.check(newPass);
        } else {
            this.strengthScore = null;
        }
    }

    view() {
        if (this.filesLoading) {
            return m(
                "p",
                {
                    class: "output"
                },
                "Loading necessary files."
            );
        }

        return [
            m(
                "p",
                m("label", [
                    m("input", {
                        type: "checkbox",
                        checked: this.showPassword,
                        onclick: () => {
                            this.showPassword = !this.showPassword;
                        }
                    }),
                    " Show password"
                ]),
                m('br'),
                m("input", {
                    type: this.showPassword ? "text" : "password",
                    placeholder: "Password or passphrase",
                    class: "W(100%)",
                    value: this.password,
                    oninput: (e) => this.updatePassword(e.target.value)
                })
            ),
            m(
                "div",
                {
                    class: "output"
                },
                this.viewResult()
            )
        ];
    }

    viewResult() {
        if (!this.password) {
            return m("p", "Enter a password or passphrase to analyze");
        }

        const result = [];
        const s = this.strengthScore;

        if (s.commonPassword) {
            result.push(m("p", "WARNING: This is a common password!"));
        }

        const bitsOfEntropy = ` ${Math.floor(s.trigraphEntropyBits)} bits of entropy.`;

        switch (s.strengthCode) {
            case "VERY_STRONG":
                result.push(
                    m("p", [
                        "This password is very strong, with about",
                        bitsOfEntropy
                    ])
                );
                break;

            case "STRONG":
                result.push(
                    m("p", [
                        "You have a strong password, which provides approximately",
                        bitsOfEntropy
                    ])
                );
                break;

            case "REASONABLE":
                result.push(
                    m("p", [
                        "Your password seems to be fairly good, and has",
                        bitsOfEntropy
                    ])
                );
                break;

            case "WEAK":
                result.push(
                    m("p", [
                        "Your password is weak and can be cracked or guessed easily. It provides",
                        bitsOfEntropy
                    ])
                );
                break;

            default:
                result.push(
                    m("p", [
                        m(
                            "span",
                            {
                                class: "Fw(b)"
                            },
                            "VERY WEAK PASSWORD!"
                        ),
                        " There are only",
                        bitsOfEntropy
                    ])
                );
                break;
        }

        result.push(
            m("p", [
                "Suggestions for improvement:",
                m("ul", this.viewSuggestions())
            ])
        );

        return result;
    }

    viewSuggestions() {
        const result = [m("li", "Make the passphrase longer.")];
        const c = this.strengthScore.charsets;

        if (!c.lower) {
            result.push(m("li", "Add lowercase letters."));
        }

        if (!c.upper) {
            result.push(m("li", "Add uppercase letters."));
        }

        if (!c.number) {
            result.push(m("li", "Add numbers."));
        }

        if (!c.punctuation) {
            result.push(m("li", "Add punctuation."));
        }

        if (!c.symbol) {
            result.push(m("li", "Add symbols, such as ones used for math."));
        }

        return result;
    }
};
