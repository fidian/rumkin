"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}module.exports=function(){function t(e){_classCallCheck(this,t),this.isShowing=!!e.attrs.show}return _createClass(t,[{key:"linkToggle",value:function(e,t){var n=this;return m("a",{href:"#",onclick:function(){n.isShowing=!n.isShowing}},"".concat(e," ").concat(t.attrs.label))}},{key:"view",value:function(e){return this.isShowing?[this.linkToggle("Hide",e),m("br"),e.attrs.content]:this.linkToggle("Show",e)}}]),t}();