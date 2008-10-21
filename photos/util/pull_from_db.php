<?php

// Conversion program to pull images out of the database and place
// them into the file structure.

chdir('..');
require_once('main.php');

ClearOB();

$sql = 'SELECT Id, Format, Image FROM Images';

$res = dbi_query($sql);
if (! $res) {
    BadSQL($sql);
}

while ($row = dbi_fetch_row($res)) {
    if (isset($mime_to_ext[$row['Format']])) {
	$fn = $image_path . $row['Id'] . $mime_to_ext[$row['Format']];
	$fp = fopen($fn, 'w');
	if (! $fp) {
	    echo "Unable to open file {$fn} for writing.\n";
	} else {
	    echo "Saving {$row[Id]}\n";
	    fwrite($fp, $row['Image']);
	    fclose($fp);
	}
    } else {
	echo "Unknown format: {$row[Format]}\n";
	echo "Not saving this file.\n";
    }
    $row = false;
}
dbi_free_result($res);
