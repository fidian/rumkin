"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,_toPropertyKey(o.key),o)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(t,e){if("object"!==_typeof(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0===r)return("string"===e?String:Number)(t);r=r.call(t,e||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}module.exports=function(){function t(){_classCallCheck(this,t),this.values=this.jsChars()}return _createClass(t,[{key:"jsChars",value:function(t){return t?t.split("").map(function(t){return("0000"+t.charCodeAt(0).toString(16)).substr(-4)}):["Enter text and see the character codes here."]}},{key:"view",value:function(){var e=this;return[m("textarea",{class:"W(100%)",oninput:function(t){e.values=e.jsChars(t.target.value)}}),m("p","This is the character codes for whatever is in the text box."),m("div",{class:"output"},this.values.join(" "))]}}]),t}();