<?PHP

/* is_valid_email is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundataion; either version 3 of the License, or (at your
 * option) any later version.
 *
 * is_valid_email is distribued in the hope that it will be useful but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * for more details.
 *
 * See <http://www.gnu.org/licenses/> for a copy of the GNU General Public
 * License.
 *
 * is_valid_email is available from http://rumkin.com/software/email/
 *
 * is_valid_email is a function that determines if the email address
 * passed in appears to be valid.
 */

function is_valid_email($email) {
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
	
	// TODO:  Write some code here to check the normal cases.
	// 1 @ symbol, explode, if left <= 64 characters, right doesn't have ..,
	// -., .-, leading . or -, ending . or -, both have only a-zA-Z0-9, then
	// it is good.  No need for the complex stuff.
	
	/**
	 * The rules for parsing a domain are easier to grok than the rules for
	 * parsing the localpart of an email address.  Thus, we will work
	 * backwards.
	 *
	 * We are either looking for a domain that consists of labels separated
	 * by periods or a domain surrounded by [ and ].
	 *
	 * If we are using the label version, we want to only allow the following
	 * characters:
	 * abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~
	 * Additionally, labels must be less than 64 characters long, and must not
	 * start or end with a hyphen.  No label can be blank.  No leading or
	 * trailing . at the start or end of the domain.
	 *
	 * For bracketed domains, we look for characters with the decimal values
	 * 1-9, 11, 12, 14-90, 94-127
	 * If a character is preceded with a \, we allow any 7-bit character to
	 * follow.
	 *
	 * The entire domain must be at most 253 characters long for DNS to work.
	 * The top level domain must be all alphabetic.
	 */
	$atIndex = strlen($email) - 1;  // We want this on the @ when done
	if (substr($email, $atIndex, 1) == ']') {
		// Bracketed domain
		$atIndex --;
		$curr = substr($email, $atIndex, 1);
		$prev = substr($email, $atIndex - 1, 1);
		$domain = '';
		while ($curr != '[' && $atIndex) {
			$currOrd = ord($curr);
			if ($prev == '\\') {
				if ($currOrd >= 128 || $currOrd < 1) {
					return false;
				}
				$domain = $curr . $domain;
				$atIndex -= 2;
				$curr = substr($email, $atIndex, 1);
				$prev = substr($email, $atIndex - 1, 1);
			} else {
				if (($currOrd <= 127 && $currOrd >= 94) ||
					($currOrd <= 90 && $currOrd >= 14) ||
					($currOrd <= 9 && $currOrd >= 1) ||
					$currOrd == 11 || $currOrd == 12) {
					$domain = $curr . $domain;
					$atIndex --;
					$curr = $prev;
					$prev = substr($email, $atIndex - 1, 1);
				} else {
					// Invalid unquoted character
					return false;
				}
			}
		}
		if ($atIndex < 1) {
			// We need at least one character to the left of the @ symbol
			return false;
		}
		if ($prev != '@') {
			// Improper escaping
			return false;
		}
		if (! is_valid_email_domain($domain, true)) {
			return false;
		}
		$atIndex --;
	} else {
		// Labels with dots; ":" is a special thing for IPv6
		$allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&\'*+-/=?^_`{|}~.:';
		while (strpos($allowed, substr($email, $atIndex, 1)) !== false && $atIndex) {
			$atIndex --;
		}
		if ($atIndex < 1) {
			// Must have at least 1 character to the left of the @ symbol
			return false;
		}
		if (substr($email, $atIndex, 1) != '@') {
			// Invalid
			return false;
		}
		$domain = substr($email, $atIndex + 1);
		if (! is_valid_email_domain($domain, false)) {
			return false;
		}
	}
	
	/**
	 * Whew!  We made it through that mess and we determined that the domain
	 * portion seems valid.  Now for the rules with the local part:
	 *
	 * Emails can contain labels separated by dots.
	 * No label can start or end with a dot.
	 * Labels can be unquoted or surrounded by quotes.
	 * Unquoted text must have at least one character.  (Quoted text doesn't.)
	 * Unquoted characters allowed:  !#$%&'*+-/0123456789=?ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~
	 * Quoted text allowed: 1-8, 11, 12, 14-33, 35-90, 94-127
	 * Quoted text allowed escaped (preceded by backslash):  all except 10, 13
	 * Maximum length for the local part is 64 characters
	 */
	$localPart = substr($email, 0, $atIndex);
	if (strlen($localPart) > 64) {
		return false;
	}
	$allowedLocal = '!#$%&\'*+-/0123456789=?ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~';
	
	/**
	 * Parsing mode:
	 *   0 = start of a label
	 *   1 = in label, normal text (unquoted)
	 *   2 = in label, quoted text
	 *   3 = in label, quoted and escaped (last was a backslash)
	 *   4 = after quoted label (only allows a period as next char)
	 */
	$mode = 0;
	for ($i = 0; $i < strlen($localPart); $i ++) {
		$c = substr($localPart, $i, 1);
		
		if ($mode == 0) {
			// Start of a label
			if ($c == '"') {
				$mode = 2;
			} elseif ($c == '.') {
				return false;
			} elseif (strpos($allowedLocal, $c) === false) {
				return false;
			} else {
				$mode = 1;
			}
		} elseif ($mode == 1) {
			// In unquoted label
			if ($c == '.') {
				$mode = 0;
			} elseif (strpos($allowedLocal, $c) === false) {
				return false;
			}
		} elseif ($mode == 2) {
			// In quoted label
			if ($c == '"') {
				$mode = 4;
			} elseif ($c == '\\') {
				$mode = 3;
			} else {
				$cOrd = ord($c);
				if (($cOrd > 8 && $cOrd < 11) ||
					($cOrd > 90 && $cOrd < 94) ||
					$cOrd == 13 || $cOrd == 34 || $cOrd > 127) {
					return false;
				}
			}
		} elseif ($mode == 3) {
			$cOrd = ord($c);
			if ($cOrd == 10 || $cOrd == 11 || $cOrd > 127) {
				return false;
			}
			$mode = 2;
		} elseif ($mode == 4) {
			if ($c != '.') {
				return false;
			}
			$mode = 0;
		}
	}
	if ($mode != 1 && $mode != 4) {
		return false;
	}
	return true;
}


