<?php

include 'functions.inc';
$GLOBALS['MenuLinks'] = array(
	array(
		'Name' => 'Software Projects and Downloads',
		'URL' => '/software/',
		'Links' => array(
			array(
				'Name' => 'D&D Helper',
				'Desc' => 'Palm OS software to help speed up your Dungeons and Dragons campaign (or other type of dice-based system) by rolling dice, looking up information, and generating interesting things.',
				'URL' => '/software/dnd_helper/'
			),
			array(
				'Name' => 'Java Puzzle Applet',
				'Desc' => 'Free puzzle applet that lets you easily add an image puzzle to your web site.  Very customizable.',
				'URL' => '/software/puzzle/'
			),
			array(
				'Name' => 'Marco',
				'Desc' => 'A set of surveyor programs that run on Palm OS, intended to replace outdated hardware and bulky laptops in the field.',
				'URL' => '/software/marco/'
			),
		)
	),
	array(
		'Name' => 'Fun',
		'URL' => '/fun/',
		'Links' => array(
			array(
				'Name' => 'Interactive Games',
				'Desc' => 'Java applets and other things that I have found elsewhere',
				'URL' => '/fun/games/'
			),
			array(
				'Name' => 'Personality Tests',
				'Desc' => 'Fun little multiple-choice questions that are intended to reveal information about yourself that you never thought of before.',
				'URL' => '/fun/tests/'
			),
			array(
				'Name' => 'Trivia and Fun Facts',
				'Desc' => 'An archive of the amazing trivia, facts, and the occasional quotes that are put up on a whiteboard at my work.',
				'URL' => '/fun/trivia/'
			),
		)
	),
	array(
		'Name' => 'Reference Materials',
		'URL' => '/reference/',
		'Links' => array(
			array(
				'Name' => 'D&D Resources',
				'Desc' => 'House rules and software used by our D&D sessions.',
				'URL' => '/reference/dnd/'
			),
			array(
				'Name' => 'Email Information for Rumkin.com',
				'Desc' => 'Useful information for people who use this machine as their email server.',
				'URL' => '/reference/email/'
			),
			array(
				'Name' => 'Palm OS Programming',
				'LongName' => 'Palm OS',
				'Desc' => 'Free programs, links to useful sites, etc.',
				'URL' => '/reference/palm/'
			),
		)
	),
	array(
		'Name' => 'Web-Based Tools',
		'URL' => '/tools/',
		'Links' => array(
			array(
				'Name' => 'Phone Uploader',
				'Desc' => 'Send new ringtones, images, and Java midlets to your phone with ease.  Works with many phones and providers.',
				'URL' => '/tools/sprint/'
			),
			array(
				'Name' => 'SSH Applet',
				'Desc' => 'Need to log into a remote machine but you don\'t have an SSH client handy?  On a loaner computer or can\'t install software?  Just need to SCP that one file?  Here you go!',
				'URL' => '/tools/ssh/'
			),
			array(
				'Name' => 'Mailto Encoder',
				'Desc' => 'A safe way to put your email address on a web page and not have it harvested by spambots!',
				'URL' => '/tools/mailto_encoder/'
			),
			array(
				'Name' => 'PJIRC',
				'Desc' => 'Java IRC applet, for those times that you need to chat and you are away from your normal IRC client.',
				'URL' => '/tools/pjirc/'
			),
		)
	),
);
StandardHeader(array(
		'title' => 'Rumkin.com'
	));

?>

<dl>

<?php

global $MenuLinks;

foreach ($MenuLinks as $Menu) {
	echo '<dt><b><a href="' . $Menu['URL'] . '">';
	
	if (isset($Menu['LongName']))echo htmlspecialchars($Menu['LongName']);
	else echo htmlspecialchars($Menu['Name']);
	echo ":</a></b></dt>\n";
	
	foreach ($Menu['Links'] as $Sub) {
		echo '<dd><a href="' . $Sub['URL'] . '">';
		
		if (isset($Sub['LongName']))echo htmlspecialchars($Sub['LongName']);
		else echo htmlspecialchars($Sub['Name']);
		echo '</a> - ' . htmlspecialchars($Sub['Desc']) . "</dd>\n";
	}
	
	echo '<dd><font size="-1">(<a href="' . $Menu['URL'] . '">More ...</a>)</font></dd>' . "\n";
}

echo "</dl>\n";
StandardFooter();
