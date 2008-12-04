<?php

include '../../functions.inc';


function Insert_JS() {
	
	?>
<SCRIPT LANGUAGE="javascript" type='text/javascript' src="email.js"></SCRIPT>
<SCRIPT LANGUAGE="javascript" type='text/javascript' src="simple.js"></SCRIPT>
<?php
}

StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'Simple Mailto Encoder',
		'topic' => 'mailto',
		'callback' => 'Insert_JS'
	));

?>

<p>This is a greatly simplified version of the <a
href="custom.php">custom mailto encoder</a>.  Feel free to go to the <a
href="index.php">main page</a> for more information on what this does.</p>

<p>Just tell me the email address you want to link to on your web page, and
this will generate the HTML code for you to insert.  It will use JavaScript
to write your email address, and will display a message for the poor
unfortunate souls that do not use JavaScript in their browser.</p>
	
<p>I tried to make sure that the generated JavaScript code isn't all that
big, but it still is a hassle and one block of code is required for each
address.</p>

<FORM NAME="MailtoForm" METHOD="POST" ACTION="javascript:RunEncode();">

<?php Section('Step 1:  Email Address'); ?>

<p>Please enter your email address here.  You can feel safe about
typing it in here because all of the processing is done on your
computer and it does not relay any information to any other computer.</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <th align=right>Email Address:</th>
  <td><input type=text name="Email" size=40 value="user@host.name"></td>
  <td><i>Mandatory</i></td>
</tr>
</table>

<?php Section('Step 2:  Link Text (Optional)'); ?>

<p>If you want your name or some other text displayed as the link instead of
your email address, just enter it here.  If this is blank, the link will
show your email address, which is usually what you want.</p>

<table border=1 cellspacing=1 cellpadding=4>
<tr>
  <th align=right>Link Text:</th>
  <td><input type=text name="TheLink" size=40></td>
  <td><i>Optional</i></td>
</tr>
</table>

<?php Section('Step 3: Press The Button'); ?>

<?php MakeBoxTop('center'); ?>
<INPUT TYPE="SUBMIT" VALUE="Encode Address">
<?php MakeBoxBottom(); ?>

<p><B>Your final HTML code is:</B><BR>
<textarea name="CodeText" rows=5 cols=70 wrap=soft></TEXTAREA>
<BR>... View the code in a <A
HREF="javascript:CreatePopup(document.MailtoForm.CodeText.value);">popup
window</A>.</p>

<p>Just copy the above HTML code and paste it into the source of your web
page, and you will have a link that spambots can not harvest (to the best of
my knowledge), and ordinary browsers will easily be able to see.  In case
you are wondering, I split up the JavaScript string into chunks to foil
spambots -- many are now written to automatically decode %xx hex strings
into their equivalent values.  With it broken into chunks, they get
"user@h"+"ost.na"+"me" or something similar.</p>

<P><font size="-1">Please don't steal this script and
say that you wrote it.  It took me <b>forever</b> to make this
little bugger.  You can copy it and use it on your web site or
whatever.  Just please give me credit by mentioning my name (Tyler
Akins) and provide a link to my site (<a
href="http://rumkin.com/tools/mailto_encoder">http://rumkin.com/tools/mailto_encoder</a>).</p>

<?php

StandardFooter();
