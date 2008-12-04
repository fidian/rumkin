<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
$Extra_Pre = '../';
include '../common.inc';
CheckForLogin('restricted');
SprintStandardHeader('Test Message Sender', 1);

foreach (array(
		'message',
		'mfrom',
		'mto'
	) as $what) {
	$$what = '';
	
	if (isset($_POST[$what]))$$what = $_POST[$what];
}

?>
	
	<form method=post action="<?php echo $PHP_SELF ?>">
	From: <input type=text value="<?php echo $mfrom ?>" name="mfrom"><br>
	To: <input type=text value="<?php echo $mto ?>" name="mto"><br>
	<textarea rows=5 cols=60 name="message"><?php echo htmlspecialchars($message) ?></textarea><br>
	<input type=submit value="Send Message">
	</form>
<?php

if ($message != '' and $mto != '') {
	echo "Sending message ...<br>\n";
	flush();
	
	if ($mfrom != '')$ret = SendSprintSMS($mto, $message, $mfrom, 0);
	else $ret = SendSprintSMS($mto, $message, '', 0);
	echo SprintErrorDesc($ret);
}

