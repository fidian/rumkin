"use strict";var requestPromise=null;module.exports={getWordlists:function(){return requestPromise=requestPromise||m.request({url:"../wordlists/wordlists.json"})},getWordlist:function(r){return m.request({extract:function(r){return r.responseText.trim().split(/[\r\n]+/)},url:"../wordlists/".concat(r)})}};