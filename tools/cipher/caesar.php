<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Caesarian Shift',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));
?>

<p>This is a standard Caesarian Shift cipher encoder, also known as 
a rot-N encoder and is also a style of substitution cipher.  This way, you can add one, two, or any number up
to 25 to your string and see how it changes.  This is an offshoot of the <a
href="rot13.php">rot13</a> encoder on this web site.  To perform this shift
by hand, you could just write the alphabet on two strips of paper.  Line
them up so the top strip's A matches the bottom strip's D (or something) and
then you can encode.  A simple test to see how this works would be to <a
href="#" onclick="insert_alphabet(); return false">insert the alphabet</a>
into the encoder and then change the values of N.</p>
	
<p>This sort of cipher can also be known as a wheel cipher.  This is where
an inner wheel has the alphabet around the outside, and that is placed upon
an outer wheel, also with the alphabet going around it.  You can rotate the
wheels so that ABC lines up with ABC, or ABC may line up with QRS.</p>
	
<p>To encode something, just pick an N and type in your message.  To decode
something, subtract the encryption N from 26 and it should be decoded for
you.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<P>N:  <select name=N>
<?PHP
   for ($i = 0; $i < 26; $i ++)
   {
      echo "<option value=$i>$i</option>\n";
   }
?>
</select>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?PHP MakeBoxTop('center'); ?>
<span id='caesar'></span>
<?PHP
MakeBoxBottom();

StandardFooter();



function insert_js()
{
?><script language="JavaScript" src="js/caesar.js"></script>
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

   if ((! document.Caesar_Loaded) || (! document.Util_Loaded) ||
       (! document.getElementById('caesar')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}


function upd()
{
   if (IsUnchanged(document.encoder.N) *
       IsUnchanged(document.encoder.text))
   {
      window.setTimeout('upd()', 100);
      return;
   }
   
   var e = document.getElementById('caesar');

   if (document.encoder.text.value == '')
   {
      e.innerHTML = 'Type in a message and see the results here!';
   }
   else
   {
      e.innerHTML = SwapSpaces(HTMLEscape(Caesar(1, document.encoder.text.value, 
         document.encoder.N.value * 1)));
   }
   
   window.setTimeout('upd()', 100);
}

function insert_alphabet()
{
   document.encoder.text.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}

window.setTimeout('start_update()', 100);

// --></script>
<?PHP
}
