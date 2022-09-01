/* global m, window */

const BarChart = require("../../js/mithril/bar-chart");
const conduitEvents = require("../../js/module/conduit-events");
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
        this.input = "";
        this.update();
        this.unsubscribe = conduitEvents.on("dice", (str) => {
            this.input = str || "";
            this.update();
        });
    }

    onbeforeremove() {
        this.unsubscribe();
    }

    update() {
        const input = (this.input || "").replace(/[^-+0-9dDP,()]/g, "");
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
            m(BarChart, {
                columns: [
                    {
                        label: "Roll",
                        property: "roll",
                        attrs: {
                            align: "right"
                        }
                    },
                    {
                        label: "Freq",
                        property: "freq",
                        attrs: {
                            align: "right"
                        }
                    },
                    {
                        label: "Prob",
                        property: "probStr",
                        attrs: {
                            align: "right"
                        }
                    },
                    {
                        label: "Bar",
                        property: "prob",
                        barChart: true
                    }
                ],
                data: this.reformatRollsAsBarChart()
            })
        ];
    }

    reformatRollsAsBarChart() {
        const result = [];

        this.result.rolls.forEach((rollsArray, count) => {
            const prob = count / this.result.totalRolls;
            result.push({
                roll: rollsArray[0],
                freq: count,
                prob: prob,
                probStr: prob.toFixed(5)
            });
        });

        return result;
    }
};
