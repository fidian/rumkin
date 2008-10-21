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

?><HTML>
 <HEAD>
  <TITLE>Weeble FM Upload v<?php echo $weeblefm_Version ?></TITLE>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <style type="text/css">
      <?php 
        echo $style . "\n";
      ?>
    </style>
 </HEAD>
 <BODY>
  <table border=0 cellspacing=0 cellpadding=2>
   <tr>
    <td>
     <table border=0 cellpadding=10 cellspacing=0 width="99%">
      <tr>
       <td align="left"><img src=<?php echo "\"$logo\""?>></td>
       <td align="right" valign="top"><A HREF="crossover.php?SID=<?php echo $SID ?>&submit=LOGOUT"><b>Logout</b></A><BR>
        <span style="font-size: smaller">Help [<A href="docs/manual.html" target="_blank">html</a><b>/</b><A href="docs/PDF/manual.pdf" target="_blank">pdf</a>]</span>
       </td>
      </tr>
     </table>
    </td>
   </tr>
   <tr>
    <td class="border">
    <table cellspacing=2 cellpadding=1 border=0 width="100%" class="manager">
      <form name="form_listing" method="post" action="crossover.php" enctype="multipart/form-data">
      <input type=hidden name="SID" value="<?php echo $SID ?>">
      <tr>
       <td class="fixed" colspan=2><?php echo $sess_Data["user"] ." @ ".$sess_Data["Server Name"] ?></td>
      </tr>
      <tr>
       <td>Current Directory: <input type="text" value="<?php echo ftp_pwd($fp) ?>" size=40 readonly></td>
       <td align="right"><input type="submit" name="submit" value="Cancel"></td>
      </tr>
      </form>
     </table>
    </td>
   </tr>
   <form name="form_listing" method="post" action="crossover.php" enctype="multipart/form-data">
   <tr>
    <td class="border">
     <table cellspacing=2 cellpadding=1 border=0 width="100%" class="manager">
<?php
  for ( $x=1; $x <= $ftp_max_uploads; $x++ ) {
    $iName = "UPLOAD_FILE_".$x;
    echo "      <tr><td align=\"right\" class=\"".$alt_class[($x % 2)]."\"><input type=\"file\" name=\"$iName\" size=".$editor_prefs["cols"]."></td></tr>\n";
  }
?>
     </table>
    </td>
   </tr>
   <tr class="buttonBar">
    <td align="center" class="buttonBorder"><input type="submit" name="submit" value="Upload"> | | <input type="reset" value="Reset"></td>
   </tr>
   <input type=hidden name="SID" value="<?php echo $SID ?>">
   </form>
  </table>
<p class="sig"><a href="http://weeblefm.sourceforge.net/">Weeble File Manager</a> 
  by Jon Manna &amp; Chris Michaels</p> </BODY>
</HTML>
