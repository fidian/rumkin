"use strict";function _createForOfIteratorHelper(t,e){var r,n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length)return n&&(t=n),r=0,{s:e=function(){},n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){i=!0,s=t},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw s}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function n(s,o,i){function a(e,t){if(!o[e]){if(!s[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(u)return u(e,!0);throw(t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}r=o[e]={exports:{}},s[e][0].call(r.exports,function(t){return a(s[e][1][t]||t)},r,r.exports,n,s,o,i)}return o[e].exports}for(var u="function"==typeof require&&require,t=0;t<i.length;t++)a(i[t]);return a}({1:[function(t,e,r){function n(t){null==t&&(t=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,t.constructor==Array?this.init_by_array(t,t.length):this.init_seed(t)}n.prototype.init_seed=function(t){for(this.mt[0]=t>>>0,this.mti=1;this.mti<this.N;this.mti++){t=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30;this.mt[this.mti]=(1812433253*((4294901760&t)>>>16)<<16)+1812433253*(65535&t)+this.mti,this.mt[this.mti]>>>=0}},n.prototype.init_by_array=function(t,e){var r,n,s;for(this.init_seed(19650218),r=1,n=0,s=this.N>e?this.N:e;s;s--){var o=this.mt[r-1]^this.mt[r-1]>>>30;this.mt[r]=(this.mt[r]^(1664525*((4294901760&o)>>>16)<<16)+1664525*(65535&o))+t[n]+n,this.mt[r]>>>=0,n++,++r>=this.N&&(this.mt[0]=this.mt[this.N-1],r=1),e<=n&&(n=0)}for(s=this.N-1;s;s--){o=this.mt[r-1]^this.mt[r-1]>>>30;this.mt[r]=(this.mt[r]^(1566083941*((4294901760&o)>>>16)<<16)+1566083941*(65535&o))-r,this.mt[r]>>>=0,++r>=this.N&&(this.mt[0]=this.mt[this.N-1],r=1)}this.mt[0]=2147483648},n.prototype.random_int=function(){var t,e,r=new Array(0,this.MATRIX_A);if(this.mti>=this.N){for(this.mti==this.N+1&&this.init_seed(5489),e=0;e<this.N-this.M;e++)t=this.mt[e]&this.UPPER_MASK|this.mt[e+1]&this.LOWER_MASK,this.mt[e]=this.mt[e+this.M]^t>>>1^r[1&t];for(;e<this.N-1;e++)t=this.mt[e]&this.UPPER_MASK|this.mt[e+1]&this.LOWER_MASK,this.mt[e]=this.mt[e+(this.M-this.N)]^t>>>1^r[1&t];t=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^t>>>1^r[1&t],this.mti=0}return t=this.mt[this.mti++],(t=(t=(t=(t^=t>>>11)^t<<7&2636928640)^t<<15&4022730752)^t>>>18)>>>0},n.prototype.random_int31=function(){return this.random_int()>>>1},n.prototype.random_incl=function(){return this.random_int()*(1/4294967295)},n.prototype.random=function(){return this.random_int()*(1/4294967296)},n.prototype.random_excl=function(){return(this.random_int()+.5)*(1/4294967296)},n.prototype.random_long=function(){return 1/9007199254740992*(67108864*(this.random_int()>>>5)+(this.random_int()>>>6))},e.exports=n},{}],2:[function(t,e,r){var n=new(t("mersenne-twister"))(Math.random()*Number.MAX_SAFE_INTEGER);e.exports=function(t){var e=t.length;for(;e--;)t[e]=Math.floor(256*n.random());return t}},{"mersenne-twister":1}],3:[function(t,e,r){function n(t){return"object"===_typeof(t)}var s,o,i;s="PasswordStrength",o=this,i=function(){function o(e,r){Object.keys(e).forEach(function(t){r(t,e[t])})}function s(t,e){t=t.replace(/[\W_]/g,function(t){return"\\"+t});return new RegExp("["+t+"]",e||"")}return Math.log2||(Math.log2=function(t){return Math.log(t)/Math.log(2)}),function t(){if(!(this instanceof t))return new t;this.commonPasswords=null,this.trigraph=null,this.charsets={number:"0123456789",lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",punctuation:"!'.,:;?&-\" ",symbol:"@#$%^*(){}[]><~`_+=|/"},this.addCommonPasswords=function(t){if(t)if(Array.isArray(t))this.commonPasswords=t;else{if("string"!=typeof t)throw new Error("Format does not match any expected format.");this.commonPasswords=t.split(/\r\n|\r|\n/)}else this.commonPasswords=[];return this},this.addTrigraphMap=function(t){if(t){if("object"!==_typeof(t)||Array.isArray(t))throw new Error("Format does not match any expected format.");this.trigraph=t}else this.trigraph=null;return this},this.charsetGroups=function(r){var n={};return o(this.charsets,function(t,e){n[t]=s(e).test(r)}),n.other=this.otherChars(r),n},this.charsetSize=function(r){var n=0;return o(this.charsets,function(t,e){r[t]&&(n+=e.length)}),"string"==typeof r.other&&(n+=r.other.length),n},this.check=function(t){var e={charsetSize:0,commonPassword:!1,nistEntropyBits:0,passwordLength:0,shannonEntropyBits:0,strengthCode:null,trigraphEntropyBits:null,charsets:null};return t&&t.length?(e.commonPassword=this.checkCommonPasswords(t),e.charsets=this.charsetGroups(t),e.charsetSize=this.charsetSize(e.charsets),e.nistEntropyBits=this.nistScore(t),e.shannonEntropyBits=this.shannonScore(t),e.passwordLength=t.length,e.trigraphEntropyBits=this.checkTrigraph(t,e.charsetSize),e.strengthCode=this.determineStrength(e)):this.trigraph&&(e.trigraphEntropyBits=0),e},this.checkCommonPasswords=function(t){var e,r,n;if(t=t.toLowerCase(),this.commonPasswords&&this.commonPasswords.length){for(r=this.commonPasswords,e=this.commonPasswords.length,n=0;n<e;n+=1)if(r[n]===t)return!0;return!1}return null},this.checkTrigraph=function(t,e){var r,n,s;if(!this.trigraph)return null;for(n=1,t="_"+(t=t.toLowerCase().replace(/[\W_]/gi," ").trim())+"_",r=0;r<t.length-2;r+=1)s=t.substr(r,3),this.trigraph[s]?n*=(1-this.trigraph[s]/1e4)*e:n*=e;return Math.log2(n)},this.determineStrength=function(t){return(t=t.trigraphEntropyBits||t.shannonEntropyBits)<=32?"VERY_WEAK":t<=48?"WEAK":t<=64?"REASONABLE":t<=80?"STRONG":"VERY_STRONG"},this.nistScore=function(t){var e=t.length,r=0;return 20<e&&(r+=e-20,e=20),8<e&&(r+=1.5*(e-8),e=8),1<e&&(r+=2*(e-1),e=1),e&&(r+=4),t.match(/[A-Z]/)&&t.match(/[^A-Za-z]/)&&(r+=6),r},this.otherChars=function(t){var e,r,n="";return o(this.charsets,function(t,e){n+=e}),r=s(n,"g"),e={},t.replace(r,"").split("").forEach(function(t){e[t]=!0}),Object.keys(e).join("")},this.shannonScore=function(n){var s,r;return r=0,s=n.length,o(function(){for(var t,e={},r=0;r<s;r+=1)e[t=n.charAt(r)]?e[t]+=1:e[t]=1;return e}(),function(t,e){r-=(e/=s)*Math.log2(e)}),r*s}}},"o"===_typeof(e)[0]&&n(e.exports)?e.exports=i():"o"===_typeof(r)[0]?r[s]=i():n(o.define)&&o.define.amd?o.define(s,[],i):n(o.modulejs)?o.modulejs.define(s,i):n(o.YUI)?o.YUI.add(s,function(t){t[s]=i()}):o[s]=i()},{}],4:[function(t,e,r){e.exports=function(){function e(t){_classCallCheck(this,e);t=t.attrs;void 0===t.value&&(t.value=Object.keys(t.options)[0])}return _createClass(e,[{key:"view",value:function(t){var e=t.attrs;return[this.viewLabel(e),m("select",Object.assign({},e,{onchange:function(t){return e.value=t.target.value,!e.onchange||e.onchange(t)},options:void 0}),Object.entries(e.options).map(function(t){return m("option",{value:t[0],selected:"".concat(t[0])==="".concat(e.value)},t[1])}))]}},{key:"viewLabel",value:function(t){return t.label?[t.label,": "]:null}}]),e}()},{}],5:[function(t,e,r){var u=t("polyfill-crypto.getrandomvalues"),n=window.crypto||window.msCrypto,h=(n&&n.getRandomValues&&Uint32Array&&(u=function(t){return n.getRandomValues(t)}),Number.MAX_SAFE_INTEGER);e.exports={number:function(){var t=h;try{for(;t===h;){var e=new Uint32Array(2);u(e),t=2097151&e[0],t=(t*=4294967296)+e[1]}return t/h}catch(t){return Math.random()}},index:function(e){try{if(h<e)throw new Error;for(var t=1,r=1;t<e;)t=2*t+1,r+=1;if(r<=32){for(var n=e;e<=n;){var s=new Uint32Array(1);u(s),n=s[0]&t}return n}for(var o=0;o<32;o+=1)--t,t/=2,--r;for(var i=e;e<=i;){var a=new Uint32Array(2);u(a),i=a[0]&t,i=(i*=4294967296)+a[1]}return i}catch(t){return Math.floor(Math.random()*e)}},maxSafeInteger:h}},{"polyfill-crypto.getrandomvalues":2}],6:[function(t,e,r){var n=t("../../js/mithril/dropdown"),s=t("../../js/module/random");e.exports=function(){function t(){var o=this;_classCallCheck(this,t),this.loadingIndex=!0,this.loadingWords=null,this.result="",this.words=[],this.wordlistSelect={options:{},onchange:function(){o.loadWordlist(o.wordlistSelect.value)}},m.request({extract:function(t){return JSON.parse(t.responseText)},url:"diceware-wordlists.json"}).then(function(t){o.loadingIndex=!1,o.wordlists={};var e,r=null,n=_createForOfIteratorHelper(t);try{for(n.s();!(e=n.n()).done;){var s=e.value;o.wordlists[s.uri]=s,o.wordlistSelect.options[s.uri]="".concat(s.code," - ").concat(s.description),null!==r&&!s.default||(console.log("set default",s),r=s.uri)}}catch(t){n.e(t)}finally{n.f()}o.wordlistSelect.value=r,o.loadWordlist(r)})}return _createClass(t,[{key:"loadWordlist",value:function(t){var e=this,t=(this.loadingWords=t,this.wordlists[t]);m.request({extract:function(t){return t.responseText.replace(/\r/,"\n").split("\n").map(function(t){return t.trim()}).filter(function(t){return!!t})},url:t.uri}).then(function(t){e.words=t,e.loadingWords=null})}},{key:"addWord",value:function(){this.result+=" ".concat(this.words[s.index(this.words.length)])}},{key:"clear",value:function(){this.result=""}},{key:"view",value:function(){return this.loadingIndex?m("p",{class:"output"},"Loading list of different wordlists."):[m("p",m(n,this.wordlistSelect)),this.actionButtons(),m("p",{class:"output"},this.result||'Generate a passphrase by pressing the "Add a Word" button a few times.')]}},{key:"actionButtons",value:function(){var t=this;return null!==this.loadingWords?m("p","Loading wordlinst: ".concat(this.wordlists[this.loadingWords].description)):m("p",[m("button",{onclick:function(){return t.addWord()}},"Add a word"),m("button",{onclick:function(){return t.clear()}},"Clear")])}}]),t}()},{"../../js/mithril/dropdown":4,"../../js/module/random":5}],7:[function(t,e,r){var n=t("../../js/module/random");e.exports=function(){function t(){_classCallCheck(this,t),this.passwordList=[],this.preset(24,{lowercase:!0,numbers:!0,uppercase:!0})}return _createClass(t,[{key:"preset",value:function(t,e,r){this.length=t,this.uppercase=!!e.uppercase,this.lowercase=!!e.lowercase,this.numbers=!!e.numbers,this.symbols=!!e.symbols,this.other=r||""}},{key:"view",value:function(){var e=this;return[m("p",["I have a few presets you may try: ",m("button",{onclick:function(){return e.preset(24,{uppercase:!0,lowercase:!0,numbers:!0})}},"Reasonable Password"),m("button",{onclick:function(){return e.preset(32,{uppercase:!0,lowercase:!0,numbers:!0,symbols:!0})}},"Strong Password"),m("button",{onclick:function(){return e.preset(64,{numbers:!0},"ABCDEF")}},"Fake SHA256"),m("button",{onclick:function(){return e.preset(32,{numbers:!0},"ABCDEF")}},"Fake MD5"),m("button",{onclick:function(){return e.preset(26,{numbers:!0},"ABCDEF")}},"128-bit WEP"),m("button",{onclick:function(){return e.preset(10,{numbers:!0},"ABCDEF")}},"64-bit WEP"),m("button",{onclick:function(){return e.preset(8,{},"01")}},"Byte in Binary"),m("button",{onclick:function(){return e.preset(2,{numbers:!0},"abcdef")}},"Byte in Hex"),m("button",{onclick:function(){return e.preset(20,{},"Il10OoCcKkPpSs5UuVvWwXXZz2")}},"Look-alikes"),m("button",{onclick:function(){return e.preset(48,{uppercase:!0,lowercase:!0,symbols:!0},"äàáãâąāḃćçċḑđḋëèéêęēėḟģġḩïìíĩîįīıj́ķĺļṁńñņöòóõôǫōṗŕŗśşṡßţŧṫüùúũûųūŵÿýŷźżÄÀÁÃÂĄĀḂĆÇĊḐĐḊËÈÉÊĘĒĖḞĢĠḨÏÌÍĩÎĮĪİJ́ĹĻ£ṀŃÑŅÖÒÓÕÔǪŌṖŔŖŚŞṠẞŢŦṪÜÙÚŨÛŲŪŴŸÝŶ¥ŹŻ° ☃±ⒸⓇ™£¹²³⁴⁵⁶⁷⁸⁹⁰½⅓⅔¼¾αβδεφγηιθκλμνοπχρστυωξψζΑΒΔΕΦΓΗΙΘΚΛΜΝΟΠΧΡΣΤΥΩΞΨΖ")}},"Extra Mean")]),m("p",[m("input",{type:"number",min:1,class:"W(3em)",value:this.length})," characters long",m("br"),m("label",[m("input",{type:"checkbox",checked:this.uppercase,onclick:function(){e.uppercase=!e.uppercase}})," Use uppercase, capital letters"]),m("br"),m("label",[m("input",{type:"checkbox",checked:this.lowercase,onclick:function(){e.lowercase=!e.lowercase}})," Use lowercase letters"]),m("br"),m("label",[m("input",{type:"checkbox",checked:this.numbers,onclick:function(){e.numbers=!e.numbers}})," Use numbers"]),m("br"),m("label",[m("input",{type:"checkbox",checked:this.symbols,onclick:function(){e.symbols=!e.symbols}})," Use mathematical symbols and punctuation"]),m("br"),"Include extra characters: ",m("input",{type:"text",value:this.other,oninput:function(t){e.other=t.target.value}})]),this.actionButton(),this.showPasswordList()]}},{key:"actionButton",value:function(){var t=this;return this.length&&(this.uppercase||this.lowercase||this.numbers||this.symbols||""!==this.other)?m("p",m("button",{onclick:function(){return t.generatePassword()}},"Generate a Password")):m("p","You must have something selected in order to generate a password.")}},{key:"makeCharSet",value:function(){var s={};function t(t){var e,r=_createForOfIteratorHelper(t.split(""));try{for(r.s();!(e=r.n()).done;){var n=e.value;s[n]=!0}}catch(t){r.e(t)}finally{r.f()}}return t(this.other),this.uppercase&&t("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),this.lowercase&&t("abcdefghijklmnopqrstuvwxyz"),this.numbers&&t("0123456789"),this.symbols&&t("`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"),Object.keys(s).sort().join("")}},{key:"generatePassword",value:function(){for(var t=this.makeCharSet(),e="";e.length<this.length;)e+=t[n.index(t.length)];this.passwordList.unshift(e),this.passwordList.splice(10)}},{key:"showPasswordList",value:function(){return 0===this.passwordList.length?m("p",{class:"output"},"Try pressing the button and see a new password."):m("div",{class:"output"},m("ul",this.passwordList.map(function(t){return m("li",t)})))}}]),t}()},{"../../js/module/random":5}],8:[function(t,e,r){e.exports=function(){function t(){_classCallCheck(this,t),this.md5=md5("")}return _createClass(t,[{key:"view",value:function(){var e=this;return[m("textarea",{class:"W(100%)",oninput:function(t){e.md5=md5(t.target.value)}}),m("div",{class:"output"},"MD5: ".concat(this.md5))]}}]),t}()},{}],9:[function(t,e,r){window.Diceware=t("./diceware"),window.Generate=t("./generate"),window.Md5Hash=t("./md5-hash"),window.PasswordStrength=t("./password-strength")},{"./diceware":6,"./generate":7,"./md5-hash":8,"./password-strength":10}],10:[function(t,e,r){var n=t("tai-password-strength/lib/password-strength");e.exports=function(){function t(){var e=this;_classCallCheck(this,t),this.password="",this.showPassword=!1,this.strengthScore=null,this.commonPasswords=null,this.passwordStrength=new n,this.filesLoading=2,m.request({extract:function(t){return JSON.parse(t.responseText)},url:"common-passwords.json"}).then(function(t){e.passwordStrength.addCommonPasswords(t),--e.filesLoading}),m.request({extract:function(t){return JSON.parse(t.responseText)},url:"trigraphs.json"}).then(function(t){e.passwordStrength.addTrigraphMap(t),--e.filesLoading})}return _createClass(t,[{key:"updatePassword",value:function(t){this.password=t,this.strengthScore=t?this.passwordStrength.check(t):null}},{key:"view",value:function(){var e=this;return this.filesLoading?m("p",{class:"output"},"Loading necessary files."):[m("p",m("label",[m("input",{type:"checkbox",checked:this.showPassword,onclick:function(){e.showPassword=!e.showPassword}})," Show password"]),m("br"),m("input",{type:this.showPassword?"text":"password",placeholder:"Password or passphrase",class:"W(100%)",value:this.password,oninput:function(t){return e.updatePassword(t.target.value)}})),m("div",{class:"output"},this.viewResult())]}},{key:"viewResult",value:function(){if(!this.password)return m("p","Enter a password or passphrase to analyze");var t=[],e=this.strengthScore,r=(e.commonPassword&&t.push(m("p","WARNING: This is a common password!"))," ".concat(Math.floor(e.trigraphEntropyBits)," bits of entropy."));switch(e.strengthCode){case"VERY_STRONG":t.push(m("p",["This password is very strong, with about",r]));break;case"STRONG":t.push(m("p",["You have a strong password, which provides approximately",r]));break;case"REASONABLE":t.push(m("p",["Your password seems to be fairly good, and has",r]));break;case"WEAK":t.push(m("p",["Your password is weak and can be cracked or guessed easily. It provides",r]));break;default:t.push(m("p",[m("span",{class:"Fw(b)"},"VERY WEAK PASSWORD!")," There are only",r]))}return t.push(m("p",["Suggestions for improvement:",m("ul",this.viewSuggestions())])),t}},{key:"viewSuggestions",value:function(){var t=[m("li","Make the passphrase longer.")],e=this.strengthScore.charsets;return e.lower||t.push(m("li","Add lowercase letters.")),e.upper||t.push(m("li","Add uppercase letters.")),e.number||t.push(m("li","Add numbers.")),e.punctuation||t.push(m("li","Add punctuation.")),e.symbol||t.push(m("li","Add symbols, such as ones used for math.")),t}}]),t}()},{"tai-password-strength/lib/password-strength":3}]},{},[9]);