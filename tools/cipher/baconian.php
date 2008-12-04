<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Baconian Cipher',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Francis Bacon created this method of hiding one message within another.
It is not a true cipher, but just a way to conceal your secret text within
plain sight.  The way it originally worked is that the writer would use two
different typefaces.  One would be the "A" typeface and the other would be
"B".  Your message would be written with the two fonts intermingled, thush
hiding your message within a perfectly normal text.</p>

<p>There are two versions.  The first uses the same code for I and J, plus
the same code for U and V.  The second uses distict codes for every
letter.</p>

<p>For example, let's take the message "Test It" and encode it with the
distinct codes for each letter.  You get a result like "BAABBAABAABAABABAABB
ABAAABAABB".  The original message is 6 characters long so the encoded
version is 6 * 5 = 30 characters.  If I were to find a 30-character message
and put in "B" letters as bold and italics, we will get "<?php

echo BaconExample('This is a test message with bold for "B".', 'BAABBAABAABAABABAABB ABAAABAABB');

?>".

<p>When decoding, it will use "0", "A", and "a" as an "A"; "1", "B", and "b"
are all equivalent as well.  Other letters are ignored.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name="encdec">
   <option value="1">Encrypt
   <option value="-1">Decrypt
</select>
<p><select name="rem_jv">
   <option value="0">Distinct codes
   <option value="1">I=J and U=V
</select>
<p>Your message: (<a href="#" onclick="SwapBaconian(); return false">Swap
A and B</a>)<br>
<textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com


function SwapBaconian()
{
   var s = document.encoder.text.value;
   var o = '';
   
   for (var i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      if (c == '0')
         c = '1';
      else if (c == '1')
         c = '0';
      else if (c == 'a')
         c = 'b';
      else if (c == 'b')
         c = 'a';
      else if (c == 'A')
         c = 'B';
      else if (c == 'B')
         c = 'A';
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

function encode(str, alphabet)
{
   var spaceAdded = 1;
   var out = '';
   
   str = str.toUpperCase();
   alphabet = alphabet.toUpperCase();

   for (var i = 0; i < str.length; i ++)
   {
      var c = str.charAt(i);
      var idx = alphabet.indexOf(c);
      if (idx >= 0)
      {
         out += (idx & 0x10)? 'B' : 'A';
	 out += (idx & 0x08)? 'B' : 'A';
	 out += (idx & 0x04)? 'B' : 'A';
	 out += (idx & 0x02)? 'B' : 'A';
	 out += (idx & 0x01)? 'B' : 'A';
	 spaceAdded = 0;
      }
      else
      {
         if (! spaceAdded)
	 {
	    out += ' ';
	    spaceAdded = 1;
	 }
      }
   }
   return out;
}


function decode(str, alphabet)
{
   var out = '';
   var buffer = '';
   var addSpace = 0;
   
   str = str.toUpperCase();
   str = Tr(str, '01', 'AB');
   
   for (var i = 0; i < str.length; i ++)
   {
      var c = str.charAt(i);
      
      if (c == 'A' || c == 'B')
      {
         buffer += c;
      }
      else if (buffer == '')
      {
         addSpace = 1;
      }
   
      if (buffer.length == 5)
      {
         var idx = 0;
	 
	 idx += (buffer[0] == 'A')? 0 : 16;
	 idx += (buffer[1] == 'A')? 0 : 8;
	 idx += (buffer[2] == 'A')? 0 : 4;
	 idx += (buffer[3] == 'A')? 0 : 2;
	 idx += (buffer[4] == 'A')? 0 : 1;
	 
	 buffer = '';
	 
	 if (addSpace) {
	    out += ' ';
	    addSpace = 0;
	 }
	 
	 out += alphabet.charAt(idx);
      }
   }
   
   return out;
}


function upd()
{
   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.rem_jv) *
       IsUnchanged(document.encoder.encdec))
   {
      window.setTimeout('upd()', 100);
      return;
   }
   
   ResizeTextArea(document.encoder.text);

   var e = document.getElementById('output');
   var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var txt = document.encoder.text.value;
   
   if (document.encoder.rem_jv.value * 1)
   {
      alphabet = 'ABCDEFGHIKLMNOPQRSTUWXYZ';
      txt = Tr(txt, 'jJvV', 'iIuU');
   }
 
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else if (document.encoder.encdec.value * 1 == 1)
   {
      e.innerHTML = HTMLEscape(encode(txt, alphabet));
   }
   else
   {
      e.innerHTML = HTMLEscape(decode(txt, alphabet));
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


window.setTimeout('start_update()', 100);


// --></script>
<?php
}


function BaconExample($str, $code) {
	$code = preg_replace('/[^AB]/', '', $code);
	$out = '';
	
	while ($str) {
		$c = $str[0];
		$str = substr($str, 1);
		
		if (($c >= 'a' && $c <= 'z') || ($c >= 'A' && $c <= 'Z')) {
			if ($code[0] == 'B') {
				$out .= '<b><i>' . $c . '</i></b>';
			} else {
				$out .= $c;
			}
			
			$code = substr($code, 1);
		} else {
			$out .= $c;
		}
	}
	
	return $out;
}

