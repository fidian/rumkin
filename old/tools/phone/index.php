<?php

require_once('inc/common.php');

if (IsPhone()) {
	require('jump.php');
	exit();
}

PageHeader('Phone Uploader');

?>

No content yet.

<?php

PageFooter();