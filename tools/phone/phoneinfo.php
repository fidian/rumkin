<?PHP
/* Mobile Phone File Uploader
 *
 * Copyright (C) 2003-2006 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * http://rumkin.com/tools/phone/
 */

require_once('inc/common.php');

NoCacheHeaders();

// Build list of headers
$Headers = array();
foreach ($_SERVER as $k => $v)
{
    if (substr($k, 0, 5) == 'HTTP_' &&
	$k != 'HTTP_CONNECTION' &&
	$k != 'HTTP_HOST' &&
	$k != 'HTTP_KEEP_ALIVE')
    {
	$Headers[] = htmlspecialchars(substr($k, 5) . ' = ' . $v);
    }
    elseif ($k == 'REMOTE_ADDR')
    {
	$Headers[] = htmlspecialchars($k . ' = ' . $v);
    }
}
$Headers = join("<br /><br />\n", $Headers);

$MediaTypes = array();
foreach (array(
	       'Audio: AAC' => 'aac',
	       'Audio: AMR' => 'amr',
	       'Audio: M4A' => 'm4a',
	       'Audio: MIDI' => 'mid',
	       'Audio: MMF' => 'mmf',
	       'Audio: MP3' => 'mp3',
	       'Audio: QCP' => 'qcp',
	       'Audio: WAV' => 'wav',
	       'Audio: Wma' => 'wma',
	       'Image: BMP' => 'bmp',
	       'Image: GIF' => 'gif',
	       'Image: JPG' => 'jpg',
	       'Image: PNG' => 'png',
	       'Image: WBMP' => 'wbmp',
	       'Java: JAD' => 'jad',
	       'Java: JAR' => 'jar',
	       'Video: 3GP' => '3gp',
	       'Video: MP4' => 'mp4',
	       'Video: PMD' => 'pmd',
	       ) as $k => $v)
{
    $Allowed = 0;
    foreach (GetMimeTypes($v) as $mime_type => $type_name)
    {
	if (BrowserAccepts($mime_type))
	  $Allowed = 1;
    }
    
    if ($Allowed)
    {
	$MediaTypes[$k] = 1;
    }
}

if (count($MediaTypes))
{
    $MediaTypes = join("<br />\n", array_keys($MediaTypes));
}
else
{
    $MediaTypes = "None listed.";
}


if (IsWapCapable())
{
    header('Content-Type: text/vnd.wap.wml');
    
    echo "<?xml version=\"1.0\"?>\n";
?>
<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>
<head>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<card id="index" title="Phone Info">
<p><a title="OK" href="jump.php">Jump Page</a> -
<a title="OK" href="#full">Details</a></p>
<p><?= GetMakeModelSize() ?></p>
<p>Supported media types:<br /><?= $MediaTypes ?></p>
<p><small>Other media types may be supported, but they were not reported.</small></p>
</card>
<card id="full" title="Headers">
<p><a title="OK" href="jump.php">Jump Page</a> -
<a title="OK" href="#index">Summary</a></p>
<p><small><?= $Headers ?></small></p>
</card>
</wml>
<?PHP
    
}
else
{

?><html><head><title>Phone Information</title>
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<body bgcolor=#FFFFFF>
<p><a href="jump.php">Jump Page</a></p>
<h2>Summary</h2>
<p><?= GetMakeModelSize() ?></p>
<p>Supported media types:<br /><?= $MediaTypes ?></p>
<p>Other media types may be supported, but they were not reported.</p>
<h2>Details</h2>
<p><?= $Headers ?></p>
</body></html>
<?PHP

}	