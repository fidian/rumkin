<?php
/* -*- text -*-
 * $DBPath = "../db/"; */
$DBPath = getenv('MEDIABASE') . 'software/dnd_helper/';

?>
<html><head><title>DB Generation</title></head>
<body bgcolor=#FFFFFF>
<?php

include '../../../inc/php/php-pdb.inc';
include '../download/dnd_helper.inc';
include '../download/psr.inc';
include 'dblist.inc';
set_time_limit(0);

if (isset($_REQUEST['generate']) && is_array($_REQUEST['generate'])) {
	foreach (array_keys($_REQUEST['generate']) as $what) {
		if (isset($dblist[$what]))Generate($what);
		else Say("$what -- doesn't exist");
	}
	
	echo "<hr>\n";
}

?>
<form method=post action=db_gen.php>
<table border=1>
<tr><th>X</th><th>Name</th><?php echo ShowFile(false) ?></tr>
<?php

foreach ($dblist as $name => $data) {
	$numFiles = array();
	
	if (isset($data['generate'])) {
		foreach ($data['generate'] as $type => $params) {
			foreach ($params as $k => $v) {
				if ($k == 'pdb' || $k == 'pdb_c') {
					$numFiles[] = array(
						$type,
						$k,
						$v
					);
				}
			}
		}
	}
	
	$rows = count($numFiles);
	
	if ($rows < 1) {
		$rows = 1;
		$numFiles[] = array();
	}
	
	?><tr><td rowspan=<?php echo $rows ?>>
  <input type=checkbox name="generate[<?php echo $name ?>]">
</td><td rowspan=<?php echo $rows ?>>
  <b><?php echo $name ?></b>
</td><?php echo ShowFile(array_shift($numFiles)) ?></tr>
<?php
	
	while (count($numFiles)) {
		
		?><tr><?php echo ShowFile(array_shift($numFiles)); ?></tr>
<?php
	}
}

?>
</table>
<input type=submit value="Generate Selected Databases">
</form>

<?php

function ShowFile($info) {
	global $dblist, $DBPath;
	
	if ($info === false)return '<th>Type</th><th>Files</th><th>Size</th><th>Date</th>';
	
	if (count($info) < 3)return '<td colspan=4>--- no files ---</td>';
	$filename = $DBPath . $info[2];
	
	if (file_exists($filename)) {
		$filesize = filesize($filename);
		$filedate = date('F d, Y H:i:s', filemtime($filename));
		$linkpre = "<a href=\"$filename\">";
		$linkpost = '</a>';
	} else {
		$filesize = 'Doesn\'t exist';
		$filedate = '&nbsp;';
		$linkpre = '';
		$linkpost = '';
	}
	
	return '<td>' . $info[0] . '</td><td>' . $linkpre . $info[2] . $linkpost . '</td><td>' . $filesize . '</td><td>' . $filedate . '</td>';
}


function Generate($name) {
	global $dblist, $DBPath;
	Say('Generating:  ' . $name);
	$data = $dblist[$name];
	
	if (! isset($data['generate'])) {
		Say("$name does not contain generation data!");
		return;
	}
	
	if (isset($data['generate']['letter pair'])) {
		$data_gen = $data['generate']['letter pair'];
		Say(' - Loading data');
		$R = new DndHelper_LetterPairs();
		$fp = fopen($data_gen['data'], 'r');
		
		while ($fp && ! feof($fp)) {
			$line = fgets($fp, 2048);
			$line = trim($line);
			
			if (isset($data_gen['lowercase']) && $data_gen['lowercase'])$line = strtolower($line);
			$R->AddEntry($line);
		}
		
		fclose($fp);
		
		if (isset($data_gen['cache']))WriteCache($R, $name, $data_gen['cache']);
		
		if (isset($data_gen['pdb_c'])) {
			Say(' - Writing chance pdb');
			$N = $name;
			$M = false;
			
			if (isset($data_gen['pdb_c name']))$N = $data_gen['pdb_c name'];
			
			if (isset($data['multiple']) && $data['multiple'])$M = true;
			$pdb = new PalmDndHelper($N, $M);
			$pdb->AddSection($R->Freeze());
			$fp = fopen($DBPath . $data_gen['pdb_c'], 'w');
			$pdb->WriteToFile($fp);
			fclose($fp);
		}
		
		$R->UseChances = false;
		
		if (isset($data_gen['pdb'])) {
			Say(' - Writing non-chance pdb');
			$N = $name;
			$M = false;
			
			if (isset($data_gen['pdb name']))$N = $data_gen['pdb name'];
			
			if (isset($data['multiple']) && $data['multiple'])$M = true;
			$pdb = new PalmDndHelper($N, $M);
			$pdb->AddSection($R->Freeze());
			$fp = fopen($DBPath . $data_gen['pdb'], 'w');
			$pdb->WriteToFile($fp);
			fclose($fp);
		}
	}
	
	if (isset($data['generate']['pick one'])) {
		Say('Creating "pick one" style database');
		$data_gen = $data['generate']['pick one'];
		$N = $name;
		$M = false;
		
		if (isset($data_gen['name']))$N = $data_gen['name'];
		
		if (isset($data['multiple']) && $data['multiple'])$M = true;
		$pdb = new PalmDndHelper($N, $M);
		$R = new DndHelper_Random();
		
		if (isset($data_gen['include']) && $data_gen['include'])
		include $data_gen['data'];
		else {
			$fp = fopen($data_gen['data'], 'r');
			
			while ($fp && ! feof($fp)) {
				$line = fgets($fp, 2048);
				$line = trim($line);
				
				if (isset($data_gen['lowercase']) && $data_gen['lowercase'])$line = strtolower($line);
				$R->AddEntry($line);
			}
			
			fclose($fp);
		}
		
		$pdb->AddSection($R->Freeze());
		$fp = fopen($DBPath . $data_gen['pdb'], 'w');
		$pdb->WriteToFile($fp);
		fclose($fp);
	}
	
	if (isset($data['generate']['psr'])) {
		Say('Creating PSR style database');
		$data_gen = $data['generate']['psr'];
		$N = $name;
		$M = false;
		
		if (isset($data_gen['name']))$N = $data_gen['name'];
		
		if (isset($data['multiple']) && $data['multiple'])$M = true;
		$pdb = new PalmDndHelper($N, $M);
		$P = new DndHelper_PSR();
		$info = GeneratePSRData($data_gen['data']);
		$x = print_r($info, true);
		
		foreach ($info as $key => $n) {
			foreach ($n as $rule_data) {
				$P->AddEntry($key, $rule_data[1], $rule_data[0]);
			}
		}
		
		$pdb->AddSection($P->Freeze());
		$fp = fopen($DBPath . $data_gen['pdb'], 'w');
		$pdb->WriteToFile($fp);
		fclose($fp);
	}
	
	Say('Done');
}


