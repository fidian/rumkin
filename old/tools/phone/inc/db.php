<?php
/* Change SQL syntax around based on $GLOBALS['Database Type']
 * Currently, the only valid database type is mysql. */
function ConnectToDatabase() {
	if (isset($GLOBALS['Database Connection']))return;
	
	if ($GLOBALS['Database Type'] == 'mysql') {
		$GLOBALS['Database Connection'] = mysql_pconnect($GLOBALS['Database Server'], $GLOBALS['Database User'], $GLOBALS['Database Pass']);
		
		if (! $GLOBALS['Database Connection']) {
			die(mysql_errno() . ': ' . mysql_error());
		}
		
		$res = mysql_select_db($GLOBALS['Database DB'], $GLOBALS['Database Connection']);
		
		if (! $res) {
			die(mysql_errno() . ': ' . mysql_error());
		}
	} else {
		echo 'Invalid database type in config file.  Please correct.';
		exit();
	}
}


function DbSelect($what, $table, $criteria = '') {
	if (! $GLOBALS['Database Connection']) {
		ConnectToDatabase();
	}
	
	if ($GLOBALS['Database Type'] == 'mysql') {
		$sql = 'SELECT ' . $what . ' FROM ';
		
		if (isset($GLOBALS['Database Prefix']) && $GLOBALS['Database Prefix']) {
			$sql .= $GLOBALS['Database Prefix'];
		}
		
		$sql .= $table;
		
		if ($criteria) {
			$sql .= ' WHERE ' . $criteria;
		}
		
		$res = mysql_query($sql, $GLOBALS['Database Connection']);
		
		if (! $res) {
			echo 'Could not run query (' . $sql . ') == ' . mysql_error();
			exit;
		}
		
		return $res;
	} else {
		echo 'Improperly set database type.';
		exit();
	}
}


function DbFree($res) {
	if ($result === false || $result === true)return;
	
	if ($GLOBALS['Database Type'] == 'mysql') {
		mysql_free_result($res);
	} else {
		echo 'Improperly set database type.';
		exit();
	}
}


function DbFetch($res) {
	if ($GLOBALS['Database Type'] == 'mysql') {
		return mysql_fetch_assoc($res);
	} else {
		echo 'Improperly set database type.';
		exit();
	}
}

