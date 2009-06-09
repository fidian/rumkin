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
$GLOBALS['Database Connection'] = mysql_connect($GLOBALS['Database Server'], $GLOBALS['Database User'], $GLOBALS['Database Password']);
mysql_select_db($GLOBALS['Database Database'], $GLOBALS['Database Connection']) || die(mysql_errno() . ': ' . mysql_error());

// Random chance of cleaning the database
if (($GLOBALS['AutoClean Chance'] > 0 && mt_rand(0, $GLOBALS['AutoClean Chance']) == 0) || isset($GLOBALS['Force Clean'])) {
	CleanDatabase();
}

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

// Returns the record from the FileDesc table.
function GetFileDesc($id) {
	$result = RunQuery('select * from ' . $GLOBALS['FileDesc Table'] . ' where ID = ' . $id);
	$DescData = FetchAssoc($result);
	DoneWithResult($result);
	
	if (! $DescData) {
		Bail('Problem locating file in description table.');
	}
	
	return $DescData;
}

/* Returns the record from the File table
 * Pass in the ID of the record and the fields to grab as per SQL syntax */
function GetFileData($id, $fields) {
	$result = RunQuery('select ' . $fields . ' from ' . $GLOBALS['File Table'] . ' where ID = ' . $id);
	$FileData = FetchAssoc($result);
	DoneWithResult($result);
	
	if (! $FileData) {
		Bail('Problem locating file in data table.');
	}
	
	return $FileData;
}

/* Sends an email - wrapper function to just make sure I don't specify the
 * same things multiple times */
function SendEmailToUser($address, $subj, $body) {
	mail($address, $subj, $body, 'From: ' . $GLOBALS['Mail From'] . "\r\nReturn-Path: " . $GLOBALS['Mail From']);
}

