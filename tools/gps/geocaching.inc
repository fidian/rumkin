<?PHP // -*- php -*-

include_once('utils.inc');

$Geocaching_User_ID = false;
$Geocaching_Viewstate = false;
$Geocaching_User_Name = 'fidian';
$Geocaching_User_Pass = 'Munchkin';


function GetLocInfo($ID)
{
    Geocache_Login();
    
    $Coords = array('Lat' => 0, 'Lon' => 0, 'Name' => 'Unknown');
    
    $Page = Geocache_GetPage('/seek/cache_details.aspx?pf=y&wp=' . $ID);
    $data = GetBetween($Page, '<span id="LatLon">', '</span>');
    
    if (! $data)
    {
	echo "No span!";
	return $Coords;
    }
    
    if (! preg_match('/([NS]) ([0-9]{2})[^0-9]*' .
		     '( [0-9]{2}\\.[0-9]{3}) ([EW]) ([0-9]{3})[^0-9]*' .
		     '( [0-9]{2}\\.[0-9]{3})/',
		     $data, $match))
    {
	echo "No Coords\n";
	return $Coords;
    }
    
    $Coords['Lat'] = DegreeConvert($match[1] . $match[2] . $match[3]);
    $Coords['Lon'] = DegreeConvert($match[4] . $match[5] . $match[6]);
    
    if (! preg_match('/<span id="CacheName">([^<]*)<\\/span>/', $Page, $match))
    {
	echo "No name\n";
	return $Coords;
    }
    
    $Coords['Name'] = $match[1];
    $Coords['URL'] = 'http://www.geocaching.com/seek/cache_details.aspx?wp=' .
      $ID;
    
    if (preg_match("/__VIEWSTATE\" value=\"([^\"]+)\"/", $Page, $match))
    {
	$Coords['Viewstate'] = $match[1];
    }
    
    return $Coords;
}


function Geocache_Login()
{
    global $Geocaching_User_ID, $Geocaching_Viewstate;
    global $Geocaching_User_Name, $Geocaching_User_Pass;
    
    if ($Geocaching_User_ID !== false)
    {
	return;
    }
    
    $p = Geocache_GetPage('/login/default.aspx?RESET=Y');
    $Geocaching_Viewstate = GetBetween($p, '__VIEWSTATE" value="',
				       '" />');
    $p = Geocache_GetPage('/login/default.aspx?RESET=Y',
			  array('__VIEWSTATE' => $Geocaching_Viewstate,
				'myPassword' => $Geocaching_User_Pass,
				'myUsername' => $Geocaching_User_Name,
				'cookie' => 'on',
				'Button1' => 'Login'));
    $Geocaching_User_ID = GetBetween($p, 'userid=', '; ');
}


function Geocache_GetPage($Page, $Post = false)
{
    global $Geocaching_User_ID;
    
    $fp = fsockopen('www.geocaching.com', 80);
    if ($Post === false)
    {
	fputs($fp, "GET $Page HTTP/1.1\r\n");
    }
    else
    {
	fputs($fp, "POST $Page HTTP/1.1\r\n");
    }
    fputs($fp, "Host: www.geocaching.com\r\n");
    if ($Geocaching_User_ID !== false)
    {
	fputs($fp, "Cookie: userid=$Geocaching_User_ID;\r\n");
    }
    if ($Post === false)
    {
	fputs($fp, "Connection: close\r\n\r\n");
    }
    else
    {
	if (is_array($Post))
	{
	    $p = '';
	    foreach ($Post as $k => $v)
	    {
		if ($p != '')
		{
		    $p .= '&';
		}
		$p .= $k . '=' . urlencode($v);
	    }
	    $Post = $p;
	}
	fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
	fputs($fp, "Content-length: " . strlen($Post) . "\r\n");
	fputs($fp, "Connection: close\r\n\r\n");
	fputs($fp, $Post . "\r\n");
    }
    $buf = '';
    while (! feof($fp))
    {
	$buf .= fgets($fp, 1024);
    }
    fclose($fp);
    
    return $buf;
}


function GetBetween($str, $start, $end)
{
    $bpos = strpos($str, $start);
    if ($bpos === false)
      return false;
    
    $epos = strpos($str, $end, $bpos);
    if ($epos === false)
      return false;
    
    $bpos += strlen($start);
    $epos -= $bpos;
    
    return substr($str, $bpos, $epos);
}
