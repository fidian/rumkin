/* global m */

const Dropdown = require("../../js/mithril/dropdown");

module.exports = class DirectionSelector {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (!attrs.value) {
            attrs.value = 'ENCRYPT';
        }

        this.d = {
            options: {
                ENCRYPT: "Encrypt",
                DECRYPT: "Decrypt"
            },
            label: "Operating mode",
            value: 'ENCRYPT',
            onchange: (e) => {
                attrs.value = this.d.value;
                this.updateValues(attrs);

                if (attrs.onchange) {
                    return attrs.onchange(e);
                }

                return true;
            }
        };
        this.updateValues(attrs);
    }

    updateValues(attrs) {
        if (this.d.value === 'ENCRYPT') {
            attrs.cipher = 'encipher';
            attrs.crypt = 'encrypt';
            attrs.code = 'encode';
            attrs.obfuscate = true;
        } else {
            attrs.cipher = 'decipher';
            attrs.crypt = 'decrypt';
            attrs.code = 'decode';
            attrs.obfuscate = false;
        }
    }

    view() {
        return m(Dropdown, this.d);
    }
};
