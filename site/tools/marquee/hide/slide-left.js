"use strict";

module.exports = {
    title: "Slide Left",
    key: "slideLeft",
    description: "Scrolls your text out to the left side.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        }
    ],
    method: function (text, delay) {
        let chars = 0;

        function animate() {
            chars += 1;
            const t = text.substr(chars);

            if (chars < text.length) {
                return [t, delay * 1000, animate];
            }

            return [t];
        }

        return animate();
    }
};
