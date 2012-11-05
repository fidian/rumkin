<?php

header('Cache-Control: no-store, no-cache, must-revalidate');
header('Content-Type: text/vnd.wap.wml');
include_once('geocaching.inc');
$me = 'wap.php';
echo "<?xml version=\"1.0\"?>\n";

?><!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>	
<head>	
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<?php

$ID = false;

if (isset($_SERVER['PATH_INFO']) && strlen($_SERVER['PATH_INFO']) > 1) {
	$ID = split('/', substr($_SERVER['PATH_INFO'], 1));
	$ID = $ID[0];
}

if ($ID == false) {
	
	?>
<template><do type="prev" label="BACK"><prev/></do></template>
<card id="waypoint" title="Waypoint">
<p>
Enter Geocaching.com Waypoint ID:
<input type="text" name="wp" value="GC"/>
<a title="OK" href="<?php echo $me ?>/$(wp)">Get Info</a>
</p>
</card>
</wml>
<?php
	
	exit();
}

$GPX = GetGPX(strtoupper($ID));
$Info = array(
	'Lat' => 0,
	'Lon' => 0,
	'Name' => 'Unknown'
);
$stack = array();
$InWP = 0;
$LogID = 0;
$Stack = array();
$parser = xml_parser_create();
xml_set_element_handler($parser, 'start_element', 'stop_element');
xml_set_character_data_handler($parser, 'char_data');
xml_parse($parser, $GPX, true);
xml_parser_free($parser);

?><template><do type="prev" label="BACK"><prev/></do></template>
<card id="<?php echo $Info['Name'] ?>" title="<?php echo $Info['Name'] ?>">
<p><b><?php echo htmlspecialchars($Info['URLName']) ?></b>
(<?php echo $Info['Name'] ?>)<br />
<?php echo $Info['Lat'] ?><br />
<?php echo $Info['Lon'] ?><br />
<small>By <?php echo htmlspecialchars($Info['By']) ?></small>
</p>

<p><small><?php echo $Info['Container'] ?> <?php echo $Info['Type'] ?>
 (Diff <?php echo $Info['Difficulty'] ?>, Terr <?php echo $Info['Terrain'] ?>)</small></p>

<?php

if (isset($Info['TravelBugs'])) { ?>
<p><small>Travel Bugs:
<?php
	
	foreach ($Info['TravelBugs'] as $b) { ?>
<br />* <?php echo htmlspecialchars($b) ?>
<?php
	} ?>
</small></p>
<?php
} ?>
	
<p><small><?php echo nl2br(htmlspecialchars($Info['Short Desc'])) ?></small></p>

<p><small><a href="#desc">Full Desc</a>
<?php

if (isset($Info['Hints'])) { ?>
<br /><a href="#hint">Hints</a>
<?php
} ?>
<?php

if (isset($Info['Logs'])) { ?>
<br /><a href="#logs">Logs</a>
<?php
} ?>
</small></p>
</card>


<card id="desc">
<p><small><?php echo nl2br(htmlspecialchars($Info['Long Desc'])) ?></small></p>
</card>


<?php

if (isset($Info['Hints'])) { ?>
<card id="hint">
<?php
	
	foreach ($Info['Hints'] as $v) { ?>
<p><small><?php echo nl2br(htmlspecialchars($v)) ?></small></p>
<?php
	} ?>
</card>
<?php
} ?>


<?php

if (isset($Info['Logs'])) { ?>
<card id="logs">
<?php
	
	foreach ($Info['Logs'] as $l) { ?>
<p><small><b><?php echo htmlspecialchars($l['Finder']) ?></b>
(<?php echo htmlspecialchars($l['Type']) ?>)
<em><?php echo substr($l['Date'], 0, 10); ?></em><br />
<?php echo nl2br(htmlspecialchars($l['Text'])) ?></small></p>
<?php
	} ?>
</card>
<?php
} ?>


</wml>
<?php

function GetGPX($ID) {
	$Info = GetLocInfo($ID);
	
	if (! isset($Info['Viewstate'])) {
		die('Unable to find viewstate');
	}
	
	return Geocache_GetPage('/seek/cache_details.aspx?wp=' . $ID, array(
			'btnGPXDL.x' => 1,
			'btnGPXDL.y' => 1,
			'__VIEWSTATE' => $Info['Viewstate']
		));
}


function start_element($parser, $name, $attrs) {
	global $char_data, $stack, $Info;
	$Now = join(' ', $stack) . ' ' . $name;
	
	if ($Now == 'GPX WPT') {
		$Info['Lat'] = ProcessDeg($attrs['LAT'], 'N', 'S');
		$Info['Lon'] = ProcessDeg($attrs['LON'], 'E', 'W');
	} elseif ($name == 'GROUNDSPEAK:LOG') {
		if (! isset($Info['LogNum'])) {
			$Info['Logs'] = array();
			$Info['LogNum'] = 0;
		} else $Info['LogNum']++;
	}
	
	$char_data = '';
	array_push($stack, $name);
}


function stop_element($parser, $name) {
	global $char_data, $stack, $Info;
	$Now = join(' ', $stack);
	
	if ($Now == 'GPX WPT NAME')$Info['Name'] = $char_data;
	elseif ($Now == 'GPX WPT URLNAME')$Info['URLName'] = $char_data;
	elseif (strncmp($Now, 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:LOGS ', 43) == 0) {
		if ($name == 'GROUNDSPEAK:DATE')$Info['Logs'][$Info['LogNum']]['Date'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:TYPE')$Info['Logs'][$Info['LogNum']]['Type'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:FINDER')$Info['Logs'][$Info['LogNum']]['Finder'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:TEXT')$Info['Logs'][$Info['LogNum']]['Text'] = HTMLDecode($char_data);
	} elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:TRAVELBUGS ' . 'GROUNDSPEAK:TRAVELBUG GROUNDSPEAK:NAME') {
		$Info['TravelBugs'][] = $char_data;
	} elseif (strncmp($Now, 'GPX WPT GROUNDSPEAK:CACHE ', 26) == 0) {
		if ($name == 'GROUNDSPEAK:PLACED_BY')$Info['By'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:TYPE')$Info['Type'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:CONTAINER')$Info['Container'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:DIFFICULTY')$Info['Difficulty'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:TERRAIN')$Info['Terrain'] = $char_data;
		elseif ($name == 'GROUNDSPEAK:SHORT_DESCRIPTION')$Info['Short Desc'] = HTMLDecode($char_data);
		elseif ($name == 'GROUNDSPEAK:LONG_DESCRIPTION')$Info['Long Desc'] = HTMLDecode($char_data);
		elseif ($name == 'GROUNDSPEAK:ENCODED_HINTS')$Info['Hints'][] = HTMLDecode($char_data);
	}
	
	$elem = array_pop($stack);
}


function char_data($parser, $data) {
	global $char_data;
	$char_data .= $data;
}


function HTMLDecode($str) {
	$str = str_replace('&gt;', '>', $str);
	$str = str_replace('&lt;', 'l', $str);
	$str = str_replace('&amp;', '&', $str);
	$str = str_replace('<br>', "\n", $str);
	return $str;
}


function ProcessDeg($deg, $pos, $neg) {
	if ($deg > 0) {
		$str = $pos . ' ';
	} else {
		$str = $neg . ' ';
		$deg = - $deg;
	}
	
	$d = $deg;
	settype($d, 'integer');
	$deg -= $d;
	$str .= $d . '° ';
	$deg *= 60;
	$deg *= 1000;
	settype($d, 'integer');
	$deg /= 1000;
	$str .= $deg . '\'';
	return $str;
}

