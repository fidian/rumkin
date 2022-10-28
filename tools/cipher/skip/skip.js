"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),Checkbox=require("../../../js/mithril/checkbox"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),NumericInput=require("../../../js/mithril/numeric-input"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={value:"ENCRYPT"},this.alphabet={value:new rumkinCipher.alphabet.English},this.offset={value:0,label:"Number of letters to bypass before starting"},this.skip={value:1,label:"Number of letters to skip"},this.input={value:""},this.moveAllCharacters={label:"Encode whitespace, symbols, and everything",value:!1},cipherConduitSetup(this,"skip")}return _createClass(e,[{key:"isSkipValid",value:function(e,t){return rumkinCipher.util.coprime(t,e+1)}},{key:"changeSkipButton",value:function(e,t,i){for(var r=this,s=this.skip.value+t;0<s&&s<i&&!this.isSkipValid(s,i);)s+=t;return m("button",{disabled:s<=0||i<=s,onclick:function(){r.skip.value=s}},e)}},{key:"view",value:function(){var e=this.input.value.length;return this.moveAllCharacters||(e=new rumkinCipher.util.Message(this.input.value).separate(this.alphabet.value).length),this.skip.value<0&&(this.skip.value=0),this.offset.value<0&&(this.offset.value=0),[m("p",m(DirectionSelector,this.direction)),m("p",m(Checkbox,this.moveAllCharacters)),m("p",m(AlphabetSelector,this.alphabet)),m("p",[m(NumericInput,this.skip),this.changeSkipButton("+",1,e),this.changeSkipButton("-",-1,e)]),m("p",m(NumericInput,this.offset)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult(e))]}},{key:"viewResult",value:function(e){return this.isSkipValid(this.skip.value,e)?this.input.value.trim()?m(CipherResult,{name:"skip",direction:this.direction.value,message:this.input.value,alphabet:this.moveAllCharacters.value?null:this.alphabet.value,options:{offset:this.offset.value,skip:this.skip.value}}):m(Result,"Enter text and see it encoded or decoded here"):m(Result,"The number of letters to skip is incompatible with the length of the message.")}}]),e}();