/* global m, rumkinCipher */

const InputArea = require("../../js/mithril/input-area");

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
            this.viewActions("Change", changeActions)
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
};
