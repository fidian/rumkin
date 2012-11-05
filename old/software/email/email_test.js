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
 * For a copy of the GNU General Public License, see
 * <http://www.gnu.org/licenses/>
 *
 * is_valid_email is available from http://rumkin.com/software/email/
 *
 * is_valid_email is a routine that will determine if the email passed in
 * appears to be a valid email.
 */

function is_valid_email(email) {
	email = email.replace(/^\s*|\s*$/g, '');
	
	// Some quick checks
	if (email.match(/[\t\r\n]/)) {
		return false;
	}
	if (email.length == 0 || email.length > 320) {
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
	var atIndex = email.length - 1;  // We want atIndex to point at the @ when done
	if (email.charAt(atIndex) == ']') {
		// Bracketed domain
		atIndex --;
		var curr = email.charAt(atIndex);
		var prev = email.charAt(atIndex - 1);
		var domain = '';
		while (curr != '[' && atIndex) {
			var currCode = curr.charCodeAt(0);
			if (prev == '\\') {
				if (currCode >= 128 || currCode < 1) {
					return false;
				}
				domain = curr + domain;
				atIndex -= 2;
				curr = email.charAt(atIndex);
				prev = email.charAt(atIndex - 1);
			} else {
				if ((currCode <= 127 && currCode >= 94) ||
					(currCode <= 90 && currCode >= 14) ||
					(currCode <= 9 && currCode >= 1) ||
					currCode == 11 || currCode == 12) {
					domain = curr + domain;
					atIndex --;
					curr = prev;
					prev = email.charAt(atIndex - 1);
				} else {
					// Invalid unquoted character
					return false;
				}
			}
		}
		if (atIndex < 1) {
			// We need at least one character to the left of the @ symbol
			return false;
		}
		if (prev != '@') {
			// Improper escaping
			return false;
		}
		if (! is_valid_email_domain(domain, true)) {
			return false;
		}
		atIndex --;
	} else {
		// Labels with dots; ":" is a special thing for IPv6
		var allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.:";
		while (allowed.indexOf(email.charAt(atIndex)) >= 0 && atIndex) {
			atIndex --;
		}
		if (atIndex < 1) {
			// Must have at least 1 character to the left of the @ symbol
			return false;
		}
		if (email.charAt(atIndex) != '@') {
			// Invalid
			return false;
		}
		var domain = email.substring(atIndex + 1);
		if (! is_valid_email_domain(domain, false)) {
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
	var localPart = email.substring(0, atIndex);
	if (localPart.length > 64) {
		return false;
	}
	var allowedLocal = "!#$%&'*+-/0123456789=?ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~";
	
	/**
	 * Parsing mode:
	 *   0 = start of a label
	 *   1 = in label, normal text (unquoted)
	 *   2 = in label, quoted text
	 *   3 = in label, quoted and escaped (last was a backslash)
	 *   4 = after quoted label (only allows a period as next char)
	 */
	var mode = 0;
	for (i = 0; i < localPart.length; i ++) {
		var c = localPart.charAt(i);
		
		if (mode == 0) {
			// Start of a label
			if (c == '"') {
				mode = 2;
			} else if (c == '.') {
				return false;
			} else if (allowedLocal.indexOf(c) < 0) {
				return false;
			} else {
				mode = 1;
			}
		} else if (mode == 1) {
			// In unquoted label
			if (c == '.') {
				mode = 0;
			} else if (allowedLocal.indexOf(c) < 0) {
				return false;
			}
		} else if (mode == 2) {
			// In quoted label
			if (c == '"') {
				mode = 4;
			} else if (c == '\\') {
				mode = 3;
			} else {
				var cCode = c.charCodeAt(0);
				if ((cCode > 8 && cCode < 11) ||
					(cCode > 90 && cCode < 94) ||
					cCode == 13 || cCode == 34 || cCode > 127) {
					return false;
				}
			}
		} else if (mode == 3) {
			var cCode = c.charCodeAt(0);
			if (cCode == 10 || cCode == 11 || cCode > 127) {
				return false;
			}
			mode = 2;
		} else if (mode == 4) {
			if (c != '.') {
				return false;
			}
			mode = 0;
		}
	}
	if (mode != 1 && mode != 4) {
		return false;
	}
	return true;
}


// This function assumes you already checked for invalid characters
// Any escaping has been removed
function is_valid_email_domain(domain, isBracketed) {
	if (domain.length == 0) {
		// Gotta have a domain
		return false;
	}
	if (domain.length > 253) {
		// Too long for DNS to work
		return false;
	}
	if (domain.match(/^\.|\.\.|\.$/)) {
		// No empty labels allowed
		return false;
	}
	if (domain.match(/^-|--|\.-|-\.|-$/)) {
		// No leading or trailing hyphens allowed in labels.  No double hyphens
		return false;
	}
	var labels = domain.split('.');
	var looksLikeIPv4 = false;
	var looksLikeIPv6 = false;
	if (labels.length == 4) {
		looksLikeIPv4 = true;
	} else if (labels.length == 1) {
		looksLikeIPv6 = true;
		var allowedIPv6 = '0123456789abcdefABCDEF';
		var parts = labels[0].split(':');
		if (parts.length != 5 || parts[2] != '') {
			looksLikeIPv6 = false;
		}
		for (var i in parts) {
			if (parts[i].length > 4) {
				looksLikeIPv6 = false;
			}
			for (var j = 0; j < parts[i].length; j ++) {
				if (allowedIPv6.indexOf(parts[i].charAt(j)) < 0) {
					looksLikeIPv6 = false;
				}
			}
		}
	}
	for (var i in labels) {
		if (labels[i].length > 63) {
			return false;
		}
		if (looksLikeIPv4) {
			if (labels[i].length > 3) {
				looksLikeIPv4 = false;
			}
			for (var j = 0; j < labels[i].length; j ++) {
				if ('01234567890'.indexOf(labels[i].charAt(j)) < 0) {
					looksLikeIPv4 = false;
				}
			}
			if (looksLikeIPv4 && (labels[i] < 0 || labels[i] > 255)) {
				looksLikeIPv4 = false;
			}
		}
	}
		
	// If we have a ":", it is only allowed for IPv6 or bracketed domains
	if (! looksLikeIPv6 && domain.indexOf(':') >= 0 && ! isBracketed) {
		return false;
	}
	
	// IPv6 and IPs don't have alpha-only TLDs
	if (! looksLikeIPv4 && ! looksLikeIPv6) {
		var tld = labels[labels.length - 1];
		var tldIndex = tld.length;
		var allowedTld = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		while (tldIndex) {
			tldIndex --;
			if (allowedTld.indexOf(tld.charAt(tldIndex)) < 0) {
				return false;
			}
		}
	}
	
	return true;
}
