<?PHP

require('../../functions.inc');
require('../../inc/zip.php');

// Validate input
$errors = array();
$data = array();

foreach (array('ssid', 'connection', 'authentication', 'encryption', 'networkkey') as $key) {
	if (! isset($_REQUEST[$key])) {
		$errors[] = $key . ' is missing';
	} else {
		$data[$key] = $_REQUEST[$key];
	}
}

foreach (array('automatically', 'ieee802dot1x', 'autorun', 'batch') as $key) {
	if (! isset($_REQUEST[$key])) {
		$data[$key] = false;
	} else {
		$data[$key] = true;
	}
}

if (strlen($data['ssid']) == 0) {
	showErrorAndExit('SSID is empty');
}

checkValid('connection', $data['connection'], array('ESS', 'IBSS'), $errors);
checkValid('authentication', $data['authentication'], array('open', 'shared', 'WPA-NONE', 'WPA', 'WPAPSK', 'WPA2', 'WPA2PSK'), $errors);
checkValid('encryption', $data['encryption'], array('none', 'WEP', 'TKIP', 'AES'), $errors);



$wsetting = file_get_contents('addons/WSETTING.TXT');
$wsetting = str_replace('##SSID##', $data['ssid'], $wsetting);
$wsetting = str_replace('##NETWORKKEY##', $data['networkkey'], $wsetting);
$wsetting = str_replace('##AUTOMATICALLY##', (int) $data['automatically'], $wsetting);
$wsetting = str_replace('##AUTHENTICATION##', $data['authentication'], $wsetting);
$wsetting = str_replace('##ENCRYPTION##', $data['encryption'], $wsetting);
$wsetting = str_replace('##CONNECTION##', $data['connection'], $wsetting);


$xml = new DOMDocument('1.0');
$xml->formatOutput = true;
$wp = $xml->createElementNS('http://www.microsoft.com/provisioning/WirelessProfile/2004', 'wirelessProfile');

// Create the config section
$config = $xml->createElement('config');
$config->appendChild($xml->createElement('configId', makeGUID()));
$config->appendChild($xml->createElement('configAuthorId', 'F46A7048-620F-7C40-779F-443FAA05003A'));
$config->appendChild($xml->createElement('configAuthor', 'Rumkin.com Generator at http://rumkin.com/tools/wcn/'));
$wp->appendChild($config);

// ssid
$e = $xml->createElement('ssid', $data['ssid']);
$e->setAttribute('xml:space', 'preserve');
$wp->appendChild($e);

// connection type
$wp->appendChild($xml->createElement('connectionType', $data['connection']));

// primary profile
$profile = $xml->createElement('primaryProfile');
$profile->appendChild($xml->createElement('authentication', $data['authentication']));
$profile->appendChild($xml->createElement('encryption', $data['encryption']));
$e = $xml->createElement('networkKey', $data['networkkey']);
$e->setAttribute('xml:space', 'preserve');
$profile->appendChild($e);
$profile->appendChild($xml->createElement('keyProvidedAutomatically', (int) $data['automatically']));
$profile->appendChild($xml->createElement('ieee802Dot1xEnabled', (int) $data['ieee802dot1x']));
$wp->appendChild($profile);

// Finish up.
$xml->appendChild($wp);

// Can't validate for whatever reason, but M$ XML doesn't validate either.
$xml = $xml->saveXML();


// Build the zip file in memory
$zip = new zipfile();

if ($data['autorun']) {
	addFile($zip, 'addons/', 'AUTORUN.INF');
}

if ($data['batch']) {
	addFile($zip, 'addons/', 'Install_Wireless.bat');
}

$mediaDir = getenv('MEDIABASE') . 'tools/wcn/';
addFile($zip, $mediaDir . 'base/', 'setupSNK.exe');
$zip->addDir('SMRTNTKY/', filemtime($mediaDir . 'base/SMRTNTKY/'));

if ($data['autorun']) {
	addFile($zip, $mediaDir . 'base/', 'SMRTNTKY/fcw.ico');
}

addFile($zip, 'addons/', 'SMRTNTKY/MessageB.txt');
$zip->addFile($xml, 'SMRTNTKY/WSETTING.WFC');
$zip->addFile($wsetting, 'SMRTNTKY/WSETTING.TXT');

ShowZipFileHeaders('wcd-usb.zip');
echo $zip->file();


function addFile($zip, $baseDir, $file) {
	$zip->addFile(file_get_contents($baseDir . $file), $file, filemtime($baseDir . $file));
}

function checkValid($name, $value, $allowed, &$errors) {
	if (! in_array($value, $allowed)) {
		showErrorAndExit($name . ' is set to a value that is not allowed');
	}
}


function makeGUID() {
	// Returns a hex string like 01234567-0123-0123-0123-0123456789AB
	$hex = '0123456789ABCDEF';
	$output = '';

	// First, generate 8+4+4+4+12 = 32 random hex chars
	while (strlen($output) < 32) {
		$output .= $hex[mt_rand(0, 15)];
	}

	// Now insert hyphens
	return substr($output, 0, 8) . '-' . substr($output, 8, 4) . '-' . substr($output, 12, 4) . '-' . substr($output, 16, 4) . '-' . substr($output, 20);
}


function showErrorAndExit($error) {
	StandardHeader(array('title' => 'Invalid Parameters',
			'topic' => 'wcn'));
	?>

<p>Somehow you entered something incorrectly on the previous form.  If this is
a problem with my service, make sure to email me about it.</p>

<p>Error:  <?PHP echo htmlspecialchars($error); ?></p>

	<?PHP

	StandardFooter();
	exit();
}

