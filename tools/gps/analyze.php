<?php

ini_set('memory_limit', '128M');
include '../../functions.inc';
include '../../inc/unzip.php';
include 'county.php';
$GLOBALS['Diff/Terr Ratings'] = array(
	'1',
	'1.5',
	'2',
	'2.5',
	'3',
	'3.5',
	'4',
	'4.5',
	'5'
);


// List of states by their postal abbreviation
$GLOBALS['State List'] = array(
	'Alabama' => 'AL',
	'Alaska' => 'AK',
	'Arizona' => 'AZ',
	'Arkansas' => 'AR',
	'California' => 'CA',
	'Colorado' => 'CO',
	'Connecticut' => 'CT',
	'Delaware' => 'DE',
	'District of Columbia' => 'DC',
	'Florida' => 'FL',
	'Georgia' => 'GA',
	'Hawaii' => 'HI',
	'Idaho' => 'ID',
	'Illinois' => 'IL',
	'Indiana' => 'IN',
	'Iowa' => 'IA',
	'Kansas' => 'KS',
	'Kentucky' => 'KY',
	'Louisiana' => 'LA',
	'Maine' => 'ME',
	'Maryland' => 'MD',
	'Massachusetts' => 'MA',
	'Michigan' => 'MI',
	'Minnesota' => 'MN',
	'Mississippi' => 'MS',
	'Missouri' => 'MO',
	'Montana' => 'MT',
	'Nebraska' => 'NE',
	'Nevada' => 'NV',
	'New Hampshire' => 'NH',
	'New Jersey' => 'NJ',
	'New Mexico' => 'NM',
	'New York' => 'NY',
	'North Carolina' => 'NC',
	'North Dakota' => 'ND',
	'Ohio' => 'OH',
	'Oklahoma' => 'OK',
	'Oregon' => 'OR',
	'Pennsylvania' => 'PA',
	'Rhode Island' => 'RI',
	'South Carolina' => 'SC',
	'South Dakota' => 'SD',
	'Tennessee' => 'TN',
	'Texas' => 'TX',
	'Utah' => 'UT',
	'Vermont' => 'VT',
	'Virginia' => 'VA',
	'Washington' => 'WA',
	'West Virginia' => 'WV',
	'Wisconsin' => 'WI',
	'Wyoming' => 'WY'
);
StandardHeader(array(
		'title' => 'Cache Stats',
		'topic' => 'gps',
		'callback' => 'Insert_JS'
	));

if (isset($_POST['debug'])) {
	$HTTP_POST_FILES = array(
		'the_file' => array(
			'tmp_name' => 'debug.zip'
		)
	);
}

if (! isset($HTTP_POST_FILES) || ! is_array($HTTP_POST_FILES) || count($HTTP_POST_FILES) == 0) {
	
	?>

<p>Analyze your "My Finds" GPX file and figure out where you have cached,
how many different types of caches you've hit, and much more!</p>

<p>First, log into your <a href="http://geocaching.com">Geocaching</a> premium
account.  Under the Pocket Queries, you have the option to generate a "My
Finds" file that lists all of the caches and events you have found.  Press
the button and get the .zip file in your email.  Next, just upload the .zip
file to this site and you will get all sorts of details on the next page.</p>

<form method=post action="analyze.php" enctype="multipart/form-data">
<p><b>GPX file:</b>  (Can be zipped)  <input name=the_file type=file>
<br>
<input type=checkbox name="County_Full"> - Show county breakdown for U.S. states
<br>
Show milestones every <select name=milestones>
<option value=10>10</option>
<option value=25>25</option>
<option value=50>50</option>
<option value=100 SELECTED>100</option>
<option value=250>250</option>
<option value=500>500</option>
<option value=1000>1000</option>
</select> caches
<br>
<?php
	
	if (isset($_GET['debug']))echo '<input type=hidden name=debug value=1>';
	
	?>
<input type=submit value="Upload File"></p></form>

<p>The more finds you have, the longer this can take, especially if you
checked the box to get a list of the counties where you have found a cache.</p>

<?php
	
	StandardFooter();
	exit();
}

$fn = $HTTP_POST_FILES['the_file']['tmp_name'];

// Attempt to just open
$file = fopen($fn, 'r');

