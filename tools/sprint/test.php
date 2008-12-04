<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
Header('Cache-Control: no-store, no-cache, must-revalidate');
Header('Content-type: text/plain');
include('common.inc');
$sql = 'Select * from ' . $GLOBALS['Phones Table'];
$res = RunQuery($sql);
$Data = array();

while ($More = FetchAssoc($res)) {
	$Data[] = $More;
}

DoneWithResult($res);
$headers = array_keys($Data[0]);
echo join("\t", $headers) . "\n";

foreach ($Data as $d) {
	echo join("\t", $d) . "\n";
}

