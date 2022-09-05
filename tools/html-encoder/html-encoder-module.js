"use strict";function _createForOfIteratorHelper(e,t){var r,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function n(a,o,i){function u(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=o[t]={exports:{}},a[t][0].call(r.exports,function(e){return u(a[t][1][e]||e)},r,r.exports,n,a,o,i)}return o[t].exports}for(var c="function"==typeof require&&require,e=0;e<i.length;e++)u(i[e]);return u}({1:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var t=e.attrs;return m("label",[m("input",Object.assign({},t,{type:"checkbox",checked:!!t.value,onchange:function(e){return t.value=!t.value,!t.onchange||t.onchange(e)}})),this.viewLabel(t)])}},{key:"viewLabel",value:function(e){return e.label?[" ",e.label]:null}}]),e}()},{}],2:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,r=e.attrs;return[this.viewLabel(r.label),m("textarea",Object.assign({placeholder:"Enter text here"},r,{class:"W(100%) H(8em) Mah(75vh) ".concat(r.class),oninput:function(e){return t.value=r.value=e.target.value,!!r.oninput&&r.oninput(e)}}))]}}]),e}()},{}],3:[function(e,t,r){t.exports=function(e){var t,e=e.split(""),r=function(e){var t,r=new Set,n=_createForOfIteratorHelper(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;r.add(a)}}catch(e){n.e(e)}finally{n.f()}return r}(e),r=Array.from(r).map(function(e){return{letter:e,random:"<"===e?1:Math.random()}}).sort(function(e,t){return e.random-t.random}).map(function(e){return e.letter}),e=function(e,t){var r,n="",a=_createForOfIteratorHelper(e);try{for(a.s();!(r=a.n()).done;){var o=r.value;n+=String.fromCharCode(48+t.get(o))}}catch(e){a.e(e)}finally{a.f()}return n}(e,function(e){for(var t=new Map,r=0;r<e.length;r+=1)t.set(e[r],r);return t}(r));return t=r,e=e,t=JSON.stringify(r.join("")),e=JSON.stringify(e),"((function(l,r){\nvar o='',j=0;\nfor(;j<r.length;j++){o+=l.charAt(r.charCodeAt(j)-48);}\ndocument.write(o);\n})(".concat(t,",\n").concat(e,"))")}},{}],4:[function(e,t,r){window.HtmlEncoder=e("./html-encoder")},{"./html-encoder":5}],5:[function(e,t,r){var n=e("../../js/mithril/checkbox"),a=e("../../js/mithril/input-area"),o=e("./encoder");t.exports=function(){function e(){_classCallCheck(this,e),this.input={value:""},this.scriptTags={label:["Surround JavaScript in ",m("tt","script")," tags"],value:!0}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(a,this.input)),m("p",m(n,this.scriptTags)),this.viewResult()]}},{key:"viewResult",value:function(){if(!this.input.value)return"Enter some HTML and you'll see generated JavaScript code.";var e=o(this.input.value),t="To use this, copy and paste this into a JavaScript file and ensure it is loaded at the appropriate time, or else wrap it in script tags and embed it into HTML.";return this.scriptTags.value&&(e="<script>".concat(e,"<\/script>"),t="To use this, copy and paste the above into your HTML web page. When viewed in a browser, the code will show the original HTML."),[m("p","Result:"),m("pre",e),m("p",t)]}}]),e}()},{"../../js/mithril/checkbox":1,"../../js/mithril/input-area":2,"./encoder":3}]},{},[4]);