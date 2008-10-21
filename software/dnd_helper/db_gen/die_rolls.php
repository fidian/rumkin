<?PHP

if (count($argv) < 2)
{
    echo "You must call this program with at least one die to roll.\n";
    echo "It generates all possible outputs and reformats them into\n";
    echo "a PSR-style table.\n";
    echo "\n";
    echo "Example:  Roll 2d4\n";
    echo "   die_rolls.php 4 4\n";
    exit();
}

$results = RollDie($argv, 1);
$results = AggregateRolls($results);
ksort($results);
foreach ($results as $roll => $times) {
    echo "$times:$roll\n";
}


function RollDie($argv, $i)
{
    if (! isset($argv[$i])) {
	return array(0);
    }
    
    $Base = RollDie($argv, $i + 1);
    
    $DieMax = $argv[$i];
    settype($DieMax, 'integer');
    if ($DieMax < 1) {
	return array(0);
    }
    
    $NewRolls = array();
    for ($roll = 1; $roll <= $DieMax; $roll ++)
    {
	foreach ($Base as $num) {
	    $NewRolls[] = $num + $roll;
	}
    }
    
    return $NewRolls;
}

function AggregateRolls($rolls) {
    $Agg = array();
    foreach ($rolls as $roll) {
	if (! isset($Agg[$roll])) {
	    $Agg[$roll] = 0;
	}
	$Agg[$roll] ++;
    }
    
    return $Agg;
}
