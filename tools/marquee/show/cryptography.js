"use strict";module.exports={title:"Cryptography",key:"cryptography",description:'The message is replaced with random letters.  They continue to change until they are the right letter for that position or until the maximum number of loops occur.  Always shows the right message at the end.  Similar to some "hacking" seen in movies.',variables:[{name:"Delay",description:"How long to wait between animations, in seconds.",isNumeric:!0,default:.01},{name:"Time Limit",description:"Maximum amount of seconds to cycle.",isNumeric:!0,default:3}],depends:["range","randomInt"],method:function(o,r,i,e,a){var s="",c="",h=(e(32,128,function(e){s+=String.fromCharCode(e)}),Date.now());return function e(){if(Date.now()-h>=1e3*i)return[o];for(var t="",n=0;n<o.length;n+=1)o.charAt(n)===c.charAt(n)?t+=o.charAt(n):t+=s.charAt(a(s.length));return c=t,Date.now()-h>=1e3*i||c===o?[o]:[c,1e3*r,e]}()}};