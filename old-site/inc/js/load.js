/* ***************************************************************************

Window.onload behavior has been a pain.  This file hijacks the window.onload
and you can add as many onload behaviors as you would like with onloadAdd().

The onload overloading was necessary with the dynamic JavaScript includer that
was written to allow object inheritence.  If you have object B and it depends
on object A, at the top of object B's source file you can simply use

	include('objectA.js');

Once all of the include() files are loaded, the window.onload events are fired.
See objects.js for further workarounds that need to get employed if you are
potentially referring to methods or objects that don't exist yet.

To get everything to work splendidly in your browser, you will want to add

	<script language="javascript" src="load.js"></script>

to load this file, then add

	<script language="javascript">
		function includeCallback() {
			include('objectB.js');
			onloadAdd(myFunctionToRun);
		}
	</script>
	
This ensures that the include() and onloadAdd() functions are called only after
they have been defined, guaranteeing success.  I like guaranteed success.

This has been tested in July 2008 and works with recent versions of
Firefox, IE, Opera, and Safari.  IE + objects + include() do not work well
together.

*************************************************************************** */

onloadQueue = [];

function onloadAdd(func) {
	if (typeof(func) == 'function') {
		onloadQueue.push(func);
	} else {
		onloadQueue.push(function() {
			eval(func);
		});
	}
}

// In case something has already set an onload handler.
if (window.onload) {
	onloadAdd(window.onload);
}

function onloadQueueProcess() {
	while (onloadQueue.length) {
		var loadFunc = onloadQueue.shift();
		loadFunc();
	}
}

window.onload = function() {
	// If there are other script files that need loading, start the process
	// to load them now
	if (typeof(includeCallback) != 'undefined') {
		includeCallback();
	}
	// If there are other includes loading, they will call onloadQueueProcess()
	// when they finish.  Otherwise, call it now.
	if (! includeIsLoading()) {
		onloadQueueProcess();
	}
}

var jsIncludeFiles = [];

function includeIsLoading() {
	for (var file in jsIncludeFiles) {
		if (jsIncludeFiles[file] == 'loading') {
			return true;
		}
	}
	return false;
}

function includeDone(thisObj) {
	// IE will pass the <script> node, Firefox and others pass the Event.
	if (thisObj.target) {
		// Event was passed, pick out the <script> node
		thisObj = thisObj.target;
	}
	if (jsIncludeFiles[thisObj.src]) {
		jsIncludeFiles[thisObj.src] = 'ready';
	}
	thisObj.parentNode.removeChild(thisObj);
	if (! includeIsLoading()) {
		onloadQueueProcess();
	}
}

// Include a JavaScript file.  Functions like include_once per PHP.
// Used a lot of information from Stoyan's blog:
// http://www.phpied.com/javascript-include-ready-onload/
function include(file) {
	var htmlElem = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');

	js.setAttribute('language', 'JavaScript');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);

	// On Firefox, js.src is the fully qualified URL, IE it stays verbatim
	if (jsIncludeFiles[js.src]) {
		return;
	}

	// IE
	js.onreadystatechange = function() {
		if (js.readyState == 'complete' || js.readyState == 'loaded') {
			includeDone(js);
		}
	}
	
	if (js.addEventListener) {
		// Everything that supports the DOM2 event model
		// This should cover Firefox, Opera 9.2 and Safari
		js.addEventListener('load', includeDone, false);
	} else {
		// This may work for other browsers, such as older Mozilla-based
		// ones and perhaps older Safari versions
		js.onload = includeDone;
	}

	jsIncludeFiles[js.src] = 'loading';
	
	htmlElem.appendChild(js);
}
