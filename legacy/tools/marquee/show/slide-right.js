"use strict";

module.exports = {
    title: "Slide Right",
    key: "slideRight",
    description: "Scrolls your text in from the left side.",
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

            if (chars < text.length) {
                const t = text.substr(text.length - chars);

                return [t, delay * 1000, animate];
            }

            return [text];
        }

        return animate();
    }
};
