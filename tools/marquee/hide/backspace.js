"use strict";module.exports={title:"Backspace",key:"backspace",description:"Letters are removed with the a delay between each character.",variables:[{name:"Delay",description:"How long to wait between animations, in seconds.",isNumeric:!0,default:.1},{name:"Plus Or Minus",description:"The delay can be off by this much to look like a real person is typing.",isNumeric:!0,default:.1}],depends:["random"],method:function(t,e,a,n){var i=Math.max(0,e-a),r=e+a-i;return function e(){return 0===(t=t.substr(0,t.length-1)).length?[t]:[t,1e3*(n(r)+i),e]}()}};