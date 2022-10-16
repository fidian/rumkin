"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var a,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),a=0,{s:t=function(){},n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,r=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw r}}}}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(a="Object"===a&&e.constructor?e.constructor.name:a)||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function _iterableToArrayLimit(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,i=[],l=!0,u=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){u=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(u)throw r}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}!function n(r,i,l){function u(t,e){if(!i[t]){if(!r[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(o)return o(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}a=i[t]={exports:{}},r[t][0].call(a.exports,function(e){return u(r[t][1][e]||e)},a,a.exports,n,r,i,l)}return i[t].exports}for(var o="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,a){var n=e("../module/conduit-events");t.exports=function(){function i(e){_classCallCheck(this,i);e=e.attrs;if(this.label=e["data-label"],this.topic=e["data-topic"],e["data-payload"])this.payload=e["data-payload"];else{this.payload={};for(var t=0,a=Object.entries(e);t<a.length;t++){var n=_slicedToArray(a[t],2),r=n[0],n=n[1],r=r.match(/^data-payload-(.*)/);r&&(r=r[1].replace(/-./g,function(e){return e.toUpperCase()}),this.payload[r]=n)}}}return _createClass(i,[{key:"view",value:function(){var e=this;return m("button",{onclick:function(){n.emit(e.topic,e.payload)}},this.label)}}]),i}()},{"../module/conduit-events":5}],2:[function(e,t,a){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],3:[function(e,t,a){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,a=e.attrs;return[this.viewLabel(a.label),m("textarea",Object.assign({placeholder:"Enter text here"},a,{class:"W(100%) H(8em) Mah(75vh) ".concat(a.class),oninput:function(e){return t.value=a.value=e.target.value,!!a.oninput&&a.oninput(e)}}))]}}]),e}()},{}],4:[function(e,t,a){t.exports=function(){function t(e){_classCallCheck(this,t),this.value=e.attrs.value||""}return _createClass(t,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var a=this,n=e.attrs;return n.value!==+this.value&&(this.value="".concat(n.value)),[this.viewLabel(n.label),m("input",Object.assign({},n,{value:this.value,type:"number",oninput:function(e){var t=e.target.value;return a.value=t,n.value=+t,!n.oninput||n.oninput(e)}}))]}}]),t}()},{}],5:[function(e,t,a){e=new(e("./event-emitter"));t.exports=e},{"./event-emitter":6}],6:[function(e,t,a){t.exports=function(){function e(){_classCallCheck(this,e),this.listeners=new Map}return _createClass(e,[{key:"emit",value:function(e){for(var t=arguments.length,a=new Array(1<t?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var r,i=_createForOfIteratorHelper(this.listeners.get(e)||[]);try{for(i.s();!(r=i.n()).done;){var l=r.value;try{l.apply(void 0,a)}catch(e){}}}catch(e){i.e(e)}finally{i.f()}}},{key:"off",value:function(e,t){var a=this.listeners.get(e);if(a)for(var n=a.length-1;0<=n;--n)a[n]===t&&a.splice(n,1)}},{key:"on",value:function(e,t){var a=this,n=this.listeners.get(e);return n||this.listeners.set(e,n=[]),n.push(t),function(){return a.off(e,t)}}}]),e}()},{}],7:[function(e,t,a){var n=e("../../js/mithril/input-area"),r=e("../../js/mithril/numeric-input");t.exports=function(){function e(){_classCallCheck(this,e),this.group={class:"W(3em)",value:5},this.split={class:"W(3em)",value:10}}return _createClass(e,[{key:"applyGroups",value:function(e){var t=Math.floor(this.group.value),a=Math.floor(this.split.value),n=e.value.replace(/[\s]/g,"");if(t<1)this.updateValue(e,n);else{for(var r=[];n.length;)r.push(n.substr(0,this.group.value)),n=n.substr(this.group.value);if(a<0)this.updateValue(e,r.join(" "));else{for(;r.length;){n.length&&(n+="\n");for(var i=0;i<this.split.value;i+=1)i&&(n+=" "),n+=r.shift()||""}this.updateValue(e,n)}}}},{key:"updateValue",value:function(e,t){e.value!==t&&(e.value=t,e.oninput&&e.oninput(null),e.onchange&&e.onchange(null))}},{key:"view",value:function(e){var r=this,i=e.attrs,e=[{label:"letters",callback:function(){var e,t="",a=_createForOfIteratorHelper(i.value.split(""));try{for(a.s();!(e=a.n()).done;){var n=e.value;i.alphabet.value.isLetter(n)||(t+=n)}}catch(e){a.e(e)}finally{a.f()}r.updateValue(i,t)},remove:!i.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(i.value);r.updateValue(i,e.separate(i.alphabet.value).toString())},remove:!i.alphabet},{label:"numbers",callback:function(){r.updateValue(i,i.value.replace(/[\d]/g,""))}},{label:"whitespace",callback:function(){r.updateValue(i,i.value.replace(/[\s]/g,""))}}],t=[{label:"lowercase",callback:function(){r.updateValue(i,r.lowercase(i.value))}},{label:"Natural case",callback:function(){r.updateValue(i,r.lowercase(i.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return r.uppercase(e)}))}},{label:"Title Case",callback:function(){r.updateValue(i,r.lowercase(i.value).replace(/(^|\n|\s)\s*\S/g,function(e){return r.uppercase(e)}))}},{label:"UPPERCASE",callback:function(){r.updateValue(i,r.uppercase(i.value))}},{label:"swap case",callback:function(){r.updateValue(i,i.value.split("").map(function(e){var t=r.uppercase(e);return e===t?r.lowercase(e):t}).join(""))}},{label:"reverse",callback:function(){r.updateValue(i,i.value.split("").reverse().join(""))}}];return[m(n,i),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t),this.viewGrouping(i)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var a,n=[],r=_createForOfIteratorHelper(t);try{for(r.s();!(a=r.n()).done;)!function(){var e=a.value;n.length&&n.push(", "),e.remove||n.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){r.e(e)}finally{r.f()}return n.length?[m("br"),"".concat(e,": "),n]:null}},{key:"viewGrouping",value:function(e){var t=this;return[m("br"),m("a",{href:"#",onclick:function(){return t.applyGroups(e),!0}},"Make groups")," of ",m(r,this.group)," and next line after ",m(r,this.split)," groups"]}}]),e}()},{"../../js/mithril/input-area":3,"../../js/mithril/numeric-input":4}],8:[function(e,t,a){window.Affine=e("./affine"),window.Conduit=e("../../../js/mithril/conduit")},{"../../../js/mithril/conduit":1,"./affine":9}],9:[function(e,t,a){var n=e("../advanced-input-area"),r=e("../alphabet-selector"),i=e("../cipher-conduit-setup"),l=e("../cipher-result"),u=e("../direction-selector"),o=e("../error-message"),s=e("../../../js/mithril/numeric-input"),c=e("../result");t.exports=function(){function e(){_classCallCheck(this,e),this.alphabet={value:new rumkinCipher.alphabet.English},this.a={label:["Multiplier (",m("tt","a"),")"],value:1,class:"W(4em)"},this.b={label:["Shift (",m("tt","b"),")"],value:1,class:"W(4em)"},this.direction={},this.input={alphabet:this.alphabet,value:""},i(this,"affine")}return _createClass(e,[{key:"modifyA",value:function(e){var t=this.a.value;for(t+=e;1<=t&&!rumkinCipher.util.coprime(t,this.alphabet.value.length);)t+=e;this.a.value=t=t<1?1:t}},{key:"view",value:function(){return[m("p",m(u,this.direction)),m("p",this.viewAlphabet()),m("p",this.viewA()),m("p",this.viewB()),m("p",m(n,this.input)),m("p",this.viewResult())]}},{key:"viewA",value:function(){var e=this;return[m(s,this.a)," ",m("button",{class:"W(3em)",onclick:function(){e.modifyA(1)}},"+")," ",m("button",{class:"W(3em)",onclick:function(){e.modifyA(-1)}},"-"),m("br"),"This must be at least 1 and coprime to the length of the alphabet. Using the plus and minus buttons will jump to the next valid value."]}},{key:"viewAlphabet",value:function(){var e=this.alphabet.value.letterOrder.upper&&this.alphabet.value.letterOrder.lower?" and lowercase":"";return[m(r,this.alphabet)," (m = ".concat(this.alphabet.value.length,")"),m("br"),"Letters: ".concat(this.alphabet.value.letterOrder.upper),e,this.viewAlphabetTranslations()]}},{key:"viewAlphabetTranslations",value:function(){var e=Object.keys(this.alphabet.value.translations);return 0===e.length?null:[" (also these are translated: ",e.join(""),")"]}},{key:"viewB",value:function(){return[m(s,this.b),m("br"),"This is the amount of characters to shift."]}},{key:"viewResult",value:function(){var e=this.a.value,t=this.b.value||0;return e<1?m(o,["The value of ",m("tt","a")," must be greater than zero."]):Math.floor(e)!==e?m(o,["The value of ",m("tt","b")," must be an integer."]):rumkinCipher.util.coprime(this.a.value,this.alphabet.value.length)?Math.floor(t)!==t?m(o,["The value of ",m("tt",t)," must be an integer."]):""===this.input.value.trim()?m(c,"Enter text to see it encoded here"):m(l,{name:"affine",direction:this.direction.value,message:this.input.value,alphabet:this.alphabet.value,options:{multiplier:this.a.value,shift:this.b.value}}):m(o,["The value of ",m("tt","a")," must be coprime to the alphabet length."])}}]),e}()},{"../../../js/mithril/numeric-input":4,"../advanced-input-area":7,"../alphabet-selector":10,"../cipher-conduit-setup":11,"../cipher-result":12,"../direction-selector":13,"../error-message":14,"../result":15}],10:[function(e,t,a){for(var r=e("../../js/mithril/dropdown"),i={},n=0,l=Object.keys(rumkinCipher.alphabet);n<l.length;n++){var u=l[n];i[u]=u}t.exports=function(){function n(e){_classCallCheck(this,n);var t=e.attrs,a={options:i,label:"Alphabet",value:t.value.name,onchange:function(e){return t.value=new rumkinCipher.alphabet[a.value],!t.onchange||t.onchange(e)}};this.d=a}return _createClass(n,[{key:"view",value:function(e){return this.d.value=e.attrs.value.name,m(r,this.d)}}]),n}()},{"../../js/mithril/dropdown":2}],11:[function(e,t,a){var o=rumkinCipher.util.Alphabet,n=e("../../js/module/conduit-events");function r(n,e,r){var i=n[e];n[e]=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];i&&i.apply(n,t),r(t)}}function s(e,t,a){e=e[t];if(e&&"object"===_typeof(e)&&void 0!==e.value){t=e.value;if("number"==typeof t)e.value=+a;else if("string"==typeof t)e.value=a;else if("boolean"==typeof t)e.value="true"===a;else if(t instanceof o){var n,r=e,i=_createForOfIteratorHelper(a.split(" "));try{for(i.s();!(n=i.n()).done;){var l=n.value.split(":"),u=void 0;switch(l[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":r[l[0]]="true"===l[1];break;case"alphabetKey":r.alphabetKey=l[1];break;default:(u=rumkinCipher.alphabet[l[0]])&&(r.value=new u)}}}catch(e){i.e(e)}finally{i.f()}}}}t.exports=function(l,e,u){var t=null;r(l,"oninit",function(){t=n.on(e,function(e){for(var t=l,a=0,n=Object.entries(e);a<n.length;a++){var r=_slicedToArray(n[a],2),i=r[0],r=r[1];s(t,i.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),r)}u&&u()})}),r(l,"onbeforeresume",function(){t&&t()})}},{"../../js/module/conduit-events":5}],12:[function(e,t,a){var i=e("./result");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){e=e.attrs;return rumkinCipher.cipher[e.name]?this.viewCipher(e,rumkinCipher.cipher[e.name]):this.viewCode(e,rumkinCipher.code[e.name])}},{key:"viewCipher",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encipher":"decipher",e)}},{key:"viewCode",value:function(e,t){return this.viewOutput(t,"ENCRYPT"===e.direction?"encode":"decode",e)}},{key:"viewOutput",value:function(e,t,a){var n=new rumkinCipher.util.Message(a.message),r=a.alphabet,a=a.options||void 0,e=e[t](n,r,a);return m(i,e.toString())}}]),e}()},{"./result":15}],13:[function(e,t,a){var r=e("../../js/mithril/dropdown");t.exports=function(){function n(e){var t=this,a=(_classCallCheck(this,n),e.attrs);a.value||(a.value="ENCRYPT"),this.d={options:{ENCRYPT:a.code?"Encode":"Encrypt",DECRYPT:a.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return a.value=t.d.value,!a.onchange||a.onchange(e)}}}return _createClass(n,[{key:"view",value:function(e){return this.d.value!==e.attrs.value&&(this.d.value=e.attrs.value),m(r,this.d)}}]),n}()},{"../../js/mithril/dropdown":2}],14:[function(e,t,a){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("span",{class:"Fw(b) Fz(1.2em) C(red)"},e.children)}}]),e}()},{}],15:[function(e,t,a){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[8]);