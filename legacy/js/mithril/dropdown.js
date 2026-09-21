/* global m */

/**
 * Attributes
 * @typedef {DropdownAttributes}
 * @property {string=} label
 * @property {Object.<string>} options Key is the used value; value is the label to be displayed
 * @property {DropdownOnchange=} onchange
 * @property {boolean} value
 */

/**
 * @callback DropdownOnchange
 * @param {Event} event
 */

module.exports = class Dropdown {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (attrs.value === undefined) {
            attrs.value = Object.keys(attrs.options)[0];
        }
    }

    view(vnode) {
        const attrs = vnode.attrs;

        return [
            this.viewLabel(attrs),
            m(
                "select",
                Object.assign({}, attrs, {
                    onchange: (e) => {
                        attrs.value = e.target.value;

                        if (attrs.onchange) {
                            return attrs.onchange(e);
                        }

                        return true;
                    },
                    options: undefined
                }),
                Object.entries(attrs.options).map((option) => {
                    return m(
                        "option",
                        {
                            value: option[0],
                            selected: `${option[0]}` === `${attrs.value}`
                        },
                        option[1]
                    );
                })
            )
        ];
    }

    viewLabel(attrs) {
        if (attrs.label) {
            return [attrs.label, ": "];
        }

        return null;
    }
};
