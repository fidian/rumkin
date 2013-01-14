/*global window */
(function () {
	'use strict';

	var util;

	util = {
		/**
		 * Clones an object
		 *
		 * @param mixed src
		 * @return mixed Copy of src
		 */
		clone: function clone(src) {
			var target, myself;

			function copy(val, index) {
				target[index] = util.clone(val);
			}

			if (util.isArray(src)) {
				target = [];
				this.each(src, copy);
			} else if (typeof src === 'object') {
				target = {};
				this.each(src, copy);
			} else {
				target = src;
			}

			return target;
		},


		/**
		 * Iterate over an array or object, or maybe just call the callback
		 * with a single value
		 *
		 * @param mixed thing
		 * @param Function callback(item, index)
		 * @param Object thisArg (optional) Contect for calling the callback
		 */
		each: function each(thing, callback, thisArg) {
			var i;

			if (util.isArray(thing)) {
				if (Array.prototype.forEach) {
					Array.prototype.forEach.call(thing, callback, thisArg);
				} else {
					for (i = 0; i < thing.length; i += 1) {
						if (thing[i] !== undefined) {
							callback.call(thisArg, thing[i], i, thing);
						}
					}
				}
			} else if (typeof thing === 'object') {
				for (i in thing) {
					if (Object.prototype.hasOwnProperty.call(thing, i)) {
						callback.call(thisArg, thing[i], i, thing);
					}
				}
			} else if (typeof thing !== 'undefined') {
				callback.call(thisArg, thing);
			}
		},


		/**
		 * Convert a number to two hexadecimal characters
		 *
		 * @param integer num Only lowest byte is used
		 * @return String
		 */
		hexByte: function (num) {
			var low, high;

			num = Math.floor(num);
			low = num % 16;
			high = Math.floor(num / 16);

			return (high.toString(16) + low.toString(16)).toUpperCase();
		},


		/**
		 * Return true if this is an array
		 *
		 * @param mixed thing
		 */
		isArray: Array.isArray || function isArray(thing) {
			if (typeof thing === 'object' && Object.prototype.toString.call(thing) === '[object Array]') {
				return true;
			}

			return false;
		},


		/**
		 * Trim a string
		 *
		 * @param String str
		 * @return String
		 */
		trim: function trim(str) {
			if (String.trim) {
				return str.trim();
			}

			return str.replace(/^\s+|\s+$/g, '');
		}
	};

	/**
	 * Assign to the usual locations for node and the browser
	 */
	if (window) {
		window.util = util;
	}

	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = util;
	}
}());
