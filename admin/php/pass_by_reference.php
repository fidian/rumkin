<html><head><title>Test:  Pass by Reference</title>
</head>
<body>
<?php

$value = 'boing';
echo "1: Value = $value<br>\n";
$Params = array(
	$value
);
RunFunc($Params);
echo '4: Value = ' . $Params[0] . "<br>\n";
echo "4: Value = $value<br>\n";


function RunFunc(&$params) {
	//    $params = func_get_args();
	echo '2: Value = ' . $params[0] . "<br>\n";
	$params[0] = 'goober';
	echo '3: Value = ' . $params[0] . "<br>\n";
}

?></body></html>
