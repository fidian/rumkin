<?php
/*
 * Weeble File Manager (c) Christopher Michaels & Jonathan Manna
 * This software is released under the BSD License.  For a copy of
 * the complete licensing agreement see the LICENSE file.
 */
require_once('settings.php');
require_once('tools/compat.php');
require_once('functions-ftp.php');
require_once('header.php');


// Check that a file has been selected, otherwise redirect back to file listing.
if (! isset($Filename)) {
	$sess_Data['warn'] = 'Error: No file was selected.';
	$sess_Data['level'] = 'medium';
	header("Location: ftp.php?SID=$SID\n\n");
	exit;
}

$file['name'] = $Filename;
$file['tmpname'] = '.#' . $Filename . '.tmp';


// Handling of tmp files for preview.
if (isset($PREV)) {
	$name = 'tmpname';
} else {
	$name = 'name';
}


/* If a new file is being created, set the content of the textbox to an empty
 * string. */
if (isset($NEWFILE)) {
	$file['content'] = '';
} else {
	$file['size'] = ftp_size($fp, $file[$name]);
	
	if ($file['size'] <= $editor_prefs['max_size']) {
		$tp = tmpfile();
		$result = @ftp_fget($fp, $tp, $file[$name], FTP_BINARY);
		
		if ($result) {
			rewind($tp);
			$file['content'] = fread($tp, $file['size']);
			$file['content'] = htmlentities($file['content']);
			fclose($tp);
		} else {
			$sess_Data['warn'] = 'Error: An error occurred while trying to retrieve "' . $file['name'] . '".';
			$sess_Data['level'] = 'major';
			header("Location: ftp.php?SID=$SID\n\n");
			exit;
		}
	} else {
		$sess_Data['warn'] = 'Warning: Size of "' . $file['name'] . '" exceeds maximum edit size.';
		$sess_Data['level'] = 'major';
		header("Location: ftp.php?SID=$SID\n\n");
		exit;
	}
}

?><HTML>
 <HEAD>
  <TITLE>Weeble FM Editor v<?php echo $weeblefm_Version ?></TITLE>
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
       <td align="left"><img src=<?php echo "\"$logo\"" ?>></td>
       <td align="right" valign="top"><A HREF="crossover.php?SID=<?php echo $SID ?>&submit=LOGOUT"><b>Logout</b></A><BR>
        <span style="font-size: smaller">Help [<A href="docs/manual.html" target="_blank">html</a><b>/</b><A href="docs/PDF/manual.pdf" target="_blank">pdf</a>]</span>
       </td>
      </tr>
     </table>
    </td>
   </tr>
<?php

if ($sess_Data['warn'] != '') {
	echo '<TR><TH>';
	echo '<CENTER><B><FONT color=' . $warn_color[$sess_Data['level']] . '>';
	echo $sess_Data['warn'];
	echo '</FONT></B></CENTER>';
	echo '<P>';
	echo '</TH></TR>';
	$sess_Data['warn'] = '';
}

?>   
  <tr>
    <td class="border">
    <table cellspacing=2 cellpadding=1 border=0 width="100%" class="manager">
      <form name="form_listing" method="post" action="crossover.php" enctype="multipart/form-data" TARGET="_top">
      <input type=hidden name="SID" value="<?php echo $SID ?>">
      <input type=hidden name="EDITOR" value="CANCEL">
      <input type=hidden name="FILE" value="<?php echo $file['name'] ?>">
      <tr>
       <td class="fixed" colspan=2><?php echo $sess_Data['user'] . ' @ ' . $sess_Data['Server Name'] ?></td>
      </tr>
      <tr>
       <td>Current File: <input type="text" value="<?php echo $sess_Data['dir'] . '/' . $file['name'] ?>" size=40 readonly></td>
       <td align="right"><input type="submit" name="submit" value="Cancel"></td>
      </tr>
      </form>
     </table>
    </td>
   </tr>
   <form name="form_listing" method="post" action="crossover.php" enctype="multipart/form-data" TARGET="_top">
   <tr>
    <td class="border" bgcolor="#CCCCFF"><textarea name="EDITOR" rows=<?php echo $personal['edit_row'] ?> cols=<?php echo $personal['edit_col'] ?>><?php echo $file['content'] ?></textarea></td>
   </tr>
   <tr class="buttonBar">
    <td align="center" class="buttonBorder"><input type="submit" name="submit" value="Save"> | | <input type="submit" name="submit" value="Save & Edit"> | | <input type="submit" name="submit" value="Preview"> | | <input type="reset" value="Reset"></td>
   </tr>
   <input type=hidden name="FILE" value="<?php echo $file['name'] ?>">
   <input type=hidden name="SID" value="<?php echo $SID ?>">
   </form>
  </table>
<p>Note: The browser session will expire in <?php echo ini_get('session.cache_expire') ?> 
   minutes.  Please remember to save before then or your changes will be lost.</p>
<p class="sig"><a href="http://weeblefm.sourceforge.net/">Weeble File Manager</a> 
  by Jon Manna &amp; Chris Michaels</p> </BODY>
</HTML>
