---
title: JS Chars
template: page.jade
js: /js/modules/auto-grow.js /js/futile.js js-chars.js
module: jsChars
---

Want to know the hex codes for unicode characters?  This will do it for you.  Just type and see what I mean.  When you type things in, you will see letters and numbers appear below this paragraph.  These things are the unicode hex codes for every character in the box above, including spaces, tabs, and newlines.

JavaScript deals with two-byte characters, so that's why "a" becomes "0061".

<div>
	<textarea auto-grow class="wide" ng-model="input"></textarea>
	<p>This is the character code of everything above.</p>
	<div class="outline" ng-bind="input | jsChars"></div>
</div>