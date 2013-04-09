---
title: Scoreboard
template: page.jade
js: /js/util.js scoreboard-controller.js
css: scoreboard.css
controller: ScoreboardController
---

King Boreas' Hall of Fame
-------------------------

Last Updated: April 7<sup>th</sup>, 2013 with number 196

[King Boreas] has a [scoreboard] that lists people who have helped him out with his various [geocaches].  He modeled it after the [9Key Hall of Fame], but he didn't have that cool image thing at the bottom, so I decided to see if I could write something similar without using any images.  If anyone wants to use this, feel free!  ([Licensing info])

[King Boreas]: http://www.geocaching.com/profile/?guid=3434ebbf-7b30-42c0-a876-24249b7c495e
[Scoreboard]: http://websports.8m.com/HTML/hall_of_fame-maintenance.html
[Geocaches]: http://www.geocaching.com/
[9Key Hall of Fame]: http://www.9key.com/hall_of_fame.asp
[Licensing Info]: /license.html

<div id="scoreboard">
	<div class="scoreboard_menu">
		<span class="scoreboard_link" ng-class="{scoreboard_active: top10}" ng-click="pickLink('top10')">Top 10</span>
		<span class="scoreboard_link" ng-class="{scoreboard_active: full}" ng-click="pickLink('full')">Full List</span>
		<span class="scoreboard_link" ng-class="{scoreboard_active: name}" ng-click="pickLink('name')">By Name</span>
	</div>
	<div class="scoreboard_content">
		<ol class="scoreboard_top10" ng-show="top10">
			<li ng-repeat="item in top10List">{{item.name}} = {{item.count}}</li>
		</ol>
		<ol ng-show="full">
			<li ng-repeat="item in fullList">{{item.name}} = {{item.count}}</li>
		</ol>
		<ul ng-show="name">
			<li ng-repeat="item in nameList">{{item.name}} = {{item.count}}</li>
		</ul>
	</div>
</div>
