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
                "Select a country or region in order to see details on its estimated population."
            ),
            m("h2", "Regions"),
            m("ul", {
                class: "Colm(2) Colm(1)--s"
            }, this.regionList(this.loaded.regions)),
            m("h2", "Countries"),
            m("ul", {
                class: "Colm(2) Colm(1)--s"
            }, this.regionList(this.loaded.countries))
        ];
    }

    regionList(regions) {
        return regions.map((region) =>
            m("li", [
                m(m.route.Link, { href: `/${region.I}` }, region.L),
                m('br'),
                m('span', {
                    class: "Pstart(2em)"
                }, region.population.toLocaleString())
            ])
        );
    }
};
