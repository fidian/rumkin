<?PHP

// File-based gallery.


$GLOBALS['Gallery Index Filename'] = 'index.txt';


// Index files should have a header line and one or more detail lines.
// Make sure every ID in the entire gallery is unique!
//
// Code|File|Folder|Desc|Resize
// 101|ringer.mid||Standard Telephone Ringer|
// 102|image.jpg||Boring Wallpaper|
// 103|image.jpg||Boring Wallper, Cropped|1
// 999|SysInfo.jar|Apps|SysInfo Midlet|
//
// Order of the fields is not important as long as every line follows
// what the first line says.


// Returns information about the file based on the jump code
// Returns false if the jump code or file is not found.
function Gallery_GetInfo($code)
{
    $DirList = array($GLOBALS['Gallery Filebase']);
    
    while (count($DirList))
    {
	$Dir = array_shift($DirList);
	$dirent = opendir($Dir);
	readdir($dirent);  // "."
	readdir($dirent);  // ".."
	while ($ent = readdir($dirent))
	{
	    if (is_dir($Dir . $ent))
	      $DirList[] = $Dir . $ent . '/';
	    elseif (file_exists($Dir . $ent) && 
		    strtolower($ent) == $GLOBALS['Gallery Index Filename'])
	    {
		// Parse the index file
		$entries = Gallery_ParseIndex($Dir . $ent);
		if (isset($entries[$code]))
		{
		    $out = array();
		    $what = array('ID' => 'Code',
				  'FileName' => 'File',
				  'Folder' => 'Folder',
				  'DescText' => 'Desc',
				  'ResizeMethod' => 'Resize');
		    foreach ($what as $k => $v)
		    {
			if (isset($entries[$v]))
			{
			    $out[$k] = $entries[$v];
			}
			else
			{
			    $out[$k] = false;
			}
		    }
		    
		    $out['RetrieveFile'] = $Dir . $out['FileName'];
		    if ($out['FileName'] == false ||
			! file_exists($out['RetrieveFile']))
		    {
			return false;
		    }
		    
		    $out['FileSize'] = filesize($out['RetrieveFile']);
		    $out['FileType'] = DetectFileType($out['RetrieveFile']);
		    
		    if ($out['FileType'] == 'jar' &&
			preg_match('/^(.*)\\.[^\\.\\\\]*$/', $out['FileName'],
				   $matches))
		    {
			$jadfn = $matches[1];
			if (file_exists($jadfn))
			{
			    $out['Jad'] = read_file($jadfn);
			}
		    }
		    
		    return $out;
		}
	    }
	}
	closedir($dirent);
    }
	
    return false;
}


// Returns an associative array of all files listed in the info file
// $return[ID] = array('ID' => ID, '...' => ...);
function Gallery_ParseIndex($fn)
{
    $data = read_file($fn);
    if (! $data)
    {
	return array();
    }
    
    $data = explode("\n");
    
    if (count($data) == 0)
    {
	return array();
    }
    
    $out = array();
    $Headers = array_shift($data);
    if (strpos('|' . $Headers . '|', '|ID|') < 0)
    {
	// Required ID field not found
	return array();
    }
    
    $Headers = explode('|', $Headers);
    
    foreach ($data as $line)
    {
	$line_bits = explode('|', $line);
	$line_out = array();
	foreach ($Headers as $num => $name)
	{
	    $line_out[$name] = $line_bits[$num];
	}
	$out[$line_out['ID']] = $line_out;
    }
    
    return $out;
}
