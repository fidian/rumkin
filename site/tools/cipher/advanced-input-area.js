/* global m, rumkinCipher */

const InputArea = require("../../js/mithril/input-area");

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

        return [
            m(InputArea, attrs),
            m("br"),
            this.viewActions("Remove", removeActions)
        ];
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
