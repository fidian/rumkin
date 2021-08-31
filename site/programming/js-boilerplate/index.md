---
title: Best JavaScript Boilerplate
summary: The ES5 starting template for a JavaScript object that I am personally fond of.  It allows for use in Node.js as well as in a browser, plus it works with a wide variety of module loading systems.
---

I'm writing JavaScript objects and I keep refining how I am creating objects in order to have cleaner code, stand behind community standards, remove potential problems and attempt to be more maintainable.  Here is my boilerplate code for a new JavaScript object that seems to work well for me so far.


Example Code
============

    // fid-umd {"name":"TestObject","jslint":1}
	/*global define, YUI*/
	(function (n, r, f) {
		"use strict";
		try { module.exports = f(); return; } catch (ignore) {}
		try { exports[n] = f(); return; } catch (ignore) {}
		try { return define.amd && define(n, [], f); } catch (ignore) {}
		try { return YUI.add(n, function (Y) { Y[n] = f(); }); } catch (ignore) {}
		try { r[n] = f(); return; } catch (ignore) {}
		throw new Error("Unable to export " + n);
	}("TestObject", this, function () {
		"use strict";
		// fid-umd end


		/**
		 * Here is my constructor.  Let's pretend it takes an argument or two.
		 *
		 * @class TestObject
		 * @param {string} type The brand new type property
		 * @param {boolean} [isEnabled=false] If truthy, this object is enabled.
		 */
		function TestObject(type, isEnabled) {
			if (!(this instanceOf TestObject)) {
				return new TestObject(type, isEnabled);
			}

			this.type = type;
			this.isEnabled = !!isEnabled;
			this.thingsPerformed = 0;
		}


		/**
		 * Here's a method that does stuff.
		 *
		 * @return {Function} A callback that does something
		 */
		TestObject.prototype.doStuff = function () {
			var self;

			function returnable() {
				self.thingsPerformed += 1;
			}

			self = this;

			return returnable;
		};


		return TestObject;


		// fid-umd post
	}));
	// fid-umd post-end


That's a big example.  It's totally worth it and has lots of subtle things embedded that I will expound upon.


One Class Per File
------------------

Following this guide of having only one class or module per file really forces you to examine problems thoroughly.  Do you need another class?  Do you gain clarity by having two classes in one file?  While it isn't an absolute rule, I will follow this well over 90% of the time.


Universal Module Definition
---------------------------

I like my JavaScript to be executable in a variety of places.  A web browser is just one environment.  To further that goal, I would also like it loadable in whatever module system you use.  That's why I wrote [FidUmd](https://github.com/fidian/fid-umd).  These chunks at the beginning and end are entirely written by that library.

    // fid-umd {"name":"TestObject","jslint":1}
	/*global define, YUI*/
	(function (n, r, f) {
		"use strict";
		try { module.exports = f(); return; } catch (ignore) {}
		try { exports[n] = f(); return; } catch (ignore) {}
		try { return define.amd && define(n, [], f); } catch (ignore) {}
		try { return YUI.add(n, function (Y) { Y[n] = f(); }); } catch (ignore) {}
		try { r[n] = f(); return; } catch (ignore) {}
		throw new Error("Unable to export " + n);
	}("TestObject", this, function () {
		"use strict";
		// fid-umd end

You will notice the "fid-umd" comments that start and stop the section.  Here's the bit at the bottom of the file.

		// fid-umd post
	}));
	// fid-umd post-end

When I need to include another dependency or change the name of the class, FidUmd makes that trivial.  I simply list the new object that's needed and rerun the program.  The header is rebuilt and the factory function will get the object as a dependency.


Comments
--------

I strongly urge you to write comments.  They will help you out tremendously in life.  The more effort you put into them, the more benefit you reap.  Also, big comments can be a flag that the function or class is too difficult to understand readily.  Consider breaking the code up or reorganizing things.

JavaScript has a format for comments called jsdoc, and I'll happily use standards when they exist.

	/**
	 * Here is my constructor.  Let's pretend it takes an argument or two.
	 *
	 * @class TestObject
	 * @param {string} type The brand new type property
	 * @param {boolean} [isEnabled=false] If truthy, this object is enabled.
	 */


Constructor Function
--------------------

I name the constructor function the same name as my module I am exporting.  This is a named function so that stack traces are much more useful.  If I used `var TestObject = function (type isEnabled) {` instead, stack traces say that the problem happened in "[object Object]", which is not very useful.

	function TestObject(type, isEnabled) {

Also, in JavaScript, one may forget to use the `new` keyword when using your library.  You can easily compensate for this by calling yourself if `this` is not an instance of your constructor.

	if (!(this instanceOf TestObject)) {
		return new TestObject(type, isEnabled);
	}

Then we wrap up a couple things.  No work is done in the constructor.  Just some variable assignments.

		this.type = type;
		this.isEnabled = !!isEnabled;
		this.thingsPerformed = 0;
	}


Methods/Functions
-----------------

JavaScript is a bit loose when it comes to methods and functions.  Really, they are just function objects attached to properties of objects.  Calling them as `className.functionName()` automatically sets the context to be the object itself.  I add `doStuff` to the function's prototype and it magically is now a method on all instances of that class.

This method returns a callback.  I do not have it inline with the `return` just so I can make things more readable.  I do not embed functions in other function calls because that throws off indentation.  They are as high as possible (just under the `var` line) to better mimic the function hoisting that the JavaScript interpreter will be doing.  This way I can name functions easily and see what is going on.  Again, if the function is too large, you should consider reorganizing your code.

Inside, the function would want to set `this.thingsPerformed ++`, but jslint doesn't like the `++` and the function's scope might not be the object.  I do jslint flags for the function (eg. `/*jslint unparam:true*/`) first, then a `var` line with no assignments, followed by all functions and finally the meat of the code.  If it gets too big, your function is doing too much.

	/**
	 * Here's a method that does stuff.
	 *
	 * @return {function} A callback that does something
	 */
	TestObject.prototype.doStuff = function () {
		var self;

		function returnable() {
			self.thingsPerformed += 1;
		}

		self = this;

		return returnable;
	};


Exporting the Module
--------------------

This one last line will export the module.  It will go into the UMD as whatever name you configured.

    return TestObject;


A Note on Minification
----------------------

Do I minify my code?  Yes.  I just don't do it by hand.  I don't even do it a tiny bit by hand.  I find it a lot easier to read unminified code and review code from other people if they don't minify their code either.  Debugging a program is significantly easier and I can set breakpoints far more easily when I expand conditional assignments or multiple checks into separate conditions.  Yes, there may be times that minification would trump other concerns, but those cases are extremely rare.  Testability and maintainability should be your first two goals.  Everything else should fall to a very distant third.

Modern day minifiers can inspect the code above and rewrite it so that it looks completely different but will still execute the same, so just incorporate a good minifier in your code.  If you are concerned about the results after minification, that's why you have lots of tests.  You do have tests, right?
