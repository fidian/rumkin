<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

include('common.inc');

$info = GetPathInfo();
$ID = $info[0];

if (count($info) < 2)
{
    echo "Bad path info\n";
    exit;
}

// Get a thumbnail image
setlocale(LC_TIME, 'C');
$data = GetFileData($ID, 'UNIX_TIMESTAMP(Uploaded) as UpTime');
Header('Last-Modified: ' . gmstrftime('%a, %d %b %Y %H:%M:%S GMT',
				      $data['UpTime']));

$dimensions = GetCustomImageSize($ID);
if ($dimensions[0] == 0 || $dimensions[1] == 0)
{
    $data = GetFileData($ID, 'FileData, FileType');
    $type = $data['FileType'];
    $data = $data['FileData'];
}
else
{
    list ($thumbX, $thumbY) = ImageBestFit($dimensions[0], $dimensions[1],
					   100, 100);
    if ($thumbX == $dimensions[0] && $thumbY == $dimensions[1])
    {
	$data = GetFileData($ID, 'FileData, FileType');
	$type = $data['FileType'];
	$data = $data['FileData'];
    }
    else
    {
	$data = ResizeCustomImage($ID, $thumbX, $thumbY, FILE_TYPE_JPG);
	$type = FILE_TYPE_JPG;
    }
}

Header('Content-Type: ' . $GLOBALS['File Types'][$type][1]);
Header('Content-Length: ' . strlen($data));

echo $data;
