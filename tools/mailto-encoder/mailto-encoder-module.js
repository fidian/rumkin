"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function i(o,a,r){function l(t,e){if(!a[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}n=a[t]={exports:{}},o[t][0].call(n.exports,function(e){return l(o[t][1][e]||e)},n,n.exports,i,o,a,r)}return a[t].exports}for(var c="function"==typeof require&&require,e=0;e<r.length;e++)l(r[e]);return l}({1:[function(e,t,n){t.exports=function(){function t(e){_classCallCheck(this,t);e=e.attrs;void 0===e.value&&(e.value=Object.keys(e.options)[0])}return _createClass(t,[{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t),m("select",Object.assign({},t,{onchange:function(e){return t.value=e.target.value,!t.onchange||t.onchange(e)},options:void 0}),Object.entries(t.options).map(function(e){return m("option",{value:e[0],selected:"".concat(e[0])==="".concat(t.value)},e[1])}))]}},{key:"viewLabel",value:function(e){return e.label?[e.label,": "]:null}}]),t}()},{}],2:[function(e,t,n){t.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"viewLabel",value:function(e){return e?[e,": "]:null}},{key:"view",value:function(e){var t=e.attrs;return[this.viewLabel(t.label),m("input",Object.assign({},t,{type:"text",oninput:function(e){return t.value=e.target.value,!t.oninput||t.oninput(e)}}))]}}]),e}()},{}],3:[function(e,t,n){function i(e){return encodeURI(e)}function a(e){var t,n,i,o;return i="",o=!1,e.split("").forEach(function(e){var t;-1===i.indexOf(e)&&("<"===e?o=!0:(t=Math.floor(Math.random()*i.length),i=i.slice(0,t)+e+i.slice(t,i.length)))}),o&&(i+="<"),n=i,t="",e.split("").forEach(function(e){t+=String.fromCharCode(48+n.indexOf(e))}),"<script>ML=".concat(JSON.stringify(n),";\nMI=").concat(JSON.stringify(t),';\nOT="";for(j=0;j<MI.length;j++){\nOT+=ML.charAt(MI.charCodeAt(j)-48);\n}document.write(OT);<\/script>')}function o(e){var t,n;return"none"===e.encoding?e.to:(n=i(e.to),t=[],e.subject&&t.push("subject=".concat(i(e.subject))),e.cc&&t.push("cc=".concat(i(e.cc))),e.bcc&&t.push("bcc=".concat(i(e.bcc))),e.body&&t.push("body=".concat(i(e.body))),t.length&&(n+="?".concat(t.join("&"))),'<a href="mailto:'.concat(n,'">').concat((t=e.linkText||"",(n=document.createElement("pre")).innerText=t,n.innerHTML),"</a>"))}function r(e,t){switch(t.obfuscation){case"break":for(var n,i=e,o=[];i.length;)n=Math.floor(6*Math.random())+1,o.push(i.slice(0,n)),i=i.slice(n,i.length);return"<script>document.write(".concat(JSON.stringify(o),".join())<\/script>");case"shuffled":return a(e);default:return e}}t.exports=function(e){return r(o(e),e)}},{}],4:[function(e,t,n){var i=e("./email-encoder"),o=e("../../js/mithril/text-input"),a=e("../../js/mithril/dropdown");t.exports=function(){function e(){_classCallCheck(this,e),this.to={label:"To",class:"W(100%)",value:""},this.cc={label:"Cc",class:"W(100%)",value:""},this.bcc={label:"Bcc",class:"W(100%)",value:""},this.subject={label:"Subject",class:"W(100%)",value:""},this.body={label:"Body",class:"W(100%)",value:""},this.linkText={label:"HTML label (only works when creating an HTML link)",class:"W(100%)",value:""},this.encoding={label:"Method of encoding",options:{none:"Skip encoding the link",html:"Create a normal HTML link"},value:"html"},this.obfuscation={label:"Method of obfuscation",options:{none:"Skip JavaScript-based obfuscation",break:"Break up strings",shuffled:"Shuffled encoding"},value:"shuffled"}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(o,this.to)),m("p",m(o,this.cc)),m("p",m(o,this.bcc)),m("p",m(o,this.subject)),m("p",m(o,this.body)),m("p",m(a,this.encoding)),m("p",m(o,this.linkText)),m("p",m(a,this.obfuscation)),this.viewResult()]}},{key:"viewResult",value:function(){if(!this.to.value)return"Enter a valid email address above and see the generated code here.";var e=i({to:this.to.value,cc:this.cc.value,bcc:this.bcc.value,subject:this.subject.value,body:this.body.value,encoding:this.encoding.value,linkText:this.linkText.value,obfuscation:this.obfuscation.value});return[m("p","Result:"),m("pre",e),m("p","To use this, copy and paste the above into your HTML web page. When viewed in a browser, it will show a link to send you an email.")]}}]),e}()},{"../../js/mithril/dropdown":1,"../../js/mithril/text-input":2,"./email-encoder":3}],5:[function(e,t,n){window.MailtoEncoderCustom=e("./mailto-encoder-custom"),window.MailtoEncoderSimple=e("./mailto-encoder-simple")},{"./mailto-encoder-custom":4,"./mailto-encoder-simple":6}],6:[function(e,t,n){var i=e("./email-encoder"),o=e("../../js/mithril/text-input");t.exports=function(){function e(){_classCallCheck(this,e),this.email={label:"Email address",placeholder:"user@example.com",class:"W(100%)",value:""},this.linkText={label:"Link text",class:"W(100%)",placeholder:"Defaults to email address",value:""}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(o,this.email)),m("p","Do not worry. I do not harvest email addresses from here."),m("p",m(o,this.linkText)),this.viewResult()]}},{key:"viewResult",value:function(){if(!this.email.value)return"Enter a valid email address above and see the generated code here.";var e=i({to:this.email,encoding:"html",linkText:this.linkText.value||this.email.value,obfuscation:"shuffled"});return[m("p","Result:"),m("pre",e),m("p","To use this, copy and paste the above into your HTML web page. When viewed in a browser, it will show a link to send you an email.")]}}]),e}()},{"../../js/mithril/text-input":2,"./email-encoder":3}]},{},[5]);