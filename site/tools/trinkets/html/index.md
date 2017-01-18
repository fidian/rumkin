---
title: HTML Code Tester
js:
    - ../../../js/modules/auto-grow.js
    - ../../../js/modules/trusted-html.js
    - html.js
module: htmltest
summary: Try a snippet of HTMl live in your browser.
---

Type in HTML and see what it produces below.

<textarea class="wide ng-cloak w-100pct" ng-model="htmlData" auto-grow></textarea>

<div class="outline ng-cloak" ng-bind-html="htmlData | trustedHtml"></div>

