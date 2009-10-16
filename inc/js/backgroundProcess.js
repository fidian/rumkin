/* ***************************************************************************

Run tasks in the background.  It will repeatedly call a "workCallback" function
for one second, then schedule a window.setTimeout() to call the object
again after a brief delay.  This way the browser will not give you an error
saying that you have an unresponsive script, the browser will respond to your
actions, and everything is just better overall.

To use, create a new object that extends this one.  For the reasoning behind
eval, see objects.js.

	include('objects.js');  // So you can inherit from this object.
	function myWorker() {
		eval('this.xtends(new backgroundProcess);');
		this.workCallback = function() {
			// Do the work here.  This function will get called
			// repeatedly.  Make this do just one single task as quickly
			// as possible.
			// Return false to continue processing.
			return false;
		};
		// and so on, defining statusCallback and doneCallback
		eval('this.start();');  // Kick off the process
	}
	
*************************************************************************** */

function backgroundProcess() {
	this.workCallback = function() {
		// Override this!
		// Return false to continue processing.
	};
	this.statusCallback = function() {
		// Override if you like, called once each work loop
	};
	this.doneCallback = function() {
		// Override if you want to actually do something when you are done
	};
	this.workRunTime = 1000;  // In milliseconds
	this.getMilliseconds = function() {
		var d = new Date();
		return d.getTime();
	};
	this.doWork = function() {
		var d = this.getMilliseconds() + this.workRunTime;
		while (this.getMilliseconds() < d) {
			if (this.workCallback()) {
				this.doneCallback();
				return;
			}
		}
		this.statusCallback();
		this.start();
	};
	this.start = function() {
		var x = this;
		// Leave enough time so that the browser can respond to other requests
		window.setTimeout(function(){x.doWork();}, 150);
	};
}
