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

if (! isset($_REQUEST['num']))
{
    ErrorMessage('Jump code not defined!');
}

if (isset($_REQUEST['phoneid']))
{
    $id = $_REQUEST['phoneid'];
}
else
{
    $id = PhoneDataGet('ID');
}

$info = GetJumpCodeInfo($_REQUEST['num']);

if (! $info)
{
    ErrorMessage('You have specified an illegal jump code: ' . 
		 $_REQUEST['num']);
}

if ($info['FileType'] == 'jar')
{
    // Samsung VI660 requires a Content-Folder.
    // http://sprintdevelopers.com/article10.html
    $tweak = GetPhoneTweak('content-folder');
    if ($tweak && (! isset($info['Folder']) || ! $info['Folder']))
    {
	$info['Folder'] = $tweak;
    }
    
    // Get or generate a JAD file
    $jad = GetJad($info);

    header('Content-Type: ' . GetBestMimeType('jad'));
    echo $jad;
    exit(0);
}

// Force a phone ID so that dl.php will not detect a different phone
// and resize the picture differently.
if (! $id)
  $id = -1;

// Resize image if needed in order to get the correct file size.
ResizeImages($id, &$info);

header('Content-Type: ' . GetBestMimeType('gcd'));

echo 'Content-Type: ' . GetBestMimeType($info['FileType']) . "\n";
switch ($info['FileType'])
{
 case 'jpg':
 case 'wbmp':
    echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/image\n";
    break;
 case 'mid':
 case 'mp3':
    echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/ringer\n";
    break;
 default:
    echo 'Content-ID: ' . $GLOBALS['Content Vendor'] . "/data\n";
}

if (isset($info['DescText']) && trim($info['DescText']))
{
    echo 'Content-Name: ' . trim($info['DescText']) . "\n";
}
else
{
    echo "Content-Name: Untitled\n";
}

echo 'Content-Version: ' . $GLOBALS['Content Version'] . "\n";
echo 'Content-Vendor: ' . $GLOBALS['Content Vendor'] . "\n";
echo 'Content-URL: ' . $GLOBALS['Uploader Base URL'] .
  'dl.php?num=' . $info['ID'] . '&phoneid=' . urlencode($id) . "\n"

echo 'Content-Size: ' . $info['FileSize'] . "\n";
echo "\n";