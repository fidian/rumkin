---
title: The Great JavaScript Marquee Generator
template: index.jade
js: /js/angular.min.js generator.js depends/random.js depends/range.js depends/repeat.js hide/backspace.js hide/explode.js hide/fly-off.js hide/none.js hide/slide-left.js hide/slide-right.js show/cryptography.js show/implode.js show/none.js show/slam.js show/slide-left.js show/slide-right.js show/typing.js
css: generator.css
module: generator
---

This JavaScript marquee generator will create the JavaScript for you to include into your web pages.  It is fairly painless.  Just select your method and fill in the boxes.  When you press "Generate" it will show you the results and also perform the marquee in your browser.

The places you can send the marquee are an element, any input area, the window's title or the status bar of the window.  Currently the status bar is pretty much obsolete and browsers do not let you change it.

Delays are in milliseconds.  There are 1000 in a single second.  A value of 10 is *very* fast and 2000 seconds is really slow.

<div generator class="generator">
	<h3>
		Customise your message
	</h3>
	<div>
		<input type="text" ng-model="message" placeholder="Write your message here" class="long" />
	</div>
	<div generator-method="showMethodList" callback="setShowMethod(method)" label="'Method for showing:'"></div>
	<div>
		Delay for reading:
		<input type="text" ng-model="readDelay" value="3000" class="short" />
	</div>
	<div generator-method="hideMethodList" callback="setHideMethod(method)" label="'Method for hiding:'"></div>
	<div>
		Delay after animation:
		<input type="text" ng-model="betweenDelay" value="1000" class="short" />
	</div>
	<div>
		<h3>
			Demo of this message
		</h3>
		<input type="text" disabled="disabled" class="long" generator-demo="preview" />
	</div>
	<div>
		<button ng-click="addConfig">Add This Step</button>
		<label>
			<input type="checkbox" ng-mode="repeat" />
			Loop forever?
		</label>
	</div>
	<div ng-show="animationList.length">
		<h3>
			Animations
		</h3>
		<div ng-repeat="animation in animationList">
		</div>
		<div>
			<h2>
				Demo of the animation:
			</h2>
			<input type="text" disabled="disabled" class="long" generator-demo="animationList" />
		</div>
	</div>
</div>
<script type="text/ng-template" id="method">
	<select ng-model="method" ng-options="methodObj.title for (key, methodObj) in methodList">
		<option value="" ng-bind="label"></option>
	</select>
	<div ng-show="method" class="methodDetail">
		<div ng-bind="method.description" class="description"></div>
		<div class="variables" ng-show="method.variables">
			<div class="variable" ng-repeat="variable in method.variables">
				<span ng-bind="variable.name"></span>:
				<input type="text" ng-model="variable.currentValue" class="short" />
				<span ng-bind="variable.description" class="description"></span>
			</div>
		</div>
	</div>
</script>
