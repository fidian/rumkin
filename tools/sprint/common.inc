<?php
/* -*- php -*-
 * / * Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 * /
 * / * This file will be loaded with each page, so make sure to stick only useful
 * functions in here.
 * /
 * Load the configuration */
include_once('config.php');
include_once('messaging.inc');
include_once('provider.inc');


/* This file gives me the StandardHeader() and StandardFooter() functions
 * Alter this to use the functions.inc that came with the archive */
if (! isset($Extra_Pre))$Extra_Pre = '';
include_once($Extra_Pre . '../../inc/unzip.php');

if (! isset($GLOBALS['Force Clean']))
include_once($Extra_Pre . '../../functions.inc');

/* Open the database connection
 * Change mysql_pconnect to mysql_connect to prevent
 * caching of mysql connections. */
$GLOBALS['Database Connection'] = mysql_pconnect($GLOBALS['Database Server'], $GLOBALS['Database User'], $GLOBALS['Database Password']);
mysql_select_db($GLOBALS['Database Database'], $GLOBALS['Database Connection']) || die(mysql_errno() . ': ' . mysql_error());

/* Runs a MySQL query.  Returns the result upon success, calls Bail()
 * if there is an error. */
function RunQuery($sql) {
	$result = mysql_query($sql, $GLOBALS['Database Connection']);
	
	if (! $result) {
		Bail('Could not run query (' . $sql . ') == ' . mysql_error());
	}
	
	return $result;
}

// Releases the result
function DoneWithResult($result) {
	if ($result !== false and $result !== true) {
		mysql_free_result($result);
	}
}

/* Fetches the data into an associative array
 * Returns false if there is no more data to fetch */
function FetchAssoc($result) {
	return mysql_fetch_assoc($result);
}


function Bail($msg) {
	if (! headers_sent()) {
		SprintStandardHeader('Error');
	}
	
	MakeBoxTop(array(
			'align' => 'center',
			'border' => 2
		));
	echo nl2br(htmlspecialchars($msg));
	MakeBoxBottom();
	
	?>
	<br><br><p>You can try going back to the
	<a href="<?php echo $GLOBALS['URL Base']
	
	?>index.php">Upload Form</a> and attempt to upload
	the file again.  If you have further questions, check
	out the <a href="faq/">FAQ</a> (Frequently Asked Questions).</p>
<?php
	
	StandardFooter();
	exit();
}

/* Returns the record from the File table
 * Pass in the ID of the record and the fields to grab as per SQL syntax */
function GetFileData($id) {
	settype($id, 'integer');

	if ($id < 1) {
		Bail('Invalid ID supplied');
	}

	$contents = @file_get_contents($GLOBALS['Upload Dir'] . '/' . $id . '/meta');
	if (empty($contents)) {
		Bail('Invalid ID - Contents probably expired or wrong ID entered');
	}

	$contents = json_decode($contents, true);

	if (! is_array($contents)) {
		Bail('Invalid meta data stored for ID ' . $id);
	}

	return $contents;
}

/* Sends an email - wrapper function to just make sure I don't specify the
 * same things multiple times */
function SendEmailToUser($address, $subj, $body) {
	mail($address, $subj, $body, 'From: ' . $GLOBALS['Mail From'] . "\r\nReturn-Path: " . $GLOBALS['Mail From']);
}

// Sends the file download link to the user
function SendFileToUser($sendto, $id) {
	// get file info
	$FileData = GetFileData($id);
	
	// Construct the URL to the jump page
	$URL = $GLOBALS['URL Base'] . 'jump.php/' . $id;
	
	if (strpos($sendto, '@') !== false) {
		// email address
		$username = explode('@', $sendto);
		$username = $username[0];
		$username = preg_replace('/[^0-9]/', '', $username);
		
		if (! in_array($username, $GLOBALS['Ban Phone'])) {
			SendEmailToUser($sendto, $FileData['description'], $URL);
		}
	} elseif ($sendto >= 1000000000) {
		if (! in_array($sendto, $GLOBALS['Ban Phone'])) {
			if ($GLOBALS['Use Sprint Website']) {
				if (SendSprintSMS($sendto, $FileData['description'] . "\n" . $URL)) {
					// Fall back on sending via email
					SendEmailToUser($sendto . '@messaging.sprintpcs.com', $FileData['description'], $URL);
				}
			} else {
				SendEmailToUser($sendto . '@messaging.sprintpcs.com', $FileData['description'], $URL);
			}
		}
	}
	
	return $URL;
}


