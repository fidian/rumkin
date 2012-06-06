<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Frequency Analysis',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>One way to tell if you have a "transposition" style of cipher instead of
an encrypting method is to perform a letter frequency analysis on the
ciphertext.  In English, you will have certain letters (E, T) show up more
than others (Q, Z).  To use this tool, just copy your text into the top box
and a chart showing letter frequency will be generated in the bottom.  If
you want to see a demo, I can type in some <a href="#"
onclick="insert_sample(0); return false">sample text</a> for you.</p>

<p><b>Update:</b>  Fixed the display of the kappa-plaintext value.  Before,
it would show 0.665 and now it properly shows 0.0665.  Incidentally, that's
the approximate value for English text.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p>The text to analyze:</p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>Result:</p>
<?php MakeBoxTop('center', 'width: 75%'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/friedman.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com

var Sample_Text = "As this sample text is typed into the frequency " +
	"analyzer for you, the bars on the bottom will jump around.  " +
	"The analyzer is actually figuring out the letter frequencies " +
	"on the fly.\n\nThe analyzer will also figure out statistics " +
	"concerning numbers.  For instance, the code " +
	"\"102154165145040154141147157157156\" will be shown to have " +
	"no numbers higher than 7, which could indicate that the " +
	"code is in octal.  You can try to figure out what it is " +
	"by heading over to the substitution cipher page.";
var Sample_Place = 0, Sample_Last = '';

function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) || (! document.getElementById('output')) ||
      (! document.Friedman_Loaded))
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
      e.innerHTML = 'Enter in some text to analyze.  Below is a chart of ' +
         'the approximate letter frequencies in the English language.' +
	 '<br><br>' +
	 insert_standard();
   }
   else
   {
      f_ic = Friedman(document.encoder.text.value,
         'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      f_kappa = Math.round(f_ic * 10000) / 10000;
      f_ic = Math.round(26 * f_ic * 10000) / 10000;
      e.innerHTML = 'Friedman IC:  ' + f_ic + ' (kappa-plaintext: ' + f_kappa + ')';
      e.innerHTML += '<br>';
      e.innerHTML += analyze(document.encoder.text.value);
   }
   
   window.setTimeout('upd()', 100);
}

function insert_standard()
{
   var values = new Array(8.2, 1.5, 2.8, 4.2, 12.7, 2.2, 2.0, 6.1, 7.0, // a-i
                          0.2, 0.8, 4.0, 2.4, 6.9, 7.5, 1.9, 0.1, 6.0, // j-r
			  6.3, 9.1, 2.8, 1.0, 2.4, 0.2, 2.0, 0.1); // s-z
   return show_graph('ABCDEFGHIJKLMNOPQRSTUVWXYZ', values);
}

function insert_sample(p)
{
   p ++;
   if (p == 1)
   {
      document.encoder.text.value = '';
      Sample_Last = '';
   }
   if (document.encoder.text.value != Sample_Last)
      return;
   if (p > Sample_Text.length)
      return;
   document.encoder.text.value = Sample_Text.substr(0, p);
   Sample_Last = document.encoder.text.value;  // IE changes \n into \r\n
   window.setTimeout('insert_sample(' + p + ')', 35);
}

function analyze(t)
{
   var stat_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var alphabet = new Array(stat_letters.length);
   var i;
   
   t = t.toUpperCase();
   
   for (i = 0; i < alphabet.length; i ++)
      alphabet[i] = 0;
      
   for (i = 0; i < t.length; i ++)
   {
      var n = stat_letters.indexOf(t.charAt(i));
      if (n >= 0)
         alphabet[n] ++;
   }
   
   return show_graph(stat_letters, alphabet);
}

function show_graph(lett, valu)
{
   var colors = new Array('#CC2222', '#FF5555');
   var i, scale, out;
   
   for (i = 0, scale = 0; i < valu.length; i ++)
   {
      scale = Math.max(scale, valu[i]);
   }
   
   out = "<table border=0 cellpadding=0 cellspacing=0 width=100%>\n";
   for (i = 0; i < valu.length; i ++)
   {
      out += "<tr><th width=1>" + lett.charAt(i) + 
         "</th><td width=1>&nbsp;</td><td>";
      out += "<div style='background: ";
      out += colors[i % colors.length];
      out += "; width: ";
      out += "" + Math.floor(100 * (valu[i] / scale));
      out += "%; font-size: 7pt'>&nbsp;</div>";
      out += "</td></tr>\n";
   }
   out += "</table>\n";
   
   return out;
}

window.setTimeout('start_update()', 100);
      
// --></script>
<?php
}