// This function assumes you already checked for invalid characters
// Any escaping has been removed
function is_valid_email_domain($domain, $isBracketed) {
	if (strlen($domain) == 0) {
		// Gotta have a domain
		return false;
	}
	if (strlen($domain) > 253) {
		// Too long for DNS to work
		return false;
	}
	if (strpos($domain, '..') !== false || substr($domain, 0, 1) == '.' || substr($domain, -1) == '.') {
		// No empty labels allowed
		return false;
	}
	if (strpos($domain, '.-') !== false || strpos($domain, '-.') !== false || strpos($domain, '--') !== false) {
		// No leading or trailing hyphens allowed in labels.  No double hyphens
		return false;
	}
	if (substr($domain, 0, 1) == '-' || substr($domain, -1) == '-') {
		// No leading or trailing hyphens allowed in labels.
		return false;
	}
	$labels = explode('.', $domain);
	$looksLikeIPv4 = false;
	$looksLikeIPv6 = false;
	if (count($labels) == 4) {
		$looksLikeIPv4 = true;
	} elseif (count($labels) == 1) {
		$looksLikeIPv6 = true;
		$allowedIPv6 = '0123456789abcdefABCDEF';
		$parts = explode(':', $labels[0]);
		if (count($parts) != 5 || $parts[2] != '') {
			$looksLikeIPv6 = false;
		}
		foreach ($parts as $p) {
			if (strlen($p) > 4) {
				$looksLikeIPv6 = false;
			}
			for ($i = 0; $i < strlen($p); $i ++) {
				if (strpos($allowedIPv6, substr($p, $i, 1)) === false) {
					$looksLikeIPv6 = false;
				}
			}
		}
	}
	foreach ($labels as $l) {
		if (strlen($l) > 63) {
			return false;
		}
		if ($looksLikeIPv4) {
			if (strlen($l) > 3) {
				$looksLikeIPv4 = false;
			}
			for ($i = 0; $i < strlen($l); $i ++) {
				$c = ord(substr($l, $i, 1));
				if ($c < 0x30 || $c > 0x39) {
					$looksLikeIPv4 = false;
				}
			}
			if ($l < 0 || $l > 255) {
				$looksLikeIPv4 = false;
			}
		}
	}
		
	// If we have a ":", it is only allowed for IPv6 or bracketed domains
	if (! $looksLikeIPv6 && strpos($domain, ':') !== false && ! $isBracketed) {
		return false;
	}
		
	// IPv6 and IPs don't have alpha-only TLDs
	if (! $looksLikeIPv4 && ! $looksLikeIPv6) {
		$tldIndex = strlen($l);
		$allowedTld = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		while ($tldIndex) {
			$tldIndex --;
			if (strpos($allowedTld, substr($l, $tldIndex, 1)) === false) {
				return false;
			}
		}
	}
	
	return true;
}
