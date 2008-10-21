<?PHP

include '../../functions.inc';

session_start();

if (! isset($_SESSION['Points']) || isset($_POST['Clear']))
  $_SESSION['Points'] = array();

$result = array();

if (isset($_POST['Clear']))
{
    $result[] = "Points cleared.";
}

if (isset($_POST['zip']) && $_POST['zip'])
{
    $result[] = AddZipPoint($_POST['zip']);
}

if (isset($_POST['lat']) && strlen($_POST['lat']) > 0 &&
    isset($_POST['lon']) && strlen($_POST['lon']) > 0)
{
    $result[] = AddLatLonPoint($_POST['lat'], $_POST['lon']);
}

foreach ($HTTP_POST_FILES as $File)
{
    if ($File['name'])
    {
	$type = explode('.', $File['name']);
	$type = strtoupper(array_pop($type));
	
	$prefix = $File['name'] . ':  ';
	
	if ($type == 'GPX')
	  $result[] = $prefix . ProcessGPX($File['tmp_name']);
	elseif ($type == 'LOC')
	  $result[] = $prefix . ProcessLOC($File['tmp_name']);
	elseif (! $_POST['Clear'])
	  $result[] = $prefix . 'Unknown file type (' . $type . ').';
    }
}

StandardHeader(array('title' => 'Waypoint Visualizer',
		     'topic' => 'gps',
		     'callback' => 'add_javascript'));

if (count($result))
{
    MakeBoxTop('center');
    foreach ($result as $k => $v)
    {
	if ($k)
	  echo "<br>";
	echo htmlspecialchars($v);
    }
    MakeBoxBottom();
}


if (count($_SESSION['Points']) == 0)
{
?>

<p>Upload your file of waypoints and have them plotted to a Google map.  The
points can be described in an LOC or a GPX file.  All uploaded information
is not saved on my server -- the data is processed live, reformatted, and
sent directly back to you.</p>

<dl>

<dt><a href="http://www.tom-carden.co.uk/googlegpx/">Google Maps GPX
Viewer</a></dt>
<dd>Basically the same thing, but on a different site using almost
completely different code.  Without this site, I wouldn't have thought to
reimplement it myself so that it could handle LOC files.  Mine only plots
the waypoints in the GPX file, but this one will show them for you.</dD>

<dt><a href="http://www.google.com/apis/maps/">Google Maps API</a>
<dd>Thanks to Google, everyone can now have interactive maps on their own
web sites.  Google has even tried to make things easy for other people to
use.  If you decide to copy this web page and put it on your own site to
show off points, make sure to get your own Google Maps API key!  They're free.

<dt><a href="zip_loc.txt.gz">Zip Code Locations</a>
<dd>According to the 2000 Census.  Locations are approximate, since zip
codes really do not define regions or areas.  Longitudes are positive, but
should be negative.  This download is a gzip compressed text file.  Most
modern archivers can properly decompress it.</dd>

</dl>

<?PHP
}
?>

<form method=post action=googlemap.php enctype="multipart/form-data">
GPX or LOC file: <input name=the_file type=file> &nbsp; - &nbsp;
<input type=submit value="Upload"><br>
U.S. Zip Code:  <input name=zip size=5> &nbsp; - &nbsp;
<input type=submit value="Add"><br>
Latitude:  <input name=lat size=10> &nbsp; - &nbsp;
Longitude:  <input name=lon size=10> &nbsp; - &nbsp;
<input type=submit value="Add"><br>
<input type=submit name="Clear" value="Clear Points">
</form>

<div id="map" style="height:500px; margin:10px 10px 10px 10px;"></div>

<?PHP

StandardFooter();


