"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}module.exports=function(){function t(e){_classCallCheck(this,t),this.input=e,this.index=0}return _createClass(t,[{key:"next",value:function(){this.index+=1}},{key:"peek",value:function(){return this.input.charAt(this.index)}},{key:"getRemainder",value:function(){return this.input.substr(this.index)}}]),t}();