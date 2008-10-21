<?PHP    // -*- php -*-

function BadSQL($sql, $error = '') {
    $error = dbi_error();
    
    if (strlen($sql) > 1024)
    {
       $sql = substr($sql, 0, 1024);
       $sql .= '... [trimmed]';
    }

    die("<B>Error with query:</b><br><tt>$sql</tt><br><i>$error</i>");
}


function ThumbnailSize($width, $height, $towidth = 0, $toheight = 0) {
    if ($towidth == 0)
      $towidth = $GLOBALS['thumbnail_max_width'];
    if ($toheight == 0)
      $toheight = $GLOBALS['thumbnail_max_height'];
    
    $scaleFactor = $towidth / $width;
    if ($toheight / $height < $scaleFactor)
      $scaleFactor = $toheight / $height;
    if ($scaleFactor > 1)
      $scaleFactor = 1;
    
    $newWidth = $width * $scaleFactor;
    $newHeight = $height * $scaleFactor;
    settype($newWidth, 'integer');
    settype($newHeight, 'integer');
    
    return array($newWidth, $newHeight);
}


function HumanReadableSize($bytes) {
    $tags = array('b', 'k', 'meg', 'gig', 'terra');
    $index = 0;
    while ($bytes > 999 && isset($tags[$index + 1])) {
	$bytes /= 1024;
	$index ++;
    }
    $rounder = 1;
    if ($bytes < 10)
      $rounder *= 10;
    if ($bytes < 100)
      $rounder *= 10;
    $bytes *= $rounder;
    settype($bytes, 'integer');
    $bytes /= $rounder;
    
    return $bytes . ' ' . $tags[$index];
}


function OpenTempFile() {
    $try = 0;
    do {
	$try ++;
	$Filename = $GLOBALS['temp_dir'];
	if (substr($Filename, -1) != '/')
	  $Filename .= '/';
	$Filename .= md5($GLOBALS['PHP_SELF'] . '-' . time() . '-' . 
			 $try . '-' . rand());
	if (file_exists($Filename)) {
	    // Don't clobber
	    $fp = false;
	} else {
	    $fp = fopen($Filename, 'wb');
	}
    } while ($try <= 10 && ! $fp);

    if ($try > 10) {
	// Hope that the caller handles this exception
	return false;
    }
    
    return array($fp, $Filename);
}


// Return number of month (1-12)
// from it's abbreviation like 'Apr'.
function MonthToNumber($a)
{
    $m = array (
		"Jan" =>  1,
		"Feb" =>  2,
		"Mar" =>  3,
		"Apr" =>  4,
		"May" =>  5,
		"Jun" =>  6,
		"Jul" =>  7,
		"Aug" =>  8,
		"Sep" =>  9,
		"Oct" =>  10,
		"Nov" =>  11,
		"Dec" =>  12
		);
    if (isset($m[$a]))
      return $m[$a];
    $a = substr($a, 0, 3);
    $a = ucfirst(strtolower($a));
    if (isset($m[$a]))
      return $m[$a];
    return 0;
}


// Returns date formatted according to RFC 2616.
// e.g. Tue, 01 Aug 2000 18:08:06 GMT
function timet2httpdate($t)
{
    setlocale(LC_TIME, "C");
    return gmstrftime("%a, %d %b %Y %H:%M:%S GMT", $t);
}

// This function parses date as it
// defined in rfc 2616
// 3 basic formats are understood:
//
// Sun, 06 Nov 1994 08:49:37 GMT  ; RFC 822, updated by RFC 1123
// Sunday, 06-Nov-94 08:49:37 GMT ; RFC 850, obsoleted by RFC 1036
// Sun Nov  6 08:49:37 1994       ; ANSI C's asctime() format
//
// Returns value as unix timestamp or -1 is parsing failed.
//
function HTTP11DateParser($s)
{
    if(preg_match("/^[A-Z][a-z][a-z]\, (\d\d) ([A-Z][a-z][a-z]) (\d\d\d\d) (\d\d):(\d\d):(\d\d) GMT$/", $s, $p))
    {
	$m=MonthToNumber($p[2]);
	if(!isset($m))
	  return -1;
	return gmmktime($p[4], $p[5], $p[6], $m, $p[1], $p[3]);
	
    } else if(preg_match("/^[A-Z][a-z]+\, (\d\d)-([A-Z][a-z][a-z])-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/", $s, $p))
        {
	    $m=MonthToNumber($p[2]);
	    if(!isset($m))
	      return -1;
	    return gmmktime($p[4], $p[5], $p[6], $m, $p[1], $p[3]);
        } else if(preg_match("/^[A-Z][a-z][a-z] ([A-Z][a-z][a-z]) \s?(\d+) (\d\d):(\d\d):(\d\d) (\d\d\d\d)$/", $s, $p))
	    {
                $m=MonthToNumber($p[1]);
                if(!isset($m))
		  return -1;
                return gmmktime($p[3], $p[4], $p[5], $m, $p[2], $p[6]);
	    } else 
    {
	return -1;
    }
}


function QuoteForJavascript($str, $SkipOutsideQuotes = false) {
    $Replacements = array("/(<scr)(ipt)/i" => "$1\"+\"$2",
			  '/\\\\/' => '\\\\',
			  '/"/' => '\\"',
			  '/\'/' => '\\\'',
			  "/\r\n/" => "\n",
			  "/\r/" => "\n",
			  "/\n/" => "\"+\n\"");
    $str = preg_replace(array_keys($Replacements), 
			array_values($Replacements), $str);
    if (! $SkipOutsideQuotes)
      return '"' . $str . '"';
    return $str;
}


function ShowPopComment($comment)
{
?><script language="javascript">
    alert(<?PHP echo QuoteForJavascript($comment) ?>);
</script>
<?PHP
}

		
function Location($File = '') {
    $Hdr = 'Location: http://' . $_SERVER['HTTP_HOST'] .
      dirname($_SERVER['PHP_SELF']);
    if (substr($Hdr, -1) != '/')
      $Hdr .= '/';
    header($Hdr . $File);
    header('Connection: close');
    exit();
}


function ShotAtString($Y, $M, $D) {
    $MonthArr = array(1 => 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    if ($Y)
    {
       if ($M)
       {
          if ($D)
	     return $MonthArr[$M] . ' ' . $D . ', ' . $Y;
	  return $MonthArr[$M] . ' ' . $Y;
       }
       return $Y;
    }
    
    return '';
}
    
    
