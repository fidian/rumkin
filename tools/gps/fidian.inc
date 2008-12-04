<?php

$Title = 'fidian\'s finds';
$KMLDesc = 'Take a lookie at what I found.';
$Icons = array(
	0 => array(
		'image' => 'media/icons/traditional.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
	1 => array(
		'image' => 'media/icons/multicache.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
	2 => array(
		'image' => 'media/icons/virtual.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
	3 => array(
		'image' => 'media/icons/unknown.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
	4 => array(
		'image' => 'media/icons/tb.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
	5 => array(
		'image' => 'media/icons/event.gif',
		'shadow' => '',
		'iconSize' => '16, 16',
		'shadowSize' => '0, 0',
		'iconAnchor' => '8, 8',
		'infoWindowAnchor' => '13, 0'
	),
);


function Above_Map() {
	
	?>

<p>I wanted to see all of the caches that I hit... so I mapped them.</p>
You can also map this in <a href="http://earth.google.com/">Google Earth</a>
with either the <a href="kml-net.php/fidian.kml">networked KML</a> (with live
updates) or the <a href="kml.php/fidian.kml">static KML</a> (single snapshot)
file.</p>

<p>The travel bug icon on the map does not designate an actual travel bug;
instead it shows where I was able to grab a moving cache.  Also, all of the
'?' caches are puzzles that were solved.  For those, I did not point to the
actual cache location, but they do show the location that the cache lists on
the description page.</p>

<?php
}