function SprintStandardHeader($title, $depth = 0) {
	StandardHeader(array(
			'title' => $title,
			'page' => 'sprint',
			'topic' => 'sprint',
			'ads' => 'sprint'
		));
}


function ShowPhoneList($skipIncomplete = 0) {
	$Models = array();
	$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where UseRecord = 1 ';
	
	if ($skipIncomplete)$sql .= 'and Jar != 2 and Jpg != 2 and Gif != 2 and Png != 2 and ' . 'Wbmp != 2 and Pmd != 2 and Qcp != 2 and Mid != 2 ';
	$sql .= 'order by Make, Model';
	$r = RunQuery($sql);
	$Lines = array();
	$LastName = false;
	
	while ($data = FetchAssoc($r)) {
		$unsure = 0;
		
		if ($data['Jar'] == 2 || $data['Jpg'] == 2 || $data['Gif'] == 2 || $data['Png'] == 2 || $data['Wbmp'] == 2 || $data['Pmd'] == 2 || $data['Qcp'] == 2 || $data['Mid'] == 2) {
			$unsure = 1;
		}
		
		if ($LastName == false)$LastName = $data['Make'];
		
		if ($LastName != $data['Make']) {
			$Lines[] = '';
			$LastName = $data['Make'];
		}
		
		$line = '';
		
		if ($unsure)$line = '<i>';
		$line .= htmlspecialchars($data['Make']) . ' ' . htmlspecialchars($data['Model']);
		
		if ($unsure)$line .= ' *</i>';
		$Lines[] = $line;
	}
	
	DoneWithResult($r);
	$linecount = ceil(count($Lines) / 2);
	echo '<table align=center border=0>';
	echo '<tr><td>';
	
	while ($linecount > 0) {
		$linecount --;
		echo array_shift($Lines);
		
		if ($linecount > 0)echo "<br>\n";
	}
	
	echo '</td><td>&nbsp;&nbsp;&nbsp;</td><td>';
	echo join("<br>\n", $Lines);
	echo "</td></tr></table>\n";
}

function makeId() {
	$code = mt_rand(1, 9);
	$code .= mt_rand(0, 9);
	$code .= mt_rand(0, 9);
	$code .= mt_rand(0, 9);
	$code .= mt_rand(0, 9);
	$code .= mt_rand(0, 9);
	return $code;
}

function SaveFile($tempname, $desc = null) {
	$code = makeId();
	while (is_dir($GLOBALS['Upload Dir'] . '/' . $code)) {
		$code = makeId();
	}
	$destDir = $GLOBALS['Upload Dir'] . '/' . $code;
	mkdir($destDir, 0777);
	move_uploaded_file($tempname, $destDir . '/data');

	if (! empty($desc)) {
		$desc = str_replace("\r\n", "\n", $desc);
		$desc = str_replace("\r", "\n", $desc);
		file_put_contents($destDir . '/desc', $desc);
	}

	return $code;
}

// Returns the ID of the description in the database.
function SaveFileDesc($code, $filename, $folder, $desctext, $filetype) {
	// Alter filename if necessary
	if (strlen($filename) > $GLOBALS['Max Name Length']) {
		$ext = substr($filename, strrpos($filename, '.'));
		$filename = substr($filename, $GLOBALS['Max Name Length'] - strlen($ext)) . $ext;
	}

	$meta = array(
		'name' => $filename,
		'folder' => $folder,
		'description' => $desctext,
		'type' => $filetype,
	);
	SaveMeta($code, $meta);
}


function SaveMeta($code, $meta) {
	$meta = json_encode($meta);
	file_put_contents($GLOBALS['Upload Dir'] . '/' . $code . '/meta', $meta);
}

/* Could return array(0, 0) if it had problems finding the width/height
 * Returns array(width, height) */
function GetCustomImageSize($code) {
	$FileData = GetFileData($code);

	if (! empty($FileData['width']) && ! empty($FileData['height']) && $FileData['width'] != 0 && $FileData['height'] != 0) {
		return array(
			$FileData['width'],
			$FileData['height']
		);
	}
	
	/* We need to load the picture to find out.
	 * I don't use GetImageSize because it may or may not work.
	 * This should work as long as we have a valid picture. */
	$gd = MakeGD($FileID);
	
	if (! $gd) {
		$Width = 0;
		$Height = 0;
	} else {
		$Width = imagesx($gd);
		$Height = imagesy($gd);
	}

	$meta['width'] = $Width;
	$meta['height'] = $Height;
	SaveMeta($code, $meta);
	return array(
		$Width,
		$Height
	);
}

