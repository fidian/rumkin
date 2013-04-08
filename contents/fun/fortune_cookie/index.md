---
title: Fortune Cookie
template: page.jade
js: fortunes.js fortune-controller.js
css: fortune.css
---

I collect fortune cookie sayings whenever I find them.  Here's one that has been picked just for you.

<div ng-controller="FortuneController">
	<div class="center fortune_cookie"><span ng-bind="current"></span></div>
	<button type="button" ng-click="another()">Want another?</button>
</div>
