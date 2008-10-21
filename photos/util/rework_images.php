<?php

// Scans your image directory for images, then makes sure that there is
// a thumbnail, possibly a small image, and an Image record.  Fills in
// information when possible.

chdir('..');
require_once('main.php');
$GLOBALS['IsAdmin'] = true;

ClearOB();

$dir = opendir($image_path);
if (! $dir) {
    die('Unable to open directory ' . $dir);
}

$match_str = '/^([0-9]+)\\.(' . implode('|', array_keys($ext_to_mime)) . ')$/';

while ($filename = readdir($dir)) {
    $process = true;
    if (is_dir($image_path . $filename)) {
	$process = false;
    }
    if ($process && preg_match($match_str, $filename, $matches)) {
	$pic_id = $matches[1];
	$pic_ext = $matches[2];
    } else {
	$process = false;
    }
    if ($process) {
	$imgsize = getimagesize($image_path . $filename);
	if (! $imgsize || ! is_array($imgsize) ||
	    $imgsize[0] < 1 || $imgsize[1] < 1) {
	    $process = false;
	}
    }
    if ($process) {
	$small = $GLOBALS['small_image_path'] . $filename;
	$thumb = $GLOBALS['thumb_image_path'] . $filename;
	if (file_exists($small) && file_exists($thumb)) {
	    $imgsize = getimagesize($small);
	    $imgsize2 = getimagesize($thumb);
	    if ($imgsize && is_array($imgsize) && $imgsize2 && is_array($imgsize2)) {
		$process = false;
	    }
	}
    }
    // Can add other conditions here
    if ($process) {
	echo $filename . "\n";
	$mime = false;
	if (isset($ext_to_mime[$pic_ext])) {
	    $mime = $ext_to_mime[$pic_ext];
	}
	$image_info = ProcessImage($image_path . $filename, $mime, $pic_id);
	if ($image_info['error']) {
	    echo $image_info['msg'];
	    die('oops');
	}
	if ($image_info['msg'] != '') {
	    echo $image_info['msg'] . "\n";
	}
    }
}
