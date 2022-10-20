"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),cipherConduitSetup=require("../cipher-conduit-setup"),CipherResult=require("../cipher-result"),DirectionSelector=require("../direction-selector"),ErrorMessage=require("../error-message"),NumericInput=require("../../../js/mithril/numeric-input"),Result=require("../result");module.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.a={label:["Multiplier (",m("tt","a"),")"],value:1,class:"W(4em)"},this.b={label:["Shift (",m("tt","b"),")"],value:1,class:"W(4em)"},this.direction={},this.input={value:""},cipherConduitSetup(this,"affine")}return _createClass(e,[{key:"modifyA",value:function(e){var t=this.a.value;for(t+=e;1<=t&&!rumkinCipher.util.coprime(t,this.alphabet.value.length);)t+=e;this.a.value=t=t<1?1:t}},{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",this.viewAlphabet()),m("p",this.viewA()),m("p",this.viewB()),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewA",value:function(){var e=this;return[m(NumericInput,this.a)," ",m("button",{class:"W(3em)",onclick:function(){e.modifyA(1)}},"+")," ",m("button",{class:"W(3em)",onclick:function(){e.modifyA(-1)}},"-"),m("br"),"This must be at least 1 and coprime to the length of the alphabet. Using the plus and minus buttons will jump to the next valid value."]}},{key:"viewAlphabet",value:function(){var e=this.alphabet.value.letterOrder.upper&&this.alphabet.value.letterOrder.lower?" and lowercase":"";return[m(AlphabetSelector,this.alphabet)," (m = ".concat(this.alphabet.value.length,")"),m("br"),"Letters: ".concat(this.alphabet.value.letterOrder.upper),e,this.viewAlphabetTranslations()]}},{key:"viewAlphabetTranslations",value:function(){var e=Object.keys(this.alphabet.value.translations);return 0===e.length?null:[" (also these are translated: ",e.join(""),")"]}},{key:"viewB",value:function(){return[m(NumericInput,this.b),m("br"),"This is the amount of characters to shift."]}},{key:"viewResult",value:function(){var e=this.a.value,t=this.b.value||0;return e<1?m(ErrorMessage,["The value of ",m("tt","a")," must be greater than zero."]):Math.floor(e)!==e?m(ErrorMessage,["The value of ",m("tt","b")," must be an integer."]):rumkinCipher.util.coprime(this.a.value,this.alphabet.value.length)?Math.floor(t)!==t?m(ErrorMessage,["The value of ",m("tt",t)," must be an integer."]):""===this.input.value.trim()?m(Result,"Enter text to see it encoded here"):m(CipherResult,{name:"affine",direction:this.direction.value,message:this.input.value,alphabet:this.alphabet.value,options:{multiplier:this.a.value,shift:this.b.value}}):m(ErrorMessage,["The value of ",m("tt","a")," must be coprime to the alphabet length."])}}]),e}();