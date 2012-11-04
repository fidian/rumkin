<?php

$myIP = '208.42.148.115';


/* Output:
 *   Title \n
 *   HTML \n
 *   Address for geocode ( + \n + alternate ...) */
include_once('phpwhois-4.1.2/whois.main.php');
$IP = false;

if (! $IP && isset($_GET) && isset($_GET['ip'])) {
	$IP = $_GET['ip'];
}

if (! $IP && isset($_SERVER) && isset($_SERVER['REMOTE_ADDR'])) {
	$IP = $_SERVER['REMOTE_ADDR'];
}


// So this can be ran from the command line
if (! $IP && isset($argv) && isset($argv[1])) {
	$debug = 1;
	$IP = $argv[1];
}

if (! $IP) {
	$IP = $myIP;
}

$isIP = true;
$Num = '([0-9]|[0-9][0-9]|[01][0-9][0-9]|2[01234][0-9]|25[012345])';

if (! preg_match('/(' . $Num . '\\.){3}' . $Num . '/', $IP . '.')) {
	$isIP = false;
}

if ($debug) {
	echo "Whois: $IP (isIP=$isIP)\n";
}


// Will not return if it can find the IP/domain
ShowInfo($IP, false, $debug);

if ($isIP) {
	echo 'Invalid IP';
	return;
}


// Try to get the IP and resolve that
$realIP = gethostbyname($IP);

if ($realIP == '127.0.0.1') {
	$realIP = $myIP;
}

if ($debug) {
	echo "Resolved to $realIP\n";
}

if ($realIP != $IP) {
	ShowInfo($IP, $IP . ' (' . $realIP . ')', $debug);
}

echo 'Could not find owner address';

if ($debug) {
	echo "\n";
}


function ShowInfo($IP, $display = false, $debug) {
	$whois = new Whois();
	$res = $whois->Lookup($IP);
	
	if ($debug) {
		print_r($res);
	}
	
	if (! $res || ! is_array($res) || ! isset($res['regrinfo']) || ! is_array($res['regrinfo']) || ! isset($res['regrinfo']['owner']) || ! is_array($res['regrinfo']['owner']) || ! isset($res['regrinfo']['owner']['address']) || ! is_array($res['regrinfo']['owner']['address'])) {
		if ($debug) {
			echo "Did not contain [regrinfo][owner][address]\n";
		}
		
		return;
	}
	
	$res = $res['regrinfo']['owner']['address'];
	echo $IP . "\n";
	
	if ($display !== false) {
		echo $display;
	} else {
		echo $IP;
	}
	
	echo '<br />';
	
	if (isset($res['country'])) {
		if ($res['country'] == 'US') {
			echo $res['street'] . '<br />' . $res['city'] . ', ' . $res['state'] . ' ' . $res['pcode'];
			echo "\n" . $res['street'] . ', ' . $res['city'] . ', ' . $res['state'] . ' ' . $res['pcode'];
			echo "\n" . $res['city'] . ', ' . $res['state'] . ' ' . $res['pcode'];
			echo "\n" . $res['pcode'];
		} else {
			echo $res['country'];
			echo "\n" . $res['country'];
		}
	} else {
		echo implode('<br>', $res);
		
		while (count($res) > 1 || ($res && strpos($str, ' ') !== false)) {
			echo "\n" . implode(', ', $res);
			array_shift($res);
		}
	}
	
	if ($debug) {
		echo "\n";
	}
	
	// Do not return on success
	exit();
}

