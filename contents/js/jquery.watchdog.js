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

	var watched = [];

	/**
	 * Watch a set of elements for changes and call the callback when something
	 * changed.
	 *
	 * @param Function bark The callback to execute
	 */
	$.fn.watchdog = function watchdog(bark) {
		var targets = $(this);

		if (!targets.length) {
			return targets;
		}

		targets.each(function () {
			var $elem = $(this),
				data = $elem.data('watchdog');

			if ($elem.data('watchdog')) {
				// Already watching the element, so just add to the barks
				data.barks.push(bark);
			} else {
				data = {
					prowl: window.setInterval(function () {
						var i, v = $elem.val();

						if (v !== data.oldVal) {
							data.oldVal = v;

							for (i = 0; i < data.barks.length; i += 1) {
								data.barks[i](v, $elem);
							}
						}
					}, 100),
					oldVal: null,
					barks: [ bark ]
				};
				$elem.data('watchdog', data);
			}
		});
	};
}(jQuery));
