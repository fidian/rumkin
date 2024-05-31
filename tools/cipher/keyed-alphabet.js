"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i,l,o=[],u=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(o.push(n.value),o.length!==t);u=!0);}catch(e){s=!0,a=e}finally{try{if(!u&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(s)throw a}}return o}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}var AlphabetSelector=require("./alphabet-selector"),Checkbox=require("../../js/mithril/checkbox"),keyAlphabet=require("./key-alphabet"),TextInput=require("../../js/mithril/text-input");module.exports=function(){function a(e){function t(e){return n.keyed=keyAlphabet(n),!n.onchange||n.onchange(e)}var r=this,n=(_classCallCheck(this,a),e.attrs);this.initialize(n),this.alphabet={onchange:function(e){return n.value=r.alphabet.value,t(e)}},this.alphabetKey={label:"Alphabet key",oninput:function(e){return n.alphabetKey=e.target.value,t(e)}},this.useLastInstance={label:"Use the last occurrence of a letter instead of the first",onchange:function(e){return n.useLastInstance=!n.useLastInstance,t(e)}},this.reverseKey={label:"Reverse the key before keying",onchange:function(e){return n.reverseKey=!n.reverseKey,t(e)}},this.reverseAlphabet={label:"Reverse the alphabet before keying",onchange:function(e){return n.reverseAlphabet=!n.reverseAlphabet,t(e)}},this.keyAtEnd={label:"Put the key at the end instead of the beginning",onchange:function(e){return n.keyAtEnd=!n.keyAtEnd,t(e)}},this.checkValues(n)}return _createClass(a,[{key:"initialize",value:function(e){e.value||(e.value=new rumkinCipher.alphabet.English),e.alphabetKey||(e.alphabetKey="");for(var t=0,r=["useLastInstance","reverseKey","reverseAlphabet","keyAtEnd"];t<r.length;t++){var n=r[t];e[n]=!!e[n]}}},{key:"checkValues",value:function(e){for(var t=!1,r=0,n=[["value","alphabet"],["alphabetKey","alphabetKey"],["useLastInstance","useLastInstance"],["reverseKey","reverseKey"],["reverseAlphabet","reverseAlphabet"],["keyAtEnd","keyAtEnd"]];r<n.length;r++){var a=_slicedToArray(n[r],2),i=a[0],a=a[1];this[a].value!==e[i]&&(this[a].value=e[i],t=!0)}t&&(e.keyed=keyAlphabet(e))}},{key:"view",value:function(e){e=e.attrs;return this.checkValues(e),[m(AlphabetSelector,this.alphabet),m("br"),m(TextInput,this.alphabetKey),m("br"),m("label",[m(Checkbox,this.useLastInstance)]),m("br"),m("label",[m(Checkbox,this.reverseKey)]),m("br"),m("label",[m(Checkbox,this.reverseAlphabet)]),m("br"),m("label",[m(Checkbox,this.keyAtEnd)]),m("br"),"Resulting alphabet: ",this.viewAlphabet(e)]}},{key:"viewAlphabet",value:function(e){return e.keyed.letterOrder.upper}}]),a}();