if ($file) {
	$data = fread($file, 4);
	fclose($file);
} else {
	$data = '';
	
	?>
I did not get a file.  This can be caused by two basic reasons:
<ol>
<li>You forgot to hit the Browse button and upload a file to the web server.
<li>You did upload a file to the server, but it was too large.  Try uploading
a zipped version instead.
</ol>
<?php
}

if ($data == '<?xm') {
	$GPX = LoadGPXFile($fn);
} elseif ($data == "\x50\x4b\x03\x04") {
	$GPX = LoadGPXZipFile($fn);
} else {
	if ($data != '')echo "Unknown/unsupported file format.\n";
	$GPX = array();
}

if (count($GPX) > 0) {
	$County_Full = false;
	
	if ((isset($_GET['County_Full']) && $_GET['County_Full']) || (isset($_POST['County_Full']) && $_POST['County_Full']))$County_Full = true;
	$Milestones = 0;
	
	if (isset($_GET['milestones']))$Milestones = $_GET['milestones'];
	
	if (isset($_POST['milestones']))$Milestones = $_POST['milestones'];
	$Milestones = $Milestones * 1;
	
	if (! $Milestones)$Milestones = 100;
	$Sums = CalculateSums($GPX, $County_Full);
	$DateInfo = CalculateDateInfo($GPX, $Milestones);
	
	?>

<p><a href="#" onclick="MakeCopyWindow(); return false">Show the HTML</a>
- Makes it easier to copy what you see into your Geocaching.com profile.</p>
	
<div id="analyze_html">
<p>My geocaching statistics as of <?php echo $GLOBALS['GPX Time'] ?>, calculated by
<a href="http://rumkin.com/tools/gps/analyze.php">Rumkin.com</a></p>

<?php
	
	ShowSummary($Sums, $DateInfo);
	ShowDiffTerr($Sums);
	ShowTypes($Sums);
	ShowSpecial($Sums, $DateInfo, $Milestones);
	ShowHistory($DateInfo);
	ShowBreakdown('Countries', $Sums['Countries']);
	
	if (count($Sums['U.S. States'])) {
		ShowBreakdown('U.S. States', $Sums['U.S. States']);
		$States = '';
		
		foreach ($Sums['U.S. States'] as $k => $v) {
			$States .= $GLOBALS['State List'][$k];
		}
		
		echo '<p><img src="http://www.world66.com/myworld66/visitedStates/' . 'statemap?visited=' . $States . '" width=580 height=300>';
		echo '<br>Map courtesy of ' . '<a href="http://www.world66.com/myworld66/">World66</a>';
		echo "</p>\n";
	}
	
	if (count($Sums['U.S. Counties'])) {
		ksort($Sums['U.S. Counties']);
		
		foreach ($Sums['U.S. Counties'] as $StateName => $CountyList) {
			ShowBreakdown($StateName . ' Counties', $CountyList);
			echo '<p>' . count($CountyList) . ' ';
			
			if (count($CountyList) > 1)echo 'counties';
			else echo 'county';
			echo ' visited.</p>';
		}
	}
	
	if ($Sums['Multiple Finds']) {
		ShowMultiples($GPX);
	}
	
	?>

</div>
	
<h3>Notes About Results</h3>

<p>"Did Not Find" logs are only sent in the GPX file if you have found
that cache.  Because of this, not all DNF logs are represented.  Locationless
caches are not shown in the country, state, or county breakdowns because the
coordinates of where you logged the cache are not in the GPX file.</p>

<?php
	
	if ($County_Full) { ?>
<p>County borders are pulled from the
<a href="http://www.census.gov/geo/www/tiger/">TIGER/Line data</a>
from the U.S. Census Bureau.</p>
<?php
	} ?>

<?php
	
	/*
	 * Centroid
	 * Average challenge ?   avg diff = 1.77, terr = 1.73, challenge = 1.98?
	 * X hard caches (Y%)  (What is "hard"?)
	 * Maximum one-day distance:  Distance (mi?) on Date from N.W to N.W
	 */
}

StandardFooter();


