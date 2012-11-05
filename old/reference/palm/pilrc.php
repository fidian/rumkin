<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Palm OS Programming - PilRC Tips',
		'topic' => 'palmos'
	));

?>

<p>If you want to use a scrollbar, the easiest way to get it to be the
correct width and height is to put it right after your list, table, or
whatever, and refer to the previous top, height, right, etc.  Also, you can
see with this example that each row in the table is 11 pixels (on low-res
devices, ...uh... "units" on new ones) high.  So if you need 9 rows, make
your table 99 high.  This is only with the default font.

<pre>TABLE ID TableID AT (1 18 150 121) ROWS 11 COLUMNS 1 COLUMNWIDTHS 150
SCROLLBAR ID ScrollID AT (PREVRIGHT+2 PREVTOP-1 7 PREVHEIGHT+2)
</pre>

<?php

StandardFooter();
