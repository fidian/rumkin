function concatRolls(min, max, rolls) {
    var i, result;

    result = [];

    for (i = min; i <= max; i += 1) {
        result.push([
            i
        ].concat(rolls));
    }

    return result;
}

function d6(rolls) {
    return concatRolls(1, 6, rolls);
}

function runProcess(steps, rolls, result) {
    var nextSteps, stepResult;

    nextSteps = steps.slice(1);
    stepResult = steps[0](rolls, result);
   
    if (stepResult) {
        stepResult.forEach(function (nextRolls) {
            runProcess(nextSteps, nextRolls, result);
        });
    }
}

function sum(rolls) {
    var result;

    result = 0;
    rolls.forEach(function (roll) {
        result += roll;
    });

    return [
        [
            result
        ]
    ];
}

function tally(rolls, result) {
    if (result[rolls[0]]) {
        result[rolls[0]] += 1;
    } else {
        result[rolls[0]] = 1;
    }
}

var result;

result = {};
runProcess([
    d6,
    d6,
    d6,
    function (rolls) {
        var sum;

        sum = 0;
        rolls.forEach(function (roll) {
            sum += roll;
        });
        if (sum >= 11) {
            // subtract 1d9-1
            return concatRolls(-8, 0, rolls);
        } else {
            // Add 1d9-1
            return concatRolls(0, 8, rolls);
        }
    },
    sum,
    tally
], [], result);
console.log(result);