function add_javascript()
{
?>
<!-- Feel free to take this code.  I place it in the public domain.
     However, CHANGE THE KEY -- you get one for free from Google. -->
<script src="http://maps.google.com/maps?file=api&v=1&key=ABQIAAAApAIFdBd-VR8eN2IDiPllshRQ29WPShjkZm-4mvkBi40L1IxdPBSJmmoSzspUcUhLvlIa_ElIchaZYg" type="text/javascript"></script>
<script type="text/javascript"><!--

var map;

function mapOnLoad() {
    map = new GMap(document.getElementById("map"));
    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());
    map.centerAndZoom(new GPoint(1, 1), 16);

<?PHP
    $MinX = 180;
    $MinY = 90;
    $MaxX = -180;
    $MaxY = -90;
    foreach ($_SESSION['Points'] as $K => $P)
    {
	$s = $P[2];
	$s = str_replace('\\', '\\\\', $s);
	$s = str_replace('"', '\\"', $s);
	echo "    addPin(" . $P[0] . ',' .
	  $P[1] . ',"' . $s . "\");\n";

	if ($MinX > $P[0])
	  $MinX = $P[0];
	if ($MaxX < $P[0])
	  $MaxX = $P[0];
	
	if ($MinY > $P[1])
	  $MinY = $P[1];
	if ($MaxY < $P[1])
	  $MaxY = $P[1];
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

function addPin(lon, lat, text) {
    var p = new GPoint(lon, lat);
    var marker = new GMarker(p);
    GEvent.addListener(marker, "click", function() {
        marker.openInfoWindowHtml(text);
    });
    map.addOverlay(marker);
}


mapOldOnload = window.onload;
window.onload = mapOnLoad;

// --></script>
<?PHP
}


function ProcessGPX($fn)
{
    global $stack;
    
    $OldCount = count($_SESSION['Points']);
    $fp = fopen($fn, "r");

    if (! $fp)
    {
	return 'Unable to open GPX file.';
    }

    $stack = array();
    $parser = xml_parser_create();

    xml_set_element_handler($parser, "start_element", "stop_element");
    xml_set_character_data_handler($parser, "char_data");

    $buf = fgets($fp, 8192);
    while (! feof($fp) && xml_parse($parser, $buf, feof($fp)))
    {
	$buf = fgets($fp, 8192);
    }
    xml_parser_free($parser);
    fclose($fp);
    
    return 'GPX file processed.  ' . 
      (count($_SESSION['Points']) - $OldCount) .
      ' waypoints added.';
}


function ProcessLOC($fn)
{
    global $stack;
    
    $OldCount = count($_SESSION['Points']);
    $fp = fopen($fn, "r");

    if (! $fp)
    {
	return 'Unable to open LOC file.';
    }

    $stack = array();
    $parser = xml_parser_create();

    xml_set_element_handler($parser, "start_element", "stop_element");
    xml_set_character_data_handler($parser, "char_data");

    $buf = fgets($fp, 8192);
    while (! feof($fp) && xml_parse($parser, $buf, feof($fp)))
    {
	$buf = fgets($fp, 8192);
    }
    xml_parser_free($parser);
    fclose($fp);
    
    return 'LOC file processed.  ' . 
      (count($_SESSION['Points']) - $OldCount) .
      ' waypoints added.';
}


function start_element($parser, $name, $attrs)
{
    global $char_data, $stack, $Info;
    
    $Now = join(' ', $stack) . ' ' . $name;
    if ($Now == 'GPX WPT')
    {
	$Info = array('Name' => 'Unknown');
	$Info['Lat'] = $attrs['LAT'];
	$Info['Lon'] = $attrs['LON'];
    }
    elseif ($Now == 'LOC WAYPOINT')
      $Info = array();
    elseif ($Now == 'LOC WAYPOINT NAME')
      $Info['Name'] = $attrs['ID'];
    elseif ($Now == 'LOC WAYPOINT COORD')
    {
	$Info['Lat'] = $attrs['LAT'];
	$Info['Lon'] = $attrs['LON'];
    }
    
    $char_data = '';
    array_push($stack, $name);
}


function stop_element($parser, $name)
{
    global $char_data, $stack, $Info, $WPList;
    
    $Now = join(' ', $stack);

    if ($Now == 'GPX WPT')
      ProcessWaypoint($Info);
    elseif ($Now == 'GPX WPT NAME')
      $Info['Name'] = HTMLDecode($char_data);
    elseif ($Now == 'GPX WPT CMT')
      $Info['Comment'] = HTMLDecode($char_data);
    elseif ($Now == 'GPX WPT URL')
      $Info['URL'] = $char_data;
    elseif ($Now == 'GPX WPT URLNAME')
      $Info['URLName'] = HTMLDecode($char_data);
    elseif ($Now == 'GPX WPT SYM')
      $Info['Type'] = $char_data; // Often "Geocache-xxx"
    elseif (strncmp($Now, 'GPX WPT GROUNDSPEAK:CACHE ', 26) == 0)
    {
	if ($name == 'GROUNDSPEAK:PLACED_BY')
	  $Info['By'] = HTMLDecode($char_data);
	elseif ($name == 'GROUNDSPEAK:TYPE')
	  $Info['Type'] = $char_data;
	elseif ($name == 'GROUNDSPEAK:CONTAINER')
	  $Info['Container'] = $char_data;
	elseif ($name == 'GROUNDSPEAK:DIFFICULTY')
	  $Info['Difficulty'] = $char_data;
	elseif ($name == 'GROUNDSPEAK:TERRAIN')
	  $Info['Terrain'] = $char_data;
	elseif ($name == 'GROUNDSPEAK:NAME')
	  $Info['Name'] .= ' - ' . HTMLDecode($char_data);
    }
    elseif ($Now == 'LOC WAYPOINT')
      ProcessWaypoint($Info);
    elseif ($Now == 'LOC WAYPOINT NAME')
    {
	if (isset($Info['Name']) && $Info['Name'])
	  $Info['Name'] .= ' - ';
	$Info['Name'] .= HTMLDecode($char_data);
    }
    elseif ($Now == 'LOC WAYPOINT TYPE')
      $Info['Type'] = $char_data;
    elseif ($Now == 'LOC WAYPOINT LINK')
      $Info['URL'] = $char_data;
    
    $elem = array_pop($stack);
}


function char_data($parser, $data)
{
    global $char_data;
    
    $char_data .= $data;
}


function HTMLDecode($str)
{
    $str = str_replace("&apos;", "'", $str);
    $str = str_replace("&quot;", '"', $str);
    $str = str_replace("&gt;", ">", $str);
    $str = str_replace("&lt;", "<", $str);
    $str = str_replace("&amp;", "&", $str);
    $str = str_replace("<br>", "\n", $str);
    
    return $str;
}


function ProcessWaypoint($Info)
{
    $Set_Type = 0;
    
    $desc = $Info['Name'];
    if (isset($Info['By']) && $Info['By'])
      $desc .= "\nBy " . $Info['By'];
    if (isset($Info['Type']) && $Info['Type'])
    {
	if (substr($Info['Type'], 0, 9) == 'Geocache-')
	{
	    $Info['Type'] = strtoupper(substr($Info['Type'], 9, 1)) .
	      substr($Info['Type'], 10);
	}
	$desc .= "\n" . $Info['Type'];
	$Set_Type = 1;
    }
    if (isset($Info['Container']) && $Info['Container'])
    {
	if ($Set_Type == 0)
	  $desc .= "\n";
	else
	  $desc .= ' ';
	$desc .= '(' . $Info['Container'] . ')';
	$Set_Type = 1;
    }
    if ((isset($Info['Difficulty']) && $Info['Difficulty']) ||
	(isset($Info['Terrain']) && $Info['Terrain']))
    {
	if ($Set_Type == 0)
	  $desc .= "\n";
	else
	  $desc .= ' ';
	$desc .= '[' . $Info['Difficulty'] . '/' . $Info['Terrain'] . ']';
    }
    if (isset($Info['Comment']) && $Info['Comment'])
      $desc .= "\n" . $Info['Comment'];
    if (isset($Info['Desc']) && $Info['Desc'] &&
	$Info['Desc'] != $Info['Comment'])
      $desc .= "\n" . $Info['Desc'];
    
    $desc = htmlspecialchars($desc);
    
    if (isset($Info['URL']) && $Info['URL'])
      $desc .= "\n<a href=\"" . $Info['URL'] . '">Website</a>';

    // nl2br() keeps the newlines.
    $desc = str_replace("\n", "<br>", $desc);
    
    $_SESSION['Points'][$Info['Lat'] . ' ' . $Info['Lon']] = 
      array($Info['Lon'], $Info['Lat'], $desc);
}


function AddZipPoint($zip)
{
    $zip = trim($zip);
    
    if (strlen($zip) != 5 || preg_match('/[^0-9]/', $zip))
      return 'Invalid zip code.  Only five number zip codes are allowed.';
    
    $fp = fopen('zip_loc.txt', 'r');
    $line = fgets($fp);
    while (substr($line, 0, 5) != $zip && ! feof($fp))
    {
	$line = fgets($fp);
    }
    fclose($fp);
    
    $parts = explode(' ', trim($line));
    if ($parts[0] != $zip)
      return 'Zip code not found.';
    
    $_SESSION['Points']['Zip ' . $zip] = 
      array(- $parts[1], $parts[2], 'Zip Code ' . $zip);
    
    return 'Added zip code ' . $zip;
}


function DegreeConvert($s)
{
    $posneg = 1;
    
    if (preg_match('/[\\-SsWw]/', $s))
      $posneg = -1;
    
    $s = explode(' ', trim(preg_replace('/[^0-9\\.]+/', ' ', $s)));
    $d = 0;
    $factor = 1;
    
    foreach ($s as $ss)
    {
	$d += $ss * $factor;
	$factor /= 60;
    }
    
    return $d * $posneg;
}


function AddLatLonPoint($lat, $lon)
{
    $lat = DegreeConvert($lat);
    $lon = DegreeConvert($lon);
    
    $_SESSION['Points']['LatLon ' . $lat . ' ' . $lon] = 
      array($lon, $lat, 'Latitude ' . $lat . '<br>Longitude ' . $lon);
    
    return 'Point added at latitude ' . $lat . ', longitude ' . $lon;
}
