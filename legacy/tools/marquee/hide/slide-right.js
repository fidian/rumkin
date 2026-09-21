"use strict";

module.exports = {
    title: "Slide Right",
    key: "slideRight",
    description: "Scrolls your text out to the right side.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        },
        {
            name: "Max Spaces",
            description: "How many spaces should we end with.",
            isNumeric: true,
            default: 100
        }
    ],
    method: function (text, delay, spaces) {
        let spacesString = "";

        function animate() {
            const t = spacesString + text;

            if (spacesString.length <= spaces) {
                spacesString += " ";

                return [t, delay * 1000, animate];
            }

            return [""];
        }

        return animate();
    }
};
