<?php
/* -*- php -*-
 * / * Mobile Phone File Uploader
 * 
 * Copyright (C) 2003-2006 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 * /
 * Methods of resizing images
 * SHRINK - Make entire picture fit on the screen
 * CLIP - Shrink picture to fill the screen, but clip the edges that go beyond
 * BACKGROUND_WHITE - As per shrink, but make the background white
 * BACKGROUND_BLACK - As per shrink, but make the background black
 * STRETCH - Skew the picture and force it to have the new dimensions
 * define RESIZE_SHRINK 0
 * define RESIZE_CLIP 1
 * define RESIZE_BACKGROUND_WHITE 2
 * define RESIZE_BACKGROUND_BLACK 3
 * define RESIZE_STRETCH 4
 * Load the configuration */
require_once('inc/config.php');


// Standard includes
require_once('../../functions.inc');
require_once('inc/html_util.php');


// Phone Information
if ($GLOBALS['Phone Info Location'] == 'file') {
	require_once('inc/phoneinfo-file.php');
} elseif ($GLOBALS['Phone Info Location'] == 'db') {
	require_once('inc/db.php');
	require_once('inc/phoneinfo-db.php');
}


// Gallery
if ($GLOBALS['Gallery Type'] == 'file') {
	require_once('inc/gallery-file.php');
} elseif ($GLOBALS['Gallery Type'] == 'db') {
	require_once('inc/db.php');
	require_once('inc/gallery-db.php');
} elseif ($GLOBALS['Gallery Type'] == 'mixed') {
	require_once('inc/db.php');
	require_once('inc/gallery-mixed.php');
} else {
	unset($GLOBALS['Gallery Type']);
}


// User Uploads
if ($GLOBALS['Upload Type'] == 'file') {
	require_once('inc/upload-file.php');
} elseif ($GLOBALS['Upload Type'] == 'db') {
	require_once('inc/db.php');
	require_once('inc/upload-db.php');
} elseif ($GLOBALS['Upload Type'] == 'mixed') {
	require_once('inc/db.php');
	require_once('inc/upload-mixed.php');
} else {
	unset($GLOBALS['Upload Type']);
}


/* Done loading extra modules.
 * Scans the HTTP_ACCEPT header for the MIME type specified (case insensitive).
 * Returns true if the browser is said to handle that media type
 * Returns false if it was not explicitly listed. */
function BrowserAccepts($type) {
	if (! isset($_SERVER['HTTP_ACCEPT']))return false;
	
	/* Cache the processing of the string, even though the work is so
	 * minimal.  Save every bit we can. */
	if (! isset($GLOBALS['HTTP_ACCEPT_PROCESSED'])) {
		$Accept = strtolower($_SERVER['HTTP_ACCEPT']);
		$Accept = str_replace(array(
				',',
				';'
			), ' ', $Accept);
		$Accept = ' ' . $Accept . ' ';
		$GLOBALS['HTTP_ACCEPT_PROCESSED'] = $Accept;
	}
	
	if (strpos($GLOBALS['HTTP_ACCEPT_PROCESSED'], ' ' . $type . ' ')) {
		return true;
	}
	
	return false;
}

/* Returns a string that describes the phone/browser visiting:
 *   Samsung SPH-8100 (128 x 160)
 *   Unknown Phone (128 x 160)
 *   Unknown Phone (Unknown Size)
 *   Web Browser (Unknown Size) */
function GetMakeModelSize() {
	if (PhoneDataGet('UseRecord') == 1) {
		$MakeModel = PhoneDataGet('Make') . ' ' . PhoneDataGet('Model');
	} else
	
	if (PhoneDataGet('UseRecord') == 2) {
		$MakeModel = 'Web Browser';
	} else
	
	if (IsPhone()) {
		$MakeModel = 'Unknown Phone';
	} else {
		$MakeModel = 'Unknown Browser';
	}
	
	$MakeModel .= '<br />Screen Size: ';
	$Width = PhoneDataGet('Width');
	$Height = PhoneDataGet('Height');
	
	if ($Width < 1 || $Height < 1) {
		$MakeModel .= 'Unknown';
	} else {
		$MakeModel .= $Width . 'x' . $Height;
	}
	
	return $MakeModel;
}

