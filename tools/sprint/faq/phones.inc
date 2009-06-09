<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>The information below was provided by several kind people who took the
time to run their phones through <a href="../newphone.php">this test</a>.  If
some of the features for your phone have question marks, you can help fill
in the missing information with the <a href="../newphone.php">guided test</a>.
The information is used by this uploader to make sure images are in the
correct format and are sized appropriately for your phone.</p>

<p>This doesn't track everything that a phone can support; that would take a
lot more work than I'm willing to put into the project.  Basically, you
should just try it and hope that it works.  Nothing that I know of can hurt
your phone, so you can feel safe and try a MP3, JPG, or MIDI file and see if
it works.</p>

<p>The screen size may be different than the one listed with the SysInfo
midlet because a picture can take up more screen space than a Java midlet
can use.  Usually, this is a bar at the very top where the signal strengh
and other icons are displayed.  Often a picture can fill this area but a
Java midlet can not.</p>

<form name="select" action="<?php echo $_SERVER['REQUEST_URI'] ?>" method="post">
Filter by...
<ul>
<li>Make: <select name="make">
<option value="">-- ALL --</option>
<?php

$sql = 'select distinct Make from ' . $GLOBALS['Phones Table'] . ' where UseRecord = 1 order by Make';
$r = RunQuery($sql);

while ($data = FetchAssoc($r)) {
	$sel = '';
	
	if (isset($_POST['make']) && $_POST['make'] && $data['Make'] == $_POST['make'])$sel = ' SELECTED';
	echo '<option value="' . $data['Make'] . '"' . $sel . '>' . $data['Make'] . "</option>\n";
}

?></select>

<li>Model:  <input type="text" name="model" value="<?php

if (isset($_POST['model']) && $_POST['model'])echo $_POST['model'];

?>"> (optional)
</ul>
<input type=submit value=" Filter "></form>

<table border=1 align=center cellspacing=0 cellpadding=3>
<?php

$Header = '<tr bgcolor="#CFCFCF">';
$Header .= '<th>Phone</th><th>Screen</th><th>Colors</th>';
$FileTypes = array(
	'Jar',
	'Jpg',
	'Gif',
	'Png',
	'Wbmp',
	'Pmd',
	'Qcp',
	'Mid'
);

foreach ($FileTypes as $F) {
	$Header .= '<th><a href="../formats.php#' . strtolower($F) . '">' . $F . '</th>';
}

$Header .= "</tr>\n";
$sql = 'select * from ' . $GLOBALS['Phones Table'] . ' where UseRecord = 1';

if (isset($_POST['make']) && $_POST['make'])$sql .= ' and Make = "' . EscapeDB($_POST['make']) . '"';

if (isset($_POST['model']) && $_POST['model'])$sql .= ' and Model like "%' . EscapeDB($_POST['model']) . '%"';
$sql .= ' order by Make, Model';
$r = RunQuery($sql);
$LastMake = false;

while ($data = FetchAssoc($r)) {
	if ($LastMake != $data['Make']) {
		$LastMake = $data['Make'];
		echo $Header;
	}
	
	echo '<tr><th>' . htmlspecialchars($data['Make']) . '<br>' . htmlspecialchars($data['Model']) . '</th>';
	echo '<td align=center>' . $data['Width'] . 'x' . $data['Height'] . '</td>';
	echo '<td align=center>' . $data['ColorDepth'] . ' bit<br>';
	$colors = pow(2, $data['ColorDepth']);
	$c2 = substr($colors, - 3);
	$colors = substr($colors, 0, strlen($colors) - 3);
	
	while (strlen($colors) > 0) {
		$c2 = substr($colors, - 3) . ',' . $c2;
		$colors = substr($colors, 0, max(0, strlen($colors) - 3));
	}
	
	echo $c2 . '</td>';
	
	foreach ($FileTypes as $F) {
		echo '<td align=center>';
		
		if ($data[$F] == 0)echo '<font color="#990000"><b><u>No</u></b></font>';
		elseif ($data[$F] == 1)echo '<font color="#00AA00"><b>Yes</b></font>';
		else echo '<font size="+2"><i>?</i></font>';
		echo '</td>';
	}
	
	echo "</tr>\n";
}

echo $Header;
DoneWithResult($r);

?>
</table>
