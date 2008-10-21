<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Links',
		     'topic' => 'gps'));
?>

<p>If you want to know where to go to get more geocaches, what software you
should try out, or who to ask to order useful things, you've come to the
right spot.  If you have other links that you find useful and would like to
see them added, just leave me a comment and I'll probably add it here.</p>
	
<?PHP

Section('Geocaching');

$Links = array(
   array('Name' => 'Geocache Rating System',
	 'Desc' => 'A simple form that you can fill out and it will ' .
	    'determine the correct terrain and difficulty ratings for ' .
	    'your cache.',
         'URL' => 'http://www.clayjar.com/gcrs/'),
   array('Name' => 'Geocaching',
         'Desc' => 'The site to go to if you want to "treasure hunt".  ' .
	    'Lists caches all over the world, how to find them, and ' .
	    'what to do if you are lucky enough to actually spot one.',
	 'URL' => 'http://www.geocaching.com/'),
   array('Name' => 'Geocaching WAP Site',
         'Desc' => 'Low-bandwidth site for your phone and PDA.  This is ' .
	    'the official WAP site for Geocaching.com.',
	 'URL' => 'http://wap.geocaching.com/'),
   array('Name' => 'Handicaching',
         'Desc' => 'Provides handicapped-accessible ratings for ' .
	    'geocaching.com caches.',
	 'URL' => 'http://www.handicaching.com'),
   array('Name' => 'Navicache',
         'Desc' => 'An alternate to geocaching.com.  Not as many points ' .
	    'in my area, and the GUI is pretty utilitarian (like my whole ' .
	    'web site).',
	 'URL' => 'http://www.navicache.com/'),
   array('Name' => 'Terricaching',
         'Desc' => 'Another alternative to geocaching.com.  You need a ' .
	    'free membership to even view caches, but site is nicely ' .
	    'laid out and it has its own point system.',
         'URL' => 'http://www.terracaching.com/'),
);
	
MakeLinkList($Links);

Section('Maps and Navigation');
	
$Links = array(
   array('Name' => 'Navigation and Palm OS',
         'Desc' => 'Large list of links to software that relates to using ' .
	    'a GPS receiver and a Palm.',
	 'URL' => 'http://www.gpsinformation.org/dale/Palm/pilotgps.htm'),
   array('Name' => 'Flash Earth',
         'Desc' => 'Take a look at Google\'s and MSN\'s satellite imagery ' .
	    'in a Flash-based viewer.  Similar to Google Earth, but ' .
	    'requires no installation (except the Flash plugin you ' .
	    'probably already have installed).',
	 'URL' => 'http://www.flashearth.com/'),
   array('Name' => 'GPX Coordinate Converter, Maps and Info',
         'Desc' => 'Convert and map coordinates.  Use a map to find ' .
	    'coordinates.  Extra-slick.',
	 'URL' => 'http://boulter.com/gps/'),
   array('Name' => 'Great Circle Calculator',
	 'Desc' => 'Determine distance and angle between two sets of ' .
	    'coordinates, or get a second set of coordinates with a ' .
	    'distance and direction from a known point.',
         'URL' => 'http://williams.best.vwh.net/gccalc.htm'),
   array('Name' => 'Map Builder',
	 'Desc' => 'Build your own Google or Yahoo map.',
	 'URL' => 'http://www.mapbuilder.com/'),
   array('Name' => 'Geocaching Maps',
	 'Desc' => 'Much faster mapper, but far less details.',
	 'URL' => 'http://www.geocaching.com/map/'),
);

MakeLinkList($Links);

Section('Windows Software');
?>

<?PHP
$Links = array(
   array('Name' => 'CacheStats',
         'Desc' => 'Create an overview of your geocaching statistics ' .
	    'and include the results on your Geocaching.com user ' .
	    'profile page.  [freeware]',
	 'URL' => 'http://www.logicweave.com/cachestats.html'),
   array('Name' => 'Google Earth',
         'Desc' => 'Float above the world, zoom in and out, and look ' .
	    'across the horizon.  These are just a couple of the ' .
	    'things you can do with Google Earth.  The software is ' .
	    'free (advanced features require you to buy a "higher level" ' .
	    'product) and you can even view geocaches with the KML file ' .
	    'from Geocaching.com.  [freeware / shareware]',
	 'URL' => 'http://earth.google.com/'),
   array('Name' => 'GPS Utility',
	 'Desc' => 'Nice interface to pop in a few waypoints into the ' .
	    'GPS without needing to enter them into the receiver without ' .
	    'a keyboard.  Does lots of things, such as showing direction ' .
	    'you are travelling, number of satellites in view, and much ' .
	    'more.  Freeware version is ' .
	    'limited only to the amount of data, not the features. ' .
	    '[freeware / shareware]',
	 'URL' => 'http://www.gpsu.co.uk/'),
   array('Name' => 'GPSBabel',
         'Desc' => 'Reads, converts, and writes waypoints from LOC, ' .
	    'GPX, HTML, and many other formats.  It can even read them ' .
	    'from or send them to your GPS!  It\'s a command-line tool ' .
	    'that runs on many operating systems and is extremely ' .
	    'flexible.  [freeware, open-source]',
	 'URL' => 'http://www.gpsbabel.org/'),
   array('Name' => 'GPSBabelWrapper',
	 'Desc' => 'GUI for controlling GPSBabel.  [freeware]',
	 'URL' => 'http://www.earthquakemap.com/gbwabout.html'),
   array('Name' => 'USA Photo Maps',
         'Desc' => 'Download aerial photo maps and topographic maps from ' .
            'Microsoft\'s TerraServer site.  Knits together the images ' .
	    'to provide seamless maps that you can zoom in and out of.  ' .
	    'Can interface with your GPS to show your current location ' .
	    'on the images.  Works with GPX files.  [freeware, open-source]',
         'URL' => 'http://jdmcox.com'),
   array('Name' => 'Utopia',
         'Desc' => 'Manages your GPX and LOC files, apply filtres, upload ' .
	    'the points to your GPS and export them to different formats.  ' .
	    'Like a faster version of Watcher.  [freeware]',
	 'URL' => 'http://home.earthlink.net/~msargent2/ch/'),
   array('Name' => 'VisualGPS',
         'Desc' => 'Get information from your GPS, such as the satellites ' .
            'it has in view, signal levels, and more.  Also, lets you ' .
	    'track the calculated GPS position over time to approximate ' .
	    'a more accurate location by averaging the coordinates.  ' .
	    '[freeware]',
	 'URL' => 'http://www.visualgps.net/VisualGPS/default.htm'),
   array('Name' => 'Watcher',
         'Desc' => 'When you download a list of caches as a GPX file, they ' .
            'come with a lot of additional information about the cache.  ' .
	    'Watcher will let you view the comments, cache description, ' .
	    'and the rest of the information for each cache listed in the ' .
	    'file.  Great to have with you when you are out hitting ' .
	    'geocaches throughout the day and you didn\'t print out the ' .
	    'listings when you were at home.  [freeware]',
	 'URL' => 'http://clayjar.com/gc/watcher/'),
);
 