function CalculateSums(&$GPX, $LoadCounties) {
	$Info = array(
		'Finds' => 0,
		'Find Listings' => 0,
		'Events' => 0,
		'Event Listings' => 0,
		'FTF' => 0,
		'DNF' => 0,
		'DNF Listings' => 0,
		'Multiple Finds' => 0,
		'Archived' => 0,
		'Oldest' => false,
		'Newest' => false,
		'Average Difficulty' => 0,
		'Average Terrain' => 0,
		'Difficulty' => array(),
		'Terrain' => array(),
		'Diff/Terr Grid' => array(),
		'U.S. States' => array(),
		'U.S. Counties' => array(),
		'Countries' => array(),
		'Types' => array(),
		'Containers' => array()
	);
	
	foreach ($GLOBALS['Diff/Terr Ratings'] as $D) {
		$Info['Difficulty'][$D] = 0;
		$Info['Terrain'][$D] = 0;
		$Info['Diff/Terr Grid'][$D] = array();
		
		foreach ($GLOBALS['Diff/Terr Ratings'] as $T) {
			$Info['Diff/Terr Grid'][$D][$T] = 0;
		}
	}
	
	foreach ($GPX as $G) {
		$Info['Finds'] += $G['Finds'];
		$Info['Multiple Finds'] += $G['Finds'] > 1 ? 1 : 0;
		$Info['Multiple Finds'] += $G['Events'] > 1 ? 1 : 0;
		$Info['Find Listings'] += $G['Finds'] ? 1 : 0;
		$Info['Events'] += $G['Events'];
		$Info['Event Listings'] += $G['Events'] ? 1 : 0;
		$Info['FTF'] += $G['FTF'];
		$Info['DNF'] += $G['DNF'];
		$Info['DNF Listings'] += $G['DNF'] ? 1 : 0;
		$Info['Archived'] += $G['Archived'] ? 1 : 0;
		
		if (($Info['Oldest'] == false || $Info['Oldest']['ID'] > $G['ID']) && $G['ID'] > 0)$Info['Oldest'] = $G;
		
		if ($Info['Newest'] == false || $Info['Newest']['ID'] < $G['ID'])$Info['Newest'] = $G;
		$Info['Average Difficulty'] += $G['Difficulty'];
		$Info['Average Terrain'] += $G['Terrain'];
		$Info['Difficulty'][$G['Difficulty']]++;
		$Info['Terrain'][$G['Terrain']]++;
		$Info['Diff/Terr Grid'][$G['Difficulty']][$G['Terrain']]++;
		
		if ($G['Type'] == 'Locationless (Reverse) Cache') {
			$G['Country'] = '';
			$G['State'] = '';
			$G['Lat'] = false;
			$G['Lon'] = false;
		}
		
		if ($G['Country']) {
			if (! isset($Info['Countries'][$G['Country']]))$Info['Countries'][$G['Country']] = array(
				0,
				0,
				0
			);
			$Info['Countries'][$G['Country']][0] += $G['Finds'];
			$Info['Countries'][$G['Country']][1] += $G['Events'];
		}
		
		if ($G['Country'] == 'United States') {
			if (! isset($Info['U.S. States'][$G['State']]))$Info['U.S. States'][$G['State']] = array(
				0,
				0,
				0
			);
			$Info['U.S. States'][$G['State']][0] += $G['Finds'];
			$Info['U.S. States'][$G['State']][1] += $G['Events'];
			
			if ($LoadCounties)$CountyName = PointCounty($G['Lat'], $G['Lon']);
			else $CountyName = '';
			
			if (isset($_POST['debug'])) {
				echo $G['Name'] . ' - ' . $G['URL Name'] . ' = ' . $G['State'] . ' - ' . $G['Type'] . ' - ';
				
				if ($CountyName != '') {
					echo $CountyName;
				} else {
					echo '***';
				}
				
				echo "<br>\n";
			}
			
			if ($CountyName != '') {
				if (! isset($Info['U.S. Counties'][$G['State']]))$Info['U.S. Counties'][$G['State']] = array();
				$StateRef = &$Info['U.S. Counties'][$G['State']];
				
				if (! isset($StateRef[$CountyName]))$StateRef[$CountyName] = array(
					0,
					0,
					0
				);
				$StateRef[$CountyName][0] += $G['Finds'];
				$StateRef[$CountyName][1] += $G['Events'];
			}
		}
		
		if (! isset($Info['Types'][$G['Type']]))$Info['Types'][$G['Type']] = 0;
		$Info['Types'][$G['Type']]++;
		
		if (! isset($Info['Containers'][$G['Container']]))$Info['Containers'][$G['Container']] = 0;
		$Info['Containers'][$G['Container']]++;
	}
	
	$Info['All Listings'] = $Info['Finds'] + $Info['Events'];
	$Info['Good Listings'] = $Info['Find Listings'] + $Info['Event Listings'];
	$Info['Average Difficulty'] /= $Info['Good Listings'];
	$Info['Average Terrain'] /= $Info['Good Listings'];
	return $Info;
}


