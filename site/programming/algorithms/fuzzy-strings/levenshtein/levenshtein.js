/* global m */
"use strict";

module.exports = class Levenshtein {
    constructor() {
        this.a = "";
        this.b = "";
    }

    recalc() {
        console.log("recalc");
        this.score = this.levenshtein(this.a, this.b);
    }

    view() {
        return [
            "Compare two strings:",
            m("br"),
            "1: ",
            m(
                "input",
                {
                    oninput: (e) => {
                        this.a = e.target.value;
                        this.recalc();
                    }
                },
                this.a
            ),
            m("br"),
            "2: ",
            m(
                "input",
                {
                    oninput: (e) => {
                        this.b = e.target.value;
                        this.recalc();
                    }
                },
                this.b
            ),
            m("br"),
            "Distance: ",
            m(
                "span",
                {
                    class: "result"
                },
                this.score
            )
        ];
    }

    levenshtein(str1, str2) {
        "use strict";

        var arr, cost, diagonal, i, j, letter, newValue;

        if (str1.length * str2.length === 0) {
            return str1.length + str2.length;
        }

        arr = [];

        // Force the shorter string to be str2
        if (str1.length > str2.length) {
            i = str2;
            str2 = str1;
            str1 = i;
        }

        // Initialize an array that's one larger than the short string
        for (i = 0; i <= str2.length; i += 1) {
            arr[i] = i;
        }

        // Iterate through the first string.
        for (i = 0; i < str1.length; i += 1) {
            // Initial cost is equal to the character position
            diagonal = i;

            // First array position is a convenience thing representing
            // the situation "if we have to delete all characters"...
            arr[0] = i + 1;
            letter = str1.charAt(i);

            // Letter index j manipulates arr[j + 1]
            for (j = 0; j < str2.length; j += 1) {
                if (letter === str2.charAt(j)) {
                    cost = 0;
                } else {
                    cost = 1;
                }

                newValue = Math.min(
                    arr[j] + 1,
                    arr[j + 1] + 1,
                    diagonal + cost
                );
                diagonal = arr[j + 1];
                arr[j + 1] = newValue;
            }
        }

        return arr.pop();
    }
};
