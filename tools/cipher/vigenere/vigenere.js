"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),Checkbox=require("../../../js/mithril/checkbox"),DirectionSelector=require("../direction-selector"),Result=require("../result"),TextInput=require("../../../js/mithril/text-input");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.alphabet={value:new rumkinCipher.alphabet.English},this.key={label:"Key",value:""},this.autokey={label:'Use "autokey" variant to extend the key with plaintext',value:!1},this.input={alphabet:this.alphabet,value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(AlphabetSelector,this.alphabet)),m("p",m(TextInput,this.key)),m("p",m(Checkbox,this.autokey)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){if(this.key.value.length<1)return m(Result,"You must specify a key");if(this.input.value.length<1)return m(Result,"Enter words to see it encoded or decoded here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.vigenère[this.direction.cipher](e,this.alphabet.value,{key:this.key.value,autokey:this.autokey.value});return m(Result,e.toString())}}]),e}();