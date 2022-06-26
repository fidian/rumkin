/* global m, rumkinCipher */

const Result = require("../result");
const baconianApplier = require("./baconian-applier");
const alphabet = new rumkinCipher.alphabet.English();

module.exports = class BaconianExample {
    view(vnode) {
        const attrs = vnode.attrs;

        return m(
            Result,
            baconianApplier(alphabet, attrs["data-code"], attrs["data-message"], attrs["data-b-classes"]).result
        );
    }
};
