// Columnar Transposition

// Requires util.js

// Code was written by Tyler Akins and is placed in the public domain
// It would be nice if you left this header.  http://rumkin.com


// Perform a Columnar Transposition
// encdec is 1 for encode, -1 for decode
// text is what you want encrypted/decrypted
// key is the columnar key that you wish to use.  It must contain all
//   of the numbers from 1 to N only once in any order you want.  Use
//   MakeColumnKey() to generate it!
function ColTrans(encdec, text, key)
{
   var NumberList = ColTrans_Split(key)

   if (typeof(NumberList) != 'object')
      return NumberList;
   
   if (NumberList.length < 2)
      return text;

   var textenc = Tr(text, "\r\n");
   if (encdec < 0)
   {
      textenc = ColTrans_Decode(textenc, NumberList);
   }
   else
   {
      textenc = ColTrans_Encode(textenc, NumberList);
   }
   
   return InsertCRLF(text, textenc);
}


// Loads the key and makes sure the numbers are good.
function ColTrans_Split(k)
{
   var c, n, numberlist, zero = '0'.charCodeAt(0);
   
   k += ' ';
   numberlist = new Array();
   while (k.length)
   {
      n = 0;
      while (k.charAt(0) >= '0' && k.charAt(0) <= '9')
      {
         n *= 10;
	 n += k.charCodeAt(0) - zero;
	 k = k.slice(1, k.length);
      }
      k = k.slice(1, k.length);
      while ((k.charAt(0) < '0' || k.charAt(0) > '9') && k.length)
      {
         k = k.slice(1, k.length);
      }
      numberlist[numberlist.length] = n;
   }
   
   return numberlist;
}


// Performs the actual transposition.  Notice how simple the code looks.
function ColTrans_Encode(t, NumberList)
{
   var s = new Array(NumberList.length);
   var back = new Array(NumberList.length);
   var out = "", i;
   
   for (i = 0; i < s.length; i ++)
   {
      s[i] = "";
      back[NumberList[i] - 1] = i;
   }
   
   for (i = 0; i < t.length; i ++)
   {
      s[i % NumberList.length] += t.charAt(i);
   }
   
   for (i = 0; i < NumberList.length; i ++)
   {
      out += s[back[i]];
   }
   
   return out;
}


// Undoes the columnar transposition.  A bit more involved because the
// columns can have different lengths, depending on the message length.
function ColTrans_Decode(t, NumberList)
{
   var num = new Array(NumberList.length);
   var back = new Array(NumberList.length);
   var s = new Array(NumberList.length);
   var i, j, out = "", minNum;

   minNum = Math.floor(t.length / NumberList.length);
   
   for (i = 0; i < num.length; i ++)
   {
      num[i] = minNum;
      back[NumberList[i] - 1] = i;
   }
   
   j = minNum * NumberList.length;
   i = 0;
   
   while (j < t.length)
   {
      num[NumberList[i] - 1] ++;
      i ++;
      j ++;
   }
   
   for (i = 0; i < NumberList.length; i++)
   {
      s[back[i]] = t.slice(0, num[i]);
      t = t.slice(num[i], t.length);
   }
   
   for (i = 0; i < minNum + 1; i ++)
   {
      for (j = 0; j < s.length; j ++)
      {
         if (s[j].length > i)
	 {
            out += s[j].charAt(i);
	 }
      }
   }
   
   return out;
}

// Changes a keyword or a string of numbers into a valid key
function MakeColumnKey(meth, text)
{
   var values = new Array();
   
   if (meth == "num")
   {
      // Break on whitespace
      var zero = '0'.charCodeAt(0);
      text = Trim(text) + ' ';
      if (text == ' ')
      {
         return "1";
      }
      while (text.length)
      {
         var n = 0;
	 while (text.charAt(0) >= '0' && text.charAt(0) <= '9')
	 {
	    n *= 10;
	    n += text.charCodeAt(0) - zero;
	    text = text.slice(1, text.length);
	 }
	 text = text.slice(1, text.length);
	 while (text.length && (text.charAt(0) < '0' || text.charAt(0) > '9'))
	 {
	    text = text.slice(1, text.length);
	 }
	 values[values.length] = n;
      }
   }
   else
   {
      // Break on every letter, skip whitespace
      text = Tr(text, " \r\n\t");
      if (text == '')
      {
         values[0] = 1;
         return values;
      }
      while (text.length)
      {
         values[values.length] = text.charCodeAt(0);
	 text = text.slice(1, text.length);
      }
   }
   
   // Values is an array of numbers.  Convert to an array of numbers that
   // start from 1 and progress up without duplicates.
   var values2 = new Array(values.length);
   
   for (var i = 0; i < values2.length; i ++)
   {
      values2[i] = 0;
   }
   
   for (var loop = 0; loop < values2.length; loop ++)
   {
      var lowestIdx = -1;
      for (var i = 0; i < values2.length; i ++)
      {
         if (values2[i] == 0)
	 {
	    if (lowestIdx == -1)
	    {
	       lowestIdx = i;
	    }
	    else
	    {
	       var a = values[lowestIdx];
	       var b = values[i];
	       if (a > b || (a == b && meth == 'ahpla'))
	       {
	          lowestIdx = i;
	       }
	    }
	 }
      }
      values2[lowestIdx] = loop + 1;
   }
   
   var out = '';
   for (var i = 0; i < values2.length; i ++)
   {
      out += ' ' + values2[i];
   }
   
   return out.slice(1, out.length);
}

document.ColTrans_Loaded = 1;
