<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

include 'common.inc';

$num = false;
$PhoneID = false;
if (isset($_SERVER['PATH_INFO']) && strlen($_SERVER['PATH_INFO']) > 1)
{
    $Info = GetPathInfo();
    $num = $Info[0];
    if (isset($Info[1]))
      $PhoneID = $Info[1];
}
else
{
    if (isset($_GET['phoneid']))
      $PhoneID = $_GET['phoneid'];
    elseif (isset($_POST['phoneid']))
      $PhoneID = $_POST['phoneid'];

    if (isset($_GET['num']))
      $num = $_GET['num'];
    elseif (isset($_POST['num']))
      $num = $_POST['num'];
}


$GLOBALS['This Phone'] = GetPhoneInfo($PhoneID);


if ($num)
{
    settype($num, 'integer');
    $DescData = GetFileDesc($num);
    $FileData = GetFileData($DescData['FileID'], 'FileType');

    if (IsSprintPhone() || $FileData['FileType'] == FILE_TYPE_JAR)
    {
	$URL = $DescData['FileName'];
	$URL = substr($URL, 0, strrpos($URL, '.'));
	if ($FileData['FileType'] == FILE_TYPE_JAR)
	  $URL .= '.jad';
	else
	  $URL .= '.gcd';
	
	if (PhoneDataHas('ID'))
	  $URL = $GLOBALS['This Phone']['ID'] . '/' . $URL;
	
	Redirect($GLOBALS['URL Base'] . 'desc.php/' . 
		 $DescData['ID'] . '/' . $URL);
    }
    
    if (PhoneDataHas('ID'))
      $URL = $GLOBALS['This Phone']['ID'] . '/' . $URL;
	
    Redirect($GLOBALS['URL Base'] . 'dl.php/' .
	     $DescData['FileID'] . '/' . $DescData['FileName']);
}


// Wild guess about supporting WML
// If it says it supports WML, then use it.  If it is a phone, use it.
// Otherwise, use HTML.
$UseWAP = false;
if (PhoneDataHas(false))
  $UseWAP = true;
if (strpos($_SERVER['HTTP_ACCEPT'], 'text/vnd.wap.wml') !== false)
  $UseWAP = true;
if (PhoneDataHas('AvoidWAP') && $GLOBALS['This Phone']['AvoidWAP'])
  $UseWAP = false;


// Tell the user what phone I think they have
if (PhoneDataHas(false))
{
    if (isset($GLOBALS['This Phone']['Make']) &&
	isset($GLOBALS['This Phone']['Model']))
    {
	$MakeModelScreen = $GLOBALS['This Phone']['Make'] . ' ' .
	  $GLOBALS['This Phone']['Model'] . ' (screen size is ' .
	  $GLOBALS['This Phone']['Width'] . 'x' .
	  $GLOBALS['This Phone']['Height'] . ')';
    }
    else
    {
	$MakeModelScreen = 'Unknown phone (screen size is ' .
	  $GLOBALS['This Phone']['Width'] . 'x' .
	  $GLOBALS['This Phone']['Height'] . ')';
    }
}
else
{
    $MakeModelScreen = 'Unknown phone, unknown screen size';
}


if ($UseWAP)
{
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Content-Type: text/vnd.wap.wml');
    
    echo "<?xml version=\"1.0\"?>"
?>	
<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>	
<head>	
<meta http-equiv="Cache-Control" content="max-age=0" forua="true"/>
</head>
<template><do type="prev" label="BACK"><prev/></do></template>
<card id="jump" title="Rumkin.com">
<p>
Jump Code:
<input type="text" name="num" value="" format="*N" />
<a title="OK" href="jump.php/$(num)<?PHP
      if (PhoneDataHas('ID'))
      {
	  echo "/" . $GLOBALS['This Phone']['ID'];
      }
?>">Get File</a>
</p>
<p><?= $MakeModelScreen ?></p>
</card>
</wml>
<?PHP
    
}
else
{
    
?><html><head><title>Quick Jump</title>
<body bgcolor=#FFFFFF>
<form method=post action=jump.php>
Enter Jump Code:<br>
<input type=text name=num>
<br>
<input type=submit value="Download"><?PHP
      if (PhoneDataHas('ID'))
      {
	  echo '<input type="hidden" name="phoneid" value="';
	  echo $GLOBALS['This Phone']['ID'];
	  echo '" />';
      }
?>
</form>
<p><?= $MakeModelScreen ?></p>
</body></html>
<?PHP
    
}