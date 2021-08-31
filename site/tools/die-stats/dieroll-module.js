/*global angular*/
(function () {
    // Calculate statistics that are based on other statistics
    function makeStatsComparitive(stats) {
        var deviationSquareSum;

        deviationSquareSum = 0;
        angular.forEach(stats.bySum, function (roll) {
            var deviation;

            roll.probability = roll.count / stats.totalPossibilities;
            roll.probabilityPercent = roll.probability * 100;
            roll.percentOfMax = 100 * roll.count / stats.maxFrequency;
            deviation = roll.sum - stats.average;
            deviationSquareSum += deviation * deviation * roll.count;
        });

        stats.stdDev = Math.sqrt(deviationSquareSum / stats.totalPossibilities);
    }


    // Calculate aggregate stats.  Nothing that's relative to other stats,
    // such as standard deviation.
    function makeStatsAggregate(stats) {
        var maxRoll, minRoll, totalPossibilities, maxFrequency, sum;

        totalPossibilities = 0;
        maxFrequency = 0;
        sum = 0;
        angular.forEach(stats.bySum, function (roll) {
            if (minRoll === undefined || roll.sum < minRoll) {
                minRoll = roll.sum;
            }

            if (maxRoll === undefined || roll.sum > maxRoll) {
                maxRoll = roll.sum;
            }

            if (roll.count > maxFrequency) {
                maxFrequency = roll.count;
            }

            totalPossibilities += roll.count;
            sum += roll.sum * roll.count;
        });
        stats.maxRoll = maxRoll;
        stats.minRoll = minRoll;
        stats.totalPossibilities = totalPossibilities;
        stats.maxFrequency = maxFrequency;
        stats.sum = sum;
        stats.average = sum / totalPossibilities;
    }

    function sumRolls(rollSets, modifier) {
        var die, resultHash, resultArray, rolls, setIndex, sum;

        resultHash = {};
        resultArray = [];

        for (setIndex = 0; setIndex < rollSets.length; setIndex += 1) {
            rolls = rollSets[setIndex];
            sum = 0;

            for (die = 0; die < rolls.length; die += 1) {
                sum += rolls[die];
            }

            sum += modifier;

            if (!resultHash[sum]) {
                resultHash[sum] = {
                    sum: sum,
                    count: 1
                };
                resultArray.push(resultHash[sum]);
            } else {
                resultHash[sum].count += 1;
            }
        }

        return resultArray.sort(function (a, b) {
            return a.sum - b.sum;
        });
    }

    function makeStatsFromRolls(rollSets, modifier) {
        var stats;

        stats = {};
        stats.bySum = sumRolls(rollSets, modifier);
        makeStatsAggregate(stats);
        makeStatsComparitive(stats);

        return stats;
    }

    function sortRolls(rollSets) {
        var i;

        function sorter(a, b) {
            return a - b;
        }

        for (i = 0; i < rollSets.length; i += 1) {
            rollSets[i].sort(sorter);
        }
    }

    function dropRolls(rollSets, start, end) {
        var rollIndex;

        for (rollIndex = 0; rollIndex < rollSets.length; rollIndex += 1) {
            rollSets[rollIndex] = rollSets[rollIndex].slice(start, end);
        }
    }

    function addDieToSets(rollSets, sides) {
        var dieValue, rollIndex, result;

        result = [];

        if (rollSets.length === 0) {
            for (dieValue = 1; dieValue <= sides; dieValue += 1) {
                result.push([dieValue]);
            }
        } else {
            for (dieValue = 1; dieValue <= sides; dieValue += 1) {
                for (rollIndex = 0; rollIndex < rollSets.length; rollIndex += 1) {
                    result.push(rollSets[rollIndex].concat(dieValue));
                }
            }
        }

        return result;
    }

    angular.module('dieroll', []).controller('DierollController', [
        '$scope',
        '$timeout',
        function ($scope, $timeout) {
            var timerPromise;

            $scope.dice = 3;
            $scope.sides = 6;
            $scope.dropLowest = 0;
            $scope.dropHighest = 0;
            $scope.modifier = 0;

            $scope.setRoll = function (dice, sides, dropLowest, dropHighest, modifier) {
                $scope.dice = dice;
                $scope.sides = sides;
                $scope.dropLowest = dropLowest || 0;
                $scope.dropHighest = dropHighest || 0;
                $scope.modifier = modifier || 0;
            };

            $scope.$watchCollection('[dice, sides, dropLowest, dropHighest, modifier]', function () {
                var allRollSets, rollsPerformed;

                function done() {
                    $scope.genStatus = 'done';
                }

                function makeStats() {
                    $scope.statistics = makeStatsFromRolls(allRollSets, $scope.modifier);

                    // Save memory
                    allRollSets = null;

                    return $timeout(done, 1);
                }

                // Remove the highest and lowest dice if desired
                function dropDice() {
                    var rollsLeft;

                    $scope.genStatus = 'dropping';

                    if ($scope.dropLowest || $scope.dropHighest) {
                        sortRolls(allRollSets);
                        rollsLeft = $scope.dice;
                    }

                    if ($scope.dropLowest) {
                        dropRolls(allRollSets, $scope.dropLowest, rollsLeft);
                        rollsLeft -= $scope.dropLowest;
                    }

                    if ($scope.dropHighest) {
                        dropRolls(allRollSets, 0, rollsLeft - $scope.dropHighest);
                    }

                     $timeout(makeStats, 1);
                }

                // Expand the roll sets by rolling another die for each
                // of the existing sets
                function rollADie() {
                    $scope.genStatus = 'rolling';
                    allRollSets = addDieToSets(allRollSets, $scope.sides);
                    rollsPerformed += 1;

                    if (rollsPerformed < $scope.dice) {
                        return $timeout(rollADie, 1);
                    }

                    return $timeout(dropDice, 1);
                }

                if (timerPromise) {
                    $timeout.cancel(timerPromise);
                    timerPromise = null;
                }

                allRollSets = [];
                rollsPerformed = 0;
                $scope.genStatus = 'delay';
                $scope.rollStats = {};
                timerPromise = $timeout(rollADie, 1000);
            });
        }
    ]);
}());