/* Resizes the image to the specified width/height and format
 * format = the file type number (5 = wbmp, etc.)
 * Returns the file data */
function ResizeCustomImage($code, $Width, $Height, $Format) {
	$FileData = GetFileData($code);
	
	if ($FileData['width'] == $Width && $FileData['height'] == $Height) {
		return file_get_contents($GLOBALS['Upload Dir'] . '/' . $code . '/data');
	}
	
	$gd = MakeGD($code);
	
	if (! $gd) {
		// Dang -- can't resize
		return file_get_contents($GLOBALS['Upload Dir'] . '/' . $code . '/data');
	}
	
	$gd2 = imagecreatetruecolor($Width, $Height);
	imagecopyresampled($gd2, $gd, 0, 0, 0, 0, $Width, $Height, imagesx($gd), imagesy($gd));
	imagedestroy($gd);
	ob_start();
	
	switch ($Format) {
		case 5:  // wbmp
			$func = 'imagewbmp';
			break;

		case 6:  // jpg
			$func = 'imagejpeg';
			break;

		case 7:  // png
			$func = 'imagepng';
			break;
			
			// Doesn't work
			

		case 11:
			
			/* gif
			 * $func = 'imagecreatefromgif';
			 * break; */
			
		default:
			echo 'Unknown file type number ' . $FileData['type'];
			exit();
	}
	
	$func($gd2);
	$data = ob_get_clean();
	imagedestroy($gd2);
	return $data;
}


function MakeGD($code) {
	$FileData = GetFileData($code);
	
	switch ($FileData['type']) {
		case 5:  // wbmp
			$func = 'imagecreatefromwbmp';
			break;

		case 6:  // jpg
			$func = 'imagecreatefromjpeg';
			break;

		case 7:  // png
			$func = 'imagecreatefrompng';
			break;

		case 11:  // gif
			$func = 'imagecreatefromgif';
			break;

		default:
			echo 'Unknown file type number ' . $FileData['type'];
			exit();
	}

	$fn = $GLOBALS['Upload Dir'] . '/' . $code . '/data';
	
	// imagecreatefromstring() could be useful if it knows how to parse it.
	/* I hope we don't need this code any more.  It's been YEARS.
	if ($func == 'imagecreatefromgif') {
		$fn2 = tempnam($GLOBALS['Temp Dir'], 'sprint');
		
		// Yeah, the GIF loading function doesn't work, even though
		// the patent expired, and only the creation of GIF images
		// was patented.
		exec('giftopnm -image 1 \'' . $fn . '\' | pnmtopng > ' . $fn2);
		unlink($fn);
		$fn = $fn2;
		$func = 'imagecreatefrompng';
	}
	*/
	
	$gd = @$func($fn);
	return $gd;
}


function ImageBestFit($currentX, $currentY, $maxX, $maxY) {
	$scaleFactor = $maxX / $currentX;
	
	if ($maxY / $currentY < $scaleFactor)$scaleFactor = $maxY / $currentY;
	
	if ($scaleFactor > 1)$scaleFactor = 1;
	$newWidth = $currentX * $scaleFactor;
	$newHeight = $currentY * $scaleFactor;
	settype($newWidth, 'integer');
	settype($newHeight, 'integer');
	return array(
		$newWidth,
		$newHeight
	);
}


