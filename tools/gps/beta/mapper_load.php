<html style="padding: 0px; margin: 0px;"><head><title>Load Points</title>
<?PHP

include '../../../functions.inc';
include '../../../inc/unzip.php';

$data = '';
if (isset($HTTP_POST_FILES) && is_array($HTTP_POST_FILES) &&
    count($HTTP_POST_FILES) > 0)
{
    $fn = $HTTP_POST_FILES['file']['tmp_name'];
    // $data can be a string (error) or an array (points)
    $data = ProcessFile($fn);
}

if (is_array($data)) {
    $data = str_replace('\\', '\\\\', $data);
    $data = str_replace('"', '\\"', $data);
    $data = str_replace("\n", '\\n', $data);
    $data = implode('\\n', $data);
?>
<script language="JavaScript">

var data = "<?PHP echo $data ?>";
data = data.split("\n");
window.opener.ProcessStandardResult(data);
window.close();
	
</script>
</head><body></body></html>
<?PHP
    exit();
}
?>
</head>
<body bgcolor="#666666">

<div style="padding: 5px; margin: 5px; border: 1px solid black;
background-color: #F0F0FF">
<?PHP
   if ($data != '') {
       echo '<p>' . htmlspecialchars($data) . '</p>';
   }
?>
<p>Upload your GPX or LOC file.  For a faster upload, you can upload a .zip
or a .gz file containing your points.</p>

<form method="post" action="mapper_load.php" enctype="multipart/form-data">
<table align=center>
<tr><td align=center>
  <input type="file" name="file">
</td></tr>
<tr><td align=center>
  <input type="submit" value="Upload GPX/LOC">
</td></tr>
</table>
</form>

</div>
</body></html>
<?PHP

function ProcessFile($fn) {
    $fp = @gzopen($fn, 'r');
    if (! $fp) {
       return "Error with uploaded file.  It may be too large.  Try " .
          "uploading a compressed version instead.";
    }

    $data = fread($fp, 4);
    rewind($fp);

    if ($data == '<?xm')
    {
       $GPX = LoadGPXFile($fp);
    }
    else
    {
        return "Unknown/unsupported file format.";
    }

    if (count($GPX) == 0)
    {
        return "No points loaded.";
    }

    $points = array();
    foreach ($GPX as $G)
    {
	$Set_Type = 0;
    
	$desc = $G['Name'];
	if (isset($G['By']) && $G['By'])
	  $desc .= "\nBy " . $G['By'];
	if (isset($G['Type']) && $G['Type'])
	{
	    if (substr($G['Type'], 0, 9) == 'Geocache-')
	    {
		$G['Type'] = strtoupper(substr($G['Type'], 9, 1)) .
		  substr($G['Type'], 10);
	    }
	    $desc .= "\n" . $G['Type'];
	    $Set_Type = 1;
	}
	if (isset($G['Container']) && $G['Container'])
	{
	    if ($Set_Type == 0)
	      $desc .= "\n";
	    else
	      $desc .= ' ';
	    $desc .= '(' . $G['Container'] . ')';
	    $Set_Type = 1;
	}
	if ((isset($G['Difficulty']) && $G['Difficulty']) ||
	    (isset($G['Terrain']) && $G['Terrain']))
	{
	    if ($Set_Type == 0)
	      $desc .= "\n";
	    else
	      $desc .= ' ';
	    $desc .= '[' . $G['Difficulty'] . '/' . $G['Terrain'] . ']';
	}
	if (isset($G['Comment']) && $G['Comment'])
	  $desc .= "\n" . $G['Comment'];
	if (isset($G['Desc']) && $G['Desc'] &&
	    $G['Desc'] != $G['Comment'])
	  $desc .= "\n" . $G['Desc'];
    
	$desc = htmlspecialchars($desc);
    
	if (isset($G['URL']) && $G['URL'])
	  $desc .= "\n<a href=\"" . $G['URL'] . '">Website</a>';

	// nl2br() keeps the newlines.
	$desc = str_replace("\r\n", "\n", $desc);
	$desc = str_replace("\r", "\n", $desc);
	$desc = str_replace("\n", "<br>", $desc);
	
	$points[] = $G['Name'] . "\n" . $G['Lat'] . "\n" .
	  $G['Lon'] . "\n" . $desc;
    }
    
    return $points;
}			    


function XML_Start($parser, $name, $attrs)
{
    $Now = join(' ', $GLOBALS['XML Stack']) . ' ' . $name;
    if ($Now == 'GPX WPT')
    {
	$GLOBALS['XML Node Info'] = array('Name' => 'Unknown',
					  'Lat' => $attrs['LAT'],
					  'Lon' => $attrs['LON']);
    }
    elseif ($Now == 'LOC WAYPOINT')
    {
	$GLOBALS['XML Node Info'] = array();
    }
    elseif ($Now == 'LOC WAYPOINT NAME')
    {
	$GLOBALS['XML Node Info']['Name'] = $attrs['ID'];
    }
    elseif ($Now == 'LOC WAYPOINT COORD')
    {
	$GLOBALS['XML Node Info']['Lat'] = $attrs['LAT'];
	$GLOBALS['XML Node Info']['Lon'] = $attrs['LON'];
    }
    
    $GLOBALS['XML Node Data'] = '';
    array_push($GLOBALS['XML Stack'], $name);
}


