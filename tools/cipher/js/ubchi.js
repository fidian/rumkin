// Ubchi (the U is umlauted)
// German double columnar transposition cipher

// Requires coltrans.js

// Code was written by Tyler Akins and is placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


// Perform a Ubchi encode/decode
function Ubchi(EncDec, text, keywords, meth)
{
   var columns = MakeColumnKey(meth, keywords);
   var words = Tr(keywords, " ");
   var o;
   
   words = keywords.length - words.length + 1;
   
   if (EncDec > 0)
   {
      // Encode
      o = ColTrans(EncDec, text, columns);
      while (words --)
      {
         o += 'Z';
      }
      o = ColTrans(EncDec, o, columns);
   }
   else
   {
      // Decode
      o = ColTrans(EncDec, text, columns)
      o = o.slice(0, o.length - words);
      o = ColTrans(EncDec, o, columns);
   }
   
   return o;
}

document.Ubchi_Loaded = 1;