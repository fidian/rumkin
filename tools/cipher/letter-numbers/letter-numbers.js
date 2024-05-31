"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var AdvancedInputArea=require("../advanced-input-area"),Checkbox=require("../../../js/mithril/checkbox"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),Dropdown=require("../../../js/mithril/dropdown"),keyAlphabet=require("../key-alphabet"),KeyedAlphabet=require("../keyed-alphabet"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.direction={},this.input={label:"The text to encode or decode",value:""},this.delimiterOptions={value:"-",options:{"-":"Hyphen"," ":"Space","":"None"},label:"Delimiter between encoded letters"},this.padWithZeros={label:"Pad the numbers with zeros so all codes are the same length",value:!1},cipherConduitSetup(this,"morse")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(KeyedAlphabet,this.alphabet)),m("p",m(AdvancedInputArea,this.input)),m("p",m(Dropdown,this.delimiterOptions)),m("p",m(Checkbox,this.padWithZeros)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return this.input.value?m(CipherResult,{name:"letterNumber",direction:this.direction.value,message:this.input.value,alphabet:keyAlphabet(this.alphabet),options:{delimiter:this.delimiterOptions.value,padWithZeros:this.padWithZeros.value}}):m(Result,"Enter text to see it encoded or decoded here")}}]),e}();