<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

$Extra_Pre = '../';
include '../common.inc';

$GLOBALS['UA'] = array(
'None' => array('', ''),
'Firefox 1.0 (2000)' => array('Mozilla/5.0 (Windows; U; Windows NT 5.0; ' .
			      'en-US; rv:1.7.5) Gecko/20041107 ' .
			      'Firefox/1.0', ''),
'IE 6 (XP)' => array('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
		     ''),
'Netscape 4.8 (XP)' => array('Mozilla/4.8 [en] (Windows NT 5.1; U)', ''),
'Opera 7.54 (XP)' => array('Opera/7.54 (Windows NT 5.1; U) [en]', ''),
'-----' => array('', ''),
);

$res = RunQuery('select Make, Model, UserAgent, XWapProfile ' .
		'from Phones order by Make, Model');
while ($data = FetchAssoc($res))
{
    $k = $data['Make'] . ' ' . $data['Model'];
    if (isset($GLOBALS['UA'][$k]))
    {
	$num = 2;
	while (isset($GLOBALS['UA'][$k . ' (' . $num . ')']))
	{
	    $num ++;
	}
	$k .= ' (' . $num . ')';
    }
    $GLOBALS['UA'][$k] = array(HandleSQL($data['UserAgent']), 
		    HandleSQL($data['XWapProfile']));
}

CheckForLogin('restricted');

SprintStandardHeader('GCD Checker', 1);

ShowForm();

if (isset($_POST['URL']))
{
    ProcessForm();
}

StandardFooter();


function ShowForm()
{
   $val = "http://";
   if (isset($_POST['URL']))
      $val = $_POST['URL'];
      
?>

<form method=post action="<?PHP echo $PHP_SELF ?>">
URL:  <input type=text name=URL size=60 value="<?PHP echo $val ?>">
<br>
Act like:  <select name=UA><?PHP
      foreach ($GLOBALS['UA'] as $k => $v)
      {
	  echo "<option value=\"$k\"";
	  if (isset($_POST['UA']) && $k == $_POST['UA'])
	    echo " SELECTED";
	  echo ">$k</option>\n";
      }
?></select>
<br>
<input type=checkbox name="SprintHeaders"<?PHP
      if (isset($_POST['SprintHeaders']) && $_POST['SprintHeaders'])
	echo ' CHECKED';
?>> - Include special Sprint headers
<br>
<input type=checkbox name="ShowGCD"<?PHP
      if (isset($_POST['ShowGCD']) && $_POST['ShowGCD'])
	echo ' CHECKED';
?>> - Dump GCD File
<br>
<input type=submit value="Verify GCD">
</form>

<?PHP
}


function ProcessForm()
{
    $HeaderAdd = array();
    echo "<hr size=6 noshade>\n<pre>";
    if (isset($_POST['UA']) && isset($GLOBALS['UA'][$_POST['UA']]))
    {
	$data = $GLOBALS[$_POST['UA']];
	if ($data[0] != '')
	  $HeaderAdd['User-Agent'] = $data[0];
	if ($data[1] != '')
	  $HeaderAdd['X-Wap-Profile'] = $data[1];
	echo "Act like:  " . $_POST['UA'] . "\n";
    }
    if (isset($_POST['SprintHeaders']) && $_POST['SprintHeaders'])
    {
	$HeaderAdd['HTTP_CLIENT_ID'] = '5754875492658@sprintpcs.com';
	echo "Include Sprint headers\n";
    }
    
    HandleGCD($_POST['URL'], $HeaderAdd);
    echo "\n</pre>\n";
}

