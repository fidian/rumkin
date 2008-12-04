<?php

require '../functions.inc';
StandardHeader(array(
		'title' => 'Tools',
		'header' => 'Web-Based Tools',
		'topic' => 'tools'
	));

?>

<p>It is easy to get access to a web browser.  These tools will help you do
more advanced things with a simple client.  For other things that may be
considered tools but do not run on a live web server, check out the <a
href="/software/">software section</a>.</p>

<?php

$Links = array(
	array(
		'Name' => 'Compression',
		'Desc' => 'Experiments in using JavaScript to compress and ' . 'decompress web pages',
		'URL' => 'compression/'
	),
	array(
		'Name' => 'Ciphers',
		'Desc' => 'Simple methods to encode messages so that you can ' . 'pass them to someone else without having others know ' . 'what the message is.  Not as strong as actual encryption, ' . 'but it is something you can do by hand.  ' . 'ROT13, Cryptograms, etc.',
		'URL' => 'cipher/'
	),
	array(
		'Name' => 'PJIRC',
		'Desc' => 'Java IRC applet that lets you connect to a server from ' . 'whatever computer you sit down at.  Works even if you have ' . 'a firewall.  Does not require special software to be ' . 'installed on the computer -- it does it all in an applet.',
		'URL' => 'pjirc/'
	),
	array(
		'Name' => 'GPS and Navigation',
		'Desc' => 'Things that help out with your GPS, while geocaching, ' . 'showing maps, and relevant links.',
		'URL' => 'gps/'
	),
	array(
		'Name' => 'Great JavaScript Marquee Generator',
		'Desc' => 'Create your own little marquee that puts a customized ' . 'message on the status bar of browsers when they visit your ' . 'web site.  Many different styles and options are available.',
		'URL' => 'marquee/'
	),
	array(
		'Name' => 'Mailto Encoder',
		'Desc' => 'Tired of spam, but you still want to put your email ' . 'address on your web page?  Use this mailto encoder so that ' . 'spambots can not harvest your address, and normal web ' . 'browsers should still be able to see it without any ' . 'problems.  It is basically the same thing that I use at the ' . 'bottom of this page.',
		'URL' => 'mailto_encoder/'
	),
	array(
		'Name' => 'Mindterm SSH',
		'Desc' => 'Forget your SSH client?  Need to log into your server ' . 'and you only have a web browser?  Look no further!  This ' . 'signed Java applet will let you connect to whatever ' . 'host you want and uses SSL for encrypted communications.',
		'URL' => 'ssh/'
	),
	array(
		'Name' => 'Passwords',
		'Desc' => 'Create random passwords, passphrases, and encryption ' . 'keys for your WEP/WAP wireless access point.  Evaluate how ' . 'good your passphrase or password really is with the ' . 'strength test.',
		'URL' => 'password/'
	),
	array(
		'Name' => 'Phone Uploader',
		'Desc' => 'Once geared only for Sprint phones, this software ' . 'has been expanded to work with almost all providers.  ' . 'Use this web site to send ringers, games, ' . 'images, and screensavers to your phone.  Also has some ' . 'technical information about how to set up your own ' . 'uploader.  The source for this uploader is downloadable ' . 'to allow you to get a copy going for your own use.',
		'URL' => 'sprint/'
	),
	array(
		'Name' => 'Population Estimation',
		'Desc' => 'See estimates of populations in various countries ' . 'around the world and watch them get updated!  China is the ' . 'most active, so if you want to see what happens, just head ' . 'straight for that densely populated country.',
		'URL' => 'population/'
	),
	array(
		'Name' => 'TiddlyWiki',
		'Desc' => 'Imagine a whole wiki in just one page.  Javascript ' . 'lets you jump around inside the page and also can let you ' . 'save the changes back to a local file.  This TiddlyWiki ' . 'is my online repository of plugins that were really hard ' . 'to find or that I developed.',
		'URL' => 'tiddlywiki/'
	),
	array(
		'Name' => 'Weeble',
		'Desc' => 'FTP client in PHP.  Useful for editing your web ' . 'pages, uploading files, browsing FTP sites, etc.',
		'URL' => 'weeble/'
	),
);
MakeLinkList($Links);
StandardFooter();
