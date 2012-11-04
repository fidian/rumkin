<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */


/* Displays the GCD file or the JAD file as appropriate for the download.
 * Sets the headers automatically so no server configuration is needed.
 */
Header('Cache-Control: no-store, no-cache, must-revalidate');
include('common.inc');
$ID = GetPathInfo();
$PhoneID = false;

if (isset($ID[2])) {
	$PhoneID = $ID[1];
}

$GLOBALS['This Phone'] = GetPhoneInfo($PhoneID);
OutputDescFile($ID[0], $PhoneID);
