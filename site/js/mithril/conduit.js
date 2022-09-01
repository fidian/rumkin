/* global m */

const conduitEvents = require("../module/conduit-events");

/**
 * Attributes
 * @typedef {ConduitAttributes}
 * @property {string} data-label
 * @property {string} data-topic
 * @property {string=} data-payload
 * @property {string=} data-payload-*
 */

module.exports = class Conduit {
    constructor(vnode) {
        const attrs = vnode.attrs;
        this.label = attrs["data-label"];
        this.topic = attrs["data-topic"];

        if (attrs["data-payload"]) {
            this.payload = attrs["data-payload"];
        } else {
            this.payload = {};

            for (const [k, v] of Object.entries(attrs)) {
                const matches = k.match(/^data-payload-(.*)/);

                if (matches) {
                    const key = matches[1].replace(/-./g, (x) =>
                        x.toUpperCase()
                    );
                    this.payload[key] = v;
                }
            }
        }
    }

    view() {
        return m(
            "button",
            {
                onclick: () => {
                    conduitEvents.emit(this.topic, this.payload);
                }
            },
            this.label
        );
    }
};
