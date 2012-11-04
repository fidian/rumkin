<?php
/* Shows a standard table
 * 
 * $data is the HTML to show in the cells of the table
 * $extra is an associative array of extra parameters
 *   'OnlyPageOne' => true    Only shows page 1. */
function ShowTableWithLinks($data, $extra = false) {
	if ($extra === false || ! is_array($extra))$extra = array();
	
	if (isset($extra['OnlyPageOne']) && $extra['OnlyPageOne']) {
		$page = 1;
	} else {
		$page = 1;
		
		if (isset($_GET['Page']))$page = $_GET['Page'];
		
		if (isset($_POST['Page']))$page = $_POST['Page'];
		settype($page, 'integer');
		$max = ceil(count($data) / ($GLOBALS['List Rows'] * $GLOBALS['List Cols']));
		$page = min(max($page, 1), $max);
		$skip = ($page - 1) * $GLOBALS['List Rows'] * $GLOBALS['List Cols'];
		
		while ($skip --)array_shift($data);
	}
	
	if (! isset($extra['OnlyPageOne']) || ! $extra['OnlyPageOne'])ShowPageLinks($page, $max, $extra);
	
	if (isset($extra['DoFilter']) && $extra['DoFilter'])ShowExcludeForm();
	ShowTableWithLinks_Table($data, $extra);
	
	if (! isset($extra['OnlyPageOne']) || ! $extra['OnlyPageOne'])ShowPageLinks($page, $max, $extra);
}


function ShowTableWithLinks_Table(&$data, $extra) {
	echo '<table border=1 cellpadding=3 cellspacing=0 align=center>';
	$i = $GLOBALS['List Rows'];
	
	while ($i > 0 && ShowTableWithLinks_Row($data, $extra)) {
		$i --;
	}
	
	echo '</table>';
}


function ShowTableWithLinks_Row(&$data, $extra) {
	if (count($data) == 0)return 0;
	echo '<tr>';
	$i = $GLOBALS['List Cols'];
	
	while ($i >= 1 && count($data) > 0) {
		ShowTableWithLinks_Cell(array_shift($data), $extra);
		$i --;
	}
	
	if ($i) {
		echo "<td colspan=$i>&nbsp;</td>";
	}
	
	echo "</tr>\n";
	return count($data);
}


function ShowTableWithLinks_Cell($data, $extra) {
	if (isset($extra['CellCallback'])) {
		$func = $extra['CellCallback'];
		$func($data);
	} else {
		echo '<td align=center>';
		echo $data;
		echo "</td>\n";
	}
}


function ShowPageLinks($page, $max, $extra) {
	if ($max == 1)return;
	echo 'Show page: ';
	
	for ($i = 1; $i <= $max; $i ++) {
		if ($i != $page) {
			echo ' <a href="' . $_SERVER['PHP_SELF'] . '?Page=' . $i;
			$amp = 0;
			
			if (isset($extra['DoFilter']) && $extra['DoFilter'] && isset($GLOBALS['filter']) && count($GLOBALS['filter'])) {
				$amp = 1;
				echo '&filter=' . join(',', $GLOBALS['filter']);
			}
			
			if (isset($GLOBALS['size'])) {
				echo '&size=' . $GLOBALS['size'];
			}
			
			echo '">' . $i . '</a>';
		} else {
			echo " <b>$i</b>";
		}
	}
	
	echo "\n";
}


function ShowExcludeForm() {
	echo '<form method=post action="' . $_SERVER['PHP_SELF'] . '">';
	echo 'Min size:  <input type=text name=size value="';
	$size = 0;
	
	if (isset($GLOBALS['size']))$size = $GLOBALS['size'];
	echo $size . '"> kilobytes<br>';
	echo '<input type=submit value="Exclude">';
	echo '<input type=hidden name=skip value="0">';
	$OnOff = array();
	
	foreach ($GLOBALS['File Types'] as $i => $v) {
		$OnOff[$i] = 1;
	}
	
	if (isset($GLOBALS['filter'])) {
		foreach ($GLOBALS['filter'] as $f) {
			$OnOff[$f] = 0;
		}
	}
	
	foreach ($GLOBALS['File Types'] as $i => $v) {
		echo "<input type=checkbox value=$i name=filter[]";
		
		if ($OnOff[$i] == 0)echo ' CHECKED';
		echo '> ';
		
		if (is_array($v[0]))echo $v[0][0];
		else echo $v[0];
		echo '&nbsp; ';
	}
	
	echo "</form>\n";
}
