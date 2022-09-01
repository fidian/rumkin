"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var n,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,l=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return i=e.done,e},e:function(e){l=!0,r=e},f:function(){try{i||null==a.return||a.return()}finally{if(l)throw r}}}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function _iterableToArrayLimit(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,i=[],l=!0,o=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);l=!0);}catch(e){o=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(o)throw r}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function a(r,i,l){function o(t,e){if(!i[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},r[t][0].call(n.exports,function(e){return o(r[t][1][e]||e)},n,n.exports,a,r,i,l)}return i[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)o(l[e]);return o}({1:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",checked:!!t.value,onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,n){var a=e("../module/conduit-events");t.exports=function(){function i(e){_classCallCheck(this,i);e=e.attrs;if(this.label=e["data-label"],this.topic=e["data-topic"],e["data-payload"])this.payload=e["data-payload"];else{this.payload={};for(var t=0,n=Object.entries(e);t<n.length;t++){var a=_slicedToArray(n[t],2),r=a[0],a=a[1],r=r.match(/^data-payload-(.*)/);r&&(r=r[1].replace(/-./g,function(e){return e.toUpperCase()}),this.payload[r]=a)}}}return _createClass(i,[{key:"view",value:function(){var e=this;return m("button",{onclick:function(){a.emit(e.topic,e.payload)}},this.label)}}]),i}()},{"../module/conduit-events":6}],3:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],4:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],5:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],6:[function(e,t,n){e=new(e("./event-emitter"));t.exports=e},{"./event-emitter":7}],7:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var r,i=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(i.s();!(r=i.n()).done;){var l=r.value;try{l.apply(void 0,n)}catch(e){}}}catch(e){i.e(e)}finally{i.f()}}},{key:"off",value:function(e,t){var n=this.listeners.get(e);if(n)for(var a=n.length-1;0<=a;--a)n[a]===t&&n.splice(a,1)}},{key:"on",value:function(e,t){var n=this,a=this.listeners.get(e);return a||this.listeners.set(e,a=[]),a.push(t),function(){return n.off(e,t)}}}]),e}()},{}],8:[function(e,t,n){var a=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var n=this,r=e.attrs,e=[{label:"letters",callback:function(){var e,t="",n=_createForOfIteratorHelper(r.value.split(""));try{for(n.s();!(e=n.n()).done;){var a=e.value;r.alphabet.value.isLetter(a)||(t+=a)}}catch(e){n.e(e)}finally{n.f()}r.value=t},remove:!r.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(r.value);r.value=e.separate(r.alphabet.value).toString()},remove:!r.alphabet},{label:"numbers",callback:function(){r.value=r.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){r.value=r.value.replace(/[\s]/g,"")}}],t=[{label:"lowercase",callback:function(){r.value=n.lowercase(r.value)}},{label:"Natural case",callback:function(){r.value=n.lowercase(r.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return n.uppercase(e)})}},{label:"Title Case",callback:function(){r.value=n.lowercase(r.value).replace(/(^|\n|\s)\s*\S/g,function(e){return n.uppercase(e)})}},{label:"UPPERCASE",callback:function(){r.value=n.uppercase(r.value)}},{label:"swap case",callback:function(){r.value=r.value.split("").map(function(e){var t=n.uppercase(e);return e===t?n.lowercase(e):t}).join("")}},{label:"reverse",callback:function(){r.value=r.value.split("").reverse().join("")}}];return[m(a,r),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var n,a=[],r=_createForOfIteratorHelper(t);try{for(r.s();!(n=r.n()).done;)!function(){var e=n.value;a.length&&a.push(", "),e.remove||a.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){r.e(e)}finally{r.f()}return a.length?[m("br"),"".concat(e,": "),a]:null}}]),e}()},{"../../js/mithril/input-area":4}],9:[function(e,t,n){for(var r=e("../../js/mithril/dropdown"),i={},a=0,l=Object.keys(rumkinCipher.alphabet);a<l.length;a++){var o=l[a];i[o]=o}t.exports=function(){function a(e){_classCallCheck(this,a);var t=e.attrs,n={options:i,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[n.value],!t.onchange||t.onchange(e)}};this.d=n}return _createClass(a,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(r,this.d)}}]),a}()},{"../../js/mithril/dropdown":3}],10:[function(e,t,n){window.Bifid=e("./bifid"),window.Conduit=e("../../../js/mithril/conduit")},{"../../../js/mithril/conduit":2,"./bifid":11}],11:[function(e,t,n){var a=e("../advanced-input-area"),r=e("../cipher-conduit-setup"),i=e("../cipher-result"),l=e("../direction-selector"),o=e("../../../js/mithril/dropdown"),u=e("../key-alphabet"),s=e("../keyed-alphabet"),c=e("../result");t.exports=function(){function t(){var l=this,e=(_classCallCheck(this,t),this.direction={},new rumkinCipher.alphabet.English);this.alphabet={value:e,onchange:function(){return l.resetTranslations()}},this.input={alphabet:this.alphabet,label:"The message to encipher or decipher",value:""},this.resetTranslations(),r(this,"bifid",function(e){l.resetTranslations();var t,n=0,a=_createForOfIteratorHelper((e.translations||"").split(" "));try{for(a.s();!(t=a.n()).done;){var r=t.value,i=l.translations[n];i&&(i.from=r[0],i.to=r[1]),n+=1}}catch(e){a.e(e)}finally{a.f()}})}return _createClass(t,[{key:"resetTranslations",value:function(){var e=u(this.alphabet),t=Math.floor(Math.sqrt(e.length)),n=e.length-t*t;for(this.translations=[];this.translations.length<n;){var a=e.toLetter(0),r=e.toLetter(1),i=e.toIndex("I"),l=e.toIndex("J");-1!==i&&-1!==l&&(a="J",r="I"),this.translations.push({from:a,to:r,sourceAlphabet:e}),e=e.collapse(a,r)}this.alphabetInstance=e}},{key:"updateAlphabet",value:function(){var e,t=u(this.alphabet),n=_createForOfIteratorHelper(this.translations);try{for(n.s();!(e=n.n()).done;){var a=e.value,r=t.toIndex(a.from),i=t.toIndex(a.to);-1===r&&(a.from=t.toLetter(0)),-1===i&&(a.to=t.toLetter(0)),a.from===a.to&&(a.to=t.toLetter(0),a.from===a.to&&(a.to=t.toLetter(1))),t=(a.sourceAlphabet=t).collapse(a.from,a.to)}}catch(e){n.e(e)}finally{n.f()}this.alphabetInstance=t}},{key:"view",value:function(){return[m("p",m(l,this.direction)),m("p",m(s,this.alphabet)),this.viewTranslations(),this.viewTableau(),m("p",m(a,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return this.input.value?m(i,{name:"bifid",direction:this.direction.value,message:this.input.value,alphabet:this.alphabetInstance}):m(c,"Enter text to see it encoded here")}},{key:"viewTableau",value:function(){for(var e=this.alphabetInstance,t=Math.sqrt(e.length),n="",a=0;a<t;a+=1){for(var r=0;r<t;r+=1)n+=e.toLetter(a*t+r)+" ";n=n.trim()+"\n"}return m("p",["Your tableau: ",m("span",{class:"D(if) Jc(c)"},m("pre",{class:"Mt(0)"},n))])}},{key:"viewTranslations",value:function(){var i=this;return 0===this.translations.length?null:this.translations.map(function(t){for(var e={options:{},value:t.from,onchange:function(e){t.from=e.target.value,i.updateAlphabet()}},n={options:{},value:t.to,onchange:function(e){t.to=e.target.value,i.updateAlphabet()}},a=0;a<t.sourceAlphabet.length;a+=1){var r=t.sourceAlphabet.toLetter(a);(e.options[r]=r)!==e.value&&(n.options[r]=r)}return m("p",["Translate ",m(o,e)," into ",m(o,n)])})}}]),t}()},{"../../../js/mithril/dropdown":3,"../advanced-input-area":8,"../cipher-conduit-setup":12,"../cipher-result":13,"../direction-selector":14,"../key-alphabet":15,"../keyed-alphabet":16,"../result":17}],12:[function(e,t,n){var u=rumkinCipher.util.Alphabet,a=e("../../js/module/conduit-events");function r(a,e,r){var i=a[e];a[e]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];i&&i.apply(a,t),r(t)}}function s(e,t,n){e=e[t];if(e&&"object"===_typeof(e)&&void 0!==e.value){t=e.value;if("number"==typeof t)e.value=+n;else if("string"==typeof t)e.value=n;else if("boolean"==typeof t)e.value="true"===n;else if(t instanceof u){var a,r=e,i=_createForOfIteratorHelper(n.split(" "));try{for(i.s();!(a=i.n()).done;){var l=a.value.split(":"),o=void 0;switch(l[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":r[l[0]]="true"===l[1];break;case"alphabetKey":r.alphabetKey=l[1];break;default:(o=rumkinCipher.alphabet[l[0]])&&(r.value=new o)}}}catch(e){i.e(e)}finally{i.f()}}}}t.exports=function(l,e,o){var t=null;r(l,"oninit",function(){t=a.on(e,function(e){for(var t=l,n=0,a=Object.entries(e);n<a.length;n++){var r=_slicedToArray(a[n],2),i=r[0],r=r[1];s(t,i.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),r)}o&&o()})}),r(l,"onbeforeresume",function(){t&&t()})}},{"../../js/module/conduit-events":6}],13:[function(e,t,n){var i=e("./result");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){e=e.attrs;return rumkinCipher.cipher[e.name]?this.viewCipher(e,rumkinCipher.cipher[e.name]):this.viewCode(e,rumkinCipher.code[e.name])}},{key:"viewCipher",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encipher":"decipher",e)}},{key:"viewCode",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encode":"decode",e)}},{key:"viewOutput",value:function(e,t,n){var a=new rumkinCipher.util.Message(n.message),r=n.alphabet,n=n.options||void 0,e=e[t](a,r,n);return m(i,e.toString())}}]),e}()},{"./result":17}],14:[function(e,t,n){var r=e("../../js/mithril/dropdown");t.exports=function(){function a(e){var t=this,n=(_classCallCheck(this,a),e.attrs);n.value||(n.value="ENCRYPT"),this.d={options:{ENCRYPT:n.code?"Encode":"Encrypt",DECRYPT:n.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return n.value=t.d.value,!n.onchange||n.onchange(e)}}}return _createClass(a,[{key:"view",value:function(e){return this.d.value!==e.attrs.value&&(this.d.value=e.attrs.value),m(r,this.d)}}]),a}()},{"../../js/mithril/dropdown":3}],15:[function(e,t,n){t.exports=function(e){return e.value.keyWord(e.alphabetKey||"",{useLastInstance:e.useLastInstance,reverseKey:e.reverseKey,reverseAlphabet:e.reverseAlphabet,keyAtEnd:e.keyAtEnd})}},{}],16:[function(e,t,n){var a=e("./alphabet-selector"),i=e("../../js/mithril/checkbox"),l=e("./key-alphabet"),o=e("../../js/mithril/text-input");t.exports=function(){function r(e){function t(e){return a.keyed=l(a),!a.onchange||a.onchange(e)}var n=this,a=(_classCallCheck(this,r),e.attrs);this.initialize(a),this.alphabet={onchange:function(e){return a.value=n.alphabet.value,t(e)}},this.alphabetKey={label:"Alphabet key",oninput:function(e){return a.alphabetKey=e.target.value,t(e)}},this.useLastInstance={label:"Use the last occurrence of a letter instead of the first",onchange:function(e){return a.useLastInstance=!a.useLastInstance,t(e)}},this.reverseKey={label:"Reverse the key before keying",onchange:function(e){return a.reverseKey=!a.reverseKey,t(e)}},this.reverseAlphabet={label:"Reverse the alphabet before keying",onchange:function(e){return a.reverseAlphabet=!a.reverseAlphabet,t(e)}},this.keyAtEnd={label:"Put the key at the end instead of the beginning",onchange:function(e){return a.keyAtEnd=!a.keyAtEnd,t(e)}},this.checkValues(a)}return _createClass(r,[{key:"initialize",value:function(e){e.value||(e.value=new rumkinCipher.alphabet.English),e.alphabetKey||(e.alphabetKey="");for(var t=0,n=["useLastInstance","reverseKey","reverseAlphabet","keyAtEnd"];t<n.length;t++){var a=n[t];e[a]=!!e[a]}}},{key:"checkValues",value:function(e){for(var t=!1,n=0,a=[["value","alphabet"],["alphabetKey","alphabetKey"],["useLastInstance","useLastInstance"],["reverseKey","reverseKey"],["reverseAlphabet","reverseAlphabet"],["keyAtEnd","keyAtEnd"]];n<a.length;n++){var r=_slicedToArray(a[n],2),i=r[0],r=r[1];this[r].value!==e[i]&&(this[r].value=e[i],t=!0)}t&&(e.keyed=l(e))}},{key:"view",value:function(e){e=e.attrs;return this.checkValues(e),[m(a,this.alphabet),m("br"),m(o,this.alphabetKey),m("br"),m("label",[m(i,this.useLastInstance)]),m("br"),m("label",[m(i,this.reverseKey)]),m("br"),m("label",[m(i,this.reverseAlphabet)]),m("br"),m("label",[m(i,this.keyAtEnd)]),m("br"),"Resulting alphabet: ",this.viewAlphabet(e)]}},{key:"viewAlphabet",value:function(e){return e.keyed.letterOrder.upper}}]),r}()},{"../../js/mithril/checkbox":1,"../../js/mithril/text-input":5,"./alphabet-selector":9,"./key-alphabet":15}],17:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[10]);