<?PHP  // -*- text -*-

include '../../functions.inc';

StandardHeader(array('title' => 'Tyler\'s Campaign',
		     'header' => 'Worksheet',
		     'topic' => 'dnd'));

?>

<p>Use this worksheet when leveling your character for the <a
href="tyler.php">big campaign</a> in
order to ensure that you kept everything straight when you leveled.</p>

<table border=1 cellpadding=0 cellspacing=0>
<tr>
<th>Ability</th>
<th>Rolled</th>
<th>Racial<br>Mod</th>
<th>Bonus<br>Points</th>
<th>Ending<br>Total</th>
</tr>
<?PHP

$Abilities = array('Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha');

foreach ($Abilities as $a)
{

?>
<tr>
<th align=center><?= $a ?></th>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<?PHP

}

?>
</table>

<p></p>

<table border=1 cellpadding=0 cellspacing=0 width=100%>
<tr>
<th>Lvl</th>
<th>Class<br>Levelled</th>
<th>HP<br>(Roll+Con)</th>
<th>Additional Feats & Special Abilities</th>
<th>Ability<br>Point</th>
</tr>
<?PHP

for ($i = 1; $i < 18; $i ++)
{

?>
<tr>
<td align=center><?= $i ?></td>
<td>&nbsp;</td>
<td align=center>+</td>
<td>&nbsp;</td>
<?PHP if ($i % 4 == 0) { ?>
<td>&nbsp;</td>
<?PHP } else { ?>
<td align=center>none</td>
<?PHP } ?>
</tr>
<?PHP

}

?>
</table>

<?PHP

$Skills = array('' => false,
                'Alchemy' => array('int', 0),
                'Animal Empathy' => array('cha', 0),
		'Appraise' => array('int', 1),
		'Balance' => array('dex*', 1),
		'Bluff' => array('cha', 1),
		'Climb' => array('str*', 1),
		'Concentration' => array('con', 1),
		'Craft (pick type)' => array('int', 1),
		'Decipher Script' => array('int', 0),
		'Diplomacy' => array('cha', 1),
		'Disable Device' => array('int', 0),
		'Disguise' => array('cha', 1),
		'Escape Artist' => array('dex*', 1),
		'Forgery' => array('int', 1),
		'Gather Information' => array('cha', 1),
		'Handle Animal' => array('cha', 0),
		'Heal' => array('wis', 1),
		'Hide' => array('dex*', 1),
		'Innuendo' => array('wis', 0),
		'Intimidate' => array('cha', 1),
		'Intuit Direction' => array('wis', 0),
		'Jump' => array('str*', 1),
		'Knowledge (pick type)' => array('int', 0),
		'Listen' => array('wis', 1),
		'Move Silently' => array('dex*', 1),
		'Open Lock' => array('dex', 0),
		'Perform (pick type)' => array('cha', 1),
		'Pick Picket' => array('dex*', 0),
		'Profession (pick type)' => array('wis', 0),
		'Read Lips' => array('int', 0),
		'Ride (pick type)' => array('dex', 1),
		'Scry' => array('int', 1),
		'Search' => array('int', 1),
		'Sense Motive' => array('wis', 1),
		'Spellcraft' => array('int', 1),
		'Spot' => array('wis', 1),
		'Swim' => array('str**', 1),
		'Tumble' => array('dex*', 1),
		'Use Magic Device' => array('cha', 0),
		'Use Rope' => array('dex', 1),
		'Wilderness Lore' => array('wis', 1),
		'Other' => array('?', 0)
);

?>

<table border=1 cellpadding=0 cellspacing=0>

<?PHP

foreach ($Skills as $Name => $Info)
{
   if ($Name == '')
   {
      echo "<tr><th>Skill (Ability)</th><th>&nbsp;Untrained&nbsp;</th>";
      echo "<th>&nbsp;Total Points&nbsp;<br>Added</th>";
      echo "<th>&nbsp;Total Ranks&nbsp;<br>Added</th>";
      echo "</tr>\n";
   }
   else
   {
      echo "<tr><th align=left>$Name ($Info[0])</th>";
      if ($Info[1])
         echo "<td align=center>Yes</td>";
      else
         echo "<td>&nbsp</td>";
      echo "<td>&nbsp;</td><td>&nbsp;</td></tr>\n";
   }
}

?>

</table>

<?PHP

StandardFooter();