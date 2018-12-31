<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Railfence',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>When you rearrange your text in a "wave" sort of pattern (down, down, up,
up, down, down, etc.), it is called a railfence.  Take the text "WAFFLES FOR
BREAKFAST" and arrange them in waves like the diagram below.  I substituted
* for spaces just to illustrate that the spaces are not removed.</p>

<p><tt>W&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;K&nbsp;&nbsp;&nbsp;T<br>
&nbsp;A&nbsp;F&nbsp;E&nbsp;*&nbsp;O&nbsp;*&nbsp;R&nbsp;A&nbsp;F&nbsp;S<br>
&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;A</tt></p>

<p>You leave the spaces in.  Next, you squish together the lines,
remembering to keep the spaces in.  I did not replace spaces with stars
since the spaces are clearly shown in the middle line.</p>

<p><tt>WLFBKT<br>AFE O RAFS<br>FSREA</tt></p>

<p>Then you just combine the lines and get <tt>WLFBKTAFE O RAFSFSREA</tt>.
Or you can use this JavaScript-based tool and speed things up quite a bit.
There is <a
href="http://www.woodmann.com/fravia/railfe.htm">another site</a> with more
of a description and another encoder.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Rails:  <input type=text name=rails value=3> &ndash; The number of rows,
which determines the height of the waves.</p>
<p>Offset:  <input type=text name=offset value=0> &ndash; Instead of
starting on the top rail and working down, you can start on any rail and
move up or down depending on where you place the offset.  Should be less
than (rail * 2 - 1).</p>
<p>Your message:<br><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p><a id='rails_link' href="#" onclick="ToggleRails(); return false">Show the
rails</a></p>
<div style="display: none" id='rails_disp'></div>
<p>This is your encoded or decoded text.  It may be hard to see spaces
at the beginning, end, or two in a row.
Be careful when copying encrypted text and make sure that it will
decrypt to the message properly.</p>
<?php MakeBoxTop('center', 'font-family: monospace'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/railfence.js"></script>
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

   if ((! document.Railfence_Loaded) || (! document.Util_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   var e, r;

   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       IsUnchanged(document.encoder.rails) *
       IsUnchanged(document.encoder.offset))
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);

   if (document.encoder.text.value== '')
   {
      e = document.getElementById('output');
      e.innerHTML = 'Enter a message and see the results here!';
      e = document.getElementById('rails_disp');
      e.innerHTML = 'There is no message to show.';
      setTimeout('upd()', 100);
      return;
   }

   r = Railfence(document.encoder.encdec.value * 1, 
      document.encoder.text.value, document.encoder.rails.value * 1, 
      document.encoder.offset.value * 1);
   
   e = document.getElementById('output');
   e.innerHTML = SwapSpaces(HTMLEscape(r));
   
   e = document.getElementById('rails_disp');
   if (document.encoder.encdec.value * 1 > 0)
   {
      e.innerHTML = FormatRails(document.encoder.text.value, 
         document.encoder.rails.value * 1, document.encoder.offset.value * 1);
   }
   else
   {
      e.innerHTML = FormatRails(r, document.encoder.rails.value * 1, 
         document.encoder.offset.value * 1);
   }
   
   window.setTimeout('upd()', 100);
}


function FormatRails(text, rails, offset)
{
   var o = new Array(rails), off = new Array(2 * (rails - 1));
   var i, j, off, pos;
   
   for (i = 0; i < rails; i ++)
   {
      o[i] = "";
      off[i] = i;
   }
   
   for (i = rails; i < 2 * (rails - 1); i ++)
   {
      off[i] = (2 * (rails - 1)) - i;
   }
   
   pos = offset % (2 * (rails - 1));
   
   for (i = 0; i < text.length; i ++)
   {
      for (j = 0; j < rails; j ++)
      {
         if (off[pos] == j)
	 {
	    o[j] += text.charAt(i);
	 }
	 else
	 {
	    o[j] += '&nbsp;';
	 }
      }
      pos = (pos + 1) % (2 * (rails - 1));
   }
   
   
   j = "";
   for (i = 0; i < rails; i ++)
   {
      if (i)
      {
         j += "<br>\n";
      }
      j += o[i];
   }
   
   return '<tt><b>' + j + '</b></tt>';
}

toggle = 0;
function ToggleRails()
{
   var Link, Vis;
   
   if (toggle == 0)
   {
      toggle = 1;
      Link = "Hide the rails";
      Vis = "block";
   }
   else
   {
      toggle = 0;
      Link = "Show the rails";
      Vis = "none";
   }
   
   e = document.getElementById('rails_link');
   e.innerHTML = Link;
   
   e = document.getElementById('rails_disp');
   e.style.display = Vis;
}

window.setTimeout('start_update()', 100);
      
// --></script>
<?php
}