function GetPhoneInfo($PhoneID = false) {
	$GLOBALS['PhoneInfoLog'] = '';
	
	if ($PhoneID !== false) {
		$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where ID = ' . $PhoneID;
		$GLOBALS['PhoneInfoLog'] .= $sql . "\n";
		$r = RunQuery($sql);
		$data = FetchAssoc($r);
		DoneWithResult($r);
		
		if ($data) {
			$GLOBALS['PhoneInfoLog'] .= 'Found ID ' . $data['ID'] . "\n";
			return $data;
		}
		
		$GLOBALS['PhoneInfoLog'] .= "Phone ID passed is wrong\n";
	}
	
	if ($PhoneID === false) {
		$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where \'' . EscapeDB($_SERVER['HTTP_USER_AGENT']) . '\' like UserAgent and UseRecord = 1 and ';
		
		if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
			$sql .= '\'' . EscapeDB($_SERVER['HTTP_X_WAP_PROFILE']) . '\' like XWapProfile';
		} elseif (isset($_SERVER['HTTP_PROFILE'])) {
			$sql .= '\'' . EscapeDB($_SERVER['HTTP_PROFILE']) . '\' like XWapProfile';
		} elseif (isset($_SERVER['HTTP_13_PROFILE'])) {
			$sql .= '\'' . EscapeDB($_SERVER['HTTP_13_PROFILE']) . '\' like XWapProfile';
		} else {
			$sql .= '(XWapProfile is NULL or XWapProfile = \'\' or ' . 'XWapProfile = \'%\')';
		}
	}
	
	$GLOBALS['PhoneInfoLog'] .= $sql . "\n";
	$r = RunQuery($sql);
	$data = FetchAssoc($r);
	DoneWithResult($r);
	
	if ($data) {
		$GLOBALS['PhoneInfoLog'] .= 'Found ID ' . $data['ID'] . "\n";
		return $data;
	}
	
	$GLOBALS['PhoneInfoLog'] .= "No matching records\n";
	
	// Guess information based on what the phone passes us.
	$WidthHeight = false;
	
	if (isset($_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'])) {
		$WidthHeight = $_SERVER['HTTP_X_UP_DEVCAP_SCREENPIXELS'];
	} elseif (isset($_SERVER['HTTP_UA_PIXELS'])) {
		$WidthHeight = $_SERVER['HTTP_UA_PIXELS'];
	}
	
	if ($WidthHeight !== false) {
		$WidthHeight = preg_replace('/[^0-9]+/', ' ', $WidthHeight);
		$WidthHeight = trim($WidthHeight);
		$WidthHeight = split(' ', $WidthHeight);
		
		if (count($WidthHeight) == 2) {
			// Fake it.
			$data = array(
				'Width' => $WidthHeight[0],
				'Height' => $WidthHeight[1],
				'Jpg' => 1,
				'Png' => 0,
				'Wbmp' => 0
			);
		}
	}
	
	return $data;
}


/* Writes the description file
 * If the phone doesn't need it, proceeds directly to download */
function OutputDescFile($ID, $PhoneID = false) {
	SendPossibleLog();
	
	// Get info for file and description
	$FileData = GetFileData($ID);

	if ($FileData['type'] == FILE_TYPE_JAR) {
		OutputDescFile_Jar($ID, $FileData, $PhoneID);
	} else {
		OutputDescFile_GCD($ID, $FileData, $PhoneID);
	}
}

/* NOTE:  The Samsung VI660 *requires* a Content-Folder
 * Juicy info at http://sprintdevelopers.com/article10.html */
function OutputDescFile_Jar($code, $FileData, $PhoneID = false) {
	// Write a JAD file
	Header('Content-Type: ' . $GLOBALS['File Types'][FILE_TYPE_JAD][1]);
	$m = str_replace("\r\n", "\n", file_get_contents($GLOBALS['Upload Dir'] . '/' . $code . '/desc'));
	$m = str_replace("\r", "\n", $m);
	$m = str_replace("\n ", "", $m);  // 72-character "continuation line"
	$m = split("\n", $m);
	$did_icon = false;
	$did_name = false;
	$Alt_Icon = false;
	$Alt_Name = false;
	echo 'MIDlet-Jar-URL: ' . $GLOBALS['URL Base'] . 'dl.php/' . $code . '/';
	
	if (PhoneDataHas('ID'))echo $GLOBALS['This Phone']['ID'] . '/';
	echo $FileData['name'] . "\n";
	echo 'MIDlet-Jar-Size: ' . filesize($GLOBALS['Upload Dir'] . '/' . $code . '/data');
	
	foreach ($m as $d) {
		if (strtolower(substr($d, 0, 7)) == 'midlet-') {
			// Parse MIDlet-1 but also make sure to output that line
			if (strtolower(substr($d, 0, 9)) == 'midlet-1:') {
				$x = split(',', $d);
				$Alt_Name = trim($x[0]);
				
				if (stristr($x[1], '.png')) {
					$Alt_Icon = trim($x[1]);
				}
			}
			
			// Convoluted way of saying "skip jar-size, jar-url"
			if (stristr($d, 'midlet-jar-size:') === false && stristr($d, 'midlet-jar-url:') === false) {
				echo "\n" . $d;
				
				/* spit out the icon and name fields if we find them
				 * However, also record that we already spit them out. */
				if (stristr($d, 'midlet-icon:') !== false)$did_icon = true;
				
				if (stristr($d, 'midlet-name:') !== false)$did_name = true;
			}
		}
	}
	
	if ($did_name === false && $Alt_Name) {
		echo "\nMIDlet-Name: $Alt_Name";
	}
	
	if ($did_icon === false && $Alt_Icon) {
		echo "\nMIDlet-Icon: $Alt_Icon";
	}
	
	if (isset($FileData['folder']) && $FileData['folder'] != '')echo "\nContent-Folder: " . $FileData['folder'];
	
	/* For our Canadian friends.
	 *    $jad_file = $FileDesc['FileName'];
	 *    $jad_file = substr($jad_file, 0, strrpos($jad_file, '.')) . '.jad';
	 *    echo 'Confirm-URL: ' . $GLOBALS['URL Base'] . 'desc.php/' .
	 *      $FileDesc['ID'] . '/' . $jad_file . "\n"; */
}


