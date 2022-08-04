"use strict";function _classCallCheck(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(s,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(s,t.key,t)}}function _createClass(s,e,r){return e&&_defineProperties(s.prototype,e),r&&_defineProperties(s,r),Object.defineProperty(s,"prototype",{writable:!1}),s}var PasswordStrengthModule=require("tai-password-strength/lib/password-strength");module.exports=function(){function s(){var e=this;_classCallCheck(this,s),this.password="",this.showPassword=!1,this.strengthScore=null,this.commonPasswords=null,this.passwordStrength=new PasswordStrengthModule,this.filesLoading=2,m.request({extract:function(s){return JSON.parse(s.responseText)},url:"common-passwords.json"}).then(function(s){e.passwordStrength.addCommonPasswords(s),--e.filesLoading}),m.request({extract:function(s){return JSON.parse(s.responseText)},url:"trigraphs.json"}).then(function(s){e.passwordStrength.addTrigraphMap(s),--e.filesLoading})}return _createClass(s,[{key:"updatePassword",value:function(s){this.password=s,this.strengthScore=s?this.passwordStrength.check(s):null}},{key:"view",value:function(){var e=this;return this.filesLoading?m("p",{class:"output"},"Loading necessary files."):[m("p",m("label",[m("input",{type:"checkbox",checked:this.showPassword,onclick:function(){e.showPassword=!e.showPassword}})," Show password"]),m("br"),m("input",{type:this.showPassword?"text":"password",placeholder:"Password or passphrase",class:"W(100%)",value:this.password,oninput:function(s){return e.updatePassword(s.target.value)}})),m("div",{class:"output"},this.viewResult())]}},{key:"viewResult",value:function(){if(!this.password)return m("p","Enter a password or passphrase to analyze");var s=[],e=this.strengthScore,r=(e.commonPassword&&s.push(m("p","WARNING: This is a common password!"))," ".concat(Math.floor(e.trigraphEntropyBits)," bits of entropy."));switch(e.strengthCode){case"VERY_STRONG":s.push(m("p",["This password is very strong, with about",r]));break;case"STRONG":s.push(m("p",["You have a strong password, which provides approximately",r]));break;case"REASONABLE":s.push(m("p",["Your password seems to be fairly good, and has",r]));break;case"WEAK":s.push(m("p",["Your password is weak and can be cracked or guessed easily. It provides",r]));break;default:s.push(m("p",[m("span",{class:"Fw(b)"},"VERY WEAK PASSWORD!")," There are only",r]))}return s.push(m("p",["Suggestions for improvement:",m("ul",this.viewSuggestions())])),s}},{key:"viewSuggestions",value:function(){var s=[m("li","Make the passphrase longer.")],e=this.strengthScore.charsets;return e.lower||s.push(m("li","Add lowercase letters.")),e.upper||s.push(m("li","Add uppercase letters.")),e.number||s.push(m("li","Add numbers.")),e.punctuation||s.push(m("li","Add punctuation.")),e.symbol||s.push(m("li","Add symbols, such as ones used for math.")),s}}]),s}();