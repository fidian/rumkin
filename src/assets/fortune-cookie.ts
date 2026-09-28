import { component, css, html } from "fudgel";

component(
    "fortune-cookie",
    {
        style: css`
            .fortuneCookie {
                background-image: url(paper.jpg);
                background-size: 100% 100%;
                /* Approximate size is 2.25" x 0.625".  That means W = 3.6 * H. */
                height: 4em;
                width: 14.4em;
                background-color: #fff;
                text-align: center;
                display: table;
                font-size: 1.4em;
                padding: 0 0.5em;
                margin-left: auto;
                margin-right: auto;

                span {
                    display: table-cell;
                    vertical-align: middle;
                    line-height: 1.1em;
                    font-size: 0.8em;
                }
            }
        `,
        template: html`
            <p class="fortuneCookie">
                <span contenteditable="true">{{fortune}}</span>
            </p>

            <p class="Ta(c)">
                <button @click="changeFortune()">
                    Get another random fortune
                </button>
            </p>
        `,
    },
    class {
        fortune = "Loading ...";
        fortunes: string[] = [];

        constructor() {
            fetch("/fun/fortune-cookie/fortunes.txt")
                .then((r) => r.text())
                .then((text) => {
                    this.fortunes = text
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => !!line);
                    this.changeFortune();
                });
        }

        changeFortune() {
            this.fortune = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
        }
    }
);
