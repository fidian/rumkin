"use strict";function urlencode(n){return encodeURI(n)}function htmlencode(n){var e=document.createElement("pre");return e.innerText=n,e.innerHTML}function shuffleAndUnique(n){var c="",t=!1;return n.split("").forEach(function(n){var e;-1===c.indexOf(n)&&("<"===n?t=!0:(e=Math.floor(Math.random()*c.length),c=c.slice(0,e)+n+c.slice(e,c.length)))}),t&&(c+="<"),c}function shuffledObfuscate(n){var e=shuffleAndUnique(n),c="";return n.split("").forEach(function(n){c+=String.fromCharCode(48+e.indexOf(n))}),"<script>ML=".concat(JSON.stringify(e),";\nMI=").concat(JSON.stringify(c),';\nOT="";for(j=0;j<MI.length;j++){\nOT+=ML.charAt(MI.charCodeAt(j)-48);\n}document.write(OT);<\/script>')}function breakObfuscate(n){for(var e,c=[];n.length;)e=Math.floor(6*Math.random())+1,c.push(n.slice(0,e)),n=n.slice(e,n.length);return"<script>document.write(".concat(JSON.stringify(c),".join())<\/script>")}function makeLink(n){var e;if("none"===n.encoding)return n.to;e=urlencode(n.to),c=[],n.subject&&c.push("subject=".concat(urlencode(n.subject))),n.cc&&c.push("cc=".concat(urlencode(n.cc))),n.bcc&&c.push("bcc=".concat(urlencode(n.bcc))),n.body&&c.push("body=".concat(urlencode(n.body))),c.length&&(e+="?".concat(c.join("&")));var c=n.linkExtra?"".concat(n.linkExtra," "):"";return"<a ".concat(c,'href="mailto:').concat(e,'">').concat(htmlencode(n.linkText||""),"</a>")}function obfuscate(n,e){switch(e.obfuscation){case"break":return breakObfuscate(n);case"shuffled":return shuffledObfuscate(n);default:return n}}module.exports=function(n){return obfuscate(makeLink(n),n)};