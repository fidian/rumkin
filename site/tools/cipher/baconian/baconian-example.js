/* global m, rumkinCipher */

const Result = require("../result");
const baconianApplier = require("./baconian-applier");
const alphabet = new rumkinCipher.alphabet.English();

module.exports = class BaconianExample {
    constructor(vnode) {
        const attrs = vnode.attrs;
        this.code = attrs["data-code"];
        this.message = attrs["data-message"];
        this.bClasses = attrs["b-classes"];
    }

    view() {
        return m(
            Result,
            baconianApplier(alphabet, this.code, this.message, this.bClasses)
                .result
        );
    }
};