function CalculateDateInfo(&$GPX, $Milestones) {
	$Years = array();
	$Months = array();
	$Weeks = array();
	$Days = array();
	$Info = array();
	$Days_Caches = array();
	$MinDate = false;
	$MinCache = false;
	$MaxDate = false;
	$MaxCache = false;
	
	foreach ($GPX as $G) {
		foreach ($G['Dates'] as $D) {
			$dd = date('Y-m-d', $D);
			
			if (! isset($Days[$dd])) {
				$Days[$dd] = 0;
				$Days_Caches[$dd] = array();
			}
			
			$Days[$dd]++;
			$Days_Caches[$dd][] = $G;
			$ww = $D - date('w', $D) * 60 * 60 * 24;
			$ww = date('Y-m-d', $ww);
			
			if (! isset($Weeks[$ww]))$Weeks[$ww];
			$Weeks[$ww]++;
			$mm = date('Y-m', $D);
			
			if (! isset($Months[$mm]))$Months[$mm] = 0;
			$Months[$mm]++;
			$yy = date('Y', $D);
			
			if (! isset($Years[$yy]))$Years[$yy] = 0;
			$Years[$yy]++;
			
			if ($MinDate == false || $MinDate > $D) {
				$MinDate = $D;
				$MinCache = $G;
			}
			
			if ($MaxDate == false || $MaxDate < $D) {
				$MaxDate = $D;
				$MaxCache = $G;
			}
		}
	}
	
	ksort($Years);
	ksort($Months);
	ksort($Weeks);
	ksort($Days);
	
	// Set up milestones
	ksort($Days_Caches);
	$Days_Caches2 = array();
	
	foreach ($Days_Caches as $DC) {
		foreach ($DC as $DC2) {
			$Days_Caches2[] = $DC2;
		}
	}
	
	$Info['Milestones'] = array();
	
	for ($i = $Milestones; isset($Days_Caches2[$i]); $i += $Milestones) {
		$Info['Milestones'][] = $Days_Caches2[$i];
	}
	
	// Find most finds on one day
	$MostFinds = 0;
	$MostDate = 0;
	
	// Consecutive days with/without finds
	$Cons_Finds = array(
		0,
		0,
		0
	);
	$Cons_NoFind = array(
		0,
		0,
		0
	);
	$Streak_Start = false;
	$Streak_Count = 0;
	$Last = false;
	$Last_Text = false;
	
	foreach ($Days as $d => $f) {
		$dd = explode('-', $d);
		$Curr = mktime(0, 0, 0, $dd[1], $dd[2], $dd[0]);
		
		if ($f > $MostFinds) {
			$MostFinds = $f;
			$MostDate = $d;
		}
		
		if ($Last != false) {
			/* Weird.  This line does NOT work, but the three lines below
			 * do work.
			 * $DaysDiff = round(($Curr - $Last) / (3600 * 24)); */
			$DaysDiff = $Curr - $Last;
			$DaysDiff /= 3600 * 24;
			$DaysDiff = round($DaysDiff);
			
			if ($DaysDiff == 1) {
				// Continuation
				if ($Streak_Start == false) {
					$Streak_Start = $d;
					$Streak_Count = 0;
				}
				
				$Streak_Count ++;
				
				if ($Streak_Count > $Cons_Finds[0])$Cons_Finds = array(
					$Streak_Count,
					$Streak_Start,
					$d
				);
			} else {
				$Streak_Start = false;
				
				// Gap
				if ($DaysDiff > $Cons_NoFind[0])$Cons_NoFind = array(
					$DaysDiff,
					$Last_Text,
					$d
				);
			}
		}
		
		$Last = $Curr;
		$Last_Text = $d;
	}
	
	$Info['Most Finds'] = $MostFinds;
	$Info['Most Finds Date'] = $MostDate;
	$Info['Consecutive Finds'] = $Cons_Finds;
	$Info['Consecutive No Finds'] = $Cons_NoFind;
	$Info['Years'] = $Years;
	$Info['First'] = $MinDate;
	$Info['First Cache'] = $MinCache;
	$Info['Last'] = $MaxDate;
	$Info['Last Cache'] = $MaxCache;
	$Info['Date Span'] = ($MaxDate - $MinDate) / (24 * 3600);
	return $Info;
}


