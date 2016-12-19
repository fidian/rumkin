<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Cryptogram Assistant',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>This is a JavaScript 1.2 implementation of a letter-pair replacement
solver, also known as a substitution cipher.  This is the kind of puzzle 
where A is N, B is O, C is P, etc.  It can also be called a cryptoquip
or a cryptogram in the local newspaper.
<p>To use it, you just define a "key" and the letters in the upper part will
be translated and shown in the lower part.  This is only a tool to
help you out &ndash; it can not automatically solve the puzzle for you.
<p>In a related vein, you can check out the <a href="rot13.php">ROT13</a> encoder which
swaps letters from the first half of the alphabet with the second half (and
vice versa), or the <a href="caesar.php">Caesar cipher</a> where you
essentialy "slide" the alphabet over to the left or right.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<div id='table'>Loading ...</div>
<p>Quickly swap two letters by typing them in here:  <input name=swap
type=text onkeyup="quickswap()" size=3> or reset the letters to
<a href="#" onclick="WriteTable(false, Letters); return false">A-Z</a> or
<a href="#" onclick="WriteTable(false, LettersAtbash); return false">Z-A</a>.</p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>Result:</p>
<?php MakeBoxTop('center'); ?>
<div id='recode'></div>
<?php MakeBoxBottom(); ?>
<p><a href="caesar-keyed.php">Keyed Caesar</a> alphabet:
<span id="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</span><br>
Or a decode alphabet: <span
id="alphabet2">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</span></p>
<?php

StandardFooter();


function insert_js() {
	
	?><script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// Feel free to use this code if you so desire.
// It would be nice if you left this header intact.  http://rumkin.com

var Letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var LettersAtbash = 'ZYXWVUTSRQPONMLKJIHGFEDCBA0123456789';
var last_alphabet = '', curr_alphabet = '';
var TableColumns = 8;
var Advanced = 0;


function InverseAlphabet(a)
{
   var s = '';
   for (var i = 0; i < Letters.length; i ++)
   {
      var idx = a.indexOf(Letters.charAt(i));
      if (idx >= 0)
         s += Letters.charAt(idx);
   }
   
   return s;
}

function RecalcAlphabet()
{
   var e, e2, a = '';
   
   for (var i = 0; i < Letters.length; i ++)
   {
      var c, e2;
      e2 = document.encoder['L_' + Letters.charAt(i)];
      if (e2)
      {
         c = e2.value.charAt(0).toUpperCase();
         if (c.length != 1)
            c = Letters.charAt(i).toUpperCase();
         e2.value = c;
      }
      a += c;
   }
   
   curr_alphabet = a;
   
   e = document.getElementById('alphabet');
   e2 = document.getElementById('alphabet2');
   if (Letters != Letters.toUpperCase() ||
       a != MakeKeyedAlphabet(a, Letters))
   {
      e.innerHTML = 'Invalid Caesar alphabet';
      e2.innerHTML = 'Not possible';
   }
   else
   {
      e2.innerHTML = a;
      e.innerHTML = InverseAlphabet(a);
   }
}   
   
function quickswap()
{
   var s, e, i, a = Array();

   s = document.encoder.swap.value;
   if (Letters == Letters.toUpperCase())
      s = s.toUpperCase();
   if (Advanced)
   {
      var s2 = '';
      for (i = 0; i < s.length; i ++)
      {
         e = document.encoder['CHK_' + s.charAt(i)];
         if (! e || ! e.checked)
	 {
	    s2 += s.charAt(i);
	 }
      }
      s = s2;
   }
   while (s.length >= 2)
   {
      for (i = 0; i < Letters.length; i ++)
      {
         e = document.encoder['L_' + Letters.charAt(i)];
	 if (e && e.value == s.charAt(0))
	 {
	    e.value = s.charAt(1);
	 }
	 else if (e && e.value == s.charAt(1))
	 {
	    e.value = s.charAt(0);
	 }
      }
      s = s.slice(2, s.length);
   }
   
   document.encoder.swap.value = s;
   
   RecalcAlphabet();
}


function ColorizeEscape(s)
{
   var oldcolor = '';
   var out = '';
   var spaces = 0;
   
   if (! Advanced)
   {
      return SwapSpaces(HTMLEscape(s));
   }
   for (var i = 0; i < s.length; i ++)
   {
      var newcolor = '';
      var e = document.encoder['COL_' + s.charAt(i).toUpperCase()];
      var c;
	
      if (e)
      {
	 newcolor = e.value;
      }
      if (newcolor != oldcolor)
      {
	 if (oldcolor)
	 {
	    out += '</span>';
	 }
	 if (newcolor)
	 {
	    out += '<span style="background-color: ' + newcolor + '">';
	 }
	 oldcolor = newcolor;
      }
      c = HTMLEscape(s.charAt(i));
      if (c == ' ')
      {
         if (spaces == 0)
	 {
	    spaces = 1;
	 }
	 else
	 {
	    spaces = 0;
	    c = '&nbsp;';
	 }
      }
      else
      {
         spaces = 0;
      }
      out += c;
   }
   if (oldcolor)
   {
      out += '</span>';
   }
   
   return out;
}
   

function Cryptogram(text, lett, changed)
{
   var t_in, t_out, i, idx, c, o = '';
   
   t_in = lett;
   t_out = changed;
   if (lett == lett.toUpperCase())
   {
      t_in += lett.toLowerCase();
      t_out += changed.toLowerCase();
   }
   
   for (i = 0; i < text.length; i ++)
   {
      c = text.charAt(i);
      idx = t_in.indexOf(c);
      if (idx < 0)
      {
         o += c;
      }
      else
      {
         o += t_out.charAt(idx);
      }
   }
   
   return o;
}


function upd()
{
   var e, unchanged;
   
   unchanged = IsUnchanged(document.encoder.text);
   if (unchanged && curr_alphabet == last_alphabet)
   {
      window.setTimeout('upd()', 100);
      return;
   }

   ResizeTextArea(document.encoder.text);
   
   last_alphabet = curr_alphabet;
   
   e = document.getElementById('recode');
   
   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Enter some text and watch it change here.';
   }
   else
   {
      e.innerHTML = ColorizeEscape(Cryptogram(document.encoder.text.value, 
	Letters, last_alphabet));
   }
   
   window.setTimeout('upd()', 100);
}
	

