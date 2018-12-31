<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'One Time Pad',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>It is said that the one-time pad is the best cipher anywhere.  It is
uncrackable as long as you keep the messages short, use shorthand and
abbreviations, remove unnecessary letters, never reuse a pad, and have a
good enough random source for data.</p>

<p>This implementation will take the letters (and letters only) from the pad
and encrypt the letters from your message.  It leaves spaces, newlines
(enters / returns), punctuation, numbers, and all of the things that aren't
A-Z alone.  Make sure that your pad is at least as long as the number
of characters in your message, otherwise your message will not be encoded.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea></p>
<p>The pad:<br><textarea name="pad" rows="5" cols="80"></textarea></p>
</form>
<?php MakeBoxTop('center', 'font-family: monospace') ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/otp.js"></script>
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

   if ((! document.OneTimePad_Loaded) || (! document.Util_Loaded) ||
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
       IsUnchanged(document.encoder.pad) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }
   
   ResizeTextArea(document.encoder.text);
   ResizeTextArea(document.encoder.pad);

   var e = document.getElementById('output');
   
   if (document.encoder.text.value != '' && document.encoder.pad.value != '')
   {
      e.innerHTML = SwapSpaces(HTMLEscape(OneTimePad(document.encoder.encdec.value * 1, 
         document.encoder.text.value, document.encoder.pad.value)));
   }
   else
   {
      e.innerHTML = 'Type in a message and a pad to see the results.';
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

