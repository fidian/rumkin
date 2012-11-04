<?php

$dir = opendir('.');
$GLOBALS['Tests'] = array();

while ($file = readdir($dir)) {
	if (preg_match('/\\.inc$/i', $file) && $file != 'alltests.inc')
	require_once($file);
}

closedir($dir);
ksort($GLOBALS['Tests']);
