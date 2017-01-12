---
title: The Great JavaScript Marquee Generator
js:
    - generator.js
    - depends/random.js
    - depends/range.js
    - depends/repeat.js
    - hide/backspace.js
    - hide/explode.js
    - hide/fly-off.js
    - hide/none.js
    - hide/slide-left.js
    - hide/slide-right.js
    - show/cryptography.js
    - show/implode.js
    - show/none.js
    - show/slam.js
    - show/slide-left.js
    - show/slide-right.js
    - show/typing.js
css: generator.css
module: generator
---

This JavaScript marquee generator will create the JavaScript for you to include into your web pages.  It is fairly painless.  Just select your method and fill in the boxes.  When you press "Generate" it will show you the results and also demonstrate the marquee in your browser.

The places you can send the marquee are an element, any input area, the window's title or the status bar of the window.  Currently the status bar is pretty much obsolete and browsers do not let you change it, but the others work.

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
		Delay after showing:
		<input type="text" ng-model="readDelay" value="3000" class="short" />
	</div>
	<div generator-method="hideMethodList" callback="setHideMethod(method)" label="'Method for hiding:'"></div>
	<div>
		Delay after hiding:
		<input type="text" ng-model="betweenDelay" value="1000" class="short" />
	</div>
	<div>
		<h3>
			Demo of this message (loops continually)
		</h3>
		<input type="text" disabled="disabled" class="long" generator-demo="preview" />
	</div>
	<div>
        <h3>
            Build your sequence of messages
        </h3>
		<button ng-click="addConfig(preview[0])">Add This Message</button>
	</div>
	<div ng-show="animationList.length">
		<h3>
			Animations
		</h3>
        <ul ng-repeat="animation in animationList">
            <li ng-bind="animation.message"></li>
		</ul>
		<div>
			<h2>
				Demo of the animation:
			</h2>
			<input type="text" disabled="disabled" class="long" generator-demo="animationList" />
		</div>
		<h3>
			Generated Code Options
		</h3>
        <div>
            The generated code should
            <select ng-model="repeat">
                <option value="">Pick One</option>
                <option value="yes">loop forever.</option>
                <option value="no">display only once.</option>
            </select>
        </div>
        <div>
            Write to
            <select ng-model="writeMethod">
                <option value="">Pick One</option>
                <option value="window.status">window.status</option>
                <option value="jQuery.text">jQuery.text</option>
                <option value="function">Call a function</option>
            </select>
            <div ng-show="writeMethod == 'window.status'">
                Warning:  This method is blocked by most browsers.
            </div>
            <div ng-show="writeMethod == 'jQuery.text'">
                Element selector:  <input type=text ng-model="writeMethodExtra" /><br />
                Result:  <tt><code>$({{writeMethodExtra | json}}).text("message goes here");</code></tt>
            </div>
            <div ng-show="writeMethod == 'function'">
                Name of function to call:  <input type=text ng-model="writeMethodExtra" /><br />
                Sample call:  <tt><code>{{writeMethodExtra}}("message goes here");</code></tt>
            </div>
        </div>
    </div>
    <div ng-show="generatedCode">
            <h3>
                Result
            </h3>
            <pre><code ng-bind="generatedCode"></code></pre>
        </div>
	</div>
</div>
<script type="text/ng-template" id="method">
	{{label}} <select ng-model="method" ng-options="methodObj.title for (key, methodObj) in methodList">
	</select>
	<div ng-show="method" class="methodDetail">
		<div ng-bind="method.description" class="description"></div>
		<div class="variables" ng-show="method.variables">
			<div class="variable" ng-repeat="variable in method.variables">
				<span ng-bind="variable.name"></span>:
				<input type="text" ng-model="variable.currentValue" class="short" ng-change="sendUpdate()" />
				<span ng-bind="variable.description" class="description"></span>
			</div>
		</div>
	</div>
</script>
