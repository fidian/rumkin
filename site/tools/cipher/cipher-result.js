/* global m, rumkinCipher */

const Result = require("./result");

/**
 * Attributes
 * @typedef {CipherResultAttributes}
 * @property {Alphabet} alphabet
 * @property {string} direction 'ENCRYPT' or 'DECRYPT'
 * @property {string} message What to encode or decode
 * @property {string} name Name of cipher or code
 * @property {Object=} options
 */

module.exports = class CipherResult {
    view(vnode) {
        const attrs = vnode.attrs;

        if (rumkinCipher.cipher[attrs.name]) {
            return this.viewCipher(attrs, rumkinCipher.cipher[attrs.name]);
        }

        return this.viewCode(attrs, rumkinCipher.code[attrs.name]);
    }

    viewCipher(attrs, cryptModule) {
        return this.viewOutput(
            cryptModule,
            attrs.direction === "ENCRYPT" ? "encipher" : "decipher",
            attrs
        );
    }

    viewCode(attrs, cryptModule) {
        return this.viewOutput(
            cryptModule,
            attrs.direction === "ENCRYPT" ? "encode" : "decode",
            attrs
        );
    }

    viewOutput(cryptModule, method, attrs) {
        const message = new rumkinCipher.util.Message(attrs.message);
        const alphabet = attrs.alphabet;
        const options = attrs.options || undefined;
        const result = cryptModule[method](message, alphabet, options);

        return m(Result, result.toString());
    }
};
