---
title: Die Roll Stats
template: index.jade
js: /js/angular.min.js dieroll-module.js
module: dieroll
controller: DierollController
---

I have often wondered the statistical differences between <a ng-click="setRoll(2, 6)">2d6</a> and <a ng-click="setRoll(3, 4)">3d4</a>.  They both have a maximum of 12, but both the minimums and the averages are higher with 3d4.  This is especially applicable for character generation.  As a DM/GM/super-powerful narrator, I decide how the characters get to roll up their attributes.  Do they use <a ng-click="setRoll(3, 6)">3d6</a> like 2nd edition, or perhaps <a ng-click="setRoll(4, 6, 1)">4d6, dropping the lowest</a>?

I used to even use a method that let you <a ng-click="setRoll(4, 5, 1, 0, 3)">reroll ones</a> and that left you with an even higher average with more of a tendency of higher numbers.  (The format for the die rolling string is wacky, see an explanation below.)

I wrote this analyzer so you can see the differences between whatever type of rolling method you pick.  I don't suggest you use a high number of dice, otherwise it will take significantly longer to generate statistics.  My machine bombs out at about 10 dice.

Sample rolls for character generation:

* <a ng-click="setRoll(3, 6)">3d6</a> - The standard
* <a ng-click="setRoll(4, 4, 0, 0, 2)">4d4 + 2</a> - A little lower than the standard
* <a ng-click="setRoll(6, 3)">6d3</a> - Much more consistent and slightly higher than average
* <a ng-click="setRoll(4, 6, 1)">4d6, drop lowest</a> - Slightly more epic
* <a ng-click="setRoll(4, 5, 1, 0, 3)">4d6, reroll 1s, drop lowest</a> - Much more epic
* <a ng-click="setRoll(4, 8, 0, 1)">4d8, drop the highest</a> - Unusual and generates a much wider range of numbers

The format to calculate 4d6 reroll 1s, drop the lowest is weird.  It says to roll 4d5, drop 1, add 3.  If you reroll 1's, you are really saying you want to get the numbers from 2 through 6.  That's the exact same distribution as 1 through 5, but you just need to add one.  Because we still want to drop one die, we will want to get the distribution for 1-5 three times and add three.  So, start with 4d5, drop the lowest, add 3.

Statistics Generator
===================

This will not use formulas, but does a "brute force" method of merely rolling every possible roll and then calculating the distribution.

Roll <input type="number" class="w-3em" ng-model="dice" min=1 /> dice with <input type="number" class="w-3em" ng-model="sides" min=1 /> sides.  Drop the lowest <input type="number" class="w-3em" ng-model="dropLowest" min=0 /> and remove the highest <input type="number" class="w-3em" ng-model="dropHighest" min=0 />.  Finally, add (or subtract) <input type="number" class="w-3em" ng-model="modifier" />.

<div ng-switch="genStatus">
    <div ng-switch-when="delay">Waiting a bit...</div>
    <div ng-switch-when="rolling">Rolling dice...</div>
    <div ng-switch-when="dropping">Dropping dice from rolls...</div>
    <div ng-switch-when="stats">Generating statistics...</div>
    <div ng-switch-when="done">
        <div>
            Min: {{statistics.minRoll}}<br>
            Max: {{statistics.maxRoll}}<br>
            Average: {{statistics.average.toFixed(2)}}<br>
            Std. Dev.: {{statistics.stdDev.toFixed(3)}}
        </div>
        <table>
            <thead>
                <tr>
                    <th>Roll</th>
                    <th>Freq</th>
                    <th>Prob</th>
                    <th>Bar</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="roll in statistics.bySum">
                    <td width="1%" align="right">{{roll.sum}}</td>
                    <td width="1%" align="right">{{roll.count}}</td>
                    <td width="1%" align="right">{{roll.probabilityPercent.toFixed(1)}}%</td>
                    <td valign="center">
                        <div style="background-color: blue; width: {{roll.percentOfMax.toFixed(0)}}%; height: 0.8em">&nbsp;</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


Additional Reading
==================

Besides the examples above, I have also seen these ideas:

* 4d6, drop lowest, reroll if max is less than 14 or reroll if the sum of the modifiers is less than 1
* 5d6, drop the two lowest rolls
* Roll up 12 characters using the 3d6 method, then pick the best character
* Roll 3d6 six times, then pick the best result.  Roll each attribute in order; do not assign numbers to stats as you see fit.
* Roll a pool of 12 scores using 3d6, pick the best 6 scores.

I have also been contacted about making some stats that would be useful for Legend of the Five Rings (L5R).  In there, you have a stat and a skill.  when you roll against that, you keep a number of 10-sided dice equal to your stat.  You can also "roll up" by rolling again when you roll a ten and adding the new roll to the ten.  You can continue rolling up as long as you keep rolling tens.

I wrote up a small [program (C source)](l5r.zip) to only do the rolling of 1-10 10 sided dice and keeping just the highest digit, then averaging the rolls.  Let me know if you would like alternate die roll stats and I will see what I can do to help out.

* Rolling 1d10, keeping the highest:  average roll of 5.5
* Rolling 2d10, keeping the highest:  average roll of 7.15
* Rolling 3d10, keeping the highest:  average roll of 7.975
* Rolling 4d10, keeping the highest:  average roll of 8.4667
* Rolling 5d10, keeping the highest:  average roll of 8.79175
* Rolling 6d10, keeping the highest:  average roll of 9.021595
* Rolling 7d10, keeping the highest:  average roll of 9.1919575
* Rolling 8d10, keeping the highest:  average roll of 9.32268667
* Rolling 9d10, keeping the highest:  average roll of 9.425695015
* Rolling 10d10, keeping the highest:  average roll of 9.5085658075
