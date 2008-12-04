<?php

$Title = 'Moving 123';
$KMLDesc = 'Track the movements of the <a href="' . 'http://www.geocaching.com/seek/cache_details.aspx?wp=GCED59' . '">Moving 123</a> cache.';


// Disable the tracks
$Colors = array(
	
	
	/*    1 => '#FF0000',
	 *    2 => '#00FF00',
	 *    3 => '#0000FF', */
);
$Icons = array(
	1 => array(
		'image' => 'http://labs.google.com/ridefinder/images/mm_20_red.png',
		'shadow' => 'http://labs.google.com/ridefinder/images/mm_20_shadow.png',
		'iconSize' => '12, 20',
		'shadowSize' => '22, 20',
		'iconAnchor' => '6, 20',
		'infoWindowAnchor' => '5, 1'
	),
	2 => array(
		'image' => 'http://labs.google.com/ridefinder/images/mm_20_green.png',
		'shadow' => 'http://labs.google.com/ridefinder/images/mm_20_shadow.png',
		'iconSize' => '12, 20',
		'shadowSize' => '22, 20',
		'iconAnchor' => '6, 20',
		'infoWindowAnchor' => '5, 1'
	),
	3 => array(
		'image' => 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
		'shadow' => 'http://labs.google.com/ridefinder/images/mm_20_shadow.png',
		'iconSize' => '12, 20',
		'shadowSize' => '22, 20',
		'iconAnchor' => '6, 20',
		'infoWindowAnchor' => '5, 1'
	),
);


function Above_Map() {
	global $Points;
	$LastPoint = $Points[count($Points) - 1];
	
	?>

<p>This map shows where <a
href="http://www.geocaching.com/seek/cache_details.aspx?wp=GCED59">Moving
123</a> has been.  It is a moving cache that hovers around the Minneapolis /
St. Paul, Minnesota area.  Information is updated manually, so you may need
to wait a few days before the most recent activity is plotted properly.</p>

<p>You can map this in <a href="http://earth.google.com/">Google Earth</a>
with either the <a
href="kml-net.php/gced59.kml">networked KML</a> or the <a
href="kml.php/gced59.kml">static KML</a> file.  The networked KML file will
give you live information as this page is updated, but it requires an
internet connection.  The static KML file will work offline, but you need to
re-import it into Google Earth when you want the data to be updated.</p>

<?php MakeBoxTop('center') ?>
<b><?php echo DegToDM($LastPoint[2], 1) ?><br>
<?php echo DegToDM($LastPoint[1], 0) ?></b><br>
<?php echo $LastPoint[3] ?><br>
<script language=JavaScript><!--
function SeeLastPoint()
{
   map.centerAndZoom(new GPoint(<?php echo $LastPoint[1] ?>, <?php echo $LastPoint[2] ?>), 5);
}
// --></script>
(<a href="#" onclick="SeeLastPoint(); return false;">go there</a>)
<?php
	
	MakeBoxBottom();
}

