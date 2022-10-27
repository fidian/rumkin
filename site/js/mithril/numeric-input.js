/* global m */

/**
 * Attributes
 * @typedef {NumericInputAttributes}
 * @property {string=} label
 * @property {NumericInputOninput=} oninput
 * @property {number} value
 */

/**
 * @callback NumericInputOninput
 * @param {Event} event
 */

module.exports = class NumericInput {
    constructor(vnode) {
        this.value = vnode.attrs.value || "";
    }

    viewLabel(text) {
        if (text) {
            return [text, ": "];
        }

        return null;
    }

    view(vnode) {
        const attrs = vnode.attrs;

        if (attrs.value !== +this.value) {
            this.value = `${attrs.value}`;
        }

        return [
            this.viewLabel(attrs.label),
            m(
                "input",
                Object.assign({}, attrs, {
                    value: this.value,
                    type: "number",
                    placeholder: "0",
                    oninput: (e) => {
                        const v = e.target.value;
                        this.value = v;
                        attrs.value = +v;

                        if (attrs.oninput) {
                            return attrs.oninput(e);
                        }

                        return true;
                    }
                })
            )
        ];
    }
};
