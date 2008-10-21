<html><head><title>PalmOS Database Administration</title>
</head><body bgcolor="#FFFFFF">
<?php

    require 'db.inc';
    require '../../functions.inc';
    OpenDBConnection('Marco');
    
    if (! isset($action))
        $action = '';

    ViewMenu();

    if ($action == 'todo')
        ViewTodo();
    elseif ($action == 'news')
        ViewNews();
    elseif ($action == 'handhelds')
        ViewHandhelds();
    elseif ($action == 'files')
        ViewFiles();
    else
        ViewMain();
?>
</body></html>
<?PHP

// ##########################################################################

function ViewMenu()
{
?>
<table align=center bgcolor="#BFBFFF"><tr>
<td><a href="index.php?action=main">Main</a></td>
<td><a href="index.php?action=todo">Todo</a></td>
<td><a href="index.php?action=news">News</a></td>
<td><a href="index.php?action=handhelds">Handhelds</a></td>
<td><a href="index.php?action=files">Releases</a></td>
</tr></table>
<?PHP
}

// ##########################################################################

function ViewMain()
{
    echo "Main -- Maybe a summary should go here?";
}
 
// ##########################################################################
 
function ViewTodo()
{
    global $DB_Todo_Categories, $category, $description, $id, $is_done, $edit,
        $delete;
    
    if (isset($id))
    {
        if ($id == 0)
	{
	    // Add
	    mysql_query("insert into " .
	        "todo (when_posted, category, description) " .
		"values (NOW(), $category, '$description')");
	}
	elseif (isset($delete))
	{
	    mysql_query("delete from todo where id=$id");
	}
	else
	{
	    DB_Update('todo', $id, array('category' => $category,
	        'description' => $description));
	}
    }
    
?>
<form method=post action=index.php>
<input type=hidden name=action value=todo>
<input type=hidden name=id value="<?PHP

    if (isset($edit))
    {
        $res = mysql_query("select * from todo where id=$edit");
	$editData = mysql_fetch_assoc($res);
        echo $edit;
    }
    else
        echo 0;
	
?>">
<table bgcolor="#BFFFBF" align=center>
<tr>
  <th align=right>Category:</th>
  <td><?PHP 
  
  if (isset($edit))
      ShowSelectList('category', $DB_Todo_Categories, $editData['category']);
  else
      ShowSelectList('category', $DB_Todo_Categories);
      
?></td>
</tr>
<tr>
  <th align=right>Description:</th>
  <td><input name=description size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['description']);

?>"></td>
</tr>
<tr>
<?PHP

    if (isset($edit))
    {
    
?>
  <th align=right>Delete:</th>
  <td><input type=checkbox name=delete> -- Warning:  There is no
      confirmation!</td>
</tr>
<tr>
  <td align=center colspan=2><input type=submit value="Edit/Delete Entry"></td>
<?PHP

    }
    else
    {

?>
  <td align=center colspan=2><input type=submit value="Add Entry"></td>
<?PHP
   
    }
    
?>
</tr>
</table>
</form>

<table bgcolor="#FFBFBF" align=center>
<tr>
  <th>When Posted</th>
  <th>Category</th>
  <th>Description</th>
  <th>&nbsp;</th>
</tr>
<?PHP

    $res = mysql_query("select * from todo " .
        "order by category, when_posted");
    if (! $res || mysql_num_rows($res) == 0)
    {
        echo "<tr><td colspan=4 align=center>";
	echo "Sorry, no todo elements to view</td></tr>";
    }
    else
    {
        while ($data = mysql_fetch_assoc($res))
	{
	
?>
<tr>
  <td><?= $data['when_posted'] ?></td>
  <td><?= $DB_Todo_Categories[$data['category']] ?></td>
  <td><?= htmlspecialchars($data['description']) ?></td>
  <td><a href="index.php?action=todo&edit=<?= $data['id'] ?>">Edit</a></td>
</tr>
<?PHP

	}
    }

