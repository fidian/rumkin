----
title: Gronsfeld
summary: This operates very similar to a Vigenere cipher, but uses numbers instead of a key word.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Gronsfeld Cipher',
		'header' => 'Gronsfeld Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>The Gronsfeld cipher is essentially a <a href="vigenere.php">Vigenere</a>
cipher, but uses numbers instead of letters.  So, a Gronsfield key of 0123
is the same as a Vigenere key of ABCD.  This online version lets you encode
and decode messages with a keyed alphabet as well, to allow for maximum
flexibility.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Alphabet Key:  <input type=text name=key value="" size=30> -
<span id="Keymaker0" target="document.encoder.key.value"></span></p>
<p>Alphabet Used:  <B><tt><span
id='alphabet'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span></tt></b> -
<a id="tableau_link" href="#" onclick="ToggleTableau(); return false">Show
Tableau</a></p>
<div id="tableau" style="display: none"></div>
<p>Cipher Key:  <input type=text name=pass value=""></p>
<p>Vigenere Equivalent:  <span id='vigenere'></span></p>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center') ?>
<p><b><tt><span id='output'></span></tt></b>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {

	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/vigenere.js"></script>
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

   if ((! document.Vigenere_Loaded) || (! document.Util_Loaded) ||
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
   var e, keyunchanged, passunchanged;

   keyunchanged = IsUnchanged(document.encoder.key);
   passunchanged = IsUnchanged(document.encoder.pass);

   if (keyunchanged * passunchanged *
       IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 200);
      return;
   }

   ResizeTextArea(document.encoder.text);

   if (! keyunchanged)
   {
      e = document.getElementById('alphabet');
      e.innerHTML = MakeKeyedAlphabet(document.encoder.key.value);
      e = document.getElementById('tableau');
      e.innerHTML = BuildTableau(document.encoder.key.value, 10);
   }

   if (! passunchanged)
   {
      e = document.getElementById('vigenere');
      e.innerHTML = GronsfeldToVigenere(document.encoder.pass.value);
   }

   e = document.getElementById('output');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Vigenere(document.encoder.encdec.value * 1,
         document.encoder.text.value,
	 GronsfeldToVigenere(document.encoder.pass.value),
	 document.encoder.key.value)));
   }
   window.setTimeout('upd()', 200);
}

toggle = 0;
function ToggleTableau()
{
   var Link, Vis;

   if (toggle == 0)
   {
      toggle = 1;
      Link = "Hide Tableau";
      Vis = "block";
   }
   else
   {
      toggle = 0;
      Link = "Show Tableau";
      Vis = "none";
   }

   e = document.getElementById('tableau_link');
   e.innerHTML = Link;

   e = document.getElementById('tableau');
   e.style.display = Vis;
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

