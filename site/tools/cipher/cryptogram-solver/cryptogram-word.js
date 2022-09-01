/* global m */

const Dropdown = require("../../../js/mithril/dropdown");

module.exports = class CryptogramWord {
    remapWord(w, lm) {
        return w
            .split("")
            .map((c) => lm.get(c) || "?")
            .join("");
    }

    view(vnode) {
        const d = vnode.attrs.data;

        if (d.isLetter) {
            return this.viewWord(
                d,
                vnode.attrs.letterMap,
                vnode.attrs.setLetters
            );
        }

        const chars = d.chars.split(/\r?\n/);
        const result = [];

        for (const chunk of chars) {
            if (result.length) {
                // Can't use <br> because of D(f) in parent
                result.push(
                    m("div", {
                        class: "W(100%) H(0px)"
                    })
                );
            }

            result.push(this.viewNonWord(chunk));
        }

        return result;
    }

    viewNonWord(chars) {
        if (!chars.length) {
            return null;
        }

        return m("div", [
            this.viewChars(chars),
            m("br"),
            this.viewChars(chars)
        ]);
    }

    viewChars(chars) {
        return m(
            "tt",
            {
                class: "Whs(p)"
            },
            chars
        );
    }

    viewWord(d, lm, setLetters) {
        return m("div", [
            this.viewChars(d.chars),
            m("br"),
            this.viewWordLower(d, lm, setLetters)
        ]);
    }

    viewWordLower(d, lm, setLetters) {
        if (d.selectedWord) {
            return this.viewChars(d.selectedWord);
        }

        const currentSolution = this.remapWord(d.chars, lm);

        if (d.availableMatches.length < 1) {
            return this.viewChars(currentSolution);
        }

        const currentSolutionWithMatches = `${currentSolution} (${d.availableMatches.length})`;

        if (d.isLoaded === null) {
            return "Loading";
        }

        if (!d.isLoaded) {
            return m(
                "a",
                {
                    href: "#",
                    onclick: () => {
                        d.isLoaded = null;
                        setTimeout(() => {
                            d.isLoaded = true;
                            m.redraw();
                        });

                        return false;
                    }
                },
                currentSolutionWithMatches
            );
        }

        const options = {
            "": currentSolutionWithMatches
        };

        for (const w of d.availableMatches) {
            options[w] = w;
        }

        return m(Dropdown, {
            value: d.selectedWord,
            onchange: (e) => {
                d.selectedWord = e.target.value;
                setLetters(d.chars, d.selectedWord);
            },
            options
        });
    }
};
