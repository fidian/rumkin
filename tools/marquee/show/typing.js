"use strict";module.exports={title:"Typing",key:"typing",description:"Letters are typed with a delay between each character.",variables:[{name:"Delay",description:"How long to wait between animations, in seconds.",isNumeric:!0,default:.3},{name:"Plus Or Minus",description:"The delay can be off by this much to look like a real person is typing.",isNumeric:!0,default:.35}],depends:["random"],method:function(t,e,n,i){var a="",r=Math.max(0,e-n),o=e+n-r;return function e(){return(a+=t.charAt(a.length)).length<=t.length?[a,1e3*(i(o)+r),e]:[t]}()}};