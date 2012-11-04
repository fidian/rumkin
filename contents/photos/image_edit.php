<?php

require_once('main.php');

if (! $GLOBALS['IsAdmin'])Location();

if (isset($_REQUEST['gid']))$gid = $_REQUEST['gid'];

if (! isset($gid) || $gid == '')$gid = - 2;
settype($gid, 'integer');

if (isset($_REQUEST['id']))$id = $_REQUEST['id'];

if (! isset($id) || $id == '')$id = - 1;
settype($id, 'integer');
$ImageInfo = FetchImageInfo($id);
$id = $ImageInfo[0];

if (isset($_REQUEST['Delete']) && $id >= 0) {
	$sql = 'delete from ImageGroups where ImageId = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	$sql = 'delete from Images where Id = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	
	foreach ($ext_to_mime as $ext => $mime) {
		unlink($image_path . $id . '.' . $ext);
		unlink($thumb_image_path . $id . '.' . $ext);
		unlink($small_image_path . $id . '.' . $ext);
	}
	
	Location('index.php?popcomment=Image+Deleted&gid=' . $gid);
}

if (isset($_REQUEST['ImageTitle']) && isset($_REQUEST['ImageComment'])) {
	$ImageTitle = $_REQUEST['ImageTitle'];
	$ImageComment = $_REQUEST['ImageComment'];
	
	if (isset($_REQUEST['ImageShotAtDay']))$ImageShotAtDay = $_REQUEST['ImageShotAtDay'];
	
	if (isset($_REQUEST['ImageShotAtMonth']))$ImageShotAtMonth = $_REQUEST['ImageShotAtMonth'];
	
	if (isset($_REQUEST['ImageShotAtYear']))$ImageShotAtYear = $_REQUEST['ImageShotAtYear'];
	
	if (! isset($ImageShotAtDay) || $ImageShotAtDay == '')$ImageShotAtDay = 0;
	
	if (! isset($ImageShotAtMonth) || $ImageShotAtMonth == '')$ImageShotAtMonth = 0;
	
	if (! isset($ImageShotAtYear) || $ImageShotAtYear == '')$ImageShotAtYear = 0;
	settype($ImageShotAtDay, 'integer');
	settype($ImageShotAtMonth, 'integer');
	settype($ImageShotAtYear, 'integer');
	
	if ($ImageShotAtDay < 1 || $ImageShotAtDay > 31)$ImageShotAtDay = 0;
	
	if ($ImageShotAtMonth < 1 || $ImageShotAtMonth > 12) {
		$ImageShotAtMonth = 0;
		$ImageShotAtDay = 0;
	}
	
	if ($ImageShotAtYear < 1700 || $ImageShotAtYear > 2100) {
		if ($ImageShotAtYear < 100 && $ImageShotAtYear != 0) {
			ShowForm($gid, $id, 'The year must be four digits ' . '(or left blank if you don\'t know)');
			exit();
		}
		
		$ImageShotAtYear = 0;
		$ImageShotAtMonth = 0;
		$ImageShotAtDay = 0;
	}
	
	if (isset($ImagePrivate))$ImagePrivate = 1;
	else $ImagePrivate = 0;
	$doImageDate = true;
	
	if ($id == - 1) {
		$ext = false;
		
		if (isset($mime_to_ext[$_FILES['ImageFile']['type']])) {
			$ext = $mime_to_ext[$_FILES['ImageFile']['type']];
		}
		
		if ($ext == false) {
			ShowForm($gid, $id, 'Unsupported image type.');
			exit();
		}
		
		// Add
		$lett = '0123456789' . 'abcdefghijklmnopqrstuvwxyz' . 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$key = '';
		
		for ($i = 0; $i < 40; $i ++) {
			$key .= substr($lett, mt_rand(0, strlen($lett) - 1));
		}
		
		$sql = 'insert into Images (Comment, PublishedAt, ShotAtYear, ' . 'ShotAtMonth, ShotAtDay) ' . 'values ("' . $key . '", NOW(), ' . $ImageShotAtYear . ', ' . $ImageShotAtMonth . ', ' . $ImageShotAtDay . ')';
		$doImageDate = false;
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
		move_uploaded_file($_FILES['ImageFile']['tmp_name'], $dest);
		$result = ProcessImage($dest, $_FILES['ImageFile']['type'], $id);
		
		if ($result['error']) {
			ShowForm($gid, $id, $result['msg']);
			exit(0);
		}
		
		if ($result['ext'] != $ext) {
			$dest2 = $image_path . $id . '.' . $result['ext'];
			rename($dest, $dest2);
			$dest = $dest2;
		}
	}
	
	// Update
	$sql = 'update Images set Caption="' . addslashes($ImageTitle) . '", Comment="' . addslashes($ImageComment) . '", IsPrivate=' . $ImagePrivate;
	
	if ($doImageDate) {
		$sql .= ', ShotAtYear=' . $ImageShotAtYear . ', ShotAtMonth=' . $ImageShotAtMonth . ', ShotAtDay=' . $ImageShotAtDay;
	}
	
	$sql .= ' where Id = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	
	// Remove old group associations
	$sql = 'delete from ImageGroups where ImageId = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	
	// Add current group associations
	if (isset($_REQUEST['ImageGroups']) && is_array($_REQUEST['ImageGroups'])) {
		$sql = 'insert into ImageGroups (ImageId, GroupId) values (' . $id . ', ';
		
		foreach ($_REQUEST['ImageGroups'] as $g) {
			settype($g, 'integer');
			$GroupInfo = FetchGroupInfo($g);
			
			if ($g >= 0) {
				$sql_group = $sql . $g . ')';
				$res = dbi_query($sql_group);
				
				if (! $res)BadSQL($sql);
			}
		}
	}
	
	Location('image_detail.php?id=' . $id . '&gid=' . $gid);
}

