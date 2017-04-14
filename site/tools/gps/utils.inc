<?php
/* Takes decimal degrees and converts it into a string
 * DegToDM(-93.12345, 0) returns 'W 093&deg; 07.407' */
function DegToDM($deg, $NS) {
	if ($NS) {
		$c = 'N';
		
		if ($deg < 0) {
			$c = 'S';
			$deg = - $deg;
		}
	} else {
		$c = 'E';
		
		if ($deg < 0) {
			$c = 'W';
			$deg = - $deg;
		}
	}
	
	$m = $deg * 60;
	$m = round($m, 3);
	$d = $m / 60;
	settype($d, 'integer');
	$m = $m - $d * 60;
	$c .= ' ';
	
	if (! $NS && $d < 100)$c .= '0';
	
	if ($d < 10)$c .= '0';
	$c .= $d . ' ';
	
	if ($m < 10)$m = '0' . $m;
	
	while (strlen($m) < 6)$m .= '0';
	$c .= $m;
	return $c;
}

// Takes a string and converts it into decimal degrees
function DegreeConvert($s) {
	$posneg = 1;
	
	if (preg_match('/[\\-SsWw]/', $s))$posneg = - 1;
	$s = explode(' ', trim(preg_replace('/[^0-9\\.]+/', ' ', $s)));
	$d = 0;
	$factor = 1;
	
	foreach ($s as $ss) {
		$d += $ss * $factor;
		$factor /= 60;
	}
	
	return $d * $posneg;
}

