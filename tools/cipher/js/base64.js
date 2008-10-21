// Utility functions

// Code was written by Tyler Akins and is placed in the public domain
// It would be nice if you left this header.  http://rumkin.com


// Base64 key string
var base64_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// Wrapper for standard interface
function Base64(encdec, textstr) {
   if (encdec > 0) {
      return base64_encode(textstr);
   }
   return base64_decode(textstr);
}

function base64_encode(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + base64_keyStr.charAt(enc1) + base64_keyStr.charAt(enc2) + 
         base64_keyStr.charAt(enc3) + base64_keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function base64_decode(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   while (i < input.length) {
      enc1 = base64_keyStr.indexOf(input.charAt(i++));
      enc2 = base64_keyStr.indexOf(input.charAt(i++));
      enc3 = base64_keyStr.indexOf(input.charAt(i++));
      enc4 = base64_keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   }

   return output;
}


document.Base64_Loaded = 1;