"use strict";function _createForOfIteratorHelper(e,t){var r,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),r=0,{s:t=function(){},n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(r){var n=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,n?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function n(a,o,i){function s(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=o[t]={exports:{}},a[t][0].call(r.exports,function(e){return s(a[t][1][e]||e)},r,r.exports,n,a,o,i)}return o[t].exports}for(var c="function"==typeof require&&require,e=0;e<i.length;e++)s(i[e]);return s}({1:[function(e,t,r){var l=e("./map-util");t.exports=function(e,t,r){var n,a,o,i,s,c,u={};for(r%=e.length,r=(e.length+r)%e.length,o=Object.keys(e.letterOrder),a=0;a<o.length;a+=1)for(s=e.letterOrder[o[a]],i=0;i<e.length;i+=1)n=s.charAt(i),c=s.charAt((i*t+r)%e.length),u[n]=c;return l.mapTranslations(e,u),u}},{"./map-util":5}],2:[function(e,t,r){var h;h=e("./map-util"),t.exports=function(e,t){for(var r,n,a,o,i,s={},c=Math.ceil(Math.log2(e.length)),u=Object.keys(e.letterOrder),l=0;l<u.length;l+=1)for(n=e.letterOrder[u[l]],r=0;r<e.length;r+=1)s[n.charAt(r)]=(a=c,o=r,i=t,o=(o="00000000".concat(o.toString(2))).substr(-a),o=i?o:(o=o.replace(/0/g,"a")).replace(/1/g,"b"));return h.mapTranslations(e,s),s}},{"./map-util":5}],3:[function(e,t,r){var u=e("./map-util");t.exports=function(e,t){var r,n,a,o,i,s,c={};for(t%=e.length,t=(e.length+t)%e.length,a=Object.keys(e.letterOrder),n=0;n<a.length;n+=1)for(i=e.letterOrder[a[n]],o=0;o<e.length;o+=1)r=i.charAt(o),s=i.charAt((o+t)%e.length),c[r]=s;return u.mapTranslations(e,c),c}},{"./map-util":5}],4:[function(e,t,r){t.exports={affine:e("./affine"),caesar:e("./caesar"),mapUtil:e("./map-util"),reverse:e("./reverse")}},{"./affine":1,"./caesar":3,"./map-util":5,"./reverse":6}],5:[function(e,t,r){t.exports={flip:function(e){for(var t={},r=Object.keys(e),n=0;n<r.length;n+=1)t[e[r[n]]]=r[n];return t},mapTranslations:function(e,t){for(var r,n,a,o,i=Object.keys(e.translations),s=0;s<i.length;s+=1){for(r=i[s],o=e.translations[r],a="",n=0;n<o.length;n+=1)a+=t[o.charAt(n)];t[r]=a}}}},{}],6:[function(e,t,r){var c=e("./map-util");t.exports=function(e){for(var t,r,n,a,o={},i=Object.keys(e.letterOrder),s=0;s<i.length;s+=1)for(n=e.letterOrder[i[s]],r=0;r<e.length;r+=1)t=n.charAt(r),a=n.charAt(e.length-r-1),o[t]=a;return c.mapTranslations(e,o),o}},{"./map-util":5}],7:[function(e,t,r){t.exports=function(){function t(){_classCallCheck(this,t),this.cacheShiftBySize={},this.length=0,this.letterOrder={},this.characterSets={},this.letterOrderIndex={},this.translations={},this.name="Alphabet",this.padChar=""}return _createClass(t,[{key:"clone",value:function(){var e;function o(e){for(var t,r={},n=Object.keys(e),a=0;a<n.length;a+=1)(t=e[n[a]])&&"object"===_typeof(t)&&(t=o(t)),r[n[a]]=t;return r}return(e=new t).characterSets=o(this.characterSets),e.length=this.length,e.letterOrder=o(this.letterOrder),e.letterOrderIndex=o(this.letterOrderIndex),e.translations=o(this.translations),e.name=this.name,e.padChar=this.padChar,e}},{key:"collapse",value:function(e,t){var r=this.toIndex(e),n=this.toIndex(t),a=this.clone();return-1!==r&&-1!==n&&(Object.keys(a.letterOrder).forEach(function(e){var t=a.letterOrder[e];a.translations[t.charAt(r)]=t.charAt(n),a.letterOrder[e]=t.substr(0,r)+t.substr(r+1)}),--a.length,a.updateIndexes()),a}},{key:"filterKeyIndexes",value:function(e,t){var r,n={},a=[];for("last"===t&&(e=e.reverse()),r=0;r<e.length;r+=1)-1===e[r]||n[e[r]]||(n[e[r]]=!0,a.push(e[r]));return a="last"===t?a.reverse():a}},{key:"findLetterIndexes",value:function(e){for(var t=[],r=0;r<e.length;r+=1)t.push(this.toIndex(e.charAt(r)));return t}},{key:"isLetter",value:function(e){for(var t=Object.keys(this.characterSets),r=0;r<t.length;r+=1)if(this.characterSets[t[r]].includes(e))return!0;return!1}},{key:"keyAlphabetByIndexes",value:function(e){for(var t,r,n,a=this.clone(),o=Object.keys(a.letterOrder),i=0;i<o.length;i+=1){for(t=a.letterOrder[o[i]],n="",r=0;r<e.length;r+=1)n+=t.charAt(e[r]);a.letterOrder[o[i]]=n}return a.updateIndexes(),a}},{key:"keyWord",value:function(e,t){var r,n,a=[];for((t=t||{}).reverseKey&&(e=e.split("").reverse().join("")),n=this.findLetterIndexes(e),n=t.useLastInstance?this.filterKeyIndexes(n,"last"):this.filterKeyIndexes(n,"first"),r=0;r<this.length;r+=1)-1===n.indexOf(r)&&a.push(r);return t.reverseAlphabet&&(a=a.reverse()),e=t.keyAtEnd?a.concat(n):n.concat(a),this.keyAlphabetByIndexes(e)}},{key:"matchCase",value:function(e,t){var r,n,a=this.toIndex(t);if(-1!==a)for(n=Object.keys(this.characterSets),r=0;r<n.length;r+=1)if(-1<this.characterSets[n[r]].indexOf(e))return this.letterOrder[n[r]].charAt(a);return t}},{key:"toIndex",value:function(e){e=this.letterOrderIndex[e];return void 0===e?-1:e}},{key:"toLetter",value:function(e){return(e%=this.letterOrder.upper.length)<0&&(e+=this.letterOrder.upper.length),this.letterOrder.upper.charAt(e)}},{key:"toLetters",value:function(e){var t,r=Object.keys(this.letterOrder),n="";if(0<=e)for(t=0;t<r.length;t+=1)e<this.letterOrder[r[t]].length&&(n+=this.letterOrder[r[t]].charAt(e));return n}},{key:"translateString",value:function(e){for(var t=Object.keys(this.translations),r=0;r<t.length;r+=1)e=e.replace(new RegExp("[".concat(t[r],"]"),"g"),this.translations[t[r]]);return e}},{key:"updateIndexes",value:function(){for(var e,t,r=Object.keys(this.letterOrder),n={},a=0;a<r.length;a+=1)for(e=this.letterOrder[r[a]],t=0;t<e.length;t+=1)n[e.charAt(t)]=t;this.letterOrderIndex=n}}]),t}()},{}],8:[function(e,t,r){var n=e("./alphabet");t.exports=function(){_inherits(r,n);var t=_createSuper(r);function r(){var e;return _classCallCheck(this,r),(e=t.call(this)).characterSets={lower:"abcdefghijklmnopqrstuvwxyzäößü",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖẞÜ"},e.length=26,e.letterOrder={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"},e.padChar="X",e.translations={"ä":"ae","ö":"oe","ß":"ss","ü":"ue","Ä":"AE","Ö":"OE","ẞ":"SS","Ü":"UE"},e.name="Deutsche",e.updateIndexes(),e}return _createClass(r)}()},{"./alphabet":7}],9:[function(e,t,r){var n=e("./alphabet");t.exports=function(){_inherits(r,n);var t=_createSuper(r);function r(){var e;return _classCallCheck(this,r),(e=t.call(this)).characterSets={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"},e.length=26,e.letterOrder={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"},e.name="English",e.padChar="X",e.updateIndexes(),e}return _createClass(r)}()},{"./alphabet":7}],10:[function(e,t,r){var n=e("./alphabet");t.exports=function(){_inherits(r,n);var t=_createSuper(r);function r(){var e;return _classCallCheck(this,r),(e=t.call(this)).characterSets={lower:"abcdefghijklmnñopqrstuvwxyz",upper:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"},e.length=27,e.letterOrder={lower:"abcdefghijklmnñopqrstuvwxyz",upper:"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"},e.name="Español",e.padChar="X",e.updateIndexes(),e}return _createClass(r)}()},{"./alphabet":7}],11:[function(e,t,r){t.exports={Deutsche:e("./deutsche"),English:e("./english"),"Español":e("./español")}},{"./deutsche":8,"./english":9,"./español":10}],12:[function(e,t,r){var n,a,o;function i(e,t){if("number"!=typeof(t=t||{}).multiplier&&(t.multiplier=1),t.multiplier=~~t.multiplier,t.multiplier<1||t.multiplier>=e.length)throw new Error("Multipliers must be between 1 and the size of the alphabet");if(!o.coprime(t.multiplier,e.length))throw new Error("Multiplier must be coprime to alphabet length");if("number"!=typeof t.shift&&(t.shift=0),t.shift=~~t.shift,t.shift<0||t.shift>=e.length)throw new Error("Shift must be between 0 and the size of the alphabet");return t}o=e("../util/"),n=e("../alphabet-map/affine"),a=e("../alphabet-map/map-util"),t.exports={decipher:function(e,t,r){return r=i(t,r),t=n(t,r.multiplier,r.shift),t=a.flip(t),e.map(t)},encipher:function(e,t,r){return r=i(t,r),t=n(t,r.multiplier,r.shift),e.map(t)}}},{"../alphabet-map/affine":1,"../alphabet-map/map-util":5,"../util/":36}],13:[function(e,t,r){var n;function a(e,t){t=n(t);return e.map(t)}n=e("../alphabet-map/reverse"),t.exports={decipher:a,encipher:a}},{"../alphabet-map/reverse":6}],14:[function(e,t,r){var h=e("../util/message"),f=e("../util/message-chunk"),p=e("../util/polybius-square");t.exports={decipher:function(e,t){for(var r,n,a,o,i=new h,s=new p(t),c=(e=e.translate(t)).separate(t),u=[],l=0;l<c.length;l+=1)r=c.charAt(l),o=s.indexOf(r.getValue()),u.push({index:o[0],positions:r.getPositions()}),u.push({index:o[1],positions:r.getPositions()});for(a=u.length/2,l=0;l<a;l+=1)r=s.charAt(u[l].index,u[l+a].index),n=new f(r,u[l].positions.concat(u[l+a].positions)),i.append(n);return i=e.overlay(t,i)},encipher:function(e,t){var r,n,a,o,i,s,c;function u(e,t){var r;a=a?(r=c.charAt(a.index,e),r=new f(r,a.positions.concat(t)),s.append(r),null):{index:e,positions:t}}for(s=new h,a=null,c=new p(t),i=(e=e.translate(t)).separate(t),n=[],o=0;o<i.length;o+=1)(r={chunk:i.charAt(o)}).positions=r.chunk.getPositions(),r.index=c.indexOf(r.chunk.getValue()),n.push(r);for(o=0;o<n.length;o+=1)u(n[o].index[0],n[o].positions);for(o=0;o<n.length;o+=1)u(n[o].index[1],n[o].positions);return s=e.overlay(t,s)}}},{"../util/message":40,"../util/message-chunk":39,"../util/polybius-square":41}],15:[function(e,t,r){var n;function a(e,t){return"number"!=typeof(t=t||{}).shift&&(t.shift=1),t.shift<0?(t.shift=-t.shift,t.shift%=e.length,t.shift=e.length-t.shift):t.shift%=e.length,t}n=e("../alphabet-map/caesar"),t.exports={decipher:function(e,t,r){return r=a(t,r),t=n(t,-r.shift),e.map(t)},encipher:function(e,t,r){return r=a(t,r),t=n(t,r.shift),e.map(t)}}},{"../alphabet-map/caesar":3}],16:[function(e,t,r){var p;function d(e){return"object"===_typeof(e)&&e||(e={}),Array.isArray(e.columnKey)||(e.columnKey=[]),0===e.columnKey.length&&e.columnKey.push(0),e}p=e("../util/message"),t.exports={decipher:function(e,t,r){var n,a,o,i,s,c,u,l,h,f;for(r=d(r),l=new p,c=e.separate(t),o=[],a=r.columnKey.length,h=Math.floor(c.length/a),i=c.length%a,s=u=0;s<a;s+=1)f=r.columnKey[s],i?(o[f]=h+1,--i):o[f]=h;for(s=0;s<a;s+=1)for(h=o[s],o[s]=[];o[s].length<h;)o[s].push(c.charAt(u)),u+=1;for(;o[r.columnKey[0]].length;)for(s=0;s<a;s+=1)(n=o[r.columnKey[s]].shift())&&l.append(n);return l=e.overlay(t,l)},encipher:function(e,t,r){var n,a,o,i,s,c;for(r=d(r),s=new p,i=e.separate(t),a=[],c=[],n=r.columnKey.length,o=0;o<n;o+=1)a[o]=[],c[r.columnKey[o]]=a[o];for(o=0;o<e.length;o+=1)a[o%n].push(i.charAt(o));for(o=0;o<n;o+=1)for(;c[o].length;)s.append(c[o].shift());return s=e.overlay(t,s)}}},{"../util/message":40}],17:[function(e,t,r){t.exports={affine:e("./affine"),atbash:e("./atbash"),bifid:e("./bifid"),caesar:e("./caesar"),columnarTransposition:e("./columnar-transposition"),oneTimePad:e("./one-time-pad"),railFence:e("./rail-fence"),rot13:e("./rot13"),"vigenère":e("./vigenère")}},{"./affine":12,"./atbash":13,"./bifid":14,"./caesar":15,"./columnar-transposition":16,"./one-time-pad":18,"./rail-fence":19,"./rot13":20,"./vigenère":21}],18:[function(e,t,r){var h,f;function n(e,t,r,n){for(var a,o,i=e.separate(t),s=t.findLetterIndexes(i.toString()),c=t.findLetterIndexes(r.separate(t).toString()),u=new h,l=0;l<s.length;l+=1)a=e.charAt(l),o=s[l]+c[l%c.length]*n,o=new f(t.toLetter(o),a.getPositions()),u.append(o);return u}h=e("../util/message"),f=e("../util/message-chunk"),t.exports={decipher:function(e,t,r){return n(e,t,r.pad,-1)},encipher:function(e,t,r){return n(e,t,r.pad,1)}}},{"../util/message":40,"../util/message-chunk":39}],19:[function(e,t,r){var b=e("../util/message");function O(e){return 2*(e-1)-1}function A(e){(!(e=e||{}).rails||e.rails<0)&&(e.rails=5),(!e.offset||e.offset<0)&&(e.offset=0);var t=O(e.rails);return e.offset>t&&(e.offset=t),e}t.exports={decipher:function(e,t,r){for(var n=e.separate(t),a=(r=A(r),[]);a.length<r.rails;)a.push([]);for(var o=r.offset,i=O(r.rails),s=r.rails-1,c=0;c<n.value.length;c+=1)a[o<s?o:r.rails-o+s-1].push(c),i<(o+=1)&&(o=0);for(var u=[],l=0,h=0,f=a;h<f.length;h++){var p,d=_createForOfIteratorHelper(f[h]);try{for(d.s();!(p=d.n()).done;){var v=p.value;u.push({index:v,chunk:n.charAt(l)}),l+=1}}catch(e){d.e(e)}finally{d.f()}}u.sort(function(e,t){return e.index-t.index});for(var g=new b,y=0,x=u;y<x.length;y++){var m=x[y];g.append(m.chunk)}return e.overlay(t,g)},encipher:function(e,t,r){for(var n=e.separate(t),a=(r=A(r),[]);a.length<r.rails;)a.push(new b);for(var o=r.offset,i=O(r.rails),s=r.rails-1,c=0;c<n.value.length;c+=1)a[o<s?o:r.rails-o+s-1].append(n.charAt(c)),i<(o+=1)&&(o=0);for(var u=new b,l=0,h=a;l<h.length;l++){var f=h[l];u.append(f)}return e.overlay(t,u)}}},{"../util/message":40}],20:[function(e,t,r){var a,o;function i(e){return(e=e||{}).rot5Numbers=!!e.rot5Numbers,e}a=e("../alphabet-map/caesar"),o={0:"5",1:"6",2:"7",3:"8",4:"9",5:"0",6:"1",7:"2",8:"3",9:"4"},t.exports={decipher:function(e,t,r){var n;return r=i(r),n=t.length-Math.floor(t.length/2),t=a(t,n),n=e.map(t),n=r.rot5Numbers?n.map(o):n},encipher:function(e,t,r){var n;return r=i(r),n=Math.floor(t.length/2),t=a(t,n),n=e.map(t),n=r.rot5Numbers?n.map(o):n}}},{"../alphabet-map/caesar":3}],21:[function(e,t,r){var l;function h(e,t){return(t=t||{}).key=t.key||e.letterOrder.upper.charAt(0),t}function f(e,t){var r,n=[],a=_createForOfIteratorHelper(e.findLetterIndexes(t));try{for(a.s();!(r=a.n()).done;){var o=r.value;0<=o&&n.push(o)}}catch(e){a.e(e)}finally{a.f()}return n.length||n.push(0),n}l=e("../util/message"),t.exports={decipher:function(e,t,r){for(var n=f(t,(r=h(t,r)).key),a=new l,o=e.separate(t),i=0;i<o.length;i+=1){for(var s=o.charAt(i),c=t.toIndex(s.getValue())-n[i%n.length];c<0;)c+=t.letterOrder.upper.length;s.setValue(t.toLetter(c)),a.append(s),r.autokey&&n.push(c)}return e.overlay(t,a)},encipher:function(e,t,r){for(var n=f(t,(r=h(t,r)).key),a=new l,o=e.separate(t),i=0;i<o.length;i+=1){var s=o.charAt(i),c=t.toIndex(s.getValue()),u=c+n[i%n.length];u%=t.letterOrder.upper.length,s.setValue(t.toLetter(u)),a.append(s),r.autokey&&n.push(c)}return e.overlay(t,a)}}},{"../util/message":40}],22:[function(e,t,r){var n,a;function o(e,t){for(var r=Object.keys(t),n=0;n<r.length;n+=1)e.add(t[r[n]],r[n])}n=e("../alphabet-map/baconian"),a=e("./code-tree"),t.exports=function(e){var t=new a;return o(t,n(e,!1)),o(t,n(e,!0)),t}},{"../alphabet-map/baconian":2,"./code-tree":23}],23:[function(e,t,r){t.exports=function(){function e(){_classCallCheck(this,e),this.root={}}return _createClass(e,[{key:"add",value:function(e,t){for(var r,n=this.root,a=0;a<e.length;a+=1)n[r=e.charAt(a)]||(n[r]={}),n.hasChild=!0,n=n[r];return n.value=t,this}},{key:"addObject",value:function(e){for(var t=Object.keys(e),r=0;r<t.length;r+=1)this.add(t[r],e[t[r]]);return this}},{key:"get",value:function(e){for(var t,r,n=this.root,a=0;a<e.length;a+=1){if(!n[t=e.charAt(a)])return null;n=n[t]}return r={},n.hasChild&&(r.hasChild=n.hasChild),n.value&&(r.value=n.value),r}}]),e}()},{}],24:[function(e,t,r){t.exports={baconian:e("./baconian"),CodeTree:e("./code-tree"),morseDecode:e("./morse-decode"),morseEncode:e("./morse-encode")}},{"./baconian":22,"./code-tree":23,"./morse-decode":26,"./morse-encode":27}],25:[function(e,t,r){t.exports=[{code:".-",text:["A","a"]},{code:"-...",text:["B","b"]},{code:"-.-.",text:["C","c","[CORRECT]","[AFFIRMATIVE]"]},{code:"-..",text:["D","d"]},{code:".",text:["E","e"]},{code:"..-.",text:["F","f"]},{code:"--.",text:["G","g"]},{code:"....",text:["H","h"]},{code:"..",text:["I","i"]},{code:".---",text:["J","j"]},{code:"-.-",text:["K","k","[OVER]","[INVITE TO TRANSMIT]","[INVITATION TO TRANSMIT]"]},{code:".-..",text:["L","l"]},{code:"--",text:["M","m"]},{code:"-.",text:["N","n","[NEGATIVE]"]},{code:"---",text:["O","o"]},{code:".--.",text:["P","p"]},{code:"--.-",text:["Q","q"]},{code:".-.",text:["R","r","[ROGER]"]},{code:"...",text:["S","s"]},{code:"-",text:["T","t"]},{code:"..-",text:["U","u"]},{code:"...-",text:["V","v"]},{code:".--",text:["W","w"]},{code:"-..-",text:["X","x"]},{code:"-.--",text:["Y","y"]},{code:"--..",text:["Z","z"]},{code:"-----",text:["0"]},{code:".----",text:["1"]},{code:"..---",text:["2"]},{code:"...--",text:["3"]},{code:"....-",text:["4"]},{code:".....",text:["5"]},{code:"-....",text:["6"]},{code:"--...",text:["7"]},{code:"---..",text:["8"]},{code:"----.",text:["9"]},{code:".-.-.-",text:["."]},{code:"--..--",text:[","]},{code:"..--..",text:["?","[REPEAT]","[PLEASE SAY AGAIN]"]},{code:".----.",text:["'"]},{code:"-.-.-.",text:["!"]},{code:"-..-.",text:["/"]},{code:"-.--.",text:["(","[INVITE NAMED STATION TO TRANSMIT]"]},{code:"-.--.-",text:[")"]},{code:".-...",text:["&","[WAIT]"]},{code:"---...",text:[":"]},{code:"-.-.-.",text:[";"]},{code:"-...-",text:["-","[NEW SECTION]","[NEW PARAGRAPH]"]},{code:".-.-.",text:["+","[NEW PAGE]","[OUT]"]},{code:"-....-",text:["-"]},{code:"..--.-",text:["_"]},{code:".-..-.",text:['"']},{code:"...-..-",text:["$"]},{code:".--.-.",text:["@"]},{code:"...-.-",text:["[EOW]","[END OF CONTACT]","[END OF WORK]","[END]"]},{code:"........",text:["[ERR]","[ERROR]","[CORRECTION]"]},{code:"-.-.-",text:["[START]","[ATTENTION]"]},{code:".--.-",text:["À","à","Å","å"]},{code:".-.-",text:["Ä","ä","Æ","æ","Ą","ą","[UNKNOWN STATION]","[NEW LINE]"]},{code:"-.-..",text:["Ć","ć","Ĉ","ĉ","Ç","ç"]},{code:"----",text:["Ĥ","ĥ","Š","š","CH","ch"]},{code:"..-..",text:["Đ","đ","É","é","Ę","ę"]},{code:"..--.",text:["Ð","ð"]},{code:".-..-",text:["È","è","Ł","ł"]},{code:"--.-.",text:["Ĝ","ĝ"]},{code:".---.",text:["Ĵ","ĵ"]},{code:"--.--",text:["Ñ","ñ","Ń","ń"]},{code:"---.",text:["Ó","ó","Ö","ö","Ø","ø"]},{code:"...-...",text:["Ś","ś"]},{code:"...-.",text:["Ŝ","ŝ","[UNDERSTOOD]","[VERIFIED]"]},{code:".--..",text:["Þ","þ"]},{code:"..--",text:["Ü","ü","Ŭ","ŭ"]},{code:"--..-.",text:["Ź","ź"]},{code:"--..-",text:["Ż","ż"]},{code:"..-.-",text:["[INT]","[INTERROGATIVE]"]},{code:"-...-",text:["[BREAK]"]},{code:"-..---",text:["[SHIFT TO WABUN CODE]"]},{code:"...---...",text:["S̅O̅S̅"]}]},{}],26:[function(e,t,r){var a=e("./code-tree"),o=e("./morse-data");t.exports=function(){for(var e=new a,t=0,r=Object.values(o);t<r.length;t++){var n=r[t];e.add(n.code,n.text[0])}return e}},{"./code-tree":23,"./morse-data":25}],27:[function(e,t,r){var s=e("./code-tree"),c=e("./morse-data");t.exports=function(){for(var e=new s,t=0,r=Object.values(c);t<r.length;t++){var n,a=r[t],o=_createForOfIteratorHelper(a.text);try{for(o.s();!(n=o.n()).done;){var i=n.value;e.add(i,a.code)}}catch(e){o.e(e)}finally{o.f()}}return e}},{"./code-tree":23,"./morse-data":25}],28:[function(e,t,r){var n=e("../code-tree/baconian"),a=e("../alphabet-map/baconian");t.exports={decode:function(e,t){t=n(t);return e.recode(t)},encode:function(e,t,r){(r=r||{}).binary=!!r.binary;t=a(t,r.binary);return e.map(t)}}},{"../alphabet-map/baconian":2,"../code-tree/baconian":22}],29:[function(e,t,r){var h=e("../util/message"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";t.exports={decode:function(e){var t,r,n,a,o,i,s,c,u;for(e=e.filter(/[+A-Za-z0-9/]/),c=new h,u=0;u<e.length;u+=4)4===(r=(t=e.substr(u,4)).getValue()).length?(o=255&(f.indexOf(r.charAt(0))<<2|(n=f.indexOf(r.charAt(1)))>>>4),i=255&(n<<4|(a=f.indexOf(r.charAt(2)))>>>2),s=255&(a<<6|f.indexOf(r.charAt(3))),t.setValue(String.fromCharCode(o)+String.fromCharCode(i)+String.fromCharCode(s))):3===r.length?(o=255&(f.indexOf(r.charAt(0))<<2|(n=f.indexOf(r.charAt(1)))>>>4),i=255&(n<<4|(a=f.indexOf(r.charAt(2)))>>>2),t.setValue(String.fromCharCode(o)+String.fromCharCode(i))):2===r.length?(o=255&(f.indexOf(r.charAt(0))<<2|(n=f.indexOf(r.charAt(1)))>>>4),t.setValue(String.fromCharCode(o))):t.setValue(""),c.append(t);return c},encode:function(e){for(var t,r,n,a,o,i,s,c,u=new h,l=0;l<e.length;)c=3===(r=(t=e.substr(l,3)).getValue()).length?(i=r.charCodeAt(0),s=r.charCodeAt(1),c=r.charCodeAt(2),n=f.charAt(i>>>2),a=f.charAt(63&(i<<4|s>>>4)),o=f.charAt(63&(s<<2|c>>>6)),f.charAt(63&c)):2===r.length?(i=r.charCodeAt(0),s=r.charCodeAt(1),n=f.charAt(i>>>2),a=f.charAt(63&(i<<4|s>>>4)),o=f.charAt(s<<2&63),"="):(i=r.charCodeAt(0),n=f.charAt(i>>>2),a=f.charAt(i<<4&63),o="="),t.setValue(n+a+o+c),u.append(t),l+=3;return u}}},{"../util/message":40}],30:[function(e,t,r){t.exports={baconian:e("./baconian"),base64:e("./base64")}},{"./baconian":28,"./base64":29}],31:[function(e,t,r){t.exports={alphabet:e("./alphabet/"),alphabetMap:e("./alphabet-map/"),cipher:e("./cipher/"),code:e("./code/"),codeTree:e("./code-tree/"),util:e("./util/")}},{"./alphabet-map/":4,"./alphabet/":11,"./cipher/":17,"./code-tree/":24,"./code/":30,"./util/":36}],32:[function(e,t,r){t.exports=function(e,t,r){(o=(o=r)||{}).columnOrder=!!o.columnOrder,o.dupesBackwards=!!o.dupesBackwards,r=o;var n,a,o=e.translateString(t),t=function(e,n){var t=[],a=0;function r(e){t.push({value:e,index:t.length})}function o(){for(var e=n.charAt(a),t=0,r=0;"0"<=e&&e<="9";)t+=1,r=10*r+ +e,a+=1,e=n.charAt(a);return t?r:null}for(;a<n.length;){var i,s=n.charAt(a);"-"===s?(a+=1,null!==(i=o())&&r(-1*i)):"0"<=s&&s<="9"?r(o()):(0<=(i=e.toIndex(s))&&r(i),a+=1)}return t}(e,o),i=(e=t,o=r.dupesBackwards,n=e.slice(),a=o?-1:1,n.sort(function(e,t){return e.value<t.value?-1:e.value>t.value?1:e.index<t.index?-1*a:a}),e.map(function(e){return n.indexOf(e)}));if(!r.columnOrder)return i;var s,c=[],u=_createForOfIteratorHelper(i);try{for(u.s();!(s=u.n()).done;){var l=s.value;c[i[l]]=l}}catch(e){u.e(e)}finally{u.f()}return c}},{}],33:[function(e,t,r){var a=e("./factor");t.exports=function(e,t){var r=a(e),n=a(t);for(r.length||r.push(e),n.length||n.push(t);r.length&&n.length;)if(r[0]<n[0])for(r.shift();r.length&&r[0]<n[0];)r.shift();else{if(!(r[0]>n[0]))return!1;for(n.shift();n.length&&r[0]>n[0];)n.shift()}return!0}},{"./factor":34}],34:[function(e,t,r){var i=e("./prime"),s={keys:[],values:{}};t.exports=function(e){var t=[];if(!(e<3||e!==~~e||i(e))){if(s.values[e])return s.values[e].slice();for(var r=i(),n=0,a=e;r[n]*r[n]<=a;){var o=a/r[n];o==~~o?(t.push(r[n]),a=o):n+=1}t.push(a),s.values[e]=t.slice(),s.keys.push(e),250<s.keys.length&&(delete s.values[s.keys[0]],s.keys.shift())}return t}},{"./prime":42}],35:[function(e,t,r){var n;n=e("./kappa-plaintext"),t.exports=function(e,t,r){return r||(e=e.separate(t),r=n(e)),r*t.length}},{"./kappa-plaintext":37}],36:[function(e,t,r){t.exports={columnKey:e("./column-key"),coprime:e("./coprime"),factor:e("./factor"),indexOfCoincidence:e("./index-of-coincidence"),kappaPlaintext:e("./kappa-plaintext"),letterFrequency:e("./letter-frequency"),Message:e("./message"),MessageChunk:e("./message-chunk"),polybiusSquare:e("./polybius-square"),prime:e("./prime")}},{"./column-key":32,"./coprime":33,"./factor":34,"./index-of-coincidence":35,"./kappa-plaintext":37,"./letter-frequency":38,"./message":40,"./message-chunk":39,"./polybius-square":41,"./prime":42}],37:[function(e,t,r){var i;i=e("./letter-frequency"),t.exports=function(e,t){var r,n,a,o;if(t=t||i(e),e.length<2)return 0;for(o=0,r=Object.keys(t),a=0;a<r.length;a+=1)o+=(n=t[r[a]])*(n-1);return o/=e.length*(e.length-1)}},{"./letter-frequency":38}],38:[function(e,t,r){t.exports=function(e){for(var t,r={},n=e.toString(),a=0;a<n.length;a+=1)r[t=n.charAt(a)]?r[t]+=1:r[t]=1;return r}},{}],39:[function(e,t,r){t.exports=function(){function r(e,t){_classCallCheck(this,r),this.setValue(e),this.setPositions(t)}return _createClass(r,[{key:"append",value:function(e){return new r(this.getValue()+e.getValue(),this.getPositions().concat(e.getPositions()))}},{key:"getPositions",value:function(){return[].concat(this.positions)}},{key:"getValue",value:function(){return this.value}},{key:"setPositions",value:function(e){return this.positions=[].concat(e),this}},{key:"setValue",value:function(e){return this.value=e,this}}]),r}()},{}],40:[function(e,t,r){var c;function n(e){e.length=e.value.length}c=e("./message-chunk"),t.exports=function(){function s(e){_classCallCheck(this,s),this.value=(e||"").toString(),this.positions=[];for(var t=0;t<this.value.length;t+=1)this.positions[t]=[t];n(this)}return _createClass(s,[{key:"append",value:function(e){if(e instanceof s)for(var t=0;t<e.length;t+=1)this.append(e.charAt(t));else{for(this.value+=e.getValue();this.positions.length<this.value.length;)this.positions.push(e.getPositions());n(this)}return this}},{key:"charAt",value:function(e){return new c(this.value.charAt(e),this.positions[e])}},{key:"filter",value:function(e){for(var t=new s,r=0;r<this.value.length;r+=1){var n=this.charAt(r);"function"==typeof e?e(n,r)&&t.append(n):n.getValue().match(e)&&t.append(n)}return t}},{key:"map",value:function(e){for(var t=new s,r=0;r<this.length;r+=1){var n=this.charAt(r),a=n.getValue();Object.hasOwn(e,a)?(a=e[a])&&(n.setValue(a),t.append(n)):t.append(n)}return t}},{key:"overlay",value:function(e,t){for(var r=new s,n=0,a=0;a<this.value.length;a+=1){var o,i=this.value.charAt(a);e.isLetter(i)?n<t.length&&(o=t.charAt(n),n+=1,o.setValue(e.matchCase(i,o.getValue())),r.append(o)):r.append(this.charAt(a))}for(;n<t.length;)r.append(t.charAt(n)),n+=1;return r}},{key:"process",value:function(e,r){var n=new s,a=[];function t(){var e,t=r(a);for(a=[],e=0;e<t.length;e+=1)n.append(t[e])}"function"==typeof e&&(r=e,e={}),e.size<1&&(e.size=1);for(var o=0;o<this.length;o+=1)a.push(this.charAt(o)),a.length>=this.size&&t();return a.length&&t(),n}},{key:"recode",value:function(e){for(var t=0,r=new s;t<this.value.length;){for(var n,a=1,o=[].concat(this.positions[t]),i=e.get(this.value.substr(t,a));i&&!i.value&&t+a<this.value.length;)o=o.concat(this.positions[t+a]),a+=1,i=e.get(this.value.substr(t,a));i&&i.value?(n=new c(i.value,o),r.append(n),t+=a):(r.append(this.charAt(t)),t+=1)}return r}},{key:"separate",value:function(e){for(var t=new s,r=0;r<this.value.length;r+=1){var n=this.value.charAt(r);e.isLetter(n)&&(n=this.charAt(r),t.append(n))}return t}},{key:"substr",value:function(e,t){var r=[],n=e+t;n>this.value.length&&(n=this.value.length);for(var a=e;a<n;a+=1)r=r.concat(this.positions[a]);return new c(this.value.substr(e,t),r)}},{key:"toString",value:function(){return this.value}},{key:"translate",value:function(e){for(var t=new s,r=0;r<this.length;r+=1){var n=this.charAt(r);n.setValue(e.translateString(n.getValue())),t.append(n)}return t}}]),s}()},{"./message-chunk":39}],41:[function(e,t,r){t.exports=function(){function s(e){var t,r,n,a,o,i;if(_classCallCheck(this,s),(a=Math.floor(Math.sqrt(e.length)))<1)throw new Error("Unable to make Polybius Square with size less than 1");for(this.size=a,this.indexes={},this.square=[],t=0,o=1;o<=a;o+=1)for(this.square[o]=[],i=1;i<=a;i+=1)for(this.square[o][i]=e.toLetter(t),n=e.toLetters(t),t+=1,r=0;r<n.length;r+=1)this.indexes[n[r]]=[o,i]}return _createClass(s,[{key:"indexOf",value:function(e){return this.indexes[e]}},{key:"charAt",value:function(e,t){return this.square[e][t]}}]),s}()},{}],42:[function(e,t,r){var s=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];t.exports=function e(t){if(void 0===t)return s;if(t<2||t!==~~t)return!1;if(3<t&&0==(1&t))return!1;for(var r=~~Math.sqrt(t);s[s.length-1]<r;){for(var n=s[s.length-1]+2;!e(n);)n+=1;s.push(n)}for(var a=0;a<s.length;a+=1)if(s[a]===t)return!0;if(t<s[s.length]+1)return!1;for(var o=1;s[o]<=r;){var i=t/s[o];if(i==~~i)return!1;o+=1}return!0}},{}],43:[function(e,t,r){window.rumkinCipher=e("@fidian/rumkin-cipher")},{"@fidian/rumkin-cipher":31}]},{},[43]);