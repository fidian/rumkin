<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'GPX Tools for Geocaching',
		     'topic' => 'gpx_tools'));

?>

<p>Here are a list of resources that could be useful for geocaching and
that relate to the tools on this web site.</p>

<?PHP
$Links = array(
   array('Name' => 'GPSBabel',
	 'Desc' => 'Convert to and from many different types of ' .
	    'waypoint files, filter points by advanced filters, ' .
	    'and even send your points to a GPS.  Freeware ' .
	    '(open source) for Windows, Linux, OS X, others.',
	 'URL' => 'http://www.gpsbabel.org/'),
   array('Name' => 'GPX Spinner',
	 'Desc' => 'Writes out a GPX file as a set of HTML files ' .
	    'or alters it like the gpxrewrite tool for loading ' .
	    'into your GPS.  Shareware for Windows.',
	 'URL' => 'http://www.gpxspinner.com/'),
   array('Name' => 'GSAK',
	 'Desc' => 'A very versatile tool that lets you filter, ' .
	    'convert, and modify waypoints.  Shareware for Windows.',
	 'URL' => 'http://gsak.net/'),
);

Section('Software');
MakeLinkList($Links);

$Links = array(
   array('Name' => 'Working with Custom Waypoints',
	 'Desc' => 'How to set up custom waypoints for Garmin ' .
	    'GPS units.  The article is geared towards ' .
	    'geocaching, and shows you how to use ximage, ' .
	    'step by step.',
	 'URL' => 'http://www.elsinga.net/208.html'),
);

Section('Informational / How-To');
MakeLinkList($Links);

StandardFooter();