function HandleGCD($URL, $HeaderAdd)
{
    if (isset($_POST['ShowGCD']) && $_POST['ShowGCD'])
    {
    	list($headers, $content) = GetURL($URL, $HeaderAdd, true);
    }
    else
    {
        list($headers, $content) = GetURL($URL, $HeaderAdd);
    }

       
    if ($headers['CONTENT-TYPE'] != $GLOBALS['File Types'][FILE_TYPE_GCD][1] &&
	$headers['CONTENT-TYPE'] != $GLOBALS['File Types'][FILE_TYPE_JAD][1])
    {
	echo "GCD/JAD file has wrong MIME type\n";
	echo "MIME Type:  " . $headers['CONTENT-TYPE'] . "\n";
	echo "GCD MIME Type should be:  " . 
	  $GLOBALS['File Types'][FILE_TYPE_GCD][1] . "\n";
	echo "JAD MIME Type should be:  " . 
	  $GLOBALS['File Types'][FILE_TYPE_JAD][1] . "\n";
	
	$type = $headers['CONTENT-TYPE'];
	$type = explode(';', $type);
	$type = $type[0];
	if ($type != 'text/plain' && $type != 'text/html')
	{
	    return;
	}
    }
    
    if (strpos($content, "\r") !== false)
    {
	echo "WARNING:  GCD/JAD file contains non-standard newlines\n";
	$content = str_replace("\r\n", "\n", $content);
	$content = str_replace("\r", "\n", $content);
    }
    
    if (substr($content, -2) != "\n\n")
    {
	echo "WARNING:  GCD/JAD file doesn't end with two newlines\n";
    }
    
    if (preg_match('/^[^ ]+:  /', $content))
    {
	echo "WARNING:  Only one space comes after the : in the GCD/JAD file\n";
    }

    $gcd_data = SplitHeaders($content);
    $gcd_data2 = SplitHeaders($content, 1);
    
    if ($headers['CONTENT-TYPE'] == $GLOBALS['File Types'][FILE_TYPE_JAD][1])
    {
	echo "NORMAL:  Mapping JAD fields to GCD fields.\n";
	foreach (array('MIDlet-Jar-URL' => 'Content-URL',
		       'MIDlet-Jar-Size' => 'Content-Size',
		       'MIDlet-Name' => 'Content-Name',
		       'MIDlet-Version' => 'Content-Version',
		       'MIDlet-Vendor' => 'Content-Vendor') as $k => $v)
	{
	    $k = strtoupper($k);
	    if (isset($gcd_data2[$k]))
	    {
		$gcd_data[$v] = $gcd_data2[$k];
		$gcd_data2[strtoupper($v)] = $gcd_data2[$k];
	    }
	}
	$gcd_data['Content-Type'] = $GLOBALS['File Types'][FILE_TYPE_JAR][1];
	$gcd_data2['CONTENT-TYPE'] = $GLOBALS['File Types'][FILE_TYPE_JAR][1];
    }
    
    
    foreach (array('Content-Type', 'Content-Name', 'Content-Version',
		   'Content-Vendor', 'Content-URL', 'Content-Size')
	     as $tag)
    {
	if (! isset($gcd_data[$tag]))
	{
	    echo "ERROR:  GCD file is missing tag:  $tag\n";
	    if (isset($gcd_data2[strtoupper($tag)]))
	    {
		echo "WARNING:  Found when searching case insensitively\n";
	    }
	}
    }
   
    if (! isset($gcd_data2['CONTENT-TYPE']) ||
	! isset($gcd_data2['CONTENT-URL']) ||
	! isset($gcd_data2['CONTENT-SIZE']))
    {
	echo "ERROR:  Required tags are not found even when " .
	  "searching case insensitively.\n";
	echo "\nFILE DUMP\n";
	echo htmlspecialchars($content);
	return;
    }
    
    if (! preg_match('/https?:\\/\\//i', $gcd_data2['CONTENT-URL']))
    {
	echo "ERROR:  Content-URL address is not an absolute URL.\n";
	echo "URL:  " . $gcd_data2['CONTENT-URL'] . "\n";
	return;
    }
    
    $matched = false;
    foreach ($GLOBALS['File Types'] as $v)
    {
	if ($gcd_data2['CONTENT-TYPE'] == $v[1])
	  $matched = true;
    }
    if ($matched == false)
    {
	echo "WARNING:  MIME type expected doesn't match any type in " .
	  "allowed list.\n";
	echo "MIME Type:  " . $gcd_data2['CONTENT-TYPE'] . "\n";
    }
    
    if (strpos($gcd_data2['CONTENT-URL'], ' '))
    {
	echo "WARNING:  Spaces are not allowed in the URL.\n";
    }
    
    HandleFile($gcd_data2['CONTENT-URL'], $HeaderAdd,
	       $gcd_data2['CONTENT-TYPE'], $gcd_data2['CONTENT-SIZE']);
}


