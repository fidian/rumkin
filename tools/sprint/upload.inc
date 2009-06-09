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
	
	// Handle the gallery submissions
	$gallery = 0;
	
	if (isset($_POST['gallery']) && $_POST['gallery'] && $GLOBALS['Gallery Submissions']) {
		$gallery = 1;
	}
	
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
		$file_id = SaveFile($filetype, $_FILES['fn']['tmp_name'], false);
		$id = SaveFileDesc($file_id, $safefn, '', $_POST['desc'], $gallery);
	} else {
		$safefn = SafeFilename($_FILES['jar']['name']);
		
		/* This may not work if you have safe mode enabled.  Safe mode does
		 * not like it when you access the temporary file directly. */
		$desc_data = unzip($_FILES['jar']['tmp_name'], 'META-INF/MANIFEST.mf', true);
		
		if ($desc_data == false || $desc_data == '')Bail('Unable to get META-INF/MANIFEST.mf data.  Did you upload a midlet?');
		
		// Save the info into the database
		$file_id = SaveFile(FILE_TYPE_JAR, $_FILES['jar']['tmp_name'], $desc_data);
		$id = SaveFileDesc($file_id, $safefn, $folder, '', $gallery);
	}
	
	$DescURL = SendFileToUser($sendto, $id);
	$DescFile = GetFileDesc($id);
	$DescFile['URL'] = $DescURL;
	$DescFile['URL2'] = $GLOBALS['URL Base'] . 'dl.php/' . $DescFile['FileID'] . '/' . $DescFile['FileName'];
	$DescFile['SendTo'] = $sendto;
	$DescFile['Jump'] = $id;
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

/* Saves the file to the database, or skips saving if the file is already
 * there.  Must match MD5, mime type, file size, and descfile if that
 * exists. */
function SaveFile($filetype, $filetmpname, $desctext) {
	// Load description data
	$descdata = '';
	
	if ($desctext != false) {
		$descdata = $desctext;
		
		// Alter the description data to have consistent line feeds
		$descdata = str_replace("\r\n", "\n", $descdata);
		$descdata = str_replace("\r", "\n", $descdata);
	}
	
	// Load file data
	$filesize = filesize($filetmpname);
	$fp = fopen($filetmpname, 'rb');
	
	if (! $fp)Bail('Can not open temporary file.  System misconfigured.');
	$filedata = fread($fp, $filesize);
	fclose($fp);
	$md = md5($filedata);
	
	// See if this is already in the database
	$sql = 'select ID from ' . $GLOBALS['File Table'] . ' where FileMD5 = \'' . EscapeDB($md) . '\' and FileType = \'' . EscapeDB($filetype) . '\' and FileSize = ' . $filesize . ' and DescFile = \'' . EscapeDB($descdata) . '\'';
	$result = RunQuery($sql);
	
	if ($result && $data = FetchAssoc($result)) {
		DoneWithResult($result);
		
		// Update the uploaded time to keep the file around
		$sql = 'update ' . $GLOBALS['File Table'] . ' set Uploaded = NOW() where ID = ' . $data['ID'];
		$r = RunQuery($sql);
		DoneWithResult($r);
		return $data['ID'];
	}
	
	// File does not exist.  Add to database.
	$sql = 'insert into ' . $GLOBALS['File Table'] . ' (FileMD5, FileData, FileType, DescFile, FileSize, Uploaded, ' . 'Downloaded) ' . ' values (\'' . $md . '\', \'' . EscapeDB($filedata) . '\', \'' . EscapeDB($filetype) . '\', \'' . EscapeDB($descdata) . '\', ' . $filesize . ', NOW(), NOW())';
	$result = RunQuery($sql);
	DoneWithResult($result);
	
	// Return the new ID
	$sql = 'select ID from ' . $GLOBALS['File Table'] . ' where FileMD5 = \'' . EscapeDB($md) . '\' and FileType = \'' . EscapeDB($filetype) . '\' and FileSize = ' . $filesize . ' and DescFile = \'' . EscapeDB($descdata) . '\'';
	$result = RunQuery($sql);
	
	if ($result && $data = FetchAssoc($result)) {
		DoneWithResult($result);
		return $data['ID'];
	}
	
	DoneWithResult($result);
	Bail('Unable to find newly uploaded file in database.  ' . 'Please try again.');
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

