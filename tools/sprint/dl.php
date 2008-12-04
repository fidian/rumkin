<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */


/* Sends the file to the phone.  Optionally resizes it to fit the screen,
 * if given a known user agent string.  Sets the appropriate content type
 * header so no server configuration is necessary.
 */
Header('Cache-Control: no-store, no-cache, must-revalidate, no-transform');
include('common.inc');
$info = GetPathInfo();
$ID = $info[0];
$PhoneID = false;

if (count($info) < 2) {
	echo "Bad path info\n";
	exit;
}

if (count($info) == 3) {
	$PhoneID = $info[1];
}

$GLOBALS['This Phone'] = GetPhoneInfo($PhoneID);
SendPossibleLog();


// Get info for file and description
$FileData = GetFileData($ID, '*');


// Update the downloaded time
$sql = 'update ' . $GLOBALS['File Table'] . ' set Downloaded = NOW() where id = ' . $ID;
$result = RunQuery($sql);
DoneWithResult($result);
ResizeImageIfNeedBe($FileData);
Header('Content-Type: ' . $GLOBALS['File Types'][$FileData['FileType']][1]);
Header('Content-Length: ' . $FileData['FileSize']);
echo $FileData['FileData'];
