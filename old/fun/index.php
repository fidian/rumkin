<?php

require '../functions.inc';
StandardHeader(array(
		'title' => 'Fun Stuff'
	));

?>

<p>Bored at work?  Trying to brighten your day?  Or just need to kill
some time?</p>

<p>I hope that this collection of fun things will keep you entertained for a
bit.</p>

<?php

$Links = array(
	array(
		'Name' => 'American Idol',
		'Desc' => 'How would the judges react to your performance if you ' . 'were up on stage singing for them?  Find out, without giving ' . 'the rest of the world a chance to laugh at you.',
		'URL' => 'american_idol/'
	),
	array(
		'Name' => 'Do-It-Yourself Country / Western Kit',
		'Desc' => 'Effortlessly create the next #1 song on the Country ' . 'charts with this handy page.',
		'URL' => 'madlibs/country_western_kit.php'
	),
	array(
		'Name' => 'Games',
		'Desc' => 'Fun things that I have found and put on my site to ' . 'help you pass the time.',
		'URL' => 'games/'
	),
	array(
		'Name' => 'Images',
		'Desc' => 'Go here and view a randomly funny picture.',
		'URL' => 'images/'
	),
	array(
		'Name' => 'Personality Tests',
		'Desc' => 'Different personality tests and other things that are ' . 'designed to entertain and possibly even give you a further ' . 'insight on yourself.',
		'URL' => 'tests/'
	),
	array(
		'Name' => 'Tongue Twisters',
		'Desc' => 'A collection of various phrases that are challenging ' . 'to say properly.',
		'URL' => 'ttwisters/'
	),
	array(
		'Name' => 'Trivia of the Day',
		'Desc' => 'This is an archive of the trivia that gets put on the ' . 'whiteboard at work.  Trivia, fun facts, quotes, and other ' . 'neat things are posted every day.',
		'URL' => 'trivia/'
	),
);
MakeLinkList($Links);
StandardFooter();
