/* global m */
"use strict";

module.exports = class Register {
    constructor() {
        this.code = "";
    }

    updateMessage() {
        const result = this.recalc();

        if (result.unlockCode) {
            this.message = `Your unlock code is ${result.unlockCode}`;
        } else {
            switch (result.errorCode) {
                case "EMPTY":
                    this.message =
                        "You need to enter a registration code to see the unlock code here.";
                    break;

                case "SHORT":
                    this.message = "Enter more characters.";
                    break;

                case "LONG":
                    this.message = "The code is too long. Something is wrong.";
                    break;

                default:
                    this.message =
                        "The code has a problem. Double check all of the letters and numbers.";
            }
        }
    }

    recalc() {
        const newval = this.code
            .trim()
            .toLowerCase()
            .replace(/o/g, "0")
            .replace(/[il]/g, "1")
            .replace(/[^a-f0-9]/g, "");

        if (newval.length === 0) {
            return { errorCode: "EMPTY" };
        }

        if (newval.length < 20) {
            return { errorCode: "SHORT" };
        }

        if (newval.length > 22) {
            return { errorCode: "LONG" };
        }

        // Parse and break into numbers
        const regbytes = [];
        const hex = "0123456789abcdef";

        for (let i = 0; i < 10; i += 1) {
            regbytes[i] =
                hex.indexOf(newval.charAt(i * 2)) * 16 +
                hex.indexOf(newval.charAt(i * 2 + 1));
        }

        // Check for checksum errors
        let checksum = 0;

        for (let i = 0; i < 9; i += 1) {
            checksum += regbytes[i];
            checksum %= 256;
        }

        if (checksum !== regbytes[9]) {
            return { errorCode: "CHECKSUM" };
        }

        let key = 0;

        for (let i = 0; i < 9; i += 1) {
            /* eslint no-bitwise:off */
            let a = (21031 * regbytes[i]) & 0xffff;
            a = (a + 24506) & 0xffff;
            const b = (40782 * i) & 0xffff;
            key = ((key ^ a) + (b ^ 27795)) & 0xffff;
        }

        key = key.toString();

        while (key.length < 5) {
            key = `0${key}`;
        }

        return { unlockCode: key };
    }

    view() {
        return [
            "Enter your registration code here:",
            m(
                "input",
                {
                    type: "text",
                    style: "width: 100%",
                    oninput: (e) => {
                        this.code = e.target.value;
                        this.updateMessage();
                    }
                },
                this.code
            ),
            this.message
        ];
    }
};
