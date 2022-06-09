----
title: Übchi
summary: A double columnar transposition cipher that uses the same key, but adds a number of pad characters.  Used by the Germans in World War I.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Ubchi',
		'header' => '&Uuml;bch',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>During World War I, the Germans used a double columnar transposition
cipher called &Uuml;bchi ("ubchi" with umlauts).  For a bit more information
about columnar transposition ciphers, see that <a
href="coltrans.php">cipher's page</a>.  This method is surprisingly similar
to the U.S. Army's <a href="coltrans-double.php">double transposition</a>,
also used during World War I.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name=encdec><option value="1">Encrypt
<option value="-1">Decrypt</select></p>
<p><select name=colkey_type>
<option value="alpha">Key Word(s) - Duplicates numbered forwards
<option value="ahpla">Key Word(s) - Duplicates numbered backwards
</select>:  <input type=text name=colkey><br>
The resulting columnar key:  <b><span id='colkey_out'></span></b></p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {

	?>
<script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/coltrans.js"></script>
<script language="JavaScript" src="js/ubchi.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

function upd()
{
   var keyunchanged = 1;

   if (IsUnchanged(document.encoder.colkey) +
       IsUnchanged(document.encoder.colkey_type) < 2)
   {
      keyunchanged = 0;
      var c = document.getElementById('colkey_out');
      c.innerHTML = MakeColumnKey(document.encoder.colkey_type.value,
         document.encoder.colkey.value);
   }


   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       keyunchanged)
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);

   var e = document.getElementById('output');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Ubchi(document.encoder.encdec.value * 1,
         document.encoder.text.value, document.encoder.colkey.value,
	 document.encoder.colkey_type.value)));
   }

   window.setTimeout('upd()', 100);
}


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.ColTrans_Loaded) || (! document.Util_Loaded) ||
       (! document.Ubchi_Loaded) ||
       (! document.getElementById('output')) ||
       (! document.getElementById('colkey_out')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


window.setTimeout('start_update()', 100);

// --></script>
<?php
}

