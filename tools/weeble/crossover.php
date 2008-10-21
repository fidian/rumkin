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

  // If magic_quotes_gpc() is on, strip the C style slashes that were added.
  if ( isset ($EDITOR) && get_magic_quotes_gpc() ) $EDITOR = stripslashes ( $EDITOR );

  // strip apart the value sent from the radio buttons (if one is checked) to 
  //   show where it is a file or dir
  if ( isset($Listing) )
  {
    if ( substr( $Listing, 0, 1) == "D" )
      $DIR = substr( $Listing, 1 );
    else
      $FILE = substr( $Listing, 1 );
  }
  
  // if a file is in the URL, decode the filename 
  if (isset($FILE)) $FILE = urldecode($FILE);

  // determine the action to proceed with 
  switch ( $submit )
  {
    // Changing Directories
    case "CD":
      // test to see if the user changed the directory
      if ( isset ($CHDIR) )
      {
        // decode the dir to change to, and change to it
        $CHDIR = urldecode ($CHDIR);
        $RESULT = @ftp_chdir( $fp, $CHDIR );
        // if it succeeds, store the current dir into the session data
        if ( $RESULT )
          $sess_Data["dir"] = ftp_pwd( $fp );
        // else display an error
        else
        {
          $sess_Data["warn"] = "Permission denied: ". $CHDIR;
          $sess_Data["level"] = "major";

				  // log error if set too
				  if ( $log["level"] > 1 )
  					log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: CHDIR to " . $CHDIR . "\n" );
        }
      }
      break;
    // Changing permissions on a file or dir
    case "CHMOD":
			if ( $allow_chmod )
			{
	      // determine the chmod value 
  	    $perm = perm_value( $PERM );
	      $change = chmod_value( $CHMOD );
  	    $chmod = $perm + $change;
    	  // log into ftp server, change to dir, and chmod the file
	      $result = @ftp_site( $fp, "chmod ".$chmod." ".$FILE );
				if ( $result )
    	  {
      		$sess_Data["warn"] = "Successful permission change of " . $FILE;
        	$sess_Data["level"] = "info";
				}
  	    else
    	  {
      	  $sess_Data["warn"] = "Permission denied on chmod of " . $FILE;
        	$sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
  					log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: CHMOD of " . $FILE . "\n" );
				}
      }
      else
   	  {
     	  $sess_Data["warn"] = "Permission denied: Chmod is not available. Contact system administration.";
       	$sess_Data["level"] = "major";
			}
                  
      break;
    // Create a file or directory
    case "Create":
       // if a type (file or dir) was selected, should never fail
      if ( isset( $CREATE ))
      {
         // switch to the appropriate dir
         // if creating a file
         if ( $CREATE == "File" )
         {
          // if a new file name is given
           if ( trim($CREATE_NAME) != "" ) 
          {
            // set the target location to the edit box with the newfile value set to true
            $location = "Location: edit.php?SID=$SID";
            $location = $location . "&NEWFILE=TRUE";
            $filename = $CREATE_NAME;
          } 
          // else give error
          else 
          {
            $sess_Data["warn"] = "Error: No name given.";
            $sess_Data["level"] = "medium";
          }  
         }
         // else creating a directory
         else
         {
          // if a name to call the dir was specified
          if ( trim($CREATE_NAME) != "" )
          {
             // make the directory and see if it was successful
             $result = @ftp_mkdir( $fp, trim($CREATE_NAME) );
            if ( !$result )
            {
              // fails if dir already exists or no write perm
              $sess_Data["warn"] = "Error: Could not make directory " . trim($CREATE_NAME);
              $sess_Data["level"] = "major";

							// log error if set too
							if ( $log["level"] > 1 )
  							log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: MKDIR of " . $CREATE_NAME . "\n" );
            }
            else
            {
              // notify user of directory creation
              $sess_Data["warn"] = "Directory \"". trim($CREATE_NAME) . "\" successfully created.";
              $sess_Data["level"] = "info";
            }
          }
          // else give a message no dir name was given
          else
          {
            $sess_Data["warn"] = "Error: No name given.";
            $sess_Data["level"] = "medium";
          }     
         }
      }
      // should never happen, File is selected by default
      else
      {
      	$sess_Data["warn"] = "Error: No type selected.";
        $sess_Data["level"] = "medium";
      }
      break;
    // Deleting a file or directory 
    case "Delete":
      // if deleting a file
      if ( isset( $FILE ))
      {
        // change to proper ftp dir
        $result = @ftp_delete( $fp, $FILE );
        // if you don't have permission to delete the file
        if ( !$result )
        {
          $sess_Data["warn"] = "Permission denied: ". $sess_Data["dir"] ."/". $FILE;
          $sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
  					log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: DELETE of " . $FILE . "\n" );
        }
        // else notify user of file deletion
        else
        {
          $sess_Data["warn"] = "File \"". $FILE . "\" successfully deleted.";
          $sess_Data["level"] = "info";
        }
      }
      // else if deleting a dir
      else if ( isset( $DIR ))
      {
        // change to proper ftp dir
        $result = @ftp_rmdir( $fp, $DIR );
        // if you don't have permission, notify user
        if ( !$result )
        {
          $sess_Data["warn"] = "Permission denied: ". $sess_Data["dir"] ."/". $DIR;
          $sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
						log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: DELETE of " . $DIR . "\n" );
        }
        // else notify user of success
        else
        {
          $sess_Data["warn"] = "Directory \"". $DIR . "\" successfully deleted.";
          $sess_Data["level"] = "info";
        }
      }
      // else no file was selected
      else
      {
        $sess_Data["warn"] = "Error: No file/dir selected.";
        $sess_Data["level"] = "medium";
      }
      break;
    // Rename a file or directory
    case "Rename":
      // if renaming a file
      if ( isset( $FILE ))
         $name = $FILE;
      // else if renaming a dir
      else if ( isset( $DIR ))
         $name = $DIR;

      // if a file or dir was selected
      if ( isset( $name ))
      {
        // if a new name was specified to rename too
        if ( $REN_DEST != "" )
        {
          // change to correct ftp dir
          $result = @ftp_rename( $fp, $name, $REN_DEST );
          // if you don't have permission to rename the file/dir
          if ( !$result )
          {
            $sess_Data["warn"] = "Permission denied: ". $sess_Data["dir"] ."/". $name;
            $sess_Data["level"] = "major";

						// log error if set too
						if ( $log["level"] > 1 )
 							log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: RENAME of " . $DIR . "\n" );
          }  
          // else notify user of success
          else
          {
            if ( isset( $FILE ))
               $sess_Data["warn"] = "File \"". $name . "\" successfully renamed to \"" . $REN_DEST ."\".";
             else
               $sess_Data["warn"] = "Directory \"". $name . "\" successfully renamed to \"" . $REN_DEST ."\".";
        
             $sess_Data["level"] = "info";
          }
        }
        // else no name was specified to name too
        else
        {
          $sess_Data["warn"] = "Error: No name given.";
          $sess_Data["level"] = "medium";
        }
      }
      // else no file/dir was selected
      else
      {
        $sess_Data["warn"] = "Error: No file/dir selected.";
        $sess_Data["level"] = "medium";
      }
      break;
    // Move a file or dir  
    case "Move":
      // if its a file being moved
      if ( isset($FILE) ) 
        $sess_Data["move_old"] = $FILE;
      // if its a directory being moved
      elseif ( isset($DIR) )
        $sess_Data["move_old"] = $DIR;

      // if a file or dir was selected, save the old name
      if ( isset( $sess_Data["move_old"]) )
      {
        $sess_Data["move_path"] = $sess_Data["dir"];
        $sess_Data["warn"] = "Please select the destination directory...";
        $sess_Data["level"] = "info";
      }
      // else display warning
      else
      {
        $sess_Data["warn"] = "Error: No file/directory selected to be moved.";
        $sess_Data["level"] = "medium";
      }    
      break;
    // Copy a file
    case "Copy":
      // make sure a file is being copied
      if ( isset($FILE) ) 
      {
        $sess_Data["copy_old"] = $FILE;
        $sess_Data["copy_path"] = $sess_Data["dir"];
        $sess_Data["warn"] = "Please select the destination directory...";
        $sess_Data["level"] = "info";
      }
      // else display warning
      else
      {
        $sess_Data["warn"] = "Error: No file selected to be copied.";
        $sess_Data["level"] = "medium";
      }
      break;      
    // Commit move change from old to new
    case "Commit":
      // if using this button for commiting a move
      if ( isset( $sess_Data["move_path"] ) )
      {
        $old = $sess_Data["move_path"] . "/" . $sess_Data["move_old"];
        $new = $sess_Data["dir"] . "/" . $sess_Data["move_old"];
    
        $result = @ftp_rename( $fp, $old, $new );
        // if you don't have permission to move the file/dir
        if ( !$result )
        {
          $sess_Data["warn"] = "Permission denied: Cannot move \"" . $old . "\" to \"" . $new . "\".";
          $sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
  					log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: MOVE of " . $old . "\n" );
        }  
        // else notify user of success
        else
        {
           $sess_Data["warn"] = "Successfully moved \"" . $old . "\" to \"" . $new . "\".";
           $sess_Data["level"] = "info";
        } 
      }
      // else using this button for a copy 
      else
      {
        $old = $sess_Data["copy_path"] . "/" . $sess_Data["copy_old"];
        $new = $sess_Data["dir"] . "/" . $sess_Data["copy_old"];

        $result = ftp_copy( $fp, $sess_Data["copy_path"], $sess_Data["dir"], $sess_Data["copy_old"]);
        if ( !$result )
        {
          $sess_Data["warn"] = "Permission denied: Cannot copy \"" . $old . "\" to \"" . $new . "\".";
          $sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
						log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Permission Denied: COPY of " . $old . "\n" );
        }  
        // else notify user of success
        else
        {
           $sess_Data["warn"] = "Successfully copy \"" . $old . "\" to \"" . $new . "\".";
           $sess_Data["level"] = "info";
        }
      }
            
      unset( $sess_Data["copy_path"] );
      unset( $sess_Data["copy_old"] );
      unset( $sess_Data["move_path"] );
      unset( $sess_Data["move_old"] );
      break;
    // Download a file
    case "DOWNLOAD":
      // create a temp file to use with downloading
      $tp = tmpfile ();
      // get file as the tempfile created
      $result = @ftp_fget ( $fp, $tp, $sess_Data["dir"]."/".$FILE, FTP_BINARY);
        
      // if the server sucessfully got the file
      if ( $result )
      {
        header( "Content-Disposition: inline; filename=$FILE\n\n");
        header ( "Content-type: applicatation/download; name=\"$FILE\"\n\n" );
        rewind ( $tp );
        fpassthru ( $tp );
        die ();
      }
      // else warn user of failure
      else
      {
        $sess_Data["warn"] = "Error: File \"$FILE\" could not be downloaded.";
        $sess_Data["level"] = "major";

				// log error if set too
				if ( $log["level"] > 1 )
					log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - FAILED: DOWNLOAD of " . $FILE . "\n" );
      }
      break;
    // Upload a file
    case "Upload":
      // If no uploaded file is specified, redirect to the multi-upload page.
      if ( isset ($HTTP_POST_FILES["UPLOAD_FILE_0"]) && ($HTTP_POST_FILES["UPLOAD_FILE_0"]["name"] == "") ) {
        $location = "Location: upload.php?SID=$SID";
        header ( $location . "\n\n");
        exit;
      } 

      // change to proper dir on the ftp server
      // Clear warn variable.
      $sess_Data["warn"] = "";
      $sess_Data["level"] = "minor";
      // Try and save each uploaded file from the multi-upload page.
      for ( $x=0; $x <= $ftp_max_uploads; $x++ ) {
        $iName = "UPLOAD_FILE_".$x;
        if (isset ($HTTP_POST_FILES[$iName])) {
          if ($HTTP_POST_FILES[$iName]["name"] == "") {
            // Do nothing if the name is not set.  This should handle empty upload fields.
          } elseif ($HTTP_POST_FILES[$iName]["size"] == 0) {
            $sess_Data["warn"] .= "Warning: Error uploading ". $HTTP_POST_FILES[$iName]["name"] .".  May have exceeded size requirements.<br>\n";
          } elseif (!is_uploaded_file($HTTP_POST_FILES[$iName]["tmp_name"])) {
            $sess_Data["warn"] .= "Error: An error has occurred uploading ". $HTTP_POST_FILES[$iName]["name"] .".  Please contact your the administrator.<br>\n";
          } else {
            $result = @ftp_put( $fp, $HTTP_POST_FILES[$iName]["name"], $HTTP_POST_FILES[$iName]["tmp_name"], FTP_BINARY );
            if ( $result ) {
              $sess_Data["warn"] .= "Info: File \"" . $HTTP_POST_FILES[$iName]["name"] . "\" successfully uploaded.<br>\n";
            } else {
              $sess_Data["warn"] .= "Error: Unable to upload file " . $HTTP_POST_FILES[$iName]["name"] . ".  Please check your permissions and try again.<br>\n";
            }
          }
        }
      }
      break;
    // logout
    case "LOGOUT":
      // delete the session and redirect to the login screen
      session_destroy ();
      header ( "Location: login.php\n\n" );
      die ();
      break;        
    // Show/Hide hidden files
    case "Hide":
    case "Show":
      // if hiding hidden files, display them
      // else hide hidden files
      if ($personal["show_hidden"])
        $personal["show_hidden"] = FALSE;
      else 
        $personal["show_hidden"] = TRUE;
      break;
    // Edit a selected file
    case "Edit":
    // if file was selected, redirect to edit page with filename specified
      if ( isset ($FILE) ) 
      {
        $location = "Location: edit.php?SID=$SID";
        $filename = $FILE;
      } 
      // else display warning
      else 
      {
        $sess_Data["warn"] = "Error: No file was selected.";
        $sess_Data["level"] = "medium";
      }
      break;
    // Save the edit changes
    case "Preview":
      $location = "Location: edit-preview.php?SID=$SID";
      $filename = $FILE;
      $prevFILE = ".#".$FILE.".tmp";

      // if all is ok, attempt to save changes to file
      if ( isset($EDITOR) && isset ($FILE) ) 
      {
        $tp = tmpfile ();
        fwrite ($tp, $EDITOR);
        rewind ($tp);
        $result = @ftp_fput( $fp, $prevFILE, $tp, FTP_BINARY );
        fclose ($tp);

        // if changes get saved, notify user
        if ( $result ) 
        {
          $sess_Data["warn"] = "Info: Previewing \"".$FILE."\".  Click Save to keep the changes.";
          $sess_Data["level"] = "info";
        } 
        // else warn of failure
        else
        {
          $sess_Data["warn"] = "Error: Unable to save the temp file.  Preview unavailable.";
          $sess_Data["level"] = "major";
          
					// log error if set too
					if ( $log["level"] > 1 )
						log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Failed: PREVIEW of " . $FILE . "\n" );
        }
      } 
      else 
      {
        $sess_Data["warn"] = "Error: No filename and/or editor content specified.";
        $sess_Data["level"] = "medium";
      }
      break;
    case "Save & Edit":
      $location = "Location: edit.php?SID=$SID";
      $filename = $FILE;
    // Save and return to the editor.
    case "Save":
      // change to proper ftp dir
      // if all is ok, attempt to save changes to file
      if ( isset($EDITOR) && isset ($FILE) ) 
      {
        $tp = tmpfile ();
        fwrite ($tp, $EDITOR);
        rewind ($tp);
        $result = @ftp_fput( $fp, $FILE, $tp, FTP_BINARY );
        fclose ($tp);

        // Delete preview tmp file if it exists.
        $prevFILE = ".#".$FILE.".tmp";
        @ftp_delete ( $fp, $prevFILE );

        // if changes get saved, notify user
        if ( $result ) 
        {
          $sess_Data["warn"] = "Info: File \"" . $FILE . "\" successfully saved.";
          $sess_Data["level"] = "info";
        } 
        // else warn of failure
        else 
        {
          $sess_Data["warn"] = "Error: Unable to save file " . $FILE . ".  Please check your permissions and try again.";
          $sess_Data["level"] = "major";

					// log error if set too
					if ( $log["level"] > 1 )
						log_message( $log, $sess_Data["user"] . "/" . $REMOTE_ADDR . " - Failed: SAVE of " . $FILE . "\n" );
        }
      } 
      else 
      {
        $sess_Data["warn"] = "Error: No filename and/or editor content specified.";
        $sess_Data["level"] = "medium";
      }
      break;
    // don't save edit changes or don't move file/dir
    case "Cancel":
      unset( $sess_Data["copy_path"] );
      unset( $sess_Data["copy_old"] );      
      unset( $sess_Data["move_path"] );
      unset( $sess_Data["move_old"] );

      // Delete preview tmp file if it exists.
      if ( isset ($EDITOR) && isset ($FILE) ) {
        $prevFILE = ".#".$FILE.".tmp";
        @ftp_delete ( $fp, $prevFILE );
      }
      break;
    default:
      break;
    }

    // Redirect the browser to the appropriate page.
    if ( !isset ($location) ) $location = "Location: ftp.php?SID=$SID";
    if ( isset ($filename) ) $location .= "&Filename=".rawurlencode ($filename);
    if ( isset ($result) ) $location .= "&result=$result";
    header ( $location . "\n\n");
?>