/* Pass in the mime types you want to retrieve, get an associative array
 * back.
 *   $a = GetMimeTypes('gif');  // returns array('image/gif' => 'gif')
 *   $a = GetMimeTypes(array('gif', 'JPG', 'XXXX'));
 *   // Returns array('image/gif' => 'gif', 'image/jpg' => 'jpg')
 *   // XXXX is ignored and JPG is changed to lowercase.
 *   $a = GetMimeTypes('x');  // returns array()
 *   $a = GetMimeTypes('jar');
 *   // Returns array('application/java-archive' => 'jar',
 *   //               'application/x-java-archive' => 'jar') */
function GetMimeTypes($t) {
	$Types = array(
		'*' => array(
			'application/octet-stream'
		),
		'3gp' => array(
			'video/3gpp'
		),
		'aac' => array(
			'audio/x-aac'
		),
		'amr' => array(
			'audio/3gpp'
		),
		'au' => array(
			'audio/au'
		),
		'bmp' => array(
			'image/bmp',
			'image/x-bmp'
		),
		'cab' => array(
			'application/octet-stream'
		),
		'gcd' => array(
			'text/x-pcs-gcd'
		),
		'gif' => array(
			'image/gif'
		),
		'jad' => array(
			'text/vnd.sun.j2me.app-descriptor'
		),
		'jar' => array(
			'application/java-archive',
			'application/x-java-archive'
		),
		'jpg' => array(
			'image/jpeg'
		),
		'm4a' => array(
			'audio/mp4'
		),
		'mid' => array(
			'audio/midi'
		),
		'mmf' => array(
			'application/vnd.smaf'
		),
		'mp3' => array(
			'audio/mp3'
		),
		'mp4' => array(
			'video/mp4'
		),
		'pmd' => array(
			'application/x-pmd'
		),
		'png' => array(
			'image/png'
		),
		'qcp' => array(
			'audio/vnd.qcelp'
		),
		'txt' => array(
			'text/plain'
		),
		'wav' => array(
			'audio/x-wav'
		),
		'wbmp' => array(
			'image/vnd.wap.wbmp'
		),
		'wma' => array(
			'audio/x-ms/wma'
		),
	);
	$o = array();
	
	if (! is_array($t)) {
		$t = strtolower($t);
		
		if (isset($Types[$t])) {
			foreach ($Types[$t] as $mime) {
				$o[$mime] = $t;
			}
		}
		
		return $o;
	}
	
	foreach ($t as $v) {
		$v = strtolower($v);
		
		if (isset($Types[$v])) {
			foreach ($Types[$v] as $mime) {
				$o[$mime] = $v;
			}
		}
	}
	
	return $o;
}

/* My wild guess about whether the browser accepts WML or not.
 *   If it is a known phone ...
 *     Return true if AvoidWAP is set to 0
 *     Otherwise, return false.
 *   If it accepts WML, return true
 *   Otherwise, return false */
function IsWapCapable() {
	if (IsPhone()) {
		if (PhoneDataGet('AvoidWAP')) {
			return false;
		}
		
		return true;
	}
	
	if (BrowserAccepts('text/vnd.wap.wml')) {
		return true;
	}
	
	return false;
}

/* My semi-wild guess if the phone requires a GCD file before downloading
 * an image or ringer.  Sprint phones appear to be the only ones that
 * are plagued with this hinderance. */
function RequiresGCDFile() {
	if (BrowserAccepts('text/x-pcs-gcd'))return true;
	
	foreach (array(
			'HTTP_CLIENT_ID' => '@sprintpcs.com',
			'HTTP_VIA' => 'bellmobility.ca'
		) as $k => $v) {
		if (isset($_SERVER[$k]) && strpos(strtolower($_SERVER[$k]), $v) !== false)return true;
	}
	
	return false;
}