function Say($str) {
	echo $str;
	echo "<br>\n";
	flush();
}


function GetLine($fp) {
	$line = trim(fgets($fp, 1024));
	
	while (substr($line, 0, 1) == '#' && ! feof($fp)) {
		$line = trim(fgets($fp, 1024));
	}
	
	while (substr($line, - 1) == '\\' && ! feof($fp)) {
		$line2 = trim(fgets($fp, 1024));
		
		while ($line[0] == '#' && ! feof($fp)) {
			$line2 = trim(fgets($fp, 1024));
		}
		
		$line = substr($line, 0, strlen($line) - 1) . $line2;
	}
	
	return $line;
}


function WriteCache($pdb, $name, $file) {
	$fp = fopen(getenv('MEDIABASE') . 'software/dnd_helper/cache/' . $file, 'w');
	$StoredData = array();
	
	if (! $fp) {
		echo 'Can not open ' . $file;
		return;
	}
	
	fputs($fp, "<?PHP\n");
	fputs($fp, "// Automatically created with db_gen.php\n");
	fputs($fp, "\$CachedInfo = array();\n");
	
	// Recalculate the starting pairs to be quicker to generate
	$Total = 0;
	$SP = array();
	
	foreach ($pdb->StartPairs as $k => $j) {
		$Total += $j;
		$n = array(
			$Total,
			$k
		);
		$SP[] = $n;
	}
	
	fputs($fp, ToText('startpairs_total', $Total));
	fputs($fp, ToText('startpairs', $SP));
	$dd = array();
	$dt = array();
	
	foreach ($pdb->Data as $k => $v) {
		/* k is the first letter
		 * v is an array of data */
		foreach ($v as $n => $m) {
			/* n is the second letter
			 * m is an array of data */
			$Total = 0;
			$kn = chr($k) . chr($n);
			$dd[$kn] = array();
			
			foreach ($m as $r => $s) {
				/* r is the third letter
				 * s is the number of times it happens */
				$Total += $s;
				$q = array(
					$Total,
					chr($r)
				);
				$dd[$kn][] = $q;
			}
			
			$dt[$kn] = $Total;
		}
	}
	
	fputs($fp, ToText('data_total', $dt));
	fputs($fp, ToText('data', $dd));
	fclose($fp);
}


function ToText($name, &$data) {
	$str = serialize($data);
	$str = str_replace('\\', '\\\\', $str);
	$str = str_replace('\'', '\\\'', $str);
	return "\$CachedInfo['$name'] = " . DumpAsText($data) . ";\n";
}


function DumpAsText(&$data) {
	if (is_array($data)) {
		$str = 'array(';
		$comma = 0;
		$num = 0;
		$long = 0;
		
		foreach ($data as $k => $v) {
			if ($k != $num)$long = 1;
			$num ++;
		}
		
		foreach ($data as $k => $v) {
			if ($comma)$str .= ',';
			else $comma = 1;
			
			if ($long)$str .= DumpAsText($k) . '=>';
			$str .= DumpAsText($v);
		}
		
		return $str . ')';
	}
	
	$str = $data;
	$str = str_replace('\\', '\\\\', $str);
	$str = str_replace('\'', '\\\'', $str);
	return '\'' . $str . '\'';
}

