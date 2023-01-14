"use strict";function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a,l,i=[],u=!0,y=!1;try{if(a=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;u=!1}else for(;!(u=(n=a.call(t)).done)&&(i.push(n.value),i.length!==r);u=!0);}catch(e){y=!0,o=e}finally{try{if(!u&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(y)throw o}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,r){var t,n,o,a,l="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(l)return n=!(t=!0),{s:function(){l=l.call(e)},n:function(){var e=l.next();return t=e.done,e},e:function(e){n=!0,o=e},f:function(){try{t||null==l.return||l.return()}finally{if(n)throw o}}};if(Array.isArray(e)||(l=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length)return l&&(e=l),a=0,{s:r=function(){},n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,r){var t;if(e)return"string"==typeof e?_arrayLikeToArray(e,r):"Map"===(t="Object"===(t=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:t)||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var Alphabet=rumkinCipher.util.Alphabet,conduitEvents=require("../../js/module/conduit-events");function overload(n,e,o){var a=n[e];n[e]=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];a&&a.apply(n,r),o(r)}}function setAlphabet(e,r){var t,n=_createForOfIteratorHelper(r.split(" "));try{for(n.s();!(t=n.n()).done;){var o=t.value.split(":"),a=void 0;switch(o[0]){case"useLastInstance":case"reverseKey":case"reverseAlphabet":case"keyAtEnd":e[o[0]]="true"===o[1];break;case"alphabetKey":e.alphabetKey=o[1];break;default:(a=rumkinCipher.alphabet[o[0]])&&(e.value=new a)}}}catch(e){n.e(e)}finally{n.f()}}function applyPayloadProperty(e,r,t){e=e[r];e&&"object"===_typeof(e)&&void 0!==e.value&&("number"==typeof(r=e.value)?e.value=+t:"string"==typeof r?e.value=t:"boolean"==typeof r?e.value="true"===t:r instanceof Alphabet&&setAlphabet(e,t))}function applyPayload(e,r){for(var t=0,n=Object.entries(r);t<n.length;t++){var o=_slicedToArray(n[t],2),a=o[0],o=o[1];applyPayloadProperty(e,a.replace(/-(.)/g,function(e){return e[1].toUpperCase()}),o)}}module.exports=function(r,e,t){var n=null;overload(r,"oninit",function(){n=conduitEvents.on(e,function(e){applyPayload(r,e),t&&t()})}),overload(r,"onbeforeresume",function(){n&&n()})};