<?php
/* Single Page Topic Viewer for Feedback System
 * 
 * Copyright (C) 2004 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the legal.txt file for more information
 * See http://rumkin.com/software/feedback/ for more information about the
 * scripts */
include 'functions.inc';
$topic = '';
$theme = '';
$page = '';

if (isset($_GET['topic']))$topic = $_GET['topic'];

if (isset($_POST['topic']))$topic = $_POST['topic'];

if (isset($_GET['theme']))$theme = $_GET['theme'];

if (isset($_POST['theme']))$theme = $_POST['theme'];

if (isset($_GET['page']))$page = $_GET['page'];

if (isset($_POST['page']))$page = $_POST['page'];

if ($theme == '' || $topic == '') {
	TinyHeader('Invalid');
	echo 'Invalid parameters.';
	TinyFooter();
	exit;
}

if (isset($_POST['f_name']) && isset($_POST['f_mesg'])) {
	$fn = $_POST['f_name'];
	$fm = $_POST['f_mesg'];
	
	if (get_magic_quotes_gpc()) {
		$topic = stripslashes($topic);
		$theme = stripslashes($theme);
		$fn = stripslashes($fn);
		$fm = stripslashes($fm);
		$page = stripslashes($page);
	}
	
	$Msg = Topic_Post($topic, $fn, $fm, $page);
	
	/* Redirect to the "Get" version so a refresh doesn't
	 * post the same message twice.
	 * Include the current time to force a refresh instead of
	 * pulling it from cache */
	Redirect('/topic.php' . '?&msg=' . urlencode($Msg) . '&theme=' . urlencode($theme) . '&topic=' . urlencode($topic) . '&time=' . time());
}

// UseCachedVersion(LastMessageTime($topic));
TinyHeader('Topic Discussion', $theme, 'Topic_FormJavascript');

if (isset($_GET['msg']) && isset($GLOBALS['Post Message'][$_GET['msg']])) {
	echo '<b>' . $GLOBALS['Post Message'][$_GET['msg']] . "</b><br>\n";
}

ShowTopic($topic, $theme, 50, $page);
TinyFooter();


function TinyHeader($title = '', $theme = 'normal', $callback = '') {
	
	?><HTML><HEAD><TITLE><?php echo $title ?></TITLE>
<?php
	
	if ($callback != '') {
		$callback();
	}
	
	?>
<!-- These pages are (C)opyright 2002-2006, Tyler Akins -->
</HEAD>
<link rel="stylesheet" type="text/css" href="/inc/css/base.css">
<link rel="stylesheet" type="text/css" href="/inc/css/<?php echo $theme ?>.css">
<body class="r_chat">
<?php
}


function TinyFooter() {
	echo "</body></html>\n";
}

