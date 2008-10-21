<?PHP

require '../../functions.inc';
require 'alltests.inc';

$Test = '';
if (! empty($_REQUEST['Test']))
  $Test = $_REQUEST['Test'];

StandardHeader(array('title' => 'Personality Tests: ' . $Test, 
		     'topic' => 'tests'));

if (! is_array($GLOBALS['Tests'][$Test]))
{
?>
	The test "<?= $Test ?>" could not be found.
<?PHP
    StandardFooter();
    exit();
}

$T = $GLOBALS['Tests'][$Test];

echo "<p>" . $T['Summary'] . "</p><hr>\n";
echo "<form method=post action=answers.php>";
echo "<input type=hidden name=Test value=\"" . htmlspecialchars($Test) . 
  "\">";

foreach ($T['Data'] as $k => $d)
{
    DrawQuestion($k, $d);
}

echo "<p><input type=submit value=\"Submit Your Answers\"></p>\n";
echo "</form>\n";

?>

<p><a href="index.php">Back to the Personality Test Index</a></p>

<?PHP
StandardFooter();


function DrawQuestion($num, $Data)
{
    if (! is_array($Data))
    {
	echo "<p>" . htmlspecialchars($Data) . "</p>\n";
	return;
    }

    echo "<p>" . htmlspecialchars($Data['Question']) . "\n";
    
    if (count($Data['Answers']) < 5)
    {
	foreach ($Data['Answers'] as $k => $a)
	{
	    echo "<br><input type=radio name=\"Q" . $num . 
	      "\" value=\"" . urlencode($k) . "\"> - " . 
	      htmlspecialchars($k) . "\n";
	}
    }
    else
    {
	echo "<select name=\"Q" . $num . "\">\n";
	foreach ($Data['Answers'] as $k => $a)
	{
	    echo "<option value=\"" . urlencode($k) . "\">" .
	      htmlspecialchars($k) . "\n";
	}
	echo "</select>\n";
    }
    
    echo "</p>\n";
}