function HandleFile($url, $HeaderAdd, $mimetype, $size)
{
    list($headers, $content) = GetURL($url, $HeaderAdd);
    $errors = 0;
    
    if ($headers['CONTENT-TYPE'] != $mimetype)
    {
	echo "ERROR:  Mime type in GCD doesn't match URL\n";
	echo "GCD:  $mimetype   URL:  " . $headers['CONTENT-TYPE'] . "\n";
	$errors ++;
    }
    
    if (strlen($content) != $size)
    {
	echo "ERROR:  Size doesn't match stated size in GCD\n";
	echo "GCD:  $size   URL:  " . strlen($content) . "\n";
	$errors ++;
    }
    
    if ($errors == 0)
      echo "\nAll sanity checks pass.\n";
}


function GetURL($URL, $ExtraHeaders = false, $Dump = false)
{
    echo "Downloading URL:  $URL\n";
    
    if (! is_array($ExtraHeaders))
    {
	$ExtraHeaders = array();
    }
    
    $url_parsed = parse_url($URL);
    $ip = gethostbyname($url_parsed['host']);

    if (isset($url_parsed['port']))
      $port = $url_parsed['port'];
    else
      $port = 80;

    $fp = fsockopen($ip, $port);
    if (!$fp)
    {
	echo "Unable to contact $ip on port $port\n";
	return false;
    }

    $Accept = array();
    foreach ($GLOBALS['File Types'] as $k => $v)
    {
	if ($k != FILE_TYPE_GCD)
	  $Accept[] = $v[1];
    }
    if (isset($_POST['SprintHeaders']) && $_POST['SprintHeaders'])
      $Accept[] = 'text/x-pcs-gcd';

    $request = array();
    $request[] = 'GET ' . $url_parsed['path'] . ' HTTP/1.1';
//    $request[] = 'POST ' . $url_parsed['path'] . ' HTTP/1.1';
    $request[] = 'Accept: text/vnd.wap.wml, ' . implode(', ', $Accept) . ', */*';
    foreach ($ExtraHeaders as $k => $v)
    {
	$request[] = $k . ': ' . $v;
    }
    $request[] = 'Host: ' . $url_parsed['host'];
    $request[] = 'Connection: Close';
//    $request[] = 'Content-Length: 13';
//    $request[] = 'Content-Type: application/x-www-form-urlencoded';
//    $request[] = '';
//    $request[] = 'item=23206343';
    
    $request = implode("\r\n", $request) . "\r\n\r\n";
    
    fputs($fp, $request);

    $headers = '';
    while (($line = fgets($fp)) != "\r\n")
    {
	$headers .= $line;
    }
    
    if ($Dump)
    {
        echo "Server Response:\n";
	echo "========================================\n";
	echo htmlspecialchars($headers);
    }
    
    $headers = SplitHeaders($headers, 1);
    
    $content = '';
    if (strtolower($headers['TRANSFER-ENCODING']) == 'chunked')
    {
	while (! feof($fp))
	{
	    $line = fgets($fp);
	    if (strlen($line) <= 4)
	    {
		$line = hexdec($line);
		if ($line > 0)
		  $content .= fread($fp, $line);
		else
		  fread($fp, 4);
	    }
	    else
	      $content .= $line;
	}
    }
    else
    {
	while (! feof($fp))
	{
	    $content .= fread($fp, 4096);
	}
    }
    
    fclose($fp);
    
    if ($Dump)
    {
        echo "\n";
	echo htmlspecialchars($content);
	echo "\n========================================\n";
    }
    
    $StatusCode = $headers[0];
    $StatusCode = substr($StatusCode, strpos($StatusCode, ' ') + 1);
    $StatusCode = substr($StatusCode, 0, strpos($StatusCode, ' '));
    
    if ($StatusCode == 302)
    {
	echo "Redirect:  " . $headers['LOCATION'] . "\n";
	return GetURL($headers['LOCATION'], $ExtraHeaders, $Dump);
    }
    
    return array($headers, $content);
}


function HandleSQL($str)
{
    $str = preg_replace('/^%/', '', $str);
    $str = preg_replace('/%$/', '', $str);
    return $str;
}


function SplitHeaders($str, $ToUpper = 0)
{
    $str = str_replace("\r\n", "\n", $str);
    $str = str_replace("\r", "\n", $str);
    $str = explode("\n", $str);
    $headers = array();
    foreach ($str as $s)
    {
	if ($s != '')
	{
	    if (preg_match('/^([^ ]+): +(.*)$/', $s, $matches))
	    {
		if ($ToUpper)
		  $headers[strtoupper($matches[1])] = $matches[2];
		else
		  $headers[$matches[1]] = $matches[2];
	    }
	    else
	    {
		$headers[] = $s;
	    }
	}
    }
    return $headers;
}
