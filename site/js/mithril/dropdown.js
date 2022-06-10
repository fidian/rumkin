/* global m */

module.exports = class Dropdown {
    constructor(vnode) {
        const attrs = vnode.attrs;

        if (attrs.value === undefined) {
            attrs.value = Object.keys(attrs.options)[0];
        }
    }

    view(vnode) {
        const attrs = vnode.attrs;

        return [this.viewLabel(attrs), m(
            "select",
            {
                onchange: (e) => {
                    attrs.value = e.target.value;

                    if (attrs.onchange) {
                        attrs.onchange();
                    }
                }
            },
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
        )];
    }

    viewLabel(attrs) {
        if (attrs.label) {
            return [
                m.trust(attrs.label),
                ': '
            ];
        }

        return null;
    }
};
