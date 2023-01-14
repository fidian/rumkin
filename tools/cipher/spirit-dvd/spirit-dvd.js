"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0===i)return("string"===t?String:Number)(e);i=i.call(e,t||"default");if("object"!==_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}var AdvancedInputArea=require("../advanced-input-area"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.input={label:"The text to encode or decode",value:""},cipherConduitSetup(this,"spiritDvd")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewAdditionalActions()),m("p",this.viewResult())]}},{key:"viewAdditionalActions",value:function(){var i=this;return m("a",{href:"#",onclick:function(){for(var e=i.input.value.split("|"),t=0;t<e.length;t+=1)e[t]=e[t].split("-").join("|");i.input.value=e.join("-")}},"Swap dots and bars")}},{key:"viewResult",value:function(){return this.input.value?m(CipherResult,{name:"spiritDvd",direction:this.direction.value,message:this.input.value,alphabet:null}):m(Result,"Enter text to see it encoded or decoded here")}}]),e}();