function ShowTable($header, $data) {
	$HeadColor = '#FFFFDD';
	$BodyColors = array(
		'#DDFFFF',
		'#CCEEEE'
	);
	$row = 0;
	echo "<table border=0 cellpadding=2 cellspacing=0>\n";
	
	if ($header) {
		echo '<tr bgcolor="' . $HeadColor . '">';
		$Spacer = 0;
		
		foreach ($header as $h) {
			if ($Spacer == 0)$Spacer ++;
			else echo '<td>&nbsp;</td>';
			$h = trim($h);
			
			if ($h == '')$h = '&nbsp;';
			echo '<th><b>' . $h . '</b></th>';
		}
		
		echo "</tr>\n";
	}
	
	foreach ($data as $v) {
		$k = array_shift($v);
		echo '<tr bgcolor="' . $BodyColors[$row % count($BodyColors)] . '">';
		echo '<th bgcolor="' . $HeadColor . '"><b>' . $k . '</b></th>';
		
		if (! is_array($v)) {
			$v = array(
				$v
			);
		}
		
		foreach ($v as $vv) {
			echo '<td>&nbsp; &nbsp;</td>';
			$vv = trim($vv);
			
			if (preg_match('/[^0-9\\. %]/', $vv)) {
				echo '<td>' . $vv . '</td>';
			} else {
				if ($vv == '')$vv = '&nbsp;';
				echo '<td align=right>' . $vv . '</td>';
			}
		}
		
		echo "</tr>\n";
		$row ++;
	}
	
	echo "</table>\n";
}


function XML_Start($parser, $name, $attrs) {
	$Now = join(' ', $GLOBALS['XML Stack']) . ' ' . $name;
	
	if ($Now == 'GPX WPT') {
		$GLOBALS['XML Node Info'] = array(
			'Name' => 'Unknown',
			'Lat' => $attrs['LAT'],
			'Lon' => $attrs['LON'],
			'Finds' => 0,
			'Dates' => array(),
			'Events' => 0,
			'FTF' => 0,
			'DNF' => 0
		);
	} elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE') {
		$GLOBALS['XML Node Info']['ID'] = $attrs['ID'];
		$GLOBALS['XML Node Info']['Archived'] = TF($attrs['ARCHIVED']);
	}
	
	$GLOBALS['XML Node Data'] = '';
	array_push($GLOBALS['XML Stack'], $name);
}


