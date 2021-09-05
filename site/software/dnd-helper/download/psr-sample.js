/* global m */

"use strict";

const Psr = require('psr');

module.exports = class PsrSample {
    constructor(args) {
        this.loaded = false;
        this.loading = false;
        this.error = false;
        this.sample = "";
        this.show = false;
        this.args = args;
    }

    generate() {
        if (this.loading || this.error) {
            return;
        }

        this.sample = this.psr.generate();
    }

    loadData() {
        this.loading = true;

        m.request({
            extract: (x) => x.responseText,
            url: this.args.attrs["psr-sample"]
        }).then(
            (data) => {
                this.loading = false;
                this.loaded = true;
                this.psr = new Psr(data);
                this.generate();
            },
            () => {
                this.loading = false;
                this.error = true;
            }
        );
    }

    toggleShow() {
        this.show = !this.show;

        if (!this.loaded && !this.loading && !this.error) {
            this.loadData();
        }
    }

    view() {
        const textStyles = {
            class: 'output'
        };

        if (!this.show) {
            return m(
                "button",
                {
                    type: "button",
                    onclick: () => this.toggleShow()
                },
                "Generate Samples"
            );
        }

        if (this.loading) {
            return m("div", textStyles, "Loading rules");
        }

        if (this.error) {
            return m("div", textStyles, "Error loading rules");
        }

        return [
            m("div", [
                m(
                    "button",
                    {
                        type: "button",
                        onclick: () => this.generate()
                    },
                    "Generate Again"
                ),
                m(
                    "button",
                    {
                        type: "button",
                        onclick: () => this.toggleShow()
                    },
                    "Hide Sample"
                )
            ]),
            m("div", textStyles, this.sample)
        ];
    }
};
