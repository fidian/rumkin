/* global m, document */

module.exports = class Rainbow {
    constructor() {
        this.htmlCache = {};
        this.makeRainbow("");
    }

    makeRainbow(txt) {
        txt = txt.trim();

        if (!txt) {
            txt = "Enter text to see it here!";
        }

        const result = txt.split("");
        const len = result.length;
        const coloredLetters = result.map((c, i) => {
            return {
                c,
                h: this.htmlencode(c),
                i,
                r: this.colorHex(len, i, 1),
                g: this.colorHex(len, i, 0),
                b: this.colorHex(len, i, -1)
            };
        });

        this.rainbow = coloredLetters.map((l) => {
            if (l.c.trim() === "") {
                return l.c;
            }

            return m(
                "span",
                {
                    style: `color: #${l.r}${l.g}${l.b}`
                },
                l.c
            );
        });
        this.html = coloredLetters.map((l) => {
            if (l.c.trim() === "") {
                return l.c;
            }

            return `<span style="color: #${l.r}${l.g}${l.b}">${l.h}</span>`;
        });
    }

    htmlencode(c) {
        if (c in this.htmlCache) {
            return this.htmlCache[c];
        }

        const div = document.createElement("div");
        div.appendChild(document.createTextNode(c));

        this.htmlCache[c] = div.innerHTML;

        return div.innerHTML;
    }

    view() {
        return [
            m("input", {
                type: "text",
                class: "W(100%)",
                oninput: (e) => {
                    this.makeRainbow(e.target.value);
                }
            }),
            m("p", "This is the result:"),
            m(
                "p",
                {
                    class: "Px(0.3em) Py(1em) Bgc(#114) Fw(b)"
                },
                this.rainbow
            ),
            m("p", "And here is the HTML for your use:"),
            m(
                "code",
                {
                    class: 'output Fz(0.8em) D(b)'
                },
                this.html
            )
        ];
    }

    colorHex(len, i, mult) {
        const pi = Math.PI;
        let sv = i / (len / pi);
        sv += mult * (pi / 3);
        const dec = Math.sin(sv);
        const num = Math.floor(dec * dec * 255);
        const hex = "00" + num.toString(16);

        return hex.substr(-2);
    }
};