function XML_Stop($parser, $name) {
	$Now = join(' ', $GLOBALS['XML Stack']);
	
	if ($Now == 'GPX TIME')$GLOBALS['GPX Time'] = substr($GLOBALS['XML Node Data'], 0, 10);
	elseif ($Now == 'GPX WPT') {
		if ($GLOBALS['XML Node Info']['Type'] != '')$GLOBALS['GPX Data'][] = $GLOBALS['XML Node Info'];
	} elseif ($Now == 'GPX WPT NAME')$GLOBALS['XML Node Info']['Name'] = HTMLDecode($GLOBALS['XML Node Data']);
	elseif ($Now == 'GPX WPT URL')$GLOBALS['XML Node Info']['URL'] = $GLOBALS['XML Node Data'];
	elseif ($Now == 'GPX WPT URLNAME')$GLOBALS['XML Node Info']['URL Name'] = mb_convert_encoding($GLOBALS['XML Node Data'], 'HTML-ENTITIES', 'UTF-8');
	elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:COUNTRY')$GLOBALS['XML Node Info']['Country'] = $GLOBALS['XML Node Data'];
	elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:STATE')$GLOBALS['XML Node Info']['State'] = $GLOBALS['XML Node Data'];
	elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:LOGS ' . 'GROUNDSPEAK:LOG GROUNDSPEAK:DATE') {
		$D = explode('T', $GLOBALS['XML Node Data']);
		$D[0] = explode('-', $D[0]);
		$D[1] = explode(':', $D[1]);
		$D = mktime($D[1][0], $D[1][1], $D[1][2], $D[0][1], $D[0][2], $D[0][0]);
		$GLOBALS['XML Node Info']['Date'] = $D;
	} elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:LOGS ' . 'GROUNDSPEAK:LOG GROUNDSPEAK:TYPE') {
		if ($GLOBALS['XML Node Data'] == 'Found it') {
			$GLOBALS['XML Node Info']['Finds']++;
			$GLOBALS['XML Node Info']['Dates'][] = $GLOBALS['XML Node Info']['Date'];
		} elseif ($GLOBALS['XML Node Data'] == 'Attended') {
			$GLOBALS['XML Node Info']['Events']++;
			$GLOBALS['XML Node Info']['Dates'][] = $GLOBALS['XML Node Info']['Date'];
		} elseif ($GLOBALS['XML Node Data'] = 'Didn\'t find it')$GLOBALS['XML Node Info']['DNF']++;
	} elseif ($Now == 'GPX WPT GROUNDSPEAK:CACHE GROUNDSPEAK:LOGS ' . 'GROUNDSPEAK:LOG GROUNDSPEAK:TEXT') {
		if (preg_match('/(FTF|first to find)/i', $GLOBALS['XML Node Data']))$GLOBALS['XML Node Info']['FTF']++;
	} elseif (strncmp($Now, 'GPX WPT GROUNDSPEAK:CACHE ', 26) == 0) {
		if ($name == 'GROUNDSPEAK:TYPE')$GLOBALS['XML Node Info']['Type'] = $GLOBALS['XML Node Data'];
		elseif ($name == 'GROUNDSPEAK:CONTAINER')$GLOBALS['XML Node Info']['Container'] = $GLOBALS['XML Node Data'];
		elseif ($name == 'GROUNDSPEAK:DIFFICULTY')$GLOBALS['XML Node Info']['Difficulty'] = $GLOBALS['XML Node Data'];
		elseif ($name == 'GROUNDSPEAK:TERRAIN')$GLOBALS['XML Node Info']['Terrain'] = $GLOBALS['XML Node Data'];
	}
	
	array_pop($GLOBALS['XML Stack']);
}


function XML_Data($parser, $data) {
	$GLOBALS['XML Node Data'] .= $data;
}


function XML_Prepare() {
	$GLOBALS['XML Stack'] = array();
	$parser = xml_parser_create();
	xml_set_element_handler($parser, 'XML_Start', 'XML_Stop');
	xml_set_character_data_handler($parser, 'XML_Data');
	return $parser;
}


function LoadGPXFile($fn) {
	$GLOBALS['GPX Data'] = array();
	$parser = XML_Prepare();
	$fp = fopen($fn, 'r');
	$buf = fgets($fp, 8192);
	
	while (! feof($fp) && xml_parse($parser, $buf, feof($fp))) {
		$buf = fgets($fp, 8192);
	}
	
	xml_parser_free($parser);
	fclose($fp);
	return $GLOBALS['GPX Data'];
}


function LoadGPXZipFile($fn) {
	$GLOBALS['GPX Data'] = array();
	$list = unzip_list($fn);
	
	foreach ($list as $single_file) {
		$parser = XML_Prepare();
		xml_parse($parser, unzip($fn, $single_file['Name']), true);
		xml_parser_free($parser);
	}
	
	return $GLOBALS['GPX Data'];
}


function HTMLDecode($str) {
	$str = str_replace('&apos;', '\'', $str);
	$str = str_replace('&quot;', '"', $str);
	$str = str_replace('&gt;', '>', $str);
	$str = str_replace('&lt;', '<', $str);
	$str = str_replace('&amp;', '&', $str);
	$str = str_replace('<br>', "\n", $str);
	return $str;
}


function Pct($p, $pp) {
	$p = ($p / $pp) * 1000;
	settype($p, 'integer');
	$p /= 10;
	return sprintf('%2.1f %%', $p);
}


function TF($tf) {
	if ($tf == 'True')return true;
	return false;
}


function CacheLink($Cache) {
	return '<a href="' . $Cache['URL'] . '">' . $Cache['Name'] . '</a>';
}


function SpecialSort(&$arr, $order) {
	$s = array();
	
	foreach ($order as $o) {
		if (isset($arr[$o])) {
			$s[$o] = $arr[$o];
			unset($arr[$o]);
		}
	}
	
	foreach ($arr as $k => $v) {
		$s[$k] = $v;
	}
	
	$arr = $s;
}


