---
title: HTML Code Tester
template: page.jade
---

Type in HTML and see what it produces below.

<textarea class="wide" ng-model="htmlData" ui-jq="autosize"></textarea>

<div class="outline" ng-bind-html-unsafe="htmlData"></div>

