"use strict";function _createForOfIteratorHelper(e,r){var a,t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length)return t&&(e=t),a=0,{s:r=function(){},n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,l=!0,o=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return l=e.done,e},e:function(e){o=!0,n=e},f:function(){try{l||null==t.return||t.return()}finally{if(o)throw n}}}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var a=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(a="Object"===a&&e.constructor?e.constructor.name:a)||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var a=0,t=new Array(r);a<r;a++)t[a]=e[a];return t}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var a=0;a<r.length;a++){var t=r[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,r,a){return r&&_defineProperties(e.prototype,r),a&&_defineProperties(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}var InputArea=require("../../js/mithril/input-area");module.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var a=this,n=e.attrs,e=[{label:"letters",callback:function(){var e,r="",a=_createForOfIteratorHelper(n.value.split(""));try{for(a.s();!(e=a.n()).done;){var t=e.value;n.alphabet.value.isLetter(t)||(r+=t)}}catch(e){a.e(e)}finally{a.f()}n.value=r},remove:!n.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(n.value);n.value=e.separate(n.alphabet.value).toString()},remove:!n.alphabet},{label:"numbers",callback:function(){n.value=n.value.replace(/[\d]/g,"")}},{label:"whitespace",callback:function(){n.value=n.value.replace(/[\s]/g,"")}}],r=[{label:"lowercase",callback:function(){n.value=a.lowercase(n.value)}},{label:"Natural case",callback:function(){n.value=a.lowercase(n.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return a.uppercase(e)})}},{label:"Title Case",callback:function(){n.value=a.lowercase(n.value).replace(/(^|\n|\s)\s*\S/g,function(e){return a.uppercase(e)})}},{label:"UPPERCASE",callback:function(){n.value=a.uppercase(n.value)}},{label:"swap case",callback:function(){n.value=n.value.split("").map(function(e){var r=a.uppercase(e);return e===r?a.lowercase(e):r}).join("")}},{label:"reverse",callback:function(){n.value=n.value.split("").reverse().join("")}}];return[m(InputArea,n),m("br"),this.viewActions("Remove",e),this.viewActions("Change",r)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,r){var a,t=[],n=_createForOfIteratorHelper(r);try{for(n.s();!(a=n.n()).done;)!function(){var e=a.value;t.length&&t.push(", "),e.remove||t.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){n.e(e)}finally{n.f()}return t.length?[m("br"),"".concat(e,": "),t]:null}}]),e}();