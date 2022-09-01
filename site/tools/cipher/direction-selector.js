/* global m */

const Dropdown = require("../../js/mithril/dropdown");

/**
 * Attributes
 * @typedef DirectionSelectorAttributes
 * @property {boolean=false} code True if this is a code instead of a cipher
 * @property {DirectionSelectorOnchange} onchange
 * @property {string} value 'ENCRYPT' or 'DECRYPT'
 */

/**
 * @callback DirectionSelectionOnchange
 * @param {Event} event
 */

module.exports = class DirectionSelector {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (!attrs.value) {
            attrs.value = "ENCRYPT";
        }

        this.d = {
            options: {
                ENCRYPT: attrs.code ? "Encode" : "Encrypt",
                DECRYPT: attrs.code ? "Decode" : "Decrypt"
            },
            label: "Operating mode",
            value: "ENCRYPT",
            onchange: (e) => {
                attrs.value = this.d.value;

                if (attrs.onchange) {
                    return attrs.onchange(e);
                }

                return true;
            }
        };
    }

    view(vnode) {
        if (this.d.value !== vnode.attrs.value) {
            this.d.value = vnode.attrs.value;
        }

        return m(Dropdown, this.d);
    }
};
