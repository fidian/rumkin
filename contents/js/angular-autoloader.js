/*global angular, document, window*/
(function () {
	'use strict';

	var proto;

	function AngularAutoloader(rules) {
		this.foundTags = {};
		this.neededModules = {};
		this.loadedModules = {};
		this.rules = rules;
		this.numberLoading = 0;
		this.angularModules = [];
		this.onload = [];
	}

	proto = AngularAutoloader.prototype;

	/**
	 * Utility functions
	 */

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

	function iterateObject(obj, callback) {
		var name;

		for (name in obj) {
			if (obj.hasOwnProperty(name)) {
				callback(obj[name], name, obj);
			}
		}
	}

	/**
	 * Scanning the DOM for tags
	 */

	proto.examine = function (str) {
		str = str.replace(/:/g, '-');  // ng:app => ng-app
		str = str.replace(/^(data|x)-/, '');  // x-ng-app, data-ng-app => ng-app
		this.foundTags[str] = true;
	};

	proto.scan = function (domnode) {
		var myself;

		function addAttrs(attrib) {
			myself.examine(attrib.name);
		}

		myself = this;

		while (domnode) {
			this.examine(domnode.nodeName.toLowerCase());
			iterate(domnode.attributes, addAttrs);

			if (domnode.hasChildNodes(domnode)) {
				this.scan(domnode.firstChild);
			}

			domnode = domnode.nextSibling;
		}
	};

	/**
	 * Finding what modules to load
	 */
	proto.resolveDependencies = function (moduleName) {
		var myself;

		if (this.neededModules[moduleName]) {
			return;
		}

		if (!this.rules[moduleName]) {
			return;
		}

		this.neededModules[moduleName] = true;
		myself = this;
		iterate(this.rules[moduleName].depends, function (dependsOn) {
			myself.resolveDependencies(dependsOn);
		});
	};

	proto.detectModules = function () {
		var moduleName, myself;

		myself = this;

		iterateObject(this.rules, function (moduleRules, moduleName) {
			iterate(moduleRules.detect, function (attribName) {
				if (myself.foundTags[attribName]) {
					myself.resolveDependencies(moduleName);
				}
			});
		});
	};

	/**
	 * Add nodes for scripts and css
	 */

	proto.addHeadNode = function (node) {
		document.getElementsByTagName('head')[0].appendChild(node);
	};

	proto.addNodeOnload = function (node, callback) {
		function nodeLoaded(evt) {
			var node = evt.currentTarget || evt.srcElement;

			if (evt.type === 'load' || node.readyState === 'complete' || node.readyState === 'loaded') {
				callback();
			}
		}

		if (node.addEventListener) {
			node.addEventListener("load", nodeLoaded, false);
		} else {
			node.attachEVent("onreadystatechange", nodeLoaded);
		}
	};

	proto.addScriptTag = function (url) {
		var node;
		node = document.createElement('script');
		node.type = 'text/javascript';
		node.charset = 'utf-8';
		node.src = url;
		this.addHeadNode(node);
		return node;
	};

	proto.addLinkTag = function (url) {
		var node;
		node = document.createElement('link');
		node.rel = 'stylesheet';
		node.type = 'text/css';
		node.href = url;
		this.addHeadNode(node);
		return node;
	};

	proto.addTags = function (moduleName, onload) {
		var myself;
		myself = this;
		iterate(this.rules[moduleName].js, function (url) {
			var node;
			node = myself.addScriptTag(url);

			if (onload) {
				myself.addNodeOnload(node, onload);
			}
		});
		iterate(this.rules[moduleName].css, function (url) {
			myself.addLinkTag(url);
		});
	};

	/**
	 * Determine what to load and what to do when done loading
	 */


	proto.loadModule = function (moduleName) {
		var myself;
		myself = this;
		this.numberLoading += 1;
		this.addTags(moduleName, function () {
			myself.numberLoading -= 1;
			myself.loadedModules[moduleName] = true;
			myself.loadModules();
		});
		iterate(this.rules[moduleName].module, function (angularModule) {
			myself.angularModules.push(angularModule);
		});
		iterate(this.rules[moduleName].onload, function (onload) {
			myself.onload.push(onload);
		});
	};

	proto.loadModules = function () {
		var modulesSkipped, myself;

		function hasUnmetDepends(moduleName) {
			var misses = 0;
			iterate(myself.rules[moduleName].depends, function (needed) {
				if (!myself.loadedModules[needed]) {
					misses += 1;
				}
			});
			return misses;
		}

		modulesSkipped = 0;
		myself = this;
		iterateObject(this.neededModules, function (bool, moduleName) {
			if (myself.loadedModules[moduleName]) {
				return;
			}

			if (hasUnmetDepends(moduleName)) {
				modulesSkipped += 1;
				return;
			}

			myself.loadModule(moduleName);
		});

		if (!this.numberLoading && !modulesSkipped) {
			this.loadingComplete();
		}
	};

	proto.loadingComplete = function () {
		iterate(this.onload, function (cb) {
			cb();
		});
	};

	/**
	 * Initialization code - attach to dom loaded
	 */
	proto.init = function () {
		var myself;

		// Detecting load event, thanks to jQuery
		function loaded() {
			document.removeEventListener("DOMContentLoaded", loaded, false);
			window.removeEventListener("load", loaded, false);
			myself.scan(document);  // Scan document for all potential module names
			myself.detectModules();  // Detect any modules we need and dependencies
			myself.loadModules();  // Keep calling this until we are loaded
		}

		myself = this;
		document.addEventListener("DOMContentLoaded", loaded, false);
		window.addEventListener("load", loaded, false);
	};

	window.AngularAutoloader = AngularAutoloader;
}());