function OutputDescFile_GCD($code, $FileData, $PhoneID = false) {
	$data = ResizeImageIfNeedBe($code, $FileData);
	
	// Display a GCD file
	Header('Content-Type: ' . $GLOBALS['File Types'][FILE_TYPE_GCD][1]);
	
	// Spit out header for the file we are describing
	echo 'Content-Type: ' . $GLOBALS['File Types'][$data['type']][1] . "\n";
	
	switch ($GLOBALS['File Types'][$FileData['type']][3]) {
		case 1:
			echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/image\n";
			break;

		case 2:
			echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/ringer\n";
			break;

		default:
			echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/data\n";
			break;
	}
	
	if (trim($FileData['description']) != '')echo 'Content-Name: ' . $FileData['description'] . "\n";
	else echo "Content-Name: Untitled\n";
	echo 'Content-Version: ' . $GLOBALS['Content Version'] . "\n";
	echo 'Content-Vendor: ' . $GLOBALS['Content Vendor'] . "\n";
	echo 'Content-URL: ' . $GLOBALS['URL Base'] . 'dl.php/' . $code . '/';
	
	if (PhoneDataHas('ID'))echo $GLOBALS['This Phone']['ID'] . '/';
	echo $FileData['name'] . "\n";
	echo 'Content-Size: ' . strlen($data['data']) . "\n";
	
	/* For our Canadian friends.
	 *    $gcd_file = $FileDesc['FileName'];
	 *    $gcd_file = substr($gcd_file, 0, strrpos($gcd_file, '.')) . '.gcd';
	 *    echo 'Confirm-URL: ' . $GLOBALS['URL Base'] . 'desc.php/' .
	 *      $FileDesc['ID'] . '/' . $gcd_file . "\n"; */
	echo "\n";
}


function ResizeImageIfNeedBe($code, $FileData) {

	if (! PhoneDataHas(false)) {
		$content = file_get_contents($GLOBALS['Upload Dir'] . '/' . $code . '/data');
		return array(
			'data' => $content,
			'type' => $FileData['type']
		);
	}
	
	if ($FileData['type'] != FILE_TYPE_WBMP && $FileData['type'] != FILE_TYPE_JPG && $FileData['type'] != FILE_TYPE_PNG && $FileData['type'] != FILE_TYPE_GIF)return;
	$dimensions = GetCustomImageSize($code);
	
	if ($dimensions[0] == 0 || $dimensions[1] == 0)return;
	$thumbSize = ImageBestFit($dimensions[0], $dimensions[1], $GLOBALS['This Phone']['Width'], $GLOBALS['This Phone']['Height']);
	
	if ($thumbSize[0] == $dimensions[0] && $thumbSize[1] == $dimensions[1])return;
	
	// Find best image format
	if ($GLOBALS['This Phone']['Jpg'])$UseFormat = FILE_TYPE_JPG;
	elseif ($GLOBALS['This Phone']['Png'])$UseFormat = FILE_TYPE_PNG;
	elseif ($GLOBALS['This Phone']['Wbmp'])$UseFormat = FILE_TYPE_WBMP;
	else $UseFormat = FILE_TYPE_JPG;
	$content = ResizeCustomImage($FileData['ID'], $thumbSize[0], $thumbSize[1], $UseFormat);
	return array(
		'data' => $content,
		'type' => $UseFormat
	);
}


