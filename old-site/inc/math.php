<?php


// Special include file for showing mathematical formulas
$GLOBALS['Include jsMath'] = true;


function MathFormulaBox($formula, $number = false) {
	$FontStart = '<font size="+2">';
	$FontEnd = '</font>';
	
	if (! is_array($formula))$formula = array(
		$formula
	);
	echo '<div class=mathbox width=100% align=center>';
	
	if ($number)echo '<table width=100% border=0 cellpadding=0 cellspacing=0>';
	else echo $FontStart;
	
	foreach ($formula as $k => $v) {
		if ($number)echo "<tr><td width=90% align=center>$FontStart";
		echo "<span class=math>$v</span>";
		
		if ($number)echo "$FontEnd</td><td width=10% align=center class=typeset>" . $FontStart . htmlspecialchars($k) . $FontEnd . '</td></tr>';
	}
	
	if ($number)echo '</table>';
	else echo $FontEnd;
	echo '</div>';
}


function MathFormulaInline($formula) {
	$style = array(
		'background: white',
		'text: black'
	);
	$style = implode(';', $style);
	
	?><span style="<?php echo $style ?>"><span class=math><?php echo $formula ?></span></span>
<?php
}

