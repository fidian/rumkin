<?php

include('../../functions.inc');
header('Pragma: no-cache');
StandardHeader(array(
		'title' => 'RBL Checker',
		'topic' => 'reference'
	));
$ip = '';

if (isset($_POST['ip']))$ip = $_POST['ip'];
$ip = preg_replace('/[^0-9\\.]/', '', $ip);

?>

<p>If you want a significantly more thorough checker, see the one at
<a href="http://whatismyipaddress.com/staticpages/index.php/is-my-ip-address-blacklisted">WhatIsMyIPAddress</a>.</p>

<form method=post action=rblcheck.php>
IP to check:  <input type=text name="ip" value="<?php echo $ip ?>">
<input type=submit value="Check RBLs">
</form>
<br>

<?php

if ($ip != '') {
	echo 'IP:  ' . $ip . '<br><br>';
	$rbl_sites = array(
		'bl.spamcop.net',
		'dnsbl.njabl.org',
		'list.dsbl.org',
		'cbl.abuseat.org',
		'dnsbl.net.au',
		'sbl.spamhaus.org'
	);
	$rip = reverse_ip($ip);
	
	foreach ($rbl_sites as $site) {
		echo "<b>$site</b>:  ";
		$res = is_blacklisted($rip, $site);
		
		if ($res !== true && $res !== false) {
			echo 'AAAA' . nl2br(htmlspecialchars($res));
		} elseif ($res === true) {
			echo 'SPAM';
		} else {
			echo 'Ok';
		}
		
		echo "<br>\n";
		flush();
	}
}

StandardFooter();


function reverse_ip($ip) {
	$quad = explode('.', $ip);
	return $quad[3] . '.' . $quad[2] . '.' . $quad[1] . '.' . $quad[0] . '.';
}


function is_blacklisted($quad, $host) {
	if (checkdnsrr($quad . $host, 'A')) {
		$p = popen('host -t TXT ' . $quad . $host . ' | grep -vE "^;;" 2>&1', 'r');
		$result = '';
		
		while (! feof($p)) {
			$result .= fgets($p);
		}
		
		pclose($p);
		
		if ($result != '')return $result;
		return true;
	}
	
	return false;
}

