<?php

function FileSizeBytes($path) {
	$bytes = filesize($path);
	$bytes_new = '';
	
	while ($bytes) {
		if ($bytes_new != '')$bytes_new = ',' . $bytes_new;
		$bytes_new = substr($bytes, - 3) . $bytes_new;
		$bytes = substr($bytes, 0, - 3);
	}
	
	echo $bytes_new;
}


function FidianFileSize($path, $UseHtml = true, $PathIsBytes = false) {
	$scale = array(
		'b',
		'k',
		'm',
		'g'
	);
	
	if ($PathIsBytes)$bytes = $path;
	else $bytes = filesize($path);
	$num = 0;
	
	while ($bytes > 1024 && isset($scale[$num + 1])) {
		$bytes /= 1024;
		$num ++;
	}
	
	if ($bytes < 10) {
		$bytes *= 10;
		settype($bytes, 'integer');
		$bytes /= 10;
	} else {
		settype($bytes, 'integer');
	}
	
	if ($UseHtml)return $bytes . '<small>&nbsp;' . $scale[$num] . '</small>';
	return $bytes . ' ' . $scale[$num];
}


function Redirect($URL, $flags = false) {
	if (! is_array($flags))$flags = array();
	$URL = MakeAbsoluteURL($URL);
	
	if (isset($flags['permanent']))header('HTTP/1.0 301 Moved Permanently');
	header('Location: ' . $URL);
	header('Connection: close');
	exit();
}


function MakeAbsoluteURL($URL) {
	if (preg_match('/^https?:\\/\\//s', $URL)) {
		return $URL;
	}
	
	if ($URL[0] != '/') {
		$URL2 = $_SERVER['REDIRECT_URL'];
		$pos = strrpos($URL2, '\\');
		
		if ($pos) {
			$URL2 = substr($URL2, 0, $pos);
		}
		
		$URL = $URL2 . $URL;
	}
	
	$Dirs = explode('/', $URL);
	array_shift($Dirs);
	$D2 = array();
	
	foreach ($Dirs as $d) {
		if ($d == '..' && count($D2)) {
			array_pop($D2);
		} elseif ($d != '.' && $d != '') {
			$D2[] = $d;
		}
	}
	
	$URL = '/' . implode('/', $D2);
	
	if ($_SERVER['SERVER_PORT'] == 443)return 'https://' . $_SERVER['HTTP_HOST'] . $URL;
	return 'http://' . $_SERVER['HTTP_HOST'] . $URL;
}

/* Tells the browser to use the cached version if they have a copy
 * that was made at $timestamp or later.
 * Also checks the PHP file for any updates, but will not check any
 * include files that you may have used.
 * Thanks to Alexandre Alapetite
 * http://alexandre.alapetite.net/doc-alex/php-http-304/index.en.html */
function UseCachedVersion($timestamp) {
	if (headers_sent())return;
	
	if (isset($_SERVER['SCRIPT_FILENAME']))$scriptname = $_SERVER['SCRIPT_FILENAME'];
	elseif (isset($_SERVER['PATH_TRANSLATED']))$scriptname = $_SERVER['PATH_TRANSLATED'];
	else return;
	$scriptmod = filemtime($scriptname);
	
	if ($scriptmod && scriptmod > $timestamp)$timestamp = $scriptmod;
	
	if ($timestamp > time())$timestamp = time();
	$lastmod = gmdate('D, d M Y H:i:s \G\M\T', $timestamp);
	Header('Cache-Control: public, must-revalidate, max-age=0');
	Header('Last-Modified: ' . $lastmod);
	
	if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
		if ($_SERVER['HTTP_IF_MODIFIED_SINCE'] == $lastmod) {
			header('HTTP/1.0 304 Not Modified');
			exit();
		}
	}
	
	if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'HEAD') {
		exit();
	}
}


function HoneypotEmail() {
	$hp = array(
		'nonprepayment@rumkin.com',
		'jsimmons@rumkin.com',
		'info@rumkin.com',
		'1234@rumkin.com'
	);
	$i = rand(0, count($hp) - 1);
	return $hp[$i];
}