function ShowSummary($Sums, $DateInfo) {
	echo "<h3>Summary</h3>\n";
	$List = array();
	$List[] = array(
		'Logs (Finds + Events)',
		$Sums['All Listings'],
		''
	);
	$List[] = array(
		'Unique Caches',
		$Sums['Find Listings'],
		Pct($Sums['Find Listings'], $Sums['Good Listings'])
	);
	$List[] = array(
		'Unique Events',
		$Sums['Event Listings'],
		Pct($Sums['Event Listings'], $Sums['Good Listings'])
	);
	$List[] = array(
		'Multiple Finds',
		$Sums['Multiple Finds'],
		Pct($Sums['Multiple Finds'], $Sums['Good Listings'])
	);
	$List[] = array(
		'Archived',
		$Sums['Archived'],
		Pct($Sums['Archived'], $Sums['Good Listings'])
	);
	$List[] = array(
		'DNF Logs',
		$Sums['DNF'],
		Pct($Sums['DNF'], $Sums['DNF'] + $Sums['Finds'])
	);
	$List[] = array(
		'DNF Caches',
		$Sums['DNF Listings'],
		''
	);
	$List[] = array(
		'Average Difficulty',
		round($Sums['Average Difficulty'], 2),
		''
	);
	$List[] = array(
		'Average Terrain',
		round($Sums['Average Terrain'], 2),
		''
	);
	$List[] = array(
		'Average Finds Per Day',
		round($Sums['Good Listings'] / $DateInfo['Date Span'], 2),
		''
	);
	$List[] = array(
		'Average Finds Per Week',
		round(7 * $Sums['Good Listings'] / $DateInfo['Date Span'], 2),
		''
	);
	$List[] = array(
		'Visited Countries',
		count($Sums['Countries']),
		''
	);
	
	if (count($Sums['U.S. States']))$List[] = array(
		'U.S. States',
		count($Sums['U.S. States']),
		''
	);
	ShowTable(false, $List);
	echo "<br>\n";
	$List = array();
	$List[] = array(
		'Most Finds On One Day',
		$DateInfo['Most Finds'],
		$DateInfo['Most Finds Date'],
		''
	);
	$x = $DateInfo['Consecutive Finds'];
	
	if ($x[0] == 0)$List[] = array(
		'Most Consecutive Finds',
		'0',
		'Weird',
		''
	);
	else $List[] = array(
		'Most Consecutive Finds',
		$x[0],
		$x[1],
		$x[2]
	);
	$x = $DateInfo['Consecutive No Finds'];
	
	if ($x[0] == 0)$List[] = array(
		'Most Days Without A Find',
		'0',
		'Amazing!',
		''
	);
	else $List[] = array(
		'Most Days Without A Find',
		$x[0],
		$x[1],
		$x[2]
	);
	ShowTable(false, $List);
}


function ShowDiffTerr($Sums) {
	echo "<h3>Difficulty and Terrain</h3>\n";
	$ratings = array();
	$ratingGridHeader = array(
		'D \ T'
	);
	$ratingGrid = array();
	$ComboTotal = 0;
	$ComboFound = 0;
	
	foreach ($GLOBALS['Diff/Terr Ratings'] as $r) {
		$ratings[] = array(
			$r,
			$Sums['Difficulty'][$r],
			Pct($Sums['Difficulty'][$r], $Sums['Good Listings']),
			$Sums['Terrain'][$r],
			Pct($Sums['Terrain'][$r], $Sums['Good Listings'])
		);
		$ratingGridHeader[] = $r;
		$ratingGrid[$r] = array(
			$r
		);
		
		foreach ($GLOBALS['Diff/Terr Ratings'] as $rr) {
			$ComboTotal ++;
			$ComboFound += $Sums['Diff/Terr Grid'][$r][$rr] ? 1 : 0;
			$ratingGrid[$r][] = $Sums['Diff/Terr Grid'][$r][$rr];
		}
	}
	
	ShowTable(array(
			'Rating',
			'Diff',
			'%',
			'Terr',
			'%'
		), $ratings);
	echo "<br>\n";
	ShowTable($ratingGridHeader, $ratingGrid);
	echo "<p>You have found $ComboFound of the $ComboTotal possible " . "difficulty / terrain combinations.</p>\n";
}


