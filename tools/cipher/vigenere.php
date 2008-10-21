<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Vigenere Ciphers',
		     'header' => 'Vigen&eacute;re Ciphers',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));
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
<?PHP MakeBoxTop('center'); ?>
<span id='output'></span>
<?PHP 

MakeBoxBottom();

StandardFooter();



function insert_js()
{
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
<?PHP
}
