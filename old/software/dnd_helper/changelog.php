<?php
/* -*- html -*-
 * / * Documentation for D&D Tools
 * / */
include('../../functions.inc');
StandardHeader(array(
		'title' => 'Change Log',
		'topic' => 'dnd_helper'
	));

?>

<dl>

<dt><b>1.2</b> - <i>November 2007</i></dt>
<dd>Finally created a PSR database with over 127 records, causing a problem.
Fixed it when I made a magic item generation database.</dd>
<dd>Added a couple more tables.</dd>

<dt><b>1.1</b> - <i>August 2003</i></dt>
<dd>Fixed capitalization errors with PSR rule generation.  Elvish Names
database has been updated to capitalize the first letter.</dd>
<dd>PHP class used to generate databases now supports capitalization of
rules and chances, which now work in PSR.</dd>
<dd>Database generation for letter pairs now produces a cache file for
fast loading of data for web-based generation.</dd>
<dd>Added web-based generation of data to show what the results would
look like.</dd>
<dd>Updated web site in many other places.</dd>

<dt><b>1.0</b> - <i>July 2003</i></dt>
<dd>Added help where there was none.  Reworded some other help screens just
a little.</dd>
<dd>Fixed a bug that I introduced along the way (not sure when it creeped
in).  The movement calculator now works as expected.</dd>
<dd>Since I believe that the generation routines are now working fully, and
that is the landmark I wanted for version 1.0, I bumped up the number.</dd>

<dt><b>0.7</b> - <i>June 2003</i></dt>
<dd>Records are now appended together for the Pick One and Letter Pair
sections.  This will speed up HotSyncing dramatically.</dd>
<dd>Rewrote dnd_helper.php to speed up creation of databases.</dd>
<dd>Recreated databases to use new format.  Upgrade all old copies!</dd>
<dd>If you pop up the number input form (experience) and you press a number
as the first keypress, you set the number to the keypress instead of blindly
adding another digit to the number.  This is what you would expect out of a
calculator.</dd>

<dt><b>0.6</b> - <i>June 2003</i></dt>
<dd>Added PSR generation.</dd>
<dd>Recreated the various databases.</dd>
<dd>Removed the 'small' databases.</dd>

<dt><b>0.5</b> - <i>May 2003</i></dt>
<dd>Databases can now be beamed and deleted from the Generate form.</dd>
<dd>Various minor bugfixes.</dd>

<dt><b>0.4</b> - <i>August 2002</i></dt>
<dd>Fixed letter pair generator.</dd>
<dd>Changed the screen to show a "working" message while generating the 
word.</dd>
<dd>Added a binary search algorithm to make word generation for letter pairs
and "pick one" much faster.</dd>
<dd>Added the flag for databases to generate random things multiple (10)
times.  Works great for word lists.</dd>

<dt><b>0.3</b> - <i>July 2002</i></dt>
<dd>Added random generator (letter pairs)</dd>

<dt><b>0.2</b> - <i>July 2002</i></dt>
<dd>Added random generator ("pick one")</dd>

<dt><b>0.1</b> - <i>July 2002</i></dt>
<dd>Initial version.  Included the die roller, experience calculator,
movement calculator, turning tables, reference tables (ability modifiers,
experience levels, treasure) and some help.</dd>

</dl>

<?php

StandardFooter();
