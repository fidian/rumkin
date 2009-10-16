var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("chrome") >= 0 || ua.indexOf("firefox") >= 0) {
	var StringMaker = function () {
		this.str = "";
		this.append = function (s) {
			this.str += s;
		}
		this.toString = function () {
			return this.str;
		}
	}
} else {
	var StringMaker = function () {
		this.parts = [];
		this.append = function (s) {
			this.parts.push(s);
		}
		this.toString = function () {
			return this.parts.join('');
		}
	}
}