function IsMobilePhone() {
	if (! isset($_SERVER['HTTP_USER_AGENT']))return false;
	$UA = $_SERVER['HTTP_USER_AGENT'];
	
	if (preg_match('/MobilePhone (.+)\//i', $UA) || preg_match('/compatible; (Blazer [0-9\.]+)/i', $UA) || preg_match('/compatible; (Elaine\/[0-9\.]+)/i', $UA))return true;
	return false;
}


function HideEmail($user, $host) {
	$MailLink = '<a href="mailto:' . $user . '@' . $host . '">' . $user . '@' . $host . '</a>';
	$MailLetters = '';
	
	for ($i = 0; $i < strlen($MailLink); $i ++) {
		$l = substr($MailLink, $i, 1);
		
		if (strpos($MailLetters, $l) === false) {
			$p = rand(0, strlen($MailLetters));
			$MailLetters = substr($MailLetters, 0, $p) . $l . substr($MailLetters, $p, strlen($MailLetters));
		}
	}
	
	$MailLettersEnc = str_replace('\\', '\\\\', $MailLetters);
	$MailLettersEnc = str_replace('"', '\\"', $MailLettersEnc);
	$MailIndexes = '';
	
	for ($i = 0; $i < strlen($MailLink); $i ++) {
		$index = strpos($MailLetters, substr($MailLink, $i, 1));
		$index += 48;
		$MailIndexes .= chr($index);
	}
	
	$MailIndexes = str_replace('\\', '\\\\', $MailIndexes);
	$MailIndexes = str_replace('"', '\\"', $MailIndexes);
	
	?><SCRIPT LANGUAGE="JavaScript" type="text/javascript"><!--
var ML="<?php echo $MailLettersEnc ?>",MI="<?php echo $MailIndexes ?>",OT="",j;
for(j=0;j<MI.length;j++){
OT+=ML.charAt(MI.charCodeAt(j)-48);
}document.write(OT);
// --></SCRIPT><NOSCRIPT>Sorry, you need javascript
to view this email address</noscript><?php
}

/* You might not want to call this if you are in a session or generate
 * dynamic pages in any way with the script.
 * mtime = last modification time (optional) */
function StaticPage($mtime = false) {
	if (headers_sent())return false;
	
	if ($mtime == false) {
		if (isset($_SERVER['SCRIPT_FILENAME']))$mtime = filemtime($_SERVER['SCRIPT_FILENAME']);
		elseif (isset($_SERVER['PATH_TRANSLATED']))$mtime = filemtime($_SERVER['PATH_TRANSLATED']);
		else return false;
	}
	
	$mtime = min(time(), $mtime);
	$gmdate_mod = gmdate('D, d M Y H:i:s', $mtime) . ' GMT';
	header('Last-Modified: ' . $gmdate_mod);
	header('Cache-Control: public');
	$head = getallheaders();
	
	if (isset($_SERVER['If-Modified-Since'])) {
		$client = $_SERVER['If-Modified-Since'];
		
		if (strncmp($client, $gmdate_mod, strlen($gmdate_mod)) == 0) {
			header('HTTP/1.0 304 Not Modified');
			exit;
		}
	}
	
	if ($_SERVER['REQUEST_METHOD'] == 'HEAD') {
		// We don't need to return any data.
		exit;
	}
	
	phpinfo();
	exit;
}


function Dump($v, $name = false) {
	if ($name !== false) {
		echo '<b>' . htmlspecialchars($name) . '</b> = ';
	}
	
	$type = gettype($v);
	
	switch ($type) {
		case 'integer':
			$v2 = $v;
			break;

		case 'string':
			$v2 = "'$v'";
			break;

		default:
			$v2 = print_r($v, true);
	}
	
	$v2 = nl2br(htmlspecialchars($v2));
	$v2 = str_replace("\t", '        ', $v2);
	$v2 = str_replace('  ', '&nbsp; ', $v2);
	$v2 = str_replace('  ', ' &nbsp;', $v2);
	echo $v2;
}

