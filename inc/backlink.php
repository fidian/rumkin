<?php

function BackLink() {
	$links = array();
	
	if (file_exists(getcwd() . '/backlink.txt'))$pre = '';
	elseif (file_exists(getcwd() . '/../backlink.txt'))$pre = '../';
	else return false;
	$links = LoadBackLinks(getcwd() . '/' . $pre . 'backlink.txt', $pre);
	return array(
		$links,
		$pre
	);
}


function LoadBackLinks($fn, $pre) {
	$a = array();
	$b = file($fn);
	
	foreach ($b as $l) {
		$c = explode('|', $l);
		
		if (count($c) == 2) {
			$url = trim($c[1]);
			
			if (! strpos($url, '://') && $url[0] != '/')$url = $pre . $url;
			$a[] = array(
				trim($c[0]),
				$url
			);
		} elseif (trim($l) == '-') {
			$a[] = array();
		} elseif (count($c) == 1) {
			$a[] = array(
				trim($c[0])
			);
		}
	}
	
	return $a;
}

