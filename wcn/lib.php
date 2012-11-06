<?PHP

require(__DIR__ . '/../vendor/phptools/autoload.php');

function getRequestData($request) {
	$data = array();

	$data['networkKey'] = $request->req('networkKey', '');  // Empty is allowed.
	$data['ssid'] = $request->req('ssid', '');

	// Validate input
	$errors = array();
	$data = array();

	// All of these form values must exist.  Their values are checked later.
	foreach (array('ssid', 'connection', 'authentication', 'encryption', 'networkkey') as $key) {
		$data[$key] = $request->req($key, '');
	}

	// Checkboxes may not be sent, so we handle that better
	foreach (array('automatically', 'ieee802dot1x', 'autorun', 'batch') as $key) {
		// Force to be a boolean
		$data[$key] = !!$request->req($key, false);
	}

	// SSID *must not* be empty
	if (strlen($data['ssid']) == 0) {
		$errors[] = 'SSID is empty';
	}

	$checkValid = function ($name, $allowed) use ($data, &$errors) {
		if (! in_array($data[$name], $allowed)) {
			$errors[] = $name . ' is not set to an allowed value';
		}
	};

	// The rest are all part of drop-down lists
	$checkValid('connection', array('ESS', 'IBSS'));
	$checkValid('authentication', array('open', 'shared', 'WPA-NONE', 'WPA', 'WPAPSK', 'WPA2', 'WPA2PSK'));
	$checkValid('encryption', array('none', 'WEP', 'TKIP', 'AES'));

	if ($errors) {
		WebResponse::status(500);
		header('Content-type: text/plain');
		echo "Invalid parameters\n";
		echo "\n";
		echo "Somehow you submitted invalid data to this service.\n";
		echo "If this is a problem with my API, make sure to tell me about it.\n";
		echo "\n";
		echo "Problems:\n";

		foreach ($errors as $error) {
			echo " * $error\n";
		}

		exit();
	}

	return $data;
}


// Build the WSETTING.TXT file
function buildWsettingTxt($data) {
	$wsetting = file_get_contents('addons/WSETTING.TXT');
	$wsetting = str_replace('##SSID##', $data['ssid'], $wsetting);
	$wsetting = str_replace('##NETWORKKEY##', $data['networkkey'], $wsetting);
	$wsetting = str_replace('##AUTOMATICALLY##', (int) $data['automatically'], $wsetting);
	$wsetting = str_replace('##AUTHENTICATION##', $data['authentication'], $wsetting);
	$wsetting = str_replace('##ENCRYPTION##', $data['encryption'], $wsetting);
	$wsetting = str_replace('##CONNECTION##', $data['connection'], $wsetting);
	return $wsetting;
}


function buildWsettingXml($data) {
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

	// Can't validate for whatever reason, but that's ok.
	// Microsoft's own XML doesn't validate either.
	$xml = $xml->saveXML();
	return $xml;
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


