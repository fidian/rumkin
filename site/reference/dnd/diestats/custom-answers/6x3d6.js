var rolls, weights, summary, total;

rolls = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ];
weights = {
    3: 1,
    4: 3,
    5: 6,
    6: 10,
    7: 15,
    8: 21,
    9: 25,
    10: 27,
    11: 27,
    12: 25,
    13: 21,
    14: 15,
    15: 10,
    16: 6,
    17: 3,
    18: 1
};
summary = {
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0
};

rolls.forEach(function (roll1) {
    console.log(roll1);
    rolls.forEach(function (roll2) {
        rolls.forEach(function (roll3) {
            rolls.forEach(function (roll4) {
                rolls.forEach(function (roll5) {
                    rolls.forEach(function (roll6) {
                        var best, totalWeight;

                        totalWeight = weights[roll1] * weights[roll2] * weights[roll3] * weights[roll4] * weights[roll5] * weights[roll6];
                        best = Math.max(roll1, roll2, roll3, roll4, roll5, roll6);

                        summary[best] += totalWeight;
                    });
                });
            });
        });
    });
});

console.log(summary);

total = 0;
rolls.forEach(function (roll) {
    total += summary[roll];
});
console.log("total: " + total);
rolls.forEach(function (roll) {
    console.log(roll + ": " + (summary[roll] / total));
});
