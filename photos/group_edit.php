<?PHP 

require_once('main.php');

if (! $GLOBALS['IsAdmin'])
  Location();

if (isset($_REQUEST['gid']))
  $gid = $_REQUEST['gid'];
if (!isset($gid) || $gid == '')
  $gid = -1;
settype($gid, 'integer');

$GroupInfo = FetchGroupInfo($gid);
$gid = $GroupInfo[0];

if (isset($_REQUEST['addfrom']) && $gid == -1)
{
    $a = FetchGroupInfo($_REQUEST['addfrom']);
    $GroupInfo[4] = $a[0];
}

if (isset($_REQUEST['Delete']) && $gid != -1)
{
    $sql = 'delete from ImageGroups where GroupId = ' . $gid;
    $res = dbi_query($sql);
    if (! $res)
      BadSQL($sql);
    
    $sql = 'delete from Groups where Id = ' . $gid;
    $res = dbi_query($sql);
    if (! $res)
      BadSQL($sql);
    
    Location('index.php?popcomment=Group+Deleted&gid=' . $GroupInfo[4]);
}

if (isset($_REQUEST['GroupName']) && isset($_REQUEST['GroupComment']) && 
    isset($_REQUEST['GroupParent']))
{
    $GroupName = $_REQUEST['GroupName'];
    $GroupComment = $_REQUEST['GroupComment'];
    $GroupParent = $_REQUEST['GroupParent'];
    settype($GroupParent, 'integer');

    if (isset($_REQUEST['GroupPrivate']))
      $GroupPrivate = '1';
    else
      $GroupPrivate = '0';
    
    if ($gid != -1)
    {
       // Update!
       $sql = 'update Groups set Name="' . addslashes($GroupName) . 
          '", Comment="' . addslashes($GroupComment) . '", ParentGroupId=' .
          $GroupParent . ', IsPrivate=' . $GroupPrivate . 
	  ' where id = ' . $gid;
    }
    else
    {
	$sql = 'insert into Groups (Name, Comment, ParentGroupID, ' .
	  'IsPrivate) ' . 'values ("' . addslashes($GroupName) . 
	  '", "' . addslashes($GroupComment) . '", ' . $GroupParent .
	  ', ' . $GroupPrivate . ')';
    }
    
    $res = dbi_query($sql);
    if (! $res)
      BadSQL($sql);
    
    if ($gid == -1)
    {
	$sql = 'select max(Id) from Groups';
	$res = dbi_query($sql);
	if (! $res)
	  BadSQL($sql);
	
	$row = dbi_fetch_row($res);
	dbi_free_result($res);
	if ($row)
	  $gid = $row[0];
    }
    
    // All done -- view the group in non-edit mode.
    Location('index.php?gid=' . $gid);
}


if ($gid == -1)
  ShowHeader('Add a New Group');
else
{
  ShowHeader('Edit:  ' . $GroupInfo[1]);
  $ParentList = FetchParents($gid);
  echo '<p>' . CreateGroupParentLinks($ParentList) .
      ' - [<a href="group_edit.php?gid=' . $gid . '&Delete=1" ' .
      'onclick="return confirm(\'Are you sure you want to delete this group?\')">' .
      'Delete</a>]' .
      "</p>\n";
}

?>
	
<form method=post action="<?PHP echo $PHP_SELF ?>">
  <table border=1 cellpadding=2 cellspacing=0>
    <tr>
      <th align=right>Group Name:</th>
      <td>
        <input type=text name=GroupName value="<?PHP 
	  if ($gid != -1) echo $GroupInfo[1] ?>" size=40>
      </td>
    </tr>
    <tr>
      <th align=right>Comment:</th>
      <td>
        <textarea name=GroupComment wrap=virtual rows=10 cols=60><?PHP
	   if ($gid != -1) echo htmlspecialchars($GroupInfo[2]) ?></textarea>
      </td>
    </tr>
    <tr>
      <th align=right>Parent:</th>
      <td>
        <select name=GroupParent>
<?PHP
        
	$Parents = GetPotentialParents($gid);
	foreach ($Parents as $data)
	{
	   echo '<option value="' . $data[0] . '"';
	   if ($data[0] == $GroupInfo[4])
	      echo ' SELECTED';
	   echo '>' . htmlspecialchars($data[1]) . "</option>\n";
	}
	
?>	</select>
      </td>
    </tr>
    <tr>
      <th align=right>Flags:</th>
      <td>
        <input type=checkbox name=GroupPrivate<?PHP
	   if ($gid != -1 && $GroupInfo[3]) echo ' CHECKED'; ?>>
	- Private (Administrator only)
      </td>
    <tr>
      <td colspan=2 align=center>
	<input type=hidden name=gid value="<?PHP echo $gid ?>">
        <input type=submit value="Save Changes">
	- <a href="index.php?gid=$gid">Cancel</a>
      </td>
    </tr>
  </table>
</form>

<?PHP

ShowFooter(-1, -1);

?>
