"use strict";

module.exports = {
    title: "Implode",
    key: "implode",
    description:
        "Inserts many spaces between each letter of your message.  Reduces the number of spaces with every iteration.  Makes the message appear to implode.",
    variables: [
        {
            name: "Delay",
            description:
                "How long to wait between animation frames, in seconds.",
            isNumeric: true,
            default: 0.01
        },
        {
            name: "Max Spaces",
            description: "How many spaces between letters at the beginning",
            isNumeric: true,
            default: 100
        }
    ],
    depends: ["repeat"],
    method: function (text, delay, spaces, repeat) {
        const letters = text.split("");
        letters.unshift("");
        let spacesString = repeat(" ", spaces + 1);

        function animate() {
            spacesString = spacesString.substr(1);
            const t = letters.join(spacesString);

            if (!spacesString.length) {
                return [t];
            }

            return [t, delay * 1000, animate];
        }

        return animate();
    }
};