?>
</table>
<?PHP

}

// ##########################################################################

function ViewNews()
{
    global $description, $id, $edit, $delete, $when_posted, $DB_Projects,
        $project;
    
    if (isset($id))
    {
        if ($id == 0)
	{
	    // Add
	    mysql_query("insert into " .
	        "news (project, when_posted, description) " .
		"values ($project, NOW(), '$description')");
	}
	elseif (isset($delete))
	{
	    mysql_query("delete from news where id=$id");
	}
	else
	{
	    DB_Update('news', $id, array(
	        'project' => $project,
		'when_posted' => $when_posted,
		'description' => $description));
	}
    }
    
?>
<form method=post action=index.php>
<input type=hidden name=action value=news>
<input type=hidden name=id value="<?PHP

    if (isset($edit))
    {
        $res = mysql_query("select * from news where id=$edit");
	$editData = mysql_fetch_assoc($res);
        echo $edit;
    }
    else
        echo 0;
	
?>">
<table bgcolor="#BFFFBF" align=center>
<tr>
  <th align=right>Project:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('project', $DB_Projects, $editData['project']);
    else
        ShowSelectList('project', $DB_Projects);

?></td>
</tr>
<tr>
  <th align=right>Description:</th>
  <td><input name=description size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['description']);

?>"></td>
</tr>
<tr>
<?PHP

    if (isset($edit))
    {
    
?>
  <th align=right>When Posted:</th>
  <td><input type=text size=10 name="when_posted" 
      value="<?= $editData['when_posted'] ?>"> YYYY-MM-DD</td>
</tr>
<tr>
  <th align=right>Delete:</th>
  <td><input type=checkbox name=delete> -- Warning:  There is no
      confirmation!</td>
</tr>
<tr>
  <td align=center colspan=2><input type=submit value="Edit/Delete Entry"></td>
<?PHP

    }
    else
    {

?>
  <td align=center colspan=2><input type=submit value="Add Entry"></td>
<?PHP
   
    }
    
?>
</tr>
</table>
</form>

<table bgcolor="#FFBFBF" align=center>
<tr>
  <th>Project</th>
  <th>When Posted</th>
  <th>Description</th>
  <th>&nbsp;</th>
</tr>
<?PHP

    $res = mysql_query("select * from news " .
        "order by when_posted desc");
    if (! $res || mysql_num_rows($res) == 0)
    {
        echo "<tr><td colspan=4 align=center>";
	echo "Sorry, no news elements to view</td></tr>";
    }
    else
    {
        while ($data = mysql_fetch_assoc($res))
	{
	
?>
<tr>
  <td><?= $DB_Projects[$data['project']] ?></td>
  <td><?= $data['when_posted'] ?></td>
  <td><?= htmlspecialchars($data['description']) ?></td>
  <td><a href="index.php?action=news&edit=<?= $data['id'] ?>">Edit</a></td>
</tr>
<?PHP

	}
    }

?>
</table>
<?PHP
}

// ##########################################################################

