----
title: Vigenere
summary: Based somewhat on the Caesarian shift cipher, this changes the shift amount with each letter in the message and those shifts are based on a passphrase. A pretty strong cipher for beginners, and one that can be done on paper easily.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Vigenere Ciphers',
		'header' => 'Vigen&eacute;re Ciphers',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>A 16<sup>th</sup> century French diplomat, Blaise de Vigenere, created a
very simple cipher that is moderately difficult for any unintended parties
to decipher.  It is somewhat like a variable <a href="caesar.php">Caesar</a>
cipher, but the N changed with every letter.  You would "encode" your
message with a passphrase, and the letters of your passphrase would
determine how each letter in the message would be encrypted.</p>

<p>This is the exact opposite of a "Variant Beaufort."  To do the
variant, just "decode" your plain text to get the cipher text and "encode"
the cipher text to get the plain text again.</p>

<p>If you wanted even more security, you can use two passphrases to create a
<a href="vigenere-keyed.php">keyed Vigenere cipher</a>, just like the one
that stumped cryptologists for years.  Again, a pretty simple trick, but it
can ensure that your message is even harder to crack.</p>

<p>Recently, a judge created his own "<a href="#" onclick="InsertSmithy(); return false">Smithy
Code</a>" in a legal document, but some errors were made.  You can see what
people consider to be the <a href="#"
onclick="InsertSmithyFixed(); return false">correct code</a> with the fixes in
upper case.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
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
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.pass) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);

   var e = document.getElementById('output');

   if (document.encoder.text.value != '')
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Vigenere(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.pass.value)));
   }
   else
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }

   window.setTimeout('upd()', 100);
}


function InsertSmithy()
{
   document.encoder.encdec.value = 1;
   document.encoder.pass.value = "AAYCEHMU";
   document.encoder.text.value = "Jaeiex tostgp sac gre amq wfkadpmqzv";
}

function InsertSmithyFixed()
{
   document.encoder.encdec.value = 1;
   document.encoder.pass.value = "AAYCEHMU";
   document.encoder.text.value = "jaeiex tosHgp sac gre amq wfkadpmqzvZ";
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Keyed Vigenere Cipher',
		'header' => 'Keyed Vigen&eacute;re Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Based on the simpler <a href="vigenere.php">Vigenere</a> cipher, this
uses an alternate tableau.  The "Alphabet Key" helps decide the alphabet
to use to encrypt and decrypt the message.  The "Passphrase" is the code word
used to select columns in the tableau.  Instead of just using the alphabet from
A to Z in order, the alphabet key puts a series of letters first, making the
cipher even tougher to break.  This style of encryption is also called a
Quagmire III.</p>

<p>This tool was built to play with the <a
href="http://google.com/search?q=kryptos">Kryptos</a> codes &ndash; a set of
letters that are cut out of a sheet of copper at the CIA headquarters.  To
help you out with the codes, you can pre-populate the form with the
<a href="#" onclick="fill_k1(); return false">K1</a> or
<a href="#" onclick="fill_k2(); return false">K2</a> sections.  Also, there is
a <a href="#" onclick="fill_k2b(); return false">Corrected K2</a> that shows
where a letter was omitted (the lower-case "s" near the end).
</p>

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
   var e, keyunchanged;

   keyunchanged = IsUnchanged(document.encoder.key)

   if (keyunchanged * IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       IsUnchanged(document.encoder.pass))
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
      e.innerHTML = BuildTableau(document.encoder.key.value);
   }

   e = document.getElementById('output');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Vigenere(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.pass.value,
	 document.encoder.key.value)));
   }
   window.setTimeout('upd()', 200);
}

function fill_k1()
{
   document.encoder.encdec.value = -1;
   document.encoder.key.value = "KRYPTOS";
   document.encoder.pass.value = "PALIMPSEST";
   document.encoder.text.value = "EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ\n" +
      "YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD";
}

function fill_k2()
{
   document.encoder.encdec.value = -1;
   document.encoder.key.value = "KRYPTOS";
   document.encoder.pass.value = "ABSCISSA";
   document.encoder.text.value = "VFPJUDEEHZWETZYVGWHKKQETGFQJNCE\n" +
      "GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG\n" +
      "TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA\n" +
      "QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR\n" +
      "YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI\n" +
      "HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE\n" +
      "EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX\n" +
      "FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF\n" +
      "FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ\n" +
      "ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE\n" +
      "DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP\n" +
      "DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG"
}

function fill_k2b()
{
   document.encoder.encdec.value = -1;
   document.encoder.key.value = "KRYPTOS";
   document.encoder.pass.value = "ABSCISSA";
   document.encoder.text.value = "VFPJUDEEHZWETZYVGWHKKQETGFQJNCE\n" +
      "GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG\n" +
      "TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA\n" +
      "QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR\n" +
      "YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI\n" +
      "HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE\n" +
      "EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX\n" +
      "FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF\n" +
      "FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ\n" +
      "ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE\n" +
      "DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP\n" +
      "DQUMEBEDMHDAFMJGZNUPLGEsWJLLAETG"
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

