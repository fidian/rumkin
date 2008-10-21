<?PHP

// Disable Turck MMCache because it greatly slows things down.
// Weird, eh?
ini_set('mmcache.enable', 0);

// Include the county names file
require_once('tiger/counties.php');

// Database connection
$GLOBALS['County DB Connection'] = OpenDBConnection('Rumkin');

// Finds points inside of counties - returns county name of point.
// N and W are the coordinates
function PointCounty($N, $W)
{
    $sql = 'select area_no from county_bound_box where n1 >= ' . $N .
      ' and n2 <= ' . $N . ' and e1 <= ' . $W . ' and e2 >= ' . $W;
    $res = mysql_query($sql, $GLOBALS['County DB Connection']);
    $CountyHits = array();
    
    while ($data = mysql_fetch_row($res))
    {
	$CountyHits[] = $data[0];
    }
    
    if (count($CountyHits) == 0)
    {
	return '';
    }
    
    if (count($CountyHits) == 1)
    {
	return $GLOBALS['CountyNames'][$CountyHits[0]];
    }
    
    foreach ($CountyHits as $ch)
    {
	$query = 'select count(*) from county_boundaries ' .
	  'where area_no = ' . $ch . ' and n1 > ' . $N .
	  ' and n2 <= ' . $N . ' and ' . $W . ' < (e2 - e1) * (' . $N .
	  ' - n1) / (n2 - n1) + e1';
	$Res = mysql_query($query, $GLOBALS['County DB Connection']);
	$data = mysql_fetch_row($Res);
	mysql_free_result($Res);
	if ($data[0] % 2 > 0)
	{
	    return $GLOBALS['CountyNames'][$ch];
	}
    }
    
    return '';
}


// Point in polygon function
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