// Sends the file download link to the user
function SendFileToUser($sendto, $id) {
	// get file info
	$DescData = GetFileDesc($id);
	$FileData = GetFileData($DescData['FileID'], 'DescFile, FileType');
	
	// Construct the URL to the jump page
	$URL = $GLOBALS['URL Base'] . 'jump.php/' . $id;
	
	if (strpos($sendto, '@') !== false) {
		// email address
		$username = explode('@', $sendto);
		$username = $username[0];
		$username = preg_replace('/[^0-9]/', '', $username);
		
		if (! in_array($username, $GLOBALS['Ban Phone'])) {
			SendEmailToUser($sendto, $DescData['DescText'], $URL);
		}
	} elseif ($sendto >= 1000000000) {
		if (! in_array($sendto, $GLOBALS['Ban Phone'])) {
			if ($GLOBALS['Use Sprint Website']) {
				if (SendSprintSMS($sendto, $DescData['DescText'] . "\n" . $URL)) {
					// Fall back on sending via email
					SendEmailToUser($sendto . '@messaging.sprintpcs.com', $DescData['DescText'], $URL);
				}
			} else {
				SendEmailToUser($sendto . '@messaging.sprintpcs.com', $DescData['DescText'], $URL);
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

// Returns the ID of the description in the database.
function SaveFileDesc($file_id, $filename, $folder, $desctext, $gallery) {
	// Alter filename if necessary
	if (strlen($filename) > $GLOBALS['Max Name Length']) {
		$ext = substr($filename, strrpos($filename, '.'));
		$filename = substr($filename, $GLOBALS['Max Name Length'] - strlen($ext)) . $ext;
	}
	
	// Add this to the database
	$sql = 'insert into ' . $GLOBALS['FileDesc Table'] . ' (FileID, FileName, Folder, DescText, TimeStamp, ' . 'GallerySuggestion) values (' . $file_id . ', \'' . EscapeDB($filename) . '\', \'' . EscapeDB($folder) . '\', \'' . EscapeDB($desctext) . '\', NOW(), ' . $gallery . ')';
	$result = RunQuery($sql);
	DoneWithResult($result);
	
	// Return the new ID
	$sql = 'select max(ID) as ID from ' . $GLOBALS['FileDesc Table'] . ' where FileID = ' . $file_id . ' and FileName = \'' . EscapeDB($filename) . '\' and Folder = \'' . EscapeDB($folder) . '\' and DescText = \'' . EscapeDB($desctext) . '\'';
	$result = RunQuery($sql);
	
	if ($result && $data = FetchAssoc($result)) {
		DoneWithResult($result);
		return $data['ID'];
	}
	
	DoneWithResult($result);
	Bail('Unable to find newly uploaded description in database.  ' . 'Please try again.');
}

/* Could return array(0, 0) if it had problems finding the width/height
 * Returns array(width, height) */
function GetCustomImageSize($FileID) {
	$FileData = GetFileData($FileID, 'Width, Height');
	
	if (defined($FileData['Width']) && defined($FileData['Height']) && $FileData['Width'] != 0 && $FileData['Height'] != 0) {
		return array(
			$FileData['Width'],
			$FileData['Height']
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
	
	$sql = 'update File set Width = ' . $Width . ', Height = ' . $Height . ' where ID = ' . $FileID;
	$result = RunQuery($sql);
	DoneWithResult($result);
	return array(
		$Width,
		$Height
	);
}

/* Resizes the image to the specified width/height and format
 * format = the file type number (5 = wbmp, etc.)
 * Returns the file data */
function ResizeCustomImage($FileID, $Width, $Height, $Format) {
	$FileData = GetFileData($FileID, 'Width, Height');
	
	if ($FileData['Width'] == $Width && $FileData['Height'] == $Height) {
		$FileData = GetFileData($FileID, 'FileData');
		return $FileData['FileData'];
	}
	
	$sql = 'select * from ' . $GLOBALS['FileThumb Table'] . ' where FileID = ' . $FileID . ' and Width = ' . $Width . ' and Height = ' . $Height . ' and FileType = ' . $Format;
	$result = RunQuery($sql);
	$Data = FetchAssoc($result);
	DoneWithResult($result);
	
	if ($Data) {
		$sql = 'update ' . $GLOBALS['FileThumb Table'] . ' set TimeStamp = NOW() where ID = ' . $Data['ID'];
		$result = RunQuery($sql);
		DoneWithResult($result);
		return $Data['FileData'];
	}
	
	$gd = MakeGD($FileID);
	
	if (! $gd) {
		// Dang -- can't resize
		$FileData = GetFileData($ID, 'FileData');
		return $FileData['FileData'];
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
			echo 'Unknown file type number ' . $FileData['FileType'];
			exit();
	}
	
	$func($gd2);
	$data = ob_get_clean();
	imagedestroy($gd2);
	$sql = 'insert into ' . $GLOBALS['FileThumb Table'] . ' (FileID, Width, Height, FileSize, ' . 'FileType, FileData) values(' . $FileID . ', ' . $Width . ', ' . $Height . ', ' . strlen($data) . ', ' . $Format . ', \'' . EscapeDB($data) . '\')';
	$result = RunQuery($sql);
	DoneWithResult($result);
	return $data;
}


function MakeGD($FileID) {
	$FileData = GetFileData($FileID, 'FileType, FileData');
	
	switch ($FileData['FileType']) {
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
			echo 'Unknown file type number ' . $FileData['FileType'];
			exit();
	}
	
	$fn = tempnam($GLOBALS['Temp Dir'], 'sprint');
	$fp = fopen($fn, 'w');
	fwrite($fp, $FileData['FileData']);
	fclose($fp);
	
	// imagecreatefromstring() could be useful if it knows how to parse it.
	if ($func == 'imagecreatefromgif') {
		$fn2 = tempnam($GLOBALS['Temp Dir'], 'sprint');
		
		/* Yeah, the GIF loading function doesn't work, even though
		 * the patent expired, and only the creation of GIF images
		 * was patented. */
		exec('giftopnm -image 1 ' . $fn . ' | pnmtopng > ' . $fn2);
		unlink($fn);
		$fn = $fn2;
		$func = 'imagecreatefrompng';
	}
	
	$gd = @$func($fn);
	unlink($fn);
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


function CleanDatabase() {
	$FilesInGallery = array();
	
	if (isset($GLOBALS['Force Clean']))echo "Finding items in the gallery (database version)\n";
	$sql = 'select FileID from ' . $GLOBALS['FileCategory Table'];
	$r = RunQuery($sql);
	
	while ($data = FetchAssoc($r)) {
		$FilesInGallery[$data['FileID']] = $data['FileID'];
	}
	
	if (isset($GLOBALS['Force Clean']))echo "Finding items in the gallery (file version)\n";
	$sql = 'select distinct FileID from ' . $GLOBALS['FileDesc Table'] . ' where FilePath != ""';
	$r = RunQuery($sql);
	
	while ($data = FetchAssoc($r)) {
		$FilesInGallery[$data['FileID']] = $data['FileID'];
	}
	
	$DeleteList = array();
	
	if (isset($GLOBALS['Force Clean'])) {
		echo "Scanning all items\n";
		flush();
	}
	
	$sql = 'select ID, ((UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(Uploaded)) ' . '/ 86400) as UpAge, ((UNIX_TIMESTAMP(NOW()) - ' . 'UNIX_TIMESTAMP(Downloaded)) / 86400) as ' . 'DownAge, Seen from ' . $GLOBALS['File Table'] . ' where KeepAround = 0';
	$r = RunQuery($sql);
	
	while ($data = FetchAssoc($r)) {
		// If a file has not been seen by the file manager
		if ($data['Seen'] == 0 && $data['GallerySuggestion'] == 0) {
			// Delete if older than the threshold
			if ($data['UpAge'] > $GLOBALS['Delete If Not Seen']) {
				$DeleteList[] = $data['ID'];
			}
		}
		
		// If not in gallery, but was either seen or is a suggestion
		elseif (! isset($FilesInGallery[$data['ID']])) {
			if ($GLOBALS['Delete If Not In Gallery'] < $data['UpAge']) {
				$DeleteList[] = $data['ID'];
			}
		}
		
		// Yes, it is in the gallery.  Is it something nobody wants?
		elseif ($GLOBALS['Delete If Stale'] < $data['DownAge']) {
			$DeleteList[] = $data['ID'];
		}
	}
	
	DoneWithResult($r);
	
	if (isset($GLOBALS['Force Clean'])) {
		echo 'Deleting expired images (';
		echo count($DeleteList) . " records)\n";
		flush();
	}
	
	if (count($DeleteList)) {
		$sql = 'delete from ' . $GLOBALS['File Table'] . ' where ID in (' . join(', ', $DeleteList) . ')';
		$r = RunQuery($sql);
		DoneWithResult($r);
	}
	
	// Clean up the rest of the tables
	$DeleteList = array();
	$FileList = array();
	$DescList = array();
	
	if (isset($GLOBALS['Force Clean'])) {
		echo "Getting remaining file IDs\n";
		flush();
	}
	
	$r = RunQuery('select ID from ' . $GLOBALS['File Table']);
	
	while ($data = FetchAssoc($r))$FileList[$data['ID']] = $data['ID'];
	DoneWithResult($r);
	
	if (isset($GLOBALS['Force Clean'])) {
		echo "Scanning for expired descriptions\n";
		flush();
	}
	
	$r = RunQuery('select ID, FileID from ' . $GLOBALS['FileDesc Table']);
	
	while ($data = FetchAssoc($r)) {
		if (! isset($FileList[$data['FileID']]))$DeleteList[] = $data['ID'];
		else $DescList[$data['ID']] = $data['ID'];
	}
	
	DoneWithResult($r);
	
	if (isset($GLOBALS['Force Clean'])) {
		echo 'Deleting expired entries from description table (';
		echo count($DeleteList) . " records)\n";
		flush();
	}
	
	if (count($DeleteList)) {
		$r = RunQuery('delete from ' . $GLOBALS['FileDesc Table'] . ' where ID in (' . join(', ', $DeleteList) . ')');
		DoneWithResult($r);
	}
	
	if (isset($GLOBALS['Force Clean'])) {
		echo "Scanning for thumbnails to delete\n";
		flush();
	}
	
	$DeleteList = array();
	$r = RunQuery('select ID, FileID from ' . $GLOBALS['FileThumb Table']);
	
	while ($data = FetchAssoc($r)) {
		if (! isset($FileList[$data['FileID']]))$DeleteList[] = $data['ID'];
	}
	
	DoneWithResult($r);
	
	if (isset($GLOBALS['Force Clean'])) {
		echo 'Deleting expired thumbnails (';
		echo count($DeleteList) . " records)\n";
		flush();
	}
	
	if (count($DeleteList)) {
		$r = RunQuery('delete from ' . $GLOBALS['FileThumb Table'] . ' where ID in (' . join(', ', $DeleteList) . ')');
		DoneWithResult($r);
	}
	
	if (isset($GLOBALS['Force Clean'])) {
		echo "Finding expired gallery associations for unpopular images\n";
		flush();
	}
	
	$DeleteList = array();
	$DeleteListDesc = array();
	$r = RunQuery('select distinct FileID, DescID from ' . $GLOBALS['FileCategory Table']);
	
	while ($data = FetchAssoc($r)) {
		if (! isset($FileList[$data['FileID']]))$DeleteList[] = $data['FileID'];
		
		if (! isset($DescList[$data['DescID']]))$DeleteListDesc[] = $data['DescID'];
	}
	
	DoneWithResult($r);
	
	if (isset($GLOBALS['Force Clean'])) {
		echo 'Deleting associations that are bad (';
		echo count($DeleteList) . ' FileID, ';
		echo count($DeleteListDesc) . " DescID)\n";
		flush();
	}
	
	if (count($DeleteList)) {
		$r = RunQuery('delete from ' . $GLOBALS['FileCategory Table'] . ' where FileID in (' . join(', ', $DeleteList) . ')');
		DoneWithResult($r);
	}
	
	if (count($DeleteListDesc)) {
		$r = RunQuery('delete from ' . $GLOBALS['FileCategory Table'] . 'where DescID in (' . join(', ', $DeleteListDesc) . ')');
		DoneWithResult($r);
	}
	
	if (isset($GLOBALS['Force Clean']) && $GLOBALS['Optimize Tables']) {
		echo "Optimizing Tables\n";
		flush();
		
		foreach (array(
				'Category Table',
				'File Table',
				'FileCategory Table',
				'FileDesc Table',
				'FileThumb Table',
				'Phones Table'
			) as $TableNameG) {
			$TableName = $GLOBALS[$TableNameG];
			
			if (isset($GLOBALS['Force Clean'])) {
				echo " ... $TableName\n";
				flush();
			}
			
			$r = RunQuery("optimize table $TableName");
			DoneWithResult($r);
		}
	}
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

/* Shows a standard table
 * 
 * $data is the HTML to show in the cells of the table
 * $extra is an associative array of extra parameters
 *   'OnlyPageOne' => true    Only shows page 1. */
function ShowTableWithLinks($data, $extra = false) {
	if ($extra === false || ! is_array($extra))$extra = array();
	
	if (isset($extra['OnlyPageOne']) && $extra['OnlyPageOne']) {
		$page = 1;
	} else {
		$page = 1;
		
		if (isset($_GET['Page']))$page = $_GET['Page'];
		
		if (isset($_POST['Page']))$page = $_POST['Page'];
		settype($page, 'integer');
		$max = ceil(count($data) / ($GLOBALS['List Rows'] * $GLOBALS['List Cols']));
		$page = min(max($page, 1), $max);
		$skip = ($page - 1) * $GLOBALS['List Rows'] * $GLOBALS['List Cols'];
		
		while ($skip --)array_shift($data);
	}
	
	if (! isset($extra['OnlyPageOne']) || ! $extra['OnlyPageOne'])ShowPageLinks($page, $max, $extra);
	
	if (isset($extra['DoFilter']) && $extra['DoFilter'])ShowExcludeForm();
	ShowTableWithLinks_Table($data, $extra);
	
	if (! isset($extra['OnlyPageOne']) || ! $extra['OnlyPageOne'])ShowPageLinks($page, $max, $extra);
}


function ShowTableWithLinks_Table(&$data, $extra) {
	echo '<table border=1 cellpadding=3 cellspacing=0 align=center>';
	$i = $GLOBALS['List Rows'];
	
	while ($i > 0 && ShowTableWithLinks_Row($data, $extra)) {
		$i --;
	}
	
	echo '</table>';
}


function ShowTableWithLinks_Row(&$data, $extra) {
	if (count($data) == 0)return 0;
	echo '<tr>';
	$i = $GLOBALS['List Cols'];
	
	while ($i >= 1 && count($data) > 0) {
		ShowTableWithLinks_Cell(array_shift($data), $extra);
		$i --;
	}
	
	if ($i) {
		echo "<td colspan=$i>&nbsp;</td>";
	}
	
	echo "</tr>\n";
	return count($data);
}


function ShowTableWithLinks_Cell($data, $extra) {
	if (isset($extra['CellCallback'])) {
		$func = $extra['CellCallback'];
		$func($data);
	} else {
		echo '<td align=center>';
		echo $data;
		echo "</td>\n";
	}
}


function ShowPageLinks($page, $max, $extra) {
	if ($max == 1)return;
	echo 'Show page: ';
	
	for ($i = 1; $i <= $max; $i ++) {
		if ($i != $page) {
			echo ' <a href="' . $_SERVER['PHP_SELF'] . '?Page=' . $i;
			$amp = 0;
			
			if (isset($extra['DoFilter']) && $extra['DoFilter'] && isset($GLOBALS['filter']) && count($GLOBALS['filter'])) {
				$amp = 1;
				echo '&filter=' . join(',', $GLOBALS['filter']);
			}
			
			if (isset($GLOBALS['size'])) {
				echo '&size=' . $GLOBALS['size'];
			}
			
			echo '">' . $i . '</a>';
		} else {
			echo " <b>$i</b>";
		}
	}
	
	echo "\n";
}


function ShowExcludeForm() {
	echo '<form method=post action="' . $_SERVER['PHP_SELF'] . '">';
	echo 'Min size:  <input type=text name=size value="';
	$size = 0;
	
	if (isset($GLOBALS['size']))$size = $GLOBALS['size'];
	echo $size . '"> kilobytes<br>';
	echo '<input type=submit value="Exclude">';
	echo '<input type=hidden name=skip value="0">';
	$OnOff = array();
	
	foreach ($GLOBALS['File Types'] as $i => $v) {
		$OnOff[$i] = 1;
	}
	
	if (isset($GLOBALS['filter'])) {
		foreach ($GLOBALS['filter'] as $f) {
			$OnOff[$f] = 0;
		}
	}
	
	foreach ($GLOBALS['File Types'] as $i => $v) {
		echo "<input type=checkbox value=$i name=filter[]";
		
		if ($OnOff[$i] == 0)echo ' CHECKED';
		echo '> ';
		
		if (is_array($v[0]))echo $v[0][0];
		else echo $v[0];
		echo '&nbsp; ';
	}
	
	echo "</form>\n";
}

/* Writes the description file
 * If the phone doesn't need it, proceeds directly to download */
function OutputDescFile($ID, $PhoneID = false) {
	SendPossibleLog();
	
	// Update the downloaded time
	$sql = 'update ' . $GLOBALS['File Table'] . ' set Downloaded = NOW() where id = ' . $ID;
	$result = RunQuery($sql);
	DoneWithResult($result);
	
	// Get info for file and description
	$FileDesc = GetFileDesc($ID);
	$FileData = GetFileData($FileDesc['FileID'], 'ID, FileType, DescFile, FileSize');
	
	if ($ID == 1159842) {
		var_dump($FileDesc);
		exit();
	}
	
	if ($FileData['FileType'] == FILE_TYPE_JAR) {
		OutputDescFile_Jar($FileData, $FileDesc, $PhoneID);
	} else {
		OutputDescFile_GCD($FileData, $FileDesc, $PhoneID);
	}
}

/* NOTE:  The Samsung VI660 *requires* a Content-Folder
 * Juicy info at http://sprintdevelopers.com/article10.html */
function OutputDescFile_Jar($FileData, $FileDesc, $PhoneID = false) {
	// Write a JAD file
	Header('Content-Type: ' . $GLOBALS['File Types'][FILE_TYPE_JAD][1]);
	$m = str_replace("\r\n", "\n", $FileData['DescFile']);
	$m = str_replace("\r", "\n", $m);
	$m = split("\n", $m);
	$did_icon = false;
	$did_name = false;
	$Alt_Icon = false;
	$Alt_Name = false;
	echo 'MIDlet-Jar-URL: ' . $GLOBALS['URL Base'] . 'dl.php/' . $FileDesc['FileID'] . '/';
	
	if (PhoneDataHas('ID'))echo $GLOBALS['This Phone']['ID'] . '/';
	echo $FileDesc['FileName'] . "\n";
	echo 'MIDlet-Jar-Size: ' . $FileData['FileSize'];
	
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
	
	if (isset($FileDesc['Folder']) && $FileDesc['Folder'] != '')echo "\nContent-Folder: " . $FileDesc['Folder'];
	
	/* For our Canadian friends.
	 *    $jad_file = $FileDesc['FileName'];
	 *    $jad_file = substr($jad_file, 0, strrpos($jad_file, '.')) . '.jad';
	 *    echo 'Confirm-URL: ' . $GLOBALS['URL Base'] . 'desc.php/' .
	 *      $FileDesc['ID'] . '/' . $jad_file . "\n"; */
}


function OutputDescFile_GCD($FileData, $FileDesc, $PhoneID = false) {
	ResizeImageIfNeedBe($FileData);
	
	// Display a GCD file
	Header('Content-Type: ' . $GLOBALS['File Types'][FILE_TYPE_GCD][1]);
	
	// Spit out header
	echo 'Content-Type: ' . $GLOBALS['File Types'][$FileData['FileType']][1] . "\n";
	
	switch ($GLOBALS['File Types'][$FileData['FileType']][3]) {
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
	
	if (trim($FileDesc['DescText']) != '')echo 'Content-Name: ' . $FileDesc['DescText'] . "\n";
	else echo "Content-Name: Untitled\n";
	echo 'Content-Version: ' . $GLOBALS['Content Version'] . "\n";
	echo 'Content-Vendor: ' . $GLOBALS['Content Vendor'] . "\n";
	echo 'Content-URL: ' . $GLOBALS['URL Base'] . 'dl.php/' . $FileDesc['FileID'] . '/';
	
	if (PhoneDataHas('ID'))echo $GLOBALS['This Phone']['ID'] . '/';
	echo $FileDesc['FileName'] . "\n";
	echo 'Content-Size: ' . $FileData['FileSize'] . "\n";
	
	/* For our Canadian friends.
	 *    $gcd_file = $FileDesc['FileName'];
	 *    $gcd_file = substr($gcd_file, 0, strrpos($gcd_file, '.')) . '.gcd';
	 *    echo 'Confirm-URL: ' . $GLOBALS['URL Base'] . 'desc.php/' .
	 *      $FileDesc['ID'] . '/' . $gcd_file . "\n"; */
	echo "\n";
}


function ResizeImageIfNeedBe(&$FileData) {
	if (! PhoneDataHas(false))return;
	
	if ($FileData['FileType'] != FILE_TYPE_WBMP && $FileData['FileType'] != FILE_TYPE_JPG && $FileData['FileType'] != FILE_TYPE_PNG && $FileData['FileType'] != FILE_TYPE_GIF)return;
	$dimensions = GetCustomImageSize($FileData['ID']);
	
	if ($dimensions[0] == 0 || $dimensions[1] == 0)return;
	$thumbSize = ImageBestFit($dimensions[0], $dimensions[1], $GLOBALS['This Phone']['Width'], $GLOBALS['This Phone']['Height']);
	
	if ($thumbSize[0] == $dimensions[0] && $thumbSize[1] == $dimensions[1])return;
	
	// Find best image format
	if ($GLOBALS['This Phone']['Jpg'])$UseFormat = FILE_TYPE_JPG;
	elseif ($GLOBALS['This Phone']['Png'])$UseFormat = FILE_TYPE_PNG;
	elseif ($GLOBALS['This Phone']['Wbmp'])$UseFormat = FILE_TYPE_WBMP;
	else $UseFormat = FILE_TYPE_JPG;
	$FileData['FileData'] = ResizeCustomImage($FileData['ID'], $thumbSize[0], $thumbSize[1], $UseFormat);
	$FileData['FileType'] = $UseFormat;
	$FileData['FileSize'] = strlen($FileData['FileData']);
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
		mail($GLOBALS['Admin Email'], 'Unhandled phone: ' . substr($_SERVER['HTTP_USER_AGENT'], 0, 30), $Str, 'From: ' . $GLOBALS['Admin Email']);
	}
}


function IsNormalBrowser($UA) {
	// We count the SDK as a normal browser
	if (strpos(strtoupper($_SERVER['HTTP_X_WAP_PROFILE']), 'OPENWAVE.COM') >= 0)return true;
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
