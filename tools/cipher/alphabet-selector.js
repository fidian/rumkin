"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}for(var Dropdown=require("../../js/mithril/dropdown"),options={},_i=0,_Object$keys=Object.keys(rumkinCipher.alphabet);_i<_Object$keys.length;_i++){var name=_Object$keys[_i];options[name]=name}module.exports=function(){function r(e){_classCallCheck(this,r);var n=e.attrs,t={options:options,label:"Alphabet",value:n.value.name,onchange:function(e){return n.value=new rumkinCipher.alphabet[t.value],!n.onchange||n.onchange(e)}};this.d=t}return _createClass(r,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(Dropdown,this.d)}}]),r}();