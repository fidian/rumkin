<?php

include('db_gen/dblist.inc');
include('download/psr.inc');

if (isset($_REQUEST['db']))$db = $_REQUEST['db'];

if (isset($_REQUEST['type']))$type = $_REQUEST['type'];

if (! isset($db) || ! isset($type) || ! isset($dblist[$db]) || ! isset($dblist[$db]['generate']) || ! isset($dblist[$db]['generate'][$type])) {
	
	?><html><head><title>Error</title></head></html>
<body bgcolor=#FFFFFF text=#000000>
You have called this script with invalid information.
</body></html>
<?php
	
	exit();
}

?><html><head><title>Sample Output</title>
</head>
<body bgcolor=#FFFFFF text=#000000>
<p><font size="+2"><?php echo htmlspecialchars($db) ?></font><br>
<font size="-1">Style:	<?php echo $type ?><br>
<a href="javascript:window.location.reload()">Reload</a></font></p>

<?php

if (isset($dblist[$db]['multiple']) && $dblist[$db]['multiple'])GenerateOutput($type, $dblist[$db]['generate'][$type], 20);
else GenerateOutput($type, $dblist[$db]['generate'][$type], 1);

?>
</body></html>
<?php

function GenerateOutput($type, $data, $count) {
	if ($type == 'letter pair')GenerateOutputLetterPair($data, $count);
	elseif ($type == 'psr')GenerateOutputPSR($data, $count);
	elseif ($type == 'pick one')GenerateOutputPickOne($data, $count);
	else echo 'Invalid type.';
}


function GenerateOutputLetterPair($info, $count) {
	$cache_file = getenv('MEDIABASE') . 'software/dnd_helper/cache/' . $info['cache'];
	
	if (! isset($info['cache']) || ! file_exists($cache_file)) {
		echo "Unable to generate data -- cache file does not exist.\n";
		return;
	}
	include($cache_file);
	
	while ($count --) {
		// Pick a starting pair
		$word = PickRandomPSR($CachedInfo['startpairs_total'], $CachedInfo['startpairs']);
		$m = 1;
		
		do {
			$key = substr($word, - 2);
			$m = PickRandomPSR($CachedInfo['data_total'][$key], $CachedInfo['data'][$key]);
			
			if (ord($m))$word .= $m;
		} while (ord($m) && strlen($word) < 20);
		echo $word;
		
		if ($count)echo '<br>';
	}
}


class FakePalmClass {
	public $Data = array();
	
	
	public function AddEntry($data) {
		$this->Data[] = $data;
	}
}


function GenerateOutputPickOne($info, $count) {
	$data_dir = getenv('MEDIABASE') . 'software/dnd_helper/raw_data/';
	
	if (isset($info['include']) && $info['include']) {
		$R = new FakePalmClass();
		include($data_dir . $info['data']);
		$arr = $R->Data;
	} else {
		$fp = fopen($data_dir . $info['data'], 'r');
		$arr = array();
		
		while ($fp && ! feof($fp)) {
			$line = fgets($fp, 2048);
			$line = trim($line);
			
			if (isset($info['lowercase']) && $info['lowercase'])$line = strtolower($line);
			$arr[] = $line;
		}
		
		fclose($fp);
	}
	
	while ($count --) {
		echo nl2br(htmlspecialchars($arr[rand(0, count($arr) - 1)]));
		
		if ($count)echo "<br>\n";
	}
}


function GenerateOutputPSR($info, $count) {
	$fname = $info['data'];
	
	if (substr($fname, 0, 1) != '/')$fname = getenv(MEDIABASE) . 'software/dnd_helper/raw_data/' . $fname;
	$data = GeneratePSRData($fname);
	$results = GeneratePSR($data, $count);
	
	// Generate the message
	while (count($results)) {
		$r = array_shift($results);
		echo nl2br(htmlspecialchars($r));
		
		if (count($results))echo "<br>\n";
	}
}