function XML_Stop($parser, $name)
{
    $Now = join(' ', $GLOBALS['XML Stack']);

    if ($Now == 'GPX WPT')
      $GLOBALS['GPX Data'][] = $GLOBALS['XML Node Info'];
    elseif ($Now == 'GPX WPT NAME')
      $GLOBALS['XML Node Info']['Name'] = HTMLDecode($GLOBALS['XML Node Data']);
    elseif ($Now == 'GPX WPT URL')
      $GLOBALS['XML Node Info']['URL'] = $GLOBALS['XML Node Data'];
    elseif ($Now == 'GPX WPT URLNAME')
      $GLOBALS['XML Node Info']['URL Name'] = 
      mb_convert_encoding($GLOBALS['XML Node Data'], 'HTML-ENTITIES', 'UTF-8');
    elseif ($Now == 'GPX WPT CMT')
      $GLOBALS['XML Node Info']['Comment'] = HTMLDecode($GLOBALS['XML Node Data']);
    elseif ($Now == 'GPX WPT SYM')
      $GLOBALS['XML Node Info']['Type'] = $GLOBALS['XML Node Data'];
    elseif (strncmp($Now, 'GPX WPT GROUNDSPEAK:CACHE ', 26) == 0)
    {
	if ($name == 'GROUNDSPEAK:PLACED_BY')
	  $GLOBALS['XML Node Info']['By'] = HTMLDecode($GLOBALS['XML Node Data']);
	elseif ($name == 'GROUNDSPEAK:TYPE')
	  $GLOBALS['XML Node Info']['Type'] = $GLOBALS['XML Node Data'];
	elseif ($name == 'GROUNDSPEAK:CONTAINER')
	  $GLOBALS['XML Node Info']['Container'] = $GLOBALS['XML Node Data'];
	elseif ($name == 'GROUNDSPEAK:DIFFICULTY')
	  $GLOBALS['XML Node Info']['Difficulty'] = $GLOBALS['XML Node Data'];
	elseif ($name == 'GROUNDSPEAK:TERRAIN')
	  $GLOBALS['XML Node Info']['Terrain'] = $GLOBALS['XML Node Data'];
	elseif ($name == 'GROUNDSPEAK:NAME')
	  $GLOBALS['XML Node Info']['Name'] .= ' - ' . HTMLDecode($GLOBALS['XML Node Data']);
    }
    elseif ($Now == 'LOC WAYPOINT')
      $GLOBALS['GPX Data'][] = $GLOBALS['XML Node Info'];
    elseif ($Now == 'LOC WAYPOINT NAME')
    {
	if (isset($GLOBALS['XML Node Info']['Name']) && $GLOBALS['XML Node Info']['Name'])
	  $GLOBALS['XML Node Info']['Name'] .= ' - ';
	$GLOBALS['XML Node Info']['Name'] .= HTMLDecode($GLOBALS['XML Node Data']);
    }
    elseif ($Now == 'LOC WAYPOINT TYPE')
      $GLOBALS['XML Node Info']['Type'] = $GLOBALS['XML Node Data'];
    elseif ($Now == 'LOC WAYPOINT LINK')
      $GLOBALS['XML Node Info']['URL'] = $GLOBALS['XML Node Data'];
    
    array_pop($GLOBALS['XML Stack']);
}


function XML_Data($parser, $data)
{
    $GLOBALS['XML Node Data'] .= $data;
}


function XML_Prepare()
{
    $GLOBALS['XML Stack'] = array();
    
    $parser = xml_parser_create();
    
    xml_set_element_handler($parser, 'XML_Start', 'XML_Stop');
    xml_set_character_data_handler($parser, 'XML_Data');
    
    return $parser;
}


function LoadGPXFile($fp)
{
    $GLOBALS['GPX Data'] = array();
    
    $parser = XML_Prepare();
    $buf = fgets($fp, 8192);
    while (! feof($fp) && xml_parse($parser, $buf, feof($fp)))
    {
	$buf = fgets($fp, 8192);
    }
    xml_parser_free($parser);
    fclose($fp);
    
    return $GLOBALS['GPX Data'];
}


function LoadGPXZipFile($fn)
{
    $GLOBALS['GPX Data'] = array();
    
    $list = unzip_list($fn);
    foreach ($list as $single_file)
    {
	$parser = XML_Prepare();
	xml_parse($parser, unzip($fn, $single_file['Name']), true);
	xml_parser_free($parser);
    }
    
    return $GLOBALS['GPX Data'];
}


function HTMLDecode($str)
{
    $str = str_replace("&apos;", "'", $str);
    $str = str_replace("&quot;", '"', $str);
    $str = str_replace("&gt;", ">", $str);
    $str = str_replace("&lt;", "<", $str);
    $str = str_replace("&amp;", "&", $str);
    $str = str_replace("<br>", "\n", $str);
    
    return $str;
}
