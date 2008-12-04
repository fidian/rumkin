<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Text Manipulator',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>Need to change something from lowercase to uppercase?  Count the letters,
numbers, and punctuation?  Remove spaces or add spaces at every X
characters?  This can help.  Just type some text into the box and click on
the links to change things around.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><textarea name="text" rows="5" cols="80"></textarea></p>
<p><b>Convert:</b>
<a href="#" onclick="return C_Upper()">UPPERCASE</a>,
<a href="#" onclick="return C_Lower()">lowercase</a>,
<a href="#" onclick="return C_FirstLetter()">First Letter</a>,
<a href="#" onclick="return C_Natural()">Natural case</a>
<br>
<b>Spacing:</b>
<a href="#" onclick="return S_RemoveSpaces()">Remove spaces and tabs</a>,
<a href="#" onclick="return S_RemoveCRLF()">Remove newlines</a>
<br>
<b>Grouping:</b> <a href="#" onclick="return G_Group(0, 0)">Make groups</a> of
<select name=group_size>
<option value="1">1
<option value="2">2
<option value="3">3
<option value="4">4
<option value="5" selected>5
<option value="6">6
<option value="7">7
<option value="8">8
<option value="9">9
<option value="10">10
<option value="11">11
<option value="12">12
<option value="13">13
<option value="14">14
<option value="15">15
<option value="16">16
<option value="17">17
<option value="18">18
<option value="19">19
<option value="20">20
</select>, break after
<select name=group_count>
<option value="1">1
<option value="2">2
<option value="3">3
<option value="4">4
<option value="5">5
<option value="6">6
<option value="7">7
<option value="8">8
<option value="9">9
<option value="10" selected>10
<option value="15">15
<option value="20">20
<option value="25">25
<option value="30">30
<option value="40">40
<option value="50">50
</select> groups
<br><b>Other Things:</b> <a href="#" onclick="return T_Reverse()">Reverse</a>
</p>
</form>
<?php MakeBoxTop('center'); ?>
<span id='output'></span>
<?php

MakeBoxBottom();
StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/friedman.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com


function T_Reverse()
{
   var o = '', l = document.encoder.text.value.length;
   
   for (var i = 1; i <= l; i ++)
   {
      o += document.encoder.text.value.charAt(l - i);
   }
   
   document.encoder.text.value = o;
   return false;
}

      
function G_Group(size, count)
{
   if (size <= 0)
   {
      size = document.encoder.group_size.value;
      if (size <= 0)
      {
         alert('Invalid group size');
	 return false;
      }
   }
   
   if (count <= 0)
   {
      count = document.encoder.group_count.value;
      if (count <= 0)
      {
         alert('Invalid group count');
	 return false;
      }
   }
   
   var t = document.encoder.text.value;
   var o = '', groups = 0;
   
   t = Tr(t, " \r\n\t");
   
   while (t.length > 0)
   {
      if (o.length > 0)
      {
         o += ' ';
      }
      if (groups >= count)
      {
         o += "\n";
	 groups = 0;
      }
      groups ++;
      
      o += t.slice(0, size);
      t = t.slice(size, t.length);
   }
   
   document.encoder.text.value = o;
   
   return false;
}

function S_RemoveSpaces()
{
   var t = document.encoder.text.value;
   t = Tr(t, " \t");
   document.encoder.text.value = t;
   return false;
}

function S_RemoveCRLF()
{
   var t = document.encoder.text.value;
   t = Tr(t, "\r\n");
   document.encoder.text.value = t;
   return false;
}

function C_Upper()
{
   document.encoder.text.value = document.encoder.text.value.toUpperCase();
   return false;
}

function C_Lower()
{
   document.encoder.text.value = document.encoder.text.value.toLowerCase();
   return false;
}

function C_FirstLetter()
{
   var t = document.encoder.text.value.toLowerCase(), out = '';
   var last_was_whitespace = 1;
   
   for (var i = 0; i < t.length; i ++)
   {
      var c = t.charAt(i);
      if (" \r\n".indexOf(c) >= 0)
      {
         last_was_whitespace = 1;
      }
      else
      {
         if (last_was_whitespace)
	 {
	    c = c.toUpperCase();
	 }
	 last_was_whitespace = 0;
      }
      out += c;
   }
   
   document.encoder.text.value = out;
   
   return false;
}

function C_Natural()
{
   var t = document.encoder.text.value.toLowerCase(), out = '';
   var last_was_punct = 1;
   
   for (var i = 0; i < t.length; i ++)
   {
      var c = t.charAt(i);
      if (".?!".indexOf(c) >= 0)
      {
         last_was_punct = 1;
      }
      else if (last_was_punct && 'abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0)
      {
	 c = c.toUpperCase();
	 last_was_punct = 0;
      }
      out += c;
   }
   
   document.encoder.text.value = out;
   
   return false;
}

function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) ||
       (! document.Friedman_Loaded) ||
       (! document.getElementById('output')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function Statistics(t)
{
   var words = 0, lcase = 0, ucase = 0, numbers = 0, symbols = 0;
   var spaces = 0, cr = 0, lf = 0, other = 0;
   var last_was_whitespace = 1;
   var friedman = Friedman(t, 'abcdefghijklmnopqrstuvwxyz');
   var out;
   
   for (var i = 0; i < t.length; i ++)
   {
      var c = t.charAt(i);
      if ('abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0)
      {
         lcase ++;
      }
      else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) >= 0)
      {
         ucase ++;
      }
      else if (c == ' ')
      {
         spaces ++;
      }
      else if (c == "\r")
      {
         cr ++;
      }
      else if (c == "\n")
      {
         lf ++;
      }
      else if ('0123456789'.indexOf(c) >= 0)
      {
         numbers ++;
      }
      else if ("`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?".indexOf(c) >= 0)
      {
         symbols ++;
      }
      else
      {
         other ++;
      }
      
      if (' \r\n'.indexOf(c) >= 0)
      {
         last_was_whitespace = 1;
      }
      else
      {
         if (last_was_whitespace)
	 {
	    words ++;
	 }
	 last_was_whitespace = 0;
      }
   }
   
   out = '<nobr><tt><b><u>Text Statistics</u></b>';
   out += Statistics_Report('Friedman IC', friedman * 26);
   out += Statistics_Report('Kappa-PT', friedman);
   out += Statistics_Report('Words', words);
   out += Statistics_Report('Upper Case', ucase);
   out += Statistics_Report('Lower Case', lcase);
   out += Statistics_Report('Numbers', numbers);
   out += Statistics_Report('Spaces', spaces);
   out += Statistics_Report('Newlines', Math.max(cr, lf));
   out += Statistics_Report('Symbols', symbols);
   out += Statistics_Report('Other', other);
   
   return out;
}


function Statistics_Report(what, v)
{
   var spaces = '', spacenum = 0;
   
   if (v != Math.floor(v)) {
      v = Math.round(v * 10000) / 10000;
   }

   while (what.length + spacenum < 16) {
      spaces += '&nbsp;';
      spacenum ++;
   }
   
   return '<br><b>' + what + ':</b>' + spaces + v;
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
      e.innerHTML = 'Type in stuff and see the statistics here.';
   }
   else
   {
      e.innerHTML = Statistics(document.encoder.text.value);
   }
   
   window.setTimeout('upd()', 100);
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

