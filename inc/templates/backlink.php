<?php

$links = $GLOBALS['HeaderOpts']['Backlinks'][0];
$pre = $GLOBALS['HeaderOpts']['Backlinks'][1];

?>
</td><td valign=top>
<div class="r_backlink">
<a href="<?php echo $pre ?>index.php"><B>INDEX</B></a>
<br>
<?php

foreach ($links as $d) {
	echo "\n<br>";
	$d[0] = str_replace(' ', '&nbsp;', $d[0]);
	
	if (count($d) > 1) {
		
		?><a href="<?php echo $d[1] ?>"><?php echo $d[0] ?></a>
<?php
	} elseif ($d[0][0]) {
		
		?><br>
<b><?php echo strtoupper($d[0]) ?></b>
<br>
<?php
	}
}

?>
</div>
</td></tr></table>