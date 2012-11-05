<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Bifid Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>The Bifid cipher is considered a more secure cipher because it breaks the
message apart into two separate streams and then recombines them.  This
spreads the information out to multiple letters, increasing security.  It
uses a table with one letter of the alphabet omitted.  Often the J is
removed and people just use an I instead.  Below is an unkeyed grid.</p>

<?php MakeBoxTop('left'); ?>
<tt>A B C D E<br>
F G H I K<br>
L M N O P<br>
Q R S T U<br>
V W X Y Z</tt>
<?php MakeBoxBottom(); ?>

<p>To encode a message, you would write your message, "ABCD", then you would
figure out the row and column for each letter and write them below the
letters, like the example shows.  Then you read the numbers off; all of the
rows first and then all of the columns.  Using this string of numbers, you
then look up the letters on the table again and get the encoded message.</p>

<?php MakeBoxTop('center'); ?>
<tt>letter: A B C D<Br>
&nbsp;&nbsp;&nbsp;row: 1 1 1 1<br>
column: 1 2 3 4<br>
<br>
The numbers: 1 1 1 1 1 2 3 4<br>
&nbsp;&nbsp;&nbsp;&nbsp;Encoded: &nbsp;A&nbsp; &nbsp;A&nbsp; &nbsp;B&nbsp;
&nbsp;O<br>
<?php MakeBoxBottom(); ?>

<p>All non-letters are ignored and not encoded.  The one skipped letter will
be automatically translated if you type it in the box.  Numbers, spaces, and
punctuation will remain in place and will not be encoded.</p>

<p>You can see the <a href="#" onclick="example_enc(); return false">example</a>
message, or the example from <a href="#" 
onclick="wikipedia_enc(); return false">Wikipedia</a>.</p>

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
<script language="JavaScript" src="js/keymaker.js"></script>
<script language="JavaScript" src="js/bifid.js"></script>
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
   
   if ((! document.Bifid_Loaded) || (! document.Util_Loaded) ||
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
       IsUnchanged(document.encoder.skipto))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);
      
   var elem = document.getElementById('output');
   
   if (document.encoder.text.value != "")
   {
      elem.innerHTML = SwapSpaces(HTMLEscape(Bifid(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.skip.value,
         document.encoder.skipto.value, document.encoder.key.value)));
   }
   else
   {
      elem.innerHTML = "Type in your message and see the results here!";
   }
      
   window.setTimeout('upd()', 100);
}


function only_letters()
{
   document.encoder.text.value = OnlyAlpha(document.encoder.text.value);
}


function example_enc()
{
   document.encoder.encdec.value = 1;
   document.encoder.skip.value = "J";
   document.encoder.skipto.value = "I";
   document.encoder.key.value = "";
   document.encoder.text.value = "ABCD";
}


function wikipedia_enc()
{
   document.encoder.encdec.value = 1;
   document.encoder.skip.value = "J";
   document.encoder.skipto.value = "I";
   document.encoder.key.value = "BGWKZQPNDSIOAXEFCLUMTHYVR";
   document.encoder.text.value = "F L E E A T O N C E";
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

