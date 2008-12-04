<?php
/* -*- php -*-
 * / * Documentation for D&D Helper
 * / */
include('download/psr.inc');
session_start();


// handle uploads
$IsNewFile = false;

foreach ($HTTP_POST_FILES as $File) {
	$_SESSION['psr_data'] = GeneratePSRData($File['tmp_name'], false);
	$IsNewFile = true;
	$_SESSION['psr_data_time'] = date('F j, Y, g:i a');
}

if (! isset($_SESSION['psr_data']))$_SESSION['psr_data'] = array();

if (! isset($_SESSION['psr_data_time']))$_SESSION['psr_data_time'] = date('F j, Y, g:i a');
include('../../functions.inc');
StandardHeader(array(
		'title' => 'PSR Testing',
		'topic' => 'dnd_helper'
	));

?>

<table border=1 cellpadding=3 cellspacing=2 align=center bgcolor=#222200>
<tr><td bgcolor=#FFFFEE align=center>
<form method=post action=test_psr.php enctype=multipart/form-data>
Upload a new PSR file:  <input name="the_file" type=file> -
<input type=submit value="Test File">
</form>
<form method=post action=test_psr.php>
<input type=submit value="Generate Again With Same File">
</form>
</td></tr>
<?php

if ($IsNewFile) { ?>
<tr><td align=center bgcolor=#FFFFEE>This is a new file.</td></tr>
<?php
} ?>
<tr><Td align=center bgcolor=#FFFFEE>Current file is 
<?php echo strlen($_SESSION['psr_data']) ?> bytes,<br>
Uploaded at <?php echo $_SESSION['psr_data_time'] ?></td></tr>
</table>
	
<p><?php

if (count($_SESSION['psr_data']) < 1) {
	echo 'There is no data from whith PSR output may be generated.';
} else {
	$results = GeneratePSR($_SESSION['psr_data'], 1);
	
	// Generate the message
	while (count($results)) {
		$r = array_shift($results);
		echo nl2br(htmlspecialchars($r));
		
		if (count($results))echo "<br>\n";
	}
}

echo "</p>\n";
StandardFooter();
