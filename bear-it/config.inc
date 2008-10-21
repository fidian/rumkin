<?PHP //  -*- php -*-

// Site-specific settings.
// Configure these for your site.
// You shouldn't need to modify anything outside of this file to get
// the photo album to work.
//
// When done, rename to config.inc
//
////////////////////////////////////////////////////////////////////////////


// The name of the photo album, and the beginning comments
$album_title = 'Charlotte\'s Smokey Shop';
$album_comment = 'If you are interested in any of the item you see, or if ' .
  'you have any questions please contact me at csmokey@rumkin.com or ' .
  'call Charlotte at 651-459-4730.' .
  "\n\n" .
  'I am selling these items to Hot Foot Teddy members only.  Sorry, ' .
  'but I do not accept credit cards or PayPal.';
$album_root = 'Main Index';

// The version of the software
$program_name = "PhotoArchive v2.0b";
$program_url = "http://www.crocodile.org/software.html";

// Database settings
// db_type should be one of: "mysql", "oracle", "postgresql", "odbc"
// See php-dbi.inc for a bit more info
// MySQL example
$db_type     = "mysql";
$db_host     = "localhost";
$db_login    = "photoarchive";
$db_password = "photoarchive";
$db_database = "csmokey";

// Thumbnail generation
$thumbnails_per_row  = 3;
$thumbnail_max_width = 180; // measured in pixels
$thumbnail_max_height = $thumbnail_max_width / (4/3); // measured in pixels
    // Using the formula "width / (4/3)" maintains the same aspect ratio
    // as monitors, televisions, etc.
$thumbnail_quality = 50; // A number between 1 and 100, with 1 looking really
    // bad, but being really small and 100 being near-pefect, but larger and
    // it would take longer to generate.  A low number (50-65) is suggested
    // because this is just a thumbnail.
$thumbnail_size_time = '2007-01-26 03:00:00'; // When the max_width, quality,
    // or max_height was last modified.  Used to determine if a new thumbnail
    // image should be generated or now.  Only update this date if you
    // change the max_width, max_height, or quality settings.  GMT
    

$temp_dir = '/tmp';  // Where to save temporary files
$max_file_size       = 1024*1024; // 1 Mb
$max_search_results  = 32 ;
$top_number          = 20;	# The number of pictures to show in 
                                # the "Top X" section (ie. Top 10, Top 25)

// Admin password to log into the photo album
$admin_password = "Munchkin";

// How long (in seconds) should I wait before I log out an inactive user
// (Note:  This is HTML-only.  It doesn't affect sessions.  I merely
// say for the browser to refresh to the logout page if this many seconds
// pass without the user going to a new page.)
$login_timeout = 900;  // 15 minutes


// How many pictures should be displayed in the "Top X" page?
$top_picture_count = 30;

// How many pictures should be displayed in the "Most Recent X" page?
$most_recent_count = 30;

// An image is "big" when its dimensions are larger than ...
$big_image_w = 800;  // In pixels
$big_image_h = 600;  // Should show up fine