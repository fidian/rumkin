---
title: Rainbow Text Generator
template: page.jade
js: /js/util.js /js/angular/angular.min.js /js/directives/auto-grow.js rainbow-controller.js
controller: RainbowController
module: rainbow
---

Enter in anything that you want converted into a rainbow.  It will gently fade from letter to letter.  Then, you can copy the generated HTML into your web page.

<input type="text" ng-model="input" class="wide">

This is the result:

<p class="outline"><b ng-bind-html-unsafe="output"></b></p>

And here's the HTML in case you like what you see:

<div class="outline" ng-bind="output"></div>
