<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'ROT13',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>This is a JavaScript 1.2 implementation of the "rot13" encoder.  
If your browser doesn't support JavaScript 1.2, you really should get
<a href="http://mozilla.org">a newer one</a>.  Rot13 isn't
a very secure algorithm.  A becomes N, B becomes O, C changes to P, etc.  It
is used to obscure spoilers and hints so that the person reading has to do a
little work in order to understand the message instead of being able to
accidentally read it.</p>

<p>Rot13 is both an encoder and decoder.  You can enter plain text or
encoded text, and you will be given the other one.  Just type either one
here and it will be automatically encoded or decoded.</p>
	
<p>I also made a <a href="caesar.php">rotN encoder</a>, which is also called
a Caesarian Shift, so you can see what your sentence looks like
if it is off by one character, 19 characters, or however many you want.
Additionally, the <a href="vigenere.php">Vigenere</a> cipher is very
similar.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center', 'font-family: monospace'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/caesar.js"></script>
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
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   if (IsUnchanged(document.encoder.text))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);
   
   var e = document.getElementById('output');
   
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Enter your text and see the converted message here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Caesar(1,
	document.encoder.text.value, 13)));
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