ShowForm($gid, $id);


function ShowForm($gid, $id, $Comment = '') {
	$ImageInfo = FetchImageInfo($id);
	ShowHeader('Edit: ' . $ImageInfo[1]);
	
	if ($Comment != '') {
		ShowComment($Comment);
		echo "<br>\n";
	}
	
	if ($id >= 0) {
		$Dim = ThumbnailSize($ImageInfo[3], $ImageInfo[4]);
		
		?>
<p align=center><a href="image_detail.php?id=<?php echo $id
		
		?>&gid=<?php echo $gid ?>"><img border=0 align=center src="image.php?type=t&id=<?php
		
		echo $id ?>" width=<?php echo $Dim[0] ?> height=<?php
		
		echo $Dim[1] ?>></a></p>
<?php
	}
	
	if ($gid != - 2) {
		$GroupInfo = FetchGroupInfo($gid);
		echo '<p>Back to: <font size="+1"><a href="index.php?gid=' . $GroupInfo[0] . '">' . $GroupInfo[1] . "</a></font></p>\n";
	}
	
	?>
<form <?php
	
	if ($id == - 1)echo 'enctype=multipart/form-data ';
	
	?>method=post action="image_edit.php">
<input type=hidden name="id" value="<?php echo $id ?>">
<input type=hidden name="gid" value="<?php echo $gid ?>">
<table align=center border=1 cellpadding=2 cellspacing=0>
<?php
	
	if ($id == - 1) {
		
		?>  <tr>
    <th align=right>File:</th>
    <td><input type=file name=ImageFile></td>
  </tr>
<?php
	}
	
	?>  <tr>
    <th align=right>Title:</th>
    <td><input type=text name=ImageTitle size=40 value="<?php
	
	if (isset($_REQUEST['ImageTitle']))echo htmlspecialchars($_REQUEST['ImageTitle']);
	elseif ($id >= 0)echo htmlspecialchars($ImageInfo[1])
	
	?>"></td>
  </tr>
  <tr>
    <th align=right>Comment:</th>
    <td><textarea name=ImageComment rows=10 cols=60><?php
	
	if (isset($_REQUEST['ImageComment']))echo $_REQUEST['ImageComment'];
	elseif ($id >= 0)echo $ImageInfo[9]
	
	?></textarea></td>
  </tr>
  <tr>
    <th align=right>Groups:</th>
    <td><select name=ImageGroups[] multiple size=10>
<?php
	
	$CurrentGroups = array();
	
	if (isset($_REQUEST['ImageGroups'])) {
		foreach ($ImageGroups as $data)$CurrentGroups[$data] = 1;
	} elseif ($id == - 1) {
		$CurrentGroups[$gid] = 1;
	} elseif ($id >= 0) {
		$groups = FetchGroups($id);
		$CurrentGroups = array();
		
		foreach ($groups as $data)$CurrentGroups[$data[0]] = $data[1];
	}
	
	$groups = GetPotentialParents(- 1);
	
	foreach ($groups as $data) {
		if ($data[0] >= 0) {
			echo '<option value="' . $data[0] . '"';
			
			if (isset($CurrentGroups[$data[0]]))echo ' SELECTED';
			echo '>' . htmlspecialchars($data[1]) . "</option>\n";
		}
	}
	
	?>      </select></td>
  </tr>
  <tr>
    <th align=right>Date of Photo:</th>
    <td><input type=text name=ImageShotAtYear size=4 value="<?php
	
	if (isset($_REQUEST['ImageShotAtYear']))echo $_REQUEST['ImageShotAtYear'];
	elseif ($id >= 0 && $ImageInfo[6])echo $ImageInfo[6];
	
	?>">-<input type=text name=ImageShotAtMonth size=2 value="<?php
	
	if (isset($_REQUEST['ImageShotAtMonth']))echo $_REQUEST['ImageShotAtMonth'];
	elseif ($id >= 0 && $ImageInfo[7])echo $ImageInfo[7];
	
	?>">-<input type=text name=ImageShotAtDay size=2 value="<?php
	
	if (isset($_REQUEST['ImageShotAtDay']))echo $_REQUEST['ImageShotAtDay'];
	elseif ($id >= 0 && $ImageInfo[8])echo $ImageInfo[8];
	
	?>"> &nbsp; <b>YYYY</b>-<b>MM</b>-<b>DD</b><br>
       <font size="-1">(Leave blank unknown values.  You must specify 
	the year to be able to enter the month.  You must specify the 
	month to enter the day.<?php
	
	if ($id == - 1) {
		echo '  If the photo has a date in its EXIF data, ' . 'that will get automatically pulled in if you leave this blank.';
	}
	
	?>)</font></td>
  </tr>
  <tr>
    <th align=right>Flags:</th>
    <td><input type=checkbox name=ImagePrivate<?php
	
	if (isset($_REQUEST['ImagePrivate']) || (isset($ImageInfo[10]) && $ImageInfo[10]))echo ' CHECKED'; ?>>
       - Private (Administrator only)</td>
  </tr>
  <tr>
    <td colspan=2 align=center>
<?php
	
	if ($id == - 1) {
		
		?>      <input type=submit value="Upload Image">
<?php
	} else {
		
		?>      [<a href="image_edit.php?id=<?php echo $id
		
		?>&Delete=1&gid=<?php echo $gid
		
		?>" onclick="return confirm('Are you sure you want to <?php ?>delete this image?')">Delete</a>] -
      <input type=submit value="Save Changes">
<?php
	}
	
	?>      - [<a href="image_detail.php?id=<?php echo $ImageInfo[0]
	
	?>">Cancel</a>]</td>
  </tr>
</table>
</form>

<?php
	
	ShowFooter($gid, $id);
}

