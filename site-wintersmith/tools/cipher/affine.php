<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Affine Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>The Affine cipher is a monoalphabetic substitution cipher and it can be
the exact same as a standard <a href="caesar.php">Caesarian shift</a> when
"a" is 1.  Mathematically, it is represented as <tt>e(x) = (ax + b) mod
m</tt>.  Decryption is a slightly different formula, <tt>d(x) =
a<sup>-1</sup>(x - b) mod m</tt>.</p>

<p>To encode something, you need to pick the "a" and it must be coprime with
the length of the alphabet.  To make this easier, I have the (+) and (-)
buttons to change the A to the next higher or lower coprime number.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select></p>
<p>a:  <input name="a" type="text" size="3" value="1"> -
<input type="button" name="plus" value="+" onclick="a_plus()">
<input type="button" name="minus" value="-" onclick="a_minus()"></p>
<P>b:  <select name="b">
<?php

for ($i = 0; $i < 26; $i ++) {
	echo "<option value=$i>$i</option>\n";
}

?>
</select>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='affine'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {

	?><script language="JavaScript" src="js/affine.js"></script>
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

   if ((! document.Affine_Loaded) || (! document.Util_Loaded) ||
       (! document.getElementById('affine')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   if (IsUnchanged(document.encoder.a) * IsUnchanged(document.encoder.b) *
       IsUnchanged(document.encoder.encdec) *
       IsUnchanged(document.encoder.text))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   var e = document.getElementById('affine');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else if (! IsCoprime(document.encoder.a.value * 1, 26))
   {
      e.innerHTML = 'The value for "a" is not coprime to 26.  Try another value.';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Affine(document.encoder.encdec.value * 1,
	 document.encoder.text.value,
         document.encoder.a.value * 1, document.encoder.b.value * 1)));
   }

   window.setTimeout('upd()', 100);
}

function a_plus()
{
   var a = document.encoder.a.value;
   if (a < 1)
   {
      a = 1;
   }
   else
   {
      a ++;
      while (! IsCoprime(a, 26))
      {
         a ++;
      }
   }
   document.encoder.a.value = a;
}

function a_minus()
{
   var a = document.encoder.a.value;
   if (a < 2)
   {
      a = 1;
   }
   else
   {
      a --;
      while (! IsCoprime(a, 26))
      {
         a --;
      }
   }
   document.encoder.a.value = a;
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

