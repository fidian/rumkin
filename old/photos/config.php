<?php
/*  -*- php -*-
 * Site-specific settings.
 * Configure these for your site.
 * You shouldn't need to modify anything outside of this file to get
 * the photo album to work.
 * 
 * When done, rename to config.inc
 * 
 * //////////////////////////////////////////////////////////////////////////
 * The name of the photo album, and the beginning comments */
$GLOBALS['album_title'] = 'Tyler and Sarah\'s Photo Album';
$GLOBALS['album_comment'] = 'Welcome to our photo album!  We hope that you enjoy your ' . 'stay!';
$GLOBALS['album_root'] = 'Main Index';


// The version of the software
$GLOBALS['program_name'] = 'PhotoArchive v2.0b';
$GLOBALS['program_url'] = 'http://www.crocodile.org/software.html';


/* Database settings
 * db_type should be one of: "mysql", "oracle", "postgresql", "odbc"
 * See php-dbi.inc for a bit more info
 * MySQL example */
$GLOBALS['db_type'] = 'mysql';
$GLOBALS['db_host'] = 'localhost';
$GLOBALS['db_login'] = 'photoarchive';
$GLOBALS['db_password'] = 'photoarchive';
$GLOBALS['db_database'] = 'photos';


// File paths, can be relative to main photos installation directory
$path_base = getenv('MEDIABASE') . 'photos/';
$GLOBALS['image_path'] = $path_base . 'img/';
$GLOBALS['small_image_path'] = $path_base . 'img_small/';
$GLOBALS['thumb_image_path'] = $path_base . 'img_thumb/';


// Thumbnail generation
$GLOBALS['thumbnails_per_row'] = 3;
$GLOBALS['thumbnail_max_width'] = 180;  // measured in pixels
$GLOBALS['thumbnail_max_height'] = $GLOBALS['thumbnail_max_width'] / (4 / 3);


/* measured in pixels
 * Using the formula "width / (4/3)" maintains the same aspect ratio
 * as monitors, televisions, etc. */
$GLOBALS['thumbnail_quality'] = 50;


/* A number between 1 and 100, with 1 looking really
 * bad, but being really small and 100 being near-pefect, but larger and
 * it would take longer to generate.  A low number (50-65) is suggested
 * because this is just a thumbnail. */
$GLOBALS['temp_dir'] = '/tmp';  // Where to save temporary files
$GLOBALS['max_file_size'] = 4 * 1024 * 1024;  // 4 Mb
$GLOBALS['max_search_results'] = 32;
$GLOBALS['max_orphan_results'] = 200;
$GLOBALS['top_number'] = 20;


/* The number of pictures to show in
 * the "Top X" section (ie. Top 10, Top 25)
 * Admin password to log into the photo album */
$GLOBALS['admin_password'] = 'Munchkin';


/* How long (in seconds) should I wait before I log out an inactive user
 * (Note:  This is HTML-only.  It doesn't affect sessions.  I merely
 * say for the browser to refresh to the logout page if this many seconds
 * pass without the user going to a new page.) */
$GLOBALS['login_timeout'] = 900;


/* 15 minutes
 * How many pictures should be displayed in the "Top X" page? */
$GLOBALS['top_picture_count'] = 30;


// How many pictures should be displayed in the "Most Recent X" page?
$GLOBALS['most_recent_count'] = 30;


// An image is "big" when its dimensions are larger than ...
$GLOBALS['big_image_w'] = 800;  // In pixels
$GLOBALS['big_image_h'] = 600;


/* Should show up fine
 * Allowable files */
$GLOBALS['ext_to_mime'] = array(
	'jpg' => 'image/jpeg',
);
$GLOBALS['mime_to_ext'] = array(
	'image/jpeg' => 'jpg',
);
