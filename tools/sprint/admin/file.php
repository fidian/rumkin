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

if (isset($_POST['process']))HandleProcessRequest();

/* This removes the file types I don't care to ever have in my
 * gallery.  Your tastes may differ.  The FileType numbers are found
 * in config-dist.php */
$sql = 'update ' . $GLOBALS['File Table'] . ' set Seen = 1 where FileType in (0, 1, 3, 10)';
$result = RunQuery($sql);
DoneWithResult($result);
$sql = 'select ID, FileType, FileSize from ' . $GLOBALS['File Table'] . ' where Seen = 0 order by ID';
$result = RunQuery($sql);
ShowTable($result);
DoneWithResult($result);
StandardFooter();


function ShowTable($result) {
	echo "<form method=post action=file.php>\n";
	echo '<table border=1 cellpadding=3 cellspacing=0 align=center>';
	$i = $GLOBALS['lines'];
	
	while ($i > 0 && ShowRow($result)) {
		$i --;
	}
	
	echo '<tr><td colspan=' . $GLOBALS['cols'] . ' align=center>';
	echo '<input type=submit value="Commit Changes">';
	echo "</td></tr>\n";
	echo '</table></form>';
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
	echo '<a target=_blank href="../dl.php/' . $data['ID'] . '/' . $d2['FileName'] . '">';
	
	switch ($data['FileType']) {
		case 0:  // unknown
			echo '<img src="../img/question.jpg">';
			break;

		case 1:  // gcd
			
		case 3:  // jad
			
		case 10:  // txt
			echo '<img src="../img/text.gif">';
			break;

		case 2:  // qcp
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
	}
	
	echo "</a><br>\n";
	$fn = $d2['FileName'];
	
	if (strlen($fn) > 17)$fn = substr($fn, 0, 9) . '...' . substr($fn, - 6);
	echo $fn . ' &ndash; ' . FidianFileSize($data['FileSize'], true, true) . "<br>\n";
	ShowSelectList($data['ID'], $d2['ID']);
	echo '</td>';
	return 1;
}


function ShowSelectList($id, $desc) {
	echo '<input type=hidden name="desc[' . $id . ']" value="' . $desc . "\">\n";
	echo '<select name="process[' . $id . ']">';
	echo '<option value="">Skip ... Jump # ' . $desc . "\n";
	echo "<option value=\"DELETE\">Don't put in gallery\n";
	echo "<option value=\"\">--------------------\n";
	$sql = 'select * from ' . $GLOBALS['Category Table'] . ' order by Type, Name';
	$r = RunQuery($sql);
	
	while ($data = FetchAssoc($r)) {
		echo '<option value="' . $data['ID'] . '">[' . $data['Type'] . '] ' . $data['Name'] . "\n";
	}
	
	echo '</select>';
}


function HandleProcessRequest() {
	if (! is_array($_POST['process']))return;
	
	foreach ($_POST['process'] as $k => $v) {
		if ($v != '') {
			if ($v != 'DELETE') {
				$sql = 'insert into ' . $GLOBALS['FileCategory Table'] . ' (FileID, CategoryID, DescID) values (' . $k . ', ' . $v . ', ' . $_POST['desc'][$k] . ')';
				$r = RunQuery($sql);
				DoneWithResult($r);
			}
			
			$sql = 'update File set Seen = 1 where ID = ' . $k;
			$r = RunQuery($sql);
			DoneWithResult($r);
		}
	}
}

