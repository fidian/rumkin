"use strict";

module.exports = {
    title: "Slide Left",
    key: "slideLeft",
    description: "Scrolls your text in from the right side.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        },
        {
            name: "Max Spaces",
            description: "How many spaces should we start with.",
            isNumeric: true,
            default: 100
        }
    ],
    depends: ["repeat"],
    method: function (text, delay, spaces, repeat) {
        let spacesString = repeat(" ", spaces);

        function animate() {
            if (spacesString.length) {
                const t = spacesString + text;
                spacesString = spacesString.substr(1);

                return [t, delay * 1000, animate];
            }

            return [text];
        }

        return animate();
    }
};
