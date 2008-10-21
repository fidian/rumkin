<?php
/*
	Weeble File Manager (c) Christopher Michaels & Jonathan Manna
	This software is released under the BSD License.  For a copy of
	the complete licensing agreement see the LICENSE file.
*/

/*
  User 'tunable' variables are defined in this script.  This is the only file 
  that should need to be edited by the user.
*/

/*************************************************************************
	SERVER SETTINGS
*************************************************************************/

  // Setting this to true will try to establish a passive mode FTP connection.
  $ftp_Passive_Mode = TRUE;
  
/*************************************************************************
	DISPLAY SETTINGS
*************************************************************************/

  // Error message colors for Warning/Info messages.
  $warn_color = array (
    "info" => "#000000",
    "minor" => "#000055", 
    "medium" => "#555599",
    "major" => "#FF0000"
  );

  // Default theme to be loaded
  $default_theme = "Default";
  
  // Set to true to allow users to customize their color scheme
  $allow_custom = TRUE;
  
  // Default setting for hidden file display.
  $def_Display_Hidden = FALSE;

  // Different picture icons for directory listing.
  $icon_display = array (
    "dirup" => "images/dirup.gif", 
    "dir"   => "images/dir.gif", 
    "file"  => "images/generic.gif", 
    "php"   => "images/script.gif",
    "zip"   => "images/transfer.gif",
    "gz"    => "images/transfer.gif",
    "tgz"   => "images/transfer.gif",
    "bz2"   => "images/transfer.gif",
    "mp3"   => "images/sound2.gif",
    "wav"   => "images/sound2.gif",
    "txt"   => "images/text.gif",
    "htm"   => "images/layout.gif",
    "html"  => "images/layout.gif",
    "gif"   => "images/image2.gif",
    "jpg"   => "images/image2.gif",
    "jpeg"  => "images/image2.gif",
    "tif"   => "images/image2.gif",
    "tiff"  => "images/image2.gif",
    "png"   => "images/image2.gif",
    "bmp"   => "images/image2.gif"
  );

  // Weeble File Manager Images
  $logo = "images/Logo-Dark.gif";
  $logo_anim = "images/Logo-Smooth.gif";
  
  // Set editor defaults.
  $editor_prefs = array (
    "rows" => 20, 
    "cols" => 80, 
    "max_size" => 50000,
    "preview_size" => "25%",
    "allow_html" => TRUE,
    "html_ext" => "html htm"
  );

  // This variable allows the admin to choose what columns to display in the file
  // manager and which not to display
  //  owner: owner of the file/dir and the group they are in
  //  date: date and time the file/dir was last modified
  //  size: size of the file/dir
  //  perm: permissions for the file/dir
  $show_col = array(
    "owner" => TRUE,
    "date" => TRUE,
    "size" => TRUE,
    "perm" => TRUE
  );
  
  // allow_chmod when set to TRUE allows users to chmod files and directories,
  // when set to FALSE they will not be able too.
  $allow_chmod = TRUE;

/*************************************************************************
	ENCRYPTION SETTINGS
*************************************************************************/

	// Encryption key used to encrypt ftp passwords.  Please change this!!!
  $key = "encryptKey";
  
  // Preferred MCRYPT encryption ciphers.  See http://www.php.net/manual/en/ref.mcrypt.php
  // for more information on what is available.
  $pref_ciphers = array ("rijndael-256", "tripledes", "blowfish", "des");
  
  // ***WARNING***CAUTION***WET FLOOR***WARNING****
  // DO NOT SET THIS UNLESS ABSOLUTELY NECESSARY!
  // Setting this variable will allow WeebleFM to run w/o mcrypt support.
  //  Be fully aware that passwords will no longer be encrypted and can 
  //  potentially be read by other users whom have access to the web server.
  $ftp_disable_mcrypt = FALSE;
  

/*************************************************************************
	MISC. SETTINGS
*************************************************************************/

  // Maximum number of uploads allowed at one time.
  $ftp_max_uploads = 5;
  
  // Set this to true to enable the Remember Me checkbox.
  $ftp_remember_me = TRUE;
  
  // List of allowed/denied ip addresses.  Prefix allowed with "+" and denied with "-".
  // Format: [+,-]IP/MASK ( e.g. -172.16.0.1/255.255.255.0 )
  // Note: Some versions of php4 choke on "255.255.255.255", in those cases
  //  please use "/32" instead.
  $ftp_access_list = array (
#    "-172.16.10.8/24",
#    "+172.17.45.1/255.255.255.0"
  );

  // Default access setting, if the remote ip doesn't meet any item in the access
  //  list, access will be determined by the setting of this variable.
  $ftp_access = TRUE;
  
  // Configuration for logging of File Manager access
  // dir: directory to store the log file
  // filename: name of log file
  // level: 0 - no logging
  //        1 - login
  //        2 - login, errors
  $log = array(
    "dir" => "/tmp",
    "filename" => "wfm.log",
    "level" => 0
  );
?>
