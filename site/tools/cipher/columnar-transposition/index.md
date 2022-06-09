----
title: Columnar Transposition
summary: Write a message as a long column and then swap around the columns.  Read the message going down the columns. A simple cypher, but one that is featured on the Kryptos sculpture at the CIA headquarters.
----
<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Columnar Transposition',
		'topic' => 'cipher',
		'callback' => 'insert_js'
	));

?>

<p>A columnar transposition, also known as a row-column transpose,
 is a very simple cipher to perform by hand.
First, you write your message in columns.  Then, you just rearrange the
columns.  For example.  I have the message, "Which wristwatches are swiss
wristwatches."  You convert everything to upper case and write it without
spaces.  When you write it down, make sure to put it into columns and number
them.  Let's use five columns.</p>

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><td>&nbsp;</td><th>Unencoded</th><th>Rearranged</th></tr>
<tr><td valign=top>
<b>Column #:</b>
</td><td>
<tt><b><u>4 2 5 3 1</u></b><br>
W H I C H<br>
W R I S T<br>
W A T C H<br>
E S A R E<br>
S W I S S<br>
W R I S T<br>
W A T C H<br>
E S</tt>
</td><td>
<tt><b><u>1 2 3 4 5</u></b><br>
H H C W I<br>
T R S W I<br>
H A C W T<br>
E S R E A<br>
S W S S I<br>
T R S W I<br>
H A C W T<br>
&nbsp; S &nbsp; E</tt>
</td></tr>
</table>

<p>Now, you just read the columns down in the order that you number them.
Above, you will see the key is 4 2 5 3 1, which means you write down the
last column first, then the second, then the fourth, the first, and finally
the middle.  When you are all done, you will get
"HTHESTHHRASWRASCSCRSSCWWWESWWEIITAIIT".  I can put the example's information
into the encoder for you:
<a href="#" onclick="insert_example(); return false">Encode</a> or
<a href="#" onclick="insert_example2(); return false">Decode</a></p>

<P>This columnar transposition cipher implementation will also move spaces
around, so you can take "a b c" with a key of "2 1" and get "&nbsp;&nbsp;abc" (note
the two spaces in front).  I suggest you remove all spaces before you encode
the text, but they should be preserved even if you don't.  Newlines are ignored and not taken into consideration.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name=encdec><option value="1">Encrypt
<option value="-1">Decrypt</select></p>
<p><select name=colkey_type><option value="num">Numeric Key - Spaced Numbers
<option value="alpha">Key Word(s) - Duplicates numbered forwards
<option value="ahpla">Key Word(s) - Duplicates numbered backwards
</select>:  <input type=text name=colkey><br>
The resulting columnar key:  <b><span id='colkey_out'></span></b><br>
<input type=checkbox name="use_as_column_order"> - <label for="use_as_column_order">Use the key as column order instead of column labels</label></p>
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
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

var colkey_text = '1';

function upd()
{
   var keyunchanged = 1;

   if (IsUnchanged(document.encoder.colkey) +
       IsUnchanged(document.encoder.colkey_type) < 2)
   {
      keyunchanged = 0;
      colkey_text = MakeColumnKey(document.encoder.colkey_type.value,
         document.encoder.colkey.value);
      var c = document.getElementById('colkey_out');
      c.innerHTML = colkey_text;
   }


   if (IsUnchanged(document.encoder.text) *
	   IsUnchanged(document.encoder.use_as_column_order) *
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
	   var ckt = colkey_text;
	   if (document.encoder.use_as_column_order.checked) {
		   original = ckt.split(' ');
		   ckt = new Array(original.length);

			for (var i = 0; i < original.length; i ++) {
				ckt[original[i] - 1] = i + 1;
			}

		   ckt = ckt.join(' ');
		}
      e.innerHTML = SwapSpaces(HTMLEscape(ColTrans(document.encoder.encdec.value * 1,
         document.encoder.text.value, ckt)));
   }

   window.setTimeout('upd()', 100);
}

function insert_example()
{
   document.encoder.encdec.value = "1";
   document.encoder.colkey.value = "4 2 5 3 1";
   document.encoder.colkey_type.value = "num";
   document.encoder.use_as_column_order.checked= false;
   document.encoder.text.value = "WHICHWRISTWATCHESARESWISSWRISTWATCHES";
}

function insert_example2()
{
   document.encoder.encdec.value = "-1";
   document.encoder.colkey.value = "4 2 5 3 1";
   document.encoder.colkey_type.value = "num";
   document.encoder.use_as_column_order.checked = false;
   document.encoder.text.value = "HTHESTHHRASWRASCSCRSSCWWWESWWEIITAIIT";
}

function start_update()
{
   if (! document.getElementById)
   {
      alert('Sorry, you need a newer browser.');
      return;
   }

   if ((! document.ColTrans_Loaded) || (! document.Util_Loaded) ||
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

