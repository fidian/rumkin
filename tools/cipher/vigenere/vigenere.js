"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,_toPropertyKey(i.key),i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var AdvancedInputArea=require("../advanced-input-area"),Checkbox=require("../../../js/mithril/checkbox"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),keyAlphabet=require("../key-alphabet"),KeyedAlphabet=require("../keyed-alphabet"),Result=require("../result"),ShowHide=require("../show-hide"),TextInput=require("../../../js/mithril/text-input");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={value:"ENCRYPT"},this.alphabet={value:new rumkinCipher.alphabet.English},this.cipherKey={label:"Cipher key",value:""},this.autokey={label:'Use "autokey" variant to extend the key with plaintext',value:!1},this.input={value:""},cipherConduitSetup(this,"vigenere")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(KeyedAlphabet,this.alphabet)),m("p",m(TextInput,this.cipherKey)),m("p",m(ShowHide,{label:"Tableau",content:this.viewTableau()})),m("p",m(Checkbox,this.autokey)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewTableau",value:function(){var r=keyAlphabet(this.alphabet),i=(r.letterOrder.upper+r.letterOrder.upper).split(""),e=this.tableauRows();return m("table",[this.viewTableauHeader()].concat(_toConsumableArray(e.map(function(e){var t=r.toIndex(e),t=i.slice(t,t+r.letterOrder.upper.length);return m("tr",[m("th",m("tt",e))].concat(_toConsumableArray(t.map(function(e){return m("td",m("tt",e))}))))})),[this.viewTableauHeader()]))}},{key:"tableauRows",value:function(){var e,t=this.alphabet.value;return(this.autokey.value||""===(e=new rumkinCipher.util.Message(this.cipherKey.value).separate(t).toString())?t.letterOrder.upper:e).split("")}},{key:"viewTableauHeader",value:function(){var e=keyAlphabet(this.alphabet).letterOrder.upper.split("");return m("tr",[m("th")].concat(_toConsumableArray(e.map(function(e){return m("th",m("tt",e))}))))}},{key:"viewResult",value:function(){return this.cipherKey.value.length<1?m(Result,"You must specify a cipher key"):this.input.value.length<1?m(Result,"Enter words to see it encoded or decoded here"):m(CipherResult,{name:"vigenère",direction:this.direction.value,message:this.input.value,alphabet:keyAlphabet(this.alphabet),options:{key:this.cipherKey.value,autokey:this.autokey.value}})}}]),e}();