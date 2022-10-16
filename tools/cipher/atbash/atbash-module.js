"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw a}}}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i=[],l=!0,u=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);l=!0);}catch(e){u=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(u)throw a}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function r(a,i,l){function u(t,e){if(!i[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(o)return o(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},a[t][0].call(n.exports,function(e){return u(a[t][1][e]||e)},n,n.exports,r,a,i,l)}return i[t].exports}for(var o="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,n){var r=e("../module/conduit-events");t.exports=function(){function i(e){_classCallCheck(this,i);e=e.attrs;if(this.label=e["data-label"],this.topic=e["data-topic"],e["data-payload"])this.payload=e["data-payload"];else{this.payload={};for(var t=0,n=Object.entries(e);t<n.length;t++){var r=_slicedToArray(n[t],2),a=r[0],r=r[1],a=a.match(/^data-payload-(.*)/);a&&(a=a[1].replace(/-./g,function(e){return e.toUpperCase()}),this.payload[a]=r)}}}return _createClass(i,[{key:"view",value:function(){var e=this;return m("button",{onclick:function(){r.emit(e.topic,e.payload)}},this.label)}}]),i}()},{"../module/conduit-events":5}],2:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],3:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],4:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t),this.value=e.attrs.value||""}return _createClass(t,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var n=this,r=e.attrs;return r.value!==+this.value&&(this.value="".concat(r.value)),[this.viewLabel(r.label),m("input",Object.assign({},r,{value:this.value,type:"number",oninput:function(e){var t=e.target.value;return n.value=t,r.value=+t,!r.oninput||r.oninput(e)}}))]}}]),t}()},{}],5:[function(e,t,n){e=new(e("./event-emitter"));t.exports=e},{"./event-emitter":6}],6:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a,i=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(i.s();!(a=i.n()).done;){var l=a.value;try{l.apply(void 0,n)}catch(e){}}}catch(e){i.e(e)}finally{i.f()}}},{key:"off",value:function(e,t){var n=this.listeners.get(e);if(n)for(var r=n.length-1;0<=r;--r)n[r]===t&&n.splice(r,1)}},{key:"on",value:function(e,t){var n=this,r=this.listeners.get(e);return r||this.listeners.set(e,r=[]),r.push(t),function(){return n.off(e,t)}}}]),e}()},{}],7:[function(e,t,n){var r=e("../../js/mithril/input-area"),a=e("../../js/mithril/numeric-input");t.exports=function(){function e(){_classCallCheck(this,e),this.group={class:"W(3em)",value:5},this.split={class:"W(3em)",value:10}}return _createClass(e,[{key:"applyGroups",value:function(e){var t=Math.floor(this.group.value),n=Math.floor(this.split.value),r=e.value.replace(/[\s]/g,"");if(t<1)this.updateValue(e,r);else{for(var a=[];r.length;)a.push(r.substr(0,this.group.value)),r=r.substr(this.group.value);if(n<0)this.updateValue(e,a.join(" "));else{for(;a.length;){r.length&&(r+="\n");for(var i=0;i<this.split.value;i+=1)i&&(r+=" "),r+=a.shift()||""}this.updateValue(e,r)}}}},{key:"updateValue",value:function(e,t){e.value!==t&&(e.value=t,e.oninput&&e.oninput(null),e.onchange&&e.onchange(null))}},{key:"view",value:function(e){var a=this,i=e.attrs,e=[{label:"letters",callback:function(){var e,t="",n=_createForOfIteratorHelper(i.value.split(""));try{for(n.s();!(e=n.n()).done;){var r=e.value;i.alphabet.value.isLetter(r)||(t+=r)}}catch(e){n.e(e)}finally{n.f()}a.updateValue(i,t)},remove:!i.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(i.value);a.updateValue(i,e.separate(i.alphabet.value).toString())},remove:!i.alphabet},{label:"numbers",callback:function(){a.updateValue(i,i.value.replace(/[\d]/g,""))}},{label:"whitespace",callback:function(){a.updateValue(i,i.value.replace(/[\s]/g,""))}}],t=[{label:"lowercase",callback:function(){a.updateValue(i,a.lowercase(i.value))}},{label:"Natural case",callback:function(){a.updateValue(i,a.lowercase(i.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return a.uppercase(e)}))}},{label:"Title Case",callback:function(){a.updateValue(i,a.lowercase(i.value).replace(/(^|\n|\s)\s*\S/g,function(e){return a.uppercase(e)}))}},{label:"UPPERCASE",callback:function(){a.updateValue(i,a.uppercase(i.value))}},{label:"swap case",callback:function(){a.updateValue(i,i.value.split("").map(function(e){var t=a.uppercase(e);return e===t?a.lowercase(e):t}).join(""))}},{label:"reverse",callback:function(){a.updateValue(i,i.value.split("").reverse().join(""))}}];return[m(r,i),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t),this.viewGrouping(i)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var n,r=[],a=_createForOfIteratorHelper(t);try{for(a.s();!(n=a.n()).done;)!function(){var e=n.value;r.length&&r.push(", "),e.remove||r.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){a.e(e)}finally{a.f()}return r.length?[m("br"),"".concat(e,": "),r]:null}},{key:"viewGrouping",value:function(e){var t=this;return[m("br"),m("a",{href:"#",onclick:function(){return t.applyGroups(e),!0}},"Make groups")," of ",m(a,this.group)," and next line after ",m(a,this.split)," groups"]}}]),e}()},{"../../js/mithril/input-area":3,"../../js/mithril/numeric-input":4}],8:[function(e,t,n){for(var a=e("../../js/mithril/dropdown"),i={},r=0,l=Object.keys(rumkinCipher.alphabet);r<l.length;r++){var u=l[r];i[u]=u}t.exports=function(){function r(e){_classCallCheck(this,r);var t=e.attrs,n={options:i,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[n.value],!t.onchange||t.onchange(e)}};this.d=n}return _createClass(r,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":2}],9:[function(e,t,n){window.Atbash=e("./atbash"),window.Conduit=e("../../../js/mithril/conduit")},{"../../../js/mithril/conduit":1,"./atbash":10}],10:[function(e,t,n){var r=e("../advanced-input-area"),a=e("../alphabet-selector"),i=e("../cipher-conduit-setup"),l=e("../cipher-result"),u=e("../result");t.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.input={alphabet:this.alphabet,value:""},i(this,"atbash")}return _createClass(e,[{key:"view",value:function(){return[m("p",m(a,this.alphabet)),m("p",m(r,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return""===this.input.value.trim()?m(u,"Enter text to see it encoded here"):m(l,{name:"atbash",message:this.input.value,alphabet:this.alphabet.value})}}]),e}()},{"../advanced-input-area":7,"../alphabet-selector":8,"../cipher-conduit-setup":11,"../cipher-result":12,"../result":13}],11:[function(e,t,n){var o=rumkinCipher.util.Alphabet,r=e("../../js/module/conduit-events");function a(r,e,a){var i=r[e];r[e]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];i&&i.apply(r,t),a(t)}}function s(e,t,n){e=e[t];if(e&&"object"===_typeof(e)&&void 0!==e.value){t=e.value;if("number"==typeof t)e.value=+n;else if("string"==typeof t)e.value=n;else if("boolean"==typeof t)e.value="true"===n;else if(t instanceof o){var r,a=e,i=_createForOfIteratorHelper(n.split(" "));try{for(i.s();!(r=i.n()).done;){var l=r.value.split(":"),u=void 0;switch(l[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":a[l[0]]="true"===l[1];break;case"alphabetKey":a.alphabetKey=l[1];break;default:(u=rumkinCipher.alphabet[l[0]])&&(a.value=new u)}}}catch(e){i.e(e)}finally{i.f()}}}}t.exports=function(l,e,u){var t=null;a(l,"oninit",function(){t=r.on(e,function(e){for(var t=l,n=0,r=Object.entries(e);n<r.length;n++){var a=_slicedToArray(r[n],2),i=a[0],a=a[1];s(t,i.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),a)}u&&u()})}),a(l,"onbeforeresume",function(){t&&t()})}},{"../../js/module/conduit-events":5}],12:[function(e,t,n){var i=e("./result");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){e=e.attrs;return rumkinCipher.cipher[e.name]?this.viewCipher(e,rumkinCipher.cipher[e.name]):this.viewCode(e,rumkinCipher.code[e.name])}},{key:"viewCipher",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encipher":"decipher",e)}},{key:"viewCode",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encode":"decode",e)}},{key:"viewOutput",value:function(e,t,n){var r=new rumkinCipher.util.Message(n.message),a=n.alphabet,n=n.options||void 0,e=e[t](r,a,n);return m(i,e.toString())}}]),e}()},{"./result":13}],13:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[9]);