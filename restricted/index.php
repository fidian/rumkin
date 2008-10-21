<?PHP

require '../functions.inc';

CheckForLogin('restricted');
StandardHeader(array('title' => 'Restricted Information', 
		     'topic' => 'restricted'));

$Links = array(
   array('Name' => 'Discussion List',
	 'Desc' => 'View the comments left on the various pages all at once.',
	 'URL' => 'topic_list.php'),
   array('Name' => 'AwStats by Directory',
	 'Desc' => 'Custom form that lets you view hits by directory.',
	 'URL' => 'awstats.php'),
   array('Name' => 'AwStats',
	 'Desc' => 'Web site statistics.  Nearly everything you would ' .
	    'ever be curious about.',
	 'URL' => '/cgi-bin/awstats.pl'),
   array('Name' => 'Upload',
	 'Desc' => 'Upload a file to this server.',
	 'URL' => 'upload.php'),
   array('Name' => 'Theme Tester',
	 'Desc' => 'Tests the themes on this server so I can see what a ' .
	    'particular change would do to web pages.',
	 'URL' => 'theme.php'),
);

MakeLinkList($Links);


Section('Site Announcements');
ShowTopic('*', 'normal', '10');

StandardFooter();
