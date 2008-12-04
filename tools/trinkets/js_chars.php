<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'JS Chars',
		'topic' => 'trinkets',
		'callback' => 'insert_js'
	));

?>

<p>Want to know the hex codes for unicode characters?
This will do it for you.  Just type and see what I mean.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is the unicode hex code for every character in the box above,
including spaces, tabs, and newlines.</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="../cipher/js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

var last=-1;
	

function DumpChars(s)
{
   var Hex = "0123456789ABCDEF";
   var o = "";
   for (var i = 0; i < s.length; i ++)
   {
      var c = s.charCodeAt(i);
      o += Hex.charAt((c >> 12) & 0x0F) +
           Hex.charAt((c >>  8) & 0x0F) +
	   Hex.charAt((c >>  4) & 0x0F) +
	   Hex.charAt((c      ) & 0x0F) + " ";
   }
   
   return o;
}

function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) || (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   if (document.encoder.text.value == last)
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);
   last = document.encoder.text.value;
   
   var e = document.getElementById('output');
   
   if (last == '')
   {
      e.innerHTML = 'See the results here!';
   }
   else
   {
      e.innerHTML = DumpChars(last);
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

