<?php

include '../../functions.inc';
$GLOBALS['TopLink'] = 'Back to the <a href="index.php?">Decision Tree Index</a>';
$TreeFile = '';

if (isset($_GET['Tree']))$TreeFile = $_GET['Tree'];
elseif (isset($_POST['Tree']))$TreeFile = $_POST['Tree'];

if ($TreeFile == '') {
	DisplayMainPage();
	exit();
}

$TreeFile = LoadTree($TreeFile);

if (! is_array($GLOBALS['Tree'])) {
	DisplayMainPage();
	exit();
}

$Node = 0;

if (isset($_GET['Node']))$Node = $_GET['Node'];
elseif (isset($_POST['Node']))$Node = $_POST['Node'];

if (! isset($GLOBALS['Tree'][$Node])) {
	DisplayNodeMissing($TreeFile, $Node);
	exit();
}

DisplayNode($TreeFile, $GLOBALS['Tree'][$Node]);
exit();


function DisplayMainPage() {
	StandardHeader(array(
			'title' => 'Decision Trees in PHP',
			'topic' => 'decision_tree'
		));
	
	?>

<p>Decision trees are useful ways to categorize items, solve problems, and
classify data.  With a series of questions, you can narrow down
possibilities very quickly.</p>

<p>This is a quick implementation of decision trees in PHP so that I could
write a problem solving tree for people having issues playing Diablo II.</p>

<p>Try the <a href="index.php?Tree=uploader">Phone Uploader Problem
Solving Tree</a></p>

<?php
	
	StandardFooter();
}


function LoadTree($name) {
	$name = preg_replace('/[^-a-z0-9_]/', '', $name);
	
	if (! file_exists($name . '.inc'))return '';
	include($name . '.inc');
	$GLOBALS['Tree'] = $Tree;
	$GLOBALS['TreeName'] = $TreeName;
	return $name;
}


function DisplayNodeMissing($TreeFile, $Node) {
	StandardHeader(array(
			'title' => $GLOBALS['TreeName'],
			'page' => 'decision_tree',
			'topic' => 'decision_tree'
		));
	echo 'Tree <b>' . $TreeFile . '</b> does not contain node <b>' . $Node . '</b>';
	StandardFooter();
}


function DisplayNode($TreeFile, $Data) {
	StandardHeader(array(
			'title' => $GLOBALS['TreeName'],
			'page' => 'decision_tree'
		));
	echo '<p>' . $GLOBALS['TopLink'] . '</p>';
	echo '<p>';
	echo $Data[0];
	echo '</p>';
	
	if (is_array($Data[1]))ShowOptions($TreeFile, $Data[1], false);
	elseif (isset($Data[2]))ShowOptions($TreeFile, array(
			'Yes' => $Data[1],
			'No' => $Data[2]
		), true);
	StandardFooter();
}


function ShowOptions($TreeFile, $Opt, $Horiz) {
	echo '<table border=4 cellpadding=5 cellspacing=2 align=center>';
	
	if ($Horiz)echo '<tr>';
	
	foreach ($Opt as $k => $v) {
		if (! $Horiz)echo '<tr>';
		echo '<td>';
		echo '<a href="index.php?Tree=' . $TreeFile . '&Node=' . urlencode($v) . '">' . $k . '</a>';
		echo '</td>';
		
		if (! $Horiz)echo '</tr>';
	}
	
	if ($Horiz)echo '</tr>';
	echo '</table>';
}

