<?php

include '../../functions.inc';
$quotes = explode("\n", trim(file_get_contents('taglines.txt')));
$tip = $quotes[mt_rand(0, count($quotes) - 1)];
StandardHeader(array(
		'title' => 'D&amp;D Things',
		'header' => '3rd Edition D&amp;D',
		'topic' => 'dnd'
	));
MakeBoxTop('center');
echo '<b>D&amp;D Rule of Thumb:</b><br>';
echo htmlspecialchars($tip);
MakeBoxBottom();
$Links = array(
	array(
		'Name' => 'Pathfinder Player\'s Guide (Beta)',
		'Desc' => 'The open gaming system based on traditional d20 rules, ' . 'but freer and improved by thousands of people.  Warning:  This ' . 'file is about 25 megs.',
		'URL' => 'media/PathfinderRPGBeta.pdf'
	),
	array(
		'Name' => 'Pathfinder Web Enhancements (Beta)',
		'Desc' => 'Additional spells and magic items dropped from the ' . 'player\'s guide because they were infrequently used.',
		'URL' => 'media/PathfinderRPGBeta-WebEnhancement.pdf'
	),
	array(
		'Name' => 'Die Roller Stats',
		'Desc' => 'Visually see the difference between 3d6 and 4d4+2, ' . 'plus get some good math stats too.',
		'URL' => 'diestats.php'
	),
	array(
		'Name' => 'Guenever\'s House Rules',
		'Desc' => 'These are the additional modifications that we have ' . 'made to 3ed D&D.',
		'URL' => 'house_rules.html'
	),
	array(
		'Name' => 'Rulings',
		'Desc' => 'If the characters were placed in an odd situation ' . 'and there was a ruling as to how to handle the wacky ' . 'conditions, the ruling will be listed here.',
		'URL' => 'rulings.html'
	),
	array(
		'Name' => 'Rules of Adventuring',
		'Desc' => 'Follow them and you will likely stay alive.',
		'URL' => 'rules.php'
	),
	array(
		'Name' => 'Character Sheets',
		'Desc' => 'The best ones I could find.',
		'URL' => 'char_sheets.php'
	),
	array(
		'Name' => 'D&D Helper',
		'Desc' => 'Similar to D&D Tools (also on this page), but it does ' . 'a few more things.  Experience calculator, movement, turning ' . 'undead, die roller, reference tables, and more to come.',
		'URL' => '/software/dnd_helper/'
	),
	array(
		'Name' => 'Class Construction Kit',
		'Desc' => 'Make sure that new classes and prestige classes seem ' . 'somewhat balanced.  Version 1.1a.',
		'URL' => 'media/classconstruction.pdf'
	),
	array(
		'Name' => 'Restricted Page',
		'Desc' => 'Goodies that I intend to share only with a select ' . 'few.  If you personally know me, just get ahold of me to ' . 'request a username/password.',
		'URL' => 'index2.php'
	),
);
Section('General Links');
MakeLinkList($Links);
$Links = array(
	array(
		'Name' => 'Pathfinder',
		'Desc' => 'An open gaming system based on WotC\'s d20 open ' . 'gaming system.  You can layer this on top of your existing ' . '3.5 edition campaign.  Think of it as a more refined and freer ' . 'version, where thousands of people helped to make the system ' . 'better.',
		'URL' => 'http://paizo.com/pathfinderRPG'
	),
	array(
		'Name' => 'Hypertext D20 System Reference Document',
		'Desc' => 'A version of the SRD designed for the web.  Spells ' . 'are cross-linked, and tables are added whenever they are ' . 'used.  All of the open and free content in a nice, ' . 'web-friendly version.',
		'URL' => 'http://www.d20srd.org/'
	),
	array(
		'Name' => 'D&D Spell Sorter',
		'Desc' => 'Javascript based spell sorter.  Almost a requirement ' . 'if you are playing a spellcaster.  Also a great way to show ' . 'which spells are in spellbooks on your character or in a ' . 'treasure horde.  Very nice.',
		'URL' => 'http://www.wam.umd.edu/~cadre/dd_spell/'
	),
	array(
		'Name' => 'Alignment Test',
		'Desc' => 'Take this test while you are thinking of your ' . 'character\'s personality.  It will help you find your ' . 'alignment.',
		'URL' => 'http://www.wizards.com/default.asp?x=dnd/dnd/20001222b'
	),
	array(
		'Name' => 'D&D Race Test',
		'Desc' => 'Ever know what race you should be?',
		'URL' => 'http://www.okcupid.com/tests/take?testid=4428779146069160628'
	),
	array(
		'Name' => 'Open Gaming Foundation',
		'Desc' => 'Lots of new d20 books are now inter-operateable.  ' . 'This foundation is spearheading the movement, and is also ' . 'backed/created by Wizards of the Coast.',
		'URL' => 'http://www.opengamingfoundation.org/'
	),
	array(
		'Name' => 'System Reference Document',
		'Desc' => 'The "open" content of D&D.  Basically, the player\'s ' . 'guide, DM\'s guide, etc.',
		'URL' => 'http://www.opengamingfoundation.org/srd.html'
	),
	array(
		'Name' => 'Wu Jen',
		'Desc' => 'Wonderful Excel spreadsheets covering items, spells, ' . 'characters, and a very large one that will help generate ' . 'random monster encounters.',
		'URL' => 'http://www.geocities.com/winspir/'
	),
	array(
		'Name' => 'Net.Books',
		'Desc' => 'A few locally-hosted netbooks, links to many more ' . '(most of which appear to be defunct).  Great for ' . 'ideas for new skills, feats, magic items, etc.',
		'URL' => 'http://www.wzrd.com/home/thyle/Netbooks.htm'
	),
	array(
		'Name' => 'Blue Troll\'s Netbooks',
		'Desc' => 'Lots of netbooks on various subjects for 2ed.  More ' . 'lists of new things that either will outright work ' . 'or could be massaged to work with 3ed rules.',
		'URL' => 'http://www.wzrd.com/home/thyle/Netbooks.htm'
	),
	array(
		'Name' => 'D&D Tools',
		'Desc' => 'Freeware Palm OS program to assist the DM.  Experience ' . 'calculator, time/distance, and turning tables made easy.',
		'URL' => 'http://bellsouthpwp.net/s/c/scraw68/'
	),
	array(
		'Name' => 'AutoREALM',
		'Desc' => 'Open-source fantasy role-playing mapper software.',
		'URL' => 'http://autorealm.sourceforge.net/'
	),
	array(
		'Name' => 'Palm at the Gaming Table',
		'Desc' => 'Links to sites that have software for D&D.',
		'URL' => 'http://www.nightwasp.com/daggerdale/palm.htm'
	),
	array(
		'Name' => 'Make a Whiteboard',
		'Desc' => 'Somewhat of a journal of my attempts to make a ' . 'large whiteboard for the DM and also coating a table ' . 'for players to use a whiteboard as well.',
		'URL' => '../whiteboard/'
	),
	array(
		'Name' => '3e Character Generator',
		'Desc' => 'Free software that lets you quickly pump out ' . 'characters.  I have been told it is very good but sometimes ' . 'a little quirky.',
		'URL' => 'http://www.dark-legacy.com/redblade3e/dnd/fr_info.html'
	),
	array(
		'Name' => 'PCGen',
		'Desc' => 'Endorsed somewhat by WotC, this also helps you create ' . 'characters.  I have no idea how good this one is.',
		'URL' => 'http://pcgen.sourceforge.net/'
	),
	array(
		'Name' => 'Dungeon Crafter 2',
		'Desc' => 'Free tile-based mapping software for Windows.',
		'URL' => 'http://www.dungeoncrafter.com/'
	),
);
Section('Off-Site Links and Loosely Related Pages');
echo "<p>Kinda sorted by how much I like them...</p>\n";
MakeLinkList($Links);
$Links = array(
	array(
		'Name' => 'Artificer',
		'Desc' => 'A magic user that excels at creating magical items and ' . 'constructs.',
		'URL' => 'artificer.html'
	),
);
Section('Prestige Classes');
MakeLinkList($Links);

?>
<p>For the D&amp;D Tools, I have a local copy of 
<a href="media/DnDTools100.zip">version 1.00</a> and also here's a sneak
preview of <a href="media/DungeonHelper.prc">version 1.02</a> that doesn't
require a separate database.</p>
	
<?php

StandardFooter();