// Outputs the headers that stop caching by the browser and proxies.
function NoCacheHeaders() {
	if (! headers_sent()) {
		Header('Cache-Control: no-store, no-cache, must-revalidate');
	}
}

/* Using just the headers, return an associative array that contains
 * the following information
 * ['Profile'] = The profile URL
 * ['Width'] = The screen width, if specified
 * ['Height'] = The screen height, if specified
 * ['gif'] = Whether the phone supports GIF images (HTTP_ACCEPT check)
 * ['jpg'] = Whether the phone supports JPG images (HTTP_ACCEPT check)
 * ['wbmp'] = Whether the phone supports Wbmp images (HTTP_ACCEPT check)
 * ['bmp'] = Whether the phone supports BMP images (HTTP_ACCEPT check)
 * ['png'] = Whether the phone supports PNG images (HTTP_ACCEPT check) */
function ParsePhoneHeaders() {
	$Info = array();
	$Profile = ParsePhoneProfile();
	
	if ($Profile) {
		$Info['Profile'] = $Profile;
	}
	
	$WidthHeight = ParsePhoneWidthHeight();
	
	if (is_array($WidthHeight)) {
		$Info['Width'] = $WidthHeight[0];
		$Info['Height'] = $WidthHeight[1];
	}
	
	$Info['gif'] = 0;
	$Info['jpg'] = 0;
	$Info['wbmp'] = 0;
	$Info['bmp'] = 0;
	$Info['png'] = 0;
	
	foreach (GetMimetypes(array(
				'wbmp',
				'jpg',
				'png',
				'gif',
				'bmp'
			)) as $k => $v) {
		if (BrowserAccepts($k)) {
			$Info[$v] = 1;
		}
	}
	
	$GLOBALS['Phone Info'] = $Info;
}

/* Using just the headers, find the profile URL, strip off some annoyances,
 * return the URL. */
function ParsePhoneProfile() {
	// Save the profile URL if it is mentioned
	$Profile = false;
	
	if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
		$Profile = $_SERVER['HTTP_X_WAP_PROFILE'];
	} elseif (isset($_SERVER['HTTP_PROFILE'])) {
		$Profile = $_SERVER['HTTP_PROFILE'];
	} elseif (isset($_SERVER['HTTP_13_PROFILE'])) {
		$Profile = $_SERVER['HTTP_13_PROFILE'];
	}
	
	if (! $Profile) {
		return false;
	}
	
	if (preg_match('/^\\\\?[\\\'"](.*)\\\\?["\\\']$/', $Profile, $matches)) {
		$Profile = $matches[1];
	}
	
	if (strlen($Profile) == 0) {
		return false;
	}
	
	return $Profile;
}

/* Using just the headers, try to determine the phone's width and height
 * of the screen. */
