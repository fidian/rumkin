<?PHP
/* Mobile Phone File Uploader
 *
 * Copyright (C) 2003-2006 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 */


///////////////////////
//                   //
//  GENERAL OPTIONS  //
//                   //
///////////////////////
// These things define how your uploader acts and sets important
// variables that are always used, no matter how the uploader is configured.

// What is the URL to your uploader?  Make sure it has the trailing slash.
$GLOBALS['Uploader Base URL'] = 'http://rumkin.com/tools/phone/';  // Mine
// $GLOBALS['Uploader Base URL'] = 'http://phone.example.com/';  // Example

// To make things run faster, I require at least one writeable directory.
// Please specify a directory where I can write temporary files.
// Include the trailing slash.
$GLOBALS['Uploader Temp Dir'] = getenv('WEBBASE') . 'tools/phone/temp/';

// Your vendor name and what version number you want to send out.
// I suggest that you leave version at 1.0
$GLOBALS['Content Vendor'] = 'Rumkin';
$GLOBALS['Content Version'] = '1.0';


//////////////////////////////
//                          //
//  DATABASE CONFIGURATION  //
//                          //
//////////////////////////////
// Where is your database?  What type of database is it?
// This whole section is ignored if none of the other sections are set
// to use a database.

// What type of database do you have?
// Possible values are:
// * mysql  MySQL
$GLOBALS['Database Type'] = 'mysql';

// Where is the server?  If it is on the same machine, you will typically
// use 'localhost'.
$GLOBALS['Database Server'] = 'localhost';

// What are the username and password to log in?
$GLOBALS['Database User'] = 'rumkin';
$GLOBALS['Database Pass'] = 'MiscLogin';

// Which database in the database server should be used?
$GLOBALS['Database DB'] = 'sprint';


/////////////////////////
//                     //
//  Phone Information  //
//                     //
/////////////////////////
// This section deals with the phone definition list.  It is what tells
// the uploader which particular phone is accessing it and how big each
// phone's screen size is.  The phone information needs constant updating.
// You should either run the update script or update it by hand monthly.
// Failure to do so will mean that newer and updated phones will get
// "Unknown Phone" messages on the jump page (non-critical warning) and
// will not be able to use the automatic image resizing.

// Where is your phone information?
// Possible values are:
// * db     In the database (where you'll likely stick other things)
// * file   Saved as a text file as inc/phones.txt on the server
$GLOBALS['Phone Info Location'] = 'file';


///////////////////////
//                   //
//  Gallery Options  //
//                   //
///////////////////////
// A gallery is a place where you show off your various ringers, wallpapers,
// and programs that you have collected.

// What kind of gallery do you have?
// Possible values are:
// * db     Gallery files & info are stored in the database
// * file   Gallery files & info are stored on filesystem
// * mixed  Gallery files are stored on filesystem, info is in database
// * none   There is no gallery with this uploader
$GLOBALS['Gallery Type'] = 'file';

// If you picked 'file' or 'mixed', where are the files stored?
// Include the trailing slash.  Don't set this to the same path as
// user uploads.
$GLOBALS['Gallery Filebase'] = getenv('WEBBASE') . 'tools/phone/gallery/';

// What is the range of numbers that all gallery entries fit into?
// Just leave it as is unless you need to change it.  Almost 1 million
// gallery entries should be enough for even the largest sites.
$GLOBALS['Gallery Jump Min'] = 1;
$GLOBALS['Gallery Jump Max'] = 999999;


////////////////////
//                //
//  USER UPLOADS  //
//                //
////////////////////
// If you allow visitors to upload files, this section says where the files
// are stored, where the file information is stored, etc.

// Where do you want user uploads to reside?
// Possible values are:
// * db     Uploaded files & info are stored in the database
// * file   Uploaded files & info are stored on filesystem
// * mixed  Uploaded files are stored on filesystem, info is in database
// * none   I do not allow user uploads with this uploader
$GLOBALS['Upload Type'] = 'mixed';

// If you picked 'file' or 'mixed', where are the files stored?
// Include the trailing slash.  Don't set this to the same path as
// the gallery.
$GLOBALS['Gallery Filebase'] = getenv('WEBBASE') . 'tools/phone/upload/';

// When a new file is uploaded, what are the minimum and maximum jump
// code numbers that should be assigned.  The range of nearly 9 million
// jump codes should be adequate for any site.
$GLOBALS['Upload Jump Min'] = 1000000;
$GLOBALS['Upload Jump Max'] = 9999999;


/////////////////////////
//                     //
//  DATABASE CLEANING  //
//                     //
/////////////////////////
// When the clean.php script is executed, it will remove old uploaded files.

// Should the script run automatically?
// It would be best if you could set up the 'clean.php' script to run
// from a crontab entry or some sort of scheduled task.  If that is not
// an option, you can have it run automatically, based on a random chance
// that it should run with every page load.
// Set this to 0 if you intend to run 'clean.php' from a cron job (preferred)
// Setting this to any other number (X) will generate a chance (1/X) that
// any page load will clean the database.  I suggest numbers around 100 for
// very small sites, 500 for larger sites, etc.  You want this setting to be
// approximately the number of hits you get in an hour.
$GLOBALS['Clean Chance'] = 0;  // 0 - don't automatically clean
// $GLOBALS['Clean Chance'] = 1;  // Clean with every page load
// $GLOBALS['Clean Chance'] = 10;  // REALLY small site, personal site
// $GLOBALS['Clean Chance'] = 500;  // For an "average traffic" site.

// How long should uploaded files be kept on the server?
// ['Delete Upload Age'] sets when the file should be deleted after it has
// been uploaded.  It does not matter how often it is downloaded -
// it will be removed after X hours.
// ['Delete Stale Age'] says how long a file can stay on the server if it
// has not been downloaded in a while.
// Setting ['Delete Upload Age'] to 5 days (5 * 24) and ['Delete Stale Age']
// to 3 days (3 * 24) will remove any file that has not been downloaded in 
// the last three days, and will remove all files after they have been on 
// your server for 5 days, regardless of how often they have been downloaded.
// If you don't want to delete old or stale files, set either or both to 0.
$GLOBALS['Delete Upload Age'] = 5 * 24;
$GLOBALS['Delete Stale Age'] = 3 * 24;
