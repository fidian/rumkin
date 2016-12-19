#!/usr/bin/env node

function sortNumeric(a, b) {
    return a - b;
}

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

// two distinct dice
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

// Same die's results merged
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

// Builds a key out of this roll's distinct parts, not including
// things that could change when merged with another roll.
function buildRollKey(roll) {
    return roll.sum + " " + roll.dropLowRolls.join(",") + " " + roll.dropHighRolls.join(",");
}

function combineRollSets(firstRollSet, secondRollSet) {
    var firstIndex, result, roll, rollKey, rollMap, secondIndex;
    
    result = [];
    rollMap = {};

    console.log(firstRollSet.length, secondRollSet.length, firstRollSet.length * secondRollSet.length);

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
        result = combineRollSets(result, rollSet[0]);
    }

    return result;
}

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
