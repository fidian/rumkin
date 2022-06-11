/* global m */

const Dropdown = require("../../js/mithril/dropdown");
const rumkinCipher = require("@fidian/rumkin-cipher");

const options = {};

for (const name of Object.keys(rumkinCipher.alphabet)) {
    options[name] = name;
}

module.exports = class AlphabetSelector {
    constructor(vnode) {
        this.d = {
            options,
            label: "Alphabet",
            value: vnode.attrs.value,
            onchange: (e) => {
                vnode.attrs.value = this.d.value;

                if (vnode.attrs.onchange) {
                    return vnode.attrs.onchange(e);
                }

                return true;
            }
        };
    }

    view() {
        return m(Dropdown, this.d);
    }
};
