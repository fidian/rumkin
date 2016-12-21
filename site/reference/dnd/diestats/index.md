---
title: Die Roll Stats
js: dieroll-module.js
module: dieroll
controller: DierollController
---

I have often wondered about the statistical differences between the ways people roll the statistics for their characters.  For instance, should one use 3d6 (roll 3 six-sided dice), 4d6 and drop the lowest (four six-sided dice), 4d4+2 (4 four-sided dice and then add two) or any of the other techniques.  The minimum and maximums are pretty easy to manually calculate, but I wanted a way to visually see the distribution of rolls.  As a DM / GM / super-powerful narrator, I decide how the characters get to roll up their attributes and I want to be informed in this decision.

This analyzer will run through all possibilities fairly quickly and tally the results.  Because it has to track so many scenarios, this tool will break when you do something too complex, such as 20d20.  The die roll format is probably best explained through examples.

* <button ng-click="roll='3d6'">3d6</button> - The standard way of rolling attributes.
* <button ng-click="roll='4d4+2'">4d4+2</button> - A little more "average".
* <button ng-click="roll='6d3'">6d3</button> - Much more consistent and slightly higher than average.
* <button ng-click="roll='4d6D1'">4d6D1</button> - Roll 4d6 and drop the lowest.
* <button ng-click="roll='4d5D1+1'">(4d5+1)D1</button> - Roll 4d6 and reroll ones (statistically identical to 4d5 + 1), then drop the lowest.
* <button ng-click="roll='4d8P1'">4d8P1</button> - 4d8 and drop the highest.  Unusual and generates a much wider range of numbers.


Syntax
------

If you are familiar with [ABNF Form](https://tools.ietf.org/html/rfc5234), here is the syntax.  There's an explanation below.  Spaces are ignored.

    ROLL     =  GROUP *("," GROUP)
    GROUP    =  (DIE / "(" ROLL ")") [DROP] [PENALTY] [BONUS]
    DIE      =  1*DIGIT "d" 1*DIGIT
    DROP     =  "D" 1*DIGIT
    PENALTY  =  "P" 1*DIGIT
    BONUS    =  ("+" / "-") 1*DIGIT

A roll is made up of one or more dice groups.  Each group is separated by commas.  A group can be a single die roll or another roll that's wrapped in parentheses.  A group may also have an optional number of dice to drop, a number of high dice removed as a penalty, and a bonus that's added or subtracted from the result of the group.


Statistics Generator
--------------------

What do you want to roll?

<input type="text" ng-model="roll" />

<div ng-switch="genStatus">
    <div ng-switch-when="delay">Waiting a bit...</div>
    <div ng-switch-when="rolling">Rolling dice...</div>
    <div ng-switch-when="dropping">Dropping dice from rolls...</div>
    <div ng-switch-when="stats">Generating statistics...</div>
    <div ng-switch-when="done">
        <div>
            Min: <span ng-bind="statistics.minRoll"></span><br>
            Max: <span ng-bind="statistics.maxRoll"></span><br>
            Average: <span ng-bind="statistics.average.toFixed(2)"></span><br>
            Std. Dev.: <span ng-bind="statistics.stdDev.toFixed(3"></span>)
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
                    <td width="1%" align="right" ng-bind="roll.sum"></td>
                    <td width="1%" align="right" ng-bind="roll.count"></td>
                    <td width="1%" align="right" ng-bind="roll.probabilityPercent.toFixed(1)+'%'"></td>
                    <td valign="center">
                        <div style="Bgc(blue) H(0.8em)" ng-style="{width:roll.percentOfMax.toFixed(0)+'%'}"">&nbsp;</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


Additional Reading
------------------

Besides the examples above, I have also seen the following ideas.  Only some of these can be modeled with this tool.

* 4d6, drop lowest, reroll if max is less than 14 or reroll if the sum of the modifiers is less than 1.
* <button ng-click="roll='5d6'">5d6P2</button> - 5d6, drop the two lowest rolls
* Roll up 12 characters using the 3d6 method, then pick the best character
* <button ng-click="roll='(3d6,3d6,3d6,3d6,3d6,3d6)D5'"></button> - Roll 3d6 six times, then pick the best result.  Roll each attribute in order; do not assign numbers to stats as you see fit.
* Roll a pool of 12 scores using 3d6, pick the best 6 scores.

I have also been contacted about making some stats that would be useful for Legend of the Five Rings (L5R).  In there, you have a stat and a skill.  When you roll, you keep a number of 10-sided dice equal to your stat.  You can also "roll up" by rolling again when you roll a ten and adding the new roll to the ten.  You can continue rolling up as long as you keep rolling tens.  I can get close by picking the highest roll out of a set of d10 dice: <button ng-click="roll='1d10'">1d10</button>, <button ng-click="roll='2d10D1'">2d10D1</button>, <button ng-click="roll='3d10D2'">3d10D2</button>, <button ng-click="roll='4d10D3'">4d10D3</button>, <button ng-click="roll='5d10D4'">5d10D4</button>, <button ng-click="roll='6d10D5'">6d10D5</button>, <button ng-click="roll='7d10D6'">7d10D6</button>, <button ng-click="roll='8d10D7'">8d10D7</button>, <button ng-click="roll='9d10D8'">9d10D8</button>, <button ng-click="roll='10d10D9'">10d10D9</button>.
