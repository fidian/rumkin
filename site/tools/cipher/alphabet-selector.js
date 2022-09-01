/* global m, rumkinCipher */

const Dropdown = require("../../js/mithril/dropdown");

/**
 * Attributes
 * @typedef {AlphabetSelectorAttributes}
 * @property {AlphabetSelectorOnchange=} onchange
 * @property {Alphabet} value
 */

/**
 * @callback AlphabetSelectorOnchange
 * @param {Event} event
 */

const options = {};

for (const name of Object.keys(rumkinCipher.alphabet)) {
    options[name] = name;
}

module.exports = class AlphabetSelector {
    constructor(vnode) {
        const attrs = vnode.attrs;
        const d = {
            options,
            label: "Alphabet",
            value: attrs.value.name,
            onchange: (e) => {
                attrs.value = new rumkinCipher.alphabet[d.value]();

                if (attrs.onchange) {
                    return attrs.onchange(e);
                }

                return true;
            }
        };
        this.d = d;
    }

    view(vnode) {
        this.d.value = vnode.attrs.value.name;

        return m(Dropdown, this.d);
    }
};
