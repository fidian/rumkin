<?php

require '../functions.inc';
StandardHeader(array(
		'title' => 'Reference',
		'header' => 'Reference Materials',
		'topic' => 'rumkin'
	));

?>

<p>This is a collection of how-to guides, informational documents, and other
web pages that primarily give you instructions or helpful advice.</p>

<?php

$Links = array(
	array(
		'Name' => '3rd Edition D&D Things',
		'Desc' => 'Information about our house rules, links to software, ' . 'custom prestige classes, etc.',
		'URL' => 'dnd/'
	),
	array(
		'Name' => 'Algorithms',
		'Desc' => 'Little snippets of code that I have picked up from ' . 'various sources.  Sometimes even bits that I wrote myself ' . 'because I couldn\'t find anything out there to help me.',
		'URL' => 'algorithms/'
	),
	array(
		'Name' => 'Aquapad',
		'Desc' => 'More than you ever wanted to know about the FIC ' . 'AquaPad.',
		'URL' => 'aquapad/'
	),
	array(
		'Name' => 'Bots',
		'Desc' => 'I like to program tank things.  Here\'s the ' . 'collection of links and things that I like.',
		'URL' => 'bots/'
	),
	array(
		'Name' => 'Cube Solution (NxNxN)',
		'Desc' => 'Want a simpler way to solve a Rubik\'s Cube?  It may not be the fastest, but it is one I can remember.  As a bonus, it works for any size cube, not just the kind that have 3 on a side.',
		'URL' => 'cube/'
	),
	array(
		'Name' => 'Dakota Digital Camera',
		'Desc' => 'Just a little information about a really cheap ' . 'digital camera and how to reuse it instead of paying ' . 'the processing fees.',
		'URL' => 'dakota/'
	),
	array(
		'Name' => 'Desiccant',
		'Desc' => 'How to make your own moisture removing device for ' . 'small, semi-sealed containers.  You can use it in your ' . 'tackle box, in a safe, or in a geocache.',
		'URL' => 'desiccant/'
	),
	array(
		'Name' => 'Email Information',
		'Desc' => 'Useful tidbits of information if you use this machine ' . 'as your email host.',
		'URL' => 'email/'
	),
	array(
		'Name' => 'Firearms',
		'Desc' => 'Information about ballistic gel, alternatives to ' . 'ballistic gel for testing ammunition, and firearm performance ' . 'in certain situations.  Links to great sites about ' . 'effectiveness of ammunition and various test results.',
		'URL' => 'firearms/'
	),
	array(
		'Name' => 'Microsoft Databases',
		'Desc' => 'Little functions and bits of code for Microsoft ' . 'Access and Microsoft SQL Server.',
		'URL' => 'ms_db/'
	),
	array(
		'Name' => 'Palm OS Programming',
		'Desc' => 'Tips and links that help to explain things that happen ' . 'with Palm OS.',
		'URL' => 'palm/'
	),
	array(
		'Name' => 'Problems',
		'Desc' => 'Obscure problems that I have encountered, along ' . 'with solutions.  Only used when I could not find the ' . 'solution on another site.',
		'URL' => 'problems/'
	),
	array(
		'Name' => 'Project Gutenberg',
		'Desc' => 'Palm versions of texts that I have converted from ' . 'Project Gutenberg.',
		'URL' => 'gutenberg/'
	),
	array(
		'Name' => 'Rumkin.com',
		'Desc' => 'Why did I pick the name and what does it mean?  How ' . 'can I contact the owner?  This and other site-specific things.',
		'URL' => 'site/'
	),
	array(
		'Name' => 'Web Technologies',
		'Desc' => 'How to do some interesing things with DHTML, CSS, ' . 'JavaScript, and maybe even some plain HTML.  A little ' . 'reference for me, but also explains how I coded a few ' . 'things that you can see on this web site.',
		'URL' => 'web/'
	),
	array(
		'Name' => 'Whiteboard',
		'Desc' => 'How you can build your own whiteboard out of ' . 'inexpensive materials.  Many options are provided, so you ' . 'can pick the best solution for your needs.  Information ' . 'on how to clean a whiteboard is also presented.',
		'URL' => 'whiteboard/'
	),
);
MakeLinkList($Links);
StandardFooter();
