<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Web Reference',
	'header' => 'Web Reference',
	'topic' => 'web'));

$GLOBALS['WebLinks'] = array(
	array('Name' => 'Geographic Navigation',
		'Desc' => 'By using a spinning globe, you can separate the ' .
			'information you have about the world into groups by ' .
			'continent.  This type of idea could be used to categorize ' .
			'your links by any type of region.',
		'URL' => 'geonav.php'),
	array('Name' => 'Including Javascript',
		'Desc' => 'If you have the desire to load JavaScript files ' .
			'dynamically and even know when they have loaded, this ' .
			'page is for you!'),
	array('Name' => 'JavaScript Speed',
		'Desc' => 'If you code it right, it will run at a (hopefully) ' .
			'respectable speed.',
		'URL' => 'js_speed.php'),
	array('Name' => 'LifeGenesis',
		'Desc' => 'Conway\'s game of cellular automata animated by ' .
			'using JavaScript to swap images.  Random splatters ' .
			'assist in keeping things interesting.',
		'URL' => 'lg.php'),
	array('Name' => 'Mouseover Descriptions',
		'Desc' => 'Use JavaScript to swap images, display description ' .
			'information in a box, and show information in the status ' .
			'bar.  Great for explaining to visitors what some specific ' .
			'links (like a menu bar) do.',
		'URL' => 'desc.php'),
	array('Name' => 'Onload Overloading',
		'Desc' => 'Have two (or more) JavaScript programs that both ' .
			'want to use window.onload?  Alter them both accordingly ' .
			'so that they will never conflict again.  Code this way for ' .
			'all of your window.onload needs and remove potential ' .
			'sources of trouble.',
		'URL' => 'onload.php'),
	array('Name' => 'Popup Data Passing',
		'Desc' => 'Open a popup window and pass data back and forth with ' .
			'JavaScript.',
		'URL' => 'popup_window.php'),
	array('Name' => 'Shortcut Icon',
		'Desc' => 'Put a tiny little picture in the address bar for ' .
			'your web site.',
		'URL' => 'shortcut.php'),
	array('Name' => 'Transparency',
		'Desc' => 'Show how to use CSS and maybe a bit of JavaScript ' .
			'to make things appear, dissapear, and act bizarre ' .
			'altogether.',
		'URL' => 'transparency.php'),
);

MakeLinkList($GLOBALS['WebLinks']);

StandardFooter();
