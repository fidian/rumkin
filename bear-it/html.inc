<?php


// -*- php -*-
function ShowHeader($Title = '') {
	$meta = '';
	
	if ($GLOBALS['IsAdmin']) {
		$Title .= ' &nbsp; (Admin)';
		
		if (headers_sent())$meta = '<meta http-equiv="refresh" content="' . $GLOBALS['login_timeout'] . ';url=login.php?auto_logout=1' . "\n";
		else header('Refresh: ' . $GLOBALS['login_timeout'] . ';url=login.php?auto_logout=1');
	}
	
	?><html><head><title><?php echo $Title ?></title>
<?php echo $meta ?></head>
<body bgcolor="#FFFFFF" text="#000000">
<h1 align=center><?php echo $Title ?></h1>
<?php
}


function ShowComment($Comment = '', $EscapeHTML = true) {
	if ($EscapeHTML)$Comment = htmlspecialchars($Comment);
	$Comment = nl2br($Comment);
	$Comment = trim($Comment);
	
	if ($Comment == '')return;
	
	?><table align=center border=1 cellpadding=2 cellspacing=2 bgcolor="#008F00">
    <tr><td bgcolor="#CFFFCF"><?php echo $Comment; ?></td></tr>
</table><?php
}

/* Show the footer and commands available.
 * If the group is known, use the group number as the first parameter.
 * If it is the root group, use -1.  If you don't know, use -2.
 * If the image is known, use the image number as the second parameter.
 * If it isn't known, use -1. */
function ShowFooter($GroupID = - 2, $ImageID = - 1) {
	
	?>
<p>[<a href="index.php">Group List</a>] - 
[<a href="search.php">Search</a>] -
[<a href="top.php">Top <?php echo $GLOBALS['top_picture_count'] ?></a>] -
[<a href="recent.php">Most Recently Added</a>] -
<?php
	
	if ($GLOBALS['IsAdmin']) {
		
		?>[<a href="group_edit.php?addfrom=<?php echo $GroupID ?>">Add Group</a>] -
[<a href="image_edit.php?gid=<?php echo $GroupID ?>">Upload Image</a>] -
[<a href="orphan.php">Orphans</a>] -
[<a href="login.php">Logout</a>]
<?php
	} else {
		
		?>[<a href="login.php">Login</a>]
<?php
	}
	
	?></body></html>
<?php
}


function CreateGroupParentLinks($ParentList) {
	$Showable = array();
	
	foreach ($ParentList as $data) {
		$FullLink = '<b><a href="index.php?gid=' . $data[0] . '">' . $data[1] . '</a></b>';
		
		if (isset($data[2]))$FullLink = '<i>' . $FullLink . '</i>';
		$Showable[] = $FullLink;
	}
	
	$Biggun = array_pop($Showable);
	$FullLink = '<font size="+1">' . $Biggun . '</font>';
	
	if ($GLOBALS['IsAdmin'])$FullLink .= ' [<a href="group_edit.php?gid=' . $data[0] . '">Edit</a>]';
	$Showable[] = $FullLink;
	return implode(' :: ', $Showable);
}


function DisplayImageSet($Images, $gid = - 2) {
	$column = $GLOBALS['thumbnails_per_row'] - 1;;
	echo '<table border=1 cellpadding=3 cellspacing=0 width=100%>';
	
	foreach ($Images as $data) {
		$column ++;
		
		if ($column == $GLOBALS['thumbnails_per_row']) {
			$column = 0;
			echo '<tr>';
		}
		
		list ($thumbwidth, $thumbheight) = ThumbnailSize($data[3], $data[4]);
		
		?><td>
<table border=0 align=center cellpadding=3 cellspacing=0>
<tr><td align=center><a href="image_detail.php?gid=<?php echo $gid ?>&id=<?php
		
		echo $data[0] ?>"<?php
		
		if ($data[9]) {
			$comment = $data[9];
			$comment = htmlspecialchars($comment);
			$comment = substr('"', '&quot;', $comment);
			$comment = nl2br($comment);
			echo 'alt="' . $comment . '"';
		}
		
		?>><img border=0 src="thumbnail.php/<?php
		
		echo $data[0] ?>.jpg" width=<?php echo $thumbwidth
		
		?> height=<?php echo $thumbheight
		
		?>></a></td></tr>
<tr><td><?php
		
		if ($data[10])echo '<i>' ?><b><?php
		
		echo htmlspecialchars($data[1]) ?></b><?php
		
		if ($data[10])echo '</i>' ?></td></tr>
<tr><td><?php
		
		if ($data[10])echo '<i>' ?><font size="-1">(<?php
		
		echo $data[3] ?>x<?php echo $data[4]
		
		?>)</font> &nbsp; <?php
		
		echo HumanReadableSize($data[2]);
		
		if ($GLOBALS['IsAdmin'])echo ' &nbsp [<a href="image_edit.php?gid=' . $gid . '&id=' . $data[0] . '">Edit</a>]';
		
		if ($data[10])echo '</i>';
		$str = ShotAtString($data[6], $data[7], $data[8]);
		
		if ($str != '')echo '<br>' . $str;
		
		?></td></tr>
</table></td>
<?php
		
		if ($column == $GLOBALS['thumbnails_per_row'])echo "</tr>\n";
	}
	
	echo "</table>\n";
}

