<?php
/* -*- php -*-
 * / * Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 * /
 * / * This file contains all of the settings for the uploader script.  If you
 * are worried about security, it would be best to set the permissions
 * on this script and the owner information so that only the web server can
 * read it.  You can also move the file to a different directory and edit
 * common.inc to reflect the new path.
 * 
 * Copy this file to config.php and edit it.  This config-dist.php file is
 * just the distribution version of the config.php file.
 * /
 * The database server to use, the username and password to log into the
 * server with, the database in the server that has the table, and the
 * name of the table in the database. */
$GLOBALS['Database Server'] = 'localhost';
$GLOBALS['Database User'] = 'XXX';
$GLOBALS['Database Password'] = 'XXX';
$GLOBALS['Database Database'] = 'sprint';
$GLOBALS['File Table'] = 'File';
$GLOBALS['FileDesc Table'] = 'FileDesc';
$GLOBALS['FileCategory Table'] = 'FileCategory';  // Gallery-DB
$GLOBALS['Category Table'] = 'Category';  // Gallery-DB
$GLOBALS['FileThumb Table'] = 'FileThumb';
$GLOBALS['Phones Table'] = 'Phones';


/* Maximum file size that can be uploaded and the maximum file size for the
 * description file that can be uploaded */
$GLOBALS['Max File Size'] = 6000000;
$GLOBALS['Max Desc Size'] = 10000;


/* Maximum length of the name for the file that is uploaded, the maximum
 * length of the description file name, maximum length for a folder name
 * for midlets */
$GLOBALS['Max Name Length'] = 40;
$GLOBALS['Max Desc Length'] = 250;
$GLOBALS['Max Folder Length'] = 40;


// Information for generated description files
$GLOBALS['Content Vendor'] = 'Rumkin.com Upload';
$GLOBALS['Content Version'] = '1.0';


/* Should I allow sending email messages to any address or just the
 * providers listed in provider.inc? */
$GLOBALS['Only Provider Emails'] = 1;


/* 0 or 1
 * Should I send SMS messages through Sprint's web site or use email? */
$GLOBALS['Use Sprint Website'] = 0;


/* 0 or 1
 * When sending an email to a phone (for SMS), what address should
 * I say is sending the email? */
$GLOBALS['Mail From'] = 'nobody@your.host.name.com';


/* Where the scripts are (required for the links that are sent to Sprint
 * phones)  Include the slash at the end. */
$GLOBALS['URL Base'] = 'http://rumkin.com/tools/sprint/';


/* Database cleaning
 * Number of days to let a file stay in the database if it has not
 * been marked as Seen (Seen = 0) and if it is not a Gallery
 * Suggestion */
$GLOBALS['Delete If Not Seen'] = 1;


/* Number of days to let a file stay in the database if it is not
 * in a gallery (for removing those 'seen' items)
 * Used for the Gallery-DB */
$GLOBALS['Delete If Not In Gallery'] = 1;


/* Number of days to let a file stay on the server in a gallery if it
 * does not get any downloads
 * Used for both Gallery-DB and Gallery-File, but Gallery-File will
 * automatically recreate it if it still exists on the server. */
$GLOBALS['Delete If Stale'] = 90;


/* Should I optimize the tables when I clean the database?
 * 0 = no, 1 = yes */
$GLOBALS['Optimize Tables'] = 0;


/* For automatic cleaning, every 1 in X page hits will generate a
 * cleaning request.  Set this to 0 if you can run php4-cgi in a cron
 * job every hour or something. */
$GLOBALS['AutoClean Chance'] = 500;


/* Listing Files
 * Rows per page, columns in the table */
$GLOBALS['List Rows'] = 15;
$GLOBALS['List Cols'] = 4;


/* Describes every type of file handled by the uploader
 * [index] => array(ext, mime, desc, group)
 * index = the index of the file type -- do not change
 * ext = file extension as a string or in an array -- array('mid', 'midi')
 * mime = mime type for the file
 * desc = description for the FAQ page
 * group = (0 => unknown/misc, 1 => image, 2 => ringer/audio) */
