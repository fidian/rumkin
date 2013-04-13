<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Palm OS Software',
		'topic' => 'palmsoft'
	));

?>

<p>When finding software for my handhelds (Palm IIIx, Palm m100, and a Visor
Prism), I usually spend a good deal of time searching the net for exactly
what I want.  These programs and links have been found to be the most helpful
for me. Beside each link is a description of the software or of the site that 
I am linking to.</p>

<p>For software, I primarily look for freeware -- I don't like being
burdened by shareware or demo versions.  You might see a bit of my bias in
the lists below.</p>
	
<p>You might also want to check out my <a href="/reference/gutenberg/">Project
Gutenberg</a> page where I have converted some selected books into Plucker
format for the Palm.  Additionally, I am starting a
<a href="/reference/palm/">Palm programming</a> page to show various tidbits
and silly things that I have learned over the years.</p>

<?php

$SW = array(
	'Launchers' => array(
		'Launcher III' => array(
			'Type' => 'freeware',
			'Version' => '2.2',
			'Desc' => 'A superior replacement for the built-in launcher (the ' . 'applications screen).  The only negative thing is that it ' . 'is only black & white.  Version 2.2 is the last freeware ' . 'stable release of the software.  Version 2.3 beta 3 is the ' . 'last version before people had to start paying for it. ' . 'Since then, Launcher III has been discontinued and replaced by ' . 'Launcher X.',
			'Links' => array(
				'Version 2.2' => 'media/lnchiii-en.zip',
				'Version 2.3b3' => 'media/lnchiii23b3.zip',
				'Official Site' => 'http://www.launcherx.com/'
			)
		),
	),
	'Games' => array(
		'Cribbage' => array(
			'Type' => 'freeware',
			'Version' => '3.0',
			'Desc' => 'Great color game for your Palm.  Also works for those ' . 'that do not have color screens.  The official site was taken ' . 'down.',
			'Links' => array(
				'Version 3.0' => 'media/cribbage.zip',
				'PRC' => 'media/Cribbage.prc',
				'FreewarePalm' => 'http://www.freewarepalm.com/games/cribbage.shtml'
			)
		),
		'Patience' => array(
			'Type' => 'Patience Revisited',
			'Version' => '2.6.2',
			'Desc' => 'Many different solitare games in one small program.  ' . 'Supports color and hi-res.  Based off of the open-source ' . 'game Patience.',
			'Links' => array(
				'Patience' => 'http://keithp.com/pilot/patience/',
				'Patience Revisited' => 'http://www.freewarepalm.com/games/patiencerevisited.shtml',
			)
		),
	),
	'Calculators' => array(
		'Calcul-8!' => array(
			'Type' => 'freeware',
			'Version' => '1.1.2',
			'Desc' => 'A scientific calculator that I replaced the standard ' . 'calculator with.  It supports base and unit conversion, ' . 'hexadecimal, trig functions, and more.  Requires MathLib (see ' . 'the Libraries section below).',
			'Links' => array(
				'Official Site' => 'http://www.nutcom.fsnet.co.uk/palm/'
			)
		),
		'Kalk' => array(
			'Type' => 'freeware, postcard ware',
			'Version' => '3.0.6',
			'Desc' => 'RPN Calculator for all of you truly scientific people.  ' . 'Requires MathLib (see the Libraries section below).',
			'Links' => array(
				'Official Site' => 'http://www.klawitter.de/palm/kalk.html',
			)
		),
		'snapCalc' => array(
			'Type' => 'freeware',
			'Version' => '5.6',
			'Desc' => 'Pop up a calculator anywhere.  Very nice.  This one is ' . 'for use with OS 5 handhelds only.  If you don\'t have Palm OS 5 ' . 'or better, use the snapCalc listed under the Hacks category ' . 'below.',
			'Links' => array(
				'Official Site' => 'http://www.geocities.com/rnlnero/Palmos.html',
			)
		),
		'FreeForm' => array(
			'Type' => 'freeware',
			'Version' => '1.0',
			'Desc' => 'A calculator with a clean, simple interface.  It features ' . 'all standard math functions, 10 memories and braces up to a ' . 'depth of 25.  Repetitive calculations can be executed as a ' . 'script, even allowing loops and conditional branches.  The ' . 'official site is down, so a local copy is available.',
			'Links' => array(
				'FreewarePalm' => 'http://www.freewarepalm.com/calculator/freeform.shtml',
				'Local Copy' => 'media/FreeForm.zip',
			)
		),
	),
	'Applications' => array(
		'Astro Info' => array(
			'Type' => 'freeware, open source',
			'Version' => '2.5.1',
			'Desc' => 'Astronomy program for stargazers.  Kinda rough right now, ' . 'but it looks like it has more potential than similar shareware ' . 'programs.  Requires MathLib (see the Libraries section below).',
			'Links' => array(
				'Official Site' => 'http://astroinfo.sourceforge.net/',
			)
		),
		'CSpotRun' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.2.7',
			'Desc' => 'An extremely lightweight and feature-packed DOC reader.  ' . 'Again, linking to MemoWare so you can get DOC files.',
			'Links' => array(
				'Official Site' => 'http://www.32768.com/bill/palmos/cspotrun/',
				'MemoWare' => 'http://memoware.com/',
			)
		),
		'DB' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.1.0',
			'Desc' => 'Great program if you want to have a database on your ' . 'Palm.  It could hold contact information, important dates, ' . 'any sort of list you can imagine, and more.',
			'Links' => array(
				'Official Site' => 'http://pilot-db.sourceforge.net/',
			)
		),
		'Deflater' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.0',
			'Desc' => 'Compress programs on your palm when you don\'t need them ' . 'to save space.  Decompress them when you want to use them ' . 'again.  Also works on databases.',
			'Links' => array(
				'Official Site' => 'http://www.copera.com/deflater/index.html',
			)
		),
		'Plucker' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.8',
			'Desc' => 'Free document reader that supports bold, italics, ' . 'centering, images, and other select pieces of HTML.  ' . 'Lets you take entire books and web sites with you.  ' . 'Can use ZLib (see the Libraries section below) for ' . 'excellent compression of documents.  I am also linking ' . 'to my page where I have converted some Project Gutenberg ' . 'books to Plucker format for you.',
			'Links' => array(
				'Official Site' => 'http://www.plkr.org/',
				'Gutenberg Books' => '../gutenberg/',
			)
		),
		'Weasel Reader' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.59.3',
			'Desc' => 'Lets you read DOC and zTXT documents on your Palm.  ' . 'These are specially compressed texts that are converted ' . 'especially for your Palm.  You can find some pre-formatted ' . 'documents at MemoWare.',
			'Links' => array(
				'Official Site' => 'http://gutenpalm.sourceforge.net/',
				'MemoWare' => 'http://memoware.com/',
			)
		),
	),
	'Hacks (System Extensions)' => array(
		'X-Master' => array(
			'Type' => 'freeware',
			'Version' => '1.5',
			'Desc' => 'Lets you improve your Palm by letting you alter how ' . 'the operating system runs.  Lets you add popup calculators, ' . 'better random number generation, and other assorted goodies.',
			'Links' => array(
				'Official Site' => 'http://linkesoft.com/xmaster/'
			)
		),
		'Crash' => array(
			'Type' => 'freeware',
			'Version' => '2.4 freeware',
			'Desc' => 'Software isn\'t as stable as it should be.  If you are a ' . 'developer or a power user, you know that your palm can crash ' . 'often, requiring you to perform a paper-clip reset.  This ' . 'software pops up a nicer message and automatically restarts ' . 'your Palm so you don\'t need to dig around to find that reset pin.',
			'Links' => array(
				'Official Site' => 'http://www.79bmedia.com/crash/',
			)
		),
		'Entropy Hack' => array(
			'Type' => 'freeware, open source',
			'Version' => '0.3',
			'Desc' => 'The Palm OS SysRandom() call is a weak pseudo-random ' . 'number generator.  This hack gathers randomness or "entropy" ' . 'by recording system events and then uses this entropy to patch ' . 'Palm OS\'s SysRandom() call to generate high-quality random ' . 'numbers for any application that needs them.  The local copy ' . 'is the version I had on my Palm when I was told the official ' . 'site was down.',
			'Links' => array(
				'Official Site' => 'http://www.joat.ca/software/entropy.html',
				'Version 1.3' => 'media/entropy.zip',
				'PRC' => 'media/entropy.prc',
			)
		),
		'snapCalc' => array(
			'Type' => 'freeware',
			'Version' => '1.7.1',
			'Desc' => 'Lets you pop up a calculator anywhere you please.  ' . 'Extremely handy.  This version is only for handhelds before OS ' . '5.  If you have OS 5 or better, see the Calculators section ' . 'above for the OS 5 version of this calculator.',
			'Links' => array(
				'Official Site' => 'http://www.geocities.com/rnlnero/Palmos.html',
			)
		),
		'KeyClick Hack' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.0.2',
			'Desc' => 'Turns off the beeping sound that occurs with nearly ' . 'every tap, making ' . 'your Palm not quite as annoying.  It is different than turning ' . 'off the system sound because you will still get the beeps when ' . 'alerts pop up and the sound when you hotsync.  There is an OS5 ' . 'version as well.',
			'Links' => array(
				'Official Site' => 'http://petesh.com/palmos/',
				'Version 1.0.2' => 'media/sysbeephack1.0.2.zip',
			)
		),
		'MenuHack' => array(
			'Type' => 'freeware',
			'Version' => '1.2',
			'Desc' => 'Lets owners of older Palms access the menus easier, just ' . 'like the newer models.  You can just tap on the menu bar on the ' . 'top of the screen instead of finding the silkscreened menu ' . 'button near the graffiti area.',
			'Links' => array(
				'Official Site' => 'http://www.daggerware.com/mischack.htm',
			)
		),
		'Daylight Savings Hack' => array(
			'Type' => 'freeware',
			'Version' => '2.1.3',
			'Desc' => 'Checks whether it should adjust the time whenever the palm ' . 'is turned on.  Small, great, and not available on benc.hr (the ' . 'official site.',
			'Links' => array(
				'Version 2.1.3' => 'media/dshack.zip',
			)
		),
	),
	'Networking' => array(
		'EudoraWeb' => array(
			'Type' => 'freeware',
			'Version' => '2.1',
			'Desc' => 'Part of the Eudora Internet Suite, this text-only web ' . 'browser is fast and supports SSL (if you install the included ' . 'SSL library).  It does not support images and it can not install ' . 'files from the web.  It connects to the web server directly, ' . 'which means you don\'t need a proxy server, and it displays text ' . 'in color, where appropriate.',
			'Links' => array(
				'Official Site' => 'http://www.eudora.com/internetsuite/',
			)
		),
		'MiniTerm' => array(
			'Type' => 'freeware',
			'Version' => '0.8',
			'Desc' => 'A serial terminal program.  Good if you need to talk to ' . 'a router or something in an emergency.',
			'Links' => array(
				'Official Site' => 'http://pamupamu.at.infoseek.co.jp/soft/mterm/mterm_E.htm',
			)
		),
		'PortScanner' => array(
			'Type' => 'freeware',
			'Version' => '1.1',
			'Desc' => 'If you have a Palm that is connected to the Internet, you ' . 'can run a port scan on a machine by its IP address.  This can ' . 'tell you what services are running on the target machine.',
			'Links' => array(
				'PalmGear' => 'http://palmgear.com/index.cfm?fuseaction=software.showsoftware&prodID=56631',
				'Local Copy' => 'media/PortScanner.prc',
			)
		),
		'Vagabond' => array(
			'Type' => 'freeware, open-source',
			'Version' => '1.03',
			'Desc' => 'Web browser for Palm.Net and web clipping devices.  ' . 'Has a color and B&W version.',
			'Links' => array(
				'Official Site' => 'http://www.linuxlabs.com/vagabond.html',
				'Local Copy' => 'media/vagabond103.zip',
			)
		),
	),
	'Utilities' => array(
		'Backup All' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.1',
			'Desc' => 'Helps make sure that all of your programs and databases ' . 'will be backed up with the next HotSync.',
			'Links' => array(
				'Official Site' => 'http://yanoff.sourceforge.net/backupall/backupall.html',
			)
		),
		'BackupBuddy VFS Free' => array(
			'Type' => 'freeware, non-commercial',
			'Version' => '2.1',
			'Desc' => 'Backup your Palm to a VFS card.  If you have an organizer ' . 'that uses VFS, you can use this free software to back it up to ' . 'non-volatile flash memory.  Versions on the official web site ' . 'are shareware only &ndash; this is the only freeware version ' . 'and it is only for non-commercial use.',
			'Links' => array(
				'Official Site' => 'http://www.bluenomad.com',
				'Local Copy of Free Version' => 'media/bbvfsfree.zip',
			)
		),
		'BigClock' => array(
			'Type' => 'freeware',
			'Version' => '2.83',
			'Desc' => 'A large clock, world clock, countdown timer, stopwatch, ' . 'alarm clock, and everything else that is dealing with a clock.',
			'Links' => array(
				'Official Site' => 'http://www.bigclock.de/',
			)
		),
		'Filez' => array(
			'Type' => 'freeware',
			'Version' => '6.5',
			'Desc' => 'The ultimate file manager.  Copy files to/from expansion ' . 'cards, beam anything, transfer files with bluetooth.',
			'Links' => array(
				'Official Site' => 'http://nosleepsoftware.sourceforge.net/download.php',
				'PalmGear' => 'http://www.palmgear.com/index.cfm?fuseaction=software.showsoftware&prodid=9992',
			)
		),
	),
	'Libraries' => array(
		'MathLib' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.1',
			'Desc' => 'Shared library that makes IEEE-754 double-precision math ' . 'functions available to developers.  One shared copy of these ' . 'large routines for accurate trig functions means that all of ' . 'your advanced calculators will not be duplicating the code ' . 'and leads to a more efficient and better layout of the ' . 'software.',
			'Links' => array(
				'GitHub Project' => 'https://github.com/fidian/MathLib',
			)
		),
		'ZLib' => array(
			'Type' => 'freeware, open source',
			'Version' => '1.1.4-1',
			'Desc' => 'Based on one of the most common compression libraries ' . 'available, this Palm library brings desktop-quality ' . 'compression routines to the handheld and makes them available ' . 'for developers.  This library is used to decompress as well as ' . 'compress data, and is used in Plucker and Deflater (two ' . 'examples also listed on this web page).  The updated version ' . 'runs faster on OS5 Palms and still works great on pre-OS 5 ' . 'devices.  I would suggest you get the updated version.',
			'Links' => array(
				'Official Site' => 'http://palmzlib.sourceforge.net/',
				'Updated' => 'http://www.copera.com/zlib-armlet/index.html',
			)
		),
	)
);

