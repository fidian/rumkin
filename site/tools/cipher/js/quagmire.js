// Quagmire text cipher

// Code written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com
// Code was then edited by Peter Tseng to allow Quagmire I, II, IV functionality
// Said code is also placed in the public domain.

// Requires util.js

// Quagmire encrypt text
// encdec = 1 to encode, -1 to decode
// text = the text you want to encode
// pass = the password to use
// align = under what plaintext letter the password was aligned
// key = the key to make a keyed alphabet (or leave it blank)
function Quagmire(encdec, text, pass, align, plainkey, cipherkey) {
    var s, b, i;

    // Change the pass into A-Z only
    pass = OnlyAlpha(pass.toUpperCase());

    // Change the key into a keyed alphabet
    plainkey = MakeKeyedAlphabet(plainkey);
    cipherkey = MakeKeyedAlphabet(cipherkey);

    if (typeof align == "string")
        var alignVal = plainkey.indexOf(align.toUpperCase());
    else var alignVal = 0;

    s = "";
    for (i = 0; i < text.length; i++) {
        b = text.charAt(i);
        limit = " ";
        if (b >= "A" && b <= "Z") limit = "A";
        if (b >= "a" && b <= "z") limit = "a";
        if (limit != " " && pass.length) {
            b = b.toUpperCase();

            firstkey = encdec > 0 ? plainkey : cipherkey;
            secondkey = encdec < 0 ? plainkey : cipherkey;

            // Just ignore the non-alpha characters from the cipher
            bval =
                firstkey.indexOf(b) +
                encdec * (cipherkey.indexOf(pass.charAt(0)) - alignVal);
            bval = (bval + 26) % 26;
            b = secondkey.charAt(bval);

            if (limit == "a") b = b.toLowerCase();

            // Rotate the password
            pass += pass.charAt(0);
            pass = pass.slice(1, pass.length);
        }
        s += b;
    }
    return s;
}

function BuildTableau(pk, ck, align, ik) {
    var PlainAlpha = MakeKeyedAlphabet(pk);
    var CipherAlpha = MakeKeyedAlphabet(ck);
    var trueIK = true;

    if (typeof align == "string")
        var alignVal = PlainAlpha.indexOf(align.toUpperCase());
    else var alignVal = 0;

    var s =
        "<tt><b><u>&nbsp;&nbsp;|&nbsp;" +
        PlainAlpha.substr(0, 4) +
        "&nbsp;" +
        PlainAlpha.substr(4, 4) +
        "&nbsp;" +
        PlainAlpha.substr(8, 4) +
        "&nbsp;" +
        PlainAlpha.substr(12, 4) +
        "&nbsp;" +
        PlainAlpha.substr(16, 4) +
        "&nbsp;" +
        PlainAlpha.substr(20, 4) +
        "&nbsp;" +
        PlainAlpha.substr(24, 2) +
        "</u></b>";

    if (!ik) {
        ik = CipherAlpha;
        trueIK = false;
        // Because there is no sense shifting the tableau around if we're showing the whole thing!
        alignVal = 0;
    }

    ik = OnlyAlpha(ik.toUpperCase());

    var b = 0;

    for (var i = 0; i < ik.length; i++) {
        b = CipherAlpha.indexOf(ik.charAt(0)) - alignVal;
        if (b < 0) b += 26;

        CipherAlpha += CipherAlpha.substr(0, b);
        CipherAlpha = CipherAlpha.substr(b);

        var s2 =
            CipherAlpha.substr(0, 4) +
            "&nbsp;" +
            CipherAlpha.substr(4, 4) +
            "&nbsp;" +
            CipherAlpha.substr(8, 4) +
            "&nbsp;" +
            CipherAlpha.substr(12, 4) +
            "&nbsp;" +
            CipherAlpha.substr(16, 4) +
            "&nbsp;" +
            CipherAlpha.substr(20, 4) +
            "&nbsp;" +
            CipherAlpha.substr(24, 2);

        if (trueIK)
            s2 = s2.replace(
                ik.charAt(0),
                '<font color="#ff0000">' + ik.charAt(0) + "</font>"
            );

        s +=
            "<br><b>" +
            (trueIK ? i + 1 : CipherAlpha.charAt(0)) +
            "</b>&nbsp;|&nbsp;" +
            s2;
        ik += ik.charAt(0);
        ik = ik.substr(1);
    }
    s += "</tt>";
    return s;
}

document.Quagmire_Loaded = 1;
