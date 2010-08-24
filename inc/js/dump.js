function dump(what) {
	this.dump = function(what, level) {
		var type = this.getType(what);
		level ++;
		if (level > 10) {
			return '... too deep ...';
		}

		if (type === 'null' || type === 'resource') {
			return type;
		}

		if (type === 'array' || type === 'object') {
			var indentStr = this.indent(level);
			var out = (type === 'array')? '[' : '{';
			for (var i in what) {
				out += indentStr + this.dump(i, level) + ': ' + this.dump(what[i], level) + indentStr;
			}
			out += this.indent(level - 1);
			out += (type === 'array')? ']' : '}';
			return out;
		}

		if (type === 'function') {
			return what.toString();
		}

		if (type === 'string') {
			return "'" + what.replace(/(["'])/g, "\\$1").replace(/\0/g, "\\0") + "'";
		}

		return what;
	}

	this.getFuncParts = function (func) {
		func = func.toString();
		match = func.match(/\W*function\s+([\w\$]+)?\s*\(([^\)]*?)\)\s*\{(.*)\}/);
		if (! match) {
			return {};
		}
		var out = {
				'name': match[1],
				'parameters': match[2],
				'code': match[3],
				'string': func
			};
		return out;
	};

	this.getType = function (what) {
		var type = typeof(what);

		if (type !== 'object') {
			return type;
		}

		if (! what) {
			return 'null';
		}

		if (! what.constructor) {
			return 'object';
		}

		var funcName = this.getFuncParts(what.constructor).name;

		if (funcName) {
			funcName = funcName.toLowerCase();
			var funcNameMap = {
				'array': 'array',
				'boolean': 'boolean',
				'number': 'number',
				'phpjs_resource': 'resource',
				'string': 'string'
			};

			if (funcNameMap[funcName]) {
				return funcNameMap[funcName];
			}
		}

		return type;
	};

	this.indent = function(level) {
		return "\n" + (new Array(level + 1).join("\t"));
	}


	var out = this.dump(what, 0);
	alert(out);
}
