#!/usr/bin/env node

const Parser = require("./parser");
const Roller = require("./roller");
const parser = new Parser();
const roller = new Roller();

// Make sure you do these calculations BY HAND
const tests = [
    [
        "1d2",
        {
            1: 1,
            2: 1
        }
    ],
    [
        "2d4-2",
        {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 3,
            5: 2,
            6: 1
        }
    ],
    [
        "(1d6,1d6)D1",
        {
            1: 1,
            2: 3,
            3: 5,
            4: 7,
            5: 9,
            6: 11
        }
    ],
    [
        "(1d6,1d6)P1",
        {
            1: 11,
            2: 9,
            3: 7,
            4: 5,
            5: 3,
            6: 1
        }
    ],
    [
        "(2d4,1d8+1,1d10)D1P1",
        {
            2: 24 + 2 * 2 + 2 * 3 + 2 * 4 + 2 * 3 + 2 * 2 + 2,
            3: 14 + 36 * 2 + 4 * 3 + 4 * 4 + 4 * 3 + 4 * 2 + 4,
            4: 12 + 12 * 2 + 44 * 3 + 6 * 4 + 6 * 3 + 6 * 2 + 6,
            5: 10 + 10 * 2 + 10 * 3 + 48 * 4 + 8 * 3 + 8 * 2 + 8,
            6: 8 + 8 * 2 + 8 * 3 + 8 * 4 + 48 * 3 + 10 * 2 + 10,
            7: 6 + 6 * 2 + 6 * 3 + 6 * 4 + 6 * 3 + 44 * 2 + 12,
            8: 4 + 4 * 2 + 4 * 3 + 4 * 4 + 4 * 3 + 4 * 2 + 36,
            9: 2 + 2 * 2 + 2 * 3 + 2 * 4 + 2 * 3 + 2 * 2 + 2
        }
    ]
];

function compare(a, b) {
    const aType = typeof a;
    const bType = typeof b;

    if (aType !== bType) {
        return false;
    }

    if (aType === "object") {
        const bKeys = new Set(Object.keys(b));

        for (const key of Object.keys(a)) {
            if (!bKeys.has(key)) {
                return false;
            }

            bKeys.delete(key);

            if (!compare(a[key], b[key])) {
                return false;
            }
        }

        if (bKeys.size) {
            return false;
        }

        return true;
    }

    return a === b;
}

function finalCheck(str, expected, final) {
    const actual = final.rolls.snapshot().map;

    if (compare(expected, actual)) {
        console.log(`${str}: pass`);
    } else {
        console.log(`${str}: FAIL`);
        console.log("Expected:", expected);
        console.log("Actual:", actual);
    }

    runNext();
}

function confirm(str, expected) {
    const parsed = parser.parse(str);
    roller.calculate(
        parsed,
        (actual) => finalCheck(str, expected, actual),
        () => {}
    );
}

function runNext() {
    const t = tests.shift();

    if (t) {
        confirm(t[0], t[1]);
    }
}

runNext();
