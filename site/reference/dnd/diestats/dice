#!/usr/bin/env node

"use strict";

/**
 * @typedef {Object} dieRollAccumulator
 * @property {number} count Minimum of 1
 * @property {number} dropHigh Number of high dice that should be dropped
 * @property {Array.<number>} dropHighRolls High dice that were dropped
 * @property {number} dropLow Number of low dice that should be dropped
 * @property {Array.<number>} dropLowRolls Low dice that were dropped
 * @property {number} sum Sum of the dice that are counted.
 */


/**
 * This is a group of die rolls, each one representing a different
 * result/scenario that happens.
 *
 * @typedef {Array.<dieRollAccumulator>} dieRollSet
 */


/**
 * @typedef {Object} groupOptions
 * @property {integer} dropHigh
 * @property {integer} dropLow
 */


/**
 * Pass this to the sort function to sort values numerically.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function sortNumeric(a, b) {
    return a - b;
}


/**
 * Generate a die roll accumulator object.
 *
 * @param {integer} sides
 * @return {dieRollAccumulator}
 */
function d(sides) {
    var n, result;

    result = [];

    for (n = 1; n <= sides; n += 1) {
        result.push({
            count: 1,
            dropHigh: 0,
            dropHighRolls: [],
            dropLow: 0,
            dropLowRolls: [],
            sum: n
        });
    }

    return result;
}

/**
 * Add another die roll (or another die roll set) into the mix.  If you are
 * rolling 2d6, firstRoll would be the first 1d6 and secondRoll would be the
 * other die.
 *
 * @param {dieRollAccumulator} firstRoll
 * @param {dieRollAccumulator} secondRoll
 * @return {dieRollAccumulator}
 */
function combineRolls(firstRoll, secondRoll) {
    var combined, dieRollValue;

    combined = {
        count: firstRoll.count * secondRoll.count,
        dropHigh: firstRoll.dropHigh,
        dropHighRolls: [].concat(firstRoll.dropHighRolls),
        dropLow: firstRoll.dropLow,
        dropLowRolls: [].concat(firstRoll.dropLowRolls),
        sum: firstRoll.sum
    };

    dieRollValue = secondRoll.sum;

    if (combined.dropLow) {
        combined.dropLowRolls.push(dieRollValue);

        if (combined.dropLowRolls.length > combined.dropLow) {
            combined.dropLowRolls.sort(sortNumeric);
            dieRollValue = combined.dropLowRolls.pop();
        } else {
            // Short circuit - not enough rolls dropped.
            return combined;
        }
    }

    if (combined.dropHigh) {
        combined.dropHighRolls.push(dieRollValue);

        if (combined.dropHighRolls.length > combined.dropHigh) {
            combined.dropHighRolls.sort(sortNumeric);
            dieRollValue = combined.dropHighRolls.shift();
        } else {
            // Short circuit - not enough rolls dropped.
            return combined;
        }
    }

    combined.sum += dieRollValue;

    return combined;
}


/**
 * Merge together rolls that are equivalent (eg 2+3 and 3+2).  This is done
 * to deduplicate results and greatly improve speed.  Duplicate detection is
 * done elsewhere.
 *
 * @param {dieRollAccumulator} firstRoll
 * @param {dieRollAccumulator} secondRoll
 * @return {dieRollAccumulator}
 */
function mergeRolls(firstRoll, secondRoll) {
    if (!secondRoll) {
        return firstRoll;
    }

    return {
        count: firstRoll.count + secondRoll.count,
        dropHigh: firstRoll.dropHigh,
        dropHighRolls: [].concat(firstRoll.dropHighRolls),
        dropLow: firstRoll.dropLow,
        dropLowRolls: [].concat(firstRoll.dropLowRolls),
        sum: firstRoll.sum
    };
}


/**
 * Builds a key out of this roll's distinct parts, not including
 * things that could change when merged with another roll.  This is used to
 * detect duplicate states and determine when to merge rolls together.
 *
 * @param {dieRollAccumulator} roll
 * @return {string}
 */
