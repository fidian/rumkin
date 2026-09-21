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
        const resultStr = cryptModule[method](
            message,
            alphabet,
            options
        ).toString();
        // CAUTION - this is not a space!
        const nbsp = String.fromCharCode(160);
        const resultDisplay = resultStr
            .replace(/ {2}/g, ` ${nbsp}`)
            .replace(/^ | $/gm, nbsp);

        return [this.viewWarnings(resultStr), m(Result, resultDisplay)];
    }

    viewWarnings(resultStr) {
        const warnings = [];

        if (resultStr.match(/^ /m)) {
            warnings.push("Found a leading space in output");
        }

        if (resultStr.match(/ $/m)) {
            warnings.push("Found a trailing space in output");
        }

        if (resultStr.match(/ {2,}/)) {
            warnings.push("Two or more consecutive spaces in output");
        }

        if (warnings.length === 0) {
            return [];
        }

        return m(
            "div",
            {
                class: "Bdw(1px) Bgc(#faa) P(0.5em) Whs(pl) My(0.5em)"
            },
            [
                warnings.length > 1
                    ? "The following problems have been detected."
                    : "The following problem has been detected.",
                m(
                    "ul",
                    warnings.map((p) => m("li", p))
                )
            ]
        );
    }
};
