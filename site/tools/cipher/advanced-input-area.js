/* global m, rumkinCipher */

const InputArea = require("../../js/mithril/input-area");
const NumericInput = require("../../js/mithril/numeric-input");

/**
 * Attributes
 * @typedef {AdvancedInputAreaAttributes}
 * @property {AlphabetValue} alphabet
 * @property {string=} label
 * @property {AdvancedInputAreaOninput=} oninput
 * @property {boolean} value
 */

/**
 * @typedef {AlphabetValue}
 * @property {Alphabet} value
 */

/**
 * @callback AdvancedInputAreaOninput
 * @param {Event} event
 */

module.exports = class AdvancedInputArea {
    constructor() {
        this.group = {
            class: 'W(3em)',
            value: 5
        };
        this.split = {
            class: 'W(3em)',
            value: 10
        };
    }

    applyGroups(attrs) {
        const groupNum = Math.floor(this.group.value);
        const splitNum = Math.floor(this.split.value);

        let s = attrs.value.replace(/[\s]/g, "");

        if (groupNum < 1) {
            attrs.value = s;

            return;
        }

        const o = [];

        while (s.length) {
            o.push(s.substr(0, this.group.value));
            s = s.substr(this.group.value);
        }

        if (splitNum < 0) {
            attrs.value = o.join(' ');

            return;
        }

        while (o.length) {
            if (s.length) {
                s += "\n";
            }

            for (let i = 0; i < this.split.value; i += 1) {
                if (i) {
                    s += " ";
                }

                s += o.shift() || '';
            }
        }

        attrs.value = s;

        return;
    }

    view(vnode) {
        const attrs = vnode.attrs;
        const removeActions = [
            {
                label: "letters",
                callback: () => {
                    let result = "";

                    for (const c of attrs.value.split("")) {
                        if (!attrs.alphabet.value.isLetter(c)) {
                            result += c;
                        }
                    }

                    attrs.value = result;
                },
                remove: !attrs.alphabet
            },
            {
                label: "non-letters",
                callback: () => {
                    const message = new rumkinCipher.util.Message(attrs.value);
                    attrs.value = message
                        .separate(attrs.alphabet.value)
                        .toString();
                },
                remove: !attrs.alphabet
            },
            {
                label: "numbers",
                callback: () => {
                    attrs.value = attrs.value.replace(/[\d]/g, "");
                }
            },
            {
                label: "whitespace",
                callback: () => {
                    attrs.value = attrs.value.replace(/[\s]/g, "");
                }
            }
        ];
        const changeActions = [
            {
                label: "lowercase",
                callback: () => {
                    attrs.value = this.lowercase(attrs.value);
                }
            },
            {
                label: "Natural case",
                callback: () => {
                    attrs.value = this.lowercase(attrs.value).replace(
                        /(^|\n|[.?!])\s*\S/g,
                        (matches) => this.uppercase(matches)
                    );
                }
            },
            {
                label: "Title Case",
                callback: () => {
                    attrs.value = this.lowercase(attrs.value).replace(
                        /(^|\n|\s)\s*\S/g,
                        (matches) => this.uppercase(matches)
                    );
                }
            },
            {
                label: "UPPERCASE",
                callback: () => {
                    attrs.value = this.uppercase(attrs.value);
                }
            },
            {
                label: "swap case",
                callback: () => {
                    attrs.value = attrs.value
                        .split("")
                        .map((c) => {
                            const u = this.uppercase(c);

                            if (c === u) {
                                return this.lowercase(c);
                            }

                            return u;
                        })
                        .join("");
                }
            },
            {
                label: "reverse",
                callback: () => {
                    attrs.value = attrs.value.split("").reverse().join("");
                }
            }
        ];

        return [
            m(InputArea, attrs),
            m("br"),
            this.viewActions("Remove", removeActions),
            this.viewActions("Change", changeActions),
            this.viewGrouping(attrs)
        ];
    }

    lowercase(str) {
        return str.toLowerCase().replace(/ẞ/g, "ß");
    }

    uppercase(str) {
        return str.toUpperCase().replace(/ß/g, "ẞ");
    }

    viewActions(label, actions) {
        const actionsConverted = [];

        for (const action of actions) {
            if (actionsConverted.length) {
                actionsConverted.push(", ");
            }

            if (!action.remove) {
                actionsConverted.push(
                    m(
                        "a",
                        {
                            href: "#",
                            onclick: () => {
                                action.callback();

                                return true;
                            }
                        },
                        action.label
                    )
                );
            }
        }

        if (!actionsConverted.length) {
            return null;
        }

        return [m("br"), `${label}: `, actionsConverted];
    }

    viewGrouping(attrs) {
        return [
            m("br"),
            m("a", {
                href: "#",
                onclick: () => {
                    this.applyGroups(attrs);

                    return true;
                }
            },
            "Make groups"
            ),
            " of ",
            m(NumericInput, this.group),
            " and next line after ",
            m(NumericInput, this.split),
            " groups"
        ];
    }
};
