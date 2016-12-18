<?php

require_once('main.php');
$id = - 1;

if (isset($_REQUEST['id']))$id = $_REQUEST['id'];

if (isset($_REQUEST['gid']))$gid = $_REQUEST['gid'];

if (! isset($gid) || $gid == '')$gid = - 2;
settype($gid, 'integer');
settype($id, 'integer');
$ImageInfo = FetchImageInfo($id);
$id = $ImageInfo[0];

if ($id < 0)Location('index.php?gid=' . $gid);
ShowHeader($ImageInfo[1]);

if ($GLOBALS['IsAdmin'])echo '<p align=center>[<a href="image_edit.php?gid=' . $gid . '&id=' . $id . '">Edit</a>]</p>' . "\n";

if ($ImageInfo[9]) {
	ShowComment($ImageInfo[9]);
	echo "<br>\n";
}

if ($gid != - 2) {
	$GroupInfo = FetchGroupInfo($gid);
	echo '<p>Back to: <font size="+1"><a href="index.php?gid=' . $GroupInfo[0] . '">' . $GroupInfo[1] . "</a></font></p>\n";
}

?>
<table align=center border=0 cellpadding=0 cellspacing=0>
<tr><td>
<?php

if (($ImageInfo[3] > $GLOBALS['big_image_w'] || $ImageInfo[4] > $GLOBALS['big_image_h']) && (! isset($_REQUEST['full']) || $_REQUEST['full'] == 0)) {
	list ($ThumbX, $ThumbY) = ThumbnailSize($ImageInfo[3], $ImageInfo[4], $GLOBALS['big_image_w'], $GLOBALS['big_image_h']);
	
	?>
This image's full size is <?php echo $ImageInfo[3] . 'x' . $ImageInfo[4]
	
	?> pixels and has been scaled down.
<a href="image_detail.php?id=<?php echo $id; ?>&gid=<?php echo $gid
	
	?>&full=1">See
full image.</a><br>
<img src="image.php?type=s&id=<?php echo $id; ?>" width="<?php
	
	echo $ThumbX ?>" height="<?php echo $ThumbY ?>" name="PicImage">
<?php
} else {
	
	?>
<img src="image.php?id=<?php echo $id; ?>" width="<?php echo $ImageInfo[3]
	
	?>" height="<?php echo $ImageInfo[4] ?>" name="PicImage">
<?php
}

?>
</td></tr></table>
<?php

$D = ShotAtString($ImageInfo[6], $ImageInfo[7], $ImageInfo[8]);

if ($D != '')echo "<p><b>Date:</b> $D</p>\n";
$Groups = FetchGroups($id);

if (count($Groups)) {
	echo '<p>This picture is in the following groups:';
	
	foreach ($Groups as $data) {
		$ParentList = FetchParents($data[0]);
		echo "<br> &nbsp; &nbsp; &nbsp; \n";
		echo CreateGroupParentLinks($ParentList);
	}
	
	echo "</p>\n";
}

ShowFooter($gid, $id);
