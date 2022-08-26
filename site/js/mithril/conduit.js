/* global m */

const conduitEvents = require('../module/conduit-events');

module.exports = class Conduit {
    constructor(vnode) {
        const attrs = vnode.attrs;
        this.label = attrs['data-label'];
        this.topic = attrs['data-topic'];
        this.payload = attrs['data-payload'];
    }

    view() {
        return m('button', {
            onclick: () => {
                conduitEvents.emit(this.topic, this.payload);
            }
        }, this.label);
    }
};
