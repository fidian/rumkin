/* isValidEmail is dual licensed under the GNU GPL v3 (or later) and
 * under the MIT license.
 *
 * isValidEmail is available from http://rumkin.com/software/email/
 *
 * isValidEmail exports a function that returns a boolean.  `true` means
 * the email passed in appears to be valid.
 */
// fid-umd {"name":"isValidEmail","jslint":1}
/* global module, exports, define, modulejs, YUI */
(function (name, root, factory) {
    "use strict";
    function isObject(x) { return typeof x === "object"; }
    if (isObject(module) && isObject(module.exports)) {
        module.exports = factory();
    } else if (isObject(exports)) {
        exports[name] = factory();
    } else if (isObject(root.define) && root.define.amd) {
        root.define(name, [], factory);
    } else if (isObject(root.modulejs)) {
        root.modulejs.define(name, factory);
    } else if (isObject(root.YUI)) {
        root.YUI.add(name, function (Y) { Y[name] = factory(); });
    } else {
        root[name] = factory();
    }
}("isValidEmail", this, function () {
    "use strict";
    // fid-umd end
   
    /**
     * Checks for illegal domains
     */
    function isLegalDomain(domain) {
        if (domain.length === 0) {
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

        if (domain.match(/[^.]{64}/)) {
            // This is a label that is too long
            return false;
        }

        return true;
    }
    /**
     * Tests if the domain is a valid IPv4 address
     */
    function isValidIPv4(domain) {
        var pass;

        pass = true;
        domain.split('.').forEach(function (label) {
            pass = pass && label.match(/^([1-9][0-9]?|1[0-9][0-9]|2([0-4][0-9]|5[0-5]))$/);
        });

        return pass;
    }


    /**
     * Check for an IPv6 domain
     */
    function isValidIPv6(domain) {
        return domain.match(/^[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}::[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}$/);
    }

   
    /**
     * Makes sure the TLD is made of only valid characters
     */
    function isValidTld(domain) {
        var tld;

        tld = domain.split('.');
        tld = tld[tld.length - 1];
        return tld.match(/^[a-zA-Z]+$/);
    }


    // This function assumes you already checked for invalid characters
    // Any escaping has been removed
    function isValidEmailDomain(domain, isBracketed) {
        if (!isLegalDomain(domain)) {
            return false;
        }

        if (isValidIPv4(domain) || isValidIPv6(domain)) {
            return true;
        }

        // If we have a ":", it is only allowed for IPv6 or bracketed domains
        // IPv6 was already checked and left this function
        if (domain.indexOf(':') >= 0 && ! isBracketed) {
            return false;
        }

        if (! isValidTld(domain)) {
            return false;
        }

        return true;
    }


    /**
     * Only tests the local part of the email address, which is the
     * stuff to the left of the "@".
     */
    function isValidLocalPart(localPart) {
        var allowedLocal, c, cCode, i, mode;

        if (localPart.length > 64) {
            return false;
        }

        allowedLocal = "!#$%&'*+-/0123456789=?ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~";
        
        /**
         * Parsing mode:
         *   0 = start of a label
         *   1 = in label, normal text (unquoted)
         *   2 = in label, quoted text
         *   3 = in label, quoted and escaped (last was a backslash)
         *   4 = after quoted label (only allows a period as next char)
         */
        mode = 0;
        for (i = 0; i < localPart.length; i ++) {
            c = localPart.charAt(i);
            
            if (mode === 0) {
                // Start of a label
                if (c === '"') {
                    mode = 2;
                } else {
                    if (c === '.') {
                        return false;
                    }
                    if (allowedLocal.indexOf(c) < 0) {
                        return false;
                    }
                    mode = 1;
                }
            } else if (mode === 1) {
                // In unquoted label
                if (c === '.') {
                    mode = 0;
                } else if (allowedLocal.indexOf(c) < 0) {
                    return false;
                }
            } else if (mode === 2) {
                // In quoted label
                if (c === '"') {
                    mode = 4;
                } else if (c === '\\') {
                    mode = 3;
                } else {
                    cCode = c.charCodeAt(0);
                    if ((cCode > 8 && cCode < 11) ||
                        (cCode > 90 && cCode < 94) ||
                        cCode === 13 || cCode === 34 || cCode > 127) {
                        return false;
                    }
                }
            } else if (mode === 3) {
                cCode = c.charCodeAt(0);
                if (cCode === 10 || cCode === 11 || cCode > 127) {
                    return false;
                }
                mode = 2;
            } else if (mode === 4) {
                if (c !== '.') {
                    return false;
                }
                mode = 0;
            }
        }
        if (mode !== 1 && mode !== 4) {
            return false;
        }
        return true;
    }


    function isValidEmail(email) {
        var atIndex, curr, currCode, domain, prev;

        if (!email.toString) {
            // Not a string and can't convert it
            return false;
        }

        // Convert to a string and trim it
        email = email.toString().replace(/^\s*|\s*$/g, '');
        
        // Some quick checks
        if (email.match(/[\t\r\n]/)) {
            // While it could be possible, this validator does
            // not allow tabs nor any type of newline
            return false;
        }

        if (email.length < 5 || email.length > 320) {
            // No amount of trickery allows emails outside these bounds
            return false;
        }
       
        // Test for normal cases here.
        //   Exactly 1 "@" symbol
        //   Only a-z, A-Z, 0-9, . and - to either side
        //   Up to 64 characters on the left
        //   Up to 64 characters for a label on the right (a shortcut)
        //   No leading . nor - on left nor right
        //   No trailing . nor - on left nor right
        //   No --, .., .-, -. anywhere
        if (email.match(/^[a-zA-Z0-9]+([.\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-.][a-zA-Z0-9]+)+\.[a-zA-Z]+$/) && email.match(/^.{1,64}@.{1,64}$/)) {
            return true;
        }
        
        /**
         * The rules for parsing a domain are easier to grok than the rules
         * for parsing the localpart of an email address.  Thus, we will
         * work backwards.
         *
         * We are either looking for a domain that consists of labels
         * separated by periods or a domain surrounded by [ and ].
         *
         * If we are using the label version, we want to only allow the
         * following characters:
         *     abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
         *     0123456789!#$%&'*+-/=?^_`{|}~
         * Additionally, labels must be less than 64 characters long, and
         * must not start or end with a hyphen.  No label can be blank.
         * No leading or trailing . at the start or end of the domain.
         *
         * For bracketed domains, we look for characters with the decimal
         * values 1-9, 11, 12, 14-90, 94-127.  If a character is preceded
         * with a \, we allow any 7-bit character to follow.
         *
         * The entire domain must be at most 253 characters long for DNS
         * to work.  The top level domain must be all alphabetic.
         */
        atIndex = email.length - 1;  // We want atIndex to point at the @ when done
        if (email.charAt(atIndex) === ']') {
            // Bracketed domain
            atIndex --;
            curr = email.charAt(atIndex);
            prev = email.charAt(atIndex - 1);
            domain = '';
            while (curr !== '[' && atIndex) {
                currCode = curr.charCodeAt(0);
                if (prev === '\\') {
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
                        currCode === 11 || currCode === 12) {
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

            if (prev !== '@') {
                // Improper escaping
                return false;
            }

            if (! isValidEmailDomain(domain, true)) {
                return false;
            }

            atIndex --;
        } else {
            atIndex = email.lastIndexOf('@');

            if (atIndex < 1) {
                // Must have at least 1 character to the left of the @ symbol
                return false;
            }

            domain = email.substring(atIndex + 1);

            if (! domain.match(/^[a-zA-Z0-9!#$%&'*+\-\/=?\^_`{|}~.:]{3,}$/)) {
                // Guarantee valid characters
                // A colon is included in case of IPv6
                return false;
            }

            if (! isValidEmailDomain(domain, false)) {
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
        return isValidLocalPart(email.substring(0, atIndex));

    }



    return isValidEmail;
    // fid-umd post
}));
// fid-umd post-end
