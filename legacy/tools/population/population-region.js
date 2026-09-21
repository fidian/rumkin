/* global m */

"use strict";

const dataLoader = require("./data-loader");
const random = require('../../js/module/random');

module.exports = class PopulationRegion {
    constructor() {
        this.loaded = false;
        this.invalid = false;
        this.selected = {};
        this.notes = {};
    }

    setId(region) {
        this.region = region;

        dataLoader.load().then((data) => {
            this.loaded = data;

            if (!data.statsById[this.region]) {
                this.invalid = true;

                return;
            }

            this.selected = data.statsById[this.region];
            this.updateNotes();
        });
    }

    view(vnode) {
        if (this.region !== vnode.attrs.region) {
            this.setId(vnode.attrs.region);
        }

        if (!this.loaded) {
            return m("div", { class: "output" }, [
                m("p", "Loading the population statistics."),
                this.backLink()
            ]);
        }

        if (this.invalid) {
            return m("div", { class: "output" }, [
                m("p", "Invalid region specifier."),
                this.backLink()
            ]);
        }

        this.updateNotes();

        return [
            m("h2", this.selected.L),
            m("p", `Current estimated population: ${this.selected.population}`),
            m(
                "p",
                `All projections start from ${
                    this.loaded.statsStartDate.toISOString().split("T")[0]
                }. It's been ${Math.floor(
                    (new Date() - this.loaded.statsStartDate) / 86400000
                )} days since.`
            ),
            m("table", [
                m("tr", [m("th", "Births"), m("td", this.selected.births)]),
                m("tr", [
                    m("th", "Last Birth"),
                    m("td", this.selectedBirthNote())
                ]),
                m("tr", [m("th", "Deaths"), m("td", this.selected.deaths)]),
                m("tr", [
                    m("th", "Last Death"),
                    m("td", this.selectedDeathNote())
                ]),
                m("tr", [
                    m("th", this.migrationsLabel()),
                    m("td", this.migrationsValue())
                ])
            ]),
            this.backLink()
        ];
    }

    backLink() {
        return m(
            "p",
            m(m.route.Link, { href: "/" }, "← Back to the country list.")
        );
    }

    selectedBirthNote() {
        const gender = this.notes.birthNote.male ? "Male" : "Female";

        return `${gender}, may live to be ${this.notes.birthNote.ageRange}`;
    }

    selectedDeathNote() {
        const gender = this.notes.deathNote.male ? "Male" : "Female";

        return `${gender}, age could have been ${this.notes.deathNote.ageRange}`;
    }

    migrationsLabel() {
        if (this.selected.migrations > 0) {
            return "Migrations In";
        }

        if (this.selected.migrations < 0) {
            return "Migrations Out";
        }

        return "Migrations";
    }

    migrationsValue() {
        if (this.selected.migrations) {
            return Math.abs(this.selected.migrations);
        }

        return "None";
    }

    updateNotes() {
        if (this.notes.births !== this.selected.births) {
            this.notes.births = this.selected.births;
            this.notes.birthNote = this.makeNote(this.selected.BMP, this.selected.DM, this.selected.DF);
        }

        if (this.notes.deaths !== this.selected.deaths) {
            this.notes.deaths = this.selected.deaths;
            this.notes.deathNote = this.makeNote(this.selected.DMP, this.selected.DM, this.selected.DF);
        }
    }

    makeNote(maleProbability, maleAges, femaleAges) {
        const isMale = random.number() <= maleProbability;

        return {
            ageRange: this.findAge(isMale ? maleAges : femaleAges),
            male: isMale
        };
    }

    findAge(ages) {
        let r = random.number();

        for (const [k, v] of Object.entries(ages)) {
            if (r < v) {
                return k;
            }

            r -= v;
        }

        return '?';
    }
};

