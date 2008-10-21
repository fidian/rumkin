<?PHP

$filename = substr($_SERVER['PATH_INFO'], 1);
$i = strpos($filename, '.');
if ($i !== false)
  $filename = substr($filename, 0, $i);

if (! $filename)
{
    echo "No data file specified.\n";
    exit();
}

if (preg_match('/[^a-z0-9]/', $filename))
{
    echo "Bad data file.\n";
    exit();
}

if (file_exists($filename . '.inc'))
  include_once($filename . '.inc');

Header('Content-type: application/earthviewer');

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?><kml xmlns="http://earth.google.com/kml/2.0">
<NetworkLink>
  <name><?PHP echo $Title ?> (Network)</name>
<?PHP
if (isset($KMLDesc))
  echo '  <description><![CDATA[' . $KMLDesc . ']]></description>';
else
  echo '  <description />';
echo "\n";

?>
  <open>0</open>
  <Url>
    <href>http://rumkin.com/tools/gps/kml.php/<?PHP echo $filename ?>.kml</href>
  </Url>
</NetworkLink>
</kml>
<?PHP
