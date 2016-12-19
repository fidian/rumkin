<?php

function Rate($v) {
	$Desc = array(
		'Untested',
		'Horrible',
		'Poor',
		'Fair',
		'Good',
		'Awesome'
	);
	
	if (isset($Desc[$v])) {
		return $v . '&nbsp;-&nbsp;' . $Desc[$v];
	}
	
	return $v;
}

