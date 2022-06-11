/* global m */

module.exports = class ErrorMessage {
    view(vnode) {
        return m(
            "span",
            {
                class: "Fw(b) Fz(1.2em) C(red)"
            },
            vnode.children
        );
    }
};
