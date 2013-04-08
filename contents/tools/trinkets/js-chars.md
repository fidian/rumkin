---
title: JS Chars
template: page.jade
js: /js/util.js js-chars-controller.js
controller: JsCharsController
---

Want to know the hex codes for unicode characters?  This will do it for you.  Just type and see what I mean.  When you type things in, you will see letters and numbers appear below this paragraph.  These things are the unicode hex codes for every character in the box above, including spaces, tabs, and newlines.

<textarea auto-grow class="wide" ng-model="input"></textarea>

This is the character code of everything above.

<div class="outline" ng-bind="output"></div>
