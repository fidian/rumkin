"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}!function i(n,o,u){function a(t,e){if(!o[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=o[t]={exports:{}},n[t][0].call(r.exports,function(e){return a(n[t][1][e]||e)},r,r.exports,i,n,o,u)}return o[t].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)a(u[e]);return a}({1:[function(e,t,r){window.ValidEmail=e("./valid-email")},{"./valid-email":2}],2:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e),this.email="test-me@example.com",this.check()}return _createClass(e,[{key:"check",value:function(){this.valid=isValidEmail(this.email)}},{key:"results",value:function(){return this.valid?m("span","This is a valid email address"):m("span","Invalid email format.")}},{key:"view",value:function(){var t=this;return[m("input",{type:"text",oninput:function(e){t.email=e.target.value,t.check()},class:"W(100%)",value:this.email}),this.results()]}}]),e}()},{}]},{},[1]);