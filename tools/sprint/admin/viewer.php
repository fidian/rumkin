<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
$Extra_Pre = '../';
include '../common.inc';
$GLOBALS['lines'] = 15;
$GLOBALS['cols'] = 4;
CheckForLogin('restricted');
SprintStandardHeader('File Browser', 1);

if (isset($_GET['filter']))$GLOBALS['filter'] = split(',', $_GET['filter']);

if (isset($_POST['filter']))$GLOBALS['filter'] = $_POST['filter'];

if (isset($_GET['size']))$GLOBALS['size'] = $_GET['size'];

if (isset($_POST['size']))$GLOBALS['size'] = $_POST['size'];
settype($GLOBALS['size'], 'integer');
$sql = 'select ID from ' . $GLOBALS['File Table'];
$sql_where = 0;

if (isset($GLOBALS['filter'])) {
	$sql_where = 1;
	$sql .= ' where FileType not in (';
	$sql .= join(', ', $GLOBALS['filter']);
	$sql .= ')';
}

if (isset($GLOBALS['size']) && $GLOBALS['size'] > 0) {
	if (! $sql_where) {
		$sql .= ' where';
		$sql_where = 1;
	} else {
		$sql .= ' and';
	}
	
	$sql .= ' FileSize >= ' . ($GLOBALS['size'] * 1024);
}

$sql .= ' order by ID desc';
$result = RunQuery($sql);
$showable = array();

while ($data = FetchAssoc($result)) {
	$showable[] = $data;
}

DoneWithResult($result);
ShowTableWithLinks($showable, array(
		'CellCallback' => 'GetCellData',
		'DoFilter' => true
	));
StandardFooter();


function GetCellData($data) {
	$sql = 'select ID, FileType, FileSize from ' . $GLOBALS['File Table'] . ' where ID = ' . $data['ID'];
	$r2 = RunQuery($sql);
	$data = FetchAssoc($r2);
	$sql = 'select * from ' . $GLOBALS['FileDesc Table'] . ' where FileID = ' . $data['ID'] . ' order by ID desc';
	$r2 = RunQuery($sql);
	$d2 = FetchAssoc($r2);
	DoneWithResult($r2);
	
	if (! $d2) {
		$d2 = array(
			'ID' => '0',
			'FileID' => $data['ID'],
			'FileName' => 'Unknown',
			'Folder' => '',
			'DescText' => '',
			'TimeStamp' => '00000000000000'
		);
	}
	
	echo '<td align=center>';
	echo '<a href="../dl.php/' . $data['ID'] . '/' . $d2['FileName'] . '">';
	
	switch ($data['FileType']) {
		case 1:  // gcd
			
		case 3:  // jad
			
		case 10:  // txt
			echo '<img src="../img/text.gif">';
			break;

		case 2:  // qcp
			
		case 12:  // mp3
			echo '<img src="../img/cassette.jpg">';
			break;

		case 4:  // java
			echo '<img src="../img/winzip.gif">';
			break;

		case 5:  // wbmp
			echo '<img src="../img/file.jpg">';
			break;

		case 6:  // jpg
			
		case 7:  // png
			
		case 11:  // gif
			echo '<img src="../thumb.php/' . $data['ID'] . '/' . $d2['FileName'] . '">';
			break;

		case 8:  // pmd
			echo '<img src="../img/film.jpg">';
			break;

		case 9:  // mid
			echo '<img src="../img/clef.jpg">';
			break;

		case 0:
		default:
			echo '<img src="../img/question.jpg">';
			break;
	}
	
	echo "</a><br>\n";
	$fn = $d2['FileName'];
	
	if (strlen($fn) > 17)$fn = substr($fn, 0, 9) . '...' . substr($fn, - 6);
	echo $fn . ' &ndash; ' . FidianFileSize($data['FileSize'], true, true) . "\n";
	echo "</td>\n";
}

