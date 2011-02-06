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

$sql = 'select ID from FileDesc';
$ids = array();
$res = RunQuery($sql);
while ($row = FetchAssoc($res)) {
	$ids[] = $row['ID'];
}
echo "Found " . count($ids) . " ids\n";

// File Table
//  ID, Uploaded, Downloaded, DescFile, FileSize, FileMD5, FileData, FileType,
//  KeepAround, Width, Height, Seen
// FileDesc Table
//  ID, FileID, FileName, Folder, DescText, TimeStamp, GallerySuggestion,
//  FilePath
// FileCategory Table
//  FileID, CategoryID, DescID
// Category Table
//  ID, Name, Type
// FileThumb Table
//  ID, FileID, Width, Height, FileSize, FileType, TimeStamp, FileData
$results = array(
	'copied' => 0,
	'bad' => 0,
	'skipped' => 0,
);
foreach ($ids as $id) {
	$destDir = $GLOBALS['Upload Dir'] . $id;
	if (is_dir($destDir)) {
		$results['skipped'] ++;
	} else {
		$sql = 'select FileName, Folder, DescText, FilePath, DescFile, FileData, FileType, Width, Height from ' . $GLOBALS['FileDesc Table'] . ' as fd inner join ' . $GLOBALS['File Table'] . ' as f On fd.FileID = f.ID where fd.ID = ' . EscapeDB($id);
		$res = RunQuery($sql);
		if (! $res) {
			echo "Failure with DB\n";
			exit();
		}


		$row = FetchAssoc($res);

		if (! $row) {
			$results['bad'] ++;
		} else {
			mkdir($destDir);
			$meta = array(
				'name' => $row['FileName'],
				'folder' => $row['Folder'],
				'description' => $row['DescText'],
				'path' => $row['FilePath'],
				'type' => $row['FileType'],
				'width' => $row['Width'],
				'height' => $row['Height']
			);
			$meta = json_encode($meta) . "\n";
			file_put_contents($destDir . '/meta', $meta);

			if (! empty($row['DescFile'])) {
				$desc = $row['DescFile'];
				file_put_contents($destDir . '/desc', $desc);
			}

			file_put_contents($destDir . '/data', $row['FileData']);
			$results['copied'] ++;
		}

		DoneWithResult($res);
		showResults($results);
	}
}

showResults($results);




function showResults($results) {
	$o = array();
	foreach ($results as $k => $v) {
		$o[] = $k . ': ' . $v;
	}
	echo implode("\t", $o) . "\n";
}
