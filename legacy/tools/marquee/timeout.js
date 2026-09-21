module.exports = class Timeout {
    constructor() {
        this.timeout = null;
    }

    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    set(delay, fn) {
        this.clear();
        this.timeout = setTimeout(() => {
            this.clear();
            fn();
        }, delay);
    }
};
