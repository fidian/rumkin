"use strict";var getRandomValues=require("polyfill-crypto.getrandomvalues"),crypto=window.crypto||window.msCrypto,maxSafeInteger=(crypto&&crypto.getRandomValues&&Uint32Array&&(getRandomValues=function(r){return crypto.getRandomValues(r)}),Number.MAX_SAFE_INTEGER);function number(){var r=maxSafeInteger;try{for(;r===maxSafeInteger;){var e=new Uint32Array(2);getRandomValues(e),r=2097151&e[0],r=(r*=4294967296)+e[1]}return r/maxSafeInteger}catch(r){return Math.random()}}function index(e){try{if(maxSafeInteger<e)throw new Error;for(var r=1,a=1;r<e;)r=2*r+1,a+=1;if(a<=32){for(var t=e;e<=t;){var n=new Uint32Array(1);getRandomValues(n),t=n[0]&r}return t}for(var o=0;o<32;o+=1)--r,r/=2,--a;for(var u=e;e<=u;){var m=new Uint32Array(2);getRandomValues(m),u=m[0]&r,u=(u*=4294967296)+m[1]}return u}catch(r){return Math.floor(Math.random()*e)}}module.exports={number:number,index:index,maxSafeInteger:maxSafeInteger};