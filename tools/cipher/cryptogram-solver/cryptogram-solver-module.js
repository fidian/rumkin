"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var a,n,i=[],s=!0,o=!1;try{for(r=r.call(e);!(s=(a=r.next()).done)&&(i.push(a.value),!t||i.length!==t);s=!0);}catch(e){o=!0,n=e}finally{try{s||null==r.return||r.return()}finally{if(o)throw n}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _createForOfIteratorHelper(e,t){var r,a="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return a&&(e=a),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return i=e.done,e},e:function(e){s=!0,n=e},f:function(){try{i||null==a.return||a.return()}finally{if(s)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function a(n,i,s){function o(t,e){if(!i[t]){if(!n[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},n[t][0].call(r.exports,function(e){return o(n[t][1][e]||e)},r,r.exports,a,n,i,s)}return i[t].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)o(s[e]);return o}({1:[function(e,t,r){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],2:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,":",m("br")]:null}},{key:"view",value:function(e){var t=this,r=e.attrs;return[this.viewLabel(r.label),m("textarea",Object.assign({placeholder:"Enter text here"},r,{class:"W(100%) H(8em) Mah(75vh) ".concat(r.class),oninput:function(e){return t.value=r.value=e.target.value,!!r.oninput&&r.oninput(e)}}))]}}]),e}()},{}],3:[function(e,t,r){t.exports=function(){function t(e){_classCallCheck(this,t),this.value=e.attrs.value||""}return _createClass(t,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var r=this,a=e.attrs;return a.value!==+this.value&&(this.value="".concat(a.value)),[this.viewLabel(a.label),m("input",Object.assign({},a,{value:this.value,type:"number",oninput:function(e){var t=e.target.value;return r.value=t,a.value=+t,!a.oninput||a.oninput(e)}}))]}}]),t}()},{}],4:[function(e,t,r){var a=e("../../js/mithril/input-area"),n=e("../../js/mithril/numeric-input");t.exports=function(){function e(){_classCallCheck(this,e),this.group={class:"W(3em)",value:5},this.split={class:"W(3em)",value:10}}return _createClass(e,[{key:"applyGroups",value:function(e){var t=Math.floor(this.group.value),r=Math.floor(this.split.value),a=e.value.replace(/[\s]/g,"");if(t<1)this.updateValue(e,a);else{for(var n=[];a.length;)n.push(a.substr(0,this.group.value)),a=a.substr(this.group.value);if(r<0)this.updateValue(e,n.join(" "));else{for(;n.length;){a.length&&(a+="\n");for(var i=0;i<this.split.value;i+=1)i&&(a+=" "),a+=n.shift()||""}this.updateValue(e,a)}}}},{key:"updateValue",value:function(e,t){e.value!==t&&(e.value=t,e.oninput&&e.oninput(null),e.onchange&&e.onchange(null))}},{key:"view",value:function(e){var n=this,i=e.attrs,e=[{label:"letters",callback:function(){var e,t="",r=_createForOfIteratorHelper(i.value.split(""));try{for(r.s();!(e=r.n()).done;){var a=e.value;i.alphabet.value.isLetter(a)||(t+=a)}}catch(e){r.e(e)}finally{r.f()}n.updateValue(i,t)},remove:!i.alphabet},{label:"non-letters",callback:function(){var e=new rumkinCipher.util.Message(i.value);n.updateValue(i,e.separate(i.alphabet.value).toString())},remove:!i.alphabet},{label:"numbers",callback:function(){n.updateValue(i,i.value.replace(/[\d]/g,""))}},{label:"whitespace",callback:function(){n.updateValue(i,i.value.replace(/[\s]/g,""))}}],t=[{label:"lowercase",callback:function(){n.updateValue(i,n.lowercase(i.value))}},{label:"Natural case",callback:function(){n.updateValue(i,n.lowercase(i.value).replace(/(^|\n|[.?!])\s*\S/g,function(e){return n.uppercase(e)}))}},{label:"Title Case",callback:function(){n.updateValue(i,n.lowercase(i.value).replace(/(^|\n|\s)\s*\S/g,function(e){return n.uppercase(e)}))}},{label:"UPPERCASE",callback:function(){n.updateValue(i,n.uppercase(i.value))}},{label:"swap case",callback:function(){n.updateValue(i,i.value.split("").map(function(e){var t=n.uppercase(e);return e===t?n.lowercase(e):t}).join(""))}},{label:"reverse",callback:function(){n.updateValue(i,i.value.split("").reverse().join(""))}}];return[m(a,i),m("br"),this.viewActions("Remove",e),this.viewActions("Change",t),this.viewGrouping(i)]}},{key:"lowercase",value:function(e){return e.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(e,t){var r,a=[],n=_createForOfIteratorHelper(t);try{for(n.s();!(r=n.n()).done;)!function(){var e=r.value;a.length&&a.push(", "),e.remove||a.push(m("a",{href:"#",onclick:function(){return e.callback(),!0}},e.label))}()}catch(e){n.e(e)}finally{n.f()}return a.length?[m("br"),"".concat(e,": "),a]:null}},{key:"viewGrouping",value:function(e){var t=this;return[m("br"),m("a",{href:"#",onclick:function(){return t.applyGroups(e),!0}},"Make groups")," of ",m(n,this.group)," and next line after ",m(n,this.split)," groups"]}}]),e}()},{"../../js/mithril/input-area":2,"../../js/mithril/numeric-input":3}],5:[function(e,t,r){var n=e("./session");t.exports={viewCipherText:function(){var e,t=[],r=_createForOfIteratorHelper(n.cipherText.split(/\r?\n/));try{for(r.s();!(e=r.n()).done;){var a=e.value;t.length&&t.push(m("br")),t.push(a)}}catch(e){r.e(e)}finally{r.f()}return[m("p",m("b","Cipher text:")),m("p",m("tt",t))]}}},{"./session":10}],6:[function(e,t,r){var a=e("./cryptogram-shared"),n=e("./cryptogram-word"),f=e("./session"),i=e("./wordlists");t.exports=function(){function e(){var n=this;_classCallCheck(this,e),this.wordlist=f.wordlist,this.wordlistMeta=null,this.parsed=null,this.letterMap=new Map,this.bestGuessStatus=-1,this.bestGuessProgress="",this.showList=0,i.getWordlists().then(function(e){var t,r=_createForOfIteratorHelper(e);try{for(r.s();!(t=r.n()).done;){var a=t.value;if(a.filename===n.wordlist)return n.wordlistMeta=a,void n.loadWordlist()}}catch(e){r.e(e)}finally{r.f()}m.route.set("/")})}return _createClass(e,[{key:"keyWord",value:function(e){var r=65,a=0,n=new Map;return{key:e.split("").map(function(e){var t=n.get(e);return t||(t=r,n.set(e,t),r+=1,a+=1),String.fromCharCode(t)}).join(""),letterCount:a}}},{key:"keyWordlist",value:function(e){var t,r={},a=_createForOfIteratorHelper(e);try{for(a.s();!(t=a.n()).done;){var n=t.value,i=this.keyWord(n).key,s=r[i];s||(s=[],r[i]=s),s.push(n)}}catch(e){a.e(e)}finally{a.f()}return r}},{key:"upper",value:function(e){return e.toUpperCase().replace(/ß/g,"ẞ")}},{key:"isLetter",value:function(e){return!!e.match(/['·A-ZÀÁÂÄÅÃĄÆĈÇĆČÐĐÈÉÊËĘĜĤÌÍÎÏĴŁÑŃÒÓÔÖÕØŜŚŠŞẞÙÚÛÜŬÝŹŻАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ]/)}},{key:"incrementShowingIndex",value:function(e){for(var t=e.length-1;0<=t;){var r=e[t];if(r.showingIndex+=1,!(r.showingIndex>=r.availableMatches.length))return!0;r.showingIndex=0,--t}return!1}},{key:"parseWords",value:function(e){var t,r=[],a=null,n=_createForOfIteratorHelper(this.upper(f.cipherText).split(""));try{for(n.s();!(t=n.n()).done;){var i=t.value,s=this.isLetter(i);a&&a.isLetter===s?a.chars+=i:(a={chars:i,isLetter:s},r.push(a))}}catch(e){n.e(e)}finally{n.f()}for(var o=0,l=r;o<l.length;o++){var u,c,h=l[o];h.isLetter&&(u=(c=this.keyWord(h.chars)).key,c=c.letterCount,h.key=u,h.letterCount=c,h.rawMatches=e[h.key]||[],h.showingIndex=0)}return r}},{key:"reset",value:function(){var e,t=_createForOfIteratorHelper(this.parsed);try{for(t.s();!(e=t.n()).done;){var r=e.value;r.isLetter&&(r.availableMatches=_toConsumableArray(r.rawMatches),r.selectedWord="",r.isLoaded=!1)}}catch(e){t.e(e)}finally{t.f()}this.letterMap=new Map,this.bestGuessStatus=1,this.deduce([]);var a,n=_createForOfIteratorHelper(this.parsed);try{for(n.s();!(a=n.n()).done;){var i=a.value;!i.selectedWord&&i.isLetter&&(this.bestGuessStatus=-1)}}catch(e){n.e(e)}finally{n.f()}}},{key:"loadWordlist",value:function(){var t=this;i.getWordlist(this.wordlistMeta.filename).then(function(e){e=t.keyWordlist(e);t.parsed=t.parseWords(e),t.reset()})}},{key:"deduce",value:function(a){function e(){var e,t=_createForOfIteratorHelper(n.parsed);try{for(t.s();!(e=t.n()).done;){var r=e.value;r.isLetter&&(n.updateAvailableMatches(r),1!==r.availableMatches.length||r.selectedWord||(r.selectedWord=r.availableMatches[0],a.push([r.chars,r.selectedWord])))}}catch(e){t.e(e)}finally{t.f()}}var n=this;for(e();a.length;){for(var t=_slicedToArray(a.shift(),2),r=t[0],i=t[1],s=0;s<r.length;s+=1)this.letterMap.set(r.charAt(s),i.charAt(s));e()}}},{key:"makePattern",value:function(e,t){var r=_toConsumableArray(this.letterMap.values()).join(""),a=r?"[^".concat(r,"]"):".",r=e.split("").map(function(e){return t.get(e)||a}).join("");return new RegExp("^".concat(r,"$"))}},{key:"updateAvailableMatches",value:function(e){var t=this.makePattern(e.chars,this.letterMap);e.availableMatches=e.availableMatches.filter(function(e){return e.match(t)})}},{key:"sortParsedWords",value:function(){return this.parsed.filter(function(e){return e.isLetter}).sort(function(e,t){var r=e.letterCount-t.letterCount;if(r)return r;r=e.availableMatches.length;return t.availableMatches.length-r})}},{key:"startBestGuess",value:function(){var e,t=this.sortParsedWords(),r=_createForOfIteratorHelper(t);try{for(r.s();!(e=r.n()).done;)e.value.hits=new Set}catch(e){r.e(e)}finally{r.f()}var a=t.pop(),a={current:this.makeCurrentState(a,"",""),earlier:[],next:t};this.processState(a)}},{key:"makeCurrentState",value:function(e,t,r,a){for(var n=new Map(t),i=0;i<r.length;i+=1)n.set(r.charAt(i),a.charAt(i));return{index:0,item:e,map:n,pattern:this.makePattern(e.chars,n)}}},{key:"processState",value:function(e){for(var t=this,r=Date.now();r+200>Date.now();)if(e.current.index>=e.current.item.availableMatches.length){if(e.next.push(e.current.item),e.current=e.earlier.pop(),!e.current)return void this.finishBestGuess(e.next);e.current.index+=1}else{for(;e.current.index<e.current.item.availableMatches.length&&!e.current.item.availableMatches[e.current.index].match(e.current.pattern);)e.current.index+=1;if(e.current.index<e.current.item.availableMatches.length)if(e.next.length){var a=e.current,n=(e.earlier.push(a),e.next.pop());e.current=this.makeCurrentState(n,a.map,a.item.chars,a.item.availableMatches[a.index])}else{var i,s=_createForOfIteratorHelper(e.earlier);try{for(s.s();!(i=s.n()).done;){var o=i.value;o.item.hits.add(o.item.availableMatches[o.index])}}catch(e){s.e(e)}finally{s.f()}e.current.index+=1}}this.bestGuessProgress=this.makeBestGuessProgress(e),setTimeout(function(){t.processState(e),m.redraw()},1)}},{key:"makeBestGuessProgress",value:function(e){var t,r=[],a=_createForOfIteratorHelper(e.earlier);try{for(a.s();!(t=a.n()).done;){var n=t.value;r.push("[".concat(n.index,"/").concat(n.item.availableMatches.length,"]"))}}catch(e){a.e(e)}finally{a.f()}return r.push("[".concat(e.current.index,"/").concat(e.current.item.availableMatches.length,"]")),r.join(" ")}},{key:"finishBestGuess",value:function(e){var a,n=0,i=0,s=0,o=0,t=_createForOfIteratorHelper(e);try{for(t.s();!(a=t.n()).done;)!function(){var e,t,r=a.value;n+=1,r.hits.size?(i+=1,e=r.availableMatches.length,r.availableMatches=r.availableMatches.filter(function(e){return r.hits.has(e)}),t=r.availableMatches.length,o=e-t):s+=1,delete r.hits}()}catch(e){t.e(e)}finally{t.f()}this.bestGuessStatus=1,this.bestGuessProgress=s===n?"The words in this dictionary are unable to decode this message. Try a larger dictionary or perhaps attempt to pick words yourself to find a solution.":"Updated ".concat(i," out of ").concat(n," words and removed ").concat(o," possibilities."),this.deduce([])}},{key:"view",value:function(){return[a.viewCipherText(),m("p",this.viewWordlist()),this.viewBestGuess(),this.viewParsed(),m("p",this.viewButtons()),this.viewList()]}},{key:"viewWordlist",value:function(){return this.wordlistMeta?m("p",[m("b","Wordlist:")," ".concat(this.wordlistMeta.name)]):"Loading list of wordlists"}},{key:"viewBestGuess",value:function(){var e=this;return 0<this.bestGuessStatus||!this.parsed||!this.parsed.length?m("p",this.bestGuessProgress):0===this.bestGuessStatus?m("p","Working on eliminating conflicting words ... ".concat(this.bestGuessProgress)):m("p",[m("button",{onclick:function(){return e.bestGuessStatus=0,e.startBestGuess(),!1}},"Eliminate Bad Combinations")," This can take a significant amount of time. Removes words from the lists that can not work with other cipher words. This will often help you find the deciphered text much quicker, but the entire cipher text consist of dictionary words."])}},{key:"viewParsed",value:function(){var r=this;return this.parsed?this.parsed.length?0===this.bestGuessStatus?null:m("div",{class:"D(f) Fxw(w)"},this.parsed.map(function(e){return m(n,{data:e,letterMap:r.letterMap,setLetters:function(e,t){return r.deduce([[e,t]])}})})):"Nothing to decrypt":"Loading dictionary..."}},{key:"viewButtons",value:function(){var e=this;return[m("button",{onclick:function(){m.route.set("/")}},"Go Back"),m("button",{disabled:!this.parsed||!this.parsed.length||0===this.bestGuessStatus,onclick:function(){e.reset()}},"Reset Options")]}},{key:"viewList",value:function(){if(!this.parsed||0===this.bestGuessStatus)return[];var e,t=1,r=_createForOfIteratorHelper(this.parsed);try{for(r.s();!(e=r.n()).done;){var a=e.value;a.isLetter&&(t*=a.availableMatches.length)}}catch(e){r.e(e)}finally{r.f()}return 1e6<t?m("p","There are too many possibilities. Viewing the options has been disabled until you can narrow down the options."):[this.viewListWords(),this.viewListButton(t)]}},{key:"viewListWords",value:function(){if(!this.showList)return[];var e,t=_createForOfIteratorHelper(this.parsed);try{for(t.s();!(e=t.n()).done;)e.value.showingIndex=0}catch(e){t.e(e)}finally{t.f()}for(var r=this.sortParsedWords(),a=0,n=[];a<this.showList;)if(n.push(this.viewSingleListEntry()),a+=1,!this.incrementShowingIndex(r))return n;return n}},{key:"viewSingleListEntry",value:function(){var e=this.parsed.map(function(e){return e.isLetter?e.selectedWord||e.availableMatches[e.showingIndex]:e.chars});return m("div",{class:"My(0.25em)"},e.join(""))}},{key:"viewListButton",value:function(e){var t=this;if(e<=this.showList)return m("p","No further solutions exist with this dictionary.");return m("p",m("button",{onclick:function(){t.showList+=1e3}},this.viewListButtonLabel(e,1e3)))}},{key:"viewListButtonLabel",value:function(e,t){return 0===this.showList&&e<=t?"Show all ".concat(e.toLocaleString()," solutions"):this.showList+t>e?"Show remaining ".concat((e-this.showList).toLocaleString()," solutions"):(0===this.showList?"Show first ":"Show next ").concat(t.toLocaleString()," solutions out of ").concat(e.toLocaleString())}}]),e}()},{"./cryptogram-shared":5,"./cryptogram-word":9,"./session":10,"./wordlists":11}],7:[function(e,t,r){window.CryptogramSolve=e("./cryptogram-solve"),window.CryptogramStart=e("./cryptogram-start")},{"./cryptogram-solve":6,"./cryptogram-start":8}],8:[function(e,t,r){var a=e("../advanced-input-area"),n=e("../../../js/mithril/dropdown"),i=e("./session"),s=e("./wordlists");t.exports=function(){function e(){var l=this;_classCallCheck(this,e),this.wordlists={label:"Wordlist",value:i.wordlist,options:{}},this.ready=!1,this.input={label:"The cipher text to decode",value:i.cipherText},s.getWordlists().then(function(e){var t,r=l.wordlists.options,a=null,n=!1,i=_createForOfIteratorHelper(e);try{for(i.s();!(t=i.n()).done;){var s=t.value,o=s.filename,a=a||o;o===l.wordlists.value&&(n=!0),r[o]="".concat(s.name,", ").concat(s.wordCount," words")}}catch(e){i.e(e)}finally{i.f()}n||(l.wordlists.value=a),l.ready=!0})}return _createClass(e,[{key:"view",value:function(){var e=this;return[m("p",m(a,this.input)),m("p",this.viewWordlist()),m("p",m("button",{disabled:0===this.input.value.trim().length,onclick:function(){i.cipherText=e.input.value.trim(),i.wordlist=e.wordlists.value,m.route.set("/solve")}},"Next step"))]}},{key:"viewWordlist",value:function(){return this.ready?m(n,this.wordlists):"Loading list of wordlists"}}]),e}()},{"../../../js/mithril/dropdown":1,"../advanced-input-area":4,"./session":10,"./wordlists":11}],9:[function(e,t,r){var o=e("../../../js/mithril/dropdown");t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"remapWord",value:function(e,t){return e.split("").map(function(e){return t.get(e)||"?"}).join("")}},{key:"view",value:function(e){var t=e.attrs.data;if(t.isLetter)return this.viewWord(t,e.attrs.letterMap,e.attrs.setLetters);var r,a=[],n=_createForOfIteratorHelper(t.chars.split(/\r?\n/));try{for(n.s();!(r=n.n()).done;){var i=r.value;a.length&&a.push(m("div",{class:"W(100%) H(0px)"})),a.push(this.viewNonWord(i))}}catch(e){n.e(e)}finally{n.f()}return a}},{key:"viewNonWord",value:function(e){return e.length?m("div",[this.viewChars(e),m("br"),this.viewChars(e)]):null}},{key:"viewChars",value:function(e){return m("tt",{class:"Whs(p)"},e)}},{key:"viewWord",value:function(e,t,r){return m("div",{class:"Pb(0.5em)"},[this.viewChars(e.chars),m("br"),this.viewWordLower(e,t,r)])}},{key:"viewWordLower",value:function(t,e,r){if(!t.isLetter)return this.viewChars(t.chars);if(t.selectedWord)return this.viewChars(t.selectedWord);e=this.remapWord(t.chars,e);if(t.availableMatches.length<1)return this.viewChars(e);e="".concat(e," (").concat(t.availableMatches.length,")");if(null===t.isLoaded)return"Loading";if(!t.isLoaded)return m("a",{href:"#",onclick:function(){return t.isLoaded=null,setTimeout(function(){t.isLoaded=!0,m.redraw()}),!1}},e);var a,n={"":e},i=_createForOfIteratorHelper(t.availableMatches);try{for(i.s();!(a=i.n()).done;){var s=a.value;n[s]=s}}catch(e){i.e(e)}finally{i.f()}return m(o,{value:t.selectedWord,onchange:function(e){t.selectedWord=e.target.value,r(t.chars,t.selectedWord)},options:n})}}]),e}()},{"../../../js/mithril/dropdown":1}],10:[function(e,t,r){var a="cryptogramSolver.",n=sessionStorage;t.exports={get cipherText(){return n.getItem("".concat(a,"cipherText"))||""},set cipherText(e){n.setItem("".concat(a,"cipherText"),e)},get wordlist(){return n.getItem("".concat(a,"wordlist"))||"american-50-medium.txt"},set wordlist(e){n.setItem("".concat(a,"wordlist"),e)}}},{}],11:[function(e,t,r){var a=null;t.exports={getWordlists:function(){return a=a||m.request({url:"../wordlists/wordlists.json"})},getWordlist:function(e){return m.request({extract:function(e){return e.responseText.trim().split(/[\r\n]+/)},url:"../wordlists/".concat(e)})}}},{}]},{},[7]);