/* global m */

module.exports = class Result {
    view(vnode) {
        return m(
            "div",
            {
                class: "Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl)"
            },
            [
                m("tt", vnode.children)
            ]
        );
    }
};
