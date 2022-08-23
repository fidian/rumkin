"use strict";function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,a=[],o=!0,s=!1;try{for(r=r.call(t);!(o=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);o=!0);}catch(t){s=!0,i=t}finally{try{o||null==r.return||r.return()}finally{if(s)throw i}}return a}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _createForOfIteratorHelper(t,e){var r,n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length)return n&&(t=n),r=0,{s:e=function(){},n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,o=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){o=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(o)throw i}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}!function n(i,a,o){function s(e,t){if(!a[e]){if(!i[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(u)return u(e,!0);throw(t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}r=a[e]={exports:{}},i[e][0].call(r.exports,function(t){return s(i[e][1][t]||t)},r,r.exports,n,i,a,o)}return a[e].exports}for(var u="function"==typeof require&&require,t=0;t<o.length;t++)s(o[t]);return s}({1:[function(t,e,r){e.exports=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"findMaximum",value:function(t,e){var r,n=Number.NEGATIVE_INFINITY,i=_createForOfIteratorHelper(e);try{for(i.s();!(r=i.n()).done;){var a=r.value;a[t]>n&&(n=a[t])}}catch(t){i.e(t)}finally{i.f()}return n}},{key:"findMaximums",value:function(t,e){var r,n=new Map,i=_createForOfIteratorHelper(t);try{for(i.s();!(r=i.n()).done;){var a=r.value;a.barChart&&n.set(a.property,this.findMaximum(a.property,e))}}catch(t){i.e(t)}finally{i.f()}return n}},{key:"view",value:function(t){var e=t.attrs.columns,t=t.attrs.data,r=this.findMaximums(e,t);return m("table",[this.viewHeader(e),this.viewData(e,t,r)])}},{key:"viewHeader",value:function(t){return m("tr",t.map(function(t){return m("th",t.label)}))}},{key:"viewData",value:function(t,e,n){var i=this;return e.map(function(r){return m("tr",t.map(function(t){var e=t.property;if(t.barChart)return m("td",{valign:"center"},i.viewBar(r[e],n.get(e)));t=Object.assign({width:"1%"},t.attrs||{});return m("td",t,i.viewSingleDataPoint(r[e]))}))})}},{key:"viewBar",value:function(t,e){return m("div",{class:"Bgc(blue) H(0.8em)",style:"width: ".concat((100*t/e).toFixed(2),"%")})}},{key:"viewSingleDataPoint",value:function(t){return"number"==typeof t?t.toLocaleString():t}}]),t}()},{}],2:[function(t,e,r){window.Dice=t("./dice"),window.linkDice=t("./link-dice")},{"./dice":3,"./link-dice":5}],3:[function(t,e,r){var n=t("../../js/mithril/bar-chart"),i=new(t("./parser")),a=new(t("./roller"));e.exports=function(){function t(){_classCallCheck(this,t),this.input="",this.isEmpty=!0,this.isWorking=!1,this.isInvalid=!1,this.min=0,this.max=0,this.avg=0,this.stdDev=0,this.result=null,this.calculatingMessage="",window.diceInstance=this}return _createClass(t,[{key:"oninit",value:function(){this.input=m.route.param("dice")||"",this.update()}},{key:"update",value:function(){var e=this,t=(this.input||"").replace(/[^-+0-9dDP,()]/g,"");if(m.route.set("/",{dice:t.trim()}),this.isEmpty=!1,this.isWorking=!1,this.isInvalid=!1,""===t)this.isEmpty=!0;else try{this.calculatingMessage="Initial setup";var r=i.parse(t);this.isWorking=!0,a.calculate(r,function(t){e.isWorking=!1,e.result=t,m.redraw()},function(t){e.calculatingMessage=t,m.redraw()})}catch(t){this.isInvalid=!0,this.invalidMessage=t.toString()}}},{key:"setInput",value:function(t){t!==this.input&&(this.input=t,this.update())}},{key:"view",value:function(){var e=this;return[m("p",["What do you want to roll?",m("br"),m("input",{type:"text",value:this.input,onchange:function(t){e.setInput(t.target.value)},disabled:this.isWorking})]),this.viewResults()]}},{key:"viewResults",value:function(){return this.isInvalid?m("p","Syntax is invalid and needs to be corrected: ".concat(this.invalidMessage)):this.isWorking?m("p","Calculating statistics: ".concat(this.calculatingMessage)):this.isEmpty?[]:[m("p",["Min: ".concat(this.result.minRolls),m("br"),"Max: ".concat(this.result.maxRolls),m("br"),"Average (Mean): ".concat(this.result.avg),m("br"),"Standard Deviation: ".concat(this.result.stdDev)]),m(n,{columns:[{label:"Roll",property:"roll",attrs:{align:"right"}},{label:"Freq",property:"freq",attrs:{align:"right"}},{label:"Prob",property:"probStr",attrs:{align:"right"}},{label:"Bar",property:"prob",barChart:!0}],data:this.reformatRollsAsBarChart()})]}},{key:"reformatRollsAsBarChart",value:function(){var n=this,i=[];return this.result.rolls.forEach(function(t,e){var r=e/n.result.totalRolls;i.push({roll:t[0],freq:e,prob:r,probStr:r.toFixed(5)})}),i}}]),t}()},{"../../js/mithril/bar-chart":1,"./parser":6,"./roller":7}],4:[function(t,e,r){e.exports=function(){function e(t){_classCallCheck(this,e),this.input=t,this.index=0}return _createClass(e,[{key:"next",value:function(){this.index+=1}},{key:"peek",value:function(){return this.input.charAt(this.index)}},{key:"getRemainder",value:function(){return this.input.substr(this.index)}}]),e}()},{}],5:[function(t,e,r){window.addEventListener("load",function(){var e,r=_createForOfIteratorHelper(document.getElementsByClassName("linkDice"));try{for(r.s();!(e=r.n()).done;)!function(){var t=e.value;t.addEventListener("click",function(){window.diceInstance.setInput(t.innerText),m.route.set("/",{dice:t.innerText})})}()}catch(t){r.e(t)}finally{r.f()}})},{}],6:[function(t,e,r){var n=t("./input-tracker");e.exports=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"parse",value:function(t){var t=new n(t),e=this.roll(t);if(""!==t.peek())throw new Error("Extra unparseable information: ".concat(t.getRemainder()));return e}},{key:"digit",value:function(t){for(var e="",r=t.peek();"0"<=r&&r<="9";)e+=r,t.next(),r=t.peek();if(0===e.length)throw new Error("Expecting a digit, found non-digit characters: ".concat(t.getRemainder()));return+e}},{key:"die",value:function(t){var e=this.digit(t);if(e<=0)throw new Error("Only positive numbers allowed for the number of dice");if("d"!==t.peek())throw new Error('Expecting "d", found: '.concat(t.getRemainder()));t.next();t=this.digit(t);if(t<=0)throw new Error("Only positive numbers allowed for the number of sides of dice");return{number:e,sides:t}}},{key:"group",value:function(t){var e={};if("("===t.peek()){if(t.next(),e.roll=this.roll(t),")"!==t.peek())throw new Error('Expecting ")", found: '.concat(t.getRemainder()));t.next()}else e.die=this.die(t);if("D"===t.peek()&&(t.next(),e.drop=this.digit(t),e.drop<=0))throw new Error("Only positive numbers allowed for the number of dice to drop");if("P"===t.peek()&&(t.next(),e.penalty=this.digit(t),e.drop<=0))throw new Error("Only positive numbers allowed for the number of dice to remove as a penalty");var r=t.peek();return"+"===r?(t.next(),e.bonus=this.digit(t)):"-"===r&&(t.next(),e.bonus=-this.digit(t)),e}},{key:"roll",value:function(t){var e=[];for(e.push(this.group(t));","===t.peek();)t.next(),e.push(this.group(t));return e}}]),t}()},{"./input-tracker":4}],7:[function(t,e,r){var s=t("./rolls");e.exports=function(){function t(){_classCallCheck(this,t),this.callback=null,this.statusCallback=null,this.startingStepCount=0,this.currentStepNumber=0,this.steps=[],this.timeout=null,this.results=[]}return _createClass(t,[{key:"status",value:function(t){this.statusCallback(t.message)}},{key:"calculate",value:function(t,e,r){this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.callback=e,this.statusCallback=r,this.steps=[],this.results=this.createSteps(t),this.scheduleNextStep()}},{key:"hasDropsOrPenalties",value:function(t){return t.drop||t.penalty}},{key:"dropPenaltyBonus",value:function(t,e){if(!this.hasDropsOrPenalties)return t.adjustBonus(e.bonus),t;var i=t.fork(),a=(i.adjustBonus(e.bonus+t.getBonus()),e.drop||0),o=e.penalty||0;return t.forEach(function(t,e){for(var r=0;r<a;r+=1)t.shift();for(var n=0;n<o;n+=1)t.pop();i.add(t,e)}),i}},{key:"createSteps",value:function(t){var e,r=[],n=_createForOfIteratorHelper(t);try{for(n.s();!(e=n.n()).done;){var i=e.value;i.roll?this.createStepsSubgroup(r,i):this.createStepsDieRoll(r,i)}}catch(t){n.e(t)}finally{n.f()}return r}},{key:"createStepsSubgroup",value:function(e,r){var n,i=this,t=this.createSteps(r.roll);this.addStep("Merging group",function(){n=i.combineRolls(t)}),this.addStep("Handling drops, penalties, and bonuses",function(){var t=i.dropPenaltyBonus(n,r);e.push(t)})}},{key:"rollDie",value:function(t){for(var e=new s,r=1;r<=t;r+=1)e.add([r],1);return e}},{key:"createStepsDieRoll",value:function(e,r){var n=this,i=[],t=r.die.sides,a=r.die.number;this.addStep("Rolling dice: ".concat(a,"d").concat(t),function(){for(;i.length<a;)i.push(n.rollDie(r.die.sides))});for(var o=1;o<a;o+=1)this.addStep("Merging ".concat(o,"d").concat(t," into ").concat(o+1,"d").concat(t),function(){var t=i.shift(),e=i.shift(),t=t.mergeWith(e);n.hasDropsOrPenalties(r)?i.unshift(t):(e=t.consolidate(),i.unshift(e))});this.addStep("Handling drops, penalties, and bonuses",function(){var t=i[0]||new s,t=n.dropPenaltyBonus(t,r);e.push(t)})}},{key:"combineRolls",value:function(t){for(r=(r=t.shift()).consolidate();t.length;)var e=(e=t.shift()).consolidate(),r=r.mergeWith(e);return r}},{key:"scheduleNextStep",value:function(){var t,e=this;this.steps.length?(t=this.steps.shift(),this.status(t),this.currentStepNumber+=1,this.timeout=setTimeout(function(){e.timeout=null,e.stepResult=t.stepFn(),e.scheduleNextStep()},100)):this.completeResults()}},{key:"completeResults",value:function(){var t=(t=this.combineRolls(this.results)).consolidate(),r=0,n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY,a=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY,s=0,u=(t.forEach(function(t,e){t=t[0];r+=t*e,s+=e,n=Math.min(n,t),i=Math.max(i,t),a=Math.min(a,e),o=Math.max(o,e)}),r/s),l=0;t.forEach(function(t,e){t=t[0];l+=Math.abs(t-u)*e}),this.callback({avg:u,maxCount:o,maxRolls:i,minCount:a,minRolls:n,rolls:t,stdDev:l/s,stdDevTotal:l,sum:r,totalRolls:s})}},{key:"addStep",value:function(t,e){this.steps.push({message:t,stepFn:e})}}]),t}()},{"./rolls":8}],8:[function(t,e,r){e.exports=function(){function e(){_classCallCheck(this,e),this.map=new Map,this.bonus=0}return _createClass(e,[{key:"add",value:function(t,e){t=t.slice(),t.sort(function(t,e){return t-e}).map(function(t){return t.toString()}),t=t.join(",");this.map.set(t,e+(this.map.get(t)||0))}},{key:"count",value:function(){return this.map.size}},{key:"forEach",value:function(t){var e,r=_createForOfIteratorHelper(this.map.entries());try{for(r.s();!(e=r.n()).done;){var n=_slicedToArray(e.value,2),i=n[0],a=n[1];t(i.split(",").map(function(t){return+t}),a)}}catch(t){r.e(t)}finally{r.f()}}},{key:"sums",value:function(){var a=this,o=new e;return this.forEach(function(t,e){var r,n=0,i=_createForOfIteratorHelper(t);try{for(i.s();!(r=i.n()).done;)n+=r.value}catch(t){i.e(t)}finally{i.f()}o.add([n+a.bonus],e)}),o}},{key:"adjustBonus",value:function(t){this.bonus+=+t||0}},{key:"getBonus",value:function(){return this.bonus}},{key:"fork",value:function(){var t=new e;return t.adjustBonus(this.bonus),t}},{key:"mergeWith",value:function(t){var i=this.fork();return this.forEach(function(r,n){t.forEach(function(t,e){i.add([].concat(_toConsumableArray(r),_toConsumableArray(t)),n*e)})}),i}},{key:"consolidate",value:function(){var a=this,o=0<arguments.length&&void 0!==arguments[0]&&arguments[0],s=new e;return this.forEach(function(t,e){var r,n=a.bonus,i=(o&&(n+=a.bonus),_createForOfIteratorHelper(t));try{for(i.s();!(r=i.n()).done;)n+=r.value}catch(t){i.e(t)}finally{i.f()}s.add([n],e)}),s}},{key:"snapshot",value:function(){return{bonus:this.bonus,map:Object.fromEntries(this.map)}}}]),e}()},{}]},{},[2]);