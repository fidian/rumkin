<?php

$TreeName = 'Diablo II Problem Solver';
$Tree = array(
	0 => array(
		'This series of questions has been designed to assist you ' . 'in determining what is wrong with your installation of Diablo II.  ' . 'By clicking on the appropriate answer, you will navigate to a page ' . 'that will (in most cases) solve the issue at hand.<br><br>' . 'The first question is pretty easy; do you use <i>any</i> hacks ' . 'with Diablo II?  (This includes C3PO, a map hack, D2Loader, ' . 'D2JSP, CD Key Refiller, and many other things.)',
		2,
		1
	),
	1 => array(
		'Good for you!  There are very few people out there who ' . 'choose to be handicapped by a game.  No matter what your problem ' . 'is, you should do the following:' . '<ol>' . '<li>Uninstall Diablo II (Start -&gt; Settings -&gt; Control Panel ' . '-&gt; Add/Remove Programs -&gt; Diablo II)' . '<li>Delete your Diablo II folder (My Computer -&gt; C: -&gt; ' . 'Program Files -&gt; Diablo II -&gt; right click and select ' . 'Delete)' . '<li>Reinstall Diablo II (insert installation CD)' . '<li>[Optional] Reinstall expansion pack' . '<li>[Optional] Connect to Battle.Net and upgrade to version 1.10' . '</ol>'
	),
	2 => array(
		'Are you experiencing a specific error message that appears ' . 'outside of the Diablo II game?  Some sort of pop-up error box?  ' . 'This only refers to errors that pop up when you intend to play ' . 'Diablo II; not when you run external hacks (like the CD Key ' . 'Changer).',
		3,
		4
	),
	3 => array(
		'Which error message are you seeing?',
		array(
			'Missing Storm.Dll' => 5,
			'We\'ve Got A Big Error Here' => 6,
			'Unhandled Exception' => 7,
			'Other ...' => 8
		)
	),
	4 => array(
		'So, you use hacks and you don\'t have a specific pop-up ' . 'error message.  Sorry -- I did not yet finish this section.  ' . 'Make a topic post on the <a href="http://phpbb.rumkin.com/' . 'viewforum.php?f=7">Diablo II Forum</a> and mention that ' . 'you were in this <u>decision tree</u> at <u>node 4</u>.'
	),
	5 => array(
		'The "Missing Storm.DLL" error only appears when you are ' . 'trying to run D2Loader and it isn\'t installed correctly.<br><br>' . 'Are you certain that you installed D2Loader to your main ' . 'Diablo II directory?  (If you installed it with the ' . '<a href="/software/diabloii/">Hack Pack</a>, ' . 'it was installed to the correct location.)',
		9,
		10
	),
	6 => array(
		'The "big error" dialog box happens when a plugin crashes.  ' . 'If it just happens when you leave the game, try to cope.<br><br>' . 'Do you use C3PO?',
		11,
		12
	),
	7 => array(
		'If you get any "unhandled exception" errors, a wide ' . 'variety of things could be wrong.  This is a list of the most ' . 'common reasons for this problem.<br><br>' . '<ul>' . '<li>Software corruption (Could be a plugin, Diablo II, or even ' . 'Windows &ndash; Try reinstalling them in that order)' . '<li>Faulty/bad memory' . '<li>Error caused by CPU malfunction (Most often caused by ' . 'overclocking too high and not cooling your processor enough)' . '</ul>'
	),
	8 => array(
		'I do not have an extensive list of error messages, ' . 'so please make a new topic on the <a href="http://phpbb.rumkin.com/' . 'viewforum.php?f=7">Diablo II Forum</a> and mention that ' . 'you were in this <u>decision tree</u> at <u>node 8</u>.'
	),
	9 => array(
		'Run D2Loader directly from your Diablo II folder ' . '(My Computer &rarr; C: &rarr; Program Files &rarr; Diablo II).  ' . 'If you installed it by hand and followed the instructions, ' . 'it was installed as Diablo II.exe.  If you used the ' . '<a href="/software/diabloii/">Hack Pack</a> ' . 'or just copied D2Loader in, it will be called Diablo II Loader.exe.' . 'Double-click on the appropriate file to run it.<br><br>' . 'Does the message come up again saying that storm.dll is missing?',
		13,
		14
	),
	10 => array(
		'Reinstall D2Loader, making sure that it is placed in ' . 'your Diablo II folder.  You will likely be installing this by hand, ' . 'so move the files to your Diablo II directory before you run them. ' . 'If you have any problems or don\'t want to install it yourself, ' . 'just download the <a href="/software/diabloii/">Hack Pack</a>, ' . 'which is an easy to use installer that lets you decide what hacks ' . 'you want to run.'
	),
	11 => array(
		'You likely have a plugin conflict with C3PO.  Try ' . 'adding "-noplugin" to your command line options to D2Loader.  ' . 'Does that work?',
		15,
		16
	),
	12 => array(
		'Try removing all of your plugins.  Add them in, one ' . 'at a time until you determine which one is causing problems.  ' . 'It could be a combination of plugins.  For instance, Mousepad\'s ' . 'maphack works great by itself.  Antidetection works great by ' . 'itself.  If you try to load them both at once, you will experience ' . 'problems.'
	),
	13 => array(
		'Likely, the storm.dll file was corrupted or deleted from ' . 'your hard drive.  Looks like you need to reinstall Diablo II. ' . '<ol>' . '<li>Uninstall Diablo II (Start -&gt; Settings -&gt; Control Panel ' . '-&gt; Add/Remove Programs -&gt; Diablo II)' . '<li>Delete your Diablo II folder (My Computer -&gt; C: -&gt; ' . 'Program Files -&gt; Diablo II &ndash; right click and select ' . 'Delete)' . '<li>Reinstall Diablo II (insert installation CD)' . '<li>[Optional] Reinstall expansion pack' . '<li>Connect to Battle.Net and upgrade to version 1.10' . '<li>Reinstall your hacks' . '</ol>'
	),
	14 => array(
		'The problem is not with D2Loader, but more likely with ' . 'the shortcut that runs D2Loader.  Right-click on your shortcut and ' . 'select Properties.  Look for a "Start In" property that should ' . 'say "C:\Program Files\Diablo II".  If it does not say the path to ' . 'your Diablo II installation, it must be changed.'
	),
	15 => array(
		'You likely have a plugin conflict.  Two plugins could be ' . 'messing each other up, or a single plugin may be conflicting with ' . 'C3PO.  For instance, since C3PO contains a maphack and its own ' . 'antidetection, you are not allowed to load another Antidetection ' . 'plugin or another maphack.<br><br>' . 'Remove all plugins and make sure Diablo II runs.  Then add plugins ' . 'back in, one at a time.  Figure out which plugins conflict through ' . 'trial and error.'
	),
	16 => array(
		'Most likely C3PO, a plugin, D2Loader, or something else ' . 'got corrupt.  I would strongly suggest reinstalling Diablo II.' . '<ol>' . '<li>Uninstall Diablo II (Start -&gt; Settings -&gt; Control Panel ' . '-&gt; Add/Remove Programs -&gt; Diablo II)' . '<li>Delete your Diablo II folder (My Computer -&gt; C: -&gt; ' . 'Program Files -&gt; Diablo II &ndash; right click and select ' . 'Delete)' . '<li>Reinstall Diablo II (insert installation CD)' . '<li>[Optional] Reinstall expansion pack' . '<li>Connect to Battle.Net and upgrade to version 1.10' . '<li>Reinstall your hacks, one at a time.  Start with C3PO, then add ' . 'D2Loader, and then add your plugins individually.' . '</ol>'
	),
);


// Finish 4


// Add error message about "this product key is not for this product"
