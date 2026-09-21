/* global m */

"use strict";

const Dropdown = require('../../js/mithril/dropdown');

module.exports = class BaseN {
    constructor() {
        const allowedBases = {}

        for (let i = 2; i <= 32; i += 1) {
            allowedBases[i] = i;
        }

        this.inBase = {
            label: 'Input base',
            onchange: () => this.recalculate(),
            options: allowedBases,
            value: 10
        };
        this.inNumber = "";
        this.outBase = {
            label: 'Output base',
            onchange: () => this.recalculate(),
            options: allowedBases,
            value: 10
        };
        this.outNumber = "0";
    }

    view() {
        return [
            m("p", m(Dropdown, this.inBase)),
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
            m("p", m(Dropdown, this.outBase)),
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
        const inBase = +this.inBase.value;
        const outBase = +this.outBase.value;
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
