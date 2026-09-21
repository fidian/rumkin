/* global m, window */

const random = require("../../module/random");

module.exports = class Fortunes {
    constructor(args) {
        window.randomLineTriggers.push(() => {
            this.newFortune();
        });
        this.fortunes = ["Loading fortunes"];
        this.newFortune();
        m.request({
            extract: (x) => x.responseText,
            url: args.attrs["text-file"]
        }).then(
            (data) => {
                this.fortunes = data.trim().split(/\r?\n|\r/);
                this.newFortune();
            },
            () => {
                this.fortunes = ["Error loading fortunes"];
                this.newFortune();
            }
        );
    }

    newFortune() {
        const i = random.index(this.fortunes.length);
        this.fortune = this.fortunes[i];
    }

    view() {
        return m("div", m.trust(this.fortune));
    }
};
