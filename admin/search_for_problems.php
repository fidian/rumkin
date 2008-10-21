<xmp><?PHP

ScanDir("..");


function ScanDir($path)
{
    $dh = opendir($path);
    
    while (($name = readdir($dh)) !== false)
    {
	if ($name != '.' && $name != '..')
	{
	    ProcessFile($path, $name);
	}
    }
}


function ProcessFile($path, $name)
{
    if (is_dir($path . '/' . $name))
      return ScanDir($path . '/' . $name);
    if (! preg_match("/\.(inc|php|txt)\$/i", $name))
      return;
    
    $data = @file_get_contents($path . '/' . $name);
    foreach (array('newline after close PHP tag' =>
		      "/\?>[\r]?[\n][^\r\n< \t]/",
		   'mysql_p?connect' => '/mysql_p?connect\\(/i',
		   'Redirect' =>
		       '/location: /i')
	     as $regname => $reg)
    {
	if (preg_match($reg, $data, $matches))
	{
	    echo $path . '/' . $name;
	    echo ", line ";
	    $pos = strpos($data, $matches[0]);
	    $d2 = substr($data, 0, $pos);
	    $d2 = preg_replace("/[^\n]/", '', $d2);
	    echo (strlen($d2) + 1) . " ($regname)\n";
	    flush();
	}
    }
}
