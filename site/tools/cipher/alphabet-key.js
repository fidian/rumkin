/* global m */

const TextInput = require("../../js/mithril/text-input");

// FIXME - add keymaker

module.exports = class AlphabetKey {
    constructor(vnode) {
        const attrs = vnode.attrs;
        this.input = {
            label: "Alphabet key",
            value: attrs.value,
            oninput: (e) => {
                attrs.value = e.target.value;

                if (attrs.oninput) {
                    return attrs.oninput(e);
                }

                return true;
            }
        };
    }

    view() {
        return m(TextInput, this.input);
    }
};
