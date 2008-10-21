<?PHP

require_once('main.php');

ShowHeader('Search Images');

$Keyword = '';
if (isset($_REQUEST['Keyword']) && $_REQUEST['Keyword'] != '')
  $Keyword = $_REQUEST['Keyword'];
$Scope = 'both';
if (isset($_REQUEST['Scope']))
  $Scope = $_REQUEST['Scope'];
if ($Scope != 'title' && $Scope != 'description')
  $Scope = 'both';
$MaxMatches = $max_search_results;
if (isset($_REQUEST['MaxMatches']))
  $MaxMatches = $_REQUEST['MaxMatches'];
settype($MaxMatches, 'integer');
if ($MaxMatches < 1 || $MaxMatches > $max_search_results)
  $MaxMatches = $max_search_results;

if ($Keyword != '') {
    ShowSearchResults($Keyword, $Scope, $MaxMatches);
}

?>
<FORM METHOD="POST" ACTION="search.php">
<TABLE>
<TR>
   <TD class=fieldname>Keywords</TD>
   <TD><INPUT TYPE="text" NAME="Keyword" size=45 value="<?PHP echo $Keyword
?>"></TD>
</TR>
<TR>
   <TD class=fieldname>Where</TD>
   <TD>
	<?PHP
$useBR = false;
foreach (array('title' => 'Titles Only',
	       'description' => 'Descriptions Only',
	       'both' => 'Titles and Descriptions') as $val => $desc) {
    if ($useBR)
      echo "<br>\n";
    else
      $useBR = true;
    
    echo '<input type="radio" name="Scope" value="' . $val . '"';
    if ($val == $Scope)
      echo ' CHECKED';
    echo '>' . $desc;
}
?>
   </TD>
</TR>
<TR>
   <TD class=fieldname>Max matches shown</TD>
   <TD><input type="text" name="MaxMatches" size=3 value="<?PHP
echo $MaxMatches ?>"></td>
</TR>
</table>

<INPUT TYPE="submit" VALUE="Submit">
</FORM>

<?PHP

ShowFooter(-2, -1);


function ShowSearchResults($keyword, $scope, $max) {
    $keys = explode(' ', $keyword);
    $keywords = array();
    foreach ($keys as $word) {
	$word = trim($word);
	if (strpos($word, '%') === false)
	  $word = '%' . $word . '%';
	$keywords[] = $word;
    }
    // TODO: Search groups too?
    $ImageInfo = SearchImages($keywords, $scope, $max);
    if (count($ImageInfo)) {
	DisplayImageSet($ImageInfo);
    } else {
?>
<p><font size="+1">No images matched your search criteria.</font></p>
<?PHP
    }
}
