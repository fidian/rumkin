"use strict";

module.exports = {
    title: "Slam",
    key: "slam",
    description:
        "Slams the letters, one by one, from the far right towards the left side.",
    variables: [
        {
            name: "Delay",
            description: "How long to wait between animations, in seconds.",
            isNumeric: true,
            default: 0.01
        }
    ],
    depends: ["repeat"],
    method: function (text, delay, repeat) {
        let completed = "";
        let current = "";
        const queue = text.split("");
        let spaces = "";
        const spacesInitial = repeat("    ", 20);

        function animate() {
            if (spaces.length === 0) {
                completed += current;
                current = queue.shift();
                spaces = spacesInitial;
            } else {
                spaces = spaces.substr(4);
            }

            const t = completed + spaces + current;

            if (spaces.length === 0 && queue.length === 0) {
                return [t];
            }

            return [t, delay * 1000, animate];
        }

        return animate();
    }
};
