"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),DirectionSelector=require("../direction-selector"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.input={label:"Message to encode or decode",value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){if(!this.input.value)return m(Result,"Enter your text and see the convered message here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.code.base64[this.direction.code](e).toString();return m(Result,e)}}]),e}();