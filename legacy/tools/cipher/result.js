/* global m */

/**
 * No attributes
 */

module.exports = class Result {
    view(vnode) {
        return m(
            "div",
            {
                class: "Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em) Ovw(an)"
            },
            [m("tt", vnode.children)]
        );
    }
};
