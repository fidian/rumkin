<?php

include '../../../functions.inc';
StandardHeader(array(
		'title' => 'Freecell',
		'topic' => 'fun'
	));

?>
<p align="center">
<applet code=GameFrame.class width="800" height="650" archive="media/freecell.jar">
The Freecell applet
</applet>
</p>

<p align="center"><font size="-1">
By <a href="http://www.paassen.tmfweb.nl/">W.P. van Paassen</a>
and E.C. Brummel</font></p>

<?php

StandardFooter();