MakeLinkList($Links);

Section('Linux Software');

$Links = array(
   array('Name' => 'GPSBabel',
         'Desc' => 'Reads, converts, and writes waypoints from LOC, ' .
	    'GPX, HTML, and many other formats.  It can even read them ' .
	    'from or send them to your GPS!  It\'s a command-line tool ' .
	    'that runs on many operating systems and is extremely ' .
	    'flexible.  [freeware, open-source]',
     	 'URL' => 'http://www.gpsbabel.org/'),
);

MakeLinkList($Links);

Section('Palm Software');

$Links = array(
   array('Name' => 'GPilotS',
         'Desc' => 'Transfer/edit waypoints and routes, synchronize time, ' .
	    'retrieve information from your GPS and even emulate a GPS ' .
	    'for another computer. [freeware, open-source]',
         'URL' => 'http://www.cru.fr/perso/cc/GPilotS/'),
   array('Name' => 'GPS master',
         'Desc' => 'Manages your Garmin GPS, but designed for a Sharp ' .
	    'Zaurus, so it supports Sony HiRes, JogDial, memory cards, ' .
	    'and other things.',
	 'URL' => 'http://oleg.belousov.com/palm/gps_master/'),
   array('Name' => 'PalGar',
         'Desc' => 'Copies and edits waypoints and routes, synchronizes ' .
	    'time, retrieves information from your GPS. ' .
	    '[freeware, open-source]',
         'URL' => 'http://palgar.sourceforge.net'),
);

MakeLinkList($Links);
	
Section('Mobile Phone Software');

$Links = array(
   array('Name' => 'GeoMob',
         'Desc' => 'View geocache information on your phone without ' .
	    'requiring an internet connection.',
	 'URL' => 'http://www.metaltheater.com/GeoMob/'),
   array('Name' => 'MGMaps',
         'Desc' => 'Look at Google, Yahoo, Microsoft ariel and road ' .
	    'maps on your cell phone.  Supports web tracking, viewing ' .
	    'network KML files (like the Geocaching KML file), subway ' .
	    'support, directions, GPS support, and much more.',
	 'URL' => 'http://www.mgmaps.com/'),
   array('Name' => 'Google Maps for Mobile Phones',
         'Desc' => 'The Official Google application.  Not as feature ' .
	    'rich as MGMaps.',
	 'URL' => 'http://www.google.com/gmm'),
);

MakeLinkList($Links);

Section('Hardware &amp; Trinkets');

$Links = array(
   array('Name' => 'Pfranc',
         'Desc' => 'An inexpensive place where you can get Garmin-related ' .
	    'cables custom made, or just the ends so you can make your own.',
	 'URL' => 'http://pfranc.com/'),
   array('Name' => 'Blue Hills Innovations',
         'Desc' => 'Another place that you can order GPS-related cables ' . 
	    'and can get custom cables created for you.',
	 'URL' => 'http://blue-hills-innovations.com/'),
   array('Name' => 'U.S. Coin Force',
	 'Desc' => 'You can buy extremely nice coins and tokens from ' .
	    'here.  This is the supplier for MnGCA\'s geocoins.',
	 'URL' => 'http://www.uscoinforce.com/'),
   array('Name' => 'Dog Tags Direct',
	 'Desc' => 'Want a dog tag as a replacement travel bug tag? ' .
	    'Just want some cheap, nice, metal tags?  For just over $3, ' .
	    'you can get your own tag stamped.',
	 'URL' => 'http://www.dogtagsdirect.com/'),
   array('Name' => 'DoggTagz',
	 'Desc' => 'More decorative tags, but at a slightly higher cost.  ' .
	    'They are still some of the better prices you\'ll find on the ' .
	    'web.',
	 'URL' => 'http://www.doggtagz.com'),
);

MakeLinkList($Links);

StandardFooter();
