#!/usr/bin/env php
<?php

require('email-regexp.php.txt');
require('email-test.php.txt');

function testScenarios($fn, $scenarios) {
    $pass = 0;
    $fail = 0;

    foreach ($scenarios as $scenario) {
        $actual = $fn($scenario->email);

        if ($scenario->valid == $actual) {
            $pass += 1;
        } else {
            $fail += 1;
        }
    }

    echo "$fn\n";
    echo "Pass: $pass\nFail: $fail\n";
}
$scenarios = file_get_contents('scenarios.json');
$scenarios = json_decode($scenarios);

testScenarios('is_valid_email', $scenarios);
echo "\n";
testScenarios('is_valid_email_regexp', $scenarios);
