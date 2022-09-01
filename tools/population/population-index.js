"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}var dataLoader=require("./data-loader");module.exports=function(){function e(){var t=this;_classCallCheck(this,e),this.loaded=!1,dataLoader.load().then(function(e){t.loaded=e})}return _createClass(e,[{key:"view",value:function(){return this.loaded?[m("p","Select a country or region in order to see details on its estimated population."),m("h2","Regions"),m("ul",{class:"Colm(2) Colm(1)--s"},this.regionList(this.loaded.regions)),m("h2","Countries"),m("ul",{class:"Colm(2) Colm(1)--s"},this.regionList(this.loaded.countries))]:m("p",{class:"output"},"Loading the population statistics.")}},{key:"regionList",value:function(e){return e.map(function(e){return m("li",[m(m.route.Link,{href:"/".concat(e.I)},e.L),m("br"),m("span",{class:"Pstart(2em)"},e.population.toLocaleString())])})}}]),e}();