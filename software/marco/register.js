"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}module.exports=function(){function e(){_classCallCheck(this,e),this.code=""}return _createClass(e,[{key:"updateMessage",value:function(){var e=this.recalc();if(e.unlockCode)this.message="Your unlock code is ".concat(e.unlockCode);else switch(e.errorCode){case"EMPTY":this.message="You need to enter a registration code to see the unlock code here.";break;case"SHORT":this.message="Enter more characters.";break;case"LONG":this.message="The code is too long. Something is wrong.";break;default:this.message="The code has a problem. Double check all of the letters and numbers."}}},{key:"recalc",value:function(){var e=this.code.trim().toLowerCase().replace(/o/g,"0").replace(/[il]/g,"1").replace(/[^a-f0-9]/g,"");if(0===e.length)return{errorCode:"EMPTY"};if(e.length<20)return{errorCode:"SHORT"};if(22<e.length)return{errorCode:"LONG"};for(var r=[],t="0123456789abcdef",o=0;o<10;o+=1)r[o]=16*t.indexOf(e.charAt(2*o))+t.indexOf(e.charAt(2*o+1));for(var a=0,n=0;n<9;n+=1)a=(a+r[n])%256;if(a!==r[9])return{errorCode:"CHECKSUM"};for(var s=0,c=0;c<9;c+=1)s=(s^24506+(21031*r[c]&65535)&65535)+(27795^40782*c&65535)&65535;for(s=s.toString();s.length<5;)s="0".concat(s);return{unlockCode:s}}},{key:"view",value:function(){var r=this;return["Enter your registration code here:",m("input",{type:"text",style:"width: 100%",oninput:function(e){r.code=e.target.value,r.updateMessage()}},this.code),this.message]}}]),e}();