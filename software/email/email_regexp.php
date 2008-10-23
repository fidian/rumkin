<?PHP

/* is_valid_email_regexp is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundataion; either version 3 of the License, or
 * (at your option) any later version.
 *
 * is_valid_email_regexp is distribued in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * For a copy of the GNU General Public License, see
 * <http://www.gnu.org/licenses/>
 *
 * is_valid_email_regexp is available from http://rumkin.com/software/email/
 *
 * is_valid_email_regexp uses PHP and regular expressions to determine if
 * an email appears to be valid.
 */

define('EMAIL_PATTERN_QTEXT', '[\\x01-\\x08\\x0B\\x0C\\x0E-\\x21\\x23-\\x5A\\x5E-\\x7F]');
define('EMAIL_PATTERN_QTEXTMORE', '[\\x01-\\x09\\x0B\\x0C\\x0E-\\x7F]');
define('EMAIL_PATTERN_TEXT', '[\\x21\\x23-\\x27\\x2A-\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x41-\\x5A\\x5E-\\x7E]');
define('EMAIL_PATTERN_QUOTE', '(' . EMAIL_PATTERN_QTEXT . '|\\\\' . EMAIL_PATTERN_QTEXTMORE . ')');
define('EMAIL_PATTERN_TEXT_OR_QUOTE', '(' . EMAIL_PATTERN_TEXT . '+|"' . EMAIL_PATTERN_QUOTE . '*")');
define('EMAIL_PATTERN_LOCALPART', EMAIL_PATTERN_TEXT_OR_QUOTE . '(\\.' . EMAIL_PATTERN_TEXT_OR_QUOTE . ')*');
define('EMAIL_PATTERN_DOMAIN_LABEL', '[0-9A-Za-z](-?[0-9A-Za-z])*');
define('EMAIL_PATTERN_DOMAIN_LABEL_TLD', '[A-Za-z]+');
define('EMAIL_PATTERN_DOMAIN_NORMAL', '(' . EMAIL_PATTERN_DOMAIN_LABEL . '\\.)*' . EMAIL_PATTERN_DOMAIN_LABEL_TLD);
define('EMAIL_PATTERN_DOMAIN_QTEXT', '[\\x01-\\x08\\x0B\\x0C\\x0E-\\x21\\x23-\\x2C\\x2E-\\x5A\\x5E-\\x7F]');
define('EMAIL_PATTERN_DOMAIN_QUOTE', '(' . EMAIL_PATTERN_DOMAIN_QTEXT . '(-?' . EMAIL_PATTERN_DOMAIN_QTEXT . ')*|\\\\' . EMAIL_PATTERN_QTEXTMORE . ')');
define('EMAIL_PATTERN_DOMAIN_BRACKET', '\\[' . EMAIL_PATTERN_DOMAIN_QUOTE . '*\\]');
define('EMAIL_PATTERN_DOMAIN_IPV6', '[0-9a-f]{4}:[0-9a-f]{4}::[0-9a-f]{4}:[0-9a-f]{4}');
define('EMAIL_PATTERN_DOMAIN_IPV4', '([012]?[0-9]{1,2}\\.){3}[012]?[0-9]?[0-9]');
define('EMAIL_PATTERN_DOMAIN_IP', '(' . EMAIL_PATTERN_DOMAIN_IPV4 . '|' . EMAIL_PATTERN_DOMAIN_IPV6 . ')');


function is_valid_email_regexp($email) {
	$email = trim($email);
	
	// Some quick checks
	if (strpos($email, "\t") !== false || strpos($email, "\r") !== false || strpos($email, "\n") !== false) {
		return false;
	}
	if ($email == '') {
		return true;
	}
	if (strlen($email) > 320) {
		return false;
	}
	if (! preg_match('/^' . EMAIL_PATTERN_LOCALPART . '@/', $email, $matches)) {
		return false;
	}
	if (strlen($matches[0]) > 65) {
		// 64 character max for the local part + 1 character for @
		return false;
	}
	$domain = substr($email, strlen($matches[0]));
	if (! preg_match('/^' . EMAIL_PATTERN_DOMAIN_NORMAL . '$/', $domain)) {
		if (preg_match('/^' . EMAIL_PATTERN_DOMAIN_IP . '$/', $domain)) {
			return true;
		}
		if (preg_match('/^' . EMAIL_PATTERN_DOMAIN_BRACKET . '$/', $domain)) {
			$domain = trim(substr($domain, 1, strlen($domain) - 2));
		} else {
			return false;
		}
	}
	if (strlen($domain) > 253) {
		return false;
	}

	$labels = array();
	$thisLabel = '';
	$domainSplit = str_split($domain);
	while (count($domainSplit)) {
		if ($domainSplit[0] == '.') {
			array_shift($domainSplit);
			if ($thisLabel == '') {
				return false;
			}
			$labels[] = $thisLabel;
			$thisLabel = '';
		} else {
			if ($domainSplit[0] == '\\') {
				$thisLabel .= array_shift($domainSplit);
			}
			$thisLabel .= array_shift($domainSplit);
		}
	}
	if ($thisLabel == '') {
		return false;
	}
	
	if (! preg_match('/^[a-zA-Z]{1,63}$/', $thisLabel)) {
		return false;
	}
	
	foreach ($labels as $label) {
		if (strlen($label) > 63) {
			return false;
		}
		if (substr($label, 1) == '-' || substr($label, -1) == '-' || strpos($label, '--') !== false) {
			return false;
		}
	}

	return true;
}
