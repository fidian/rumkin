"use strict";function _createForOfIteratorHelper(e,t){var r,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),Dropdown=require("../../../js/mithril/dropdown"),keyAlphabet=require("../key-alphabet"),KeyedAlphabet=require("../keyed-alphabet"),Result=require("../result");module.exports=function(){function e(){var i=this;_classCallCheck(this,e),this.direction={},this.alphabet={value:new rumkinCipher.alphabet.English,onchange:function(){return i.resetTranslations()}},this.input={label:"The message to encipher or decipher",value:""},this.doubles={label:"How to handle double letters",value:"PAD",options:{PAD:"Pad the string by inserting a letter between them",DOWN_RIGHT:"Encode by moving right one column and down one row",UNCHANGED:"Leave the double letters unchanged",REPLACE:"Replace the second letter with a padding letter"}},this.resetTranslations(),cipherConduitSetup(this,"playfair",function(e){i.resetTranslations();var t,r=0,n=_createForOfIteratorHelper((e.translations||"").split(" "));try{for(n.s();!(t=n.n()).done;){var a=t.value,o=i.translations[r];o&&(o.from=a[0],o.to=a[1]),r+=1}}catch(e){n.e(e)}finally{n.f()}})}return _createClass(e,[{key:"resetTranslations",value:function(){var e=keyAlphabet(this.alphabet),t=Math.floor(Math.sqrt(e.length)),r=e.length-t*t;for(this.translations=[];this.translations.length<r;){var n=e.toLetter(0),a=e.toLetter(1),o=e.toIndex("I"),i=e.toIndex("J");-1!==o&&-1!==i&&(n="J",a="I"),this.translations.push({from:n,to:a,sourceAlphabet:e}),e=e.collapse(n,a)}this.alphabetInstance=e}},{key:"updateAlphabet",value:function(){var e,t=keyAlphabet(this.alphabet),r=_createForOfIteratorHelper(this.translations);try{for(r.s();!(e=r.n()).done;){var n=e.value,a=t.toIndex(n.from),o=t.toIndex(n.to);-1===a&&(n.from=t.toLetter(0)),-1===o&&(n.to=t.toLetter(0)),n.from===n.to&&(n.to=t.toLetter(0),n.from===n.to&&(n.to=t.toLetter(1))),t=(n.sourceAlphabet=t).collapse(n.from,n.to)}}catch(e){r.e(e)}finally{r.f()}this.alphabetInstance=t}},{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(KeyedAlphabet,this.alphabet)),this.viewTranslations(),this.viewTableau(),m("p",m(Dropdown,this.doubles)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return this.input.value?m(CipherResult,{name:"playfair",direction:this.direction.value,message:this.input.value,alphabet:this.alphabetInstance,options:{doubles:this.doubles.value}}):m(Result,"Enter text to see it encoded here")}},{key:"viewTableau",value:function(){for(var e=this.alphabetInstance,t=Math.sqrt(e.length),r="",n=0;n<t;n+=1){for(var a=0;a<t;a+=1)r+=e.toLetter(n*t+a)+" ";r=r.trim()+"\n"}return m("p",["Your tableau: ",m("span",{class:"D(if) Jc(c)"},m("pre",{class:"Mt(0)"},r))])}},{key:"viewTranslations",value:function(){var o=this;return 0===this.translations.length?null:this.translations.map(function(t){for(var e={options:{},value:t.from,onchange:function(e){t.from=e.target.value,o.updateAlphabet()}},r={options:{},value:t.to,onchange:function(e){t.to=e.target.value,o.updateAlphabet()}},n=0;n<t.sourceAlphabet.length;n+=1){var a=t.sourceAlphabet.toLetter(n);(e.options[a]=a)!==e.value&&(r.options[a]=a)}return m("p",["Translate ",m(Dropdown,e)," into ",m(Dropdown,r)])})}}]),e}();