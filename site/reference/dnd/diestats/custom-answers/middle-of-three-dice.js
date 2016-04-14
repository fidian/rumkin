// Drops the middle valued roll of three dice

var i, j, k, result, roll;

result = {};

for (i = 1; i <= 6; i += 1) {
    for (j = 1; j <= 6; j += 1) {
        for (k = 1; k <= 6; k += 1) {
            roll = Math.max(i, j, k) + Math.min(i, j, k);

            if (! result[roll]) {
                result[roll] = 1;
            } else {
                result[roll] += 1;
            }
        }
    }
}

console.log(result);
