"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var Dropdown=require("../../js/mithril/dropdown");module.exports=function(){function o(e){var t=this,r=(_classCallCheck(this,o),e.attrs);r.value||(r.value="ENCRYPT"),this.d={options:{ENCRYPT:r.code?"Encode":"Encrypt",DECRYPT:r.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return r.value=t.d.value,!r.onchange||r.onchange(e)}}}return _createClass(o,[{key:"view",value:function(e){return this.d.value!==e.attrs.value&&(this.d.value=e.attrs.value),m(Dropdown,this.d)}}]),o}();