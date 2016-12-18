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
	
	if (! empty($d[0])) {
		$d[0] = str_replace(' ', '&nbsp;', $d[0]);
	
		if (count($d) > 1) {
			echo '<a href="' . $d[1] . '">' . $d[0] . "</a>\n";
		} elseif ($d[0][0]) {
			echo "<br>\n";
			echo '<b>' . strtoupper($d[0]) . "</b>\n";
		}
	}
}

?>
</div>
</td></tr></table>
