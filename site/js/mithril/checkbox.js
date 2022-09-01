/* global m */

/**
 * Attributes
 * @typedef {CheckboxAttributes}
 * @property {string=} label
 * @property {CheckboxOnchange=} onchange
 * @property {boolean} value
 */

/**
 * @callback CheckboxOnchange
 * @param {Event} event
 */

module.exports = class Checkbox {
    view(vnode) {
        const attrs = vnode.attrs;

        return m("label", [
            m(
                "input",
                Object.assign({}, attrs, {
                    type: "checkbox",
                    checked: !!attrs.value,
                    onchange: (e) => {
                        attrs.value = !attrs.value;

                        if (attrs.onchange) {
                            return attrs.onchange(e);
                        }

                        return true;
                    }
                })
            ),
            this.viewLabel(attrs)
        ]);
    }

    viewLabel(attrs) {
        if (attrs.label) {
            return [" ", attrs.label];
        }

        return null;
    }
};
