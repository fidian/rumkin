<?php

require '../functions.inc';
CheckForLogin('restricted');
StandardHeader(array(
		'title' => 'Web Server Statistics'
	));
$Files = FindFiles();
$f2 = array();

foreach ($Files as $f) {
	$ff = substr($f, 2) . ' - ' . substr($f, 0, 2);
	$f2[$ff] = $f;
}

ksort($f2);
$f2 = array_reverse($f2);
$f2Keys = array_keys($f2);
$file = '';

if (isset($_REQUEST['file']))$file = $_REQUEST['file'];

if (! in_array($file, $Files))$file = $f2[$f2Keys[0]];

?>
<form method=get action="awstats.php">
<select name="file">
<?php

foreach ($f2 as $k => $v) {
	echo "<option value=\"$v\"";
	
	if ($v == $file)echo ' selected';
	echo ">$k</option>\n";
}

?></select>
<input type=submit value="Change Month">
</form>
<?php

$path = '';

if (isset($_REQUEST['path']))$path = $_REQUEST['path'];

if (substr($path, 0, 1) != '/')$path = '/';
$Results = LoadData($file, $path);

if (! isset($Results[$path]))$Results[$path] = array(
	0,
	0,
	0,
	0
);

// Draw the table ?>
<table border=1 cellspacing=0 cellpadding=1>
<tr><th>Directory</th><th colspan=2>Hits</th><th colspan=2>Bandwidth</th>
<th>In - Out</th></tr>
<?php

if ($path != '/') {
	$newpath = split('/', $path);
	array_pop($newpath);
	array_pop($newpath);
	$newpath = join('/', $newpath) . '/'; ?>
<tr><td><a href="<?php echo $GLOBALS['PHP_SELF'] . '?file=' . $file . '&path=' . urlencode($newpath) ?>"><?php echo $newpath ?></a></td>
<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
<td>&nbsp;</td></tr>
<?php
}

$max = array(
	0,
	0,
	0,
	0
);

foreach ($Results as $k => $v) {
	foreach ($v as $kk => $e) {
		if ($max[$kk] < $e)$max[$kk] = $e;
	}
}

ksort($Results);

foreach ($Results as $k => $v) {
	$widths = array();
	
	foreach ($max as $kk => $vv) {
		if ($kk < 3) {
			$widths[$kk] = 150 * ($v[$kk] / $vv);
			settype($widths[$kk], 'integer');
		}
	}
	
	?><tr><td><?php
	
	if (substr($k, - 1) == '/') {
		
		?><a href="<?php echo $GLOBALS['PHP_SELF'] . '?file=' . $file . '&path=' . urlencode($k) ?>"><?php echo $k ?></a><?php
	} else {
		
		?><?php echo $k ?><?php
	} ?></td>
<td align="right"><?php echo Comma($v[0]) ?></td><td>
<div style="width:<?php echo $widths[0] ?>px; background-color:#FF7777; border: 1px solid black; height: 1em"></div>
</td>
<td align="right"><?php echo FidianFileSize($v[1], true, true) ?></td><td>
<div style="width:<?php echo $widths[0] ?>px; background-color:#FF7777; border: 1px solid black; height: 1em"></div>
</td>
<td align="center"><?php echo Comma($v[2]) ?> - <?php echo Comma($v[3]) ?></td>
<?php
}

?>
</table>
<?php

StandardFooter();


function FindFiles() {
	$dir = opendir('/var/lib/awstats/');
	$files = array();
	
	while (($file = readdir($dir)) !== false) {
		if (preg_match('/^awstats([0-9]{6})\\.txt$/i', $file, $hits)) {
			$files[] = $hits[1];
		}
	}
	
	closedir($dir);
	return $files;
}


function LoadData($file, $path) {
	$file = '/var/lib/awstats/awstats' . $file . '.txt';
	$fp = fopen($file, 'r');
	
	if (! $fp)return array();
	$line = '';
	
	while (! feof($fp) && substr($line, 0, 12) != 'BEGIN_SIDER ') {
		$line = fgets($fp, 1024);
		
		if (substr($line, 0, 10) == 'POS_SIDER ') {
			fseek($fp, substr($line, 11), SEEK_SET);
			$line = fgets($fp, 1024);
		}
	}
	
	$lines = substr($line, 12);
	settype($lines, 'integer');
	$result = array();
	
	while ($lines --) {
		$line = fgets($fp, 1024);
		
		if (strcmp($path, substr($line, 0, strlen($path))) == 0) {
			$data = split(' ', $line);
			$dir = substr($data[0], strlen($path));
			$spot = strpos($dir, '/');
			
			if ($spot !== false && $spot > 0)$dir = substr($dir, 0, $spot + 1);
			$dir = $path . $dir;
			settype($data[1], 'integer');
			settype($data[2], 'integer');
			settype($data[3], 'integer');
			settype($data[4], 'integer');
			
			if (! isset($result[$dir]))$result[$dir] = array(
				0,
				0,
				0,
				0
			);
			$result[$dir][0] += $data[1];
			$result[$dir][1] += $data[2];
			$result[$dir][2] += $data[3];
			$result[$dir][3] += $data[4];
		}
	}
	
	return $result;
}


function Comma($num) {
	$out = '';
	
	while (strlen($num) > 3) {
		$out = ',' . substr($num, - 3) . $out;
		$num = substr($num, 0, strlen($num) - 3);
	}
	
	return $num . $out;
}

