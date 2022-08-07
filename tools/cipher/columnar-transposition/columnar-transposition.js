"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}var AdvancedInputArea=require("../advanced-input-area"),AlphabetSelector=require("../alphabet-selector"),Checkbox=require("../../../js/mithril/checkbox"),DirectionSelector=require("../direction-selector"),Result=require("../result"),TextInput=require("../../../js/mithril/text-input");module.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.columnOrder={value:!1,label:"Use the key as a column order instead of column labels"},this.alphabet={value:new rumkinCipher.alphabet.English},this.key={label:"Column key",value:""},this.dupesBackwards={label:"Number duplicate entries backwards instead of forwards",value:!1},this.input={alphabet:this.alphabet,value:""},this.columnKey=null}return _createClass(e,[{key:"view",value:function(){return[m("p",m(DirectionSelector,this.direction)),m("p",m(AlphabetSelector,this.alphabet)),m("p",m(TextInput,this.key)),m("p",m(Checkbox,this.dupesBackwards)),m("p",this.viewKey()),m("p",m(Checkbox,this.columnOrder)),m("p",m(AdvancedInputArea,this.input)),m("p",this.viewResult())]}},{key:"viewKey",value:function(){return this.columnKey=rumkinCipher.util.columnKey(this.alphabet.value,this.key.value,{columnOrder:this.columnOrder.value,dupesBackwards:this.dupesBackwards.value}),1<this.columnKey.length?m("p","The resulting columnar key: ".concat(this.columnKey.map(function(e){return e+1}).join(" "))):m("p","Enter numbers or words to generate a column key")}},{key:"viewResult",value:function(){if(this.columnKey.length<2)return m(Result,"You need at least two columns to encode anything");if(!this.input.value)return m(Result,"Enter text and see the result here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.columnarTransposition[this.direction.cipher](e,this.alphabet.value,{columnKey:this.columnKey});return m(Result,e.toString())}}]),e}();