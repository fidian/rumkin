"use strict";

module.exports = {
    title: "Fly Off",
    key: "flyOff",
    description:
        "Makes the message have each letter fly away to the right side separately.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        }
    ],
    method: function (text, delay) {
        let current = "";
        let spaces = "                    "; // 20 spaces

        function animate() {
            if (spaces.length === 20) {
                if (text === "") {
                    return [""];
                }

                current = text.substr(-1);
                text = text.substr(0, text.length - 1);
                spaces = "";
            } else {
                spaces += "    ";
            }

            return [text + spaces + current, delay * 1000, animate];
        }

        return animate();
    }
};
