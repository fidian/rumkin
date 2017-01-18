---
title: Rainbow Text Generator
js:
    - ../../../js/modules/auto-grow.js
    - rainbow.js
module: rainbow
---

Enter in anything that you want converted into a rainbow.  It will gently fade from letter to letter.  Then, you can copy the generated HTML into your web page.

<div rainbow>
	<input type="text" ng-model="input" class="w-100pct">

	<p>This is the result:</p>

	<p class="outline"><b ng-bind-html="outputSafe"></b></p>

	<p>And here's the HTML in case you like what you see:</p>

	<code class="wrap"><small ng-bind="output"></small></code>
</div>


