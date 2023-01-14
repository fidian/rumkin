"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}var AdvancedInputArea=require("../advanced-input-area"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.input={label:"The text to encode",value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",this.viewButtons()),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewButtons",value:function(){return[m("p","Use these buttons to insert the corresponding letter in the input area below."),m("div",{class:"D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm"},this.viewButtonList("ABCDEFGHIJKLMNOPQRSTUVWXYZ")),m("div",{class:"D(f) Fxw(w) Ai(c) Jc(c) Px(3em) Px(0)--sm"},this.viewButtonList("0123456789#!"))]}},{key:"viewButtonList",value:function(e){var t=this;return e.split("").map(function(e){return t.viewButtonForChar(e)})}},{key:"viewButtonForChar",value:function(e){var t=this;return m("button",{onclick:function(){t.input.value+=e}},m("span",{class:"semaphore Mx(0.2em)"},e))}},{key:"viewResult",value:function(){return this.input.value?m(Result,m("span",{class:"semaphore Lts(0.3em) Pstart(0.2em) Whs(pw)"},this.input.value)):m(Result,"Enter text to see it encoded here")}}]),e}();