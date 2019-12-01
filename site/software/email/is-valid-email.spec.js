const isValidEmail = require('./is-valid-email');
const scenarios = require('./scenarios.json');
const test = require('ava');

scenarios.forEach((scenario) => {
    if (scenario.valid) {
        test(`allows ${scenario.email}`, t => {
            t.is(isValidEmail(scenario.email), true);
        });
    } else {
        test(`blocks ${scenario.email}`, t => {
            t.is(isValidEmail(scenario.email), false);
        });
    }
});
