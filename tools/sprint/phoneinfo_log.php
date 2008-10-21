<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

Header('Cache-Control: no-store, no-cache, must-revalidate');
include('common.inc');

// Send information to admin
$Str = "Came with phoneinfo.php\n";
foreach ($_SERVER as $k => $v)
{
    $Str .= "$k => $v\n";
}

if (isset($GLOBALS['Admin Email']))
  mail($GLOBALS['Admin Email'], 'Phone Information via phoneinfo.php',
       $Str, 'From: ' . $GLOBALS['Admin Email']);

?>

Thank you for coming here so I can log detailed
information about your model of phone!