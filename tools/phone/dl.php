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

$info['FileData'] = GetFileData($info);
ResizeImages($id, &$info);

header('Content-Type: ' . GetBestMimeType($info['FileType']));
echo $info['FileData'];
