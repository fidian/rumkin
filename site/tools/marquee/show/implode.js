"use strict";

module.exports = {
    title: "Implode",
    description:
        "Inserts many spaces between each letter of your message.  Reduces the number of spaces with every iteration.  Makes the message appear to implode.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations.",
            default: 10
        },
        {
            name: "Max Spaces",
            description: "How many spaces between letters at the beginning",
            default: 100
        }
    ],
    depends: ["repeat"],
    method: function(text, writer, whenDone, delay, spaces, repeat) {
        var letters = text.split(""),
            spacesString = repeat(" ", spaces);

        function animate() {
            if (writer(letters.join(spacesString))) {
                return;
            }

            if (spacesString.length) {
                spacesString = spacesString.substr(1);
                setTimeout(animate, delay);
            } else {
                whenDone();
            }
        }

        letters.unshift("");
        animate();
    }
};
