<?PHP
/* Sprint File Uploader - Gallery Browser
 *
 * Copyright (C) 2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

include 'common.inc';
include 'upload.inc';

SprintStandardHeader('File Gallery');

$GLOBALS['cols'] = 4;

if (isset($_GET['Path']))
  $Path = $_GET['Path'];
elseif (isset($_POST['Path']))
  $Path = $_POST['Path'];
else
  $Path = '';

$Path = str_replace('\\', '/', $Path);
$Path = str_replace('.', '', $Path);
$Path = str_replace('~', '', $Path);
$Path = preg_replace('|//+|', '/', $Path);
if ($Path[0] == '/')
  $Path = substr($Path, 1, strlen($Path) - 1);
if ($Path[strlen($Path)] == '/')
  $Path = substr($Path, 0, strlen($Path) - 1);

if ($Path == '')
{
?>

<p>I am looking for cool files that you think should be in the gallery.  If
you know of free games, nifty applications, beautiful wallpapers or catchy
ringers, please email me the files so I can put them in here!</p>

<?PHP
}

ShowPage($Path);

StandardFooter();



function ShowPage($Path)
{
    $FullPath = $GLOBALS['Gallery Directory'] . $Path;
    if (! is_dir($FullPath))
    {
	echo "Not a directory.  Stop trying to hack.\n";
	return;
    }
    
    // Load directories and files
    $dir = opendir($FullPath);
    $files = array();
    $dirs = array();
    while ($ent = readdir($dir))
    {
	if ($ent == '.' || $ent == '..' || $ent == 'index.txt')
	{
	    // Ignore
	}
	elseif (is_dir($FullPath . '/' . $ent))
	{
	    $dirs[] = $ent;
	}
	else
	{
	    $files[$ent] = $ent;
	}
    }
    closedir($dir);
    
    // Read file descriptions if possible
    $filedesc = array();
    if (file_exists($FullPath . '/' . 'index.txt'))
    {
	foreach (file($FullPath . '/' . 'index.txt') as $l)
	{
	    $l = trim($l);
	    $line = explode('|', $l);
	    $key = array_shift($line);
	    if (! isset($line[1]))
	      $line[1] = '';
	    
	    // Returns a 2-dimentional array
	    $line[2] = FindCodeByPath($key, $Path, $line[0]);
	    
	    // Turn the 2-dimentional array into separate elements in the
	    // new array
	    $line[3] = $line[2][1];
	    $line[2] = $line[2][0];
	    
	    if (isset($files[$key]))
	    {
		$filedesc[$key] = $line;
	    }
	}
    }
    
    ShowPathLinks($Path);
    ShowSubdirs($Path, $dirs);

    if (count($filedesc))
    {
	echo "<table border=1 cellpadding=3 cellspacing=0 align=center>";
	$shown = 0;
	$lines = 0;
	asort($filedesc);
	foreach ($filedesc as $fn => $fd)
	{
	    if ($shown == 0)
	    {
		echo "<tr>";
		$lines ++;
	    }
	    
	    ShowFile($FullPath, $fn, $fd);
	    
	    $shown ++;
	    if ($shown == $GLOBALS['cols'])
	    {
		echo "</tr>";
		$shown = 0;
	    }
	}
	if ($shown > 0)
	{
	    if ($lines > 1)
	    {
		echo "<td colspan=" . ($GLOBALS['cols'] - $shown) . 
		  ">&nbsp;</td>";
	    }
	    echo "</tr>";
	}
	echo "</table>";
    }
}


function FindCodeByPath($File, $Path, $Desc)
{
    $fp = $Path . '/' . $File;
    $ffp = $GLOBALS['Gallery Directory'] . $fp;
    $res = RunQuery('select ID, FileID from ' . $GLOBALS['FileDesc Table'] .
		    ' where FilePath = "' .
		    addslashes($fp) . '" and DescText = "' .
		    addslashes($Desc) . '"');
    $data = FetchAssoc($res);
    DoneWithResult($res);

    if (isset($data) && $data)
      return array($data['ID'], $data['FileID']);
    
    // Drat.  Need to add it.
    $ext = $File;
    $ext = substr($ext, strrpos($ext, '.') + 1);
    $filetype = GetFileType($ext);
    $safefn = SafeFilename($File);
    if (strtoupper($ext) != 'JAR')
    {
	$desc_data = false;
    }
    else
    {
	// This probably won't work if you have safe mode enabled.
	$cmd = 'unzip -pC "' . $ffp . '" META-INF/MANIFEST.MF';
        $desc_data = shell_exec($cmd);
    }
    $file_id = SaveFile($filetype, $ffp, $desc_data);
    $id = SaveFileDesc($file_id, $safefn, '', $Desc, 0);
    RunQuery('update ' . $GLOBALS['FileDesc Table'] .
	     ' set FilePath = "' .
	     addslashes($fp) . '" where ID = ' . $id);
    
    return array($id, $file_id);
}


function ShowFile($FullPath, $fn, $fd)
{
    $ext = substr($fn, strrpos($fn, '.') + 1);

    echo "<td align=center>";
    $Image = '';
    $Link = $FullPath . '/' . $fn;
    $Name = $fd[0];
    $Desc = $fd[1];
    $Code = $fd[2];
    $FileID = $fd[3];
    
    switch (strtoupper($ext))
    {
     case 'QCP':
	$Image = 'media/img/cassette.jpg';
	break;
	
     case 'JAR':
	$Image = 'media/img/winzip.gif';
	break;
	
     case 'WBMP':
	$Image = 'media/img/file.jpg';
	break;
	
     case 'JPG':
     case 'JPEG':
     case 'PNG':
     case 'GIF':
	$Image = 'thumb.php/' . $FileID . '/' . $fn;
	break;
	
     case 'PMD':
	$Image = 'media/img/film.jpg';
	break;
	
     case 'MID':
	$Image = 'media/img/clef.jpg';
	break;
    }

    if ($Image != '')
    {
	echo "<a href=\"$Link\"><img src=\"$Image\"></a><br>\n";
    }
    echo "<a href=\"$Link\">" . htmlspecialchars($Name) . "</a>";
    if ($Desc != '')
    {
	echo ' &ndash; ' . $Desc;
    }
    echo "<br><a href=\"faq/index.php?Topic=jumpcode\">Jump Code</a>:  <b>" . 
      $Code . "</b>\n";
    echo "</td>";
}


function ShowPathLinks($Path)
{
    // Link to where we are:
    if ($Path == '')
    {
	Section('Gallery Index');
	return;
    }
    
    $Link = "<a href=\"$PHP_SELF?Path=\">Gallery Index</a>";
    $PathSoFar = '';
    $PathLinks = explode('/', $Path);
    $PathLast = array_pop($PathLinks);
    foreach ($PathLinks as $p)
    {
	if ($PathSoFar != '')
	  $PathSoFar .= '/';
	$PathSoFar .= $p;
	$Link .= " :: <a href=\"$PHP_SELF?Path=" . $PathSoFar . 
	  "\">" . htmlspecialchars($p) . "</a>";
    }
    $Link .= " :: " . htmlspecialchars($PathLast);
    Section($Link);
}


function ShowSubdirs($Path, $dirs)
{
    sort($dirs);
    
    if (count($dirs) == 0)
      return;
    
    echo "<ul>\n";
    foreach ($dirs as $cat)
    {
	echo "<li><a href=\"$PHP_SELF?Path=$Path/$cat\">";
	echo htmlspecialchars($cat);
	echo "</a>\n";
    }
    echo "</ul>\n";
}
