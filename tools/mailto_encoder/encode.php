<?php

include '../../functions.inc';


function Insert_JS() {
	
	?>
<SCRIPT LANGUAGE="javascript" type='text/javascript' src="email.js"></SCRIPT>
<SCRIPT LANGUAGE="javascript" type='text/javascript' src="encode.js"></SCRIPT>
<?php
}

StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'HTML Encoder',
		'topic' => 'mailto',
		'callback' => 'Insert_JS'
	));

?>

<p>Because there were so many requests for encoding extra information in the
mailto: link and because other people wanted to encode arbitrary HTML, I
have written this page to allow you to do just that.  It's pretty simple.
Just enter the stuff you want encoded in the top, select the encoding
method, press the button.</p>
	
<p>This does not make a "mailto" link for you.  If you want that, try out my
<a href="simple.php">simple</a> or <a href="custom.php">custom</a> mailto
encoders.  For more information on the mailto encoders, see the <a
href="index.php">main page</a>.</p>

<FORM NAME="EncodeForm" METHOD="POST" ACTION="javascript:RunEncode();">

<?php Section('Step 1:  HTML / Whatever'); ?>

<p>Just type your HTML code here:<br>
<textarea name="PlainText" rows=5 cols=70 wrap=soft></TEXTAREA></p>

<?php Section('Step 2:  Encoding Options'); ?>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <td><b>Encoding Strength:</b></td>
  <td><select name="JavascriptStrength">
      <option value="Normal">Normal</option>
      <option value="Break">Break up strings</option>
      <option value="Subst" SELECTED>Substitutions (My Favorite)</option>
      <option value="Double">Double-Escaped</option>
      </select>
  </td>
</tr>
</table>


<?php Section('Step 3:  Generate HTML'); ?>

<p>Press this button to generate the code that you will copy into your web
page's source.</p>

<?php MakeBoxTop('center'); ?>
<INPUT TYPE="SUBMIT" VALUE="Encode HTML">
<?php MakeBoxBottom(); ?>
<P><B>Your final HTML code is:</B><BR>
<textarea name="CodeText" rows=5 cols=70 wrap=soft></TEXTAREA>
</form>
<BR>... View the code in a <A
HREF="javascript:CreatePopup(document.EncodeForm.CodeText.value);">popup
window</A>.</p>

<P><font size="-1">Please don't steal this script and
say that you wrote it.  It took me <b>forever</b> to make this
little bugger.  You can copy it and use it on your web site or
whatever.  Just please give me credit by mentioning my name (Tyler
Akins) and provide a link to my site (<a
href="http://rumkin.com/tools/mailto_encoder">http://rumkin.com/tools/mailto_encoder</a>).</p>

<?php

StandardFooter();
