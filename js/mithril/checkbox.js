"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}module.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var n=e.attrs;return m("label",[m("input",Object.assign({},n,{type:"checkbox",onchange:function(e){return n.value=!n.value,!n.onchange||n.onchange(e)}})),this.viewLabel(n)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}();