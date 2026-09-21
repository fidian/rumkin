"use strict";

module.exports = {
    title: "Typing",
    key: "typing",
    description: "Letters are typed with a delay between each character.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.3
        },
        {
            name: "Plus Or Minus",
            description:
                "The delay can be off by this much to look like a real person is typing.",
            isNumeric: true,
            default: 0.35
        }
    ],
    depends: ["random"],
    method: function (text, delay, error, random) {
        let complete = "";
        const min = Math.max(0, delay - error);
        const max = delay + error;
        const range = max - min;

        function animate() {
            complete += text.charAt(complete.length);

            if (complete.length <= text.length) {
                return [complete, 1000 * (random(range) + min), animate];
            }

            return [text];
        }

        return animate();
    }
};
