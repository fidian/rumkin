<?php

include '../../inc/zip.php';
$db_path = getenv('MEDIABASE') . 'software/dnd_helper/';

if (! empty($_REQUEST['filename'])) {
	$filename = $_REQUEST['filename'];
}

$makezip = '';

if (! empty($_REQUEST['makezip'])) {
	$makezip = $_REQUEST['makezip'];
}

if (! isset($_SERVER['PATH_INFO'])) {
	if (! isset($filename))header('Location: index.php');
	$URL = 'Location: makezip.php/' . $filename . '?';
	
	if (is_array($makezip) && count($makezip)) {
		$count = 0;
		
		foreach ($makezip as $file) {
			$file = safety($file);
			
			if ($count ++)$URL .= '&';
			$URL .= $file;
		}
	}
	
	header($URL);
}

$zipname = substr($_SERVER['PATH_INFO'], 1);

if (! isset($_SERVER['QUERY_STRING']))header('Location: index.php');
$files = split('&', $_SERVER['QUERY_STRING']);
$files2 = array();

foreach ($files as $file) {
	$file = safety($file);
	$files2[$db_path . $file] = $file;
}

MakeZipFile($zipname, $files2, true);


function safety($file) {
	$file = str_replace('/', '', $file);
	$file = str_replace('\\', '', $file);
	$file = str_replace('~', '', $file);
	$file = str_replace('..', '', $file);
	return $file;
}

