<?php
/* Example Include File for Feedback System
 * 
 * Copyright (C) 2004 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the legal.txt file for more information
 * See http://rumkin.com/software/feedback/ for more information about the
 * scripts */
include 'topic.php';
$GLOBALS['Topic Reserved Name'] = 'Your Name';


function OpenDBConnection($Name) {
	$dbconn = mysql_pconnect('localhost', 'user', 'pass');
	mysql_select_db('discuss', $dbconn);
	return $dbconn;
}

$GLOBALS['Logins'] = array(
	'admin',
	md5('admin password')
);


function CheckForLogin($unused) {
	/* This is similar to what I use to check if a person is allowed
	 * access to particular pages on my site.
	 * Greatly simplified, but should work. */
	if (isset($_SERVER['PHP_AUTH_USER'])) {
		$_SESSION['Auth_User'] = $_SERVER['PHP_AUTH_USER'];
		$_SESSION['Auth_Pass_MD5'] = md5($_SERVER['PHP_AUTH_PW']);
	}
	
	if (! isset($_SESSION['Auth_User']) || ! isset($GLOBALS['Logins'][$_SESSION['Auth_User']]) || $GLOBALS['Logins'][$_SESSION['Auth_User']] != $_SESSION['Auth_Pass_MD5']) {
		// User didn't authenticate
		header('WWW-Authenticate: Basic realm="Sprint Uploader"');
		header('HTTP/1.0 401 Unauthorized');
		echo 'Sorry.  You need admin rights.';
		exit;
	}
}


function Redirect($URL) {
	header('Location: ' . $URL);
	header('Connection: close');
	exit(0);
}


function UseCachedVersion($d) {
	/* The real version handles browser-side caching of the page to save
	 * on bandwidth.
	 * It is not necessary, thus not included. */
}


function Section($n) {
	echo "<h2>$n</h2>\n";
}

