/* global m */

"use strict";

module.exports = class BaseN {
    constructor() {
        this.inBase = 10;
        this.inNumber = "";
        this.outBase = 10;
        this.outNumber = "0";
    }

    optionList(propertyName) {
        const options = [];
        const currentValue = this[propertyName];

        for (let i = 2; i <= 32; i += 1) {
            options.push(
                m(
                    "option",
                    {
                        selected: currentValue === i,
                        value: i
                    },
                    i
                )
            );
        }

        return m(
            "select",
            {
                onchange: (e) => {
                    this[propertyName] = +e.target.value;
                    this.recalculate();
                }
            },
            options
        );
    }

    view() {
        return [
            m("p", ["Input base: ", this.optionList("inBase")]),
            m("p", [
                "Input number: ",
                m("input", {
                    type: "text",
                    oninput: (e) => {
                        this.inNumber = e.target.value;
                        this.recalculate();
                    },
                    value: this.inNumber
                })
            ]),
            m("p", ["Output base: ", this.optionList("outBase")]),
            m(
                "p",
                {
                    class: "output"
                },
                this.outNumber
            )
        ];
    }

    recalculate() {
        const numList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const inBase = +this.inBase;
        const outBase = +this.outBase;
        const number = this.inNumber.toUpperCase();
        let convertedNumber = 0;
        let s = "";

        // Convert the input number
        for (let i = 0; i < number.length; i += 1) {
            const idx = numList.indexOf(number.charAt(i));

            if (idx >= 0) {
                convertedNumber *= inBase;
                convertedNumber += idx;
            }
        }

        // Convert to the output number base
        while (convertedNumber) {
            const idx = convertedNumber % outBase;
            s = numList.charAt(idx) + s;
            convertedNumber -= idx;
            convertedNumber /= outBase;
        }

        // Handle zero, the only special case
        if (!s.length) {
            s = "0";
        }

        this.outNumber = s;
    }
};
