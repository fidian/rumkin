<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Rotate',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>This cipher is pretty simple.  Basically, you would write all of the
letters in a grid, then rotate the grid 90&deg; and read the characters back
out.  I first heard of this method when <a
href="http://groups.yahoo.com/group/Kryptos/message/4834">Mike</a> 
posted to the <a
href="http://groups.yahoo.com/group/kryptos">Kryptos Group</a> mailing list.
I liked the method and decided to write up a neat little encoder.  It was
used to decode K3.  I can insert the <a href="#" 
onclick="insert_k3(); return false">first half</a> for you, then you just
copy the decoded text back into the text area above and change the column
width to 8 in order to see the secret message.</p>

<p>Spaces are rotated with the letters, enters (newlines) are not.
Extra 'X' letters will be added if the number of columns does not divide
evenly into the text length.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
<option value="1">Rotate Left 90&deg;
<option value="-1">Rotate Right 90&deg;
</select></p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
<p>Box width:  <input type=text size=4 name=col value="1"></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center', 'font-family: monospace'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/rotate.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


function insert_k3()
{
   document.encoder.encdec.value = -1;
   document.encoder.col.value = 24;
   document.encoder.text.value = "ENDyaHrOHNLSRHEOCPTEOIBIDYSHNAIA\n" +
      "CHTNREYULDSLLSlLNOHSNOSMRWXMNE\n" +
      "TPRNGATIHNRARPESLNNELEBLPIIACAE\n" +
      "WMTWNDITEENRAHCTENEUDRETNHAEOE\n" +
      "TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR\n" +
      "EIFTBRSPAMHHEWENATAMATEGYEERLB\n" +
      "TEEFOAsFIOTUETUAEOTOARMAEERTNRTI\n" +
      "BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB\n" +
      "AECTDDHILCEIHSITEGOEAOSDDRYDLORIT\n" +
      "RKLMLEHAGTDHARDPNEOHMGFMFEUHE\n" +
      "ECDMRIPFEIMEHNLSSTTRTVDOHW";
}


function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) || (! document.Rotate_Loaded) ||
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
       IsUnchanged(document.encoder.col) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);
   
   var e = document.getElementById('output');
   
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Enter your text and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Rotate(document.encoder.encdec.value * 1, 
                                      document.encoder.text.value,
				      document.encoder.col.value * 1)));
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

