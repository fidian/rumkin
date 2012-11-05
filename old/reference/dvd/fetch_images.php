#!/usr/bin/php -d allow_url_fopen=On
<?php

require 'movies.php';
$fetched = 0;

foreach ($GLOBALS['Movies'] as $name => $movieInfo) {
	$imageName = $name;
	$replacements = array(
		'/ /' => '_',
		'/&amp;/' => '',
		'/[^-a-zA-Z0-9_]/' => '',
		'/__+/' => '_',
		'/_The$/' => '',
	);
	$imageName = preg_replace(array_keys($replacements), $replacements, $imageName);
	echo $imageName;
	$imageName = '/var/www/rumkin-media/reference/dvd/' . $imageName . '.';
	
	if (isset($movieInfo['imdb']) && ! file_exists($imageName . 'gif') && ! file_exists($imageName . 'jpg')) {
		$url = 'http://us.imdb.com/title/' . $movieInfo['imdb'];
		delay();
		$file = file_get_contents($url);
		$x = explode('name="poster"', $file);
		$x = $x[1];
		$x = explode('src="', $x);
		$x = $x[1];
		$x = explode('"', $x);
		$x = $x[0];
		echo ' ...';
		
		if (substr($x, 0, 7) == 'http://') {
			delay();
			$imageContents = file_get_contents($x);
			$ext = explode('.', $x);
			$ext = array_pop($ext);
			file_put_contents($imageName . $ext, $imageContents);
		}
	}
	
	echo "\n";
	$fetched ++;
}


function delay($seconds = 3) {
	$bs = chr(8);
	echo ' ';
	
	while ($seconds) {
		echo $seconds;
		sleep(1);
		$back = str_repeat($bs . ' ' . $bs, strlen($seconds));
		echo $back;
		$seconds --;
	}
	
	echo $bs;
}

