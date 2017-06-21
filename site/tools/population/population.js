"use strict";

/* global angular */
angular.module("population", [
    "random"
]);

angular.module("population").config(($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

angular.module("population").controller("populationController", ($http, $interval, $location, $scope, random) => {
    /**
     * Keep some of the the response data, possibly remap the name, then
     * sort by the name.
     *
     * @param {Object} data
     * @param {Object} rename
     * @param {Function} filterFn
     * @return {Array.<Object>}
     */
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
     */
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
     */
    function selectCountry(countryId) {
        $location.search("selected", countryId || null);
    }


    /**
     * Find an age in the age ranges. If none are found due to rounding
     * errors or invalid data, this returns the last age range.
     *
     * @param {Object} ages
     * @return {string}
     */
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
     */
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
     */
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
        stats.population = stats.P + stats.births - stats.deaths + stats.migrations;
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
        $scope.regions = filterAreas(response.data, {
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
        }, (x) => {
            return x.I >= 900;
        });
        $interval(() => {
            Object.keys($scope.statsById).forEach((key) => {
                updatePopulation($scope.statsById[key]);
            });
        }, 100);

        assignCountry();
        $scope.$on("$locationChangeSuccess", assignCountry);
    });
});
