"use strict";function _createForOfIteratorHelper(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function r(a,i,u){function o(t,e){if(!i[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},a[t][0].call(n.exports,function(e){return o(a[t][1][e]||e)},n,n.exports,r,a,i,u)}return i[t].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)o(u[e]);return o}({1:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],3:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],4:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],5:[function(e,t,n){var r=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs,e=[{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(t.value);t.value=e.separate(t.alphabet.value).toString()},remove:!t.alphabet}];return[m(r,t),m("br"),this.viewActions("Remove",e)]}},{key:"viewActions",value:function(e,t){var n,r=[],a=_createForOfIteratorHelper(t);try{for(a.s();!(n=a.n()).done;)!function(){var e=n.value;r.length&&r.push(", "),e.remove||r.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){a.e(e)}finally{a.f()}return r.length?[m("br"),"".concat(e,": "),r]:null}}]),e}()},{"../../js/mithril/input-area":3}],6:[function(e,t,n){for(var a=e("../../js/mithril/dropdown"),i={},r=0,u=Object.keys(rumkinCipher.alphabet);r<u.length;r++){var o=u[r];i[o]=o}t.exports=function(){function r(e){_classCallCheck(this,r);var t=e.attrs,n={options:i,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[n.value],!t.onchange||t.onchange(e)}};this.d=n}return _createClass(r,[{key:"view",value:function(){return m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":2}],7:[function(e,t,n){var a=e("../../js/mithril/dropdown");t.exports=function(){function r(e){var t=this,n=(_classCallCheck(this,r),e.attrs);this.d={options:{ENCRYPT:"Encrypt",DECRYPT:"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return n.value=t.d.value,t.updateValues(n),!n.onchange||n.onchange(e)}},this.updateValues(n)}return _createClass(r,[{key:"updateValues",value:function(e){"ENCRYPT"===this.d.value?(e.cipher="encipher",e.crypt="encrypt",e.code="encode",e.obfuscate=!0):(e.cipher="decipher",e.crypt="decrypt",e.code="decode",e.obfuscate=!1)}},{key:"view",value:function(){return m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":2}],8:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}],9:[function(e,t,n){window.Vigenere=e("./vigenere")},{"./vigenere":10}],10:[function(e,t,n){var r=e("../advanced-input-area"),a=e("../alphabet-selector"),i=e("../../../js/mithril/checkbox"),u=e("../direction-selector"),o=e("../result"),l=e("../../../js/mithril/text-input");t.exports=function(){function e(){_classCallCheck(this,e),this.direction={},this.alphabet={value:new rumkinCipher.alphabet.English},this.key={label:"Key",value:""},this.autokey={label:'Use "autokey" variant to extend the key with plaintext',value:!1},this.input={alphabet:this.alphabet,value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(u,this.direction)),m("p",m(a,this.alphabet)),m("p",m(l,this.key)),m("p",m(i,this.autokey)),m("p",m(r,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){if(this.key.value.length<1)return m(o,"You must specify a key");if(this.input.value.length<1)return m(o,"Enter words to see it encoded or decoded here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.vigenere[this.direction.cipher](e,this.alphabet.value,{key:this.key.value,autokey:this.autokey.value});return m(o,e.toString())}}]),e}()},{"../../../js/mithril/checkbox":1,"../../../js/mithril/text-input":4,"../advanced-input-area":5,"../alphabet-selector":6,"../direction-selector":7,"../result":8}]},{},[9]);