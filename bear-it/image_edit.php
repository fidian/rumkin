<?php

require_once('main.inc');

if (! $GLOBALS['IsAdmin'])Location();
global $gid, $id;

if (isset($_REQUEST['gid']))$gid = $_REQUEST['gid'];

if (! isset($gid) || $gid == '')$gid = - 2;
settype($gid, 'integer');

if (isset($_REQUEST['id']))$id = $_REQUEST['id'];

if (! isset($id) || $id == '')$id = - 1;
settype($id, 'integer');
$ImageInfo = FetchImageInfo($id);
$id = $ImageInfo[0];

if (isset($_REQUEST['Delete']) && $id >= 0) {
	$sql = 'delete from Thumbnails where ImageId = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	$sql = 'delete from ImageGroups where ImageId = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	$sql = 'delete from Images where Id = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
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
			ShowForm('The year must be four digits ' . '(or left blank if you don\'t know)');
			exit();
		}
		
		$ImageShotAtYear = 0;
		$ImageShotAtMonth = 0;
		$ImageShotAtDay = 0;
	}
	
	if (isset($ImagePrivate))$ImagePrivate = 1;
	else $ImagePrivate = 0;
	
	if ($id == - 1) {
		// Add
		$fd = fopen($_FILES['ImageFile']['tmp_name'], 'r');
		$data = addslashes(fread($fd, $_FILES['ImageFile']['size']));
		fclose($fd);
		$Dim = getimagesize($_FILES['ImageFile']['tmp_name']);
		$im = false;
		$File_type = $_FILES['ImageFile']['type'];
		
		if ($File_type == 'image/jpeg' || $File_type == 'image/pjpeg') {
			$im = @ImageCreateFromJPEG($_FILES['ImageFile']['tmp_name']);
			
			if ($im)$File_type = 'image/jpeg';
		} elseif ($File_type == 'image/gif') {
			$im = @ImageCreateFromGIF($_FILES['ImageFile']['tmp_name']);
		} elseif ($File_type == 'image/x-png') {
			$im = @ImageCreateFromPNG($_FILES['ImageFile']['tmp_name']);
		}
		
		/* To be added later
		 * elseif ($File_type == 'image/????') {
		 * $im = @ImageCreateFromWBMP($_FILES['ImageFile']['tmp_name']);
		 * } elseif ($File_type == 'image/????') {
		 * $im = @ImageCreateFromXBM($_FILES['ImageFile']['tmp_name']);
		 * } elseif ($File_type == 'image/????') {
		 * $im = @ImageCreateFromXPM($_FILES['ImageFile']['tmp_name']);
		 * }
		 */
		if (! $im) {
			/* Try harder by ignoring the MIME type and see if any of
			 * the image handlers can use it */
			$im = @ImageCreateFromJPEG($_FILES['ImageFile']['tmp_name']);
			$File_type = 'image/jpeg';
			
			if (! $im) {
				$im = @ImageCreateFromGIF($_FILES['ImageFile']['tmp_name']);
				$File_type = 'image/gif';
			}
			
			if (! $im) {
				$im = @ImageCreateFromPNG($_FILES['ImageFile']['tmp_name']);
				$File_type = 'image/x-png';
			}
			
			/* Add later, whenever we get image types for them
			 * if (! $im) {
			 * $im = @ImageCreateFromWBMP($_FILES['ImageFile']['tmp_name']);
			 * $File_type = 'image/????';
			 * }
			 * if (! $im) {
			 * $im = @ImageCreateFromXBM($_FILES['ImageFile']['tmp_name']);
			 * $File_type = 'image/????';
			 * }
			 * if (! $im) {
			 * $im = @ImageCreateFromXPM($_FILES['ImageFile']['tmp_name']);
			 * $File_type = 'image/????';
			 * }
			 */
		}
		
		if (! $im) {
			ShowForm('Unknown image format or damaged image file.');
			exit();
		}
		
		ImageDestroy($im);
		$sql = 'insert into Images (Caption, Comment, IsPrivate, Format, ' . 'Width, Height, Bytes, Image, ShotAtYear, ShotAtMonth, ShotAtDay, ' . 'PublishedAt) ' . 'values ("' . addslashes($ImageTitle) . '", "' . addslashes($ImageComment) . '", ' . $ImagePrivate . ', "' . $File_type . '", ' . $Dim[0] . ', ' . $Dim[1] . ', ' . $_FILES['ImageFile']['size'] . ', "' . $data . '", ' . $ImageShotAtYear . ', ' . $ImageShotAtMonth . ', ' . $ImageShotAtDay . ', NOW())';
	} else {
		// Update
		$sql = 'update Images set Caption="' . addslashes($ImageTitle) . '", Comment="' . addslashes($ImageComment) . '", IsPrivate=' . $ImagePrivate . ', ShotAtYear=' . $ImageShotAtYear . ', ShotAtMonth=' . $ImageShotAtMonth . ', ShotAtDay=' . $ImageShotAtDay;
		$sql .= ' where Id = ' . $id;
	}
	
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	
	// Fetch the new id so that everything works
	if ($id == - 1) {
		$sql = 'select max(Id) from Images';
		$res = dbi_query($sql);
		
		if (! $res)BadSQL($sql);
		$row = dbi_fetch_row($res);
		dbi_free_result($res);
		
		if ($row)$id = $row[0];
	}
	
	// Remove old group associations
	$sql = 'delete from ImageGroups where ImageId = ' . $id;
	$res = dbi_query($sql);
	
	if (! $res)BadSQL($sql);
	
	// Add current group associations
	if (isset($ImageGroups) && is_array($ImageGroups)) {
		$sql = 'insert into ImageGroups (ImageId, GroupId) values (' . $id . ', ';
		
		foreach ($ImageGroups as $g) {
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

ShowForm();


function ShowForm($Comment = '') {
	global $ImageInfo, $id, $gid, $ImageTitle, $ImageComment, $ImagePrivate, $ImageGroups, $ImageShotAtYear, $ImageShotAtMonth, $ImageShotAtDay;
	ShowHeader('Edit: ' . $ImageInfo[1]);
	
	if ($Comment != '') {
		ShowComment($Comment);
		echo "<br>\n";
	}
	
	if ($id >= 0) {
		$Dim = ThumbnailSize($ImageInfo[3], $ImageInfo[4]);
		
		?>
<p align=center><a href="image_detail.php?id=<?php echo $id
		
		?>&gid=<?php echo $gid ?>"><img border=0 align=center src="thumbnail.php/<?php
		
		echo $id ?>.jpg" width=<?php echo $Dim[0] ?> height=<?php
		
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
	
	if (isset($ImageTitle))echo htmlspecialchars($ImageTitle);
	elseif ($id >= 0)echo htmlspecialchars($ImageInfo[1])
	
	?>"></td>
  </tr>
  <tr>
    <th align=right>Comment:</th>
    <td><textarea name=ImageComment rows=10 cols=60><?php
	
	if (isset($ImageComment))echo $ImageComment;
	elseif ($id >= 0)echo $ImageInfo[9]
	
	?></textarea></td>
  </tr>
  <tr>
    <th align=right>Groups:</th>
    <td><select name=ImageGroups[] multiple size=6>
<?php
	
	$CurrentGroups = array();
	
	if (isset($ImageGroups)) {
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
	
	if (isset($ImageShotAtYear) && ImageShotAtYear)echo $ImageShotAtYear;
	elseif ($id >= 0 && $ImageInfo[6])echo $ImageInfo[6];
	
	?>">-<input type=text name=ImageShotAtMonth size=2 value="<?php
	
	if (isset($ImageShotAtMonth) && $ImageShotAtMonth)echo $ImageShotAtMonth;
	elseif ($id >= 0 && $ImageInfo[7])echo $ImageInfo[7];
	
	?>">-<input type=text name=ImageShotAtDay size=2 value="<?php
	
	if (isset($ImageShotAtDay) && $ImageShotAtDay)echo $ImageShotAtDay;
	elseif ($id >= 0 && $ImageInfo[8])echo $ImageInfo[8];
	
	?>"> &nbsp; <b>YYYY</b>-<b>MM</b>-<b>DD</b><br>
       <font size="-1">(Leave blank unknown values.  You must specify 
	the year to be able to enter the month.  You must specify the 
	month to enter the day.)</font></td>
  </tr>
  <tr>
    <th align=right>Flags:</th>
    <td><input type=checkbox name=ImagePrivate<?php
	
	if (isset($ImagePrivate) || (isset($ImageInfo[10]) && $ImageInfo[10]))echo ' CHECKED'; ?>>
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

