/* global m */

module.exports = class TextInput {
    viewLabel(text) {
        if (text) {
            return [text, ": "];
        }

        return null;
    }

    view(vnode) {
        const attrs = vnode.attrs;

        return [
            this.viewLabel(attrs.label),
            m(
                "input",
                Object.assign({}, attrs, {
                    type: "text",
                    oninput: (e) => {
                        attrs.value = e.target.value;

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
