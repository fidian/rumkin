/* global m */

const Dropdown = require("../../js/mithril/dropdown");

module.exports = class EncryptionDirectionSelector {
    constructor(vnode) {
        const attrs = vnode.attrs;
        this.d = {
            options: {
                ENCRYPT: "Encrypt",
                DECRYPT: "Decrypt"
            },
            label: "Operating mode",
            value: attrs.value,
            onchange: (e) => {
                attrs.value = this.d.value;

                if (attrs.onchange) {
                    return attrs.onchange(e);
                }

                return true;
            }
        };
    }

    view() {
        return m(Dropdown, this.d);
    }
};
