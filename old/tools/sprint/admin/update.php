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
CheckForLogin('restricted');
SprintStandardHeader('Automatic Update', 1);
echo 'Getting list from ' . $GLOBALS['Phone Data URL'] . "<br>\n";
flush();
$fp = join('', file($GLOBALS['Phone Data URL']));
$PhoneData = @unserialize($fp);

if (! is_array($PhoneData)) {
	echo "Error retrieving data.  Hmmm.  Try again later?<br>\n";
	echo "What I did retrieve is displayed below.<br><br>\n";
	echo htmlspecialchars($fp);
	exit();
}

$C = 0;
$IDList = array();

foreach ($PhoneData as $Record) {
	if (! is_array($Record)) {
		echo "Problem with a record -- it is not a proper array<br>\n";
		echo "This issue is with the data on the update server.<br>\n";
		echo "Record information is shown below.<br><br>\n";
		echo htmlspecialchars($Record);
		exit();
	}
	
	if (! isset($Record['ID'])) {
		echo "ID not found for a record.  Aborting!<br>\n";
		exit;
		
		/* This is to save the user just in case of weird
		 * wacky bad evil nasty problems. */
	}
	
	$RecordID = $Record['ID'];
	$IDList[$RecordID] = $RecordID;
	$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where ID = ' . $RecordID;
	$res = RunQuery($sql);
	$Current = FetchAssoc($res);
	DoneWithResult($res);
	
	if (! $Current) {
		$C += InsertRecord($Record);
	} else {
		$C += UpdateRecord($Record, $Current, $RecordID);
	}
}


// Handle deletions
$sql = 'select * from ' . $GLOBALS['Phones Table'];
$res = RunQuery($sql);

while ($Current = FetchAssoc($res)) {
	if (! isset($IDList[$Current['ID']])) {
		$sql = 'delete from ' . $GLOBALS['Phones Table'] . ' where ID = ' . $Current['ID'];
		echo htmlspecialchars($sql) . "<br>\n";
		$C ++;
	}
}

DoneWithResult($res);
echo "<br>\nSuccess!  ($C changes)";


function InsertRecord($Record) {
	$keys = array();
	$values = array();
	
	foreach ($Record as $k => $v) {
		$keys[] = $k;
		$values[] = '\'' . EscapeDB($v) . '\'';
	}
	
	$sql = 'insert into ' . $GLOBALS['Phones Table'] . ' (' . join(', ', $keys) . ') values (' . join(', ', $values) . ')';
	echo htmlspecialchars($sql) . "<br>\n";
	DoneWithResult(RunQuery($sql));
	return 1;
}


function UpdateRecord($Record, $Current, $RecordID) {
	$Changes = 0;
	
	// WILL have issues if your fields are not the same case as mine
	foreach ($Record as $k => $v) {
		if ($k != 'ID') {
			if (! isset($Current[$k])) {
				// Case sensitive.  Yes, it does does does does matter.
				echo "Database structure doesn't match source!!<br>\n";
				echo "ABORTING!  Update your database structure!<br>\n";
				exit();
			}
			
			if ($Current[$k] != $v) {
				$sql = 'Update ' . $GLOBALS['Phones Table'] . ' set ' . $k . ' = \'' . EscapeDB($v) . '\' where ID = ' . $RecordID;
				echo htmlspecialchars($sql) . "<br>\n";
				DoneWithResult(RunQuery($sql));
				$Changes ++;
			}
		}
	}
	
	return $Changes;
}