function buildRollKey(roll) {
    var str;

    str = roll.sum;

    if (roll.dropLowRolls.length) {
        str += " D";
        str += roll.dropLowRolls.join(",");
    }

    if (roll.dropHighRolls.length) {
        str += " P";
        str += roll.dropHighRolls.join(",");
    }

    return str;
}


/**
 * Performs the set multiplication of firstRollSet against secondRollSet and
 * deduplicates the results to keep the result as small as possible.
 *
 * @param {dieRollSet} firstRollSet
 * @param {dieRollSet} secondRollSet
 * @return {dieRollSet}
 */
function combineRollSets(firstRollSet, secondRollSet) {
    var firstIndex, result, roll, rollKey, rollMap, secondIndex;

    result = [];
    rollMap = {};

    for (firstIndex = 0; firstIndex < firstRollSet.length; firstIndex += 1) {
        for (secondIndex = 0; secondIndex < secondRollSet.length; secondIndex += 1) {
            roll = combineRolls(firstRollSet[firstIndex], secondRollSet[secondIndex]);
            rollKey = buildRollKey(roll);
            rollMap[rollKey] = mergeRolls(roll, rollMap[rollKey]);
        }
    }

    Object.keys(rollMap).sort((a, b) => {
        return rollMap[a].sum - rollMap[b].sum;
    }).forEach((key) => {
        result.push(rollMap[key]);
    });

    return result;
}


/**
 * Used to kick off the building of die roll sets.
 *
 * @param {dieRollSet} rollSet
 * @param {groupOptions} options
 * @return {dieRollSet}
 */
function group(rollSet, options) {
    var i, result;

    if (!options) {
        options = {};
    }

    result = [
        {
            count: 1,
            dropHigh: options.dropHigh || 0,
            dropHighRolls: [],
            dropLow: options.dropLow || 0,
            dropLowRolls: [],
            sum: 0
        }
    ];

    for (i = 0; i < rollSet.length; i += 1) {
        result = combineRollSets(result, rollSet[i]);
    }

    return result;
}


/**
 * Display a roll set to console.
 *
 * @param {string} message Some sort of header
 * @param {dieRollSet} rollSet
 */
function write(message, rollSet) {
    var i, roll, sums, totalCount;

    sums = {};
    totalCount = 0;

    for (i = 0; i < rollSet.length; i += 1) {
        roll = rollSet[i];
        totalCount += roll.count;

        if (sums[roll.sum]) {
            sums[roll.sum] += roll.count;
        } else {
            sums[roll.sum] = roll.count;
        }
    }

    console.log("");
    console.log(message, `= ${totalCount} rolls`);
    Object.keys(sums).sort(sortNumeric).forEach((key) => {
        var percent;

        percent = Math.floor(sums[key] * 10000 / totalCount) / 100;
        console.log(`${key}: ${sums[key]}, ${percent} %`);
    });
}

write("(d4 d6 d8) D1", group([
    d(4),
    d(6),
    d(8)
], {
    dropLow: 1
}));
write("(d6 d8 d10) P1", group([
    d(6),
    d(8),
    d(10)
], {
    dropHigh: 1
}));
write("3d8 D1", group([
    d(8),
    d(8),
    d(8)
], {
    dropLow: 1
}));
write("(3d8 D1) d4", group([
    group([
        d(8),
        d(8),
        d(8)
    ], {
        dropLow: 1
    }),
    d(4)
]));
write("(d4 d6 d8) D1 P1", group([
    d(4),
    d(6),
    d(8)
], {
    dropHigh: 1,
    dropLow: 1
}));
write("(2d6 2d8) P1", group([
    d(6),
    d(6),
    d(8),
    d(8)
], {
    dropHigh: 1
}));
write("4d6 P1", group([
    d(6),
    d(6),
    d(6),
    d(6)
], {
    dropHigh: 1
}));
