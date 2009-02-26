<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Atbash Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>The Atbash cipher is a very common, simple cipher.  It was for the Hebrew alphabet, but modified here to work with the English alphabet.  Basically, when encoded, an "A" becomes a "Z", "B" turns into "Y", etc.</p>

<p>The Atbash cipher can be implemented as an <a href="affine.php">Affine cipher</a> by setting both "a" and "b" to 25.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded/decoded text:</p>
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
   if (IsUnchanged(document.encoder.text))
   {
      window.setTimeout('upd()', 100);
      return;
   }
   
   var e = document.getElementById('affine');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Affine(1, document.encoder.text.value, 25, 25)));
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

