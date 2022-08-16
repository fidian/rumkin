const Rolls = require("./rolls");

module.exports = class Roller {
    constructor() {
        this.callback = null;
        this.statusCallback = null;
        this.startingStepCount = 0;
        this.currentStepNumber = 0;
        this.steps = [];
        this.timeout = null;
        this.results = [];
    }

    status(step) {
        this.statusCallback(step.message);
    }

    calculate(parsed, callback, statusCallback) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.callback = callback;
        this.statusCallback = statusCallback;
        this.steps = [];
        this.results = this.createSteps(parsed);
        this.scheduleNextStep();
    }

    hasDropsOrPenalties(item) {
        return item.drop || item.penalty;
    }

    dropPenaltyBonus(prevRolls, item) {
        if (!this.hasDropsOrPenalties) {
            prevRolls.adjustBonus(item.bonus);

            return prevRolls;
        }

        const result = prevRolls.fork();
        result.adjustBonus(item.bonus + prevRolls.getBonus());
        const drop = item.drop || 0;
        const penalty = item.penalty || 0;
        prevRolls.forEach((rolls, count) => {
            for (let i = 0; i < drop; i += 1) {
                rolls.shift();
            }

            for (let i = 0; i < penalty; i += 1) {
                rolls.pop();
            }

            result.add(rolls, count);
        });

        return result;
    }

    createSteps(parsed) {
        const groupResults = [];

        for (const item of parsed) {
            if (item.roll) {
                this.createStepsSubgroup(groupResults, item);
            } else {
                this.createStepsDieRoll(groupResults, item);
            }
        }

        return groupResults;
    }

    createStepsSubgroup(groupResults, item) {
        // Make the subgroup, then combine those as single rolls.
        // E.g. (1d2,1d2) would generate
        // [{Rolls:1x1,2x1},{Rolls:1x1,2x1}].
        // Multiply them together and combine the counts, resulting in
        // {Rolls:1+1x1, 1+2x2, 2+2x1}
        const itemRolls = this.createSteps(item.roll);
        let rolls;
        this.addStep('Merging group', () => {
            rolls = this.combineRolls(itemRolls);
        });
        this.addStep('Handling drops, penalties, and bonuses', () => {
            const modified = this.dropPenaltyBonus(rolls, item);
            groupResults.push(modified);
        });
    }

    rollDie(sides) {
        const result = new Rolls();

        for (let n = 1; n <= sides; n += 1) {
            result.add([n], 1);
        }

        return result;
    }

    createStepsDieRoll(groupResults, item) {
        const dice = [];
        const sides = item.die.sides;
        const number = item.die.number;
        this.addStep(`Rolling dice: ${number}d${sides}`, () => {
            while (dice.length < number) {
                dice.push(this.rollDie(item.die.sides));
            }
        });

        for (let n = 1; n < number; n += 1) {
            this.addStep(`Merging ${n}d${sides} into ${n + 1}d${sides}`, () => {
                const a = dice.shift();
                const b = dice.shift();
                const merged = a.mergeWith(b);

                if (this.hasDropsOrPenalties(item)) {
                    dice.unshift(merged);
                } else {
                    const consolidated = merged.consolidate();
                    dice.unshift(consolidated);
                }
            });
        }

        this.addStep(`Handling drops, penalties, and bonuses`, () => {
            const rolls = dice[0] || new Rolls();
            const modified = this.dropPenaltyBonus(rolls, item);
            groupResults.push(modified);
        });
    }

    combineRolls(rollsArray) {
        let result = rollsArray.shift();
        result = result.consolidate();

        while (rollsArray.length) {
            let next = rollsArray.shift();
            next = next.consolidate();
            result = result.mergeWith(next);
        }

        return result;
    }

    scheduleNextStep() {
        if (this.steps.length) {
            const step = this.steps.shift();
            this.status(step);
            this.currentStepNumber += 1;
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.stepResult = step.stepFn();
                this.scheduleNextStep();
            }, 100);
        } else {
            this.completeResults();
        }
    }

    completeResults() {
        // Generate stats and combine
        let rolls = this.combineRolls(this.results);
        rolls = rolls.consolidate(true); // Final consolidation, include bonus
        let sum = 0;
        let minRolls = Number.POSITIVE_INFINITY;
        let maxRolls = Number.NEGATIVE_INFINITY;
        let minCount = Number.POSITIVE_INFINITY;
        let maxCount = Number.NEGATIVE_INFINITY;
        let totalRolls = 0;
        rolls.forEach((r, count) => {
            const value = r[0];
            sum += value * count;
            totalRolls += count;
            minRolls = Math.min(minRolls, value);
            maxRolls = Math.max(maxRolls, value);
            minCount = Math.min(minCount, count);
            maxCount = Math.max(maxCount, count);
        });
        const avg = sum / totalRolls;
        let stdDevTotal = 0;
        rolls.forEach((r, count) => {
            const value = r[0];
            stdDevTotal += Math.abs(value - avg) * count;
        });
        this.callback({
            avg,
            maxCount,
            maxRolls,
            minCount,
            minRolls,
            rolls,
            stdDev: stdDevTotal / totalRolls,
            stdDevTotal,
            sum,
            totalRolls
        });
    }

    addStep(message, stepFn) {
        this.steps.push({
            message,
            stepFn
        });
    }
};
