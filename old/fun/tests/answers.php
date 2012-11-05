<?php

require '../../functions.inc';
require 'alltests.inc';
$Test = '';

if (! empty($_REQUEST['Test']))$Test = $_REQUEST['Test'];
StandardHeader(array(
		'title' => 'Personality Tests: ' . $Test,
		'topic' => 'tests'
	));

if (! is_array($GLOBALS['Tests'][$Test])) {
	
	?>
	The test "<?php echo $Test ?>" could not be found.
<?php
	
	StandardFooter();
	exit();
}

$T = $GLOBALS['Tests'][$Test];
echo '<p>' . $T['Summary'] . "</p><hr>\n";

foreach ($T['Data'] as $k => $d) {
	$answer = 'Q' . $k;
	DrawAnswer($k, $d, $answer);
}

?>

<p><a href="index.php">Back to the Personality Test Index</a></p>

<?php

StandardFooter();


function DrawAnswer($num, $Data, $answer) {
	if (isset($_REQUEST[$answer])) {
		$answer = $_REQUEST[$answer];
	} else {
		$answer = '';
	}
	
	if (! is_array($Data)) {
		echo '<p>' . htmlspecialchars($Data) . "</p>\n";
		return;
	}
	
	$answertxt = urldecode($answer);
	$expln = htmlspecialchars($Data['Answers'][$answertxt]);
	echo '<p>' . htmlspecialchars($Data['Question']) . "</p>\n";
	MakeBoxTop('center', 'width: 85%');
	
	if (isset($Data['AnswerDesc'])) {
		echo htmlspecialchars($Data['AnswerDesc']) . "<br><br>\n";
	}
	
	echo "<u>You selected:</u>  <b>$answertxt</b><br>";
	echo $expln . "\n";
	MakeBoxBottom();
}

