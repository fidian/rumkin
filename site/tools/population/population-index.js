/* global m */

"use strict";

const dataLoader = require("./data-loader");

module.exports = class PopulationIndex {
    constructor() {
        this.loaded = false;

        dataLoader.load().then((data) => {
            this.loaded = data;
        });
    }

    view() {
        if (!this.loaded) {
            return m("p", {
                class: "output"
            }, "Loading the population statistics.");
        }

        return [
            m(
                "p",
                "Select a country or region in order to see its estimated population."
            ),
            m("h2", "Regions"),
            m("ul", this.regionList(this.loaded.regions)),
            m("h2", "Countries"),
            m("ul", this.regionList(this.loaded.countries))
        ];
    }

    regionList(regions) {
        return regions.map((region) =>
            m("li", [
                m(m.route.Link, { href: `/${region.I}` }, region.L),
                ` (${region.population.toLocaleString()})`
            ])
        );
    }
};