function ViewHandhelds()
{
    global $id, $manufacturer, $model, $url, $ir, $battery_type, $battery_life,
        $processor, $ram_size, $flashrom, $screen_depth, $cradle, $connection,
	$description, $id, $edit, $delete, $when_posted, $expansion, $price,
	$DB_Handheld_Manufacturer, $DB_Handheld_IR, $DB_Handheld_Battery_Type,
	$DB_Handheld_Processor, $DB_Handheld_Ram, $DB_Handheld_Flashrom,
	$DB_Handheld_ScreenDepth, $DB_Handheld_Cradle, 
	$DB_Handheld_Processor_Long, $is_obsolete,
	$DB_Handheld_Connection, $DB_Handheld_Expansion;
    
    if (isset($id))
    {
	if ($price == '')
	   $price = 0;
        if (isset($is_obsolete))
	   $is_obsolete = 1;
	else
	   $is_obsolete = 0;
	   
        if ($id == 0)
	{
	    // Add
	    mysql_query("insert into " .
	        "handheld (manufacturer, model, price, url, " .
		    "ir, battery_type, processor, ram_size, flashrom, " .
		    "screen_depth, cradle, connection, expansion, " .
		    "description, is_obsolete) " .
		"values ($manufacturer, '$model', $price, '$url', $ir, " .
		    "$battery_type, $processor, $ram_size, $flashrom, " .
		    "$screen_depth, $cradle, $connection, $expansion, " .
		    "'$description', $is_obsolete)");
	}
	elseif (isset($delete))
	{
	    mysql_query("delete from handheld where id=$id");
	}
	else
	{
	    DB_Update('handheld', $id, array(
	        'manufacturer' => $manufacturer,
		'model' => $model,
		'price' => $price,
		'url' => $url,
		'ir' => $ir,
		'battery_type' => $battery_type,
		'processor' => $processor,
		'ram_size' => $ram_size,
		'flashrom' => $flashrom,
		'screen_depth' => $screen_depth,
		'cradle' => $cradle,
		'connection' => $connection,
		'expansion' => $expansion,
		'description' => $description,
		'is_obsolete' => $is_obsolete));
	}
    }
    
?>
<form method=post action=index.php>
<input type=hidden name=action value=handhelds>
<input type=hidden name=id value="<?PHP

    if (isset($edit))
    {
        $res = mysql_query("select * from handheld where id=$edit");
	$editData = mysql_fetch_assoc($res);
        echo $edit;
    }
    else
        echo 0;
	
?>">
<table bgcolor="#BFFFBF" align=center>
<tr>
  <th align=right>Manufacturer:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('manufacturer', $DB_Handheld_Manufacturer,
	    $editData['manufacturer']);
    else
        ShowSelectList('manufacturer', $DB_Handheld_Manufacturer);
	
?></td>
</tr>
<tr>
  <th align=right>Model:</th>
  <td><input name=model size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['model']);

?>"></td>
</tr>
<tr>
  <th align=right>Price:</th>
  <td><input name=price size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['price']);

?>"></td>
</tr>
<tr>
  <th align=right>URL:</th>
  <td><input name=url size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['url']);

?>"></td>
</tr>
<tr>
  <th align=right>IR:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('ir', $DB_Handheld_IR,
	    $editData['ir']);
    else
        ShowSelectList('ir', $DB_Handheld_IR);
	
?></td>
</tr>
<tr>
  <th align=right>Battery Type:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('battery_type', $DB_Handheld_Battery_Type,
	    $editData['battery_type']);
    else
        ShowSelectList('battery_type', $DB_Handheld_Battery_Type);
	
?></td>
</tr>
<tr>
  <th align=right>Processor:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('processor', $DB_Handheld_Processor_Long,
	    $editData['processor']);
    else
        ShowSelectList('processor', $DB_Handheld_Processor_Long);
	
?></td>
</tr>
<tr>
  <th align=right>RAM Size:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('ram_size', $DB_Handheld_Ram,
	    $editData['ram_size']);
    else
        ShowSelectList('ram_size', $DB_Handheld_Ram);
	
?></td>
</tr>
<tr>
  <th align=right>Flash ROM:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('flashrom', $DB_Handheld_Flashrom,
	    $editData['flashrom']);
    else
        ShowSelectList('flashrom', $DB_Handheld_Flashrom);
	
?></td>
</tr>
<tr>
  <th align=right>Screen Depth:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('screen_depth', $DB_Handheld_ScreenDepth,
	    $editData['screen_depth']);
    else
        ShowSelectList('screen_depth', $DB_Handheld_ScreenDepth);
	
?></td>
</tr>
<tr>
  <th align=right>Cradle:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('cradle', $DB_Handheld_Cradle,
	    $editData['cradle']);
    else
        ShowSelectList('cradle', $DB_Handheld_Cradle);
	
?></td>
</tr>
<tr>
  <th align=right>Connection:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('connection', $DB_Handheld_Connection,
	    $editData['connection']);
    else
        ShowSelectList('connection', $DB_Handheld_Connection);
	
