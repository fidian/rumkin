"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}module.exports=function(){function e(){_classCallCheck(this,e),this.email="test-me@example.com",this.check()}return _createClass(e,[{key:"check",value:function(){this.valid=isValidEmail(this.email)}},{key:"results",value:function(){return this.valid?m("span","This is a valid email address"):m("span","Invalid email format.")}},{key:"view",value:function(){var t=this;return[m("input",{type:"text",oninput:function(e){t.email=e.target.value,t.check()},class:"W(100%)",value:this.email}),this.results()]}}]),e}();