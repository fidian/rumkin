// Bifid Cipher

// This code was written by Tyler Akins and is placed in the public domain.
// It would be nice if this header remained intact.  http://rumkin.com

// Requires util.js


// Performs a Bifid cipher on the passed-in text
// encdec = -1 for decode, 1 for encode
// text = the text to encode/decode
// skip = the letter omitted from the 5x5 grid
// skipto = what the "skip" letter should be translated to before encoding
// key = the word or phrase used to generate letter placement in the 5x5 grid
function Bifid(encdec, text, skip, skipto, key)
{
   var enc, out, bet, otemp, c;
   
   if (typeof(skip) != 'string' || skip.length != 1 || 
       skip.toUpperCase() < 'A' || skip.toUpperCase() > 'Z')
      skip = "J";
   skip = skip.toUpperCase();
   
   if (typeof(skipto) != 'string' || skipto.length != 1 || 
       skipto.toUpperCase() < 'A' || skipto.toUpperCase() > 'Z')
      skipto = "I";
   skipto = skipto.toUpperCase();

   if (skip == skipto)
   {
      skipto = String.fromCharCode(skip.charCodeAt(0) + 1);
      if (skipto > 'Z')
         skipto = 'A';
   }
   
   if (typeof(key) != 'string')
      key = "";
   
   key = MakeKeyedAlphabet(skip + key);
   key = key.slice(1, key.length);
   
   enc = '';
   out = '';
   bet = '';
   for (var i = 0; i < text.length; i ++)
   {
      c = text.charAt(i).toUpperCase();
      if (c == skip)
         c = skipto;
	 
      if (key.indexOf(c) >= 0)
      {
         enc += c;
      }
   }
   enc = Bifid_Mangle(encdec, enc, key)
   
   for (var i = 0, j = 0; i < text.length; i ++)
   {
      c = text.charAt(i).toUpperCase();
      if (c == skip)
         c = skipto;
      
      if (key.indexOf(c) >= 0)
      {
         if (text.charAt(i) != text.charAt(i).toUpperCase())
	 {
            out += enc.charAt(j).toLowerCase();
	 }
	 else
	 {
	    out += enc.charAt(j);
	 }
	 j ++;
      }
      else
      {
         out += text.charAt(i);
      }
   }
   
   return out;
}


// Performs the actual encoding/decoding of the text
// Chars must only contain characters in 'key', case sensitive
// Key must be the letters from a 5x5 grid.
function Bifid_Mangle(encdec, chars, key)
{
   var pos, line1, line2;
   
   line1 = '';
   line2 = '';
   
   for (var i = 0; i < chars.length; i ++)
   {
      var row, col;
      
      pos = key.indexOf(chars.charAt(i));
      row = Math.floor(pos / 5);
      col = pos % 5;
      
      line1 += row;
      if (encdec > 0)
      {
	 line2 += col;
      }
      else
      {
         line1 += col;
      }
   }
   
   line1 += line2;
   
   if (encdec < 0)
   {
      line2 = '';
      for (var i = 0; i < line1.length / 2; i ++)
      {
         line2 += line1.charAt(i);
	 line2 += line1.charAt(line1.length / 2 + i);
      }
      window.status = line1 + " " + line2;
      line1 = line2;
   }
   
   chars = '';
   
   for (var i = 0; i < line1.length; i += 2)
   {
      chars += key.charAt(line1.charAt(i) * 5 + line1.charAt(i + 1) * 1);
   }
   
   return chars;
}

document.Bifid_Loaded = 1;
