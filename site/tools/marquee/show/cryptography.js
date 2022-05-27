"use strict";

module.exports = {
    title: "Cryptography",
    key: "cryptography",
    description:
        'The message is replaced with random letters.  They continue to change until they are the right letter for that position or until the maximum number of loops occur.  Always shows the right message at the end.  Similar to some "hacking" seen in movies.',
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        },
        {
            name: "Time Limit",
            description: "Maximum amount of seconds to cycle.",
            isNumeric: true,
            default: 3
        }
    ],
    depends: ["range", "randomInt"],
    method: function (text, delay, timeLimit, range, randomInt) {
        let chars = "";
        let crypted = "";
        range(32, 128, function (num) {
            chars += String.fromCharCode(num);
        });
        const start = Date.now();

        function animate() {
            if (Date.now() - start >= timeLimit * 1000) {
                return [text];
            }

            let newCrypted = "";

            for (let i = 0; i < text.length; i += 1) {
                if (text.charAt(i) === crypted.charAt(i)) {
                    newCrypted += text.charAt(i);
                } else {
                    newCrypted += chars.charAt(randomInt(chars.length));
                }
            }

            crypted = newCrypted;

            if (Date.now() - start >= timeLimit * 1000 || crypted === text) {
                return [text];
            }

            return [crypted, delay * 1000, animate];
        }

        return animate();
    }
};
