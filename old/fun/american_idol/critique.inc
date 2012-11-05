<?php


// -*- php -*-
global $Judges;
$Judges = array();


function LoadSeason($Season) {
	global $Judges;
	$Key = '';
	
	foreach (array(
			'intro',
			'paula',
			'randy',
			'simon'
		) as $Judge) {
		$fp = fopen($Season . '/' . $Judge . '.txt', 'r');
		
		if (! $fp) {
			echo "Error loading season $Season, judge $Judge\n";
			return;
		}
		
		while (! feof($fp)) {
			$Line = trim(fgets($fp, 1024));
			
			while (substr($Line, - 1) == '\\' && ! feof($fp)) {
				$Line = substr($Line, 0, strlen($Line) - 1);
				$Line .= trim(fgets($fp, 1024));
			}
			
			if (substr($Line, 0, 1) == '!')$Key = substr($Line, 1);
			elseif ($Line != '') {
				if ($Key == '') {
					echo "Problem loading data for season $Season, " . "judge $Judge\n";
					return;
				}
				
				if (! isset($Judges[$Judge]))$Judges[$Judge] = array();
				
				if (! isset($Judges[$Judge][$Key]))$Judges[$Judge][$Key] = array();
				$Hits = 0;
				
				foreach ($Judges[$Judge][$Key] as $E) {
					if ($E == $Line)$Hits ++;
				}
				
				if ($Hits == 0)$Judges[$Judge][$Key][] = $Line;
			}
		}
	}
}


function ShowCritique($Judge) {
	global $Judges;
	
	if (! isset($Judges[$Judge])) {
		return 'Sorry, I couldn\'t find ' . $Judge . ' on the panel.';
	}
	
	return BuildCritique($Judges[$Judge], 'Critique');
}


function BuildCritique($Sayings, $Rule, $Depth = 0) {
	$CapsFirst = 0;
	
	if ($Rule[0] == '^') {
		$CapsFirst = 1;
		$Rule = substr($Rule, 1);
	}
	
	// Just in case
	if ($Depth == 50)return '[depth exceeded]';
	
	if (! isset($Sayings[$Rule]))return "[Rule not found \"$Rule\"]";
	$Depth ++;
	$C = $Sayings[$Rule];
	$C = $C[rand(0, count($C) - 1)];
	$C = preg_replace('\\[]+)\\]/e', 'BuildCritique($Sayings, \'\\1\', ' . $Depth . ')', $C);
	
	if ($CapsFirst)$C = ucfirst($C);
	return $C;
}

