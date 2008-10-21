<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Double Transposition',
		     'topic' => 'cipher',
		     'callback' => 'insert_js'));
?>

<p>A double transposition, also known as a double columnar transposition,
was used by the U.S. Army in World War I, and it is very similar to the
German's <a href="ubchi.php">&Uuml;bchi</a> code.  It is just a <a
href="coltrans.php">columnar transposition</a> followed by another columnar
transposition.  If you like, this can enter in the <a href="#" 
onclick="load_k3(); return false">third part of Kryptos</a> and decode it
for you.  I've made the three offset letters (y, a, r) lowercase as well as
the first letter of the decoded message to help show you where they are.</p>

<form name="encoder" method=post action="#" onsubmit="return false;">
<p><select name=encdec><option value="1">Encrypt
<option value="-1">Decrypt</select></p>
<p><select name=colkey1_type><option value="num">Numeric Key - Spaced Numbers
<option value="alpha">Key Word(s) - Duplicates numbered forwards
<option value="ahpla">Key Word(s) - Duplicates numbered backwards
</select>:  <input type=text name=colkey1><br>
The resulting columnar key:  <b><span id='colkey1_out'></span></b></p>
<p><select name=colkey2_type><option value="num">Numeric Key - Spaced Numbers
<option value="alpha">Key Word(s) - Duplicates numbered forwards
<option value="ahpla">Key Word(s) - Duplicates numbered backwards
</select>:  <input type=text name=colkey2><br>
The resulting columnar key:  <b><span id='colkey2_out'></span></b></p>
<p><textarea name="text" rows="5" cols="80"></textarea></p>
</form>
<p>This is your encoded or decoded text:</p>
<?PHP MakeBoxTop('center'); ?>
<span id='output'></span>
<?PHP
MakeBoxBottom();

StandardFooter();



function insert_js()
{
?>
<script language="JavaScript" src="js/util.js"></script>
<script language="JavaScript" src="js/coltrans.js"></script>
<script language="JavaScript"><!--
// This code was written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

var colkey1_text = '1', colkey2_text = '1';

function upd()
{
   var key1unchanged = 1, key2unchanged = 1;
   
   if (IsUnchanged(document.encoder.colkey1) + 
       IsUnchanged(document.encoder.colkey1_type) < 2)
   {
      key1unchanged = 0;
      colkey1_text = MakeColumnKey(document.encoder.colkey1_type.value,
         document.encoder.colkey1.value);
      var c = document.getElementById('colkey1_out');
      c.innerHTML = colkey1_text;
   }
      
   if (IsUnchanged(document.encoder.colkey2) + 
       IsUnchanged(document.encoder.colkey2_type) < 2)
   {
      key2unchanged = 0;
      colkey2_text = MakeColumnKey(document.encoder.colkey2_type.value,
         document.encoder.colkey2.value);
      var c = document.getElementById('colkey2_out');
      c.innerHTML = colkey2_text;
   }
      
	
   if (IsUnchanged(document.encoder.text) *
       IsUnchanged(document.encoder.encdec) *
       key1unchanged * key2unchanged)
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
      var c = document.encoder.text.value;
      c = ColTrans(document.encoder.encdec.value * 1, c, colkey1_text);
      c = ColTrans(document.encoder.encdec.value * 1, c, colkey2_text);
      e.innerHTML = SwapSpaces(HTMLEscape(c));
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

   if ((! document.ColTrans_Loaded) || (! document.Util_Loaded) ||
       (! document.getElementById('output')) ||
       (! document.getElementById('colkey1_out')) ||
       (! document.getElementById('colkey2_out')))
   {
      window.setTimeout('start_update()', 100);
      return;
   }
   upd();
}

	
function load_k3()
{
   document.encoder.encdec.value = -1;
   document.encoder.colkey1_type.value = "ahpla";
   document.encoder.colkey1.value = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
   document.encoder.colkey2_type.value = "ahpla";
   document.encoder.colkey2.value = "aaaaaaaaaaaaaaaaaaaaa";
   document.encoder.text.value = "ENDyaHrOHNLSRHEOCPTEOIBIDYSHNAIA\n" +
      "CHTNREYULDSLLSlLNOHSNOSMRWXMNE\n" +
      "TPRNGATIHNRARPESLNNELEBLPIIACAE\n" +
      "WMTWNDITEENRAHCTENEUDRETNHAEOE\n" +
      "TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR\n" +
      "EIFTBRSPAMHNEWENATAMATEGYEERLB\n" +
      "TEEFOAsFIOTUETUAEOTOARMAEERTNRTI\n" +
      "BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB\n" +
      "AECTDDHILCEIHSITEGOEAOSDDRYDLORIT\n" +
      "RKLMLEHAGTDHARDPNEOHMGFMFEUHE\n" +
      "ECDMRIPFEIMEHNLSSTTRTVDOHW?";
}


window.setTimeout('start_update()', 100);

// --></script>
<?PHP
}
