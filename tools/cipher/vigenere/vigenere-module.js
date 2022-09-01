"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var r,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw a}}}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i=[],l=!0,o=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){o=!0,a=e}finally{try{l||null==r.return||r.return()}finally{if(o)throw a}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function n(a,i,l){function o(t,e){if(!i[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},a[t][0].call(r.exports,function(e){return o(a[t][1][e]||e)},r,r.exports,n,a,i,l)}return i[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)o(l[e]);return o}({1:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",checked:!!t.value,onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,r){var n=e("../module/conduit-events");t.exports=function(){function i(e){_classCallCheck(this,i);e=e.attrs;if(this.label=e["data-label"],this.topic=e["data-topic"],e["data-payload"])this.payload=e["data-payload"];else{this.payload={};for(var t=0,r=Object.entries(e);t<r.length;t++){var n=_slicedToArray(r[t],2),a=n[0],n=n[1],a=a.match(/^data-payload-(.*)/);a&&(a=a[1].replace(/-./g,function(e){return e.toUpperCase()}),this.payload[a]=n)}}}return _createClass(i,[{key:"view",value:function(){var e=this;return m("button",{onclick:function(){n.emit(e.topic,e.payload)}},this.label)}}]),i}()},{"../module/conduit-events":6}],3:[function(e,t,r){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],4:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,r=e.attrs;return[this.viewLabel(r.label),m("textarea",Object.assign({placeholder:"Enter text here"},r,{class:"W(100%) H(8em) Mah(75vh) ".concat(r.class),oninput:function(e){return t.value=r.value=e.target.value,!!r.oninput&&r.oninput(e)}}))]}}]),e}()},{}],5:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],6:[function(e,t,r){e=new(e("./event-emitter"));t.exports=e},{"./event-emitter":7}],7:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,r=new Array(1<t?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var a,i=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(i.s();!(a=i.n()).done;){var l=a.value;try{l.apply(void 0,r)}catch(e){}}}catch(e){i.e(e)}finally{i.f()}}},{key:"off",value:function(e,t){var r=this.listeners.get(e);if(r)for(var n=r.length-1;0<=n;--n)r[n]===t&&r.splice(n,1)}},{key:"on",value:function(e,t){var r=this,n=this.listeners.get(e);return n||this.listeners.set(e,n=[]),n.push(t),function(){return r.off(e,t)}}}]),e}()},{}],8:[function(e,t,r){var n=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var r=this,a=e.attrs,e=[{label:"letters",callback:function(){var e,t="",r=_createForOfIteratorHelper(a.value.split(""));try{for(r.s();!(e=r.n()).done;){var n=e.value;a.alphabet.value.isLetter(n)||(t+=n)}}catch(e){r.e(e)}finally{r.f()}a.value=t},remove:!a.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(a.value);a.value=e.separate(a.alphabet.value).toString()},remove:!a.alphabet},{label:"numbers",callback:function(){a.value=a.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){a.value=a.value.replace(/[\s]/g,"")}}],t=[{label:"lowercase",callback:function(){a.value=r.lowercase(a.value)}},{label:"Natural case",callback:function(){a.value=r.lowercase(a.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return r.uppercase(e)})}},{label:"Title Case",callback:function(){a.value=r.lowercase(a.value).replace(/(^|\n|\s)\s*\S/g,function(e){return r.uppercase(e)})}},{label:"UPPERCASE",callback:function(){a.value=r.uppercase(a.value)}},{label:"swap case",callback:function(){a.value=a.value.split("").map(function(e){var t=r.uppercase(e);return e===t?r.lowercase(e):t}).join("")}},{label:"reverse",callback:function(){a.value=a.value.split("").reverse().join("")}}];return[m(n,a),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var r,n=[],a=_createForOfIteratorHelper(t);try{for(a.s();!(r=a.n()).done;)!function(){var e=r.value;n.length&&n.push(", "),e.remove||n.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){a.e(e)}finally{a.f()}return n.length?[m("br"),"".concat(e,": "),n]:null}}]),e}()},{"../../js/mithril/input-area":4}],9:[function(e,t,r){for(var a=e("../../js/mithril/dropdown"),i={},n=0,l=Object.keys(rumkinCipher.alphabet);n<l.length;n++){var o=l[n];i[o]=o}t.exports=function(){function n(e){_classCallCheck(this,n);var t=e.attrs,r={options:i,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[r.value],!t.onchange||t.onchange(e)}};this.d=r}return _createClass(n,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(a,this.d)}}]),n}()},{"../../js/mithril/dropdown":3}],10:[function(e,t,r){var u=rumkinCipher.util.Alphabet,n=e("../../js/module/conduit-events");function a(n,e,a){var i=n[e];n[e]=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];i&&i.apply(n,t),a(t)}}function s(e,t,r){e=e[t];if(e&&"object"===_typeof(e)&&void 0!==e.value){t=e.value;if("number"==typeof t)e.value=+r;else if("string"==typeof t)e.value=r;else if("boolean"==typeof t)e.value="true"===r;else if(t instanceof u){var n,a=e,i=_createForOfIteratorHelper(r.split(" "));try{for(i.s();!(n=i.n()).done;){var l=n.value.split(":"),o=void 0;switch(l[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":a[l[0]]="true"===l[1];break;case"alphabetKey":a.alphabetKey=l[1];break;default:(o=rumkinCipher.alphabet[l[0]])&&(a.value=new o)}}}catch(e){i.e(e)}finally{i.f()}}}}t.exports=function(l,e,o){var t=null;a(l,"oninit",function(){t=n.on(e,function(e){for(var t=l,r=0,n=Object.entries(e);r<n.length;r++){var a=_slicedToArray(n[r],2),i=a[0],a=a[1];s(t,i.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),a)}o&&o()})}),a(l,"onbeforeresume",function(){t&&t()})}},{"../../js/module/conduit-events":6}],11:[function(e,t,r){var i=e("./result");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){e=e.attrs;return rumkinCipher.cipher[e.name]?this.viewCipher(e,rumkinCipher.cipher[e.name]):this.viewCode(e,rumkinCipher.code[e.name])}},{key:"viewCipher",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encipher":"decipher",e)}},{key:"viewCode",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encode":"decode",e)}},{key:"viewOutput",value:function(e,t,r){var n=new rumkinCipher.util.Message(r.message),a=r.alphabet,r=r.options||void 0,e=e[t](n,a,r);return m(i,e.toString())}}]),e}()},{"./result":15}],12:[function(e,t,r){var a=e("../../js/mithril/dropdown");t.exports=function(){function n(e){var t=this,r=(_classCallCheck(this,n),e.attrs);r.value||(r.value="ENCRYPT"),this.d={options:{ENCRYPT:r.code?"Encode":"Encrypt",DECRYPT:r.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return r.value=t.d.value,!r.onchange||r.onchange(e)}}}return _createClass(n,[{key:"view",value:function(e){return this.d.value!==e.attrs.value&&(this.d.value=e.attrs.value),m(a,this.d)}}]),n}()},{"../../js/mithril/dropdown":3}],13:[function(e,t,r){t.exports=function(e){return e.value.keyWord(e.alphabetKey||"",{useLastInstance:e.useLastInstance,reverseKey:e.reverseKey,reverseAlphabet:e.reverseAlphabet,keyAtEnd:e.keyAtEnd})}},{}],14:[function(e,t,r){var n=e("./alphabet-selector"),i=e("../../js/mithril/checkbox"),l=e("./key-alphabet"),o=e("../../js/mithril/text-input");t.exports=function(){function a(e){function t(e){return n.keyed=l(n),!n.onchange||n.onchange(e)}var r=this,n=(_classCallCheck(this,a),e.attrs);this.initialize(n),this.alphabet={onchange:function(e){return n.value=r.alphabet.value,t(e)}},this.alphabetKey={label:"Alphabet key",oninput:function(e){return n.alphabetKey=e.target.value,t(e)}},this.useLastInstance={label:"Use the last occurrence of a letter instead of the first",onchange:function(e){return n.useLastInstance=!n.useLastInstance,t(e)}},this.reverseKey={label:"Reverse the key before keying",onchange:function(e){return n.reverseKey=!n.reverseKey,t(e)}},this.reverseAlphabet={label:"Reverse the alphabet before keying",onchange:function(e){return n.reverseAlphabet=!n.reverseAlphabet,t(e)}},this.keyAtEnd={label:"Put the key at the end instead of the beginning",onchange:function(e){return n.keyAtEnd=!n.keyAtEnd,t(e)}},this.checkValues(n)}return _createClass(a,[{key:"initialize",value:function(e){e.value||(e.value=new rumkinCipher.alphabet.English),e.alphabetKey||(e.alphabetKey="");for(var t=0,r=["useLastInstance","reverseKey","reverseAlphabet","keyAtEnd"];t<r.length;t++){var n=r[t];e[n]=!!e[n]}}},{key:"checkValues",value:function(e){for(var t=!1,r=0,n=[["value","alphabet"],["alphabetKey","alphabetKey"],["useLastInstance","useLastInstance"],["reverseKey","reverseKey"],["reverseAlphabet","reverseAlphabet"],["keyAtEnd","keyAtEnd"]];r<n.length;r++){var a=_slicedToArray(n[r],2),i=a[0],a=a[1];this[a].value!==e[i]&&(this[a].value=e[i],t=!0)}t&&(e.keyed=l(e))}},{key:"view",value:function(e){e=e.attrs;return this.checkValues(e),[m(n,this.alphabet),m("br"),m(o,this.alphabetKey),m("br"),m("label",[m(i,this.useLastInstance)]),m("br"),m("label",[m(i,this.reverseKey)]),m("br"),m("label",[m(i,this.reverseAlphabet)]),m("br"),m("label",[m(i,this.keyAtEnd)]),m("br"),"Resulting alphabet: ",this.viewAlphabet(e)]}},{key:"viewAlphabet",value:function(e){return e.keyed.letterOrder.upper}}]),a}()},{"../../js/mithril/checkbox":1,"../../js/mithril/text-input":5,"./alphabet-selector":9,"./key-alphabet":13}],15:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}],16:[function(e,t,r){t.exports=function(){function t(e){_classCallCheck(this,t),this.isShowing=!!e.attrs.show}return _createClass(t,[{key:"linkToggle",value:function(e,t){var r=this;return m("a",{href:"#",onclick:function(){r.isShowing=!r.isShowing}},"".concat(e," ").concat(t.attrs.label))}},{key:"view",value:function(e){return this.isShowing?[this.linkToggle("Hide",e),m("br"),e.attrs.content]:this.linkToggle("Show",e)}}]),t}()},{}],17:[function(e,t,r){window.Conduit=e("../../../js/mithril/conduit"),window.Vigenere=e("./vigenere")},{"../../../js/mithril/conduit":2,"./vigenere":18}],18:[function(e,t,r){var n=e("../advanced-input-area"),a=e("../../../js/mithril/checkbox"),i=e("../cipher-conduit-setup"),l=e("../cipher-result"),o=e("../direction-selector"),u=e("../key-alphabet"),s=e("../keyed-alphabet"),c=e("../result"),h=e("../show-hide"),p=e("../../../js/mithril/text-input");t.exports=function(){function e(){_classCallCheck(this,e),this.direction={value:"ENCRYPT"},this.alphabet={value:new rumkinCipher.alphabet.English},this.cipherKey={label:"Cipher key",value:""},this.autokey={label:'Use "autokey" variant to extend the key with plaintext',value:!1},this.input={alphabet:this.alphabet,value:""},i(this,"vigenere")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(o,this.direction)),m("p",m(s,this.alphabet)),m("p",m(p,this.cipherKey)),m("p",m(h,{label:"Tableau",content:this.viewTableau()})),m("p",m(a,this.autokey)),m("p",m(n,this.input)),m("p",this.viewResult())]}},{key:"viewTableau",value:function(){var r=u(this.alphabet),n=(r.letterOrder.upper+r.letterOrder.upper).split(""),e=this.tableauRows();return m("table",[this.viewTableauHeader()].concat(_toConsumableArray(e.map(function(e){var t=r.toIndex(e),t=n.slice(t,t+r.letterOrder.upper.length);return m("tr",[m("th",m("tt",e))].concat(_toConsumableArray(t.map(function(e){return m("td",m("tt",e))}))))})),[this.viewTableauHeader()]))}},{key:"tableauRows",value:function(){var e=this.alphabet.value;if(this.autokey.value)return e.letterOrder.upper.split("");var t=new rumkinCipher.util.Message(this.cipherKey.value).separate(e).toString();return(""===t?e.letterOrder.upper:t).split("")}},{key:"viewTableauHeader",value:function(){var e=u(this.alphabet).letterOrder.upper.split("");return m("tr",[m("th")].concat(_toConsumableArray(e.map(function(e){return m("th",m("tt",e))}))))}},{key:"viewResult",value:function(){return this.cipherKey.value.length<1?m(c,"You must specify a cipher key"):this.input.value.length<1?m(c,"Enter words to see it encoded or decoded here"):m(l,{name:"vigenère",direction:this.direction.value,message:this.input.value,alphabet:u(this.alphabet),options:{key:this.cipherKey.value,autokey:this.autokey.value}})}}]),e}()},{"../../../js/mithril/checkbox":1,"../../../js/mithril/text-input":5,"../advanced-input-area":8,"../cipher-conduit-setup":10,"../cipher-result":11,"../direction-selector":12,"../key-alphabet":13,"../keyed-alphabet":14,"../result":15,"../show-hide":16}]},{},[17]);