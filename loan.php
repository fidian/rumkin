<?php

$StartMonth = 4;
$StartYear = 2001;
$StartDue = 21500;
$Payments = array(
	// JAN  FEB  MAR  APR  MAY  JUN  JUL  AUG  SEP   OCT   NOV  DEC
	125,
	0,
	0,
	0,
	0, - 500,
	0,
	7288,
	250,  // 2001
	500,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1500,
	0,
	0,
	635,  // 2002
	2500,
	0,
	0,
	0,
	0,
	200,
	200,
	0,
	250,
	0,
	270,
	0,  // 2003
	200,
	200,
	200,
	500,
	200,
	400,
	0,
	200,
	200,
	200,
	200,
	0,  // 2004
	1500,
	0,
	0,
	0,
	200,
	0,
	200,
	0,
	0,
	200,
	0,
	0,  // 2005
	0,
	700,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,  // 2006
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,  // 2008
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	400,  // 2008
);

if (! isset($EstimatePayment))$EstimatePayment = 200;
$Months = array(
	'',
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
);
$Numbers = array();

foreach ($Payments as $Payment) {
	$Number['Month'] = $Months[$StartMonth];
	$Number['Year'] = $StartYear;
	$StartMonth ++;
	
	if ($StartMonth > 12) {
		$StartYear ++;
		$StartMonth = 1;
	}
	
	$Number['Due'] = $StartDue;
	$Number['Interest'] = ($StartDue * 0.07) / 12;
	$Number['Interest'] = round($Number['Interest'], 2);
	$Number['Paid'] = $Payment;
	$Number['Left'] = round($StartDue - $Payment + $Number['Interest'], 2);
	$StartDue = $Number['Left'];
	array_unshift($Numbers, $Number);
}

?><html><head><title>Pay Off Dad's Loan</title>
</head>
<body bgcolor="#FFFFFF">

<P><B>Notes:</b> Pay on the first of the month.  Payments made after that
day count towards the next month.</p>

<?php ShowTable('History', $Numbers); ?>

<form method=post action=loan.php>
<p><b>Estimate if payment is
$<input type=text name=EstimatePayment value="<?php echo $EstimatePayment ?>"
size=5><input type=submit value="Change"> - 
<input type=checkbox name="SeeFull"<?php

if (isset($SeeFull))echo ' CHECKED'; ?>> See all estimate entries
</b></p>
</form>

<?php

if ($EstimatePayment > round(($StartDue * 0.07) / 12, 2)) {
	$Estimate = array();
	$monthNum = 0;
	
	while ($StartDue && ($monthNum < 96 || isset($SeeFull))) {
		$monthNum ++;
		$Number['Month'] = $Months[$StartMonth];
		$Number['Year'] = $StartYear;
		$StartMonth ++;
		
		if ($StartMonth > 12) {
			$StartYear ++;
			$StartMonth = 1;
		}
		
		$Number['Due'] = $StartDue;
		$Number['Interest'] = ($StartDue * 0.07) / 12;
		$Number['Interest'] = round($Number['Interest'], 2);
		
		if ($StartDue + $Number['Interest'] < $EstimatePayment)$EstimatePayment = $StartDue + $Number['Interest'];
		$Number['Paid'] = $EstimatePayment;
		$Number['Left'] = round($StartDue + $Number['Interest'] - $EstimatePayment, 2);
		$StartDue = $Number['Left'];
		$Estimate[] = $Number;
	}
	
	ShowTable('Estimate', $Estimate);
} else {
	echo "<p><b>$EstimatePayment is not large enough!</b>  It must be $";
	echo round(($StartDue * 0.07) / 12, 2) + 0.01;
	echo " or larger.</p>\n";
}

?>
</body>
</html>
<?php

function ShowTable($Title, $Numbers) {
	
	?><h1><?php echo $Title ?></h1>
<table border=1>
<tr><th>Month / Year</th><th>Due</th><th>Interest</th><th>Paid</th>
<th>Left</th></tr>
<?php
	
	foreach ($Numbers as $Number) {
		echo '<tr><td align=center>' . $Number['Month'] . ' ' . $Number['Year'] . "</td><td align=center>$ " . ShowNumber($Number['Due']) . "</td><td align=center>$ " . ShowNumber($Number['Interest']) . "</td><td align=center>$ " . $Number['Paid'] . "</td><td align=center>$ " . ShowNumber($Number['Left']) . "</td></tr>\n";
	}
	
	echo "</table>\n";
}


function ShowNumber($Number) {
	settype($Number, 'string');
	
	if (strpos($Number, '.') === false)$Number .= '.';
	
	while (! ereg('\.[0-9][0-9]', $Number))$Number .= '0';
	return $Number;
}

