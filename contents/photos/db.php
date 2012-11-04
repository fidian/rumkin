<?php


// -*- php -*-
require_once('php-dbi.php');
require_once('misc.php');


// Establish a database connection.
$DB_Connection = dbi_connect($GLOBALS['db_host'], $GLOBALS['db_login'], $GLOBALS['db_password'], $GLOBALS['db_database']);

if (! $DB_Connection)die('Error connecting to database:<br><tt>' . dbi_error() . '</tt>');

/* Returns an array of information about the group passed in
 * [0] = Group ID, [1] = Group Name, [2] = Comment, [3] = Private flag,
 * [4] = Group Parent
 * However, you won't get any with the private flag set if you are not
 * logged in as Admin */
function FetchGroupInfo($GroupId = - 1) {
	settype($GroupId, 'integer');
	
	if ($GroupId >= 0) {
		$sql = 'SELECT Groups.Id, Groups.Name, Groups.Comment, ' . 'Groups.IsPrivate, Groups.ParentGroupID ' . 'FROM Groups ' . 'WHERE Groups.Id = ' . $GroupId;
		
		if (! $GLOBALS['IsAdmin'])$sql .= ' and Groups.IsPrivate = 0';
		$res = dbi_query($sql);
		
		if (! $res) {
			BadSQL($sql);
		}
		
		$row = dbi_fetch_row($res);
		dbi_free_result($res);
		
		if ($row) {
			$row[1] = stripslashes($row[1]);
			$row[2] = stripslashes($row[2]);
			return $row;
		}
	}
	
	$returnable = array(- 1,
		$GLOBALS['album_title'],
		$GLOBALS['album_comment'],
		0, - 1
	);
	return $returnable;
}

/* Returns an array of information about the image passed in
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private */
function FetchImageInfo($ImageId = - 1) {
	settype($ImageId, 'integer');
	
	if ($ImageId >= 0) {
		$sql = GetImageSelectionQuery(array(
				'Where' => array(
					'Images.Id = ' . $ImageId
				)
			));
		$res = dbi_query($sql);
		
		if (! $res) {
			BadSQL($sql);
		}
		
		$row = dbi_fetch_row($res);
		dbi_free_result($res);
		
		if ($row) {
			$row[1] = stripslashes($row[1]);
			$row[9] = stripslashes($row[9]);
			return $row;
		}
	}
	
	$returnable = array(- 1,
		$GLOBALS['album_title'],
		$GLOBALS['album_comment']
	);
	return $returnable;
}

/* Returns an array of arrays of information for matching images
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag */
function SearchImages($keyword, $scope, $max) {
	$req = array();
	
	if ($scope == 'both') {
		foreach ($keyword as $word) {
			$w = addslashes($word);
			$req[] = "(Images.Caption LIKE '$w' OR Images.Comment LIKE '$w')";
		}
	} elseif ($scope == 'description') {
		foreach ($keyword as $word) {
			$w = addslashes($word);
			$req[] = "Images.Comment LIKE '$w'";
		}
	} else {
		foreach ($keyword as $word) {
			$w = addslashes($word);
			$req[] = "Images.Caption LIKE '$w'";
		}
	}
	
	$sql = GetImageSelectionQuery(array(
			'Where' => $req,
			'OrderBy' => array(
				'Images.ShotAtYear desc',
				'Images.ShotAtMonth desc',
				'Images.ShotAtDay desc',
				'Images.Caption desc'
			)
		));
	$res = dbi_query($sql);
	
	if (! $res) {
		BadSQL($sql);
	}
	
	$returnable = array();
	
	while (($row = dbi_fetch_row($res)) && $max --) {
		$row[1] = stripslashes($row[1]);
		$row[9] = stripslashes($row[9]);
		$returnable[] = $row;
	}
	
	dbi_free_result($res);
	return $returnable;
}

/* Returns an array of arrays of information for images without groups
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag */
function SearchImageOrphans($max) {
	// Non-admins should get nothing
	if (! $GLOBALS['IsAdmin'])return array();
	$sql = GetImageSelectionQuery(array(
			'Where' => array(
				'isnull(ImageGroups.ImageId)'
			),
			'ForceGroupJoin' => 1
		));
	$res = dbi_query($sql);
	
	if (! $res) {
		BadSQL($sql);
	}
	
	$returnable = array();
	
	while (($row = dbi_fetch_row($res)) && $max --) {
		$row[1] = stripslashes($row[1]);
		$row[9] = stripslashes($row[9]);
		$returnable[] = $row;
	}
	
	dbi_free_result($res);
	return $returnable;
}

