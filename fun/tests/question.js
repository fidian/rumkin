"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var marked=require("marked");module.exports=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"view",value:function(e){var r=e.attrs.question,e=[m.trust(marked.parse(r.text))];return r.selected?(e.push(m("p",m("em",m.trust(marked.parse(r.selected))))),e.push(m("p",m("strong",m.trust(marked.parse(r.answers[r.selected]))))),e.push(m("p",m("a",{href:"#",onclick:function(){return r.selected=null,!1}},"Reset question?")))):e.push(m("ul",Object.keys(r.answers).map(function(e){return m("li",m("a",{href:"#",onclick:function(){return r.selected=e,!1}},m.trust(marked.parse(e))))}))),e}}]),e}();