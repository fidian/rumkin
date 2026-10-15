/**
 * isValidEmail, the validator this page is about.
 *
 * Dual licensed under the GNU GPL v3 (or later) and the MIT license.
 * Available from https://rumkin.com/software/email/
 *
 * The function is exactly as it is published and offered for download; only
 * the UMD wrapper around it has been replaced with an ES export. The
 * scenarios the page ships are the test suite.
 */

    /**
     * Splits a string into Unicode code points.  Returns null when the
     * string has a lone surrogate, because that can not be sent as UTF-8.
     */
    function codePoints(text) {
        var code, i, next, points;

        points = [];

        for (i = 0; i < text.length; i += 1) {
            code = text.charCodeAt(i);

            if (code >= 0xD800 && code <= 0xDBFF) {
                next = text.charCodeAt(i + 1);

                if (!(next >= 0xDC00 && next <= 0xDFFF)) {
                    return null;
                }

                code = (code - 0xD800) * 0x400 + (next - 0xDC00) + 0x10000;
                i += 1;
            } else if (code >= 0xDC00 && code <= 0xDFFF) {
                return null;
            }

            points.push(code);
        }

        return points;
    }


    /**
     * SMTP's length limits are in octets, and SMTPUTF8 sends addresses as
     * UTF-8, so a character can count for up to four.
     */
    function utf8Length(points) {
        var i, length;

        length = 0;

        for (i = 0; i < points.length; i += 1) {
            if (points[i] < 0x80) {
                length += 1;
            } else if (points[i] < 0x800) {
                length += 2;
            } else if (points[i] < 0x10000) {
                length += 3;
            } else {
                length += 4;
            }
        }

        return length;
    }


    function isLetter(code) {
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    }


    function isDigit(code) {
        return code >= 48 && code <= 57;
    }


    /**
     * atext from RFC 5322, section 3.2.3, which RFC 5321 builds its atoms
     * from.  RFC 6531 adds every character outside of ASCII.
     */
    function isAtext(code) {
        if (code >= 0x80) {
            return true;
        }

        return isLetter(code) || isDigit(code) ||
            "!#$%&'*+-/=?^_`{|}~".indexOf(String.fromCharCode(code)) >= 0;
    }


    /**
     * Local-part from RFC 5321, section 4.1.2:  a Dot-string, which is
     * atoms separated by periods, or one Quoted-string around the whole
     * thing.  RFC 5322 also accepts an obsolete form that quotes each piece
     * on its own, like "first".second, but SMTP does not, so neither does
     * this.
     */
    function isValidLocalPart(points) {
        var code, i, last;

        // RFC 5321, section 4.5.3.1.1
        if (points.length === 0 || utf8Length(points) > 64) {
            return false;
        }

        last = points.length - 1;

        if (points[0] === 34) {
            // The quote that opens the string has to be the one that closes
            // it, so it must be the last character and the only unescaped
            // quote after the first.
            if (last === 0 || points[last] !== 34) {
                return false;
            }

            for (i = 1; i < last; i += 1) {
                code = points[i];

                if (code === 92) {
                    // quoted-pairSMTP:  a backslash, then printable ASCII or
                    // a space.  RFC 6531 leaves this alone, so a character
                    // outside of ASCII can not be escaped.
                    i += 1;

                    if (i === last || points[i] < 32 || points[i] > 126) {
                        return false;
                    }
                } else if (code === 34 || (code < 32) || (code > 126 && code < 0x80)) {
                    // qtextSMTP is printable ASCII and the space, except for
                    // the quote and the backslash, plus anything outside of
                    // ASCII under RFC 6531.  Tabs are not in it.
                    return false;
                }
            }

            return true;
        }

        if (points[0] === 46 || points[last] === 46) {
            return false;
        }

        for (i = 0; i <= last; i += 1) {
            code = points[i];

            if (code === 46) {
                if (points[i + 1] === 46) {
                    return false;
                }
            } else if (!isAtext(code)) {
                return false;
            }
        }

        return true;
    }


    /**
     * Punycode from RFC 3492.  It turns a Unicode label into the ASCII that
     * follows "xn--" in the A-label DNS actually stores, which has to fit in
     * 63 octets.
     */
    function punycode(points) {
        var basic, bias, delta, handled, i, k, next, n, output, q, t;

        function digit(value) {
            return String.fromCharCode(value < 26 ? value + 97 : value + 22);
        }

        function adapt(change, count, first) {
            var steps;

            change = first ? Math.floor(change / 700) : Math.floor(change / 2);
            change += Math.floor(change / count);
            steps = 0;

            while (change > 455) {
                change = Math.floor(change / 35);
                steps += 36;
            }

            return steps + Math.floor(36 * change / (change + 38));
        }

        output = '';

        for (i = 0; i < points.length; i += 1) {
            if (points[i] < 0x80) {
                output += String.fromCharCode(points[i]);
            }
        }

        basic = output.length;
        handled = basic;

        if (basic) {
            output += '-';
        }

        n = 128;
        delta = 0;
        bias = 72;

        while (handled < points.length) {
            next = Infinity;

            for (i = 0; i < points.length; i += 1) {
                if (points[i] >= n && points[i] < next) {
                    next = points[i];
                }
            }

            delta += (next - n) * (handled + 1);
            n = next;

            for (i = 0; i < points.length; i += 1) {
                if (points[i] < n) {
                    delta += 1;
                }

                if (points[i] === n) {
                    q = delta;

                    for (k = 36; true; k += 36) {
                        if (k <= bias) {
                            t = 1;
                        } else if (k >= bias + 26) {
                            t = 26;
                        } else {
                            t = k - bias;
                        }

                        if (q < t) {
                            break;
                        }

                        output += digit(t + (q - t) % (36 - t));
                        q = Math.floor((q - t) / (36 - t));
                    }

                    output += digit(q);
                    bias = adapt(delta, handled + 1, handled === basic);
                    delta = 0;
                    handled += 1;
                }
            }

            delta += 1;
            n += 1;
        }

        return output;
    }


    /**
     * Domain from RFC 5321, section 4.1.2:  labels of letters, digits, and
     * hyphens, separated by periods, where no label starts or ends with a
     * hyphen.  Two hyphens in a row are fine, which internationalized
     * domains rely on.  RFC 6531 also allows U-labels, the Unicode form of
     * an internationalized label.  Which Unicode characters a U-label may
     * use is a long table in RFC 5892; that is not checked here.
     */
    function isValidDomain(points) {
        var ascii, code, i, j, label, labels, length, start, tld;

        labels = [];
        start = 0;

        for (i = 0; i <= points.length; i += 1) {
            if (i === points.length || points[i] === 46) {
                labels.push(points.slice(start, i));
                start = i + 1;
            }
        }

        // The periods between the labels
        length = labels.length - 1;

        for (i = 0; i < labels.length; i += 1) {
            label = labels[i];

            // An empty label means a period at either end or two together
            if (label.length === 0 || label[0] === 45 || label[label.length - 1] === 45) {
                return false;
            }

            ascii = true;

            for (j = 0; j < label.length; j += 1) {
                code = label[j];

                if (code >= 0x80) {
                    ascii = false;
                } else if (!isLetter(code) && !isDigit(code) && code !== 45) {
                    return false;
                }
            }

            if (ascii) {
                // RFC 1035, section 2.3.4
                if (label.length > 63) {
                    return false;
                }

                length += label.length;
            } else {
                // RFC 5891, section 4.2.3.1.  The same shape is allowed in
                // an ASCII label, since SMTP does not run IDNA on those.
                if (label[2] === 45 && label[3] === 45) {
                    return false;
                }

                // RFC 5890, section 2.3.2.1:  the A-label has to fit
                label = 'xn--' + punycode(label);

                if (label.length > 63) {
                    return false;
                }

                length += label.length;
            }
        }

        // RFC 1034, section 3.1:  255 octets, which includes a length byte
        // for every label and one for the root.  That leaves 253 as text.
        if (length > 253) {
            return false;
        }

        // A top-level domain is never all digits (RFC 3696, section 2), and
        // every one that exists is either all letters or an xn-- label.
        tld = labels[labels.length - 1];

        for (i = 0; i < tld.length; i += 1) {
            if (tld[i] >= 0x80) {
                return true;
            }
        }

        tld = String.fromCharCode.apply(null, tld);

        return (/^([a-zA-Z]+|[xX][nN]--[a-zA-Z0-9\-]+)$/).test(tld);
    }


    /**
     * IPv4-address-literal from RFC 5321, section 4.1.3:  four numbers from
     * 0 to 255.  Each is one to three digits, so leading zeros are allowed.
     */
    function isValidIPv4(text) {
        var i, parts;

        parts = text.split('.');

        if (parts.length !== 4) {
            return false;
        }

        for (i = 0; i < parts.length; i += 1) {
            if (!(/^[0-9]{1,3}$/).test(parts[i]) || parseInt(parts[i], 10) > 255) {
                return false;
            }
        }

        return true;
    }


    /**
     * IPv6-addr from RFC 5321, section 4.1.3.  Groups are one to four hex
     * digits.  Without "::" there are exactly eight of them.  "::" stands
     * for at least two groups of zeros, so it leaves room for six more.  An
     * IPv4 address can take the place of the last two groups, which is what
     * the IPv6v4 forms of the grammar say.
     */
    function isValidIPv6(text) {
        var groups, halves, i, lastColon;

        if (text.indexOf('.') >= 0) {
            lastColon = text.lastIndexOf(':');

            if (lastColon < 0 || !isValidIPv4(text.substring(lastColon + 1))) {
                return false;
            }

            text = text.substring(0, lastColon + 1) + '0:0';
        }

        halves = text.split('::');

        if (halves.length > 2) {
            return false;
        }

        groups = [];

        for (i = 0; i < halves.length; i += 1) {
            if (halves[i] !== '') {
                groups = groups.concat(halves[i].split(':'));
            }
        }

        if (halves.length === 1 ? groups.length !== 8 : groups.length > 6) {
            return false;
        }

        for (i = 0; i < groups.length; i += 1) {
            if (!(/^[0-9a-fA-F]{1,4}$/).test(groups[i])) {
                return false;
            }
        }

        return true;
    }


    /**
     * address-literal from RFC 5321, section 4.1.3.  Brackets hold an IP
     * address, not a name:  [192.0.2.1], or [IPv6:2001:db8::1].  Other
     * tags are possible in the grammar, but a tag has to be registered with
     * IANA, and IPv6 is the only one that is.
     */
    function isValidAddressLiteral(points) {
        var i, text;

        for (i = 0; i < points.length; i += 1) {
            if (points[i] < 33 || points[i] > 126) {
                return false;
            }
        }

        text = String.fromCharCode.apply(null, points);

        // Strings in ABNF are not case-sensitive (RFC 5234, section 2.3)
        if ((/^IPv6:/i).test(text)) {
            return isValidIPv6(text.substring(5));
        }

        return isValidIPv4(text);
    }


    function isValidEmail(email) {
        var atIndex, domain, points;

        if (!email || !email.toString) {
            // Not a string and can't convert it
            return false;
        }

        // Spaces around the address are forgiven, since they are easy to
        // paste into a form by accident.  The rules handle any inside.
        email = email.toString().replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');
        points = codePoints(email);

        if (!points) {
            return false;
        }

        // RFC 5321, section 4.5.3.1.3:  a path is at most 256 octets, and
        // two of those are the angle brackets around the address.
        if (utf8Length(points) > 254) {
            return false;
        }

        // An @ can only appear in the local part inside quotes, and never
        // in the domain, so the last one is the separator.
        atIndex = points.lastIndexOf(64);

        if (atIndex < 0 || !isValidLocalPart(points.slice(0, atIndex))) {
            return false;
        }

        domain = points.slice(atIndex + 1);

        if (domain[0] === 91) {
            if (domain[domain.length - 1] !== 93) {
                return false;
            }

            return isValidAddressLiteral(domain.slice(1, domain.length - 1));
        }

        return isValidDomain(domain);
    }


export default isValidEmail;
