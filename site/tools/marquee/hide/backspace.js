"use strict";

module.exports = {
    title: "Backspace",
    description: "Letters are removed with the a delay between each character.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations.",
            default: 800
        },
        {
            name: "Plus Or Minus",
            description:
                "The delay can be off by this much to look like a real person is typing.",
            default: 350
        }
    ],
    depends: ["random"],
    method: function(text, writer, whenDone, delay, error, random) {
        var min = Math.max(0, delay - error),
            max = delay + error,
            range = max - min;

        function animate() {
            text = text.substr(0, text.length - 1);

            if (writer(text)) {
                return;
            }

            if (text.length === 0) {
                whenDone();
            } else {
                setTimeout(animate, random(range) + min);
            }
        }

        animate();
    }
};
