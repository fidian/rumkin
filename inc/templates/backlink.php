<?PHP

$links = $GLOBALS['HeaderOpts']['Backlinks'][0];
$pre = $GLOBALS['HeaderOpts']['Backlinks'][1];

?>
</td><td valign=top>
<div class="r_backlink">
<a href="<?= $pre ?>index.php"><B>INDEX</B></a>
<br>
<?PHP

foreach ($links as $d)
{
    echo "\n<br>";
    $d[0] = str_replace(' ', '&nbsp;', $d[0]);
    if (count($d) > 1)
    {
	
?><a href="<?= $d[1] ?>"><?= $d[0] ?></a>
<?PHP
	
    }
    elseif ($d[0][0])
    {
	
?><br>
<b><?= strtoupper($d[0]) ?></b>
<br>
<?PHP
	
    }
}

?>
</div>
</td></tr></table>