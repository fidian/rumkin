/* global m */

/**
 * Attributes
 * @typedef {ShowHideAttributes}
 * @property {*} content What to show when the accordion is expanded
 * @property {string} label
 * @property {boolean} show
 */

module.exports = class ShowHide {
    constructor(vnode) {
        this.isShowing = !!vnode.attrs.show;
    }

    linkToggle(text, vnode) {
        return m(
            "a",
            {
                href: "#",
                onclick: () => {
                    this.isShowing = !this.isShowing;
                }
            },
            `${text} ${vnode.attrs.label}`
        );
    }

    view(vnode) {
        if (!this.isShowing) {
            return this.linkToggle("Show", vnode);
        }

        return [this.linkToggle("Hide", vnode), m("br"), vnode.attrs.content];
    }
};
