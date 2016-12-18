<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Keyed Caesar',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>One variation to the standard <a href="caesar.php">Caesar</a> cipher is
when the alphabet is "keyed" by using a word.  In the traditional variety,
one could write the alphabet on two strips and just match up the strips
after sliding the bottom strip to the left or right.  To encode, you would
find a letter in the top row and substitute it for the letter in the bottom
row.  For a keyed version, one would not use a standard alphabet, but would
first write a word (omitting duplicated letters) and then write the
remaining letters of the alphabet.  For the example below, I used a key of
"rumkin.com" and you will see that the period is removed because it is not
a letter.  You will also notice the second "m" is not included 
because there was an m already and you can't have duplicates.</p>

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><th colspan=2>Example Alphabets, No Shift</th></td>
<tr><th>Standard</th><td><tt>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
ABCDEFGHIJKLMNOPQRSTUVWXYZ</tt></td></tr>
<tr><th>Keyed</th><td><tt>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
<b>rumkinco</b>ABDEFGHJLPQSTVWXYZ</tt></td></tr>
</table>

<p>This encoder will let you specify the key word that is used at the
beginning of the alphabet and will also let you shift the keyed alphabet
around, just like a normal Caesar cipher.  This is similar to the <a
href="rot13.php">rot13</a> cipher, and can also be performed with the <a
href="cryptogram.php">cryptogram solver</a>.  A simple test to see how this
works would be to <a href="#" onclick="insert_alphabet(); return false">insert
the alphabet</a> into the encoder and then change "Shift" and modify
the key.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<P>Shift:  <select name=N>
<?php

for ($i = 0; $i < 26; $i ++) {
	echo "<option value=$i>$i</option>\n";
}

?>
</select>
<p>The key:  <input type=text name=key size=40 value=""> - 
<span id="Keymaker0" target="document.encoder.key.value"></span></p>
<p>Alphabet Used:  <tt><b><span id='alphabet'></span></b></tt></p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='caesar'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/caesar.js"></script>
<script language="JavaScript" src="js/keymaker.js"></script>
<script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Caesar_Loaded) || (! document.Util_Loaded) ||
       (! document.Keymaker_Loaded) ||
       (! document.getElementById('caesar')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   Keymaker_Start();
   upd();
}


function upd()
{
   var e, keyunchanged = 1, textunchanged = 1;

   if (! IsUnchanged(document.encoder.key))
   {
      keyunchanged = 0;
      e = document.getElementById('alphabet');
      e.innerHTML = HTMLEscape(MakeKeyedAlphabet(document.encoder.key.value));
   }
	
   if (! IsUnchanged(document.encoder.text))
   {
      textunchanged = 0;
      ResizeTextArea(document.encoder.text);
   }
   
   if (keyunchanged *
       textunchanged *
       IsUnchanged(document.encoder.N) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }
       
   e = document.getElementById('caesar');
   
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Caesar(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.N.value * 1,
	 document.encoder.key.value)));
   }

   window.setTimeout('upd()', 100);
}

function insert_alphabet()
{
   document.encoder.text.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   upd();
}
	
function ZapSpaces()
{
   var i, s = "", t;
   
   t = document.encoder.text.value;
   for (i = 0; i < t.length; i ++)
   {
      if (t.charAt(i) != ' ')
      {
         s += t.charAt(i);
      }
   }
   document.encoder.text.value = s;
   upd();
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

