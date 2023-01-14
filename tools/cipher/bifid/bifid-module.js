"use strict";function _typeof(u){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(u){return typeof u}:function(u){return u&&"function"==typeof Symbol&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u})(u)}function _createForOfIteratorHelper(u,D){var e,t="undefined"!=typeof Symbol&&u[Symbol.iterator]||u["@@iterator"];if(!t){if(Array.isArray(u)||(t=_unsupportedIterableToArray(u))||D&&u&&"number"==typeof u.length)return t&&(u=t),e=0,{s:D=function(){},n:function(){return e>=u.length?{done:!0}:{done:!1,value:u[e++]}},e:function(u){throw u},f:D};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a=!0,F=!1;return{s:function(){t=t.call(u)},n:function(){var u=t.next();return a=u.done,u},e:function(u){F=!0,n=u},f:function(){try{a||null==t.return||t.return()}finally{if(F)throw n}}}}function _slicedToArray(u,D){return _arrayWithHoles(u)||_iterableToArrayLimit(u,D)||_unsupportedIterableToArray(u,D)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(u,D){if(u){if("string"==typeof u)return _arrayLikeToArray(u,D);var e=Object.prototype.toString.call(u).slice(8,-1);return"Map"===(e="Object"===e&&u.constructor?u.constructor.name:e)||"Set"===e?Array.from(u):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(u,D):void 0}}function _arrayLikeToArray(u,D){(null==D||D>u.length)&&(D=u.length);for(var e=0,t=new Array(D);e<D;e++)t[e]=u[e];return t}function _iterableToArrayLimit(u,D){var e=null==u?null:"undefined"!=typeof Symbol&&u[Symbol.iterator]||u["@@iterator"];if(null!=e){var t,n,a=[],F=!0,r=!1;try{for(e=e.call(u);!(F=(t=e.next()).done)&&(a.push(t.value),!D||a.length!==D);F=!0);}catch(u){r=!0,n=u}finally{try{F||null==e.return||e.return()}finally{if(r)throw n}}return a}}function _arrayWithHoles(u){if(Array.isArray(u))return u}function _classCallCheck(u,D){if(!(u instanceof D))throw new TypeError("Cannot call a class as a function")}function _defineProperties(u,D){for(var e=0;e<D.length;e++){var t=D[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(u,t.key,t)}}function _createClass(u,D,e){return D&&_defineProperties(u.prototype,D),e&&_defineProperties(u,e),Object.defineProperty(u,"prototype",{writable:!1}),u}!function t(n,a,F){function r(D,u){if(!a[D]){if(!n[D]){var e="function"==typeof require&&require;if(!u&&e)return e(D,!0);if(A)return A(D,!0);throw(u=new Error("Cannot find module '"+D+"'")).code="MODULE_NOT_FOUND",u}e=a[D]={exports:{}},n[D][0].call(e.exports,function(u){return r(n[D][1][u]||u)},e,e.exports,t,n,a,F)}return a[D].exports}for(var A="function"==typeof require&&require,u=0;u<F.length;u++)r(F[u]);return r}({1:[function(u,D,e){D.exports=function(){function u(){_classCallCheck(this,u)}return _createClass(u,[{key:"view",value:function(u){var D=u.attrs;return m("label",[m("input",Object.assign({},D,{type:"checkbox",checked:!!D.value,onchange:function(u){return D.value=!D.value,!D.onchange||D.onchange(u)}})),this.viewLabel(D)])}},{key:"viewLabel",value:function(u){return u.label?[" ",u.label]:null}}]),u}()},{}],2:[function(u,D,e){var t=u("../module/conduit-events");D.exports=function(){function a(u){_classCallCheck(this,a);u=u.attrs;if(this.label=u["data-label"],this.topic=u["data-topic"],u["data-payload"])this.payload=u["data-payload"];else{this.payload={};for(var D=0,e=Object.entries(u);D<e.length;D++){var t=_slicedToArray(e[D],2),n=t[0],t=t[1],n=n.match(/^data-payload-(.*)/);n&&(n=n[1].replace(/-./g,function(u){return u.toUpperCase()}),this.payload[n]=t)}}}return _createClass(a,[{key:"view",value:function(){var u=this;return m("button",{onclick:function(){t.emit(u.topic,u.payload)}},this.label)}}]),a}()},{"../module/conduit-events":7}],3:[function(u,D,e){D.exports=function(){function D(u){_classCallCheck(this,D);u=u.attrs;void 0===u.value&&(u.value=Object.keys(u.options)[0])}return _createClass(D,[{key:"view",value:function(u){var D=u.attrs;return[this.viewLabel(D),m("select",Object.assign({},D,{onchange:function(u){return D.value=u.target.value,!D.onchange||D.onchange(u)},options:void 0}),Object.entries(D.options).map(function(u){return m("option",{value:u[0],selected:"".concat(u[0])==="".concat(D.value)},u[1])}))]}},{key:"viewLabel",value:function(u){return u.label?[u.label,": "]:null}}]),D}()},{}],4:[function(u,D,e){D.exports=function(){function u(){_classCallCheck(this,u)}return _createClass(u,[{key:"viewLabel",value:function(u){return u?[u,":",m("br")]:null}},{key:"view",value:function(u){var D=this,e=u.attrs;return[this.viewLabel(e.label),m("textarea",Object.assign({placeholder:"Enter text here"},e,{class:"W(100%) H(8em) Mah(75vh) ".concat(e.class),oninput:function(u){return D.value=e.value=u.target.value,!!e.oninput&&e.oninput(u)}}))]}}]),u}()},{}],5:[function(u,D,e){D.exports=function(){function D(u){_classCallCheck(this,D),this.value=u.attrs.value||""}return _createClass(D,[{key:"viewLabel",value:function(u){return u?[u,": "]:null}},{key:"view",value:function(u){var e=this,t=u.attrs;return t.value!==+this.value&&(this.value="".concat(t.value)),[this.viewLabel(t.label),m("input",Object.assign({},t,{value:this.value,type:"number",placeholder:"0",oninput:function(u){var D=u.target.value;return e.value=D,t.value=+D,!t.oninput||t.oninput(u)}}))]}}]),D}()},{}],6:[function(u,D,e){D.exports=function(){function u(){_classCallCheck(this,u)}return _createClass(u,[{key:"viewLabel",value:function(u){return u?[u,": "]:null}},{key:"view",value:function(u){var D=u.attrs;return[this.viewLabel(D.label),m("input",Object.assign({},D,{type:"text",oninput:function(u){return D.value=u.target.value,!D.oninput||D.oninput(u)}}))]}}]),u}()},{}],7:[function(u,D,e){u=new(u("./event-emitter"));D.exports=u},{"./event-emitter":8}],8:[function(u,D,e){D.exports=function(){function u(){_classCallCheck(this,u),this.listeners=new Map}return _createClass(u,[{key:"emit",value:function(u){for(var D=arguments.length,e=new Array(1<D?D-1:0),t=1;t<D;t++)e[t-1]=arguments[t];var n,a=_createForOfIteratorHelper(this.listeners.get(u)||[]);try{for(a.s();!(n=a.n()).done;){var F=n.value;try{F.apply(void 0,e)}catch(u){}}}catch(u){a.e(u)}finally{a.f()}}},{key:"off",value:function(u,D){var e=this.listeners.get(u);if(e)for(var t=e.length-1;0<=t;--t)e[t]===D&&e.splice(t,1)}},{key:"on",value:function(u,D){var e=this,t=this.listeners.get(u);return t||this.listeners.set(u,t=[]),t.push(D),function(){return e.off(u,D)}}}]),u}()},{}],9:[function(u,D,e){var n=u("../../js/mithril/input-area"),t=u("../../js/mithril/numeric-input");D.exports=function(){function u(){_classCallCheck(this,u),this.group={class:"W(3em)",value:5},this.split={class:"W(3em)",value:10}}return _createClass(u,[{key:"applyGroups",value:function(u){var D=Math.floor(this.group.value),e=Math.floor(this.split.value),t=u.value.replace(/[\s]/g,"");if(D<1)this.updateValue(u,t);else{for(var n=[];t.length;)n.push(t.substr(0,this.group.value)),t=t.substr(this.group.value);if(e<0)this.updateValue(u,n.join(" "));else{for(;n.length;){t.length&&(t+="\n");for(var a=0;a<this.split.value;a+=1)a&&(t+=" "),t+=n.shift()||""}this.updateValue(u,t)}}}},{key:"updateValue",value:function(u,D){u.value!==D&&(u.value=D,u.oninput&&u.oninput(null),u.onchange&&u.onchange(null))}},{key:"view",value:function(u){var e=this,D=u.attrs,u=[{label:"letters",callback:function(){e.updateValue(D,D.value.replace(/(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/g,""))}},{label:"numbers",callback:function(){e.updateValue(D,D.value.replace(/[0-9]/g,""))}},{label:"whitespace",callback:function(){e.updateValue(D,D.value.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/g,""))}},{label:"other things",callback:function(){e.updateValue(D,D.value.replace(/(?:(?![\t-\r 0-9A-Za-z\xA0\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2000-\u200A\u2028\u2029\u202F\u205F\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3000\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])[\s\S])/g,""))}}],t=[{label:"lowercase",callback:function(){e.updateValue(D,e.lowercase(D.value))}},{label:"Natural case",callback:function(){e.updateValue(D,e.lowercase(D.value).replace(/(^|\n|[.?!])\s*\S/g,function(u){return e.uppercase(u)}))}},{label:"Title Case",callback:function(){e.updateValue(D,e.lowercase(D.value).replace(/(^|\n|\s)\s*\S/g,function(u){return e.uppercase(u)}))}},{label:"UPPERCASE",callback:function(){e.updateValue(D,e.uppercase(D.value))}},{label:"swap case",callback:function(){e.updateValue(D,D.value.split("").map(function(u){var D=e.uppercase(u);return u===D?e.lowercase(u):D}).join(""))}},{label:"reverse",callback:function(){e.updateValue(D,D.value.split("").reverse().join(""))}}];return[m(n,D),m("br"),this.viewActions("Remove",u),this.viewActions("Change",t),this.viewGrouping(D)]}},{key:"lowercase",value:function(u){return u.toLowerCase().replace(/ẞ/g,"ß")}},{key:"uppercase",value:function(u){return u.toUpperCase().replace(/ß/g,"ẞ")}},{key:"viewActions",value:function(u,D){var e,t=[],n=_createForOfIteratorHelper(D);try{for(n.s();!(e=n.n()).done;)!function(){var u=e.value;t.length&&t.push(", "),u.remove||t.push(m("a",{href:"#",onclick:function(){return u.callback(),!0}},u.label))}()}catch(u){n.e(u)}finally{n.f()}return t.length?[m("br"),"".concat(u,": "),t]:null}},{key:"viewGrouping",value:function(u){var D=this;return[m("br"),m("a",{href:"#",onclick:function(){return D.applyGroups(u),!0}},"Make groups")," of ",m(t,this.group)," and next line after ",m(t,this.split)," groups"]}}]),u}()},{"../../js/mithril/input-area":4,"../../js/mithril/numeric-input":5}],10:[function(u,D,e){for(var n=u("../../js/mithril/dropdown"),a={},t=0,F=Object.keys(rumkinCipher.alphabet);t<F.length;t++){var r=F[t];a[r]=r}D.exports=function(){function t(u){_classCallCheck(this,t);var D=u.attrs,e={options:a,label:"Alphabet",value:D.value.name,onchange:function(u){return D.value=new rumkinCipher.alphabet[e.value],!D.onchange||D.onchange(u)}};this.d=e}return _createClass(t,[{key:"view",value:function(u){return this.d.value=u.attrs.value.name,m(n,this.d)}}]),t}()},{"../../js/mithril/dropdown":3}],11:[function(u,D,e){window.Bifid=u("./bifid"),window.Conduit=u("../../../js/mithril/conduit")},{"../../../js/mithril/conduit":2,"./bifid":12}],12:[function(u,D,e){var t=u("../advanced-input-area"),n=u("../cipher-conduit-setup"),a=u("../cipher-result"),F=u("../direction-selector"),r=u("../../../js/mithril/dropdown"),A=u("../key-alphabet"),C=u("../keyed-alphabet"),i=u("../result");D.exports=function(){function u(){var F=this;_classCallCheck(this,u),this.direction={},this.alphabet={value:new rumkinCipher.alphabet.English,onchange:function(){return F.resetTranslations()}},this.input={label:"The message to encipher or decipher",value:""},this.resetTranslations(),n(this,"bifid",function(u){F.resetTranslations();var D,e=0,t=_createForOfIteratorHelper((u.translations||"").split(" "));try{for(t.s();!(D=t.n()).done;){var n=D.value,a=F.translations[e];a&&(a.from=n[0],a.to=n[1]),e+=1}}catch(u){t.e(u)}finally{t.f()}})}return _createClass(u,[{key:"resetTranslations",value:function(){var u=A(this.alphabet),D=Math.floor(Math.sqrt(u.length)),e=u.length-D*D;for(this.translations=[];this.translations.length<e;){var t=u.toLetter(0),n=u.toLetter(1),a=u.toIndex("I"),F=u.toIndex("J");-1!==a&&-1!==F&&(t="J",n="I"),this.translations.push({from:t,to:n,sourceAlphabet:u}),u=u.collapse(t,n)}this.alphabetInstance=u}},{key:"updateAlphabet",value:function(){var u,D=A(this.alphabet),e=_createForOfIteratorHelper(this.translations);try{for(e.s();!(u=e.n()).done;){var t=u.value,n=D.toIndex(t.from),a=D.toIndex(t.to);-1===n&&(t.from=D.toLetter(0)),-1===a&&(t.to=D.toLetter(0)),t.from===t.to&&(t.to=D.toLetter(0),t.from===t.to&&(t.to=D.toLetter(1))),D=(t.sourceAlphabet=D).collapse(t.from,t.to)}}catch(u){e.e(u)}finally{e.f()}this.alphabetInstance=D}},{key:"view",value:function(){return[m("p",m(F,this.direction)),m("p",m(C,this.alphabet)),this.viewTranslations(),this.viewTableau(),m("p",m(t,this.input)),m("p",this.viewResult())]}},{key:"viewResult",value:function(){return this.input.value?m(a,{name:"bifid",direction:this.direction.value,message:this.input.value,alphabet:this.alphabetInstance}):m(i,"Enter text to see it encoded here")}},{key:"viewTableau",value:function(){for(var u=this.alphabetInstance,D=Math.sqrt(u.length),e="",t=0;t<D;t+=1){for(var n=0;n<D;n+=1)e+=u.toLetter(t*D+n)+" ";e=e.trim()+"\n"}return m("p",["Your tableau: ",m("span",{class:"D(if) Jc(c)"},m("pre",{class:"Mt(0)"},e))])}},{key:"viewTranslations",value:function(){var a=this;return 0===this.translations.length?null:this.translations.map(function(D){for(var u={options:{},value:D.from,onchange:function(u){D.from=u.target.value,a.updateAlphabet()}},e={options:{},value:D.to,onchange:function(u){D.to=u.target.value,a.updateAlphabet()}},t=0;t<D.sourceAlphabet.length;t+=1){var n=D.sourceAlphabet.toLetter(t);(u.options[n]=n)!==u.value&&(e.options[n]=n)}return m("p",["Translate ",m(r,u)," into ",m(r,e)])})}}]),u}()},{"../../../js/mithril/dropdown":3,"../advanced-input-area":9,"../cipher-conduit-setup":13,"../cipher-result":14,"../direction-selector":15,"../key-alphabet":16,"../keyed-alphabet":17,"../result":18}],13:[function(u,D,e){var A=rumkinCipher.util.Alphabet,t=u("../../js/module/conduit-events");function n(t,u,n){var a=t[u];t[u]=function(){for(var u=arguments.length,D=new Array(u),e=0;e<u;e++)D[e]=arguments[e];a&&a.apply(t,D),n(D)}}function C(u,D,e){u=u[D];if(u&&"object"===_typeof(u)&&void 0!==u.value){D=u.value;if("number"==typeof D)u.value=+e;else if("string"==typeof D)u.value=e;else if("boolean"==typeof D)u.value="true"===e;else if(D instanceof A){var t,n=u,a=_createForOfIteratorHelper(e.split(" "));try{for(a.s();!(t=a.n()).done;){var F=t.value.split(":"),r=void 0;switch(F[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":n[F[0]]="true"===F[1];break;case"alphabetKey":n.alphabetKey=F[1];break;default:(r=rumkinCipher.alphabet[F[0]])&&(n.value=new r)}}}catch(u){a.e(u)}finally{a.f()}}}}D.exports=function(F,u,r){var D=null;n(F,"oninit",function(){D=t.on(u,function(u){for(var D=F,e=0,t=Object.entries(u);e<t.length;e++){var n=_slicedToArray(t[e],2),a=n[0],n=n[1];C(D,a.replace(/-(.)/g,function(u){return u[1].toUpperCase()}),n)}r&&r()})}),n(F,"onbeforeresume",function(){D&&D()})}},{"../../js/module/conduit-events":7}],14:[function(u,D,e){var a=u("./result");D.exports=function(){function u(){_classCallCheck(this,u)}return _createClass(u,[{key:"view",value:function(u){u=u.attrs;return rumkinCipher.cipher[u.name]?this.viewCipher(u,rumkinCipher.cipher[u.name]):this.viewCode(u,rumkinCipher.code[u.name])}},{key:"viewCipher",value:function(u,D){return this.viewOutput(D,"ENCRYPT"===u.direction?"encipher":"decipher",u)}},{key:"viewCode",value:function(u,D){return this.viewOutput(D,"ENCRYPT"===u.direction?"encode":"decode",u)}},{key:"viewOutput",value:function(u,D,e){var t=new rumkinCipher.util.Message(e.message),n=e.alphabet,e=e.options||void 0,u=u[D](t,n,e).toString(),D=String.fromCharCode(160),t=u.replace(/ {2}/g," ".concat(D)).replace(/^ | $/gm,D);return[this.viewWarnings(u),m(a,t)]}},{key:"viewWarnings",value:function(u){var D=[];return u.match(/^ /m)&&D.push("Found a leading space in output"),u.match(/ $/m)&&D.push("Found a trailing space in output"),u.match(/ {2,}/)&&D.push("Two or more consecutive spaces in output"),0===D.length?[]:m("div",{class:"Bdw(1px) Bgc(#faa) P(0.5em) Whs(pl) My(0.5em)"},[1<D.length?"The following problems have been detected.":"The following problem has been detected.",m("ul",D.map(function(u){return m("li",u)}))])}}]),u}()},{"./result":18}],15:[function(u,D,e){var n=u("../../js/mithril/dropdown");D.exports=function(){function t(u){var D=this,e=(_classCallCheck(this,t),u.attrs);e.value||(e.value="ENCRYPT"),this.d={options:{ENCRYPT:e.code?"Encode":"Encrypt",DECRYPT:e.code?"Decode":"Decrypt"},label:"Operating mode",value:"ENCRYPT",onchange:function(u){return e.value=D.d.value,!e.onchange||e.onchange(u)}}}return _createClass(t,[{key:"view",value:function(u){return this.d.value!==u.attrs.value&&(this.d.value=u.attrs.value),m(n,this.d)}}]),t}()},{"../../js/mithril/dropdown":3}],16:[function(u,D,e){D.exports=function(u){return u.value.keyWord(u.alphabetKey||"",{useLastInstance:u.useLastInstance,reverseKey:u.reverseKey,reverseAlphabet:u.reverseAlphabet,keyAtEnd:u.keyAtEnd})}},{}],17:[function(u,D,e){var t=u("./alphabet-selector"),a=u("../../js/mithril/checkbox"),F=u("./key-alphabet"),r=u("../../js/mithril/text-input");D.exports=function(){function n(u){function D(u){return t.keyed=F(t),!t.onchange||t.onchange(u)}var e=this,t=(_classCallCheck(this,n),u.attrs);this.initialize(t),this.alphabet={onchange:function(u){return t.value=e.alphabet.value,D(u)}},this.alphabetKey={label:"Alphabet key",oninput:function(u){return t.alphabetKey=u.target.value,D(u)}},this.useLastInstance={label:"Use the last occurrence of a letter instead of the first",onchange:function(u){return t.useLastInstance=!t.useLastInstance,D(u)}},this.reverseKey={label:"Reverse the key before keying",onchange:function(u){return t.reverseKey=!t.reverseKey,D(u)}},this.reverseAlphabet={label:"Reverse the alphabet before keying",onchange:function(u){return t.reverseAlphabet=!t.reverseAlphabet,D(u)}},this.keyAtEnd={label:"Put the key at the end instead of the beginning",onchange:function(u){return t.keyAtEnd=!t.keyAtEnd,D(u)}},this.checkValues(t)}return _createClass(n,[{key:"initialize",value:function(u){u.value||(u.value=new rumkinCipher.alphabet.English),u.alphabetKey||(u.alphabetKey="");for(var D=0,e=["useLastInstance","reverseKey","reverseAlphabet","keyAtEnd"];D<e.length;D++){var t=e[D];u[t]=!!u[t]}}},{key:"checkValues",value:function(u){for(var D=!1,e=0,t=[["value","alphabet"],["alphabetKey","alphabetKey"],["useLastInstance","useLastInstance"],["reverseKey","reverseKey"],["reverseAlphabet","reverseAlphabet"],["keyAtEnd","keyAtEnd"]];e<t.length;e++){var n=_slicedToArray(t[e],2),a=n[0],n=n[1];this[n].value!==u[a]&&(this[n].value=u[a],D=!0)}D&&(u.keyed=F(u))}},{key:"view",value:function(u){u=u.attrs;return this.checkValues(u),[m(t,this.alphabet),m("br"),m(r,this.alphabetKey),m("br"),m("label",[m(a,this.useLastInstance)]),m("br"),m("label",[m(a,this.reverseKey)]),m("br"),m("label",[m(a,this.reverseAlphabet)]),m("br"),m("label",[m(a,this.keyAtEnd)]),m("br"),"Resulting alphabet: ",this.viewAlphabet(u)]}},{key:"viewAlphabet",value:function(u){return u.keyed.letterOrder.upper}}]),n}()},{"../../js/mithril/checkbox":1,"../../js/mithril/text-input":6,"./alphabet-selector":10,"./key-alphabet":16}],18:[function(u,D,e){D.exports=function(){function u(){_classCallCheck(this,u)}return _createClass(u,[{key:"view",value:function(u){return m("div",{class:"Bdw(1px) Bgc(#ddd) P(0.5em) Whs(pl) My(0.5em) Ovw(an)"},[m("tt",u.children)])}}]),u}()},{}]},{},[11]);