/*
angular
    .module("population")
    .controller(
        "populationController",
        ($http, $interval, $location, $scope, random) => {
            /**
             * Keep some of the the response data, possibly remap the name, then
             * sort by the name.
             *
             * @param {Object} data
             * @param {Object} rename
             * @param {Function} filterFn
             * @return {Array.<Object>}
            function filterAreas(data, rename, filterFn) {
                var countries;

                countries = [];
                Object.keys(data).forEach((key) => {
                    var value;

                    value = data[key];

                    if (filterFn(value)) {
                        countries.push(value);
                    }

                    if (rename[value.I]) {
                        value.L = rename[value.I];
                    }
                });

                countries.sort((a, b) => {
                    var aVal, bVal;

                    aVal = a.L.toLowerCase();
                    bVal = b.L.toLowerCase();

                    if (aVal < bVal) {
                        return -1;
                    }

                    if (aVal > bVal) {
                        return 1;
                    }

                    return 0;
                });

                return countries;
            }

            /**
             * Assigns a particular country to the view.
            function assignCountry() {
                var countryId;

                countryId = $location.search().selected;

                if (!countryId) {
                    $scope.selected = null;
                } else if ($scope.statsById[countryId]) {
                    $scope.selected = $scope.statsById[countryId];
                } else {
                    $scope.selected = null;
                    $location.search("selected", null);
                }
            }

            /**
             * Update the location to choose a country.
             *
             * @param {string} countryId
            function selectCountry(countryId) {
                $location.search("selected", countryId || null);
            }

            /**
             * Find an age in the age ranges. If none are found due to rounding
             * errors or invalid data, this returns the last age range.
             *
             * @param {Object} ages
             * @return {string}
            function findAge(ages) {
                var i, key, keys, r;

                r = random.decimal();
                key = "?";
                keys = Object.keys(ages);

                for (i = 0; i < keys.length; i += 1) {
                    key = keys[i];

                    if (r < ages[key]) {
                        return key;
                    }

                    r -= ages[key];
                }

                return key;
            }

            /**
             * Creates a note for a birth or death.
             *
             * @param {number} maleProbability
             * @param {Object} maleAges
             * @param {Object} femaleAges
             * @return {Object}
            function makeNote(maleProbability, maleAges, femaleAges) {
                var ageRange, male;

                male = Math.random() <= maleProbability;

                if (male) {
                    ageRange = findAge(maleAges);
                } else {
                    ageRange = findAge(femaleAges);
                }

                return {
                    ageRange,
                    male
                };
            }

            /**
             * Update the population numbers for a country or region.
             *
             * @param {Object} stats
            function updatePopulation(stats) {
                var births, deaths, now, years;

                now = new Date();
                stats.days = (now - $scope.statsStartDate) / 86400000;
                years = stats.days / 365.2425;
                births = Math.floor(stats.B * years);

                if (stats.births !== births) {
                    stats.births = births;
                    stats.birthNote = makeNote(stats.BMP, stats.DM, stats.DF);
                }

                deaths = Math.floor(stats.D * years);

                if (stats.deaths !== deaths) {
                    stats.deaths = deaths;
                    stats.deathNote = makeNote(stats.DMP, stats.DM, stats.DF);
                }

                stats.migrations = Math.floor(stats.M * years);
                stats.population =
                    stats.P + stats.births - stats.deaths + stats.migrations;
            }

            $scope.loaded = false;
            $scope.selectCountry = selectCountry;
            $scope.statsStartDate = new Date("2013-01-01T00:00:00Z");
            $http.get("populations.json").then((response) => {
                $scope.loaded = true;
                $scope.statsById = response.data;
                $scope.countries = filterAreas(response.data, {}, (x) => {
                    return x.I < 900;
                });
                $scope.regions = filterAreas(
                    response.data,
                    {
                        903: "Africa",
                        910: "Africa: Eastern",
                        911: "Africa: Middle",
                        912: "Africa: Northern",
                        913: "Africa: Southern",
                        947: "Africa: Sub-Saharan",
                        914: "Africa: Western",
                        935: "Asia",
                        5500: "Asia: Central",
                        906: "Asia: Eastern",
                        921: "Asia: South-Central",
                        920: "Asia: South-Eastern",
                        5501: "Asia: Southern",
                        922: "Asia: Western",
                        908: "Europe",
                        923: "Europe: Eastern",
                        924: "Europe: Northern",
                        925: "Europe: Southern",
                        926: "Europe: Western",
                        904: "Latin America and the Caribbean",
                        915: "Latin America and the Caribbean: Caribbean",
                        916: "Latin America and the Caribbean: Central America",
                        931: "Latin America and the Caribbean: South America",
                        905: "Northern America",
                        909: "Oceania",
                        928: "Oceania: Melanesia",
                        954: "Oceania: Micronesia",
                        957: "Oceania: Polynesia",
                        927: "Oceania: Australia/New Zealand",
                        900: "World",
                        901: "World: More developed regions",
                        941: "World: Least developed countries",
                        902: "World: Less developed regions",
                        934: "World: Less developed regions: excluding least developed countries",
                        948: "World: Less developed regions: excluding China"
                    },
                    (x) => {
                        return x.I >= 900;
                    }
                );
                $interval(() => {
                    Object.keys($scope.statsById).forEach((key) => {
                        updatePopulation($scope.statsById[key]);
                    });
                }, 100);

                assignCountry();
                $scope.$on("$locationChangeSuccess", assignCountry);
            });
        }
    );
    */
