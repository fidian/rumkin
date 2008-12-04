<?php

require '../functions.inc';
StandardHeader(array(
		'title' => 'Software',
		'header' => 'Software / Projects'
	));

?>

<p>All sorts of programs reside here.  They range from desktop software
packages, to web server libraries, to shareware that runs on your handheld.
</p>

<?php

Section('Utilities');
$Links = array(
	array(
		'Name' => 'BURP',
		'Desc' => 'Encrypt a single file with Blowfish encryption.  ' . 'Command-line based, public domain, ported to many ' . 'platforms.  I have also written a Windows GUI.',
		'URL' => 'burp/'
	),
	array(
		'Name' => 'DBF Tools',
		'Desc' => 'Some utilities I whipped up to boil down a dbf file ' . 'by aggregating the records and another to concatenate ' . 'multiple dbf files together.',
		'URL' => 'dbf_tools/'
	),
	array(
		'Name' => 'Floater',
		'Desc' => 'A floating menu, complete with source.  Also ' . 'has an altered version that works well on a flash drive.',
		'URL' => 'floater/'
	),
	array(
		'Name' => 'FoxPro',
		'Desc' => 'Useful things that I have written.  Maybe it ' . 'could help you out too?',
		'URL' => 'foxpro/'
	),
	array(
		'Name' => 'GPX Tools',
		'Desc' => 'Command-line utilities that will alter the GPX ' . 'files retrieved from a geocaching pocket query.',
		'URL' => 'gpx_tools'
	),
	array(
		'Name' => 'Mirror',
		'Desc' => 'PERL program to mirror a set of directories with ' . 'a list of exclusions.',
		'URL' => 'mirror/'
	),
	array(
		'Name' => 'Miscellaneous',
		'Desc' => 'Little things that I don\'t know where else to put.',
		'URL' => 'tools/'
	),
	array(
		'Name' => 'Tape Tools',
		'Desc' => 'C programs designed to get data off of tapes from ' . 'a Linux system.  Especially geared for 3480/3490 tapes.',
		'URL' => 'tapes/'
	),
	array(
		'Name' => 'UNTGZ',
		'Desc' => 'Extract .tar and .tgz (.tar.gz) files.  Automatic ' . 'long filename conversion.  DOS, DOS 386+, Win32 for Windows ' . '95/98/2000/NT/ME/XP, native OS/2.  Freeware, open source ' . 'under GPL v2, with source code.  Also a VERY tiny version.',
		'URL' => 'untgz/'
	),
	array(
		'Name' => 'USBStart',
		'Desc' => 'A nice program that will help you automatically run ' . 'another program on your USB drive.  When that program exits, ' . 'the drive will be automatically dismounted.  Great for ' . 'use with Floater.',
		'URL' => 'usbstart/'
	),
);
MakeLinkList($Links);
Section('Java Applets');
$Links = array(
	array(
		'Name' => 'Java Puzzle Applet',
		'Desc' => 'Want a free puzzle that you can stick in your web ' . 'pages?  Try this one out!  It is small, fast, very ' . 'compatible, and takes almost all work out of putting ' . 'up a puzzle site of your own.',
		'URL' => 'puzzle/'
	),
	array(
		'Name' => 'SalangMenu',
		'Desc' => 'Tiny little menu system that is completely ' . 'configurable through parameter tags.',
		'URL' => 'salangmenu/'
	),
);
MakeLinkList($Links);
Section('Palm OS Programs');
$Links = array(
	array(
		'Name' => 'D&D Helper',
		'Desc' => 'Palm OS program that is designed to help out DMs and ' . 'characters.  It tries to speed up the game by rolling large ' . 'amounts of dice and performing time-consuming calculations.  ' . 'It can also look up information and generate various ' . 'things.',
		'URL' => 'dnd_helper/'
	),
	array(
		'Name' => 'Marco',
		'Desc' => 'Surveyor software for the Palm Pilot and other Palm OS ' . 'devices.  Designed to be a tool for quick calculations and ' . 'small amounts of number crunching.  Not a complete solution ' . 'for surveying, but a fast and quick reference and calculator.',
		'URL' => 'marco/'
	),
	array(
		'Name' => 'Palm OS Software',
		'Desc' => 'A local copy of several Palm programs, all of which ' . 'are free to use.',
		'URL' => 'palm/'
	),
);
MakeLinkList($Links);
Section('Server Software');
$Links = array(
	array(
		'Name' => 'Email Validation',
		'Desc' => 'Javascript and PHP code that will verify that an ' . 'email address at least appears valid and should pass RFC checks.',
		'URL' => 'email/'
	),
	array(
		'Name' => 'Feedback',
		'Desc' => 'A live feedback system; the exact same software that ' . 'powers the chat box at the bottom of nearly every page on  ' . 'this server.  Get much more input on how you are doing and ' . 'what the general population wants.  Includes an anti-spam ' . 'system and censoring.',
		'URL' => 'feedback/'
	),
);
MakeLinkList($Links);
StandardFooter();
