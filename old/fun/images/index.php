<?php

include '../../functions.inc';
$Images = MyScanDir(getenv('MEDIABASE') . 'fun/images');

if (! isset($_REQUEST['id']) || ! isset($Images[$_REQUEST['id']])) {
	Redirect('/fun/images/index.php?id=' . rand(0, count($Images) - 1));
}

StandardHeader(array(
		'title' => 'Fun Images',
		'topic' => 'images'
	));
$Image = $Images[$_REQUEST['id']];
$next = ($_REQUEST['id'] + 1) % count($Images);
$prev = ($_REQUEST['id'] - 1 + count($Images)) % count($Images);
$random = rand(0, count($Images) - 1);
echo '<div align="center">';
echo '<p><a href="?id=' . $prev . '">Prev</a> - <a href="?id=' . $random . '">Random</a> - <a href="?id=' . $next . '">Next</a></p>';

if (! is_array($Image)) {
	echo '<img src="media/' . $Image . '">';
} else {
	foreach ($Image as $file) {
		echo '<img src="media/' . $file . '"><br>';
	}
}

echo '</div>';
$DescName = preg_replace('/[0-9]*\.(jpg|gif)$/i', '.txt', $Image);

if (file_exists($DescName)) {
	echo '<br>';
	MakeBoxTop('center');
	readfile($DescName);
	MakeBoxBottom();
}

StandardFooter();


function MyScanDir($dirname) {
	$Images = array();
	$dir = opendir($dirname);
	
	while (($file = readdir($dir)) !== false) {
		if ($file[0] != '.') {
			$fullname = $dirname . '/' . $file;
			
			if (preg_match('/(.*[^0-9])([0-9]*)\.(jpg|gif)$/i', $file, $matches)) {
				$key = $matches[1];
				
				if (isset($Images[$key])) {
					if (! is_array($Images[$key])) {
						$Images[$key] = array(
							$Images[$key]
						);
					}
					
					$Images[$key][] = $file;
				} else {
					$Images[$key] = $file;
				}
			}
		}
	}
	
	ksort($Images);
	return array_values($Images);
}

