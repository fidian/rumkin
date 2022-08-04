"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),DirectionSelector=require("../direction-selector"),Dropdown=require("../../../js/mithril/dropdown"),KeyedAlphabet=require("../keyed-alphabet"),Result=require("../result");module.exports=function(){function t(){var e=this;_classCallCheck(this,t),this.direction={},this.alphabet={alphabet:new rumkinCipher.alphabet.English,value:new rumkinCipher.alphabet.English,onchange:function(){e.updateN()}},this.n={label:"N",value:"3"},this.input={alphabet:this.alphabet,value:""},this.updateN()}return _createClass(t,[{key:"updateN",value:function(){this.n.options={};for(var e=0;e<this.alphabet.value.length;e+=1)this.n.options[e]=e.toString();this.n.value=Math.min(3,this.alphabet.value.length)}},{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(KeyedAlphabet,this.alphabet)),m("p",m(Dropdown,this.n)),this.viewAlphabet(),m("p",m(AdvancedInputArea,this.input)),this.viewResult()]}},{key:"viewAlphabet",value:function(){var e=this.alphabet.alphabet.letterOrder.upper,t=this.alphabet.value.letterOrder.upper,i=t.substr(+this.n.value)+t.substr(0,+this.n.value);return m("div",{class:"D(f) Jc(c)"},m("pre","Letters: ".concat(e,"\n  Keyed: ").concat(t,"\nEncoded: ").concat(i)))}},{key:"viewResult",value:function(){if(""===this.input.value.trim())return m(Result,"Enter text to see the result here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.caesar[this.direction.cipher](e,this.alphabet.value,{shift:+this.n.value});return m(Result,e.toString())}}]),t}();