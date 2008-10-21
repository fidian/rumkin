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

