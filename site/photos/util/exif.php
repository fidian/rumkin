<?php
/* Scans your image directory for images, then makes sure that there is
 * a thumbnail, possibly a small image, and an Image record.  Fills in
 * information when possible. */
chdir('..');
require_once('main.php');
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
		
		if (! $imgsize || ! is_array($imgsize) || $imgsize[0] < 1 || $imgsize[1] < 1) {
			$process = false;
		}
	}
	
	// Can add other conditions here
	if ($process) {
		echo $filename . "\n";
		$mime = false;
		
		if (isset($ext_to_mime[$pic_ext])) {
			$mime = $ext_to_mime[$pic_ext];
		}
		
		$exif = exif_read_data($image_path . $filename, 'IFD0');
		echo $exif === false ? "No header data found.\n" : "Image contains headers\n";
		$exif = exif_read_data($image_path . $filename, 0, true);
		
		foreach ($exif as $key => $section) {
			foreach ($section as $name => $val) {
				echo "$key.$name: $val\n";
			}
		}
	}
}

