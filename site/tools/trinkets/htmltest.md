---
title: HTML Code Tester
template: page.jade
js: /js/modules/auto-grow.js
module: autoGrow
---

Type in HTML and see what it produces below.

<textarea class="wide ng-cloak" ng-model="htmlData" auto-grow></textarea>

<div class="outline ng-cloak" ng-bind-html-unsafe="htmlData"></div>

