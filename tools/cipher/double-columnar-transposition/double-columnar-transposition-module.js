"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){i=!0,a=e},f:function(){try{l||null==r.return||r.return()}finally{if(i)throw a}}}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw a}}return l}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function r(a,l,i){function o(t,e){if(!l[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=l[t]={exports:{}},a[t][0].call(n.exports,function(e){return o(a[t][1][e]||e)},n,n.exports,r,a,l,i)}return l[t].exports}for(var u="function"==typeof require&&require,e=0;e<i.length;e++)o(i[e]);return o}({1:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",checked:!!t.value,onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,n){var r=e("../module/conduit-events");t.exports=function(){function l(e){_classCallCheck(this,l);e=e.attrs;if(this.label=e["data-label"],this.topic=e["data-topic"],e["data-payload"])this.payload=e["data-payload"];else{this.payload={};for(var t=0,n=Object.entries(e);t<n.length;t++){var r=_slicedToArray(n[t],2),a=r[0],r=r[1],a=a.match(/^data-payload-(.*)/);a&&(a=a[1].replace(/-./g,function(e){return e.toUpperCase()}),this.payload[a]=r)}}}return _createClass(l,[{key:"view",value:function(){var e=this;return m("button",{onclick:function(){r.emit(e.topic,e.payload)}},this.label)}}]),l}()},{"../module/conduit-events":6}],3:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],4:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],5:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],6:[function(e,t,n){e=new(e("./event-emitter"));t.exports=e},{"./event-emitter":7}],7:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a,l=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(l.s();!(a=l.n()).done;){var i=a.value;try{i.apply(void 0,n)}catch(e){}}}catch(e){l.e(e)}finally{l.f()}}},{key:"off",value:function(e,t){var n=this.listeners.get(e);if(n)for(var r=n.length-1;0<=r;--r)n[r]===t&&n.splice(r,1)}},{key:"on",value:function(e,t){var n=this,r=this.listeners.get(e);return r||this.listeners.set(e,r=[]),r.push(t),function(){return n.off(e,t)}}}]),e}()},{}],8:[function(e,t,n){var r=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var n=this,a=e.attrs,e=[{label:"letters",callback:function(){var e,t="",n=_createForOfIteratorHelper(a.value.split(""));try{for(n.s();!(e=n.n()).done;){var r=e.value;a.alphabet.value.isLetter(r)||(t+=r)}}catch(e){n.e(e)}finally{n.f()}a.value=t},remove:!a.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(a.value);a.value=e.separate(a.alphabet.value).toString()},remove:!a.alphabet},{label:"numbers",callback:function(){a.value=a.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){a.value=a.value.replace(/[\s]/g,"")}}],t=[{label:"lowercase",callback:function(){a.value=n.lowercase(a.value)}},{label:"Natural case",callback:function(){a.value=n.lowercase(a.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return n.uppercase(e)})}},{label:"Title Case",callback:function(){a.value=n.lowercase(a.value).replace(/(^|\n|\s)\s*\S/g,function(e){return n.uppercase(e)})}},{label:"UPPERCASE",callback:function(){a.value=n.uppercase(a.value)}},{label:"swap case",callback:function(){a.value=a.value.split("").map(function(e){var t=n.uppercase(e);return e===t?n.lowercase(e):t}).join("")}},{label:"reverse",callback:function(){a.value=a.value.split("").reverse().join("")}}];return[m(r,a),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var n,r=[],a=_createForOfIteratorHelper(t);try{for(a.s();!(n=a.n()).done;)!function(){var e=n.value;r.length&&r.push(", "),e.remove||r.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){a.e(e)}finally{a.f()}return r.length?[m("br"),"".concat(e,": "),r]:null}}]),e}()},{"../../js/mithril/input-area":4}],9:[function(e,t,n){for(var a=e("../../js/mithril/dropdown"),l={},r=0,i=Object.keys(rumkinCipher.alphabet);r<i.length;r++){var o=i[r];l[o]=o}t.exports=function(){function r(e){_classCallCheck(this,r);var t=e.attrs,n={options:l,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[n.value],!t.onchange||t.onchange(e)}};this.d=n}return _createClass(r,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":3}],10:[function(e,t,n){var u=rumkinCipher.util.Alphabet,r=e("../../js/module/conduit-events");function a(r,e,a){var l=r[e];r[e]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];l&&l.apply(r,t),a(t)}}function s(e,t,n){e=e[t];if(e&&"object"===_typeof(e)&&void 0!==e.value){t=e.value;if("number"==typeof t)e.value=+n;else if("string"==typeof t)e.value=n;else if("boolean"==typeof t)e.value="true"===n;else if(t instanceof u){var r,a=e,l=_createForOfIteratorHelper(n.split(" "));try{for(l.s();!(r=l.n()).done;){var i=r.value.split(":"),o=void 0;switch(i[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":a[i[0]]="true"===i[1];break;case"alphabetKey":a.alphabetKey=i[1];break;default:(o=rumkinCipher.alphabet[i[0]])&&(a.value=new o)}}}catch(e){l.e(e)}finally{l.f()}}}}t.exports=function(i,e,o){var t=null;a(i,"oninit",function(){t=r.on(e,function(e){for(var t=i,n=0,r=Object.entries(e);n<r.length;n++){var a=_slicedToArray(r[n],2),l=a[0],a=a[1];s(t,l.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),a)}o&&o()})}),a(i,"onbeforeresume",function(){t&&t()})}},{"../../js/module/conduit-events":6}],11:[function(e,t,n){var a=e("../../js/mithril/dropdown");t.exports=function(){function r(e){var t=this,n=(_classCallCheck(this,r),e.attrs);n.value||(n.value="ENCRYPT"),this.d={options:{ENCRYPT:n.code?"Encode":"Encrypt",DECRYPT:n.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return n.value=t.d.value,!n.onchange||n.onchange(e)}}}return _createClass(r,[{key:"view",value:function(e){return this.d.value!==e.attrs.value&&(this.d.value=e.attrs.value),m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":3}],12:[function(e,t,n){window.Conduit=e("../../../js/mithril/conduit"),window.DoubleColumnarTransposition=e("./double-columnar-transposition")},{"../../../js/mithril/conduit":2,"./double-columnar-transposition":13}],13:[function(e,t,n){var r=e("../advanced-input-area"),a=e("../alphabet-selector"),l=e("../../../js/mithril/checkbox"),i=e("../cipher-conduit-setup"),o=e("../direction-selector"),u=e("../result"),s=e("../../../js/mithril/text-input");t.exports=function(){function e(){_classCallCheck(this,e),this.direction={value:"ENCRYPT"},this.columnOrder={value:!1,label:"Use the key as a column order instead of column labels"},this.alphabet={value:new rumkinCipher.alphabet.English},this.firstKey={label:"First column key",value:""},this.secondKey={label:"Second column key",value:""},this.dupesBackwards={label:"Number duplicate entries backwards instead of forwards",value:!1},this.input={alphabet:this.alphabet,value:""},this.firstColumnKey=null,this.secondColumnKey=null,i(this,"doubleColumnarTransposition")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(o,this.direction)),m("p",m(a,this.alphabet)),m("p",m(s,this.firstKey)),m("p",this.viewKey(this.firstKey.value,"firstColumnKey")),m("p",m(s,this.secondKey)),m("p",this.viewKey(this.secondKey.value,"secondColumnKey")),m("p",m(l,this.dupesBackwards)),m("p",m(l,this.columnOrder)),m("p",m(r,this.input)),m("p",this.viewResult())]}},{key:"viewKey",value:function(e,t){return this[t]=rumkinCipher.util.columnKey(this.alphabet.value,e,{columnOrder:this.columnOrder.value,dupesBackwards:this.dupesBackwards.value}),1<this[t].length?m("p","The resulting columnar key: ".concat(this[t].map(function(e){return e+1}).join(" "))):m("p","Enter numbers or words to generate a column key")}},{key:"viewResult",value:function(){if(this.firstColumnKey.length<2||this.secondColumnKey.length<2)return m(u,"You need at least two columns for each column key in order to encode anything");if(!this.input.value)return m(u,"Enter text and see the result here");var e=new rumkinCipher.util.Message(this.input.value),t=rumkinCipher.cipher.columnarTransposition,n="ENCRYPT"===this.direction.value,r=n?"encipher":"decipher",e=t[r](e,this.alphabet.value,{columnKey:n?this.firstColumnKey:this.secondColumnKey}),t=t[r](e,this.alphabet.value,{columnKey:n?this.secondColumnKey:this.firstColumnKey});return m(u,t.toString())}}]),e}()},{"../../../js/mithril/checkbox":1,"../../../js/mithril/text-input":5,"../advanced-input-area":8,"../alphabet-selector":9,"../cipher-conduit-setup":10,"../direction-selector":11,"../result":14}],14:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[12]);