/* global m */

const Dropdown = require("../../js/mithril/dropdown");

module.exports = class EncryptionDirectionSelector {
    constructor(vnode) {
        this.d = {
            options: {
                ENCRYPT: "Encrypt",
                DECRYPT: "Decrypt"
            },
            label: "Operating mode",
            value: vnode.attrs.value,
            onchange: () => {
                vnode.attrs.value = this.d.value;
            }
        };
    }

    view() {
        return m(Dropdown, this.d);
    }
};
