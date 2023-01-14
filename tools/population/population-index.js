"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,_toPropertyKey(r.key),r)}}function _createClass(t,e,o){return e&&_defineProperties(t.prototype,e),o&&_defineProperties(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t}function _toPropertyKey(t){t=_toPrimitive(t,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(t,e){if("object"!==_typeof(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0===o)return("string"===e?String:Number)(t);o=o.call(t,e||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}var dataLoader=require("./data-loader");module.exports=function(){function t(){var e=this;_classCallCheck(this,t),this.loaded=!1,dataLoader.load().then(function(t){e.loaded=t})}return _createClass(t,[{key:"view",value:function(){return this.loaded?[m("p","Select a country or region in order to see details on its estimated population."),m("h2","Regions"),m("ul",{class:"Colm(2) Colm(1)--s"},this.regionList(this.loaded.regions)),m("h2","Countries"),m("ul",{class:"Colm(2) Colm(1)--s"},this.regionList(this.loaded.countries))]:m("p",{class:"output"},"Loading the population statistics.")}},{key:"regionList",value:function(t){return t.map(function(t){return m("li",[m(m.route.Link,{href:"/".concat(t.I)},t.L),m("br"),m("span",{class:"Pstart(2em)"},t.population.toLocaleString())])})}}]),t}();