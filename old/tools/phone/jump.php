<?php
/* Mobile Phone File Uploader
 * 
 * Copyright (C) 2003-2006 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 */
require_once('inc/common.php');
NoCacheHeaders();

if (isset($_REQUEST['num'])) {
	$Info = GetJumpCodeInfo($_REQUEST['num']);
	
	if ($Info !== false) {
		// Send the file to the user.
		$page = 'dl.php?';
		
		if (RequiresGCDFile())$page = 'desc.php?';
		
		if (isset($_REQUEST['phoneid'])) {
			$page .= 'phoneid=' . urlencode($_REQUEST['phoneid']) . '&';
		} else {
			$id = PhoneDataGet('ID');
			
			if ($id !== false) {
				$page .= 'phoneid=' . urlencode($_REQUEST['phoneid']) . '&';
			}
		}
		
		$page .= 'num=' . urlencode($_REQUEST['num']);
		RedirectURL($GLOBALS['Uploader Base URL'] . $page);
		return;
	}
	
	// Error message.
	if (IsWapCapable()) {
		header('Content-Type: text/vnd.wap.wml');
		echo "<?xml version=\"1.0\"?>\n";
		
		?><!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>
<head>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<card id="error" title="Error">
<p>I am unable to find the jump code <?php echo $_REQUEST['num'] ?>.</p>
<p>Back to the <a title="BACK" href="jump.php">jump page</a>.</p>
</card>
</wml>
<?php
	} else {
		
		?><html><head><title>Error</title>
<body bgcolor=#FFFFFF>
<p>I am unable to find the jump code <?php echo $_REQUEST['num'] ?>.</p>
<p>Back to the <a href="jump.php">jump page</a>.</p>
</body></html>
<?php
	}
	
	return;
}

$id = PhoneDataGet('ID');

if (IsWapCapable()) {
	header('Content-Type: text/vnd.wap.wml');
	echo "<?xml version=\"1.0\"?>\n";
	
	?><!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>
<head>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<card id="index" title="Rumkin.com">
<p>
<img src="img/rumkin.wbmp" alt="Rumkin.com" />
<br />
Jump Code:
<input type="text" name="num" value="" format="*N" />
<a title="JUMP" href="jump.php?<?php
	
	if ($id !== false) {
		echo 'phoneid=' . urlencode($id) . '&';
	}
	
	?>num=$(num)">Get File</a>
</p>
<p><?php echo GetMakeModelSize() ?><br />
<a title="INFO" href="phoneinfo.php">More Info</a>
 - <a href="gallery.php">Gallery</a>
</p>
</card>
</wml>
<?php
} else {
	
	?><html><head><title>Quick Jump</title>
<body bgcolor=#FFFFFF>
<p><img src="img/rumkin.jpg" alt="Rumkin"></p>
<form method=post action=jump.php>
<p>Enter Jump Code:<br>
<input type=text name=num>
<br>
<input type=submit value="Download"><?php
	
	if ($id !== false) {
		echo '<input type="hidden" name="phoneid" value="' . $id . '" />';
	}
	
	?>
</p></form>
<p><?php echo GetMakeModelSize() ?><br />
<a href="phoneinfo.php">More Info</a></p>
</body></html>
<?php
}

