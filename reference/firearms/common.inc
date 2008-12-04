<?php

include '../../functions.inc';


function GunHeader($title) {
	StandardHeader(array(
			'title' => $title,
			'topic' => 'guns'
		));
	MakeBoxTop('center');
	
	?>

<center>

<a href="index.php">Main Index</a> -
<a href="links.php">Links</a>
<br>

<a href="ballistic_gel.php">Ballistic&nbsp;Gel</a> -
<a href="alternatives.php">Gel&nbsp;Alternatives</a> -
<a href="preparation.php">Gel Preparation</a> -
<a href="gel_tips.php">Tips and Tricks</a>

</center>

<?php
	
	MakeBoxBottom();
}

