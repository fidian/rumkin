---
title: Passwords
controller: password
module: password
js:
    - ../../js/auto-grow.js
    - ../../js/md5.min.js
    - password-strength.js
    - password-module.js
---

If you use a computer, you more than likely have a password or a passphrase.  Security is something that people often don't take seriously enough.  Because of this, I have created a couple tools that help to make things simpler.


Password Strength
-----------------

Want to see some score about the quality of your current password? Just type it in here. Nothing is sent to my server. Also, the source code to this password checker [is on GitHub](https://github.com/tests-always-included/password-strength). In case you are interested in the math behind this tool, there's an [explanation of the calculation](https://github.com/tests-always-included/password-strength/blob/master/doc/entropy-seems-wrong.md) and another explanation about the [strength levels and estimated cracking time](https://github.com/tests-always-included/password-strength/blob/master/doc/strength-levels.md).

<div ng-if="!ready">
    Loading necessary files.
</div>
<div ng-if="ready">
    <div>
        <label><input type=checkbox ng-model="isVisible"> Show password</label>
    </div>
    <input ng-show="!isVisible" type="password" ng-model="passwordToTest" placeholder="Password or passphrase" class="W(100%)">
    <input ng-show="isVisible" type="text" ng-model="passwordToTest" placeholder="Password or passphrase" class="W(100%)">
    <div password-strength="passwordToTest" class="result">
        <div ng-if="!strengthScore">
            Enter a password or passphrase to analyze.
        </div>
        <div ng-if="strengthScore">
            <div ng-if="strengthScore.commonPassword" class="Fw(b)">
                <span class="Tt(u)">Warning:</span> This is a common password!
            </div>
            <div>
                <span ng-if="strengthScore.strengthCode == 'VERY_WEAK'">
                    <span class="Tt(u) Fw(b)">Very weak password!</span> There's only
                </span>
                <span ng-if="strengthScore.strengthCode == 'WEAK'">
                    The password is weak and can be cracked or guessed easily. It provides
                </span>
                <span ng-if="strengthScore.strengthCode == 'REASONABLE'">
                    Your password seems to be fairly good with
                </span>
                <span ng-if="strengthScore.strengthCode == 'STRONG'">
                    You have a strong password and it supplies approximately
                </span>
                <span ng-if="strengthScore.strengthCode == 'VERY_STRONG'">
                    This password is very strong, with about
                </span>
                <span ng-bind="strengthScore.trigraphEntropyBits | number"></span> bits of entropy.
            </div>
            <div>
                Suggestions for improvement:
                <ul>
                    <li>Make the passphrase longer.</li>
                    <li ng-if="!strengthScore.charsets.lower">Add lowercase letters.</li>
                    <li ng-if="!strengthScore.charsets.upper">Add uppercase letters.</li>
                    <li ng-if="!strengthScore.charsets.punctuation">Add punctuation.</li>
                    <li ng-if="!strengthScore.charsets.symbol">Add symbols, such as ones use for math.</li>
                    <li ng-if="!strengthScore.charsets.number">Add numbers.</li>
                </ul>
            </div>
        </div>
    </div>
</div>


Diceware
--------

A method was created to generate passphrases with a lookup table and some dice, called [Diceware](http://world.std.com/~reinhold/diceware.html). The form below does the same thing for you, allowing you to skip looking up words on a 30+ page list. The point of this method is to make a random passphrase that could also be memorable.

<div ng-if="ready">
    <div>
        <select ng-model="dicewareWordlist" ng-options="item as item.optionLabel for item in dicewareWordlists"></select>
    </div>
    <div diceware="dicewareWordlist">
        <div>
            <button ng-disabled="!dicewareReady" ng-click="addWord()">Add a word</button>
            <button ng-disabled="!dicewareReady" ng-click="clear()">Clear</button>
        </div>
        <div class="result" ng-bind="dicewareResult"></div>
    </div>
</div>


Password Generator
------------------

If the Diceware section doesn't satisfy your needs, this one should. It's far more flexible. Unfortunately that also makes it a bit more complex.


MD5 Hash Generator
------------------

Calculate the MD5 checksum of a bit of text, password, or whatever you like.  Runs in your browser and nothing is sent back to me.

<div>
    <textarea auto-grow ng-model="md5Input" class="W(100%)"></textarea>
    <div md5="md5Input" class="result">
        MD5: <code ng-bind="md5"></code>
    </div>
</div>

