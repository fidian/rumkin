<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Skip',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Ok, I admit that I don't know of an "official" name for this algorithm.
I did hear that it is the same method as what a scytale employs.
Basically, if you are given the encrypted text, you start at a given letter
and then count N letters (wrapping around from the end to the beginning)
forward to the next letter.  It can be used for the third part of the
<a href="http://google.com/search?q=kryptos">Kryptos</a> statue.  I can also
pre-load the <a href="#" onclick="javascript:load_k3(); return false">K3</a>
information for you.</p>

<p>If you do use this for decoding the Kryptos, you will see that you need
to just count every 192<sup>nd</sup> letter.  Additionally, I have made 5
characters lowercase:  The "s" and the "l" are the first two characters, in
case you wanted to count by hand.  The "y", "a", and "r" are the three
letters that are offset from the rest of the text.</p>
	
<p>Spaces are NOT ignored and will be moved around appropriately as though
they were letters.  Newlines (enters / returns) will be ignored.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec"><option value="1">Encode
<option value="-1">Decode</select></p>
<p>Bypass the first X letters:  <?php InputPlusMinus('startat', 0) ?>
 (0 = start with the first letter, 1 = start with the second letter, ...)</p>
<p>Skip:  <?php InputPlusMinus('skip', 1) ?>
 (When pressed, the next valid number is used - 
 <a href="#" onclick="show_chart(); return false;">Show all</a>
 skip possibilities in a new window.)</p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text.</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/skip.js"></script>
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

   if ((! document.Skip_Loaded) || (! document.Util_Loaded) ||
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
       IsUnchanged(document.encoder.skip) *
       IsUnchanged(document.encoder.startat) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }
	
   ResizeTextArea(document.encoder.text);

   var e = document.getElementById('output');
   if (document.encoder.text.value != '')
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Skip(document.encoder.encdec.value * 1, 
         document.encoder.text.value, document.encoder.skip.value * 1, 
	 document.encoder.startat.value * 1)));
   }
   else
   {
      e.innerHTML = 'Type a message and see the results here!';
   }
   
   window.setTimeout('upd()', 100);
}


function PlusMinus(objname, dir)
{
   var v, t;
   
   t = Tr(document.encoder.text.value, "\r\n");
   v = eval('document.encoder.' + objname + '.value') * 1;
   v += dir;
   if (objname == 'skip')
   {	
      while (HasAFactorMatch(t.length, v) && v > 1 &&
             v < t.length - 1)
      {
         v += dir;
      }
      if (v < 1)
         v = 1;
   }
   else
   {
      if (v < 0)
         v = 0;
   }
   if (v > t.length - 1)
      v = t.length - 1;
   eval('document.encoder.' + objname + '.value = v');
}
	

function load_k3()
{
   document.encoder.encdec.value = -1;
   document.encoder.startat.value = 191;
   document.encoder.skip.value = 192;
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
      "ECDMRIPFEIMEHNLSSTTRTVDOHW?";
}


function show_chart()
{
   var t = Tr(document.encoder.text.value, "\r\n");
   var o = '';
   
   if (t.length == 0)
   {
      alert('You need to type in a message first.');
      return;
   }
   
   if (t.length == 1)
   {
      alert('The message is too short.');
      return;
   }
   
   for (var s = 1; s < t.length; s ++)
   {
      if (s == 0 || ! HasAFactorMatch(t.length, s))
      {
         o += '<p><b><u>Skip ' + s + ':</u></b> ' +
	    HTMLEscape(Skip(document.encoder.encdec.value * 1, t, s, 0)) +
	    "</p>\n";
      }
   }

   var win = window.open('', '', 'toolbar=0,location=0,statusbar=0');
   win.document.write(o);
}


window.setTimeout('start_update()', 100);


// --></script>
<?php
}


function InputPlusMinus($var, $def) {
	global $onupdate;
	echo '<input type=text name=' . $var . ' size=5 ' . $onupdate . ' value="' . $def . '">';
	echo ' <input type=button value="+" onclick="PlusMinus(\'' . $var . '\', 1)">';
	echo ' <input type=button value="-" onclick="PlusMinus(\'' . $var . '\', -1)">';
}

