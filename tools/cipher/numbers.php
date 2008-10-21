<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Letter Numbers',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));

?>

<p>One of the first ciphers that kids learn is this "letter number" cipher.
You replace letters with a number: A=1, B=2, C=3, etc.</p>

<p>When encrypting, only letters will be encoded.  Non-letters will be
treated like spaces.  When decrypting, numbers will be changed back to
letters, hyphens will be removed, and the rest fill act like spaces.</p>
	
<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Method:  "ABC XYZ" becomes <select name="method">
   <option value="p0h1">1-2-3 24-25-26
   <option value="p1h1">01-02-03 24-25-26
   <option value="p1h0">010203 242526
</select>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?PHP MakeBoxTop('center'); ?>
<span id=output></span>
<?PHP

MakeBoxBottom();

StandardFooter();



function insert_js()
{
?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com


function encode(str, meth)
{
   var lett = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
   var out = "";
   var addHyphen = 0;
   
   var pad = meth.charAt(1) * 1;
   var hyph = meth.charAt(3) * 1;
   
   for (var i = 0; i < str.length; i ++)
   {
      c = str.charAt(i);
      j = lett.indexOf(c.toUpperCase()) + 1;
      if (j < 10 && pad)
      {
         j = "0" + j;
      }
      if (j * 1 > 0)
      {
         if (addHyphen && hyph)
	 {
	    out = out + '-';
	 }
         out = out + j;
	 addHyphen = 1;
      }
      else
      {
         if (addHyphen)
	 {
	    if (c.charCodeAt(0) == 10 || c.charCodeAt(0) == 13)
	    {
	       out += c;
	    }
	    else
	    {
	       out += ' ';
	    }
	 }
	 addHyphen = 0;
      }
   }

   return out;
}


function decode(str, meth)
{
   var lett = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
   var num = '0123456789';
   var out = "";
   var was_letter = 0;
   
   var pad = meth.charAt(1) * 1;
   var hyph = meth.charAt(3) * 1;
   
   for (var i = 0; i < str.length; i ++)
   {
      c = str.charAt(i);
      j = num.indexOf(c);
      if (j < 0)
      {
         if (! was_letter || ! hyph || c != "-")
	 {
	    out += c;
	 }
	 was_letter = 0;
      }
      else
      {
         // Do a number lookahead
	 was_letter = j;
	 if (str.length > i + 1)
	 {
	    j = num.indexOf(str.charAt(i + 1));
	    if (j >= 0)
	    {
	       i ++;
	       was_letter = (was_letter * 10) + j;
	    }
	 }
	 if (was_letter >= 1 && was_letter <= 26)
	 {
	    out += lett.charAt(was_letter - 1);
	 }
	 else
	 {
	    out += was_letter;
	    was_letter = 0;
	 }
      }
   }
   
   return out;
}


function upd()
{
   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       IsUnchanged(document.encoder.method))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);

   var e = document.getElementById('output');
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message to see the results!';
   }
   else if (document.encoder.encdec.value * 1 == 1)
   {
      e.innerHTML = HTMLEscape(encode(document.encoder.text.value, 
         document.encoder.method.value));
   }
   else
   {
      e.innerHTML = HTMLEscape(decode(document.encoder.text.value, 
         document.encoder.method.value));
   }
   
   window.setTimeout('upd()', 100);
}


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


window.setTimeout('start_update()', 100);

// --></script>
<?PHP
}
