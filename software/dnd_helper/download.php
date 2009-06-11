<?php


// -*- text -*-
include('../../functions.inc');
StandardHeader(array(
		'title' => 'Download',
		'topic' => 'dnd_helper'
	));
include('db_gen/dblist.inc');
$db_path = getenv('MEDIABASE') . 'software/dnd_helper/';

?>

<script language=javascript>
<!--
n = 1;
function ShowSample(D, T)
{
   eval("window.open('sample.php?db=" + escape(D) + "&type=" +
      escape(T) + "', '" + n + 
      "', 'toolbar=0,scrollbars=1,location=0,statusbar=0," + 
      "menubar=0,resizable=1,width=300,height=300');");
   n ++;
}
-->
</script>

<p>If you want to start using D&amp;D Helper, I'd suggest you download the
zip file first, and then test out the program.  If you like what you see and
you want the extra ability to generate names, words, and other things.</p>

<table border=1 cellpadding=5 cellspacing=0 align=center>
<tr bgcolor=#FFFFFF><th>Download D&amp;D Helper</th></tr>
<tr bgcolor=#EEFFEE><th>Version 1.2</th></tr>
<tr bgcolor=#EEEEFF><td align=center>
   Compressed in a <a href="media/download/dnd_helper.zip">Zip file</a>
   (<?php echo FidianFileSize($db_path . 'download/dnd_helper.zip') ?> bytes)</td></tr>
<tr bgcolor=#FFEEEE><td align=center>
   Or an uncompressed <a href="media/download/dnd_helper.prc">Prc file</a>
  (<?php echo FidianFileSize($db_path . 'download/dnd_helper.prc') ?> bytes)</td></tr>
</table>

<p>There is also just the die rolling part of D&amp;D Helper in a separate
Palm program in case you want to just get numbers.</p>

<table border=1 cellpadding=5 cellspacing=0 align=center>
<tr bgcolor=#FFFFFF><th>Download Palm Dice</th></tr>
<tr bgcolor=#EEFFEE><th>Version 1.0</th></tr>
<tr bgcolor=#EEEEFF><td align=center>
   Compressed in a <a href="media/download/palm_dice.zip">Zip file</a>
   (<?php echo FidianFileSize($db_path . 'download/palm_dice.zip') ?> bytes)</td></tr>
<tr bgcolor=#FFEEEE><td align=center>
   Or an uncompressed <a href="media/download/palm_dice.prc">Prc file</a>
  (<?php echo FidianFileSize($db_path . 'download/palm_dice.prc') ?> bytes)</td></tr>
</table>


<p>D&amp;D Helper can use additional files to generate various things.
They are not required to run D&amp;D Helper -- they just provide more
tools to the DM or player.  If you want a thorough understanding of
the different types of databases that you can download, see my 
<a href="gen_type.php">explanation</a> page for a comparison of the strengths
and weaknesses of the different formats.</p>

<p>Before you download a file, you should check out sample output from that
file.  Just click on the Sample link and a pop-up window will appear.  The
results in the window will be along the same lines that your Palm will give
you.  Reloading the window will generate more results for you.</p>


<?php Section('Miscellaneous Databases'); ?>

<p>Files that don't have enough in a collection to warrant a category of
their own.  Click on the file to download the individual database, or mark a
set of files and click "Make Zip File" to download them as a single zip
archive.</p>

<?php MakeTable('misc') ?>

<?php Section('Names'); ?>

<p>Need a name for your character?  These databases are here to help.  If
you click on the filename, you will download that individual file.  If you
want to download a Zip archive of several files, just check the boxes near
the filenames and then press "Make Zip File" to download them all at once.</p>

<?php MakeTable('names') ?>

<?php Section('Language Generation'); ?>

<p>These databases will allow D&D Helper to generate words that resemble
real words for the given language.  Just click on the filename to download
it, or you can check the various checkboxes and press "Make Zip File" to
download a Zip archive of the different files.</p>

<?php MakeTable('language') ?>


<?php Section('Other Related Items'); ?>

<p>Files listed here are probably for "advanced" users only.  I link to them
for the odd chance that they might help someone.</p>

<dl>

<dt><b><a href="media/download/dnd_helper_1.2.tar.gz">Source Code</a></b></dt>
<dd>The source code for the latest version is available here.  Feel free to
find bugs and submit patches!</dd>

<dt><b><a href="download/dnd_helper.inc">D&amp;D Helper Class</a></b></dt>
<dd>This PHP class is an extender for 
<a href="http://php-pdb.sourceforge.net/">PHP-PDB</a> (a PHP class to 
read and write PDB files).  It will assist in writing databases that can be
used by D&amp;D Helper.  This class is very slow when dealing with letter
pair databases, so you should only write 'Pick' and 'PSR' style 
databases on the fly, if ever.</dd>

<dt><b><a href="download/psr.inc">PSR PHP Functions</a></b></dt>
<dd>These are the functions I use to load PSR files for showing sample
output and for generating the Palm databases.</dd>