function ParsePhoneWidthHeight() {
	if (isset($_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'])) {
		$WidthHeight = $_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'];
	} elseif (isset($_SERVER['HTTP_UA_PIXELS'])) {
		$WidthHeight = $_SERVER['HTTP_UA_PIXELS'];
	} else {
		return false;
	}
	
	$WidthHeight = preg_replace('/[^0-9]+/', ' ', $WidthHeight);
	$WidthHeight = trim($WidthHeight);
	$WidthHeight = split(' ', $WidthHeight);
	
	if (count($WidthHeight) != 2)return false;
	return $WidthHeight;
}

/* Returns the associated information for a jump code.
 * If not found, returns false, otherwise it will populate an associative
 * array with the following fields:
 * ['ID'] = The jump code
 * ['FileName'] = The name of the file as it was uploaded
 * ['FileType'] = The 3-character extension.  May be different than
 *     FileName, so use this if you can.
 * ['FileSize'] = The size of the file in bytes.
 * ['Folder'] = What folder to save the JAR to, if specified.  Only applies
 *     to Java midlets (default: false)
 * ['DescText'] = The short description of the file (default: false)
 * ['ResizeMethod'] = How the file should be resized (see #define at top,
 *     default: false (which is also == 0 but not === 0))
 * ['RetrieveFile'] = If the file is saved to disk, this is the path.
 * ['RetrieveID'] = If the file was saved to the database, this is the ID
 *     of the record. */
function GetJumpCodeInfo($code) {
	settype($code, 'integer');
	
	if ($code == 0)return false;
	
	if ($code >= $GLOBALS['Gallery Jump Min'] && $code <= $GLOBALS['Gallery Jump Max'] && isset($GLOBALS['Gallery Type'])) {
		return Gallery_GetInfo($code);
	}
	
	if ($code >= $GLOBALS['Upload Jump Min'] && $code <= $GLOBALS['Upload Jump Max'] && isset($GLOBALS['Upload Type'])) {
		return Upload_GetInfo($code);
	}
	
	return false;
}

/* Returns the file data for the info array returned by GetJumpCodeInfo()
 * If the file can not be found, returns false. */
function & GetFileData($Info) {
	$data = false;
	
	if (isset($Info['RetrieveFile']) && $Info['RetrieveFile']) {
		if (! file($Info['RetrieveFile']))return $data;
		$fp = fopen($Info['RetrieveFile'], 'rb');
		
		if (! $fp)return $data;
		$data = fread($fp, filesize($Info['RetrieveFile']));
		fclose($fp);
		return $data;
	}
	
	if (isset($Info['RetrieveID']) && $Info['RetrieveID']) {
		// Not yet written
		return $data;
	}
	
	return $data;
}

// Loads a file into a string, replaces newlines with "\n" for easy parsing.
function & read_file($fn) {
	$fp = fopen($fn, 'r');
	
	if (! $fp) {
		/* Not the one-line "return false" version because we
		 * pass the return info by reference. */
		$data = false;
		return $data;
	}
	
	$data = fread($fp, filesize($fn));
	fclose($fp);
	
	/* This converts any text file (Mac, Unix, Linux, Windows, DOS, etc.)
	 * to have the same line feeds. */
	$data = str_replace("\r\n", "\n", $data);
	$data = str_replace("\r", "\n", $data);
	return $data;
}

// Creates a temporary file, closes it, then returns the filename.
function GetTemporaryFileName() {
	$fn = tempnam($GLOBALS['Uploader Temp Dir'], 'UPL');
	
	// Make sure that all versions create a temporary file
	if (! file_exists($fn)) {
		$fp = fopen($fn, 'w');
		fclose($fp);
	}
	
	return $fn;
}

/* Writes data to a temporary file, returns the filename.
 * I suggest passing $data by reference */
function WriteTemporaryFile(&$data) {
	$fn = GetTemporaryFileName();
	$fp = fopen($fn, 'wb');
	fwrite($fp, $data);
	fclose($fp);
	return $fn;
}

/* Does file type identification.  Returns the 3-character extension if
 * possible or '*' if unknown.  If $quick is set to true, it stops only
 * after the file extension detection - no actual reads to the file are made. */
function DetectFileType($filename, $quick = false) {
	// Set the default according to the file's extension.
	$ext = '*';
	
	if (preg_match('/\\.(^[\\.\\\\])$/', $filename, $matches)) {
		$ext = $matches[1];
		
		if ($ext = 'jpeg' || $ext = 'jfif')$ext = 'jpg';
		elseif ($ext == 'midi')$ext = 'mid';
		elseif ($ext == 'wave')$ext = 'wav';
		elseif ($ext == '3gpp')$ext = '3gp';
		$mt = GetMimeTypes($ext);
		
		if (! count($mt)) {
			$ext = '*';
		}
	}
	
	if ($quick)return $ext;
	
	// Use PHP's quick image size detection
	$res = GetImageSize($filename);
	
	if ($res) {
		switch ($res[2]) {
			case 1:
				return 'gif';
			case 2:
				return 'jpg';
			case 3:
				return 'png';
			case 4:
				return 'swf';
			case 5:
				return 'psd';
			case 6:
				return 'bmp';
			case 7:
			case 8:
				return 'tif';
			case 9:
				return 'jpc';
			case 10:
				return 'jp2';
			case 11:
				return 'jpx';
			case 12:
				return 'jb2';
			case 13:
				return 'swc';
			case 14:
				return 'iff';
			case 15:
				return 'wbmp';
			case 16:
				return 'xbm';
		}
	}
	
	$fp = fopen($filename, 'rb');
	
	if (! $fp)return $ext;
	$header = fread($fp, 4);
	fclose($fp);
	
	if (strlen($header) != 4)return $ext;
	
	// Identification by 4-byte file header - magic number
	$headers = array(
		'au' => '.snd',
		'amr' => '#!AM',
		'gif' => 'GIF8',
		'jpg' => "\xFF\xD8\xFF\xE0",
	);
	
	foreach ($headers as $k => $v) {
		if ($header == $v) {
			return $k;
		}
	}
	
	return $ext;
}

/*
 * '*' => array('application/octet-stream'),
 * '3gp' => array('video/3gpp'),
 * 'aac' => array('audio/x-aac'),
 * 'bmp' => array('image/bmp', 'image/x-bmp'),
 * 'cab' => array('application/octet-stream'),
 * 'gcd' => array('text/x-pcs-gcd'),
 * 'gif' => array('image/gif'),
 * 'jad' => array('text/vnd.sun.j2me.app-descriptor'),
 * 'jar' => array('application/java-archive', 'application/x-java-archive'),
 * 'm4a' => array('audio/mp4'),
 * 'mid' => array('audio/midi'),
 * 'mmf' => array('application/vnd.smaf'),
 * 'mp3' => array('audio/mp3'),
 * 'mp4' => array('video/mp4'),
 * 'pmd' => array('application/x-pmd'),
 * 'png' => array('image/png'),
 * 'qcp' => array('audio/vnd.qcelp'),
 * 'txt' => array('text/plain'),
 * 'wav' => array('audio/x-wav'),
 * 'wbmp' => array('image/vnd.wap.wbmp'),
 * 'wma' => array('audio/x-ms/wma'),
 */

/* Returns the .jad file contents for the .jar file specified in $info
 * $info is from GetJumpCodeInfo() */
function GetJad($info) {
	$is_manifest = false;
	
	// First, fill in ['Jad'] if not already filled in.
	if (! isset($info['Jad']) || ! $info['Jad']) {
		$tempfn = WriteTemporaryFile(GetFileData($info));
		require_once('inc/unzip.php');
		$info['Jad'] = unzip($tempfn, 'META-INF/MANIFEST.mf', true);
	}
	
	$info['Jad'] = str_replace("\r\n", "\n", $info['Jad']);
	$info['Jad'] = str_replace("\r", "\n", $info['Jad']);
	$jadraw = explode("\n", $info['Jad']);
	$jadarr = array();
	
	foreach ($jadraw as $attr) {
		$bits = explode(':', $attr);
		$name = trim(array_shift($bits));
		$name_lc = strtolower($name);
		$bits = trim(join(':', $bits));
		
		if (! $is_manifest || substr($name, 0, 7) == 'midlet-') {
			$jadarr[$name_lc] = array(
				$name,
				$bits
			);
		}
	}
	
	// Overwrite the URL
	$url = $GLOBALS['Uploader Base URL'] . 'dl.php?num=' . urlencode($info['ID']);
	$jadarr['midlet-jar-url'] = array(
		'MIDlet-Jar-URL',
		$url
	);
	
	// Overwrite the size
	$jadarr['midlet-jar-size'] = array(
		'MIDlet-Jar-Size',
		$info['FileSize']
	);
	
	// Set a name if one does not exist.
	if (! isset($jadarr['midlet-name']) && isset($jadarr['midlet-1'])) {
		$m1 = explode(',', $jadarr['midlet-1'][1]);
		$m1 = trim($m1[0]);
		
		if ($m1) {
			$jadarr['midlet-name'] = array(
				'MIDlet-Name',
				$m1
			);
		}
	}
	
	// Set an icon if one does not exist.
	if (! isset($jadarr['midlet-icon']) && isset($jadarr['midlet-1'])) {
		$m1 = explode(',', $jadarr['midlet-1'][1]);
		$m1 = trim($m1[1]);
		
		if ($m1 && stristr($m1, '.png')) {
			$jadarr['midlet-icon'] = array(
				'MIDlet-Icon',
				$m1
			);
		}
	}
	
	// Override the content folder if defined
	if (isset($info['Folder']) && $info['Folder']) {
		$jadarr['content-folder'] = array(
			'Content-Folder',
			$info['Folder']
		);
	}
	
	$jad = $jadarr['midlet-jar-url'][0] . ': ' . $jadarr['midlet-jar-url'][1];
	unset($jadarr['midlet-jar-url']);
	
	foreach ($jadarr as $v) {
		$jad .= "\n" . $v[0] . ': ' . $v[1];
	}
	
	return $jad;
}

// Returns the best mime type for the file type specified.
function GetBestMimeType($type) {
	$mt = GetMimeTypes($type);
	
	if (count($mt) == 0)$mt = GetMimeTypes('*');
	$mt = array_keys($mt);
	$mt = $mt[0];
	return $mt;
}

/* Returns a particular tweak value, if specified.
 * Possible tweaks and their values
 *   content-vendor: default folder for java applications if not specified */
function GetPhoneTweak($key) {
	/* Cache tweak processing to not waste time by parsing the list more
	 * than once */
	if (! isset($GLOBALS['Phone Tweaks'])) {
		$GLOBALS['Phone Tweaks'] = array();
		$tweaks_raw = PhoneDataGet('Tweaks');
		$tweaks_raw = explode(';', $tweaks_raw);
		
		foreach ($tweaks_raw as $tweak_pair) {
			$tweak = explode('=', $tweak_pair);
			
			if (! isset($tweak[1])) {
				$tweak[1] = 1;
			}
			
			$GLOBALS['Phone Tweaks'][trim($tweak[0])] = trim($tweak[1]);
		}
	}
	
	if (! isset($GLOBALS['Phone Tweaks'][$key]))return false;
	return $GLOBALS['Phone Tweaks'][$key];
}

/* Resizes images if needed.
 * ID is the phone id or -1 if unknown phone.
 * Pass $info by reference so this can modify the array. */
function ResizeImages($id, $info) {
	/* First, just a few quick checks.
	 * If I don't know what phone this is for, then I can't
	 * resize it to fit the screen. */
	if ($id <= 0)return;
	
	/* Only check files that the user thinks are images and that
	 * we can load / resize. */
	if ($info['FileType'] != 'gif' && $info['FileType'] != 'jpg' && $info['FileType'] != 'bmp' && $info['FileType'] != 'png' && $info['FileType'] != 'wbmp') {
		return;
	}
	
	// Attempt to load the image and get the dimensions
	require_once('image.php');
	
	if ($info['FileName']) {
		$result = GetImageSize_Custom($info['FileName'], true);
	} else {
		if (! isset($info['FileData']))$info['FileData'] = GetFileData();
		$tmpfn = WriteTemporaryFile($info['FileData']);
		$result = GetImageSize_Custom($tmpfn, true);
	}
	
	if ($result[0] * $result[1] == 0) {
		if (isset($tmpfn)) {
			unlink($tmpfn);
		}
		
		if (isset($result[2])) {
			if ($result[2] == 'gd')imagedestory($result[3]);
			
			if ($result[2] == 'im')imagic_free($result[3]);
		}
		
		return;
	}
	
	if (isset($tmpfn)) {
		unlink($tmpfn);
	}
}

