"use strict";

module.exports = {
    title: "Backspace",
    key: "backspace",
    description: "Letters are removed with the a delay between each character.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.1
        },
        {
            name: "Plus Or Minus",
            description:
                "The delay can be off by this much to look like a real person is typing.",
            isNumeric: true,
            default: 0.1
        }
    ],
    depends: ["random"],
    method: function (text, delay, error, random) {
        const min = Math.max(0, delay - error);
        const max = delay + error;
        const range = max - min;

        function animate() {
            text = text.substr(0, text.length - 1);

            if (text.length === 0) {
                return [text];
            }

            return [text, 1000 * (random(range) + min), animate];
        }

        return animate();
    }
};
