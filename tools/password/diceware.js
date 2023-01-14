"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _createForOfIteratorHelper(t,r){var e,n,o,i,a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(a)return n=!(e=!0),{s:function(){a=a.call(t)},n:function(){var t=a.next();return e=t.done,t},e:function(t){n=!0,o=t},f:function(){try{e||null==a.return||a.return()}finally{if(n)throw o}}};if(Array.isArray(t)||(a=_unsupportedIterableToArray(t))||r&&t&&"number"==typeof t.length)return a&&(t=a),i=0,{s:r=function(){},n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,r){var e;if(t)return"string"==typeof t?_arrayLikeToArray(t,r):"Map"===(e="Object"===(e=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:e)||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(t,r):void 0}function _arrayLikeToArray(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function _classCallCheck(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,_toPropertyKey(n.key),n)}}function _createClass(t,r,e){return r&&_defineProperties(t.prototype,r),e&&_defineProperties(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(t,r){if("object"!==_typeof(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0===e)return("string"===r?String:Number)(t);e=e.call(t,r||"default");if("object"!==_typeof(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}var Dropdown=require("../../js/mithril/dropdown"),random=require("../../js/module/random");module.exports=function(){function t(){var i=this;_classCallCheck(this,t),this.loadingIndex=!0,this.loadingWords=null,this.result="",this.words=[],this.wordlistSelect={options:{},onchange:function(){i.loadWordlist(i.wordlistSelect.value)}},m.request({url:"diceware-wordlists.json"}).then(function(t){i.loadingIndex=!1,i.wordlists={};var r,e=null,n=_createForOfIteratorHelper(t);try{for(n.s();!(r=n.n()).done;){var o=r.value;i.wordlists[o.uri]=o,i.wordlistSelect.options[o.uri]="".concat(o.code," - ").concat(o.description),null!==e&&!o.default||(e=o.uri)}}catch(t){n.e(t)}finally{n.f()}i.wordlistSelect.value=e,i.loadWordlist(e)})}return _createClass(t,[{key:"loadWordlist",value:function(t){var r=this,t=(this.loadingWords=t,this.wordlists[t]);m.request({extract:function(t){return t.responseText.replace(/\r/,"\n").split("\n").map(function(t){return t.trim()}).filter(function(t){return!!t})},url:t.uri}).then(function(t){r.words=t,r.loadingWords=null})}},{key:"addWord",value:function(){this.result+=" ".concat(this.words[random.index(this.words.length)])}},{key:"clear",value:function(){this.result=""}},{key:"view",value:function(){return this.loadingIndex?m("p",{class:"output"},"Loading list of different wordlists."):[m("p",m(Dropdown,this.wordlistSelect)),this.actionButtons(),m("p",{class:"output"},this.result||'Generate a passphrase by pressing the "Add a Word" button a few times.')]}},{key:"actionButtons",value:function(){var t=this;return null!==this.loadingWords?m("p","Loading wordlinst: ".concat(this.wordlists[this.loadingWords].description)):m("p",[m("button",{onclick:function(){return t.addWord()}},"Add a word"),m("button",{onclick:function(){return t.clear()}},"Clear")])}}]),t}();