function IsSprintPhone() {
	/*
	 * $fp = @fopen('/tmp/phone_logs.' . time() . '.' . rand(), 'w');
	 * if ($fp) {
	 * foreach ($_SERVER as $k => $v) {
	 * fwrite($fp, "$k = $v\n");
	 * }
	 * fclose($fp);
	 * }
	 * */
	foreach (array(
			'HTTP_CLIENT_ID' => '@sprintpcs.com',
			'HTTP_CLIENTID' => '@sprintpcs.com',
			'HTTP_VIA' => 'bellmobility.ca',
			'HTTP_ACCEPT' => 'text/x-pcs-gcd'
		) as $k => $v) {
		if (isset($_SERVER[$k]) && strpos($_SERVER[$k], $v) !== false)return true;
	}
	
	return false;
}


function SendPossibleLog() {
	$Str = $GLOBALS['PhoneInfoLog'];
	
	// Maybe log
	if (! isset($GLOBALS['Admin Email']))return;
	
	if (! isset($_SERVER['HTTP_USER_AGENT']))return;
	
	if (IsNormalBrowser($_SERVER['HTTP_USER_AGENT']))return;
	
	if (! PhoneDataHas(false) || (PhoneDataHas('LogRecord') && $GLOBALS['This Phone']['Log Record'])) {
		// Create a string that will be mailed to the administrator
		$Str .= "\n";
		
		// Add a nice easy display for detected mime types
		$Accept = '';
		
		if (isset($_SERVER['HTTP_ACCEPT'])) {
			$Accept = $_SERVER['HTTP_ACCEPT'];
		}
		
		$Accept = str_replace(',', ' ', $Accept);
		$Accept = str_replace(';', ' ', $Accept);
		$Accept = ' ' . $Accept . ' ';
		
		foreach (array(
				FILE_TYPE_JAD,
				FILE_TYPE_JAR,
				FILE_TYPE_JPG,
				FILE_TYPE_GIF,
				FILE_TYPE_PNG,
				FILE_TYPE_WBMP,
				FILE_TYPE_PMD,
				FILE_TYPE_QCP,
				FILE_TYPE_MID
			) as $num) {
			$info = $GLOBALS['File Types'][$num];
			$Str .= 'File type ' . $info[1] . ' = ';
			
			if (strpos(strtolower($Accept), strtolower($info[1])))$Str .= "YES\n";
			else $Str .= "no\n";
		}
		
		$Str .= "\n";
		
		// Add all header information
		foreach ($_SERVER as $k => $v) {
			$Str .= "$k => $v\n";
		}
		
		// Mail
		$headers = 'From: "Phone Uploader" <' . $GLOBALS['Mail From'] . ">\r\n";
		$headers .= 'Return-Path: <' . $GLOBALS['Mail From'] . ">\r\n";

		// Thread in Gmail with this line
		$headers .= 'In-Reply-To: <' . md5($_SERVER['HTTP_USER_AGENT']) . '-' . $GLOBALS['Admin Email'] . '>';  // No \r\n on last line of headers
		mail($GLOBALS['Admin Email'], 'Unhandled phone: ' . substr($_SERVER['HTTP_USER_AGENT'], 0, 30), $Str, $headers);
	}
}


function IsNormalBrowser($UA) {
	// We count the SDK as a normal browser
	if (! empty($_SERVER['HTTP_X_WAP_PROFILE']) && strpos(strtoupper($_SERVER['HTTP_X_WAP_PROFILE']), 'OPENWAVE.COM') >= 0) {
		return true;
	}
	$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where \'' . EscapeDB($UA) . '\' like UserAgent and UseRecord = 2';
	$r = RunQuery($sql);
	$data = FetchAssoc($r);
	DoneWithResult($r);
	
	if ($data) {
		return true;
	}
	
	return false;
}

/* Returns path info split into an array (split by '/')
 * URL:  file.php/a/b/c    PathInfo: /a/b/c
 * SAMPLE: /JumpCode/filename.ext
 * SAMPLE: /JumpCode/PhoneID/filename.ext */
function GetPathInfo() {
	$PInfo = $_SERVER['PATH_INFO'];
	$ID = split('/', substr($PInfo, 1));
	settype($ID[0], 'integer');
	return $ID;
}


function PhoneDataHas($name) {
	if (! isset($GLOBALS['This Phone']))return false;
	
	if (! is_array($GLOBALS['This Phone']))return false;
	
	if ($name === false)return true;
	
	if (! isset($GLOBALS['This Phone'][$name]))return false;
	return true;
}


function EscapeDB($v) {
	if (function_exists('mysql_real_escape_string')) {
		return mysql_real_escape_string($v);
	}
	return mysql_escape_string($v);
}
