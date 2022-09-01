"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),Checkbox=require("../../../js/mithril/checkbox"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),keyAlphabet=require("../key-alphabet"),KeyedAlphabet=require("../keyed-alphabet"),Result=require("../result"),ShowHide=require("../show-hide"),TextInput=require("../../../js/mithril/text-input");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.alphabet={value:new rumkinCipher.alphabet.English},this.autokey={label:'Use "autokey" variant to extend the key with plaintext (not typical for Gronsfeld)',value:!1},this.cipherKey={label:"Cipher key",value:""},this.input={alphabet:this.alphabet,label:"Message to encode or decode",value:""},cipherConduitSetup(this,"gronsfeld")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(KeyedAlphabet,this.alphabet)),m("p",[m(TextInput,this.cipherKey),m("br"),this.viewVigenereKey()]),m("p",m(ShowHide,{label:"Tableau",content:this.viewTableau()})),m("p",m(Checkbox,this.autokey)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewVigenereKey",value:function(){var t=keyAlphabet(this.alphabet);return this.vigenereKey=this.cipherKey.value.replace(/[^0-9]/g,"").replace(/[0-9]/g,function(e){return t.letterOrder.upper.charAt(+e)}),"Vigenère equivalent key: ".concat(this.vigenereKey)}},{key:"viewTableau",value:function(){var r=this,e=keyAlphabet(this.alphabet),a=(e.letterOrder.upper+e.letterOrder.upper).split(""),e=this.tableauRows();return m("table",[this.viewTableauHeader()].concat(_toConsumableArray(e.map(function(e){var t=a.slice(e,e+r.alphabet.value.letterOrder.upper.length);return m("tr",[m("th",m("tt",e))].concat(_toConsumableArray(t.map(function(e){return m("td",m("tt",e))}))))})),[this.viewTableauHeader()]))}},{key:"tableauRows",value:function(){var e=[0,1,2,3,4,5,6,7,8,9];if(this.autokey.value)return e;var t=this.cipherKey.value.replace(/[^0-9]/g,"");return""===t?e:t.split("").map(function(e){return+e})}},{key:"viewTableauHeader",value:function(){var e=keyAlphabet(this.alphabet).letterOrder.upper.split("");return m("tr",[m("th")].concat(_toConsumableArray(e.map(function(e){return m("th",m("tt",e))}))))}},{key:"viewResult",value:function(){return""===this.input.value.trim()?m(Result,"Enter text and see the result here"):m(CipherResult,{name:"vigenère",direction:this.direction.value,message:this.input.value,alphabet:keyAlphabet(this.alphabet),options:{key:this.vigenereKey,autokey:this.autokey.value}})}}]),e}();