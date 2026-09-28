---
layout: "@/layouts/tool-layout.astro"
title: Die Roll Stats
summary: Statistically determine how well dice will roll given a specific combination of dice. Shows a chart to visually explain the results.

breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Web-Based Tools
      href: /tools/
---

I have often wondered about the statistical differences between the ways people roll the statistics for their characters. For instance, should one use 3d6 (roll 3 six-sided dice), 4d6 and drop the lowest (four six-sided dice), 4d4+2 (4 four-sided dice and then add two) or any of the other techniques. The minimum and maximums are pretty easy to manually calculate, but I wanted a way to visually see the distribution of rolls. As a DM / GM / super-powerful narrator, I decide how the characters get to roll up their attributes and I want to be informed in this decision.

This analyzer will run through all possibilities fairly quickly and tally the results. Because it has to track so many scenarios, this tool will break when you do something too complex, such as <dice-example notation="20d20D1"></dice-example>. The die roll format is probably best explained through examples.

- <dice-example notation="3d6"></dice-example> - The standard way of rolling attributes.
- <dice-example notation="4d4+2"></dice-example> - A little more "average".
- <dice-example notation="6d3"></dice-example> - Much more consistent and slightly higher than average.
- <dice-example notation="4d6D1"></dice-example> - Roll 4d6 and drop the lowest.
- <dice-example notation="4d5D1+3"></dice-example> - Roll 4d6, drop the lowest, and reroll ones. When you reroll ones with <dice-example notation="1d6"></dice-example>, it is the same as <dice-example notation="1d5+1"></dice-example>. The long form is <dice-example notation="(1d5+1,1d5+1,1d5+1,1d5+1)D1"></dice-example>.
- <dice-example notation="4d8P1"></dice-example> - 4d8 and drop the highest. Unusual and generates a much wider range of numbers.
- <dice-example notation="1d4,1d6,1d8"></dice-example> - Roll three different sizes of dice. Shows how you can combine and generate stats.

## Statistics Generator

<die-stats></die-stats>

## Syntax

If you are familiar with [ABNF Form](https://tools.ietf.org/html/rfc5234), here is the syntax. There's an explanation below. Spaces are ignored.

    ROLL     =  GROUP *("," GROUP)
    GROUP    =  (DIE / "(" ROLL ")") [DROP] [PENALTY] [BONUS]
    DIE      =  1*DIGIT "d" 1*DIGIT
    DROP     =  "D" 1*DIGIT
    PENALTY  =  "P" 1*DIGIT
    BONUS    =  ("+" / "-") 1*DIGIT

A roll is made up of one or more dice groups. Each group is separated by commas. A group can be a single die roll or another roll that's wrapped in parentheses. A group may also have an optional number of dice to drop, a number of high dice removed as a penalty, and a bonus that's added or subtracted from the result of the group.

## Additional Reading

Besides the examples above, I have also seen the following ideas for role playing game attributes. Only some of these can be modeled with this tool.

- <dice-example notation="4d6"></dice-example>, drop lowest, reroll if max is less than 14 or reroll if the sum of the modifiers is less than 1.
- <dice-example notation="5d6D2"></dice-example> - 5d6, drop the two lowest rolls
- Roll up 12 characters using the <dice-example notation="3d6"></dice-example> method, then pick the best character
- <dice-example notation="(3d6,3d6,3d6,3d6,3d6,3d6)D5"></dice-example> - Make a pool of results by rolling <dice-example notation="3d6"></dice-example> six times, then pick the best result by dropping 5 of them. Roll each attribute in order; do not assign numbers to stats as you see fit.
- Roll a pool of 12 scores using <dice-example notation="3d6"></dice-example>, pick the best 6 scores. My tool can't model a scenario like this easily.

I have also been contacted about making some stats that would be useful for Legend of the Five Rings (L5R). In there, you have a stat and a skill. When you roll, you keep a number of 10-sided dice equal to your stat. You can also "roll up" by rolling again when you roll a ten and adding the new roll to the ten. You can continue rolling up as long as you keep rolling tens. I can get close by picking the highest roll out of a set of d10 dice: <dice-example notation="1d10"></dice-example>, <dice-example notation="2d10"></dice-example>, <dice-example notation="3d10"></dice-example>, and so on through <dice-example notation="10d10"></dice-example>.