$GLOBALS['File Types'] = array(
	0 => array(
		'*',
		'application/octet-stream',
		'The default MIME type',
		0
	),
	1 => array(
		'gcd',
		'text/x-pcs-gcd',
		'Sprint PCS GCD files',
		0
	),
	2 => array(
		'qcp',
		'audio/vnd.qcelp',
		'Compressed audio',
		2
	),
	3 => array(
		'jad',
		'text/vnd.sun.j2me.app-descriptor',
		'Java midlet descriptor',
		0
	),
	4 => array(
		'jar',
		'application/java-archive',
		'Java midlet; may alternatively be application/x-java-archive',
		0
	),
	5 => array(
		'wbmp',
		'image/vnd.wap.wbmp',
		'Wireless bitmap -- not a Windows bitmap',
		1
	),
	6 => array(
		array(
			'jpg',
			'jpe',
			'jpeg'
		),
		'image/jpeg',
		'JPEG compressed image',
		1
	),
	7 => array(
		'png',
		'image/png',
		'PNG compressed image',
		1
	),
	8 => array(
		'pmd',
		'application/x-pmd',
		'Animation',
		0
	),
	9 => array(
		array(
			'mid',
			'midi'
		),
		'audio/midi',
		'MIDI sound sequence',
		2
	),
	10 => array(
		'txt',
		'text/plain',
		'Text files',
		0
	),
	11 => array(
		'gif',
		'image/gif',
		'GIF compressed image',
		1
	),
	12 => array(
		'mp3',
		'audio/mp3',
		'MP3 File',
		2
	),
	13 => array(
		'mmf',
		'application/vnd.smaf',
		'MMF Audio File',
		2
	),
	14 => array(
		'mp4',
		'video/mp4',
		'MP4 Video',
		0
	),
	15 => array(
		'm4a',
		'audio/mp4',
		'M4A Audio',
		2
	),
	16 => array(
		'amr',
		'audio/3gpp',
		'AMR Audio',
		2
	),
	17 => array(
		array(
			'3gp',
			'3gpp'
		),
		'video/3gpp',
		'3GP Audio/Video/Text',
		0
	),
	18 => array(
		'wma',
		'audio/x-ms-wma',
		'WMA Audio',
		2
	),
	19 => array(
		'wav',
		'audio/x-wav',
		'WAV Audio',
		2
	),
	20 => array(
		'cab',
		'application/octet-stream',
		'CAB files',
		0
	),
	21 => array(
		'aac',
		'audio/x-aac',
		'AAC Audio',
		2
	),
	22 => array(
		'bar',
		'x-pcs/theme',
		'Sprint PCS Theme',
		0
	),
	23 => array(
		array(
			'3g2',
			'3gpp2'
		),
		'video/3gpp2',
		'3GP2 Audio/Video/Text',
		0
	),
);
define('FILE_TYPE_JAD', 3);
define('FILE_TYPE_GCD', 1);
define('FILE_TYPE_QCP', 2);
define('FILE_TYPE_JAR', 4);
define('FILE_TYPE_WBMP', 5);
define('FILE_TYPE_JPG', 6);
define('FILE_TYPE_PNG', 7);
define('FILE_TYPE_PMD', 8);
define('FILE_TYPE_MID', 9);
define('FILE_TYPE_TXT', 10);
define('FILE_TYPE_GIF', 11);
define('FILE_TYPE_MP3', 12);
define('FILE_TYPE_MP4', 14);


/* Add people here who are able to log into restricted pages.
 * Two example lines are below, but commented out.  Enter in the plain
 * text password of the user or the MD5 hash of the password as shown.
 * Comment this whole thing out if you don't intend to use the
 * authentication method that comes with the uploader */
$GLOBALS['Logins'] = array(
	
	
	/* 'username' => md5('plain_text_passphrase'),
	 * 'username' => '00112233445566778899AABBCCDDEEFF', */
	'fidian' => md5('fid'),
);


/* Emails are sent to this person in newphone.php and dl.php for unknown
 * phones.  Leave it commented out to not get emails.
 * 
 * $GLOBALS['Admin Email'] = 'user@host.name';
 * Restrict files uploaded to this regular expression
 * Uncomment these lines to not restrict by file type */
$GLOBALS['File Match'] = '/\\.(3gpp?|3g2|3gpp2|aac|bar|cab|gcd|qcp|wbmp|jpg|jpeg?|png|pmd|midi?|gif|mp[34]|mmf|m4a|amr|wma|wav)$/i';
$GLOBALS['File Match Message'] = 'You can only upload files of these types:  3gp, 3g2, aac, amr, bar, cab, gif, jpg, jpeg, gcd, m4a, mid, midi, mmf, mp3, mp4, pmd, png, qcp, wav, wbmp, wma';
$GLOBALS['Jar Match'] = '/\\.jar$/i';
$GLOBALS['Jar Match Message'] = 'Only .jar files can be used in the JAR ' . 'section.';


/* Galleries
 * There are two types of galleries. ... well, not yet.  Working on it.
 * 
 * Gallery-DB
 *   Files are stored in the database, really awkward to use.
 * Gallery-File
 *   Files are stored in directories with a text-based description table.
 * 
 * Allow gallery submisisons
 * Used for Gallery-DB */
$GLOBALS['Gallery Submissions'] = false;


/* Where are the gallery files stored?  Include trailing slash.  Can be a
 * relative directory.
 * Used for Gallery-File */
$GLOBALS['Gallery Directory'] = 'gallery/';


/* Which gallery system to use.
 * '' = None
 * 'DB' = Gallery-DB
 * 'File' = Gallery-File */
$GLOBALS['Gallery Type'] = 'DB';


// Where to get phoneinfo.php updates from
$GLOBALS['Phone Data URL'] = 'http://rumkin.com/tools/sprint/phonedata.php';


/* Where to create temporary files
 * Called like this:  $fn = tempnam($GLOBALS['Temp Files'], 'sprint') */
$GLOBALS['Temp Dir'] = '/tmp';


/* Who should not get text messages?
 * An array of numbers only.  Scanned against the phone numbers for direct
 * messaging and the username on emails. */
$GLOBALS['Ban Phone'] = array(
	'911',
	'1112223333'
);
