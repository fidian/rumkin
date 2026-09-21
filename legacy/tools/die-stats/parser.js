const InputTracker = require("./input-tracker");

module.exports = class Parser {
    parse(input) {
        const tracker = new InputTracker(input);

        const result = this.roll(tracker);

        if (tracker.peek() !== "") {
            throw new Error(
                `Extra unparseable information: ${tracker.getRemainder()}`
            );
        }

        return result;
    }

    digit(tracker) {
        let result = "";
        let c = tracker.peek();

        while (c >= "0" && c <= "9") {
            result += c;
            tracker.next();
            c = tracker.peek();
        }

        if (result.length === 0) {
            throw new Error(
                `Expecting a digit, found non-digit characters: ${tracker.getRemainder()}`
            );
        }

        return +result;
    }

    // 1*DIGIT "d" 1*DIGIT
    die(tracker) {
        const number = this.digit(tracker);

        if (number <= 0) {
            throw new Error(`Only positive numbers allowed for the number of dice`);
        }

        if (tracker.peek() !== "d") {
            throw new Error(`Expecting "d", found: ${tracker.getRemainder()}`);
        }

        tracker.next();
        const sides = this.digit(tracker);

        if (sides <= 0) {
            throw new Error(`Only positive numbers allowed for the number of sides of dice`);
        }

        return {
            number,
            sides
        };
    }

    // (DIE / "(" ROLL ")") [DROP] [PENALTY] [BONUS]
    group(tracker) {
        const group = {};

        if (tracker.peek() === "(") {
            tracker.next();
            group.roll = this.roll(tracker);

            if (tracker.peek() !== ")") {
                throw new Error(
                    `Expecting ")", found: ${tracker.getRemainder()}`
                );
            }

            tracker.next();
        } else {
            group.die = this.die(tracker);
        }

        if (tracker.peek() === "D") {
            tracker.next();
            group.drop = this.digit(tracker);

            if (group.drop <= 0) {
                throw new Error('Only positive numbers allowed for the number of dice to drop');
            }
        }

        if (tracker.peek() === "P") {
            tracker.next();
            group.penalty = this.digit(tracker);

            if (group.drop <= 0) {
                throw new Error('Only positive numbers allowed for the number of dice to remove as a penalty');
            }
        }

        const c = tracker.peek();

        if (c === "+") {
            tracker.next();
            group.bonus = this.digit(tracker);
        } else if (c === "-") {
            tracker.next();
            group.bonus = -this.digit(tracker);
        }

        return group;
    }

    // GROUP *("," GROUP)
    roll(tracker) {
        const result = [];
        result.push(this.group(tracker));

        while (tracker.peek() === ",") {
            tracker.next();
            result.push(this.group(tracker));
        }

        return result;
    }
};
