<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Problems and Solutions',
		     'topic' => 'problems'));

$Pages = array(
   'averatec_6200' => array('Name' => 'Linux on Averatec 6200',
                            'Desc' => 'Tips on getting Linux running ' .
                               'smoothly on this type of laptop.',
                            'URL' => 'averatec_6200.php'),
   'csnw' => array('Name' => 'CSNW',
		   'Desc' => 'Open a DOS shell and get "<tt>Cannot load VDM ' .
		      'IPX/SPX support</tt>"',
		   'URL' => 'csnw.php',
		   'Escape' => false),
   'export_qa_to_excel' => array('Name' => 'Export Query Analyzer to Excel',
				 'Desc' => 'Are you missing column headers ' .
				    'when you cut and paste your Query ' .
				    'Analyzer results into an Excel table? ' .
				    'Learn how to get them there quickly ' .
				    'and easily.',
				 'URL' => 'export_qa_to_excel.php'),
   'sdif' => array('Name' => 'SDIF',
		   'Desc' => 'You need to restore files from a Novell ' .
		      'backup to a non-Novell system, but the files appear ' .
		      'to be corrupt when resored.',
		   'URL' => 'sdif.php'),
   'time_diff' => array('Name' => 'Time Difference',
			'Desc' => 'When you try to log into a Windows domain, ' .
			   'you get the error "<tt>There is a time ' .
			   'difference between the client and server.</tt>"',
			'URL' => 'time_diff.php',
		        'Escape' => false),
);

$TopicPage = array(
   'DOS / DOS Shell' => array('csnw'),
   'Backups' => array('sdif'),
   'Novell' => array('csnw', 'sdif'),
   'SQL Server' => array('export_qa_to_excel'),
   'Windows' => array('time_diff'),
);

?>
	
<p>Ever have a weird problem that you couldn't figure out how to get rid of
it?  I have.  Sometimes the information isn't even on the web when I search
for the answer, or else the answer is split up and scattered across numerous 
web pages.  Because of that, I have collected my goofy problems here on this
page in the hopes that it will save another person some time.</p>

<p><b><font size="+1">Topics:</font></b></p>

<ul>
<?PHP

foreach ($TopicPage as $k => $v)
{
   echo '<li><a href="#' . MakeAnchor($k) . '">' . $k . "</a>\n";
}

echo "</ul>\n";

foreach ($TopicPage as $k => $v)
{
   echo "<hr>\n";
   echo '<p><b><font size="+1"><a name="' . MakeAnchor($k) . 
      "\"></a>$k</font></b></p>\n";
   
   $Links = array();
   foreach ($v as $l)
   {
      $Links[] = $Pages[$l];
   }
   
   MakeLinkList($Links);
}

?>

<hr>

<p>Yes, that is a short list.  If you have experienced other problems
and there is no solution out "on the net" for you, or if you need to follow
the instructions on a dozen different pages and you would like to just have
the answer on one simple page, leave me feedback in the box below.</p>

<?PHP

StandardFooter();


function MakeAnchor($s)
{
   $s = strtolower($s);
   $s = preg_replace('/[^a-z0-9]/', '', $s);
   return $s;
}