foreach ($SW as $Category => $Entries) {
	Section(htmlspecialchars($Category));
	echo "<dl>\n";
	
	foreach ($Entries as $Name => $Data) {
		echo '<dt><b>' . htmlspecialchars($Name) . '</b> - ';
		echo htmlspecialchars($Data['Type']) . ' (version ';
		echo htmlspecialchars($Data['Version']) . ")</b></dt>\n";
		echo '<dd>' . htmlspecialchars($Data['Desc']) . "</dd>\n";
		echo '<dd>';
		$AddSpace = 0;
		
		foreach ($Data['Links'] as $Title => $URL) {
			if ($AddSpace)echo ' &nbsp; - &nbsp; ';
			$AddSpace = 1;
			echo '[ <a href="' . $URL . '">' . htmlspecialchars($Title);
			echo '</a> ]';
		}
		
		echo "</dd>\n";
	}
	
	echo "</dl>\n";
}

Section('Related Links');
$Links = array(
	array(
		'Name' => 'FreewarePalm',
		'Desc' => 'Great listing of freeware programs.',
		'URL' => 'http://www.freewarepalm.com/'
	),
	array(
		'Name' => 'Freeware Palm',
		'Desc' => 'What?  Two sites with nearly identical names?  You bet!',
		'URL' => 'http://www.freeware-palm.com/'
	),
	array(
		'Name' => 'PalmOpenSource.com',
		'Desc' => 'Software that is not only free, but also lets you ' . 'download and modify the source code in order to make ' . 'improvements.  Unfortunately, this site is a bit on the ' . 'small size and doesn\'t have loads of software.',
		'URL' => 'http://www.palmopensource.com/'
	),
	array(
		'Name' => 'PalmGear',
		'Desc' => 'Large listing of software for the Palm.  It\'s so ' . 'huge that it has a small problem sorting software into ' . 'proper categories.  However, the search engine can help ' . 'find what you were looking for.',
		'URL' => 'http://www.palmgear.com/'
	),
	array(
		'Name' => 'Handango',
		'Desc' => 'My last resort before using Google when I am trying ' . 'to find some software.  Once, it was better than PalmGear.  ' . 'Since then, it has been commercialized a bit too much and  ' . 'slowed down a lot.',
		'URL' => 'http://www.handango.com'
	),
	array(
		'Name' => 'Gutenberg Books',
		'Desc' => 'The books from Project Gutenberg that I have converted ' . 'into Plucker format.',
		'URL' => '/reference/gutenberg/'
	),
	array(
		'Name' => 'Palm Programming',
		'Desc' => 'Tips and reference code that can be used to help you ' . 'write Palm software.',
		'URL' => '/reference/palm/'
	),
);
MakeLinkList($Links);
StandardFooter();
