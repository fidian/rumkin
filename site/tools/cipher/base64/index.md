----
title: Base64
summary: This is typically used to make binary data safe to transport as strictly text.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Base64',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Base64, also known as MIME encoding, translates binary into safe text.
It is used to send attachments in email and to change small bits of unsafe
high-character data into stuff that is a lot nicer for text-based system.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name=encdec>
<option value="-1">Decrypt</option>
<option value="1">Encrypt</option>
</select></p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {

	?><script language="JavaScript" src="js/base64.js"></script>
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

   if ((! document.Base64_Loaded) || (! document.Util_Loaded) ||
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
       IsUnchanged(document.encoder.encdec))
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
      e.innerHTML =
SwapSpaces(HTMLEscape(Base64(document.encoder.encdec.value * 1,
	document.encoder.text.value)));
   }

   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

