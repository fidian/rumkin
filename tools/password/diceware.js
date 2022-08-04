"use strict";function _createForOfIteratorHelper(t,r){var e,n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||r&&t&&"number"==typeof t.length)return n&&(t=n),e=0,{s:r=function(){},n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){a=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw o}}}}function _unsupportedIterableToArray(t,r){if(t){if("string"==typeof t)return _arrayLikeToArray(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(e="Object"===e&&t.constructor?t.constructor.name:e)||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(t,r):void 0}}function _arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function _classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,r,e){return r&&_defineProperties(t.prototype,r),e&&_defineProperties(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}var Dropdown=require("../../js/mithril/dropdown"),random=require("../../js/module/random");module.exports=function(){function t(){var i=this;_classCallCheck(this,t),this.loadingIndex=!0,this.loadingWords=null,this.result="",this.words=[],this.wordlistSelect={options:{},onchange:function(){i.loadWordlist(i.wordlistSelect.value)}},m.request({extract:function(t){return JSON.parse(t.responseText)},url:"diceware-wordlists.json"}).then(function(t){i.loadingIndex=!1,i.wordlists={};var r,e=null,n=_createForOfIteratorHelper(t);try{for(n.s();!(r=n.n()).done;){var o=r.value;i.wordlists[o.uri]=o,i.wordlistSelect.options[o.uri]="".concat(o.code," - ").concat(o.description),null!==e&&!o.default||(console.log("set default",o),e=o.uri)}}catch(t){n.e(t)}finally{n.f()}i.wordlistSelect.value=e,i.loadWordlist(e)})}return _createClass(t,[{key:"loadWordlist",value:function(t){var r=this,t=(this.loadingWords=t,this.wordlists[t]);m.request({extract:function(t){return t.responseText.replace(/\r/,"\n").split("\n").map(function(t){return t.trim()}).filter(function(t){return!!t})},url:t.uri}).then(function(t){r.words=t,r.loadingWords=null})}},{key:"addWord",value:function(){this.result+=" ".concat(this.words[random.index(this.words.length)])}},{key:"clear",value:function(){this.result=""}},{key:"view",value:function(){return this.loadingIndex?m("p",{class:"output"},"Loading list of different wordlists."):[m("p",m(Dropdown,this.wordlistSelect)),this.actionButtons(),m("p",{class:"output"},this.result||'Generate a passphrase by pressing the "Add a Word" button a few times.')]}},{key:"actionButtons",value:function(){var t=this;return null!==this.loadingWords?m("p","Loading wordlinst: ".concat(this.wordlists[this.loadingWords].description)):m("p",[m("button",{onclick:function(){return t.addWord()}},"Add a word"),m("button",{onclick:function(){return t.clear()}},"Clear")])}}]),t}();