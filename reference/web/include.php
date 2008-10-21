<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Including JavaScript Dynamically',
		     'topic' => 'web'));
?>

<p>I wanted a way to make individual files for JavaScript classes and have
them automatically load their parents without the web page having to know
in advance all of the JavaScript includes that needed to be made.</p>

<p>I failed.  But just for the class inheritance.  I did write code that worked
in the major browsers, which included JavaScript files dynamically.  They also
fired onload events so I could tell when everything was finally loaded.</p>

<?PHP MakeBoxTop('center'); ?><pre>
var jsIncludeFiles = [];

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

// Called when an include file has loaded
function includeDone(thisObj) {
	// IE will pass the script node, Firefox and others pass the Event.
	if (thisObj.target) {
		// Event was passed, pick out the script node
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

function includeIsLoading() {
	for (var file in jsIncludeFiles) {
		if (jsIncludeFiles[file] == 'loading') {
			return true;
		}
	}
	return false;
}
</pre><?PHP MakeBoxBottom(); ?>

<p>This code is freely made available to everyone in case they can use it.
Please suggest improvements.</p>

<?PHP

StandardFooter();