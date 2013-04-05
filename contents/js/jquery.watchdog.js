/**
 * Monitor inputs for changes, then call a callback when they are updated.
 *
 * Usage:
 *    $('input.watchMe').watchdog(function (val, $elem) {
 *        console.log('new value: ' + val);
 *        console.log('element: ' + $elem);
 *    });
 *
 * When set up, it will call the callback almost immediately.  After that the
 * watchdog polling happens about every 100 ms;
 *
 * License:  MIT with non-advertising clause
 * http://rumkin.com/license.html
 */
/*global jQuery, window*/
(function ($) {
	'use strict';


	function Watchdog($elem) {
		this.$element = $elem;
		this.oldVal = $elem.val();
		this.barks = [];
	}

	Watchdog.prototype.addBark = function (bark) {
		this.barks.push(bark);
	};

	Watchdog.prototype.bark = function () {
		var i;

		for (i = 0; i < this.barks.length; i += 1) {
			this.barks[i].call(null, this.oldVal, this.$element);
		}
	};

	Watchdog.prototype.prowl = function () {
		var v = this.$element.val();

		if (v !== this.oldVal) {
			this.oldVal = v;
			this.bark();
		}
	};

	Watchdog.prototype.refresh = function () {
		this.oldVal = this.$element.val();
	};

	function addWatchdogs($elements) {
		$elements.each(function () {
			var $elem = $(this),
				dog = $elem.data('watchdog');

			if (!dog) {
				dog = new Watchdog($elem);
				$elem.data('watchdog', dog);
				setInterval(function () {
					dog.prowl();
				}, 100);
			}
		});
	}

	function handlePack($elements, method) {
		var args = Array.prototype.slice.call(arguments, 2);
		$elements.each(function () {
			var dog = $(this).data('watchdog');
			dog[method].apply(dog, args);
		});
	}

	/**
	 * Watch a set of elements for changes and call the callback when something
	 * changed.
	 *
	 * @param Function bark The callback to execute
	 */
	$.fn.watchdog = function watchdog(command) {
		var targets = $(this);

		if (!targets.length) {
			return targets;
		}

		// Ensure there are watchdogs on all elements
		addWatchdogs(targets);

		// If the command is a function, treat it as a bark (a callback)
		if (typeof command === 'function') {
			handlePack(targets, 'addBark', command);
		}

		handlePack(targets, 'refresh');
	};
}(jQuery));
