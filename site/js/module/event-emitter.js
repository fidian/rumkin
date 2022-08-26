/* Very dumb event handling */

module.exports = class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    emit(name, ...args) {
        for (const callback of this.listeners.get(name) || []) {
            callback(...args);
        }
    }

    off(name, callback) {
        const list = this.listeners.get(name);

        if (!list) {
            return;
        }

        for (let i = list.length - 1; i >= 0; i -= 1) {
            if (list[i] === callback) {
                list.splice(i, 1);
            }
        }
    }

    on(name, callback) {
        let list = this.listeners.get(name);

        if (!list) {
            list = [];
            this.listeners.set(name, list);
        }

        list.push(callback);

        return () => this.off(name, callback);
    }
};
