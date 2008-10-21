<?PHP 
/*
ob_start();
phpinfo();
$c = ob_get_contents();
ob_end_clean();
$fp = @fopen('/tmp/upload.txt', 'w');
if ($fp) {
    fwrite($fp, $c);
    fclose($fp);
}
*/
require_once('main.php');

if (! $GLOBALS['IsAdmin'])
  Location();

if (isset($_REQUEST['gid']))
  $gid = $_REQUEST['gid'];
if (! isset($gid) || $gid == '')
  $gid = -2;
settype($gid, 'integer');

if (is_array($_FILES) && count($_FILES)) {
    foreach ($_FILES as $k => $upfile) {
	$ext = false;
	if (isset($mime_to_ext[$upfile['type']])) {
	    $ext = $mime_to_ext[$upfile['type']];
	}
	if ($ext == false) {
	    ShowForm($gid, $id, 'Unsupported image type.');
	    exit();
	}
	
	// Add
	$lett = '0123456789' .
	  'abcdefghijklmnopqrstuvwxyz' .
	  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$key = '';
	for ($i = 0; $i < 40; $i ++) {
	    $key .= substr($lett, mt_rand(0, strlen($lett) - 1));
	}
	
	$caption = $upfile['name'];
	if ($caption == '') {
	    $caption = 'Bulk Upload';
	}
	$caption = addslashes($caption);
	
	$sql = 'insert into Images (Comment, PublishedAt, Caption, ' .
	  'ShotAtYear, ShotAtMonth, ShotAtDay) ' .
	  'values ("' . $key . '", NOW(), "' . $caption . '", 0, 0, 0)';
	$res = dbi_query($sql);
	if (! $res) {
	    BadSQL($sql);
	}
	
	// Get the ID
	$sql = 'select ID from Images where Comment = "' . $key . '"';
	$res = dbi_query($sql);
	$row = dbi_fetch_row($res);
	
	if (! $row) {
	    die('Could not find Image record that was just created.');
	}
	$id = $row[0];
	dbi_free_result($res);
	
	$dest = $image_path . $id . '.' . $ext;
	move_uploaded_file($upfile['tmp_name'], $dest);
	$result = ProcessImage($dest, $upfile['type'], $id);
	if ($result['error']) {
	    die('Error saving: ' . $result['msg']);
	}
	if ($result['ext'] != $ext) {
	    $dest2 = $image_path . $id . '.' . $result['ext'];
	    rename($dest, $dest2);
	    $dest = $dest2;
	}
	
	// Update
	$sql = 'update Images set Comment="" where Id = ' . $id;
	$res = dbi_query($sql);
	if (! $res)
	  BadSQL($sql);
	
	if ($gid >= 0) {
	    $sql = 'insert into ImageGroups (ImageId, GroupId) values (' .
	      $id . ', ' . $gid . ')';
	    $res = dbi_query($sql);
	    if (! $res)
	      BadSQL($sql);
	}
    }

    // Only shows the last Id
    echo "Upload $id successful.";
    exit(0);
}


ShowHeader('Bulk Upload');

if ($gid != -2) {
    $GroupInfo = FetchGroupInfo($gid);
    echo '<p>Back to: <font size="+1"><a href="index.php?gid=' . 
      $GroupInfo[0] . '">' . $GroupInfo[1] . "</a></font></p>\n";
}

?>
<form enctype="multipart/form-data" method="post" name="upload_form"
action="upload.php">
<input type=hidden name="gid" value="<?PHP echo $gid ?>">
<input type=hidden name="PHPSESSID" value="<?PHP session_id(); ?>">
<table align=center border=1 cellpadding=2 cellspacing=0>
  <tr>
    <td colspan=2>
      <applet name="JUpload" archive="/inc/jar/wjhk.jupload.jar"
      code="wjhk.jupload2.JUploadApplet" width="640" height="500"
      mayscript alt="Install Java">
      <param name="uploadPolicy" value="PictureUploadPolicy">
      <param name="formdata" value="upload_form">
      <param name="lookAndFeel" value="system">
      <param name="nbFilesPerRequest" value="1">
      <param name="postURL" value="upload.php">
      <param name="showLogWindow" value="false">
      <param name="stringUploadSuccess" value=".*Upload [0-9]+ successful.*">
      You need Java 1.5 or newer.
      </applet>
    </td>
  </tr>
  <tr>
    <th align=right>Flags:</th>
    <td><input type=checkbox name=ImagePrivate<?PHP
       if (isset($_REQUEST['ImagePrivate']) || (isset($ImageInfo[10]) && $ImageInfo[10])) 
	  echo ' CHECKED'; ?>>
       - Private (Administrator only)</td>
  </tr>
</table>
</form>

<?PHP

ShowFooter($gid, $id);
