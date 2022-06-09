----
title: Playfair
summary: This cipher uses pairs of letters and a 5x5 grid to encode a message.  It is fairly strong for a pencil and paper style code.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Playfair Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>The Playfair cipher is a digraph substitution cipher.  It employs a table
where one letter of the alphabet is omitted, and the letters are arranged in
a 5x5 grid.  Typically, the J is removed from the alphabet and an I takes
its place in the text that is to be encoded.  Below is an unkeyed grid.</p>

<?php MakeBoxTop('left'); ?>
<tt>A B C D E<br>
F G H I K<br>
L M N O P<br>
Q R S T U<br>
V W X Y Z</tt>
<?php MakeBoxBottom(); ?>

<p>To encode a message, one breaks it into two-letter chunks.  Repeated
letters in the same chunk are usually separated by an X.  The message,
"HELLO ONE AND ALL" would become "HE LX LO ON EA ND AL LX".  Since there was
not an even number of letters in the message, it was padded with a spare X.
Next, you take your letter pairs and look at their positions in the grid.</p>

<p>"HE" forms two corners of a rectangle.  The other letters in the
rectangle are C and K.  You start with the H and slide over to underneath
the E and write down K.  Similarly, you take the E and slide over to the H
column to get C.  So, the first two letters are "KC".  "LX" becomes "NV" in
the same way.</p>

<p>"LO" are in the same row.  In this instance, you just slide the
characters one position to the right, resulting in "MP".  The same happens
for "ON", resulting in "PO".  "EA" becomes "AB" in the same way, but the E
is at the far edge.  By shifting one position right, we scroll around back
to the left side and get A.</p>

<p>"ND" are in a rectangle form and beomes "OC".  "AL" are both in the same
column, so we just move down one spot.  "AL" is changed into "FQ".
"LX" is another rectangle and is encoded as "NV".</p>

<p>The resulting message is now "KC NV MP PO AB OC FQ NV" or
"KCNVMPPOABOCFQNV" if you remove the spaces.</p>

<p>This encoder will do all of the lookups for you, but you still need to do
a few things yourself.</p>

<ol>
<li>Manually break apart double letters with X (or any other) characters.
Some people break apart all doubles, others break all doubles that happen in
the same two-letter chunk.  This encoder requires neither in order to be
more flexible.
<li>Manually make the message length even by adding an X or whatever
letter you want.  If you don't, the encoder will automatically add an X for
you.
</ol>

<p>All non-letters are ignored and not encoded.  The one letter that you select
to share a square in the cipher is translated.  Numbers, spaces, and
punctuation are also skipped.  If you
leave two letters together in a two-letter chunk, they will be encoded by
moving down and right one square ("LL" becomes "RR") where as traditional
Playfair ciphers will automatically insert an X for you.</p>

<p>This particular cipher was used by the future U.S. President, John F.
Kennedy, Sr.  He sent a <a href="#" onclick="kennedy(); return false">message</a> about a boat going down.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Translate the letter <select name="skip">
<?php

$lett = array(
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
);

foreach ($lett as $L) {
	echo '   <option value="' . $L . '"';

	if ($L == 'J')echo ' selected';
	echo ">$L\n";
}

?>
</select> into <select name="skipto"></p>
<?php

foreach ($lett as $L) {
	echo '   <option value="' . $L . '"';

	if ($L == 'I')echo ' selected';
	echo ">$L\n";
}

?></select></p>
<p><input type=checkbox name="doubleencode" CHECKED> Encode double letters
(down and right one spot)</p>
<p>Alphabet Key:  <input type=text name=key value="" size=30> -
<span id="Keymaker0" target="document.encoder.key.value"></span></p>
<table border=0 cellspacing=0 cellpadding=0>
<tr><td valign=top>Tableau Used:</td><td>&nbsp;&nbsp;&nbsp;</td>
<td><b><span id=alphabet><tt>A B C D E<br>
F G H I K<br>
L M N O P<br>
Q R S T U<br>
V W X Y Z
</tt></span></b></td></tr>
</table>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea><br>
<a href="#" onclick="insert_spaces(); return false;">Add Spaces</a> - Adds a
space after every other letter (only A-Z count) so you can see the letter
pairs.<br>
<a href="#" onclick="only_letters(); return false;">Only Letters</a> - Removes
all non-letters from the text.</p>
<p>This is your encoded or decoded text:</p>
</form>
<?php MakeBoxTop('center'); ?>
<p><b><tt><span id='output'></span></tt></b></p>
<?php MakeBoxBottom();
StandardFooter();


function insert_js() {

	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/playfair.js"></script>
<script language="JavaScript" src="js/keymaker.js"></script>
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

   if ((! document.Playfair_Loaded) || (! document.Util_Loaded) ||
       (! document.Keymaker_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }

   Keymaker_Start();
   upd();
}


function upd()
{
   var keyunchanged = IsUnchanged(document.encoder.skip) *
	   IsUnchanged(document.encoder.key);

   if (keyunchanged == 0)
   {
      // Update the rectangle
      var k, elem;

      k = MakeKeyedAlphabet(document.encoder.skip.value +
         document.encoder.key.value);
      k = k.slice(1, k.length);
      elem = document.getElementById('alphabet');
      elem.innerHTML = HTMLTableau(k);
   }

   if (keyunchanged *
       IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       IsUnchanged(document.encoder.skipto) *
       IsUnchanged(document.encoder.doubleencode))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);

   var elem = document.getElementById('output');

   if (document.encoder.text.value != "")
   {
	   var flags = 1;

	   if (document.encoder.doubleencode.checked) {
		   flags -= 1;
		}
      elem.innerHTML = SwapSpaces(HTMLEscape(Playfair(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.skip.value,
         document.encoder.skipto.value, document.encoder.key.value, flags)));
   }
   else
   {
      elem.innerHTML = "Type in your message and see the results here!";
   }

   window.setTimeout('upd()', 100);
}


function insert_spaces()
{
   var c = '', n = 0, cc, i;

   for (i = 0; i < document.encoder.text.value.length; i ++)
   {
      cc = document.encoder.text.value.charAt(i);
      c += cc;
      cc = cc.toUpperCase();
      if (cc >= 'A' && cc <= 'Z')
      {
         n ++;
	 if (n == 2)
	 {
	    c += ' ';
	    n = 0;
	 }
      }
   }

   document.encoder.text.value = c;
}


function only_letters()
{
   document.encoder.text.value = OnlyAlpha(document.encoder.text.value);
}


function kennedy()
{
   document.encoder.encdec.value = -1;
   document.encoder.skip.value = "J";
   document.encoder.skipto.value = "I";
   document.encoder.key.value = "ROYAL NEW ZEALAND NAVY";
   document.encoder.text.value = "KX JEYU REB EZW EHEW RYTU HE YFSKRE " +
      "HE GOYFIWTT TUOLKS YCA JPOBO TE IZONTX BYBW T GONE YC UZWRGD S " +
      "ONSXBOU YWR HEBAAHYUSED Q"
   document.encoder.doubleencode.checked = 0;
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

