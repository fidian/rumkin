<?PHP

ini_set('mmcache.enable', 0);

// Include the county perimeter index file and county names file
require_once('tiger/county_bounds.php');
require_once('tiger/counties.php');
require_once('tiger/reduce.php');

// Finds points inside of counties - returns county name of point.

$test = array('http://maps.google.com/?ie=UTF8&ll=44.308127,-93.109131&spn=5.849016,10.305176&om=1',
	      'http://maps.google.com/?ie=UTF8&ll=44.079693,-95.460205&spn=5.871693,10.305176&om=1',
	      'http://maps.google.com/?ie=UTF8&ll=45.421588,-95.635986&spn=5.737153,10.305176&om=1',
	      'http://maps.google.com/?ie=UTF8&ll=47.554287,-93.779297&spn=5.516859,10.305176&om=1',
	      );

$v = $test[3];

$v = explode('&', $v);
$v = $v[1];
$v = explode('=', $v);
$v = $v[1];
$v = explode(',', $v);
$N = $v[0] * 1;
$W = $v[1] * 1;


$CountyHits = array();
foreach ($GLOBALS['CountyBounds'] as $k => $v)
{
    if ($N >= $v[0][0] && $N <= $v[0][1] &&
	$W >= $v[1][0] && $W <= $v[1][1])
    {
	// Potential hit.
	$CountyHits[] = $k;
    }
}
    
if (count($CountyHits) == 0)
{
    echo 'No hits.';
    exit();
}
    

$MapInfo = array();
DrawPoint($MapInfo, $N, $W);
foreach ($CountyHits as $ch)
{
//    echo $ch . "\n";
    require('tiger/parsed/county_' . $ch . '.php');
    foreach ($GLOBALS['CountyBounds' . $ch] as $k => $v)
    {
	$GLOBALS['CountyBounds' . $ch][$k] = ReduceLines($v);
    }
    DrawCounty($MapInfo, $GLOBALS['CountyBounds' . $ch]);
    
    foreach ($GLOBALS['CountyBounds' . $ch] as $perimeter)
    {
	if (PointInPolygon(array($N, $W), $perimeter))
	{
//	    echo "Yes, in county " . $GLOBALS['CountyNames'][$ch] . "\n";
	}
    }
}

// TODO:  Render map here.
$MinX = 180;
$MinY = 180;
$MaxX = -180;
$MaxY = -180;
foreach ($MapInfo as $v)
{
    if ($MinX > $v[0])
      $MinX = $v[0];
    if ($MaxX < $v[0])
      $MaxX = $v[0];
    if ($MinY > $v[1])
      $MinY = $v[1];
    if ($MaxY < $v[1])
      $MaxY = $v[1];
    if (count($v) > 2)
    {
	if ($MinX > $v[2])
	  $MinX = $v[2];
	if ($MaxX < $v[2])
	  $MaxX = $v[2];
	if ($MinY > $v[3])
	  $MinY = $v[3];
	if ($MaxY < $v[3])
	  $MaxY = $v[3];
    }
}

$Square = 2000;

$Scale = max($MaxX - $MinX, $MaxY - $MinY);
$Scale = ($Square - 1) / $Scale;

$gd = imagecreate($Square, $Square);
$bgcolor = imagecolorallocate($gd, $Square, $Square, $Square);
$color = imagecolorallocate($gd, 0, 0, 0);
foreach ($MapInfo as $v)
{
    if (count($v) > 2)
    {
	// Line
	imageline($gd, ($v[0] - $MinX) * $Scale,
		  ($v[1] - $MinY) * $Scale,
		  ($v[2] - $MinX) * $Scale,
		  ($v[3] - $MinY) * $Scale,
		  $color);
    }
    else
    {
	// Dot
	imagefilledellipse($gd, ($v[0] - $MinX) * $Scale,
			   ($v[1] - $MinY) * $Scale, 4, 4, $color);
    }
}

header('Content-type: image/jpeg');
imagejpeg($gd);
//echo "Done\n";


function DrawPoint(&$MapInfo, $N, $W)
{
    $MapInfo[] = array($N, $W);
}


function DrawLine(&$MapInfo, $A, $B)
{
    $MapInfo[] = array($A[0], $A[1], $B[0], $B[1]);
}


function DrawPoly(&$MapInfo, $Perimeter)
{
    $Perimeter = array_values($Perimeter);
    $Perimeter[] = $Perimeter[0];
    $last = false;
    foreach ($Perimeter as $cur)
    {
	if ($last)
	{
	    DrawLine($MapInfo, $last, $cur);
	}
	DrawPoint($MapInfo, $cur[0], $cur[1]);
	$last = $cur;
    }
}
function DrawCounty(&$MapInfo, $CountyPerimeters)
{
    foreach ($CountyPerimeters as $Perimeter)
    {
	DrawPoly($MapInfo, $Perimeter);
    }
}







// Point in polygon function
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

// Returns true or false if the point is inside the polygon.
// Point = array(X, Y)
// Polygon = array(array(X, Y), array(X, Y), array(X, Y), ...)
function PointInPolygon($Point, $Polygon)
{
//    echo "Point ($Point[0], $Point[1])\n";
//    echo "Polygon (" . count($Polygon) . ")\n";
    $Polygon = array_values($Polygon);
//    echo "Polygon (" . count($Polygon) . ")\n";
    $last = $Polygon[count($keylist) - 1];
    if ($last[0] != $Polygon[0][0] ||
	$last[1] != $Polygon[0][1])
    {
	$Polygon[] = array($Polygon[0][0], $Polygon[0][1]);
    }
//    echo "Polygon (" . count($Polygon) . ")\n";
    
    $ret = 0;
    for ($i = 1; $i < count($Polygon); $i ++)
    {
	if (((($Polygon[$i][1] <= $Point[1]) && 
	      ($Point[1] < $Polygon[$i - 1][1])) ||
	     (($Polygon[$i - 1][1] <= $Point[1]) &&
	      ($Point[1] < $Polygon[$i][1]))) &&
	    ($Point[0] < ($Polygon[$i - 1][0] - $Polygon[$i][0]) *
	     ($Point[1] - $Polygon[$i][1]) /
	     ($Polygon[$i - 1][1] - $Polygon[$i][1]) + $Polygon[$i][0]))
	{
	    $ret ^= 0x01;
	}
    }
    
    return $ret;
}


/*	      
 * int pnpoly(int npol, float *xp, float *yp, float x, float y)
 * {
 *    int i, j, c = 0;
 *    for (i = 0, j = npol-1; i < npol; j = i++) {
 *       if ((((yp[i]<=y) && (y<yp[j])) ||
 *            ((yp[j]<=y) && (y<yp[i]))) &&
 *           (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i]))
 *          c = !c;
 *    }
 *    return c;
 * }
 */