/* Returns an array of arrays of information for images without groups
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag */
function SearchImageTop($max) {
	$sql = GetImageSelectionQuery(array(
			'OrderBy' => array(
				'Images.Views desc'
			)
		));
	$res = dbi_query($sql);
	
	if (! $res) {
		BadSQL($sql);
	}
	
	$returnable = array();
	
	while (($row = dbi_fetch_row($res)) && $max --) {
		$row[1] = stripslashes($row[1]);
		$row[9] = stripslashes($row[9]);
		$returnable[] = $row;
	}
	
	dbi_free_result($res);
	return $returnable;
}

/* Returns an array of arrays of information for images without groups
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag */
function SearchImageRecent($max) {
	$sql = GetImageSelectionQuery(array(
			'OrderBy' => array(
				'Images.PublishedAt desc'
			)
		));
	$res = dbi_query($sql);
	
	if (! $res) {
		BadSQL($sql);
	}
	
	$returnable = array();
	
	while (($row = dbi_fetch_row($res)) && $max --) {
		$row[1] = stripslashes($row[1]);
		$row[9] = stripslashes($row[9]);
		$returnable[] = $row;
	}
	
	dbi_free_result($res);
	return $returnable;
}

/* Returns an array of group arrays that the image is associated with.
 * The returned array of arrays is sorted by group name.
 * [0] = Group ID, [1] = Group Name, [2] = Comment, [3] = IsPrivate */
function FetchGroups($ImageId = 0) {
	settype($ImageId, 'integer');
	$returnable = array();
	
	if ($ImageId >= 0) {
		$sql = 'SELECT Groups.Id, Groups.Name, Groups.Comment, ' . 'Groups.IsPrivate ' . 'FROM Groups ' . 'LEFT JOIN ImageGroups ON Groups.Id = ImageGroups.GroupId ' . 'WHERE ImageGroups.ImageId = ' . $ImageId . ' ' . 'ORDER BY Groups.Name, Groups.Id';
		
		if (! $GLOBALS['IsAdmin'])$sql .= ' and Groups.IsPrivate = 0';
		$res = dbi_query($sql);
		
		if (! $res) {
			BadSQL($sql);
		}
		
		while ($row = dbi_fetch_row($res)) {
			$row[1] = stripslashes($row[1]);
			$row[2] = stripslashes($row[2]);
			$returnable[] = $row;
		}
		
		dbi_free_result($res);
	}
	
	return $returnable;
}

/* Returns an array of information about images for the group passed
 * in.  Each element in the array is another array with the following
 * elements.
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag */
function FetchImages($GroupId = - 1) {
	settype($GroupId, 'integer');
	$returnable = array();
	
	if ($GroupId >= 0) {
		$sql = GetImageSelectionQuery(array(
				'Where' => array(
					'ImageGroups.GroupId = ' . $GroupId
				),
				'OrderBy' => array(
					'Images.ShotAtYear',
					'Images.ShotAtMonth',
					'Images.ShotAtDay',
					'Images.Caption'
				),
				'ForceGroupJoin' => 1
			));
		$res = dbi_query($sql);
		
		if (! $res) {
			BadSQL($sql);
		}
		
		while ($row = dbi_fetch_row($res)) {
			$row[1] = stripslashes($row[1]);
			$row[9] = stripslashes($row[9]);
			$returnable[] = $row;
		}
		
		dbi_free_result($res);
	}
	
	return $returnable;
}

/* Returns an array of groups with $GroupId as the parent
 * Each element in the array is another array with the following elements
 * [0] = Group ID, [1] = Group Name, [2] = Number of Images, [3] = IsPrivate */
function FetchChildren($GroupId = - 1) {
	settype($GroupId, 'integer');
	$sql = 'SELECT Groups.Id, Groups.Name, COUNT(ImageGroups.ImageId), ' . 'Groups.IsPrivate ' . 'FROM Groups ' . 'LEFT JOIN ImageGroups ON Groups.Id = ImageGroups.GroupId ' . 'WHERE ParentGroupID = ' . $GroupId;
	
	if (! $GLOBALS['IsAdmin'])$sql .= ' and Groups.IsPrivate = 0';
	$sql .= ' ' . 'GROUP BY Groups.Id ' . 'ORDER BY Groups.Name';
	$res = dbi_query($sql);
	
	if (! $res) {
		BadSQL($sql, dbi_error());
	}
	
	$returnable = array();
	
	while ($row = dbi_fetch_row($res)) {
		$row[1] = stripslashes($row[1]);
		$returnable[] = $row;
	}
	
	dbi_free_result($res);
	
	foreach ($returnable as $key => $data) {
		$Children = FetchChildren($data[0]);
		settype($returnable[$key][2], 'integer');
		
		foreach ($Children as $Child) {
			settype($Child[2], 'integer');
			$returnable[$key][2] += $Child[2];
		}
	}
	
	return $returnable;
}

