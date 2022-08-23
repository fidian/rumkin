"use strict";function _createForOfIteratorHelper(e,t){var r,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,l=!0,u=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return l=e.done,e},e:function(e){u=!0,n=e},f:function(){try{l||null==a.return||a.return()}finally{if(u)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function a(n,l,u){function i(t,e){if(!l[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(o)return o(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=l[t]={exports:{}},n[t][0].call(r.exports,function(e){return i(n[t][1][e]||e)},r,r.exports,a,n,l,u)}return l[t].exports}for(var o="function"==typeof require&&require,e=0;e<u.length;e++)i(u[e]);return i}({1:[function(e,t,r){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],2:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,r=e.attrs;return[this.viewLabel(r.label),m("textarea",Object.assign({placeholder:"Enter text here"},r,{class:"W(100%) H(8em) Mah(75vh) ".concat(r.class),oninput:function(e){return t.value=r.value=e.target.value,!!r.oninput&&r.oninput(e)}}))]}}]),e}()},{}],3:[function(e,t,r){var a=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var r=this,n=e.attrs,e=[{label:"letters",callback:function(){var e,t="",r=_createForOfIteratorHelper(n.value.split(""));try{for(r.s();!(e=r.n()).done;){var a=e.value;n.alphabet.value.isLetter(a)||(t+=a)}}catch(e){r.e(e)}finally{r.f()}n.value=t},remove:!n.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(n.value);n.value=e.separate(n.alphabet.value).toString()},remove:!n.alphabet},{label:"numbers",callback:function(){n.value=n.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){n.value=n.value.replace(/[\s]/g,"")}}],t=[{label:"lowercase",callback:function(){n.value=r.lowercase(n.value)}},{label:"Natural case",callback:function(){n.value=r.lowercase(n.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return r.uppercase(e)})}},{label:"Title Case",callback:function(){n.value=r.lowercase(n.value).replace(/(^|\n|\s)\s*\S/g,function(e){return r.uppercase(e)})}},{label:"UPPERCASE",callback:function(){n.value=r.uppercase(n.value)}},{label:"swap case",callback:function(){n.value=n.value.split("").map(function(e){var t=r.uppercase(e);return e===t?r.lowercase(e):t}).join("")}},{label:"reverse",callback:function(){n.value=n.value.split("").reverse().join("")}}];return[m(a,n),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var r,a=[],n=_createForOfIteratorHelper(t);try{for(n.s();!(r=n.n()).done;)!function(){var e=r.value;a.length&&a.push(", "),e.remove||a.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){n.e(e)}finally{n.f()}return a.length?[m("br"),"".concat(e,": "),a]:null}}]),e}()},{"../../js/mithril/input-area":2}],4:[function(e,t,r){for(var n=e("../../js/mithril/dropdown"),l={},a=0,u=Object.keys(rumkinCipher.alphabet);a<u.length;a++){var i=u[a];l[i]=i}t.exports=function(){function a(e){_classCallCheck(this,a);var t=e.attrs,r={options:l,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[r.value],!t.onchange||t.onchange(e)}};this.d=r}return _createClass(a,[{key:"view",value:function(){return m(n,this.d)}}]),a}()},{"../../js/mithril/dropdown":1}],5:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}],6:[function(e,t,r){window.Rot13=e("./rot13")},{"./rot13":7}],7:[function(e,t,r){var a=e("../advanced-input-area"),n=e("../alphabet-selector"),l=e("../result");t.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.input={alphabet:this.alphabet,value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(n,this.alphabet)),m("p",m(a,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){if(this.alphabet.value.letterOrder.upper.length%2==1)return m(l,"This alphabet has an odd number of letters. Select another to encode or decode messages.");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.caesar.encipher(e,this.alphabet.value,{shift:this.alphabet.value.letterOrder.upper.length/2});return m(l,e.toString())}}]),e}()},{"../advanced-input-area":3,"../alphabet-selector":4,"../result":5}]},{},[6]);