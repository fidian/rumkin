/* global m, window */

module.exports = class RandomLineController {
    constructor(args) {
        this.label = args.attrs.label || "Get another random line";
    }

    view() {
        return m(
            "a",
            {
                href: "#",
                onclick: () => {
                    window.randomLineTriggers.forEach((trigger) => trigger());
                    return false;
                }
            },
            this.label
        );
    }
};