function ShowTypes($Sums) {
	echo "<h3>Cache Types</h3>\n";
	$List = array();
	SpecialSort($Sums['Types'], array(
			'Traditional Cache',
			'Multi-cache',
			'Unknown Cache',
			'Event Cache',
			'Virtual Cache'
		));
	
	foreach ($Sums['Types'] as $k => $v) {
		$List[] = array(
			$k,
			$v,
			Pct($v, $Sums['All Listings'])
		);
	}
	
	ShowTable(false, $List);
	echo "<br>\n";
	$List = array();
	SpecialSort($Sums['Containers'], array(
			'Micro',
			'Small',
			'Regular',
			'Large',
			'Other',
			'Not chosen',
			'Virtual'
		));
	
	foreach ($Sums['Containers'] as $k => $v) {
		$List[] = array(
			$k,
			$v,
			Pct($v, $Sums['All Listings'])
		);
	}
	
	ShowTable(false, $List);
}


function ShowSpecial($Sums, $DateInfo, $Milestones) {
	$List = array();
	echo "<h3>Special Caches</h3>\n";
	$List[] = array(
		'Oldest Cache',
		$Sums['Oldest']['ID'],
		CacheLink($Sums['Oldest']),
		$Sums['Oldest']['URL Name']
	);
	$List[] = array(
		'Newest Cache',
		$Sums['Newest']['ID'],
		CacheLink($Sums['Newest']),
		$Sums['Newest']['URL Name']
	);
	$List[] = array(
		'First Cache',
		$DateInfo['First Cache']['ID'],
		CacheLink($DateInfo['First Cache']),
		$DateInfo['First Cache']['URL Name']
	);
	$i = $Milestones;
	
	foreach ($DateInfo['Milestones'] as $MS) {
		$List[] = array(
			'# ' . $i,
			$MS['ID'],
			CacheLink($MS),
			$MS['URL Name']
		);
		$i += $Milestones;
	}
	
	$List[] = array(
		'Last Cache',
		$DateInfo['Last Cache']['ID'],
		CacheLink($DateInfo['Last Cache']),
		$DateInfo['Last Cache']['URL Name']
	);
	ShowTable(array(
			'',
			'#',
			'Waypoint',
			'Name'
		), $List);
}


function ShowHistory($DateInfo) {
	$List = array();
	echo "<h3>History</h3>\n";
	$FirstYear = date('Y', $DateInfo['First']);
	$LastYear = date('Y', $DateInfo['Last']);
	
	foreach ($DateInfo['Years'] as $Y => $Found) {
		$yy = $Y * 1;
		
		if ($yy % 4 == 0 && ($yy % 100 != 0 || $yy % 1000 == 0))$Days = 356;
		else $Days = 355;
		
		if ($Y == $LastYear)$Days = date('z', $DateInfo['Last']) * 1;
		
		if ($Y == $FirstYear)$Days -= date('z', $DateInfo['First']) * 1;
		$List[] = array(
			$Y,
			$Found,
			round($Found / $Days, 2)
		);
	}
	
	ShowTable(array(
			'Year',
			'Found',
			'Per Day'
		), $List);
}


function ShowBreakdown($Heading, $Data) {
	echo "<h3>$Heading</h3>\n";
	$List = array();
	$Total = 0;
	ksort($Data);
	
	foreach ($Data as $v) {
		$Total += $v[0] + $v[1];
	}
	
	foreach ($Data as $k => $v) {
		$List[] = array(
			$k,
			$v[0],
			$v[1],
			$v[0] + $v[1],
			Pct($v[0] + $v[1], $Total)
		);
	}
	
	ShowTable(array(
			'',
			'Finds',
			'Events',
			'Total',
			'%'
		), $List);
}


function ShowMultiples($GPX) {
	echo "<h3>Multiple Finds</h3>\n";
	$entries = array();
	
	foreach ($GPX as $G) {
		if ($G['Finds'] > 1 || $G['Events'] > 1) {
			$entries[] = array(
				$G['Finds'] + $G['Events'],
				CacheLink($G),
				$G['URL Name']
			);
		}
	}
	
	ShowTable(array(
			'#',
			'Waypoint',
			'Name'
		), $entries);
}


function Insert_JS() {
	
	?>
<script language="javascript" src="analyze.js"></script>
<?php
}

