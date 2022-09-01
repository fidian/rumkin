"use strict";function _createForOfIteratorHelper(r,e){var t,o="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!o){if(Array.isArray(r)||(o=_unsupportedIterableToArray(r))||e&&r&&"number"==typeof r.length)return o&&(r=o),t=0,{s:e=function(){},n:function(){return t>=r.length?{done:!0}:{done:!1,value:r[t++]}},e:function(r){throw r},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,a=!1;return{s:function(){o=o.call(r)},n:function(){var r=o.next();return i=r.done,r},e:function(r){a=!0,n=r},f:function(){try{i||null==o.return||o.return()}finally{if(a)throw n}}}}function _unsupportedIterableToArray(r,e){if(r){if("string"==typeof r)return _arrayLikeToArray(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Map"===(t="Object"===t&&r.constructor?r.constructor.name:t)||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,e):void 0}}function _arrayLikeToArray(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,o=new Array(e);t<e;t++)o[t]=r[t];return o}function _classCallCheck(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(r,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}function _createClass(r,e,t){return e&&_defineProperties(r.prototype,e),t&&_defineProperties(r,t),Object.defineProperty(r,"prototype",{writable:!1}),r}var cryptogramShared=require("./cryptogram-shared"),Dropdown=require("../../../js/mithril/dropdown"),session=require("./session"),wordlists=require("./wordlists");module.exports=function(){function r(){var l=this;_classCallCheck(this,r),this.wordlists={label:"Wordlist",value:session.wordlist,options:{}},this.ready=!1,session.cipherText||m.route.set("/"),wordlists.getWordlists().then(function(r){var e,t=l.wordlists.options,o=null,n=!1,i=_createForOfIteratorHelper(r);try{for(i.s();!(e=i.n()).done;){var a=e.value,s=a.filename,o=o||s;s===l.wordlists.value&&(n=!0),t[s]="".concat(a.name,", ").concat(a.wordCount," words")}}catch(r){i.e(r)}finally{i.f()}n||(l.wordlists.value=o),l.ready=!0})}return _createClass(r,[{key:"view",value:function(){return[cryptogramShared.viewCipherText(),m("p",this.viewWordlist()),m("p",this.viewButtons())]}},{key:"viewWordlist",value:function(){return this.ready?m(Dropdown,this.wordlists):"Loading list of wordlists"}},{key:"viewButtons",value:function(){var r=this;return[m("button",{onclick:function(){m.route.set("/")}},"Go back"),m("button",{disabled:!this.ready,onclick:function(){session.wordlist=r.wordlists.value,m.route.set("/solve")}},"Next step")]}}]),r}();