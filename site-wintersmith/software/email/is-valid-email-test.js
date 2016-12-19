#!/usr/bin/env node

var fail, isValidEmail, names, pass, scenarios;

isValidEmail = require('./is-valid-email');

names = process.argv.slice(2);

if (names.length) {
    names.forEach(function (name) {
        console.log(name, isValidEmail(name));
    });
} else {
    scenarios = require('./scenarios.json');
    pass = 0;
    fail = 0;
    scenarios.forEach(function (scenario) {
        var actual;
        
        actual = isValidEmail(scenario.email);
        if (actual === scenario.valid) {
            pass += 1;
        } else {
            fail += 1;
            console.log("Expected", scenario.email, "to return", scenario.valid);
        }
    });
    console.log('Pass:', pass);
    console.log('Fail:', fail);
}
