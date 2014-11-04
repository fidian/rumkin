<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Whiteboard Links',
		     'topic' => 'whiteboard'));

?>

<p>Here is a hand-selected list of web sites that have something to do with
whiteboards.  Let me know if I should include a link that you know about,
but there is no guarantee that I will add it here.  I'm picky when it comes
to linking to other sites.</p>

<?PHP

$Links = array(
   array('Name' => 'DIY Dry Erase Board',
	 'Desc' => 'How to use an acrylic sheet to make a large ' .
	    'whiteboard for your wall.  Includes pictures showing ' .
	    'how they mounted it directly to the wall.',
	 'URL' => 'http://www.elephantstaircase.com/wiki/index.php?title=DIYDryEraseBoard'),
   array('Name' => 'Dry Erase Boards',
         'Desc' => 'Look at their "skins" for inexpensive, yet ' .
	    'professional-looking dry erase boards.',
	 'URL' => 'http://www.dryeraseboard.com/'),
   array('Name' => 'Shower Board Whiteboards',
         'Desc' => 'Some problems and possible solutions when using ' .
	    'tileboard as a whiteboard.',
	 'http://xtronics.com/reference/whiteboard.htm'),
   array('Name' => 'Solutions MB',
         'Desc' => 'They sell a very nice ' .
	    '<a href="surfaces.php#mb3000">whiteboard coating</a> ' .
	    'that can ' .
	    'turn a wall or other painted/smooth surfaces into ' .
	    'a whiteboard.',
	 'URL' => 'http://solutionsmb.com/',
	 'Escape' => false),
);

MakeLinkList($Links);
	
StandardFooter();
