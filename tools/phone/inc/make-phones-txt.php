<?PHP
/* Mobile Phone File Uploader
 * 
 * Copyright (C) 2007 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 */

// Dumps the phone listing in the database to a tab-delimited text file
// for use by sites that do not store their phone listing in a database.

require_once('config.php');
require_once('db.php');

$results = DbSelect('*', 'Phones');

$headers = 0;

while ($rec = DbFetch($results))
{
    if (! $headers)
    {
	$headers = array_keys($rec);
	$line = array();
	foreach ($headers as $h)
	{
	    $line[] = $h;
	}
	echo implode("\t", $line) . "\n";
    }
    
    $line = array();
    foreach ($headers as $h)
    {
	$line[] = $rec[$h];
    }
    echo implode("\t", $line) . "\n";
}

DbFree($results);