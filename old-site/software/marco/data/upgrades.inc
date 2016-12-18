<p>When registering Marco, you will get a limited number of bugfixes and
enhancements for free.  To help keep track of what versions you can and can
not use, a "magic number" is encoded into the RegCode and embedded into
Marco.  That lets me allow people to upgrade Marco to the newest version
when updates are made.</p>

<p>When new features are added, the magic number gets made just a little bit
bigger.  The magic number is not changed if there is just a bugfix or minor
enhancement.  When the magic number is too big, your registration code will
no longer work and you will need to register a newer copy of Marco.</p>

<p>To see what versions of Marco you can use, just look on the table below.
If you use a version of Marco that is outside of your range, the software will
become unregistered.  You will need to install a different version and enter
your old code or install the latest version of Marco and just re-register 
it.</p>

<table align=center border=1 cellpadding=2 cellspacing=0>
<tr><th>Registered<br>Version</th><th>Maximum<br>Version</th>
<th>The reason for the change</th></tr>
<?php

$data = array(
	array(
		'3.0',
		'Any',
		'Multiple point databases, restructured strings'
	),
	array(
		'2.6',
		'Any',
		'Grading PI, area of polygon, quadriatic solver'
	),
	array(
		'2.5',
		'Any',
		'Angle converter, reworked lots of code, bearing'
	),
	array(
		'2.2 - 2.4',
		'Any',
		'Save point'
	),
	array(
		'1.9 - 2.1',
		'Any',
		'Keyboard, center line for curves formulas'
	),
	array(
		'1.6 - 1.8',
		'3.0',
		'Center line for curves'
	),
	array(
		'1.5',
		'2.6',
		'Center line for lines'
	),
	array(
		'1.0 - 1.4',
		'2.5',
		'Initial registration system'
	),
);

foreach ($data as $d) {
	echo '<tr><td align=center>' . $d[0] . '</td><td align=center>' . $d[1] . '</td><td>' . $d[2] . "</td></tr>\n";
}

?></table>
