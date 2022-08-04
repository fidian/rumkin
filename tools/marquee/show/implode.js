"use strict";module.exports={title:"Implode",key:"implode",description:"Inserts many spaces between each letter of your message.  Reduces the number of spaces with every iteration.  Makes the message appear to implode.",variables:[{name:"Delay",description:"How long to wait between animation frames, in seconds.",isNumeric:!0,default:.01},{name:"Max Spaces",description:"How many spaces between letters at the beginning",isNumeric:!0,default:100}],depends:["repeat"],method:function(e,s,t,n){var a=e.split(""),i=(a.unshift(""),n(" ",t+1));return function e(){i=i.substr(1);var t=a.join(i);return i.length?[t,1e3*s,e]:[t]}()}};