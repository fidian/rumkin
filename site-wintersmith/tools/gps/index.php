<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'GPS and Mapping',
		'topic' => 'gps'
	));

?>


<p>My wife and I have recently taken an interest in geocaching.
It's very similar to
treasure hunting, except you already know approximately where the treasure
is.  You use your GPS to find the area and snoop around a bit to find 
the container.  If you locate it, just sign the log and optionally
trade something.</p>

<?php Section('Google Maps'); ?>

<p>These pages are all made with the Google Maps API.  They show my travel
bugs and the Moving 123 cache that hovers around Minneapolis, MN.</p>

<?php

$Links = array(
	array(
		'Name' => 'Google Waypoint Mapper',
		'Desc' => 'Load up your GPX or LOC file and map the coordinates ' . 'in Google Maps.  Very attractive.',
		'URL' => 'googlemap.php'
	),
	array(
		'Name' => 'My Finds',
		'Desc' => 'Although it isn\'t very impressive, I decided to ' . 'map all of the locations that I have found a cache.',
		'URL' => 'datamap.php?file=fidian'
	),
);
MakeLinkList($Links);
Section('Other Thingeraoos');
$Links = array(
	array(
		'Name' => 'Cache Stats',
		'Desc' => 'Analyzes your "My Finds" GPX file and figures out ' . 'many little statistics about the caches and events you have ' . 'logged.',
		'URL' => 'analyze.php'
	),
	array(
		'Name' => 'Degrees Converter',
		'Desc' => 'Converts degrees from one format to another.  From ' . 'degrees, to degrees and minutes, to dms (degrees, minutes, ' . 'seconds).',
		'URL' => 'degrees.php'
	),
	array(
		'Name' => 'Related Links',
		'Desc' => 'Links to hardware, software, web sites, mapping info, ' . 'and other things.  If you have a site that you think is ' . 'useful, leave me a comment and I may add it.',
		'URL' => 'links.php'
	),
	array(
		'Name' => 'Pocket Query Automatic Processing',
		'Desc' => 'How I have set up my server to aggregate multiple ' . 'pocket queries into one big CSV file and lots of individual ' . 'HTML files, all contained in a single ZIP.',
		'URL' => 'auto_process.php'
	),
	array(
		'Name' => 'Travel Bug Info Sheet',
		'Desc' => 'Web-based form that will make a credit-card sized ' . 'tag that you can laminate and include with your travel bug.  ' . 'It assists the finder and lets them know that they should ' . 'log the bug\'s movements and where they should go.',
		'URL' => 'travelbug.php'
	),
);
MakeLinkList($Links);
StandardFooter();