<dt><b><a href="media/download/menuhack.zip">MenuHack</a></b></dt>
<dd>A HackMaster extension (that works with HackMaster, EVPlugBase,
X-Master, etc.) that will let you tap the menu bar of an application to
pull down the menu, instead of doing the counter-intuitive action of
pressing the menu button for the menu.  Only older Palm handhelds can
benefit from this -- the newer ones have this built-in.  This is not
required to run the program.  It merely makes life easier.<dd>

</dl>

<?php

StandardFooter();


function MakeTable($type) {
	global $db_path;
	$type_db = array();
	
	foreach ($GLOBALS['dblist'] as $key => $data) {
		if (isset($data['category']) && $data['category'] == $type) {
			$type_db[$key] = $data;
		}
	}
	
	?>
<form method=post action=makezip.php>
<input type=hidden name=filename value="<?php echo $type ?>.zip">
<table border=1 cellpadding=5 cellspacing=0>
<tr bgcolor="#FFFFFF"><th>Database</th><?php ShowFile(false)
	
	?><th>Source</th></tr>
<?php
	
	$Colors = array(
		'#EEFFEE',
		'#EEEEFF',
		'#FFEEEE',
		'#FFFFEE',
		'#FFEEFF',
		'#EEFFFF'
	);
	$color = 0;
	
	foreach ($type_db as $name => $data) {
		$files = array();
		
		if (isset($data['generate']) && is_array($data['generate'])) {
			if (isset($data['generate']['pick one']) && is_array($data['generate']['pick one']) && isset($data['generate']['pick one']['pdb'])) {
				$fn = $data['generate']['pick one']['pdb'];
				
				if (file_exists($db_path . $fn)) {
					$files[] = array(
						'Pick',
						$fn,
						filesize($db_path . $fn),
						filemtime($db_path . $fn),
						'pick one',
						$name
					);
				}
			}
			
			if (isset($data['generate']['letter pair']) && is_array($data['generate']['letter pair']) && isset($data['generate']['letter pair']['pdb'])) {
				$fn = $data['generate']['letter pair']['pdb'];
				
				if (file_exists($db_path . $fn)) {
					$files[] = array(
						'Small',
						$fn,
						filesize($db_path . $fn),
						filemtime($db_path . $fn),
						'letter pair',
						$name
					);
				}
			}
			
			if (isset($data['generate']['letter pair']) && is_array($data['generate']['letter pair']) && isset($data['generate']['letter pair']['pdb_c'])) {
				$fn = $data['generate']['letter pair']['pdb_c'];
				
				if (file_exists($db_path . $fn)) {
					$files[] = array(
						'Gen',
						$fn,
						filesize($db_path . $fn),
						filemtime($db_path . $fn),
						'letter pair',
						$name
					);
				}
			}
			
			if (isset($data['generate']['psr']) && is_array($data['generate']['psr']) && isset($data['generate']['psr']['pdb'])) {
				$fn = $data['generate']['psr']['pdb'];
				
				if (file_exists($db_path . $fn)) {
					$files[] = array(
						'PSR',
						$fn,
						filesize($db_path . $fn),
						filemtime($db_path . $fn),
						'psr',
						$name
					);
				}
			}
		}
		
		$rows = count($files);
		
		if ($rows == 0) {
			$rows = 1;
			$files[] = false;
		}
		
		echo '<tr bgcolor="' . $Colors[$color] . '"><th rowspan=' . $rows . '>' . htmlspecialchars($name) . '</th>';
		ShowFile(array_shift($files));
		echo '<td rowspan=' . $rows . '>' . htmlspecialchars($data['desc']);
		
		if (isset($data['source']) && $data['source'] != '')echo ' (<a href="' . $data['source'] . '">Source</a>)';
		echo '</td></tr>';
		echo "\n";
		
		while (count($files)) {
			echo '<tr bgcolor="' . $Colors[$color] . '">';
			ShowFile(array_shift($files));
			echo "</tr>\n";
		}
		
		$color ++;
		
		if ($color >= count($Colors))$color = 0;
	}
	
	?>
<tr><td colspan=6 align=center>
<input type=submit value="Make Zip File"> of selected files
</td></tr>
</table>
</form>
<?php
}


function ShowFile($data) {
	global $db_path;
	
	if ($data === false) {
		echo '<th>Type</th><th>File</th><th>Size</th>';
		return;
	}
	
	if (! is_array($data) || count($data) < 3) {
		echo '<td>-</td><td>No files</td><td>-</td>';
		return;
	}
	
	?>
<td><nobr><?php echo htmlspecialchars($data[0]) ?> 
(<a href="javascript:ShowSample('<?php echo $data[5] ?>', '<?php echo $data[4] ?>')">Sample</a>)</nobr></td>
<td><nobr><input type=checkbox name="makezip[]" value="<?php echo $data[1] ?>">
<a href="<?php echo $db_path ?><?php echo $data[1] ?>"><?php echo $data[1] ?></a></nobr></td>
<td><?php echo FidianFileSize($db_path . $data[1]); ?></td>
<?php
	
	return;
}

