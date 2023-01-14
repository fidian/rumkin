"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}module.exports=function(){function e(){_classCallCheck(this,e),this.code=""}return _createClass(e,[{key:"updateMessage",value:function(){var e=this.recalc();if(e.unlockCode)this.message="Your unlock code is ".concat(e.unlockCode);else switch(e.errorCode){case"EMPTY":this.message="You need to enter a registration code to see the unlock code here.";break;case"SHORT":this.message="Enter more characters.";break;case"LONG":this.message="The code is too long. Something is wrong.";break;default:this.message="The code has a problem. Double check all of the letters and numbers."}}},{key:"recalc",value:function(){var e=this.code.trim().toLowerCase().replace(/o/g,"0").replace(/[il]/g,"1").replace(/[^a-f0-9]/g,"");if(0===e.length)return{errorCode:"EMPTY"};if(e.length<20)return{errorCode:"SHORT"};if(22<e.length)return{errorCode:"LONG"};for(var t=[],r="0123456789abcdef",o=0;o<10;o+=1)t[o]=16*r.indexOf(e.charAt(2*o))+r.indexOf(e.charAt(2*o+1));for(var n=0,i=0;i<9;i+=1)n=(n+t[i])%256;if(n!==t[9])return{errorCode:"CHECKSUM"};for(var a=0,c=0;c<9;c+=1)a=(a^24506+(21031*t[c]&65535)&65535)+(27795^40782*c&65535)&65535;for(a=a.toString();a.length<5;)a="0".concat(a);return{unlockCode:a}}},{key:"view",value:function(){var t=this;return["Enter your registration code here:",m("input",{type:"text",style:"width: 100%",oninput:function(e){t.code=e.target.value,t.updateMessage()}},this.code),this.message]}}]),e}();