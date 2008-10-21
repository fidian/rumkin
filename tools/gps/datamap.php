<!DOCTYPE html PUBLIC "-//W3C/DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<?PHP

// I should still do some of the things at
// http://www.mapki.com/index.php?title=Marker_Optimization_tips

include '../../functions.inc';
include 'utils.inc';

$GLOBALS['Points'] = array();

$Title = 'Google Map Plotter';
$filename = '';
$message = '';
$Colors = array();
$Icons = array();

if (isset($_GET['file']))
{
    $filename = $_GET['file'];
    if (preg_match('/[^a-z0-9]/', $fn))
      $message = 'Bad file name.';
    else
    {
	$message = LoadPoints($_GET['file']);
	if (file_exists($filename . '.inc'))
	  include_once($filename . '.inc');
    }
}

if (function_exists('After_Load'))
{
    After_Load();
}

StandardHeader(array('title' => $Title,
		     'topic' => 'gps',
		     'callback' => 'add_javascript',
		     'html' => 'xmlns="http://www.w3.org/1999/xhtml" ' .
		        'xmlns:v="urn:schemas-microsoft-com:vml"'));

if (strlen($message))
{
    MakeBoxTop('center');
    echo htmlspecialchars($message);
    MakeBoxBottom();
}


if (function_exists('Above_Map'))
{
    Above_Map();
}

?>
<div id="map" style="height:500px; margin:10px 10px 10px 10px;"></div>
<?PHP

if (function_exists('Below_Map'))
{
    Below_Map();
}

StandardFooter();


