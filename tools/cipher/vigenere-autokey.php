<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Vigenere Autokey',
		'header' => 'Vigen&eacute;re Autokey',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>This is an extension to the <a href="vigenere.php">Vigenere</a>
cipher that makes it much harder to
break.  Instead of repeating the passphrase over and over in order to
encrypt the text, the passphrase is used once and the cleartext is used to
decrypt or encrypt the text.</p>
	
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
<p>Passphrase:  <input type=text name=pass value=""></p>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
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
   upd();
}


function upd()
{
   var e, keyunchaned;

   keyunchanged = IsUnchanged(document.encoder.key);

   if (keyunchanged * IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.pass) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }
	
   ResizeTextArea(document.encoder.text);

   if (! keyunchanged) {
	   e = document.getElementById('alphabet');
	   e.innerHTML = MakeKeyedAlphabet(document.encoder.key.value);
	   e = document.getElementById('tableau');
	   e.innerHTML = BuildTableau(document.encoder.key.value);
   }

   e = document.getElementById('output');
   if (document.encoder.text.value != '')
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Vigenere(document.encoder.encdec.value * 1, 
         document.encoder.text.value, document.encoder.pass.value, document.encoder.key.value, 1)));
   }
   else
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

