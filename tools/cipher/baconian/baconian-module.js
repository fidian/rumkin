"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i=[],l=!0,o=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);l=!0);}catch(e){o=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(o)throw a}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _createForOfIteratorHelper(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,{s:t=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function r(a,i,l){function o(t,e){if(!i[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(s)return s(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=i[t]={exports:{}},a[t][0].call(n.exports,function(e){return o(a[t][1][e]||e)},n,n.exports,r,a,i,l)}return i[t].exports}for(var s="function"==typeof require&&require,e=0;e<l.length;e++)o(l[e]);return o}({1:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],2:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,n=e.attrs;return[this.viewLabel(n.label),m("textarea",Object.assign({placeholder:"Enter text here"},n,{class:"W(100%) H(8em) Mah(75vh) ".concat(n.class),oninput:function(e){return t.value=n.value=e.target.value,!!n.oninput&&n.oninput(e)}}))]}}]),e}()},{}],3:[function(e,t,n){var r=e("../../js/mithril/input-area");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var a=e.attrs,e=[{label:"letters",callback:function(){var e,t="",n=_createForOfIteratorHelper(a.value.split(""));try{for(n.s();!(e=n.n()).done;){var r=e.value;a.alphabet.value.isLetter(r)||(t+=r)}}catch(e){n.e(e)}finally{n.f()}a.value=t},remove:!a.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(a.value);a.value=e.separate(a.alphabet.value).toString()},remove:!a.alphabet},{label:"numbers",callback:function(){a.value=a.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){a.value=a.value.replace(/[\s]/g,"")}}];return[m(r,a),m("br"),this.viewActions("Remove",e)]}},{key:"viewActions",value:function(e,t){var n,r=[],a=_createForOfIteratorHelper(t);try{for(a.s();!(n=a.n()).done;)!function(){var e=n.value;r.length&&r.push(", "),e.remove||r.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){a.e(e)}finally{a.f()}return r.length?[m("br"),"".concat(e,": "),r]:null}}]),e}()},{"../../js/mithril/input-area":2}],4:[function(e,t,n){t.exports=function(e,r,a,t){r=r.toString().replace(/[0A]/g,"a").replace(/[1B]/g,"b").replace(/[^ab]/g,""),a=a.toString();var n,i=0,e=e.findLetterIndexes(a),l=[],o=null,s=_createForOfIteratorHelper(Object.entries(e).map(function(e){var e=_slicedToArray(e,2),t=e[0],n="a";return 0<=e[1]&&(e=r.charAt(i),i+=1,"b"===e&&(n="b")),{type:n,chars:a.charAt(t)}}));try{for(s.s();!(n=s.n()).done;){var u=n.value;o&&o.type===u.type?o.chars+=u.chars:(o=u,l.push(o))}}catch(e){s.e(e)}finally{s.f()}return{result:l.map(function(e){return"b"===e.type?m("span",{class:t},e.chars):e.chars}),encodedMessageFits:i>=r.length}}},{}],5:[function(e,t,n){var r=e("../result"),a=e("./baconian-applier"),i=new rumkinCipher.alphabet.English;t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){e=e.attrs;return m(r,a(i,e["data-code"],e["data-message"],e["data-b-classes"]).result)}}]),e}()},{"../result":9,"./baconian-applier":4}],6:[function(e,t,n){window.Baconian=e("./baconian"),window.BaconianExample=e("./baconian-example")},{"./baconian":7,"./baconian-example":5}],7:[function(e,t,n){var r=e("../advanced-input-area"),a=e("./baconian-applier"),i=e("../direction-selector"),l=e("../../../js/mithril/dropdown"),o=e("../result");t.exports=function(){function e(){_classCallCheck(this,e),this.alphabetInstance=new rumkinCipher.alphabet.English,this.alphabet={value:this.alphabetInstance},this.lastAlphabet=this.alphabetInstance,this.lastResult="",this.condensingOptions={label:"Alphabet style",options:{DISTINCT:"Each letter has a different code",CONDENSED:"Replace J with I and replace V with U"},value:"DISTINCT"},this.direction={},this.input={alphabet:this.alphabet,label:"The hidden message",value:""},this.embeddingOptions={label:"Embedding options",options:{BOLD:"Bold",EMPHASIS:"Emphasis",BOLD_EMPHASIS:"Bold and emphasis"},value:"BOLD"},this.embeddingText={label:"Embed your message in this text",value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(i,this.direction)),m("p",m(l,this.condensingOptions)),m("p",m(r,this.input)),this.viewSwapAB(),m("p",this.viewResult()),this.viewEmbed()]}},{key:"viewEmbed",value:function(){return this.direction.obfuscate?[m("p",m(l,this.embeddingOptions)),m("p",m(r,this.embeddingText)),m("p",this.viewEmbedResult())]:[]}},{key:"viewEmbedResult",value:function(){if(0===this.embeddingText.value.length)return"Enter some text in order to see your message hidden within.";var e="BOLD"===this.embeddingOptions.value?"Fw(b)":"EMPHASIS"===this.embeddingOptions.value?"Fs(i)":"Fw(b) Fs(i)",e=a(this.lastAlphabet,this.lastResult,this.embeddingText.value,e);return[m(o,e.result),this.viewEmbedResultFits(e.encodedMessageFits)]}},{key:"viewEmbedResultFits",value:function(e){return e?[]:m("p","The cipher did not fit into the text provided. Try making it longer. You will need one character per A or B letter in the code.")}},{key:"viewResult",value:function(){if(""===this.input.value.trim())return m(o,"Enter text to see it encoded here");this.lastAlphabet=this.alphabet.value,"CONDENSED"===this.condensingOptions.value&&(this.lastAlphabet=this.lastAlphabet.collapse("J","I").collapse("V","U"));var e=new rumkinCipher.util.Message(this.input.value),t=rumkinCipher.code.baconian;return this.lastResult=t[this.direction.code](e,this.lastAlphabet).toString(),m(o,this.lastResult)}},{key:"viewSwapAB",value:function(){var e=this;return this.direction.obfuscate?[]:m("p",m("a",{href:"#",onclick:function(){return e.input.value=e.input.value.replace(/[0Aa1Bb]/g,function(e){switch(e){case"0":return"1";case"1":return"0";case"A":return"B";case"B":return"A";case"a":return"b";case"b":return"a";default:return e}}),!1}},"Swap A and B"))}}]),e}()},{"../../../js/mithril/dropdown":1,"../advanced-input-area":3,"../direction-selector":8,"../result":9,"./baconian-applier":4}],8:[function(e,t,n){var a=e("../../js/mithril/dropdown");t.exports=function(){function r(e){var t=this,n=(_classCallCheck(this,r),e.attrs);n.value||(n.value="ENCRYPT"),this.d={options:{ENCRYPT:"Encrypt",DECRYPT:"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(e){return n.value=t.d.value,t.updateValues(n),!n.onchange||n.onchange(e)}},this.updateValues(n)}return _createClass(r,[{key:"updateValues",value:function(e){"ENCRYPT"===this.d.value?(e.cipher="encipher",e.crypt="encrypt",e.code="encode",e.obfuscate=!0):(e.cipher="decipher",e.crypt="decrypt",e.code="decode",e.obfuscate=!1)}},{key:"view",value:function(){return m(a,this.d)}}]),r}()},{"../../js/mithril/dropdown":1}],9:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em)"},[m("tt",e.children)])}}]),e}()},{}]},{},[6]);