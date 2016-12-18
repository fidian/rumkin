<?php

$filename = substr($_SERVER['PATH_INFO'], 1);
$i = strpos($filename, '.');

if ($i !== false)$filename = substr($filename, 0, $i);

if (! $filename) {
	echo "No data file specified.\n";
	exit();
}

if (preg_match('/[^a-z0-9]/', $filename)) {
	echo "Bad data file.\n";
	exit();
}

if (file_exists($filename . '.inc'))
include_once($filename . '.inc');

if (! isset($GLOBALS['KMLPoints']))LoadPoints($filename);
Header('Content-type: application/earthviewer');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

?><kml xmlns="http://earth.google.com/kml/2.0">
<Document>
  <Style id="default">
    <LabelStyle>
      <scale>0</scale>
      <color>00000000</color>
    </LabelStyle>
    <IconStyle>
      <scale>0.75</scale>
      <Icon>
	<href>root://icons/palette-4.png</href>
	<x>32</x>
	<y>0</y>
	<w>32</w>
	<h>32</h>
      </Icon>
    </IconStyle>
  </Style>
  <Style id="highlight">
    <IconStyle>
      <Icon>
	<href>root://icons/palette-4.png</href>
	<x>32</x>
	<y>32</y>
	<w>32</w>
	<h>32</h>
      </Icon>
    </IconStyle>
  </Style>
  <StyleMap id="point">
    <Pair>
      <key>normal</key>
      <styleUrl>#default</styleUrl>
    </Pair>
    <Pair>
      <key>highlight</key>
      <styleUrl>#highlight</styleUrl>
    </Pair>
  </StyleMap>
  <name><?php echo $Title ?></name>
<?php

if (isset($KMLDesc))echo '  <description><![CDATA[' . $KMLDesc . ']]></description>';
else echo '  <description />';
echo "\n";

foreach ($GLOBALS['KMLPoints'] as $TrackNo => $Points) {
	if ($TrackNo > 0) {
		
		?>
  <Placemark>
    <name>Track <?php echo $TrackNo ?></name>
    <description />
    <open>0</open>
    <Style>
      <LineStyle>
<?php
		
		if (isset($Colors[$TrackNo])) {
			
			?>
        <color>ff<?php echo preg_replace('/[^0-9a-fA-F]/', '', $Colors[$TrackNo])
			
			?></color>
	<width>3</width>
<?php
		}
		
		?>
      </LineStyle>
    </Style>
    <LineString>
      <tessellate>1</tessellate>
      <coordinates>
<?php
		
		foreach ($Points as $p) {
			echo $p[2] . ',' . $p[3] . ",0\n";
		}
		
		?>
      </coordinates>
    </LineString>
  </Placemark>
<?php
	}
	
	?>    
  <Folder>
    <name>Track <?php echo $TrackNo ?> Points</name>
    <description />
    <open>0</open>
<?php
	
	foreach ($Points as $p) {
		
		?>
    <Placemark>
      <name><![CDATA[<?php echo $p[0] ?>]]></name>
      <description><![CDATA[<?php echo $p[1] ?>]]></description>
      <styleUrl>#point</styleUrl>
      <Point>
        <coordinates><?php echo $p[2] . ',' . $p[3] ?>,0</coordinates>
      </Point>
    </Placemark>
<?php
	}
	
	?>
  </Folder>
<?php
}

?>
</Document>
</kml>
<?php

function LoadPoints($fn) {
	$fn = trim(strtolower($fn));
	
	if (! file_exists($fn . '.txt')) {
		return 'Bad file name.';
	}
	
	$fp = fopen($fn . '.txt', 'r');
	LoadPointFile($fp);
	fclose($fp);
	return '';
}


function LoadPointFile($fp) {
	$Header = explode('|', trim(fgets($fp)));
	
	while (! feof($fp)) {
		$Line = explode('|', trim(fgets($fp)));
		
		if (! count($Line))return;
		$Info = array();
		
		for ($i = 0; $i < count($Line); $i ++) {
			$Info[$Header[$i]] = $Line[$i];
		}
		
		if (isset($Info['Lat']) && isset($Info['Lon']))SavePoint($Info);
	}
}


function SavePoint($p) {
	$p2 = array(
		'Track' => 0,
		'Lat' => 0,
		'Lon' => 0,
		'Title' => '',
		'Desc' => ''
	);
	
	if (isset($p['Track'])) {
		$p2['Track'] = $p['Track'];
		settype($p2['Track'], 'integer');
	}
	
	if (isset($p['Lat']))$p2['Lat'] = DegreeConvert($p['Lat']);
	
	if (isset($p['Lon']))$p2['Lon'] = DegreeConvert($p['Lon']);
	
	if (isset($p['Cache'])) {
		if (! isset($p['CacheName']))$p['CacheName'] = $p['Cache'];
		$p2['Title'] .= '<a href="http://www.geocaching.com/seek/cache_details.aspx?wp=' . $p['Cache'] . '">';
	}
	
	if (isset($p['CacheName']))$p2['Title'] .= $p['CacheName'];
	
	if (isset($p['Cache']))$p2['Title'] .= '</a>';
	
	if ($p2['Title'] == '') {
		$p2['Title'] = $p2['Desc'];
		$p2['Desc'] = '';
	}
	
	if (isset($p['UserID'])) {
		if ($p2['Desc'] != '')$p2['Desc'] .= '<br>';
		$p2['Desc'] .= $p['UserID'];
	}
	
	if ($p2['Title'] == '') {
		$p2['Title'] = $p2['Desc'];
		$p2['Desc'] = '';
	}
	
	if (isset($p['Date'])) {
		if ($p2['Desc'] != '')$p2['Desc'] .= '<br>';
		$y = substr($p['Date'], 0, 4);
		$m = substr($p['Date'], 4, 2) * 1;
		$d = substr($p['Date'], 6, 2);
		$Months = array(
			'',
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		);
		$p2['Desc'] .= $Months[$m] . ' ' . $d . ', ' . $y;
	}
	
	if ($p2['Title'] == '') {
		$p2['Title'] = $p2['Desc'];
		$p2['Desc'] = '';
	}
	
	if (isset($p['Desc'])) {
		if ($p2['Desc'] != '')$p2['Desc'] .= '<br>';
		$p2['Desc'] .= $p['Desc'];
	}
	
	if ($p2['Title'] == '') {
		$p2['Title'] = $p2['Desc'];
		$p2['Desc'] = '';
	}
	
	if (! isset($GLOBALS['KMLPoints'][$p2['Track']]))$GLOBALS['KMLPoints'][$p2['Track']] = array();
	$GLOBALS['KMLPoints'][$p2['Track']][] = array(
		$p2['Title'],
		$p2['Desc'],
		$p2['Lon'],
		$p2['Lat']
	);
}


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

