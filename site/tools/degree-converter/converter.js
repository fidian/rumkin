/* global m */

module.exports = class Converter {
    constructor() {
        this.inputValue = "";
        this.update();
    }

    getDegreeValue(v) {
        const sign = v.replace(/[^WS-]*/, "").length ? -1 : 1;
        const cleansed = v
            .replace(/[^0-9.,]/g, " ")
            .replace(/,/g, ".")
            .replace(/  */, " ");
        let factor = 1;
        let d = 0;

        const numbers = cleansed.trim().split(" ");
        console.log(numbers);

        for (const number of numbers) {
            d += +number * factor;
            factor /= 60;
        }

        return d * sign;
    }

    convertDegreeValue(dfSigned) {
        const df = Math.abs(dfSigned);
        const sign = dfSigned < 0 ? -1 : 1;
        const d = Math.floor(df);
        const mf = (df - d) * 60;
        const m = Math.floor(mf);
        const sf = (mf - m) * 60;

        return {
            df: df * sign,
            d: d * sign,
            mf,
            m,
            sf
        };
    }

    round(n, precision) {
        const factor = Math.pow(10, precision);

        return Math.round(n * factor) / factor;
    }

    update() {
        const input = this.inputValue.trim();

        if (!input) {
            this.outputDegrees = "";
            this.outputDegreesMinutes = "";
            this.outputDegreesMinutesSeconds = "";
        }

        const d = this.getDegreeValue(input);
        const numbers = this.convertDegreeValue(d);
        console.log(numbers);

        this.outputDegrees = `${this.round(numbers.df, 6)}`;
        this.outputDegreesMinutes = `${numbers.d}° ${this.round(
            numbers.mf,
            3
        )}`;
        this.outputDegreesMinutesSeconds = `${numbers.d}° ${
            numbers.m
        }' ${this.round(numbers.sf, 2)}"`;
    }

    view() {
        const update = (e) => {
            this.inputValue = e.target.value;
            this.update();
        };
        return [
            m("p", [
                "Enter the value here: ",
                m("input", {
                    value: this.inputValue,
                    onkeyup: update,
                    onchange: update
                })
            ]),
            this.viewResult()
        ];
    }

    viewResult() {
        if (this.inputValue === "") {
            return [];
        }

        return m("p", [
            `Degrees: ${this.outputDegrees}`,
            m("div"),
            `Degrees Minutes: ${this.outputDegreesMinutes}`,
            m("div"),
            `Degrees Minutes Seconds: ${this.outputDegreesMinutesSeconds}`
        ]);
    }
};
