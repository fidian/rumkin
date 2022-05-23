"use strict";

module.exports = {
    title: "Typing",
    description: "Letters are typed with a delay between each character.",
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
        var complete = "",
            min = Math.max(0, delay - error),
            max = delay + error,
            range = max - min;

        function animate() {
            complete += text.charAt(complete.length);

            if (writer(complete)) {
                return;
            }

            if (complete.length === text.length) {
                whenDone();
            } else {
                setTimeout(animate, random(range) + min);
            }
        }

        animate();
    }
};
