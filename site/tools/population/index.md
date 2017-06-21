---
title: Population Counter
js:
    - population.js
    - ../../js/random.js
controller: populationController
module: population
---

<div ng-if="!loaded">
    <p>
        Loading the population statistics.
    </p>
</div>
<div ng-if="loaded && !selected">
    <p>
        Select a country or region in order to see its estimated population.
    </p>
    <h2>
        Regions
    </h2>
    <ul>
        <li ng-repeat="region in regions">
            <a ng-click="selectCountry(region.I)" ng-bind="region.L" href="#"></a> (<span ng-bind="region.population | number"></span>)
        </li>
    </ul>
    <h2>
        Countries
    </h2>
    <ul>
        <li ng-repeat="country in countries">
            <a ng-click="selectCountry(country.I)" ng-bind="country.L" href="#"></a> (<span ng-bind="country.population | number"></span>)
        </li>
    </ul>
</div>
<div ng-if="loaded && selected">
    <h2 ng-bind="selected.L"></h2>
    <p>
        Current estimated population: <span ng-bind="selected.population | number"></span>
    </p>
    <p>
        All projections start from <span ng-bind="statsStartDate | date:'longDate':'UTC'"></span>. It's been <span ng-bind="selected.days | number"></span> days since.
    </p>
    <table>
        <tr>
            <th>Births</th>
            <td ng-bind="selected.births | number"></td>
        </tr>
        <tr>
            <th>Last Birth</th>
            <td>
                <span ng-if="selected.birthNote.male">Male</span><span ng-if="!selected.birthNote.male">Female</span>, may live to be <span ng-bind="selected.birthNote.ageRange"></span>
            </td>
        </tr>
        <tr>
            <th>Deaths</th>
            <td ng-bind="selected.deaths | number"></td>
        </tr>
        <tr>
            <th>Last Death</th>
            <td>
                <span ng-if="selected.deathNote.male">Male</span><span ng-if="!selected.deathNote.male">Female</span>, age could have been <span ng-bind="selected.deathNote.ageRange"></span>
            </td>
        </tr>
        <tr>
            <th>
                Migrations <span ng-if="selected.migrations > 0">In</span><span ng-if="selected.migrations < 0">Out</span>
            </th>
            <td>
                <span ng-if="selected.migrations > 0" ng-bind="selected.migrations | number"></span>
                <span ng-if="selected.migrations < 0" ng-bind="- selected.migrations | number"></span>
                <span ng-if="!selected.migrations">None</span>
            </td>
        </tr>
    </table>
    <p>
        <a href="#" ng-click="selectCountry()">← Back to the country list.</a>
    </p>
</div>

The figures presented here are based on information from the [United Nations](https://esa.un.org/unpd/wpp/Download/Standard/ASCII/). These are estimates. While this is fun to watch and is roughly accurate, the numbers do not reflect the real population. This performs a straight-line estimate for populations, assuming the rates do not change.

Numbers and notes will automatically update with new information whenever a new simulated birth, death or migration happens. The information about the person's age is randomly generated based on percentages of actual deaths in the country, but certainly does not represent a real person.

Estimates use your computer's time, so use the right time or you'll have very inaccurate results.
