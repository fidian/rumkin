<?PHP

$hits = array();
for ($i = 1; $i < 5; $i ++)
{
    for ($j = 1; $j < 5; $j ++)
    {
	for ($k = 1; $k < 5; $k ++)
	{
	    for ($l = 1; $l < 5; $l ++)
	    {
		$dice = DropLowest(array($i, $j, $k, $l));
		$val = SumDice($dice);
		$val += 6;
		if (! isset($hits[$val]))
		  $hits[$val] = 0;
		$hits[$val] ++;
	    }
	}
    }
}

echo "<pre>";
var_dump($hits);
echo "\n</pre>";

$total = 0;
$count = 0;
foreach ($hits as $k => $h)
{
    $total += $k * $h;
    $count += $h;
}

echo "Avg:  " . ($total / $count);

function DropLowest($a)
{
    if (! is_array($a))
      return array();
    
    $ret = array();
    
    $lowest_val = array_pop($a);

    foreach ($a as $i)
    {
	if ($i < $lowest_val)
	{
	    $ret[] = $lowest_val;
	    $lowest_val = $i;
	}
	else
	{
	    $ret[] = $i;
	}
    }
    
    return $ret;
}

function SumDice($a)
{
    if (! is_array($a))
      return 0;
    
    $sum = 0;
    foreach ($a as $i)
      $sum += $i;
    
    return $sum;
}