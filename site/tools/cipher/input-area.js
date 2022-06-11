/* global m */

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
            m("textarea", Object.assign({
                placeholder: 'Enter text here'
            }, attrs, {
                class: `W(100%) H(8em) Mah(75vh) ${attrs.class}`,
                value: undefined,
                onkeyup: (e) => {
                    attrs.value = e.target.value;

                    if (attrs.onkeyup) {
                        return attrs.onkeypress(e);
                    }

                    return true;
                },
                onchange: (e) => {
                    attrs.value = e.target.value;

                    if (attrs.onchange) {
                        return attrs.onchange(e);
                    }

                    return true;
                }
            }))
        ];
    }
};
