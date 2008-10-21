<?php

$Incoming = array('Test1Name', 'Test1Code', 'Test2Name', 'Test2Code',
    'InitCode', 'auto_evaluate', 'number', 'terminator');

foreach ($Incoming as $v)
{
    if (!isset($$v))
        $$v = '';
    elseif (get_magic_quotes_gpc())
        $$v = stripslashes($$v);
}

?><html><head><title>Test</title></head>
<body>
<form method=post action="<?= $PHP_SELF ?>">
<table>
  <tr>
    <td colspan=2>Code to initialize the tests: (Ran before each test)<br>
      <textarea name="InitCode" cols=50 rows=5><?=
      htmlspecialchars(trim($InitCode)) ?></textarea></td>
  </tr>
  <tr>
    <td align=right>Name of first test:</td>
    <td><input type=text size=20 name="Test1Name" value="<?= $Test1Name ?>">
    </td>
  </tr>
  <tr>
    <td colspan=2>The code for the first test:<br>
      <textarea name="Test1Code" cols=50 rows=5><?= 
      htmlspecialchars(trim($Test1Code)) ?></textarea></td>
  </tr>
  <tr>
    <td align=right>Name of second test:</td>
    <td><input type=text size=20 name="Test2Name" value="<?= $Test2Name ?>">
    </td>
  </tr>
  <tr>
    <td colspan=2>The code for the second test:<br>
      <textarea name="Test2Code" cols=50 rows=5><?=
      htmlspecialchars(trim($Test2Code)) ?></textarea></td>
  </tr>
  <tr>
    <td align=right>Test Termination:</td>
    <td><select name="terminator">
      <option value="iterations"<?=
        ($terminator == 'iterations')?' SELECTED':'' 
	?>>Run this many times:</option>
      <option value="test_time"<?=
        ($terminator == 'test_time')?' SELECTED':''
	?>>Time for both tests is over (seconds):</option>
      <option value="test_diff"<?=
        ($terminator == 'test_diff')?' SELECTED':''
	?>>Tests have a difference in time of (seconds):</option>
      </select><input type=text name=number value="<?= $number ?>"></td>
  </tr>
  <tr>
    <td colspan=2 align=center>
      <input type=submit name=submit value="Run Tests">
    </td>
  </tr>
</table>
</form>
<?php

if (isset($submit))
{

?>
<hr>
<p>Running the test code.  Just wait patiently.
This will run until it is done or the browser is closed.  The time limit
has been turned off.</p>
<?php

    if ($terminator == 'test_time')
    {
        $iterations = 1000;
        $diffTime = 0;
	echo "<p>Running test until the time to run both tests is over ";
	echo "$number seconds</p>\n";
	while ($diffTime < $number)
	{
            if ($diffTime * 10 <= $number)
	        $iterations *= 10;
 	    elseif ($diffTime * 5 <= $number)
	        $iterations *= 5;
	    else
	        $iterations *= 2;
	    echo "<p>Attempting $iterations iterations.</p>\n";
	    $Result = DoEvaluations($iterations);
	    $diffTime = $Result[0] + $Result[1];
	}
    }
    if ($terminator == 'test_diff')
    {
        $iterations = 1000;
        $diffTime = 0;
	echo "<p>Running test until the time difference between the two ";
	echo "tests is over $number seconds</p>\n";
	while ($diffTime < $number)
	{
            if ($diffTime * 10 <= $number)
	        $iterations *= 10;
 	    elseif ($diffTime * 5 <= $number)
	        $iterations *= 5;
	    else
	        $iterations *= 2;
	    echo "<p>Attempting $iterations iterations.</p>\n";
	    $Result = DoEvaluations($iterations);
	    $diffTime = $Result[0] - $Result[1];
	    if ($diffTime < 0)
	        $diffTime *= -1;
	}
    }
    else
        DoEvaluations($number);

    echo "<p>Test complete.</p>\n";
}



function DoEvaluations($iterations)
{
    global $InitCode, $Test1Code, $Test2Code, $Test1Name, $Test2Name;
    
    set_time_limit(0);
    flush();
    eval($InitCode);
    $startTime = time();
    for ($i = 0; $i < $iterations; $i ++)
    {
       eval($Test1Code);
    }
    $endTime = time();
    $TimeCode1 = $endTime - $startTime;
    
    echo "<p><b>" . htmlspecialchars($Test1Name) . 
        "</b> = $TimeCode1 seconds.<br>\n";

    flush();
    eval($InitCode);
    $startTime = time();
    for ($i = 0; $i < $iterations; $i ++)
    {
       eval($Test2Code);
    }
    $endTime = time();

    $TimeCode2 = $endTime - $startTime;
    
    echo "<b>" . htmlspecialchars($Test2Name) .
        "</b> = $TimeCode2 seconds.</p>\n";
	
    return array($TimeCode1, $TimeCode2);
}

?>
</body></html>
