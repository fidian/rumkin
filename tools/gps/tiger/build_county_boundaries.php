<?PHP

ini_set('memory_limit', '256M');
set_time_limit(0);

require '../../../functions.inc';
require '../../../inc/unzip.php';


$conn = OpenDBConnection('Rumkin');

// Erase old tables
//mysql_query('delete from county_boundaries', $conn);
mysql_query('delete from county_bound_box', $conn);
//mysql_query('optimize table county_boundaries', $conn);
mysql_query('optimize table county_bound_box', $conn);


$fn = 'data/app_a03.txt';
$fp = fopen($fn, 'r');
$d = fread($fp, filesize($fn));
fclose($fp);
$d = str_replace("\r\n", "\n", $d);
$d = str_replace("\r", "\n", $d);
$FilesToRead = explode("\n", $d);

array_shift($FilesToRead);
array_shift($FilesToRead);
array_shift($FilesToRead);
array_shift($FilesToRead);

while (count($FilesToRead))
{
    if (preg_match('/^(..)     (...)     (.+)     (..)$/',
		   array_shift($FilesToRead), $matches))
    {
	echo "$matches[1] $matches[2] $matches[4]  $matches[3]";
	ReadCountyFile($matches[1], $matches[2], $matches[3], 
		       $matches[4], $conn);
	echo "  Done\n";
    }
}



function ReadCountyFile($StateCode, $CountyCode, $CountyName, $StateAbbr,
			$Conn)
{
    $d = unzip('data/' . $StateAbbr . '/tgr' . $StateCode . $CountyCode .
	       '.zip', 'TGR' . $StateCode . $CountyCode . '.RT1');
    $Lines = GetSegments($d);
    $d = unzip('data/' . $StateAbbr . '/tgr' . $StateCode . $CountyCode .
	       '.zip', 'TGR' . $StateCode . $CountyCode . '.RT2');
    $Lines = AugmentSegments($d, $Lines);
    $Lines = MergeLines($Lines);
    $MinMax = FindMinMax($Lines);

    echo '  - Saving ...';
    
    $sql = 'insert into county_bound_box (area_no, n1, e1, n2, e2) ' .
      'values (' . $StateCode . $CountyCode . ', ' . $MinMax[0][1] .
      ', ' . $MinMax[1][0] . ', ' . $MinMax[0][0] . ', ' .
      $MinMax[1][1] . ')';
    mysql_query($sql, $Conn);
    
    foreach ($Lines as $Line)
    {
	echo ' ' . count($Line) . ' segments';
//        SaveLine($Conn, $StateCode, $CountyCode, $Line);
    }
}



function SaveLine($conn, $StateCode, $CountyCode, $Line)
{
    $SQL = 'insert into county_boundaries (area_no, n1, n2, e1, e2) ' .
      'values (' . $StateCode . $CountyCode . ', ';
    
    $This = array_shift($Line);
    while (count($Line))
    {
	$Last = $This;
	$This = array_shift($Line);
	
	SaveLineSegment($conn, $SQL, $Last, $This);
    }
}


function SaveLineSegment($conn, $SQL, $NE1, $NE2)
{
    // Horizontal lines are skipped
    if ($NE1[0] == $NE2[0])
      return;
    
    // Force $NE1 to be the higher point
    if ($NE1[0] < $NE2[0])
    {
	$NE = $NE1;
	$NE1 = $NE2;
	$NE2 = $NE;
    }
    
    // Create line
    mysql_query($SQL . $NE1[0] . ', ' . $NE2[0] . ', ' .
		$NE1[1] . ', ' . $NE2[1] . ')');
}


function GetSegments(&$d)
{
    $d = str_replace("\r\n", "\n", $d);
    $d = str_replace("\r", "\n", $d);
    $d = explode("\n", $d);
    
    foreach ($d as $line)
    {
	// If the line is a county boundary line ...
	if ($line[15] == '1')
	{
	    $LineID = substr($line, 5, 10);
	    $StartP = substr($line, 190, 19);
	    $EndP = substr($line, 209, 19);
	    // Update the county min and max from coordinates
	    if (! isset($LineSet[$StartP . $EndP]))
	    {
		$SegmentList[$LineID] = array($StartP, $EndP);
		$LineSet[$StartP . $EndP] = $LineID;
	    }
	}
    }

    return $SegmentList;
}


function AugmentSegments(&$d, &$Lines)
{
    $d = str_replace("\r\n", "\n", $d);
    $d = str_replace("\r", "\n", $d);
    $d = explode("\n", $d);
    
    foreach ($d as $line)
    {
	$LineID = substr($line, 5, 10);
	if (isset($Lines[$LineID]))
	{
	    $OldEnd = array_pop($Lines[$LineID]);
	    
	    $str = substr($line, 18);
	    while ($str)
	    {
		$Point = substr($str, 0, 19);
		$str = substr($str, 19);
		if ($Point != '+000000000+00000000')
		{
		    $Lines[$LineID][] = $Point;
		}
	    }
	    
	    $Lines[$LineID][] = $OldEnd;
	}
    }
    
    return $Lines;
}


function MergeLines(&$Lines)
{
    $PointCount = array();
    foreach ($Lines as $k => $v)
    {
	for ($i = 0; $i < 2; $i ++)
	{
	    $val = $v[$i * (count($v) - 1)];
	    if (! isset($PointCount[$val]))
	    {
		$PointCount[$val] = array();
	    }
	    $PointCount[$val][] = $k;
	}
    }
    
    $Remap = array();
    foreach ($PointCount as $k => $v)
    {
	// $k is the start or end point
	// $v is the list of keys in $Lines that share that point
	if (count($v) == 2)
	{
	    $From = $v[0];
	    $To = $v[1];
	    while (isset($Remap[$From]))
	      $From = $Remap[$From];
	    while (isset($Remap[$To]))
	      $To = $Remap[$To];
	    
	    if ($From != $To)
	    {
		if ($Lines[$From][0] != $k)
		{
		    $Lines[$From] = array_reverse($Lines[$From]);
		}
		if ($Lines[$To][0] == $k)
		{
		    $Lines[$To] = array_reverse($Lines[$To]);
		}
		array_shift($Lines[$From]);
		$arr = array_merge($Lines[$To], $Lines[$From]);
		
		$Lines[$To] = $arr;
		$Remap[$From] = $To;
		unset($Lines[$From]);
	    }
	}
    }
    
    return $Lines;
}


function FindMinMax(&$Lines)
{
    $MinN = 180;
    $MaxN = -180;
    $MinW = 180;
    $MaxW = -180;
    foreach ($Lines as $k1 => $v)
      {
	  foreach ($v as $k2 => $p)
	  {
	      $w = - abs(substr($p, 0, 10)) / 1000000;
	      $n = abs(substr($p, 10)) / 1000000;
	      
	      $Lines[$k1][$k2] = array($n, $w);
	      $MinN = min($MinN, $n);
	      $MaxN = max($MaxN, $n);
	      $MinW = min($MinW, $w);
	      $MaxW = max($MaxW, $w);
	  }
    }
    return array(array($MinN, $MaxN), array($MinW, $MaxW));
}

