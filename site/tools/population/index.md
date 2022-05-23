---
title: Population Counter
summary: A simulator that helps you better visualize how fast different countries have their populations change.
js:
    - population-module.js
routes:
    -
        path: /
        component: PopulationIndex
    -
        path: /:region
        component: PopulationRegion
---

<div class="module"></div>

The figures presented here are based on information from the [United Nations](https://population.un.org/wpp/Download/Standard/CSV/). These are estimates. While this is fun to watch and is roughly accurate, the numbers do not reflect the real population. This performs a straight-line estimate for populations, assuming the rates do not change. The stats are also somewhat dated. This was an exercise in programming and the data formats have changed over time, so I have not updated this to work with more recent data.

Numbers and notes will automatically update with new information whenever a new simulated birth, death or migration happens. The information about the person's age is randomly generated based on percentages of actual deaths in the country, but certainly does not represent a real person.
