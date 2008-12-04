<?php
/* Sprint File Uploader - Gallery Browser
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
include 'common.inc';
$GLOBALS['lines'] = 15;
$GLOBALS['cols'] = 4;
SprintStandardHeader('File Browser');

if (! isset($_GET['Cat']) && ! isset($_POST['Cat'])) {
	ShowCategories();
	StandardFooter();
	exit();
}

$Cat = 0;

if (isset($_GET['Cat']))$Cat = $_GET['Cat'];

if (isset($_POST['Cat']))$Cat = $_POST['Cat'];
$sql = 'select * from ' . $GLOBALS['FileCategory Table'] . ' where CategoryID = ' . $Cat;
$result = RunQuery($sql);
$skip = 0;

if (isset($_GET['skip']))$skip = $_GET['skip'];
$skip2 = $skip;

while ($skip2 > 0) {
	$skip2 --;
	FetchAssoc($result);
}

ShowTable($result);
$data = FetchAssoc($result);

if ($data) {
	$skip += $GLOBALS['lines'] * $GLOBALS['cols'];
	echo "<a href=\"browse.php?Cat=$Cat&skip=$skip\">Next Page</a>";
}

DoneWithResult($result);
StandardFooter();


function ShowTable($result) {
	echo '<table border=1 cellpadding=3 cellspacing=0 align=center>';
	$i = $GLOBALS['lines'];
	
	while ($i > 0 && ShowRow($result)) {
		$i --;
	}
	
	echo '</table>';
}


function ShowRow($result) {
	echo '<tr>';
	$i = $GLOBALS['cols'];
	$r = ShowResult($result);
	
	while ($i > 1 && $r) {
		$r = ShowResult($result);
		$i --;
	}
	
	if (! $r) {
		echo "<td colspan=$i>&nbsp;</td>";
	}
	
	echo "</tr>\n";
	return $r;
}


function ShowResult($result) {
	$data = FetchAssoc($result);
	
	if (! $data)return 0;
	$filedata = GetFileData($data['FileID'], 'FileType, FileSize');
	$sql = 'select * from ' . $GLOBALS['FileDesc Table'] . ' where ID = ' . $data['DescID'] . ' order by ID desc';
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
	echo '<a href="dl.php/' . $data['FileID'] . '/' . $d2['FileName'] . '">';
	
	switch ($filedata['FileType']) {
		case 0:  // unknown
			echo '<img src="media/img/question.jpg">';
			break;

		case 1:  // gcd
			
		case 3:  // jad
			
		case 10:  // txt
			echo '<img src="media/img/text.gif">';
			break;

		case 2:  // qcp
			echo '<img src="media/img/cassette.jpg">';
			break;

		case 4:  // java
			echo '<img src="media/img/winzip.gif">';
			break;

		case 5:  // wbmp
			echo '<img src="media/img/file.jpg">';
			break;

		case 6:  // jpg
			
		case 7:  // png
			
		case 11:  // gif
			echo '<img src="thumb.php/' . $data['FileID'] . '/' . $d2['FileName'] . '">';
			break;

		case 8:  // pmd
			echo '<img src="media/img/film.jpg">';
			break;

		case 9:  // mid
			echo '<img src="media/img/clef.jpg">';
			break;
	}
	
	echo "</a><br>\n";
	echo substr($d2['DescText'], 0, 25) . ' &ndash; ' . FidianFileSize($filedata['FileSize'], true, true) . "\n";
	$fn = $d2['FileName'];
	
	if (strlen($fn) > 24)$fn = substr($fn, 0, 16) . '...' . substr($fn, - 6);
	echo "<br>$fn\n";
	echo '<br><a href="faq/index.php?Topic=jumpcode">Jump Code</a>:  <b>' . $d2['ID'] . "</b>\n";
	echo '</td>';
	return 1;
}


function ShowCategories() {
	$sql = 'select * from ' . $GLOBALS['Category Table'] . ' order by Type, Name';
	$r = RunQuery($sql);
	$L = array();
	
	while ($data = FetchAssoc($r)) {
		switch ($data['Type']) {
			case 'A':
				$name = 'Animations';
				break;

			case 'I':
				$name = 'Images';
				break;

			case 'R':
				$name = 'Ringers';
				break;

			default:
				$name = 'Unknown';
				break;
		}
		
		if (! isset($L[$name]))$L[$name] = array();
		$L[$name][$data['ID']] = $data['Name'];
	}
	
	foreach ($L as $name => $info) {
		echo "<h2 align=center>$name</h2>\n";
		echo '<p align=center>';
		
		foreach ($info as $id => $desc) {
			echo "<a href=\"browse.php?Cat=$id\">$desc</a><br>\n";
		}
		
		echo "</p>\n";
	}
}

