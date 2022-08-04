"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}var emailEncoder=require("./email-encoder"),TextInput=require("../../js/mithril/text-input"),Dropdown=require("../../js/mithril/dropdown");module.exports=function(){function e(){_classCallCheck(this,e),this.to={label:"To",class:"W(100%)",value:""},this.cc={label:"Cc",class:"W(100%)",value:""},this.bcc={label:"Bcc",class:"W(100%)",value:""},this.subject={label:"Subject",class:"W(100%)",value:""},this.body={label:"Body",class:"W(100%)",value:""},this.linkText={label:"HTML label (only works when creating an HTML link)",class:"W(100%)",value:""},this.encoding={label:"Method of encoding",options:{none:"Skip encoding the link",html:"Create a normal HTML link"},value:"html"},this.obfuscation={label:"Method of obfuscation",options:{none:"Skip JavaScript-based obfuscation",break:"Break up strings",shuffled:"Shuffled encoding"},value:"shuffled"}}return _createClass(e,[{key:"view",value:function(){return[m("p",m(TextInput,this.to)),m("p",m(TextInput,this.cc)),m("p",m(TextInput,this.bcc)),m("p",m(TextInput,this.subject)),m("p",m(TextInput,this.body)),m("p",m(Dropdown,this.encoding)),m("p",m(TextInput,this.linkText)),m("p",m(Dropdown,this.obfuscation)),this.viewResult()]}},{key:"viewResult",value:function(){if(!this.to.value)return"Enter a valid email address above and see the generated code here.";var e=emailEncoder({to:this.to.value,cc:this.cc.value,bcc:this.bcc.value,subject:this.subject.value,body:this.body.value,encoding:this.encoding.value,linkText:this.linkText.value,obfuscation:this.obfuscation.value});return[m("p","Result:"),m("pre",e),m("p","To use this, copy and paste the above into your HTML web page. When viewed in a browser, it will show a link to send you an email.")]}}]),e}();