function LockField(n)
{
   var e_chk, e_fld;
   
   e_chk = document.encoder[n];
   
   if (! e_chk)
   {
      return;
   }
   
   n = n.slice(4, n.length);
   
   e_fld = document.encoder['L_' + n];
   
   if (! e_fld)
   {
      return;
   }

   e_fld.disabled = e_chk.checked;
}


function Colorize(n, v)
{
   var e;
   
   last_alphabet = '';
   n = n.slice(4, n.length);
   e = document.encoder['L_' + n];
   
   if (e)
   {
      e.style.backgroundColor = v;
   }

   e = document.encoder['L_' + n];
   
   if (e_fld)
   {
      e.style.backgroundColor = v;
   }
}


function WriteTable(AdvMode, LettersToSet)
{
   var e = document.getElementById('table');
   var s = '', i;

   Advanced = AdvMode;
	
   s = '<table align=center>';
   for (i = 0; i < Letters.length; i ++)
   {
      var c = Letters.charAt(i);
	  var cVal = LettersToSet.charAt(i);
      
      if (i % TableColumns == 0)
      {
         s += '<tr>';
      }
      
      s += '<td align=right><b>' + c + ':</b> <input type=text name=L_' +
         c + ' value="' + cVal + '" size=2 onblur="RecalcAlphabet()">';
      
      if (Advanced)
      {
         s += '<br><span style="font-size: 0.8em">&nbsp; Lock: ' +
	    '<input type=checkbox style="font-size: 0.8em" name="CHK_' + c + 
	    '" onClick="LockField(this.name)">';
	 s += '<br><select style="font-size: 0.8em" name="COL_' + c + 
	    '" onClick="Colorize(this.name, this.value)">';
<?php
	
	foreach (array(
			'white' => 'White',
			'#FF9999' => 'Red',
			'pink' => 'Pink',
			'#FF7F50' => 'Coral',
			'#F4A460' => 'Sand',
			'#DEB887' => 'Wood',
			'#F0E68C' => 'Khaki',
			'yellow' => 'Yellow',
			'#7FFF00' => 'Lime',
			'lightgreen' => 'Lt. Green',
			'cyan' => 'Cyan',
			'LightBlue' => 'Lt. Blue',
			'aqua' => 'Aqua',
			'violet' => 'Violet',
			'#c0c0c0' => 'Silver'
		) as $k => $v) {
		echo 's += \'<option value="' . $k . '" style="background-color: ' . $k . '">' . htmlspecialchars($v) . '</option>\';' . "\n";
	}
	
	?>

	 s += '</select></span>';
      }
      
      s += '</td>';

      if (i % TableColumns == TableColumns - 1)
      {
         s += '</tr>';
      }
   }
   
   while (i % TableColumns != 0)
   {
      s += '<td>&nbsp;</td>';
      
      if (i % TableColumns == TableColumns - 1)
      {
         s += '</tr>';
      }
      
      i ++;
   }
   
   if (! Advanced)
   {
      s += '<tr><td align=center colspan=' + TableColumns + '>' +
         '<font size="-1">' +
         '<a href="#" onclick="WriteTable(true, Letters);">' + 
	 'Advanced View</a></font></td></tr>';
   }

   s += '</table>';
	
   e.innerHTML = s;
   
   RecalcAlphabet();
}
   

function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.Util_Loaded) ||
       (! document.getElementById('recode')) || 
       (! document.getElementById('table')) || 
       (! document.getElementById('alphabet')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   
   WriteTable(false, Letters);
   
   upd();
}

window.setTimeout('start_update()', 100);

// --></script>
<?php
}

