---
title: Die Roll Stats
js: dice-module.js
routes:
    - path: /
      component: Dice
---

I have often wondered about the statistical differences between the ways people roll the statistics for their characters. For instance, should one use 3d6 (roll 3 six-sided dice), 4d6 and drop the lowest (four six-sided dice), 4d4+2 (4 four-sided dice and then add two) or any of the other techniques. The minimum and maximums are pretty easy to manually calculate, but I wanted a way to visually see the distribution of rolls. As a DM / GM / super-powerful narrator, I decide how the characters get to roll up their attributes and I want to be informed in this decision.

This analyzer will run through all possibilities fairly quickly and tally the results. Because it has to track so many scenarios, this tool will break when you do something too complex, such as <a href="#" class="linkDice">20d20D1</a>. The die roll format is probably best explained through examples.

-   <a href="#" class="linkDice">3d6</a> - The standard way of rolling attributes.
-   <a href="#" class="linkDice">4d4+2</a> - A little more "average".
-   <a href="#" class="linkDice">6d3</a> - Much more consistent and slightly higher than average.
-   <a href="#" class="linkDice">4d6D1</a> - Roll 4d6 and drop the lowest.
-   <a href="#" class="linkDice">4d5D1+1</a> - Roll 4d6, drop the lowest, and reroll ones. When you reroll ones with <a href="#" class="linkDice">4d6</a>, it is the same as <a href="#" class="linkDice">4d5 + 1</a>.
-   <a href="#" class="linkDice">4d8P1</a> - 4d8 and drop the highest. Unusual and generates a much wider range of numbers.

## Syntax

If you are familiar with [ABNF Form](https://tools.ietf.org/html/rfc5234), here is the syntax. There's an explanation below. Spaces are ignored.

    ROLL     =  GROUP *("," GROUP)
    GROUP    =  (DIE / "(" ROLL ")") [DROP] [PENALTY] [BONUS]
    DIE      =  1*DIGIT "d" 1*DIGIT
    DROP     =  "D" 1*DIGIT
    PENALTY  =  "P" 1*DIGIT
    BONUS    =  ("+" / "-") 1*DIGIT

A roll is made up of one or more dice groups. Each group is separated by commas. A group can be a single die roll or another roll that's wrapped in parentheses. A group may also have an optional number of dice to drop, a number of high dice removed as a penalty, and a bonus that's added or subtracted from the result of the group.

## Statistics Generator

<div class="module"></div>

## Additional Reading

Besides the examples above, I have also seen the following ideas for role playing game attributes. Only some of these can be modeled with this tool.

-   4d6, drop lowest, reroll if max is less than 14 or reroll if the sum of the modifiers is less than 1.
-   <a href="#" class="linkDice">5d6D2</a> - 5d6, drop the two lowest rolls
-   Roll up 12 characters using the <a href="#!/?dice=3d6">3d6</a> method, then pick the best character
-   <a href="#" class="linkDice">(3d6,3d6,3d6,3d6,3d6,3d6)D5</a> - Make a pool of results by rolling <a href="#" class="linkDice">3d6</a> six times, then pick the best result by dropping 5 of them. Roll each attribute in order; do not assign numbers to stats as you see fit.
-   Roll a pool of 12 scores using <a href="#" class="linkDice">3d6</a>, pick the best 6 scores.

I have also been contacted about making some stats that would be useful for Legend of the Five Rings (L5R). In there, you have a stat and a skill. When you roll, you keep a number of 10-sided dice equal to your stat. You can also "roll up" by rolling again when you roll a ten and adding the new roll to the ten. You can continue rolling up as long as you keep rolling tens. I can get close by picking the highest roll out of a set of d10 dice: <a href="#" class="linkDice">1d10</a>, <a href="#" class="linkDice">2d10</a>, <a href="#" class="linkDice">3d10</a>, and so on through <a href="#" class="linkDice">10d10</a>.
