<?php
/* -*- php -*-
 * / * Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 * /
 * / * Utility functions to handle the uploading.  Removed from upload.php to
 * try to separate code from layout.
 * / */
function HandleUpload() {
	// Remove slashes
	if (get_magic_quotes_gpc()) {
		foreach ($_POST as $k => $v) {
			$_POST[$k] = stripslashes($v);
		}
	}
	
	if (! isset($_POST['handle']) || ($_POST['handle'] != 'upload' && $_POST['handle'] != 'upload2'))
		Bail('Problem getting information from upload form.');
	$is_jar = false;
	
	if ($_POST['handle'] == 'upload2')$is_jar = true;
	
	/* phone number or email address = sendto
	 * Single file:
	 *   subject of email, name of file = desc
	 *   single file = fn
	 * Java midlet:
	 *   jar file = jar
	 *   Folder name = fldr (defaults to "default")
	 *   If $_POST['fldr'], user defined folder = userdeffldr
	 * Make sure it is a proper upload by doing all possible
	 * error checking right now */
	if (! isset($_POST['sendto']))$sendto = '';
	else
	
	// This cleans up the recipient, or calls Bail()
	$sendto = FilterSendto($_POST['sendto']);
	
	// If just the single file
	if (! $is_jar) {
		// Check the description
		if (! isset($_POST['desc']) || trim($_POST['desc']) == '')Bail('You must enter a description of the file.');
		
		// Check the file, make sure one was uploaded
		if (! isset($_FILES['fn']))Bail('You need to select a file to upload.');
		
		// Check file size
		if ($_FILES['fn']['size'] < 1)Bail('Uploaded file had no data or is WAY too big.  Try again.');
		
		if ($_FILES['fn']['size'] > $GLOBALS['Max File Size'])Bail('File is too large.  Please keep it under ' . $GLOBALS['Max File Size'] . ' bytes.');
		
		// Check file extension
		if (isset($GLOBALS['File Match']) && isset($GLOBALS['File Match Message']) && ! preg_match($GLOBALS['File Match'], $_FILES['fn']['name']))Bail($GLOBALS['File Match Message']);
	} else {
		/* JAR file
		 * Check folder name */
		if (isset($_POST['fldr']) && $_POST['fldr'] != 'default') {
			$folder = $_POST['fldr'];
			
			if ($folder == 'userdef') {
				$folder = $_POST['userdeffldr'];
			}
			
			if ($folder == '')unset($folder);
		}
		
		if (! isset($folder))$folder = '';
		
		// Check file sizes
		if ($_FILES['jar']['size'] < 1)Bail('Java midlet had no data or was WAY too big.  Try again.');
		
		if ($_FILES['jar']['size'] > $GLOBALS['Max File Size'])Bail('Java midlet is too large.  Please keep it under ' . $GLOBALS['Max File Size'] . ' bytes.');
		
		// Check file extension
		if (isset($GLOBALS['Jar Match']) && isset($GLOBALS['Jar Match Message']) && ! preg_match($GLOBALS['Jar Match'], $_FILES['jar']['name']))Bail($GLOBALS['Jar Match Message']);
	}
	
	// Create a proper descriptor
	if (isset($_FILES['fn'])) {
		$ext = $_FILES['fn']['name'];
		$ext = substr($ext, strrpos($ext, '.') + 1);
		$filetype = GetFileType($ext);
		$safefn = SafeFilename($_FILES['fn']['name']);
		
		// Save the info into the database
		$code = SaveFile($_FILES['fn']['tmp_name']);
		SaveFileDesc($code, $safefn, '', $_POST['desc'], $filetype);
	} else {
		$safefn = SafeFilename($_FILES['jar']['name']);
		
		/* This may not work if you have safe mode enabled.  Safe mode does
		 * not like it when you access the temporary file directly. */
		$desc_data = unzip($_FILES['jar']['tmp_name'], 'META-INF/MANIFEST.mf', true);
		
		if ($desc_data == false || $desc_data == '')Bail('Unable to get META-INF/MANIFEST.mf data.  Did you upload a midlet?');
		
		// Save the info into the database
		$code = SaveFile($_FILES['jar']['tmp_name'], $desc_data);
		SaveFileDesc($code, $safefn, $folder, '', FILE_TYPE_JAR);
	}
	
	$DescURL = SendFileToUser($sendto, $code);
	$DescFile = GetFileData($code);
	$DescFile['URL'] = $DescURL;
	$DescFile['URL2'] = $GLOBALS['URL Base'] . 'dl.php/' . $code . '/' . $DescFile['name'];
	$DescFile['SendTo'] = $sendto;
	$DescFile['Jump'] = $code;
	return $DescFile;
}

/* Returns an appropriate file type number (see config.inc)
 * Pass in 'jad', get 3 */
function GetFileType($Ext) {
	$Ext = strtolower($Ext);
	
	foreach ($GLOBALS['File Types'] as $idx => $data) {
		if (is_array($data[0])) {
			foreach ($data[0] as $test) {
				if ($Ext == $test)return $idx;
			}
		} elseif ($data[0] == $Ext)return $idx;
	}
	
	return 0;
}


function FilterSendto($sendto) {
	$sendto = $_POST['sendto'];
	
	if (strpos($sendto, '@') !== false) {
		// Treat as email address.  Remove stuff that could be bad.  Be strict.
		$sendto = preg_replace('/[^@a-zA-Z0-9\.\-_]/', '', $sendto);
		
		if (! preg_match('/.+@.+/', $sendto))Bail("The email address \"$sendto\" is invalid.");
		
		if ($GLOBALS['Only Provider Emails']) {
			$host = strpos($sendto, '@');
			$host = substr($sendto, $host);
			$host = strtolower($host);
			$pass = false;
			
			foreach ($GLOBALS['Providers'] as $testhost) {
				if ($testhost == $host) {
					$pass = true;
				}
			}
			
			if ($pass == false) {
				Bail("The email address \"$sendto\" $host is not allowed.  " . 'Only email to specific providers is allowed.  If ' . 'your phone\'s provider is not in my list, please ' . 'contact the administrator of this site.');
			}
		}
	} else {
		// Treat as phone number.  Remove stuff that could be bad.  Be strict.
		$sendto = preg_replace('/[^0-9]/', '', $sendto);
		
		if (strlen($sendto) != 10 && strlen($sendto) != 0)Bail('Phone number must be 10 digits long.');
	}
	
	return $sendto;
}


function SafeFilename($fn) {
	// Replace bad letters with _
	return preg_replace('/[^a-z0-9A-Z\-\._]/', '_', $fn);
}

