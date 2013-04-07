/* Found at https://gist.github.com/thomseddon/4703968
 * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
 *
 * Works nicely with the following styles:
 * textarea {
 *	resize: none;
 *	transition: 0.05s;
 *	-moz-transition: 0.05s;
 *	-webkit-transition: 0.05s;
 *	-o-transition: 0.05s;
 * }
 *
 * Usage: <textarea auto-grow></textarea>
 */
/*global angular, document*/
(function () {
	'use strict';
	angular.module('autoGrow', []).directive('autoGrow', function () {
		return function (scope, element, attr) {
			var minHeight = element[0].offsetHeight,
				paddingLeft = element.css('paddingLeft'),
				paddingRight = element.css('paddingRight'),
				$shadow = angular.element('<div></div>').css({
					position: 'absolute',
					top: 0,
					left: 0,
					width: element[0].offsetWidth - parseInt(paddingLeft || 0, 10) - parseInt(paddingRight || 0, 10),
					fontSize: element.css('fontSize'),
					fontFamily: element.css('fontFamily'),
					lineHeight: element.css('lineHeight'),
					resize:     'none',
					visibility: 'hidden'
				}),
				update = function () {
					function times(string, number) {
						var i, r;
						for (i = 0, r = ''; i < number; i += 1) {
							r += string;
						}
						return r;
					}

					var val = element.val().replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/&/g, '&amp;')
						.replace(/\n$/, '<br/>&nbsp;')
						.replace(/\n/g, '<br/>')
						.replace(/\s{2,}/g, function (space) {
							return times('&nbsp;', space.length - 1) + ' ';
						});
					$shadow.html("<br/>" + val);
					element.css('height', Math.max($shadow[0].offsetHeight, minHeight) + 'px');
				};

			angular.element(document.body).append($shadow);

			scope.$on('$destroy', function () {
				$shadow.remove();
			});
			element.bind('keyup keydown keypress change', update);
			update();
			element.addClass('auto-grow');
		};
	});
}());
