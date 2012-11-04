// Railfence encoding

// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


// Railfence
// encdec = -1 for decode, 1 for encode
// text = the text to encode/decode
// rails = The number of rails in the fence ( >= 1 and <= text.length )
// offset = Starting position (from 0 to rails * 2 - 2)
function Railfence(encdec, text, rails, offset)
{
   rails = rails * 1;
   
   if (rails < 2)
      return "You must have at least 2 rails.  I suggest 3 or more.";
   if (rails >= text.length)
      return "You need less rails or more text.";
      
   offset = offset * 1;
   while (offset < 0)
   {
      offset += rails * 2 - 2;
   }
   offset = offset % (rails * 2 - 2);
   
   if (encdec * 1 < 0)
   {
      return rail_decode(text, rails, offset * 1);
   }
   return rail_encode(text, rails, offset * 1);
}


function rail_encode(t, r, o)
{
   var o_idx = new Array(r * 2 - 2);
   var out_a = new Array(r);
   var i, j;
   
   for (i = 0; i < r; i ++)
   {
      o_idx[i] = i;
      out_a[i] = ""
   }
   for (j = 0; j < r - 2; j ++)
   {
      o_idx[i + j] = i - (j + 2);
   }
   
   for (i = 0; i < t.length; i ++)
   {
      out_a[o_idx[o]] += t.charAt(i);
      o = (o + 1) % o_idx.length
   }
   
   j = "";
   for (i = 0; i < r; i ++)
   {
      j += out_a[i];
   }
   
   return j;
}


function rail_decode(t, r, o)
{
   var o_idx = new Array((r - 1) * 2);
   var out_a = new Array(r);
   var i, j, k;

   for (i = 0; i < o_idx.length; i ++)
   {
      j = (o + i) % o_idx.length;
      if (j < r)
      {
         o_idx[i] = j;
      }
      else
      {
         o_idx[i] = (2 * (r - 1)) - j;
      }
   }
   
   for (i = 0; i < out_a.length; i ++)
   {
      out_a[i] = 0;
   }
   
   for (i = 0; i < t.length; i ++)
   {
      out_a[o_idx[i % o_idx.length]] ++;
   }
   
   j = 0;
   for (i = 0; i < out_a.length; i ++)
   {
      out_a[i] = t.slice(j, j + out_a[i]);
      j += out_a[i].length;
   }
   
   j = "";
   for (i = 0; i < t.length; i ++)
   {
      k = o_idx[i % o_idx.length];
      j += out_a[k].charAt(0);
      out_a[k] = out_a[k].slice(1, out_a[k].length);
   }
   
   return j;
}

document.Railfence_Loaded = 1;
