<?php

include '../../functions.inc';
CheckForLogin('dnd');
StandardHeader(array(
		'title' => 'D&amp;D Things',
		'header' => '3ed D&amp;D - Restricted Page',
		'topic' => 'dnd_restricted'
	));
Section('Magic Items');
echo '<p>These are scanned pages of books containing magic items.</p>';
MakePageList('Dungeon Master Guide', 'dmg', 41);
MakePageList('Oriental Adventures', 'oriental', 14);
MakePageList('Traps and Treachery', 'traps', 5);
MakePageList('Pale Designs: A Poisoner\'s Handbook', 'poisoner', 6);
MakePageList('Magic of Faerun', 'faerun', 33);
Section('Mundane Items');
echo "<p>More scanned pages of things many people would like.</p>\n";
MakePageList('Ultimate Equipment Guide - Armory - Armors', 'ueg-armory-armor', 14);

if (file_exists($_SESSION['Login_User'] . '.inc'))
include $_SESSION['Login_User'] . '.inc';
StandardFooter();


function ShowCosts($info) {
	$gold = 340000;
	echo "<table border=0 cellpadding=0 cellspacing=0>\n";
	
	foreach ($info as $k => $g) {
		echo '<tr><td>' . htmlspecialchars($k) . '</td><td>&nbsp;</td>' . '<td align=right>' . number_format($g) . "</td></tr>\n";
		$gold -= $g;
	}
	
	echo '<tr><th>Gold Left</th><td>&nbsp;&nbsp;</td><td align=right><b>' . number_format($gold) . "</b></td></tr>\n";
	echo "</table>\n";
}


function MakePageList($Name, $Base, $Max) {
	echo '<p>' . $Name . ':  ';
	
	for ($i = 1; $i <= $Max; $i ++) {
		echo "<a href=\"media/restricted/$Base";
		$j = $i;
		
		while (strlen($j) < 4)$j = '0' . $j;
		echo $j . ".png\">$i</a> ";
	}
	
	echo '</p>';
}

