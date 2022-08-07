"use strict";function _createForOfIteratorHelper(e,t){var n,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,l=!0,i=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return l=e.done,e},e:function(e){i=!0,r=e},f:function(){try{l||null==a.return||a.return()}finally{if(i)throw r}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function a(r,l,i){function u(t,e){if(!l[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(o)return o(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=l[t]={exports:{}},r[t][0].call(n.exports,function(e){return u(r[t][1][e]||e)},n,n.exports,a,r,l,i)}return l[t].exports}for(var o="function"==typeof require&&require,e=0;e<i.length;e++)u(i[e]);return u}({1:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],3:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],4:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],5:[function(e,t,n){var a=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var r=e.attrs,e=[{label:"letters",callback:function(){var e,t="",n=_createForOfIteratorHelper(r.value.split(""));try{for(n.s();!(e=n.n()).done;){var a=e.value;r.alphabet.value.isLetter(a)||(t+=a)}}catch(e){n.e(e)}finally{n.f()}r.value=t},remove:!r.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(r.value);r.value=e.separate(r.alphabet.value).toString()},remove:!r.alphabet},{label:"numbers",callback:function(){r.value=r.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){r.value=r.value.replace(/[\s]/g,"")}}];return[m(a,r),m("br"),this.viewActions("Remove",e)]}},{key:"viewActions",value:function(e,t){var n,a=[],r=_createForOfIteratorHelper(t);try{for(r.s();!(n=r.n()).done;)!function(){var e=n.value;a.length&&a.push(", "),e.remove||a.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){r.e(e)}finally{r.f()}return a.length?[m("br"),"".concat(e,": "),a]:null}}]),e}()},{"../../js/mithril/input-area":3}],6:[function(e,t,n){for(var r=e("../../js/mithril/dropdown"),l={},a=0,i=Object.keys(rumkinCipher.alphabet);a<i.length;a++){var u=i[a];l[u]=u}t.exports=function(){function a(e){_classCallCheck(this,a);var t=e.attrs,n={options:l,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[n.value],!t.onchange||t.onchange(e)}};this.d=n}return _createClass(a,[{key:"view",value:function(){return m(r,this.d)}}]),a}()},{"../../js/mithril/dropdown":2}],7:[function(e,t,n){window.Caesar=e("./caesar")},{"./caesar":8}],8:[function(e,t,n){var a=e("../advanced-input-area"),r=e("../direction-selector"),l=e("../../../js/mithril/dropdown"),i=e("../keyed-alphabet"),u=e("../result");t.exports=function(){function t(){var e=this;_classCallCheck(this,t),this.direction={},this.alphabet={alphabet:new rumkinCipher.alphabet.English,value:new rumkinCipher.alphabet.English,onchange:function(){e.updateN()}},this.n={label:"N",value:"3"},this.input={alphabet:this.alphabet,value:""},this.updateN()}return _createClass(t,[{key:"updateN",value:function(){this.n.options={};for(var e=0;e<this.alphabet.value.length;e+=1)this.n.options[e]=e.toString();this.n.value=Math.min(3,this.alphabet.value.length)}},{key:"view",value:function(){return[m("p",m(r,this.direction)),m("p",m(i,this.alphabet)),m("p",m(l,this.n)),this.viewAlphabet(),m("p",m(a,this.input)),this.viewResult()]}},{key:"viewAlphabet",value:function(){var e=this.alphabet.alphabet.letterOrder.upper,t=this.alphabet.value.letterOrder.upper,n=t.substr(+this.n.value)+t.substr(0,+this.n.value);return m("div",{class:"D(f) Jc(c)"},m("pre","Letters: ".concat(e,"\n  Keyed: ").concat(t,"\nEncoded: ").concat(n)))}},{key:"viewResult",value:function(){if(""===this.input.value.trim())return m(u,"Enter text to see the result here");var e=new rumkinCipher.util.Message(this.input.value),e=rumkinCipher.cipher.caesar[this.direction.cipher](e,this.alphabet.value,{shift:+this.n.value});return m(u,e.toString())}}]),t}()},{"../../../js/mithril/dropdown":2,"../advanced-input-area":5,"../direction-selector":9,"../keyed-alphabet":10,"../result":11}],9:[function(e,t,n){var r=e("../../js/mithril/dropdown");t.exports=function(){function a(e){var t=this,n=(_classCallCheck(this,a),e.attrs);this.d={options:{ENCRYPT:"Encrypt",DECRYPT:"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return n.value=t.d.value,t.updateValues(n),!n.onchange||n.onchange(e)}},this.updateValues(n)}return _createClass(a,[{key:"updateValues",value:function(e){"ENCRYPT"===this.d.value?(e.cipher="encipher",e.crypt="encrypt",e.code="encode",e.obfuscate=!0):(e.cipher="decipher",e.crypt="decrypt",e.code="decode",e.obfuscate=!1)}},{key:"view",value:function(){return m(r,this.d)}}]),a}()},{"../../js/mithril/dropdown":2}],10:[function(e,t,n){var a=e("./alphabet-selector"),l=e("../../js/mithril/checkbox"),i=e("../../js/mithril/text-input");t.exports=function(){function r(e){function t(e){return n.value=a.value=a.alphabet.keyWord(a.alphabetKey,{useLastInstance:n.useLastInstance.value,reverseKey:n.reverseKey.value,reverseAlphabet:n.reverseAlphabet.value,keyAtEnd:n.keyAtEnd.value}),!a.onchange||a.onchange(e)}var n=this,a=(_classCallCheck(this,r),e.attrs);a.alphabet||(a.alphabet=new rumkinCipher.alphabet.English),a.alphabetKey||(a.alphabetKey="");this.alphabet={value:a.alphabet,onchange:function(e){return a.alphabet=n.alphabet.value,t(e)}},this.alphabetKey={label:"Alphabet key",value:a.alphabetKey,oninput:function(e){return a.alphabetKey=e.target.value,t(e)}},this.useLastInstance={label:"Use the last occurrence of a letter instead of the first",value:!1,onchange:t},this.reverseKey={label:"Reverse the key before keying",value:!1,onchange:t},this.reverseAlphabet={label:"Reverse the alphabet before keying",value:!1,onchange:t},this.keyAtEnd={label:"Put the key at the end instead of the beginning",value:!1,onchange:t},t(null)}return _createClass(r,[{key:"view",value:function(){return[m(a,this.alphabet),m("br"),m(i,this.alphabetKey),m("br"),m("label",[m(l,this.useLastInstance)]),m("br"),m("label",[m(l,this.reverseKey)]),m("br"),m("label",[m(l,this.reverseAlphabet)]),m("br"),m("label",[m(l,this.keyAtEnd)]),m("br"),"Resulting alphabet: ",this.viewAlphabet()]}},{key:"viewAlphabet",value:function(){return this.value.letterOrder.upper}}]),r}()},{"../../js/mithril/checkbox":1,"../../js/mithril/text-input":4,"./alphabet-selector":6}],11:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[7]);