?></td>
</tr>
<tr>
  <th align=right>Expansion Slot:</th>
  <td><?PHP
  
    if (isset($edit))
        ShowSelectList('expansion', $DB_Handheld_Expansion,
	    $editData['expansion']);
    else
        ShowSelectList('expansion', $DB_Handheld_Expansion);
	
?></td>
</tr>
<tr>
  <th align=right>Description:</th>
  <td><input name=description size=40 maxsize=255 value="<?PHP
  
    if (isset($edit))
        echo htmlspecialchars($editData['description']);

?>"></td>
</tr>
<tr>
  <th align=right>Obsolete:</th>
  <td><input type=checkbox name="is_obsolete"<?PHP
   
    if (isset($edit) && $editData['is_obsolete'])
        echo ' CHECKED';

?>> Heck yeah, this is obsolete (no longer sold new, kinda getting moldy)</td>
</tr>
<?PHP
    if (isset($edit))
    {

?><tr>
  <th align=right>Delete:</th>
  <td><input type=checkbox name=delete> -- Warning:  There is no
      confirmation!</td>
</tr>
<tr>
  <td align=center colspan=2><input type=submit value="Edit/Delete Entry"></td>
<?PHP

    }
    else
    {

?>
  <td align=center colspan=2><input type=submit value="Add Entry"></td>
<?PHP
   
    }
    
?>
</tr>
</table>
</form>

<table bgcolor="#FFBFBF" align=center border=1>
<tr>
  <th>Manufacturer</th>
  <th>Model</th>
  <th>Price</th>
  <th>IR</th>
  <th>Battery</th>
  <th>Processor</th>
  <th>RAM</th>
  <th>Flash</th>
  <th>Cradle</th>
  <th>Connection</th>
  <th>Expansion</th>
  <th>&nbsp;</th>
</tr>
<tr>
  <th colspan=3><nobr>Screen Depth</nobr></th>
  <th colspan=8>Description</th>
  <th>Obsolete</th>
</tr>
<?PHP

    $res = mysql_query("select * from handheld " .
        "order by is_obsolete, manufacturer, model");
    if (! $res || mysql_num_rows($res) == 0)
    {
        echo "<tr><td colspan=12 align=center>";
	echo "Sorry, no news elements to view</td></tr>";
    }
    else
    {
        while ($data = mysql_fetch_assoc($res))
	{
	
?>
<tr>
  <td><nobr><?= $DB_Handheld_Manufacturer[$data['manufacturer']] ?></nobr></td>
  <td><nobr><?PHP 
  
            if (isset($data['url']) && $data['url'] != '')
	    {
	        echo '<a href="' . $data['url'] . '">' . $data['model'] . 
		    '</a>';
	    }
	    else
	    {
	        echo $data['model'];
	    }
?></nobr></td>
  <td>$<?= $data['price'] ?></td>
  <td><nobr><?= $DB_Handheld_IR[$data['ir']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Battery_Type[$data['battery_type']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Processor[$data['processor']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Ram[$data['ram_size']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Flashrom[$data['flashrom']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Cradle[$data['cradle']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Connection[$data['connection']] ?></nobr></td>
  <td><nobr><?= $DB_Handheld_Expansion[$data['expansion']] ?></nobr></td>
  <td><a href="index.php?action=handhelds&edit=<?= $data['id'] ?>">Edit</a></td>
</tr>
<tr>
  <td colspan=3><nobr><?= $DB_Handheld_ScreenDepth[$data['screen_depth']] ?></nobr></td>
  <td colspan=8><nobr><?= htmlspecialchars($data['description']) ?></nobr></td>
  <td><?= (($data['is_obsolete'])?'Yes':'No') ?></td>
</tr>
<?PHP

	}
    }

?>
</table>
<?PHP
}

// ##########################################################################

function ViewFiles()
{
    echo "releases";
}

?>
