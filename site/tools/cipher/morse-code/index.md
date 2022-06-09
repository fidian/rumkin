----
title: Morse Code
summary: Once used to transmit messages around the world, this system can still be used in certain situations to send messages effectively when alternate mediums are not available.
----

require '../../functions.inc';
$GLOBALS['Codes'] = array(
	// Standard alphabet
	'A' => '.-',
	'B' => '-...',
	'C' => '-.-.',
	'D' => '-..',
	'E' => '.',
	'F' => '..-.',
	'G' => '--.',
	'H' => '....',
	'I' => '..',
	'J' => '.---',
	'K' => '-.-',
	'L' => '.-..',
	'M' => '--',
	'N' => '-.',
	'O' => '---',
	'P' => '.--.',
	'Q' => '--.-',
	'R' => '.-.',
	'S' => '...',
	'T' => '-',
	'U' => '..-',
	'V' => '...-',
	'W' => '.--',
	'X' => '-..-',
	'Y' => '-.--',
	'Z' => '--..',


	// Numbers
	'0' => '-----',
	'1' => '.----',
	'2' => '..---',
	'3' => '...--',
	'4' => '....-',
	'5' => '.....',
	'6' => '-....',
	'7' => '--...',
	'8' => '---..',
	'9' => '----.',


	// Punctuation
	'.' => '.-.-.-',
	',' => '--..--',
	'?' => '..--..',
	'-' => '-....-',
	'=' => '-...-',
	':' => '---...',
	';' => '-.-.-.',
	'(' => '-.--.',
	')' => '-.--.-',
	'/' => '-..-.',
	'"' => '.-..-.',
	'$' => '...-..-',
	'\'' => '.----.',
	'\\n' => '.-.-..',
	'_' => '..--.-',
	'@' => '.--.-.',


	// Messages
	'[Error]' => array(
		'......',
		'.......',
		'........',
		'.........'
	),
	'[Wait]' => '.-...',
	'[Understood]' => '...-.',
	'[End of message]' => '.-.-.',
	'[End of work]' => '...-.-',
	'[Starting signal]' => '-.-.-',
	'[Invitation to transmit]' => '-.-',


	// Unofficial
	'!' => array(
		'---.',
		'-.-.--'
	),
	'+' => '.-.-.',
	'~' => '.-...',
	'#' => '...-.-',
	'&' => '. ...',
	'\\2044' => '-..-.',
);
$CodeToHTML = array(
	'\\n' => '&para;',
	'&' => '&amp;',
	'\\2044' => '&frasl;',
);
StandardHeader(array(
		'title' => 'Morse Code',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Morse Code, created by Samuel Morse, was designed to transmit letters
across telegrams.  He wanted frequently used letters to have short codes and
less frequently used letters to have longer codes.</p>

<p>It has since been used in many other situations.  For a lot more
information, visit the <a
href="http://www.wikipedia.org/wiki/Morse_code">Wikipedia</a> entry on the
topic.</p>

<p>When encrypting, only letters and numbers will be encoded and the rest
will be treated like spaces.  When decrypting, only periods and hyphens will
be decoded and the rest will be treated like spaces.  This web page uses
International Morse Code with some additional enhancements, but without
support for foreign characters.  It also is geared to help you decode
Morse Code snippets you find with the Reverse (flips the text) and Swap
(exchanges periods and hyphens) links.</p>

<p>You can also insert the following phrases from the Kryptos statue:
<a href="#" onclick="return SetMorse('... --- ...')">SOS</a>,
<a href="#" onclick="return SetMorse('.-. --.-')">RQ</a>,
<a href="#" onclick='return SetMorse(". . ... .... .- -.. --- .-- . .\n..-. --- .-. -.-. . ... . . . . .")'>SHADOW FORCES</a>,
<a href="#" onclick='return SetMorse(". . ...- .. .-. - ..- .- .-.. .-.. -.-- .\n. . . . . . .. -. ...- .. ... .. -... .-.. .")'>VIRTUALLY INVISIBLE</a>,
<a href="#" onclick='return SetMorse("- .. ... -.-- --- ..- .-.\n.--. --- ... .. - .. --- -.")'>...T IS YOUR POSITION</a>,
<a href="#" onclick='return SetMorse(". -.. .. --. . - .- .-.. . . .\n.. -. - . .-. .--. .-. . - .- - .. -")'>DIGETAL INTERPRETATIT</a>,
<a href="#" onclick='return SetMorse(".-.. ..- -.-. .. -.. . . .\n-- . -- --- .-. -.-- .")'>LUCID MEMORY</a>.
(<a href="http://www.voynich.net/Kryptos/">See Photos</a>)</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p>Your message: (<a href="#" onclick="Reverse(); return false">Reverse</a> -
<a href="#" onclick="SwapMorse(); return false">Swap</a>)<br>
<textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();

?>
<p>This is a table of all the Morse Code translations I know
</p>
<?php

$i = 0;
$cols = 10;
$Messages = '';
echo "<table border=1 cellpadding=3 cellspacing=0>\n<tr>";

foreach ($Codes as $c => $v) {
	if (! is_array($v))$v = array(
		$v
	);

	foreach ($v as $vv) {
		if ($c[0] != '[') {
			if ($i == $cols) {
				echo "</tr>\n<tr>\n";
				$i = 0;
			}

			echo '<td>';

			if (isset($CodeToHTML[$c]))echo $CodeToHTML[$c];
			else echo $c;
			echo ' &nbsp; <b>' . $vv . '</bb></td>';
			$i ++;
		} elseif ($c != '[Error]' || strlen($vv) < 7) {
			$Messages .= "<li>$c &nbsp $vv\n";
		}
	}
}

while ($i != $cols) {
	echo '<td>&nbsp;</td>';
	$i ++;
}

echo "</tr>\n";
echo "</table>\n";
echo "<ul>\n$Messages</ul>";

?>
<p>Sources:</p>
<ul>
<li><a href="http://www.wikipedia.org/wiki/Morse_code">Wikipedia</a>
<li><a href="http://homepages.tesco.net/~a.wadsworth/MBcode.htm">G3MPF and
M1AIM Home Page Morse Code Section</a>
</ul>

<?php

StandardFooter();


function insert_js() {
	$MorseIndexes = array();
	$MorseCodes = array();

	foreach ($GLOBALS['Codes'] as $k => $v) {
		if (! is_array($v))$v = array(
			$v
		);

		foreach ($v as $vv) {
			if ($k != '"')$MorseIndexes[] = '"' . $k . '"';
			else $MorseIndexes[] = '\'' . $k . '\'';
			$MorseCodes[] = '"' . $vv . '"';
		}
	}

	$MorseIndexes = join(',', $MorseIndexes);
	$MorseCodes = join(',', $MorseCodes);

	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com

var MorseIndexes = new Array(<?php echo $MorseIndexes ?>);
var MorseCodes = new Array(<?php echo $MorseCodes ?>);

function SwapMorse()
{
   var s = document.encoder.text.value;
   var o = '';

   for (var i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      if (c == '-')
         c = '.';
      else if (c == '.')
         c = '-';
      else if (c == "\r")
         c = '';
      o += c;
   }

   document.encoder.text.value = o;
}

function Reverse()
{
   var s = document.encoder.text.value;
   var i = s.length - 1, o = '';

   while (i >= 0)
   {
      var c = s.charAt(i);
      if (c != "\r")
         o += c;
      i --;
   }

   document.encoder.text.value = o;
}

function getIndex(arr, str)
{
   var i = 0;
   while (arr[i])
   {
      if (arr[i] == str)
      {
         return i;
      }
      i ++;
   }
   return -1;
}

function encode(str)
{
   var addSpace = 0;
   var out = "";
   for (var i = 0; i < str.length; i ++)
   {
      var c = str.charAt(i);
      var j = getIndex(MorseIndexes, c.toUpperCase());
      if (j >= 0)
      {
         if (addSpace)
	 {
	    out += ' ';
	 }
         out += MorseCodes[j];
	 addSpace = 1;
      }
      else
      {
         if (c.charCodeAt(0) == 10 || c.charCodeAt(0) == 13)
	 {
	    out += c;
	 }
	 else if (addSpace)
	 {
	    out += ' / ';
	 }
	 addSpace = 0;
      }
   }
   return out;
}


function decode(str)
{
   var out = "";
   var addSpace = 0;

   // Reformat string, trying to change odd things into dots
   // and hyphens
   tmp = "";
   for (var i = 0; i < str.length; i ++)
   {
      if (str.charCodeAt(i) < 27)
      {
         tmp += ' ' + str.charAt(i) + ' ';
      }
      else if (str.charCodeAt(i) == 8211 || str.charCodeAt(i) == 8212 ||
               str.charAt(i) == '_')
      {
         // Compensate for weird hyphens
         tmp += '-';
      }
      else if (str.charCodeAt(i) == 8226 || str.charCodeAt(i) == 8901)
      {
         // Compensate for odd dots
         tmp += '.';
      }
      else
      {
         tmp += str.charAt(i);
      }
   }

   str = tmp.split(' ');
   for (var i = 0; i < str.length; i ++)
   {
      var idx = getIndex(MorseCodes, str[i]);

      if (idx >= 0)
      {
         out += MorseIndexes[idx];
	 addSpace = 1;
      }
      else
      {
         if (str[i].charCodeAt(0) == 10 || str[i].charCodeAt(0) == 13)
	 {
	    out += str[i];
     	 }
	 else if (addSpace)
	 {
	    out += ' ';
	 }
	 addSpace = 0;
      }
   }
   return out;
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
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else if (document.encoder.encdec.value * 1 == 1)
   {
      e.innerHTML = HTMLEscape(encode(document.encoder.text.value));
   }
   else
   {
      e.innerHTML = HTMLEscape(decode(document.encoder.text.value));
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

   if ((! document.Util_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}

function SetMorse(m)
{
   document.encoder.encdec.value = "-1";
   document.encoder.text.value = m;
   return false;
}


window.setTimeout('start_update()', 100);


// --></script>
<?php
}

