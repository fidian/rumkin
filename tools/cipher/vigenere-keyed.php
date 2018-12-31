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
<?php MakeBoxTop('center', 'font-family: monospace') ?>
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

