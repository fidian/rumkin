<?PHP 

require_once('main.inc');

//if (isset($_REQUEST['gid']))
//  $gid = $_REQUEST['gid'];
if (!isset($gid) || $gid == '')
  $gid = -1;
settype($gid, 'integer');

$GroupInfo = FetchGroupInfo($gid);
$gid = $GroupInfo[0];

ShowHeader($GroupInfo[1]);
ShowComment($GroupInfo[2]);

$ParentList = FetchParents($gid);
echo '<p>' . CreateGroupParentLinks($ParentList) . "</p>\n";

$Groups = FetchChildren($gid);

if (count($Groups)) {
?>	

<table border=1 bgcolor="#CFCFFF" align=center>
<tr><?PHP
  
    $keys = array_keys($Groups);
    if (count($keys) > 20) {
	// Split into three columns
	$num = ceil(count($keys) / 3);
	$first = array_slice($keys, 0, $num);
	$second = array_slice($keys, $num, $num);
	$third = array_slice($keys, $num * 2);
	$Chunks = array($first, $second, $third);
    } elseif (count($keys) > 4) {
	// Two columns
	$num = ceil(count($keys) / 2);
	$first = array_slice($keys, 0, $num);
	$second = array_slice($keys, $num);
	$Chunks = array($first, $second);
    } else {
	// One column
	$Chunks = array($keys);
    }
    
    foreach ($Chunks as $keys) {
	echo '<td valign="top">';
	if (count($keys)) {
	    echo "<ul>\n";
	    foreach ($keys as $data) {
		echo '<li>';
		if ($Groups[$data][3])
		  echo '<i>';
		echo '<a href="index.php?gid=' . $Groups[$data][0] .
		  '">' . $Groups[$data][1] . '</a> (' . 
		  $Groups[$data][2] . ')';
  	        if ($GLOBALS['IsAdmin'])
		   echo ' [<a href="group_edit.php?gid=' .
		      $Groups[$data][0] . '">Edit</a>]';
		if ($Groups[$data][3])
		  echo '</i>';
		echo "</li>\n";
	    }
	    echo "</ul>\n";
	}
	echo '</td>';
    }
    
?></tr>
</table>
	
<?PHP

}


if ($gid != -1) {
    // Add a space if there were groups that were displayed
    if (count($Groups))
      echo "<br>\n";
    
    // The root group does not have any images in it
    $Images = FetchImages($gid);

    // Each element:
    // [0] = Image ID, [1] = Image Name, [2] = Size (bytes), [3] Width,
    // [4] = Height, [5] = Views, [6] = Year, [7] = Month, [8] = Day,
    // [9] = Comment, [10] = IsPrivate
    
    if (count($Images) == 0) {
	echo "<p>There are no images in this category yet.</p>\n";
    } else {
	DisplayImageSet($Images, $gid);
    }
	    
} else {
    // Display random?  Display popular?
}

if (isset($_REQUEST['popcomment']))
  ShowPopComment($_REQUEST['popcomment']);

ShowFooter($gid, -1);
