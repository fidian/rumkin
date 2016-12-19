function addADie(allSets) {
    var out;

    out = {};

    function add(low, high, die, count) {
        var key;

        if (die > high) {
            low = high;
            high = die;
        } else if (die > low) {
            low = die;
        }

        key = high + ' ' + low;

        if (! out[key]) {
            out[key] = {
                lower: low,
                upper: high,
                count: 0
            };
        }

        out[key].count += count;
    }

    Object.keys(allSets).forEach(function (key) {
        var die, set;
        
        set = allSets[key];
        
        for (die = 1; die <= 10; die += 1) {
            add(set.lower, set.upper, die, set.count)
        }
    });

    return out;
}

function logResults(rolledDice, results) {
    var record, i;

    record = [];

    for (i = 0; i <= 20; i ++) {
        record[i] = 0;
    }

    record[0] = rolledDice;

    Object.keys(results).forEach(function (key) {
        var set;

        set = results[key];
        record[set.upper + set.lower] += set.count;
    });

    console.log(record.join(','));
}

var diceCount, result;

result = {
    '0 0': {
        lower: 0,
        upper: 0,
        count: 1
    }
};

console.log("Rolls,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20");

for (diceCount = 0; diceCount < 20; diceCount += 1) {
    result = addADie(result);
    logResults(diceCount + 1, result);
}

