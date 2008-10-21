<?php

require_once('main.php');

$id = -1;
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
    settype($id, 'integer');
}
if ($id <= 0) {
    die('Bad Image ID');
}

$dir = $image_path;
$count = true;
if (isset($_REQUEST['type'])) {
    if ($_REQUEST['type'] == 't') {
	$dir = $thumb_image_path;
	$count = false;
    } elseif ($_REQUEST['type'] == 's') {
	$dir = $small_image_path;
    }
}

if ($count) {
    $sql = 'UPDATE Images set Views = Views + 1 WHERE Id = ' . $id;
    $res = dbi_query($sql);
    if (! $res) {
	BadSQL($sql);
    }
}

$headers = getallheaders();

if (isset($headers['If-Modified-Since'])) {       
    $sincets=HTTP11DateParser(trim($headers['If-Modified-Since']));
} else {
    $sincets=-1;
}

foreach ($ext_to_mime as $ext => $mime) {
    $fn = $dir . $id . '.' . $ext;
    if (file_exists($fn)) {
	// Possibly check the date
	if ($sincets > -1) {
	    if (filemtime($fn) <= $sincets) {
		// No change
		header('Pragma: ');
		header('Cache-Control: cache');
		header("HTTP/1.1 304 Not Modified");
		return;
	    }
	}
	
	// Deliver the file
	header('Content-type: ' . $mime);
	header('Last-Modified: ' . timet2httpdate(filemtime($fn)));
	header('Content-Length: ' . filesize($fn));
	header('Pragma: ');
	header('Cache-Control: cache');
	
	$bytes = filesize($fn);
	$fp = fopen($fn, 'r');
	while ($bytes > 4096) {
	    echo fread($fp, 4096);
	    $bytes -= 4096;
	}
	echo fread($fp, $bytes);
	return;
    }
}

// Bad image.
die('Image ' . $id . ' not found.');
