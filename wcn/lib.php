<?PHP

/**
 * Use a template to build a text file
 *
 * @return string
 */
function buildWsettingTxt($data) {
	$templater = new UltraLite(__DIR__ . '/files');
	$copy = new stdclass();

	foreach ($data as $name => $value) {
		$copy->$name = $value;

		// Mimic Windows
		if (is_bool($value)) {
			if ($value) {
				$copy->$name = 1;
			} else {
				$copy->$name = 0;
			}
		}
	}

	$templater->data = $copy;
	$result = $templater->render('SMRTNTKY/WSETTING.TXT');
	return $result;
}


/**
 * Build XML by hand
 *
 * @return string
 */
function buildWsettingXml($data) {
	$xml = new DOMDocument('1.0');
	$xml->formatOutput = true;
	$wp = $xml->createElementNS('http://www.microsoft.com/provisioning/WirelessProfile/2004', 'wirelessProfile');

	// Create the config section
	$config = $xml->createElement('config');
	$config->appendChild($xml->createElement('configId', guid()));
	$config->appendChild($xml->createElement('configAuthorId', 'F46A7048-620F-7C40-779F-443FAA05003A'));
	$config->appendChild($xml->createElement('configAuthor', 'Rumkin.com Generator at http://rumkin.com/tools/wcn/'));
	$wp->appendChild($config);

	// ssid
	$e = $xml->createElement('ssid', $data->ssid);
	$e->setAttribute('xml:space', 'preserve');
	$wp->appendChild($e);

	// connection type
	$wp->appendChild($xml->createElement('connectionType', $data->connection));

	// primary profile
	$profile = $xml->createElement('primaryProfile');
	$profile->appendChild($xml->createElement('authentication', $data->authentication));
	$profile->appendChild($xml->createElement('encryption', $data->encryption));
	$e = $xml->createElement('networkKey', $data->networkkey);
	$e->setAttribute('xml:space', 'preserve');
	$profile->appendChild($e);
	$profile->appendChild($xml->createElement('keyProvidedAutomatically', (int) $data->automatically));
	$profile->appendChild($xml->createElement('ieee802Dot1xEnabled', (int) $data->ieee802dot1x));
	$wp->appendChild($profile);

	// Finish up
	$xml->appendChild($wp);

	// Can't validate for whatever reason, but that's ok
	// Microsoft's own XML doesn't validate either
	$xml = $xml->saveXML();
	return $xml;
}
