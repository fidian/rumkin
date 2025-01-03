module.exports = class Rolls {
    constructor() {
        this.map = new Map();
        this.bonus = 0;
    }

    add(rolls, count) {
        const keyArray = rolls.slice();
        keyArray.sort((a, b) => a - b).map((n) => n.toString());
        const key = keyArray.join(",");

        this.map.set(key, count + (this.map.get(key) || 0));
    }

    count() {
        return this.map.size;
    }

    forEach(cb) {
        for (const [k, v] of this.map.entries()) {
            const rolls = k.split(",").map((n) => +n);
            cb(rolls, v);
        }
    }

    sums() {
        const result = new Rolls();

        this.forEach((rolls, count) => {
            let sum = 0;

            for (const roll of rolls) {
                sum += roll;
            }

            result.add([sum + this.bonus], count);
        });

        return result;
    }

    adjustBonus(n) {
        this.bonus += +n || 0;
    }

    getBonus() {
        return this.bonus;
    }

    fork() {
        const result = new Rolls();
        result.adjustBonus(this.bonus);

        return result;
    }

    mergeWith(other) {
        const merged = this.fork();

        this.forEach((thisValues, thisCount) => {
            other.forEach((otherValues, otherCount) => {
                merged.add(
                    [...thisValues, ...otherValues],
                    thisCount * otherCount
                );
            });
        });

        return merged;
    }

    // Only include bonus on the last consolidation
    consolidate(includeBonus = false) {
        const consolidated = new Rolls(); // Don't fork, don't inherit bonus

        this.forEach((values, count) => {
            let sum = this.bonus;

            if (includeBonus) {
                sum += this.bonus;
            }

            for (const v of values) {
                sum += v;
            }

            consolidated.add([sum], count);
        });

        return consolidated;
    }

    snapshot() {
        return {
            bonus: this.bonus,
            map: Object.fromEntries(this.map)
        };
    }
};
