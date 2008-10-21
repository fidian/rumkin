<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Vigenere Autokey',
		     'header' => 'Vigen&eacute;re Autokey',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));
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
         document.encoder.text.value, document.encoder.pass.value, '', 1)));
   }
   else
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?PHP
}
