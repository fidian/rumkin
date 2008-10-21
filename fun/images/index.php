<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Fun Images',
		     'topic' => 'images'));

$Images = ScanDir(getenv('MEDIABASE') . 'fun/images');

if (! isset($_REQUEST['id']) || ! isset($Images[$_REQUEST['id']])) {
    Redirect('?id=' . rand(0, count($Images) - 1));
}

$Image = $Images[$_REQUEST['id']];

$next = ($_REQUEST['id'] + 1) % count($Images);
$prev = ($_REQUEST['id'] - 1 + count($Images)) % count($Images);
$random = rand(0, count($Images) - 1);

echo '<div align="center">';
echo '<p><a href="?id=' . $prev . '">Prev</a> - ' .
  '<a href="?id=' . $random . '">Random</a> - ' .
  '<a href="?id=' . $next . '">Next</a></p>';
echo '<img src="media/' . $Image . '">';
echo '</div>';

$DescName = preg_replace('/\.(jpg|gif)$/i', '.txt', $Image);

if (file_exists($DescName))
{
    echo '<br>';
    MakeBoxTop('center');
    readfile($DescName);
    MakeBoxBottom();
}

StandardFooter();


function ScanDir($dirname)
{
    $Images = array();
    $dir = opendir($dirname);
    
    while (($file = readdir($dir)) !== false)
    {
	if ($file[0] != '.')
	{
	    $fullname = $dirname . '/' . $file;
	    if (is_dir($fullname))
	    {
		$More = ScanDir($fullname);
		$Images = array_merge($Images, $More);
	    }
	    elseif (preg_match('/\.(jpg|gif)$/i', $file))
	    {
		$Images[] = $file;
	    }
	}
    }
    
    return $Images;
}
