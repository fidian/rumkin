/* global m, window */

const Parser = require("./parser");
const parser = new Parser();
const Roller = require("./roller");
const roller = new Roller();

module.exports = class Dice {
    constructor() {
        this.input = "";
        this.isEmpty = true;
        this.isWorking = false;
        this.isInvalid = false;
        this.min = 0;
        this.max = 0;
        this.avg = 0;
        this.stdDev = 0;
        this.result = null;
        this.calculatingMessage = "";
        window.diceInstance = this;
    }

    oninit() {
        this.input = m.route.param("dice") || "";
        this.update();
    }

    update() {
        const input = (this.input || "").replace(/[^-+0-9dDP,()]/g, "");
        m.route.set("/", {
            dice: input.trim()
        });
        this.isEmpty = false;
        this.isWorking = false;
        this.isInvalid = false;

        if (input === "") {
            this.isEmpty = true;

            return;
        }

        try {
            this.calculatingMessage = "Initial setup";
            const parsed = parser.parse(input);
            this.isWorking = true;
            roller.calculate(
                parsed,
                (result) => {
                    this.isWorking = false;
                    this.result = result;
                    m.redraw();
                },
                (message) => {
                    this.calculatingMessage = message;
                    m.redraw();
                }
            );
        } catch (err) {
            this.isInvalid = true;
            this.invalidMessage = err.toString();
            // console.log(err.stack);
        }
    }

    setInput(input) {
        if (input !== this.input) {
            this.input = input;
            this.update();
        }
    }

    view() {
        const update = (e) => {
            this.setInput(e.target.value);
        };

        return [
            m("p", [
                "What do you want to roll?",
                m("br"),
                m("input", {
                    type: "text",
                    value: this.input,
                    onchange: update,
                    disabled: this.isWorking
                })
            ]),
            this.viewResults()
        ];
    }

    viewResults() {
        if (this.isInvalid) {
            return m(
                "p",
                `Syntax is invalid and needs to be corrected: ${this.invalidMessage}`
            );
        }

        if (this.isWorking) {
            return m("p", `Calculating statistics: ${this.calculatingMessage}`);
        }

        if (this.isEmpty) {
            return [];
        }

        return [
            m("p", [
                `Min: ${this.result.minRolls}`,
                m("br"),
                `Max: ${this.result.maxRolls}`,
                m("br"),
                `Average (Mean): ${this.result.avg}`,
                m("br"),
                `Standard Deviation: ${this.result.stdDev}`
            ]),
            m("table", [
                m("tr", [
                    m("th", "Roll"),
                    m("th", "Freq"),
                    m("th", "Prob"),
                    m("th", "Bar")
                ]),
                ...this.viewRolls(this.result.rolls)
            ])
        ];
    }

    viewRolls() {
        const dataColProps = {
            width: "1%",
            align: "right"
        };
        const result = [];

        this.result.rolls.forEach((rollsArray, count) => {
            const roll = rollsArray[0];
            const prob = count / this.result.totalRolls;
            const percentOfMax = (100 * count) / this.result.maxCount;

            result.push(
                m("tr", [
                    m("td", dataColProps, roll),
                    m("td", dataColProps, count.toLocaleString()),
                    m("td", dataColProps, prob.toFixed(5)),
                    m(
                        "td",
                        { valign: "center" },
                        m("div", {
                            class: "Bgc(blue) H(0.8em)",
                            style: `width: ${percentOfMax.toFixed(2)}%`
                        })
                    )
                ])
            );
        });

        return result;
    }
};
