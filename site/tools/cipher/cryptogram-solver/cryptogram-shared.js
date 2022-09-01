/* global m */

const session = require("./session");

module.exports = {
    viewCipherText() {
        const result = [];
        const cipherText = session.cipherText;

        for (const ct of cipherText.split(/\r?\n/)) {
            if (result.length) {
                result.push(m("br"));
            }

            result.push(ct);
        }

        return [m("p", m("b", "Cipher text:")), m("p", m("tt", result))];
    }
};
