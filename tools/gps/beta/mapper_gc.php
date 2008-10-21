<?PHP

include '../geocaching.inc';

if (isset($_GET['gc'])) {
    $gc = $_GET['gc'];
}
if (! isset($gc) && isset($argv[1])) {
    $gc = $argv[1];
}

if (! isset($gc))
{
    echo 'No waypoint specified';
    exit();
}

$GC = strtoupper($gc);

set_time_limit(10);
$info = GetLocInfo($GC);

echo $info['Name'] . ' (' . $GC . ")\n" . 
  $info['Lat'] . "\n" . 
  $info['Lon'] . "\n" .
  '<a href="' . $info['URL'] . '">' . $info['Name'] . '</a><br />(' . 
  $GC . ')';