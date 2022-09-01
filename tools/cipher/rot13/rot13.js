"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.input={alphabet:this.alphabet,value:""},cipherConduitSetup(this,"rot13")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(AlphabetSelector,this.alphabet)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return this.alphabet.value.letterOrder.upper.length%2==1?m(Result,"This alphabet has an odd number of letters. Select another to encode or decode messages."):this.input.value.trim().length?m(CipherResult,{name:"caesar",direction:"ENCRYPT",message:this.input.value,alphabet:this.alphabet.value,options:{shift:this.alphabet.value.letterOrder.upper.length/2}}):m(Result,"Enter text to see it encoded or decoded here")}}]),e}();