<?php
/*
  Weeble File Manager (c) Christopher Michaels & Jonathan Manna
  This software is released under the BSD License.  For a copy of
  the complete licensing agreement see the LICENSE file.
*/

  require_once ("settings.php");
  require_once ("tools/compat.php");
  require_once ("functions-ftp.php");
  require_once ("header.php");

  if ( !isset ($Filename) ) {
    $sess_Data["warn"] = "Error: No file was selected.";
    $sess_Data["level"] = "medium";
    header ( "Location: ftp.php?SID=$SID\n\n" );
    exit;
  }

  $file["name"] = $Filename;
  $file["tmpname"] = ".#".$Filename.".tmp";

  echo "<HTML><HEAD><TITLE>Weeble File Manager Editor</TITLE></HEAD>";
  echo "<FRAMESET ROWS=\"".$personal["prev_size"].",*\">";
  echo "<FRAME NAME=\"edit_preview\" SRC=\"viewer.php?SID=$SID&Filename=".rawurlencode ($file["tmpname"])."\">";
  echo "<FRAME NAME=\"edit_box\" SRC=\"edit.php?SID=$SID&Filename=".rawurlencode ($file["name"])."&PREV=1\">";
  echo "</FRAMESET>";
  echo "</HTML>";
?>
