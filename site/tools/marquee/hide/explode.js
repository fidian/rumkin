"use strict";

module.exports = {
    title: "Explode",
    key: "explode",
    description:
        "With each frame it adds spaces between each character.  Makes the message appear to explode.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        },
        {
            name: "Max Spaces",
            description: "How many spaces between letters at the end.",
            isNumeric: true,
            default: 100
        }
    ],
    method: function (text, delay, spaces) {
        const letters = text.split("");
        letters.unshift("");
        let spacesString = "";

        function animate() {
            if (spacesString.length >= spaces) {
                return [""];
            }

            spacesString += " ";

            return [letters.join(spacesString), delay * 1000, animate];
        }

        return animate();
    }
};
