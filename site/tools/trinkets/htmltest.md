---
title: HTML Code Tester
template: page.jade
js: /js/modules/auto-grow.js /js/modules/trusted-html.js htmltest.js
module: htmltest
---

Type in HTML and see what it produces below.

<textarea class="wide ng-cloak w-100pct" ng-model="htmlData" auto-grow></textarea>

<div class="outline ng-cloak" ng-bind-html="htmlData | trustedHtml"></div>

