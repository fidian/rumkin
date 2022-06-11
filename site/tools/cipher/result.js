/* global m */

module.exports = class Result {
    view(vnode) {
        return m(
            "div",
            {
                class: "M(1em) Bdw(1px) Bgc(#ddd) P(0.5em)"
            },
            vnode.children
        );
    }
};
