/*global angular, document, window*/
(function () {
	'use strict';

	function iterate(arr, callback) {
		var i, len;

		if (!arr) {
			return;
		}

		if (typeof arr !== 'object') {
			arr = [ arr ];
		}

		for (i = 0, len = arr.length; i < len; i += 1) {
			callback(arr[i], i);
		}
	}

	function examine(str, foundTags) {
		foundTags[str] = true;
	}

	function scan(domnode, foundTags) {
		function addAttrs(attrib) {
			examine(attrib.name, foundTags);
		}

		while (domnode) {
			examine(domnode.nodeName.toLowerCase(), foundTags);
			iterate(domnode.attributes, addAttrs);

			if (domnode.hasChildNodes(domnode)) {
				scan(domnode.firstChild, foundTags);
			}

			domnode = domnode.nextSibling;
		}
	}

	function resolveDependencies(moduleName, rules, neededModules) {
		if (neededModules[moduleName]) {
			return;
		}

		if (!rules[moduleName]) {
			return;
		}

		// Put dependencies in first
		iterate(rules[moduleName].depends, function (dependsOn) {
			resolveDependencies(dependsOn, rules, neededModules);
		});

		neededModules[moduleName] = true;
	}

	function detectModules(rules, foundTags) {
		var moduleName, neededModules = {};

		function testModule(attribName) {
			if (foundTags[attribName]) {
				resolveDependencies(moduleName, rules, neededModules);
			}
		}

		for (moduleName in rules) {
			if (rules.hasOwnProperty(moduleName)) {
				iterate(rules[moduleName].detect, testModule);
			}
		}

		return neededModules;
	}

	function addScriptTag(url) {
		var node;
		node = document.createElement('script');
		node.type = 'text/javascript';
		node.charset = 'utf-8';
		node.src = url;
		document.head.appendChild(node);
	}

	function addLinkTag(url) {
		var node;
		node = document.createElement('link');
		node.rel = 'stylesheet';
		node.type = 'text/css';
		node.href = url;
		document.head.appendChild(node);
	}

	function addTags(needed, rules) {
		var moduleName;

		for (moduleName in needed) {
			if (needed.hasOwnProperty(moduleName)) {
				iterate(rules[moduleName].js, addScriptTag);
				iterate(rules[moduleName].css, addLinkTag);
			}
		}
	}

	// Detecting load event, thanks to jQuery
	function loaded() {
		var needed, foundTags;
		document.removeEventListener("DOMContentLoaded", loaded, false);
		window.removeEventListener("load", loaded, false);
		foundTags = {};
		scan(document, foundTags);
		needed = detectModules(window.angularAutoload, foundTags);
		addTags(needed, window.angularAutoload);
		setTimeout(function () {
			console.log('bootstrap');
			angular.bootstrap(document, ['autoGrow']);
		}, 1000);
	}

	document.addEventListener("DOMContentLoaded", loaded, false);
	window.addEventListener("load", loaded, false);
}());
