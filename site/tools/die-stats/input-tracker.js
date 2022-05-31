module.exports = class InputTracker {
    constructor(input) {
        this.input = input;
        this.index = 0;
    }

    next() {
        this.index += 1;
    }

    peek() {
        return this.input.charAt(this.index);
    }

    getRemainder() {
        return this.input.substr(this.index);
    }
};
