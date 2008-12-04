<?php


// -*- php -*-
include'../../functions.inc';


function MarcoHeader($title = '') {
	if ($title != '')$title = ':  ' . $title;
	StandardHeader(array(
			'title' => 'Marco' . $title,
			'topic' => 'marco',
			'icon' => '/software/marco/images/marco.ico'
		));
}


function MarcoFooter() {
	StandardFooter();
}


function LoadHFiles() {
	// Load version.h
	$fp = fopen('version.h', 'r');
	
	while ($line = fgets($fp, 1024)) {
		$parts = explode(' ', $line, 3);
		$name = $parts[1];
		$value = trim($parts[2]);
		
		if ($value[0] == '"')$value = substr($value, 1, strlen($value) - 2);
		$GLOBALS[$name] = $value;
	}
}

