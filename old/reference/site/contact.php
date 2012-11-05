<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Contact / Feedback Form',
		'topic' => 'rumkin'
	));

if (SendEmail()) {
	StandardFooter();
	exit;
}

?>

<p>Need to email the administrator of Rumkin.com?  Feel free to email
<?php echo HideEmail('fidian', 'rumkin.com') ?> or use this online feedback
form to get the job done quickly.  Make sure to use a good, descriptive
subject line.</p>
	
<p>If you are just asking about the name "rumkin.com", you might do better
by checking out the <a href="/reference/site/rumkin.php">Why Rumkin?</a> page.</p>

<p>If you are asking to exchange links because I happen to be ranked highly
on a search engine, do not bother.  Your email will be happily deleted.</p>

<form method=post action="contact.php">
<table border=0 cellspacing=3 cellpadding=0>
<tr><th align=right><i>Your Email Address:</i></th>
<td><input type=text size=50 name=from value="<?php

if (isset($_POST['from']))echo $_POST['from'];

?>"></td></tr>
<tr><th align=right><i>Message Subject:</i></th>
<td><input type=text size=50 name=subj value="<?php

if (isset($_POST['subj']))echo $_POST['subj'];

?>"></td></tr>
<tr><td colspan=2><textarea name=body rows=10 cols=70><?php

if (isset($_POST['body']))echo htmlspecialchars($_POST['body']);

?></textarea></td></tr>
<tr><td colspan=2 align=center>
<input type=submit value="Send Mail"></td></tr>
</table>

<?php

StandardFooter();

/* Return true if email was sent
 * Spit out error message and return false if any problems. */
function SendEmail() {
	if (isset($_POST['from']) || isset($_POST['subj']) || isset($_POST['body'])) {
		$err = array();
		
		// Do our error checking.
		if (! isset($_POST['from']) || $_POST['from'] == '' || ! strpos($_POST['from'], '@'))$err[] = 'You must enter a good "from" address.';
		
		if (! isset($_POST['subj']) || $_POST['subj'] == '')$err[] = 'You must enter a good subject.';
		
		if (! isset($_POST['body']) || $_POST['body'] == '')$err[] = 'You need to enter a message.';
		
		if (count($err)) {
			MakeBoxTop('center');
			echo join('<br>', $err);
			MakeBoxBottom();
			return 0;
		}
		
		mail('fidian@rumkin.com', '[Rumkin.com] ' . $_POST['subj'], $_POST['body'], 'From: ' . $_POST['from'] . "\r\n" . 'Return-Path: ' . $_POST['from'] . "\r\n");
		MakeBoxTop('center');
		echo 'Mail sent!';
		MakeBoxBottom();
		return 1;
	}
	
	return 0;
}

