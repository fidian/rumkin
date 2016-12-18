<?php

$files = array(
	'email_regexp.php' => 'PHP version of email validator that is based on regular expression rules.',
	'email_test.php' => 'Alternate PHP email validator that does not use any PCRE functions',
	'email_test.js' => 'JavaScript email validator',
);

if (isset($_GET['file'])) {
	if (isset($files[$_GET['file']])) {
		header('Content-type: text/plain');
		readfile($_GET['file']);
		exit();
	}
}

require('../../functions.inc');
StandardHeader(array(
		'title' => 'Download Email Validation',
		'topic' => 'email',
	));

?>

<p>Here's the email validation rules as source code.  Licensing information
for each one is included at the top of the file.</p>

<dl>

<?PHP

foreach ($files as $name => $desc) {
	echo '<dt><a href="?file=' . urlencode($name) . '">' . htmlspecialchars($name) . '</a> (' . FidianFileSize($name) . ")</dt>\n";
	echo '<dd>' . htmlspecialchars($desc) . "</dd>\n";
}

?>

</dl>

<?php

StandardFooter();