function add_javascript()
{
    global $Colors;
    global $Icons;
?>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<style type="text/css">
span.bu { font-size: 10pt;
          white-space: nowrap; }
v\:* { behavior: url(#default#VML); }
</style>
<!-- Feel free to take this code.  I place it in the public domain.
     However, CHANGE THE KEY.  You get one for free from Google. -->
<script src="http://maps.google.com/maps?file=api&v=1&key=ABQIAAAApAIFdBd-VR8eN2IDiPllshRQ29WPShjkZm-4mvkBi40L1IxdPBSJmmoSzspUcUhLvlIa_ElIchaZYg" type="text/javascript"></script>
<script type="text/javascript">

var map;
var icons = new Array();
<?PHP
    foreach ($Icons as $K => $V)
    {
?>
i = new GIcon();
i.image = "<?= $V['image'] ?>";
i.iconSize = new GSize(<?= $V['iconSize'] ?>);
<?PHP if (isset($V['shadow']) && $V['shadow'] != '') { ?>
i.shadow = "<?= $V['shadow'] ?>";
i.shadowSize = new GSize(<?= $V['shadowSize'] ?>);
<?PHP } ?>
i.iconAnchor = new GPoint(<?= $V['iconAnchor'] ?>);
i.infoWindowAnchor = new GPoint(<?= $V['infoWindowAnchor'] ?>);
icons[<?= $K ?>] = i;
<?PHP
    }
?>


function mapOnLoad() {
    map = new GMap(document.getElementById("map"));
    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());
    map.centerAndZoom(new GPoint(0, 0), 16);

<?PHP
    $MinX = 180;
    $MinY = 90;
    $MaxX = -180;
    $MaxY = -90;
    $Tracks = array();
    foreach ($GLOBALS['Points'] as $K => $P)
    {
        // The point is [0] = track number (0 = just a point)
	// [1] = lon, [2] = lat, [3] = desc
	$s = $P[3];
	$s = str_replace('\\', '\\\\', $s);
	$s = str_replace('"', '\\"', $s);
	echo '    addPin(' . $P[0] . ', ' . $P[1] . ',' .
	  $P[2] . ',"' . $s . "\");\n";
	  
	if (isset($Colors[$P[0]]))
	{
           if ($P[0] && isset($Tracks[$P[0]]))
	      $Tracks[$P[0]] .= ',';
 	   else
	      $Tracks[$P[0]] = '';
           $Tracks[$P[0]] .= $P[1] . ',' . $P[2];
	}

	if ($MinX > $P[1])
	  $MinX = $P[1];
	if ($MaxX < $P[1])
	  $MaxX = $P[1];
	
	if ($MinY > $P[2])
	  $MinY = $P[2];
	if ($MaxY < $P[2])
	  $MaxY = $P[2];
    }
    
    foreach ($Tracks as $K => $P)
    {
	settype($K, 'integer');
	echo '    addTrack([' . $P . '], ' . $K . ");\n";
    }
    
    if ($MinX <= $MaxX && $MinY <= $MaxY)
    {
?>
	
    map.centerAndZoom(new GPoint(<?= ($MaxX + $MinX) / 2 ?>, <?=
	($MaxY + $MinY) / 2 ?>), 2);
    var bounds = map.getBoundsLatLng();
    while ((bounds.minX > <?= $MinX ?> || bounds.maxX < <?= $MaxX ?> ||
	    bounds.minY > <?= $MinY ?> || bounds.maxY < <?= $MaxY ?>) &&
	   map.getZoomLevel() < 16)
    {	
        map.zoomTo(map.getZoomLevel() + 1);
	bounds = map.getBoundsLatLng();
    }	
<?PHP  
    }
?>

    if (mapOldOnload != null)
    {
        mapOldOnload();
    }
}

function addPin(index, lon, lat, text) {
    var p = new GPoint(lon, lat);
    var marker = new GMarker(p, icons[index]);
    GEvent.addListener(marker, "click", function() {
        marker.openInfoWindowHtml("<span class='bu'>" + text + "</span>");
    });
    map.addOverlay(marker);
}
	
function addTrack(lonlatarr, index) {
    var p = [];
	
    if (! lonlatarr || lonlatarr.length < 4)
        return;
	
    for (var i = 0; i < lonlatarr.length; i += 2)
    {
        p[p.length] = new GPoint(lonlatarr[i], lonlatarr[i + 1]);
    }
    
    var col = 0;
<?PHP
    
    foreach ($Colors as $k => $v)
    {
	echo "    if (index == $k) { col = \"$v\"; }\n";
    }
?>
    map.addOverlay(new GPolyline(p, col));
}


mapOldOnload = window.onload;
window.onload = mapOnLoad;

</script>
<?PHP
}


function LoadPoints($fn)
{
    $fn = trim(strtolower($fn));
    
    if (! file_exists($fn . '.txt'))
    {
	return 'Bad file name.';
    }
    
    $fp = fopen($fn . '.txt', 'r');
    LoadPointFile($fp);
    fclose($fp);
    
    return '';
}


function LoadPointFile($fp)
{
    $Header = explode('|', trim(fgets($fp)));
    while (! feof($fp))
    {
	$Line = explode('|', trim(fgets($fp)));
	if (! count($Line))
	  return;
	
	$Info = array();
	for ($i = 0; $i < count($Line); $i ++)
	{
	    $Info[$Header[$i]] = $Line[$i];
	}

	if (isset($Info['Lat']) && isset($Info['Lon']))
	  SavePoint($Info);
    }
}


function SavePoint($p)
{
    $p2 = array('Track' => 0, 'Lat' => 0, 'Lon' => 0, 'Desc' => '');
    
    if (isset($p['Track']))
    {
	$p2['Track'] = $p['Track'];
	settype($p2['Track'], 'integer');
    }
    
    if (isset($p['Lat']))
      $p2['Lat'] = DegreeConvert($p['Lat']);

    if (isset($p['Lon']))
      $p2['Lon'] = DegreeConvert($p['Lon']);
    
    if (isset($p['Cache']))
    {
	if (! isset($p['CacheName']))
	  $p['CacheName'] = $p['Cache'];
	
	$p2['Desc'] .= '<a href="http://www.geocaching.com/seek/cache_details.aspx?wp=' .
	  $p['Cache'] . '">';
    }

    if (isset($p['CacheName']))
      $p2['Desc'] .= $p['CacheName'];
    
    if (isset($p['Cache']))
      $p2['Desc'] .= '</a>';
    
    if (isset($p['UserID']))
    {
	if ($p2['Desc'] != '')
	  $p2['Desc'] .= '<br/>';
	$p2['Desc'] .= 'Moved by ' . $p['UserID'];
    }
    
    if (isset($p['Date']))
    {
	if ($p2['Desc'] != '')
	  $p2['Desc'] .= '<br/>';
	
	$y = substr($p['Date'], 0, 4);
	$m = substr($p['Date'], 4, 2) * 1;
	$d = substr($p['Date'], 6, 2);
	
	$Months = array('', 'January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August', 'September',
			'October', 'November', 'December');
	
	$p2['Desc'] .= $Months[$m] . ' ' . $d . ', ' . $y;
    }
    
    if (isset($p['Desc']))
    {
	if ($p2['Desc'] != '')
	  $p2['Desc'] .= '<br/>';
	$p2['Desc'] .= $p['Desc'];
    }
        
    $GLOBALS['Points'][] = 
      array($p2['Track'], $p2['Lon'], $p2['Lat'], $p2['Desc']);
}
