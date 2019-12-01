#!/usr/bin/env node

var isValidEmail, scenarios;

isValidEmail = require("./is-valid-email");
scenarios = require("./scenarios.json");

describe("is-valid-email", () => {
    scenarios.forEach((scenario) => {
        if (scenario.valid) {
            it(`allows ${scenario.email}`, () => {
                expect(isValidEmail(scenario.email)).toBe(true);
            });
        } else {
            it(`blocks ${scenario.email}`, () => {
                expect(isValidEmail(scenario.email)).toBe(false);
            });
        }
    });
});
