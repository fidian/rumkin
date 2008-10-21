<?php
/*
  Weeble File Manager (c) Christopher Michaels & Jonathan Manna
  This software is released under the BSD License.  For a copy of
  the complete licensing agreement see the LICENSE file.
*/

  // load needed files
  require_once ("settings.php");
  require_once ("tools/compat.php");
  require_once ("functions-ftp.php");
  require_once ("header.php");

  // check to see if someone is tryingto access the preferences when allow_custom 
  // is turned off by the administrator
  if ( !($allow_custom) )
  {
    $sess_Data["warn"] = "Permission denied: Administrator has \$allow_cutom off";
    $sess_Data["level"] = "major";
    header( "Location: ftp.php?SID=$SID\n\n" );
    exit;
  }

  // determine the action to proceed with 
  switch ( $submit )
  {
    case "Save":
    case "Preview":      
      reset($pref);
      
      // if the user made personal changes to the theme
      if ( $personal["theme"] != "personal" && same_themes( $pref, $personal["theme"] ) == FALSE)
        $personal["theme"] = "personal";
        
      // grab the first setting
      $item = each($pref);

      // while there are still settings to be saved
      while ( $item )
      {
      	// check to see if the string should be converted to an int
        if ( strpos( $numeric_val, strtolower(trim($item["key"]))))
        	$item["value"] = intval( $item["value"] );
         
        // if they are theme variables
        if ( substr( strtolower(trim($item["key"])), 0, 4) == "thm_" )
        {
          // if the item value isn't empty or its allowed to be empty save the setting 
          if ( trim($item["value"]) != ""  || strpos( $allow_empty, strtolower(trim($item["key"])) ))
            $theme[strtolower(trim($item["key"]))] = trim($item["value"]);
        }
        else
        {
          // if the item value isn't empty or its allowed to be empty save the setting 
          if ( trim($item["value"]) != ""  || strpos( $allow_empty, strtolower(trim($item["key"])) ))
          {
          	// if saving the radio button state for showing hidden files or not
          	if ( strtolower(trim($item["key"])) == "show_hidden" )
						{
            	if ( trim($item["value"]) == "hide" )
              	$personal[strtolower(trim($item["key"]))] = FALSE;
              else
              	$personal[strtolower(trim($item["key"]))] = TRUE;
            }
            // if the value being saved is the preview size, take the numeric 
            // and add a % if needed
          	else if ( strtolower(trim($item["key"])) == "prev_size" )
						{
							$personal[strtolower(trim($item["key"]))] = trim($item["value"]) . $PREV_TYPE;
            }
          	else
	            $personal[strtolower(trim($item["key"]))] = trim($item["value"]);
					}
        }

        // grab the next setting
        $item = each($pref);
      }

      if ( $submit == "Preview" )
      {
        $location = "Location: preferences.php?SID=$SID";
        $sess_Data["warn"] = "Info: Changes not saved until you hit \"Save\". \"Cancel\" will load last saved settings.";
        $sess_Data["level"] = "info";
      }
      else
      {
				// go back to the users home dir to save the file
      	@ftp_chdir( $fp, $home_Dir );
        // save the theme to the users .wfmrc file
        save_settings( $fp, $personal, $theme );
      }
      break;
    case "Cancel":
      $location = "Location: ftp.php?SID=$SID";
      break;
    case "Load Theme":
      // if not loading the personal theme
      if ( $theme_select != "personal" )
      {
        $tp = fopen( "themes/" . $theme_select . ".thm", 'r' );

        // grab the theme
        $theme = load_theme( $tp );
        $personal["theme"] = $theme_select;
      
        // close the file
        fclose ($tp);
      }
      else
      {
        $theme = load_personal( $personal );
        $personal["theme"] = $theme_select;
      }
      
      $sess_Data["warn"] = "Info: Theme loaded. Changes not saved permanently until you hit \"Save\".";
      $sess_Data["level"] = "info";
      $location = "Location: preferences.php?SID=$SID";
  }

  // Redirect the browser to the appropriate page.
  if ( !isset ($location) ) $location = "Location: ftp.php?SID=$SID";
  header ( $location . "\n\n");
?>
