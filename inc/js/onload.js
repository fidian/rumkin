// How to use a cross-browser onload overloading

var onload_ran = 0;
function myThingie_onload() {
	if (onload_ran) return;
	onload_ran = 1;

	// do your stuff here

	if (myThingie_old_onload && myThingie_old_onload != null) {
		myThingie_old_onload();
	}
}

// Special tag for IE
document.write('<script id="__init_script" defer="true" src="//[]"><\/script>');

myThingie_old_onload = null;
myThingie_init = 0;

if (document.addEventListener) {
	// Mozilla
	document.addEventListener("DOMContentLoaded", myThingie_onload, false);
	myThingie_init = 1;
}
if (myThingie_init == 0 && document.getElementById) {
	// IE
	var deferScript = document.getElementById('__init_script');
	if (deferScript) {
		deferScript.onreadystatechange = function() {
			if (this.readyState == 'complete') {
				// Needed to add tiny delay for IE
				window.setTimeout('myThingie_onload()', 100);
				this.onreadystatechange = ''
			}
		};

		/* check whether script has already completed */
		deferScript.onreadystatechange();

		/* clear reference to prevent leaks in IE */
		deferScript = null;

		myThingie_init = 1;
	}
}
if (myThingie_init == 0) {
	// Other browsers
	myThingie_old_onload = window.onload;
	window.onload = myThingie_onload;
	myThingie_init = 1;
}