/* Returns an array of groups starting with $GroupID and working
 * up the chain of parents until the root node has been reached.
 * The first element in the array is the root node.  The last is the
 * group passed in.
 * Each element in the array is another array with the following elements
 * [0] = Group ID, [1] = Group Name, [2] = IsPrivate */
function FetchParents($GroupId = - 1) {
	settype($GroupId, 'integer');
	$returnable = array();
	
	while ($GroupId != - 1) {
		$sql = 'SELECT Groups.Id, Groups.Name, Groups.IsPrivate, ' . 'Groups.ParentGroupId ' . 'FROM Groups ' . 'WHERE Groups.Id = ' . $GroupId;
		$res = dbi_query($sql);
		
		if (! $res) {
			BadSQL($sql, dbi_error());
		}
		
		// there should only be one row
		$row = dbi_fetch_row($res);
		dbi_free_result($res);
		
		if (! $row) {
			die("Group $GroupId has an invalid parent!");
		}
		
		$GroupId = $row[3];
		unset($row[3]);
		$row[1] = stripslashes($row[1]);
		array_unshift($returnable, $row);
	}
	
	array_unshift($returnable, array(- 1,
			$GLOBALS['album_root']
		));
	return $returnable;
}


function GetPotentialParents($gid) {
	/* Iterative function to get all potential parents for the group
	 * passed in (Recursion could use up all of the memory - iterative
	 * could be easier to work with in this instance)
	 * 
	 * Returns an array of potential parents
	 * [0] = Group ID, [1] = Formatted group name */
	$Queue = array(
		array(- 1,
			array(
				$GLOBALS['album_root']
			)
		)
	);
	$returnable = array();
	
	while (count($Queue)) {
		$data = array_pop($Queue);
		$CurrentGroup = $data[0];
		$CurrentGroupNameParts = $data[1];
		$data = FetchChildren($CurrentGroup);
		
		while (count($data)) {
			$ChildData = array_pop($data);
			$ChildNameParts = $CurrentGroupNameParts;
			$ChildNameParts[] = $ChildData[1];
			
			if ($ChildData[0] != $gid)array_push($Queue, array(
					$ChildData[0],
					$ChildNameParts
				));
		}
		
		$returnable[] = array(
			$CurrentGroup,
			implode(' :: ', $CurrentGroupNameParts)
		);
	}
	
	return $returnable;
}

/* The array passed in specifies certain variables -- I found this to be
 * easier than passing a dozen potential little parameters.
 * 
 * KEY             Description
 * --------------  ------------------------------------------------------
 * ForceGroupJoin  Adds the SQL necessary to join Images and ImageGroups
 *                 for whatever reason.  Automatically done if the user
 *                 is not Admin, but this will make sure it gets done.
 * Where           Array of Where clauses
 * OrderBy         Array of Order By keys
 * 
 * [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
 * [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
 * [9] = Comment, [10] = Private Flag, [11] = PublishedAt */
function GetImageSelectionQuery($Params = array()) {
	if (! is_array($Params))$Params = array();
	$sql = 'SELECT DISTINCT Images.Id, Images.Caption, Images.Bytes, ' . 'Images.Width, Images.Height, Images.Views, Images.ShotAtYear, ' . 'Images.ShotAtMonth, Images.ShotAtDay, Images.Comment, ' . 'Images.IsPrivate, Images.PublishedAt ' . 'FROM Images';
	
	if (! $GLOBALS['IsAdmin'])$sql .= ' inner join ImageGroups on Images.Id = ImageGroups.ImageId ' . ' inner join Groups on ImageGroups.GroupId = Groups.Id';
	elseif (isset($Params['ForceGroupJoin']))$sql .= ' left join ImageGroups on ImageGroups.ImageId = Images.Id';
	
	if (! $GLOBALS['IsAdmin']) {
		if (! isset($Params['Where']) || ! is_array($Params['Where']))$Params['Where'] = array();
		$Params['Where'][] = 'Images.IsPrivate = 0';
		$Params['Where'][] = 'Groups.IsPrivate = 0';
	}
	
	if (isset($Params['Where']) && is_array($Params['Where']) && count($Params['Where']))$sql .= ' WHERE ' . implode(' AND ', $Params['Where']);
	
	if (isset($Params['OrderBy']) && is_array($Params['OrderBy']) && count($Params['OrderBy'])) {
		$sql .= ' ORDER BY ' . implode(', ', $Params['OrderBy']);
	}
	
	return $sql;
}

