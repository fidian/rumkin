"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var r,n,o,i,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(a)return n=!(r=!0),{s:function(){a=a.call(e)},n:function(){var e=a.next();return r=e.done,e},e:function(e){n=!0,o=e},f:function(){try{r||null==a.return||a.return()}finally{if(n)throw o}}};if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),i=0,{s:t=function(){},n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}module.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,r=new Array(1<t?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var o,i=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;try{a.apply(void 0,r)}catch(e){}}}catch(e){i.e(e)}finally{i.f()}}},{key:"off",value:function(e,t){var r=this.listeners.get(e);if(r)for(var n=r.length-1;0<=n;--n)r[n]===t&&r.splice(n,1)}},{key:"on",value:function(e,t){var r=this,n=this.listeners.get(e);return n||this.listeners.set(e,n=[]),n.push(t),function(){return r.off(e,t)}}}]),e}();