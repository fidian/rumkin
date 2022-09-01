"use strict";function _createForOfIteratorHelper(e,t){var r,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,u=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return i=e.done,e},e:function(e){u=!0,n=e},f:function(){try{i||null==a.return||a.return()}finally{if(u)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),Checkbox=require("../../../js/mithril/checkbox"),cipherConduitSetup=require("../cipher-conduit-setup"),DirectionSelector=require("../direction-selector"),Dropdown=require("../../../js/mithril/dropdown"),Result=require("../result"),TextInput=require("../../../js/mithril/text-input");module.exports=function(){function t(){var e=this;_classCallCheck(this,t),this.direction={value:"ENCRYPT"},this.alphabet={value:new rumkinCipher.alphabet.English,onchange:function(){e.setPadCharacterOptions()}},this.columnOrder={value:!1,label:"Use the key as a column order instead of column labels"},this.dupesBackwards={label:"Number duplicate entries backwards instead of forwards",value:!1},this.columnKey={label:"Columnar key",value:""},this.input={alphabet:this.alphabet,value:""},this.padCharacter={label:"Charcter to use when padding the message",value:""},this.setPadCharacterOptions(),cipherConduitSetup(this,"ubchi",function(){e.setPadCharacterOptions()})}return _createClass(t,[{key:"parseColumnKey",value:function(){return rumkinCipher.util.columnKey(this.alphabet.value,this.columnKey.value,{columnOrder:this.columnOrder.value,dupesBackwards:this.dupesBackwards.value})}},{key:"setPadCharacterOptions",value:function(){var e,t=!(this.padCharacter.options={}),r=_createForOfIteratorHelper(this.alphabet.value.letterOrder.upper.split(""));try{for(r.s();!(e=r.n()).done;){var a=e.value;this.padCharacter.options[a]=a,this.padCharacter.value===a&&(t=!0)}}catch(e){r.e(e)}finally{r.f()}t||(this.padCharacter.value=this.alphabet.value.letterOrder.upper.substr(-1,1))}},{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(AlphabetSelector,this.alphabet)),m("p",m(TextInput,this.columnKey)),m("p",m(Checkbox,this.dupesBackwards)),m("p",m(Checkbox,this.columnOrder)),m("p",this.viewKey()),m("p",m(Dropdown,this.padCharacter)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewKey",value:function(){var e=this.parseColumnKey();return 1<e.length?m("p","The resulting columnar key: ".concat(e.map(function(e){return e+1}).join(" "))):m("p","Enter numbers or words to generate a column key")}},{key:"viewResult",value:function(){var e=this.parseColumnKey();if(e.length<2)return m(Result,"You need at least two columns in order to encode anything");if(!this.input.value)return m(Result,"Enter text and see the result here");var e={columnKey:e},t=new rumkinCipher.util.Message(this.input.value),r=rumkinCipher.cipher.columnarTransposition;if("ENCRYPT"===this.direction.value)return(n=r.encipher(t,this.alphabet.value,e)).append(new rumkinCipher.util.MessageChunk(this.padCharacter.value,[-1])),n=r.encipher(n,this.alphabet.value,e),m(Result,n.toString());var a=r.decipher(t,this.alphabet.value,e),n=a.filter(function(e,t){return t<a.length-1}),t=r.decipher(n,this.alphabet.value,e);return m(Result,t.toString())}}]),t}();