<?php

require_once('main.inc');

$Id = substr($_SERVER['PATH_INFO'],1);
$data = split("/", $Id);
$parm_width = 0;
$parm_height = 0;
if ($data[1])
{
    $Id = $data[1];
    list($parm_width, $parm_height) = split('x', $data[0]);
}
if ($Id == '') {
    echo 'Bad image number!';
    exit();
}
if ($parm_width != 0 && $parm_height == 0)
{
    echo 'Bad resize value!';
    exit();
}
settype($Id, 'integer');

$ConfigTime = strtotime($GLOBALS['thumbnail_size_time']);

$headers = getallheaders();

if (isset($headers['If-Modified-Since'])) {
    $sincets=HTTP11DateParser(trim($headers['If-Modified-Since']));
} else {
    $sincets=-1;
}


// Step 1:  Determine thumbnail size  (used for varible size thumbnails)
$sql = 'SELECT Width, Height FROM Images WHERE Id = ' . $Id;
$res = dbi_query($sql);
if (! $res) {
    BadSQL($sql);
}
$row = dbi_fetch_row($res);
dbi_free_result($res);
if (! $row) {
    die('Can not determine image height and width for image ' . $id);
}

$realWidth = $row[0];
$realHeight = $row[1];
list($thumbWidth, $thumbHeight) = ThumbnailSize($realWidth, $realHeight,
						$parm_width, $parm_height);


// Clean the thumbnail database (for debugging)
//if (! dbi_query('delete from Thumbnails'))
//  BadSQL('delete from Thumbnails');

// Step 1:  Look for saved thumbnail
$sql = 'SELECT Thumbnail, UNIX_TIMESTAMP(LastMod) FROM Thumbnails ' .
  'WHERE ImageId = ' . $Id . ' AND Width = ' . $thumbWidth . 
  ' AND Height = ' . $thumbHeight . ' AND UNIX_TIMESTAMP(LastMod) >= ' .
  $ConfigTime;

$res = dbi_query($sql);
if (! $res) {
    BadSQL($sql);
}
$row = dbi_fetch_row($res);
dbi_free_result($res);

if ($row) {
    // A thumbnail exists.
    if ($row[1] <= $sincets) {
	// Use browser's cached version
	ShowNotModified();
    }
    
    // Use the data from the thumbnail
    ShowImage($row[0], $row[1]);
}

// Need to generate thumbnail
$sql = 'SELECT Image, Format from Images WHERE Id = ' . $Id;
$res = dbi_query($sql);
if (! $res) {
    BadSQL($sql);
}

$row = dbi_fetch_row($res);
dbi_free_result($res);
if (! $row) {
    die('Can not find image ' . $Id);
}

$tempResult = OpenTempFile();
if (! $tempResult) {
    ShowOriginalImage($row[0], $row[1]);
}

$fp = $tempResult[0];
$Filename = $tempResult[1];

fwrite($fp, $row[0]);
fclose($fp);

if ($row[1] == 'image/jpeg')
  $func = 'ImageCreateFromJPEG';
elseif ($row[1] == 'image/gif')
  $func = 'ImageCreateFromGIF';
elseif ($row[1] == 'image/x-png')
  $func = 'ImageCreateFromPNG';
// Add the other three when we know their types

$im = @$func($Filename);

if (! $im) {
    unlink($Filename);
    // Can't make the image?  Very weird.
    // Hope the browser resizes this for us.
    ShowOriginalImage($row[0], $row[1]);
}

$newIm = ImageCreateTrueColor($thumbWidth, $thumbHeight);
ImageCopyResampled($newIm, $im, 0, 0, 0, 0, $thumbWidth, $thumbHeight,
		   $realWidth, $realHeight);
ImageDestroy($im);
ImageJPEG($newIm, $Filename, 85);
ImageDestroy($newIm);

$fp = fopen($Filename, 'rb');
if (! $fp) {
    ShowOriginalImage($row[0], $row[1]);
}
$data = fread($fp, filesize($Filename));
unlink($Filename);

$sql = 'DELETE FROM Thumbnails WHERE ';
//$sql .= 'LastMod < ' . $ConfigTime . ' OR (';
$sql .= 'ImageId = ' . $Id . ' AND Width = ' . $thumbWidth . 
  ' AND Height = ' . $thumbHeight;
//$sql .= ')';

if (! dbi_query($sql)) {
    BadSQL($sql);
}

$sql = 'INSERT INTO Thumbnails (ImageId, Width, Height, LastMod, Thumbnail) ' .
  'VALUES (' . $Id . ', ' . $thumbWidth . ', ' . $thumbHeight . ', NOW(), "' .
  addslashes($data) . '")';

if (! dbi_query($sql)) {
    BadSQL($sql);
}

ShowImage($data, time());


function ShowNotModified() {
    header('Cache-Control: cache');
    header('Content-type: image/jpeg');
    header('HTTP/1.1 304 Not Modified');
    exit();
}

function ShowImage($data, $lastmod) {
    header('Last-Modified: ' . timet2httpdate($lastmod));
    header('Pragma: ');
    header('Cache-Control: cache');
    header('Content-type: image/jpeg');
    echo $data;
    exit();
}
 
function ShowOriginalImage($data, $format) {
    header('Content-type: ' . $format);
    echo $data;
    exit();
}
