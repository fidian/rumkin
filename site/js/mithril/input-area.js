/* global m */

/**
 * Attributes
 * @typedef {InputAreaAttributes}
 * @property {string=} class
 * @property {string=} label
 * @property {InputAreaOninput=} oninput
 * @property {string} value
 */

/**
 * @callback InputAreaOninput
 * @param {Event} event
 */

module.exports = class InputArea {
    viewLabel(text) {
        if (text) {
            return [text, ":", m("br")];
        }

        return null;
    }

    view(vnode) {
        const attrs = vnode.attrs;

        return [
            this.viewLabel(attrs.label),
            m(
                "textarea",
                Object.assign(
                    {
                        placeholder: "Enter text here"
                    },
                    attrs,
                    {
                        class: `W(100%) H(8em) Mah(75vh) ${attrs.class}`,
                        oninput: (e) => {
                            this.value = attrs.value = e.target.value;

                            if (attrs.oninput) {
                                return attrs.oninput(e);
                            }

                            return false;
                        }
                    }
                )
            )
        ];
    }
};
