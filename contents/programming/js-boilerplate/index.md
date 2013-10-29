---
title: Best JavaScript Boilerplate
template: index.jade
---

I'm writing JavaScript objects and I keep refining how I am creating objects in order to have cleaner code, stand behind community standards, remove potential problems and attempt to be more maintainable.  Here is my boilerplate code for a new JavaScript object that seems to work well for me so far.

Example Code
============

    // fid-umd {"name":"TestObject","jslint":1}
	/*global define, YUI*/
	(function (n, r, f) {
		"use strict";
		try { module.exports = f(); return; } catch (a) {}
		try { exports[n] = f(); return; } catch (b) {}
		try { return define.amd && define(n, [], f); } catch (c) {}
		try { return YUI.add(n, function (Y) { Y[n] = f(); }); } catch (d) {}
		try { r[n] = f(); return; } catch (e) {}
		throw new Error("Unable to export " + n);
	}("TestObject", this, function () {
		"use strict";
		// fid-umd end


		/**
		 * Here is my constructor.  Let's pretend it takes an argument or two.
		 *
		 * @class TestObject
		 * @param {string} type The brand new type property
		 * @param {boolean} [isEnabled] If truthy, this object is enabled.  Default false.
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
			var myself;

			function returnable() {
				myself.thingsPerformed += 1;
			}

			myself = this;
			return returnable;
		};


		return TestObject;
		

		// fid-umd post
	}));
	// fid-umd post-end

Breakdown
=========

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
		try { module.exports = f(); return; } catch (a) {}
		try { exports[n] = f(); return; } catch (b) {}
		try { return define.amd && define(n, [], f); } catch (c) {}
		try { return YUI.add(n, function (Y) { Y[n] = f(); }); } catch (d) {}
		try { r[n] = f(); return; } catch (e) {}
		throw new Error("Unable to export " + n);
	}("TestObject", this, function () {
		"use strict";
		// fid-umd end

You will notice the "fid-umd" comments that start and stop the section.  Here's the bit at the bottom of the file.

		// fid-umd post
	}));
	// fid-umd post-end

Comments
--------

I strongly urge you to write comments.  They will help you out tremendously in life.  The more effort you put into them, the more you reap.  Also, big comments can be a flag that the function or class is too difficult to understand readily.  Consider breaking the code up or reorganizing things.

JavaScript has a format for comments called jsdoc, and I'll happily use standards when they exist.

	/**
	 * Here is my constructor.  Let's pretend it takes an argument or two.
	 *
	 * @class TestObject
	 * @param {string} type The brand new type property
	 * @param {boolean} [isEnabled] If truthy, this object is enabled.  Default false.
	 */

Constructor Function
--------------------

I name the constructor function the same name as my module I am exporting.

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
=================

JavaScript is a bit loose when it comes to methods and functions.  Really, they are just function objects attached to properties of objects.  Calling them as `className.functionName()` automatically sets the context to be the object itself.  I add `doStuff` to the function's prototype and it magically is now a method on all instances of that class.

This method returns a callback.  I do not have it inline with the `return` keyword.  I do not wrap functions in other function calls.  This way I can name functions easily and see what is going on.  Again, if the function is too large, you should consider reorganizing your code.

Inside, the function would want to set `this.thingsPerformed ++`, but jslint doesn't like the `++` and the function's scope might not be the object.  So, that's why `+= 1` and `myself` are both used.  I don't like using `self` as that may accidentally refer to `window.self` if `window` is the global object.

I do jslint flags for the function (eg. `/*jslint unparam:true*/`) first, then a `var` line with no assignments, followed by all functions and finally the meat of the code.  If it gets too big, your function is doing too much.

	/**
	 * Here's a method that does stuff.
	 *
	 * @return {function} A callback that does something
	 */
	TestObject.prototype.doStuff = function () {
		var myself;

		function returnable() {
			myself.thingsPerformed += 1;
		}

		myself = this;
		return returnable;
	};

Exporting the Module
--------------------

This one last line will export the module.  It will go into the UMD as whatever name you configured.

    return TestObject;

A Note on Minification
======================

Do I minify my code?  Yes.  I just don't do it by hand.  I find it a lot easier to read unminified code and review code from other people if they don't minify their code either.  Yes, there may be times that minification is good, but those cases are extremely rare.  Maintainability and testability should be your first two goals.  Everything else should fall to a very distant third.

Modern day minifiers can inspect the code above and rewrite it so that it looks completely different but will still execute the same, so just incorporate a good minifier in your code.  If you are concerned about the results after minification, that's why you have lots of tests.  You do have tests, right?
