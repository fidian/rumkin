"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _slicedToArray(t,r){return _arrayWithHoles(t)||_iterableToArrayLimit(t,r)||_unsupportedIterableToArray(t,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,r){var e;if(t)return"string"==typeof t?_arrayLikeToArray(t,r):"Map"===(e="Object"===(e=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:e)||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(t,r):void 0}function _arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,o=new Array(r);e<r;e++)o[e]=t[e];return o}function _iterableToArrayLimit(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var o,n,a,i,l=[],u=!0,c=!1;try{if(a=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;u=!1}else for(;!(u=(o=a.call(e)).done)&&(l.push(o.value),l.length!==r);u=!0);}catch(t){c=!0,n=t}finally{try{if(!u&&null!=e.return&&(i=e.return(),Object(i)!==i))return}finally{if(c)throw n}}return l}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,r){for(var e=0;e<r.length;e++){var o=r[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,_toPropertyKey(o.key),o)}}function _createClass(t,r,e){return r&&_defineProperties(t.prototype,r),e&&_defineProperties(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(t,r){if("object"!==_typeof(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0===e)return("string"===r?String:Number)(t);e=e.call(t,r||"default");if("object"!==_typeof(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}var conduitEvents=require("../module/conduit-events");module.exports=function(){function a(t){_classCallCheck(this,a);t=t.attrs;if(this.label=t["data-label"],this.topic=t["data-topic"],t["data-payload"])this.payload=t["data-payload"];else{this.payload={};for(var r=0,e=Object.entries(t);r<e.length;r++){var o=_slicedToArray(e[r],2),n=o[0],o=o[1],n=n.match(/^data-payload-(.*)/);n&&(n=n[1].replace(/-./g,function(t){return t.toUpperCase()}),this.payload[n]=o)}}}return _createClass(a,[{key:"view",value:function(){var t=this;return m("button",{onclick:function(){conduitEvents.emit(t.topic,t.payload)}},this.label)}}]),a}();