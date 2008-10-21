<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'FoxPro Links',
		     'topic' => 'foxpro'));

?>

<p>Where would I be if I did not list the useful sites out there that had
FoxPro code available for public consumption?</p>

<?PHP

$Links = array(
   array('Name' => 'Ed Leafe\'s Downloads',
         'Desc' => 'Many other forms, applications, and other FoxPro ' .
	    'samples are available here.',
	 'URL' => 'http://www.leafe.com/dls/vfp'),
   array('Name' => 'FoxPro Wiki',
         'Desc' => 'Most likely, someone before you had the same problem ' .
	    'that you are facing.  This wiki houses some of the best ' .
	    'information available for FoxPro.',
	 'URL' => 'http://fox.wikis.com/wc.dll?Wiki~FoxProWiki'),
);

MakeLinkList($Links);

StandardFooter();