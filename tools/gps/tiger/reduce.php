<?php
/*
 * $CountyList = array('27021', '27027', '27053', '27061', '27073', '27103',
 * '27119', '27129', '27141', '27167', '27171');
 * 
 * $TestCounty = $CountyList[0];
 * 
 * require 'parsed/county_' . $TestCounty . '.php';
 * 
 * foreach ($GLOBALS[$k] as $k2 => $CountyLines)
 * {
 * echo "$k :: $k2\n";
 * ReduceLines($CountyLines);
 * }
 */
function ReduceLines(&$Lines) {
	$ThresholdAngle = deg2rad(5);
	$ThresholdDistance = 0.005;
	
	/*    echo "count = " . count($Lines) . "\n";
	 * Remove circular point */
	if ($Lines[0][0] == $Lines[count($Lines) - 1][0] && $Lines[0][1] == $Lines[count($Lines) - 1][1]) {
		array_pop($Lines);
	}
	
	// Add first two points at the end
	$Lines[] = $Lines[0];
	$Lines[] = $Lines[1];
	
	/* Find the location with any angle beyond our threshold, or
	 * just the sharpest one we can find.
	 *    echo "Scanning\n"; */
	$bestangle = 0;
	$bestspot = 0;
	
	for ($i = 1; $i < count($Lines) - 2 && $angle < $ThresholdAngle; $i ++) {
		$angle = CalcAngle($Lines[$i - 1], $Lines[$i], $Lines[$i + 1]);
		
		if ($angle > $bestangle) {
			$bestangle = $angle;
			$bestspot = $i;
		}
	}
	
	// Remove the two points that were just added
	array_pop($Lines);
	array_pop($Lines);
	
	/* Rotate the list of points
	 *    echo "Scrolling\n"; */
	while ($bestspot --) {
		array_push($Lines, array_shift($Lines));
	}
	
	// Add circular point back
	$Lines[] = $Lines[0];
	
	/* Scan angles again and remove ones that are straight
	 *    echo "Cleaning\n"; */
	$KeepLines = array();
	array_push($KeepLines, array_shift($Lines));
	$anglesum = 0;
	
	while (count($Lines) > 1) {
		$angle = CalcAngle($KeepLines[count($KeepLines) - 1], $Lines[0], $Lines[1]);
		$anglesum += $angle;
		$dist = CalcDist($KeepLines[count($KeepLines) - 1], $Lines[0]) + CalcDist($Lines[0], $Lines[1]);
		
		// 	echo "$angle $anglesum<br>\n";
		if ($anglesum < $ThresholdAngle || $dist < $ThresholdDistance) {
			array_shift($Lines);
		} else {
			$anglesum = 0;
			array_push($KeepLines, array_shift($Lines));
		}
	}
	
	array_push($KeepLines, array_shift($Lines));
	$Lines = $KeepLines;
	
	//    echo "end count = " . count($Lines) . "\n";
	return $Lines;
}


function CalcDist($a, $b) {
	$x = $a[0] - $b[0];
	$y = $a[1] - $b[1];
	return sqrt($x * $x + $y * $y);
}


function CalcAngle($a, $b, $c) {
	$AB = CalcDist($a, $b);
	$BC = CalcDist($b, $c);
	$CA = CalcDist($c, $a);
	
	if ($CA == $AB + $BC)return 0;  // Straight line
	$angle = acos(($AB * $AB + $BC * $BC - $CA * $CA) / (2 * $AB * $BC));
	
	// Really, we want the deflection angle
	$angle = pi() - $angle;
	return $angle;
}

