----
title: Email Validation RFC Rules
template: index.jade
----

These rule govern email addresses.  I made sure [my validators](../) were correct by reading through the actual rules governing the internet.


In Summary
==========

Just in case you can't read the odd syntax for the rules and the rest of the RFCs (and I certainly don't blame you), here are the rules as I interpret them.

* All email addresses are in 7-bit US ASCII.  (RFC 2822, section 2.2)
* Email addresses consist of a local part, the `@` symbol, and the domain.  (RFC 2822, section 3.4.1)
* The local part can be unquoted, quoted in its entirety, or quoted on a per-label basis.  (RFC 2822, sections 3.4.1 and 4.4)
* Unquoted local parts can consist of TEXT, optionally separated by periods.  No periods can start or end the local part.  Two periods together is invalid.  (RFC 2822, section 3.4.1)
* TEXT can contain alphabetic, numeric, and these symbols:  ``!#$%'*+-/=?^_{|}~` (RFC 2822, section 3.4.1)
* The quoted local part starts with a quotation mark, ends with a quotation mark. (RFC 2822, section 3.4.1)
* The contents of a quoted local part can not contain characters 9 (TAB), 10 (LF), 13 (CR), 32 (space), 34 (`"`), 91-94 (`[\]^`).  (RFC 2822, section 3.4.1)
* If the quoted local part has a backslash, the following character is escaped and must not be 10 (LF), 13 (CR).  This supersedes the previous rule, allowing spaces and quotation marks in the email address as long as they are escaped.  (RFC 2822, section 3.4.1)
* If an email is using the obsolete quoting on a per-label basis, then the email address consists of unquoted or quoted chunks separated by periods.  (RFC 2822, section 4.4)
* The domain can be bracketed or plain.  (RFC 2822, section 3.4.1)
* A plain domain consists of labels separated with periods.  No period can start or end a domain name.  No two periods in succession can be in a domain name.  (RFC 1035, section 2.3.4)
* The maximum length of a label is 63 characters.  (RFC 1035, section 2.3.4)
* A label may contain hyphens, but no two hyphens in a row.  A label must not start nor end with a hyphen.  (RFC 1035, section 2.3.4)
* Bracketed domains must start with `[`, end with `]`, and must not contain characters 9 (TAB), 10 (LF), 13 (CR), 32 (space), 91-94 (`[\]^`).  (RFC 2822, section 3.4.1)
* The contents of a bracketed domain can have a `\` precede a character to escape it, and the following character must not be 10 (LF) or 13 (CR).  This allows spaces in the domain as long as they are escaped.  (RFC2822, section 3.4.1)
* The maximum length of the local part is 64 characters.  (RFC 2821, section 4.5.3.1)
* Domains must resolve with either an A or MX record.  (RFC 2821, section 3.6)
* The maximum length of a domain must be 255 characters when being transmitted over the wire (for DNS lookups), thus the maximum length of the domain (the normal domain or the contents of the bracketed domain) is 253 characters.  (RFC 1034, section 3.1)
* Any domain label can be at most 63 characters long.  (RFC 1034, section 2.3.1)
* The maximum length of a "useful" email address is 255 characters.  (RFC 2821, section 4.5.3.1)
* The maximum allowable length of an email address is 320 characters.  (RFC 3696)
* The top level domain must be all alphabetic.  (RFC 3696, section 2)


RFC 2822
========

This RFC supersedes RFC 822, which governs email exchange through SMTP.

    addr-spec       =       local-part "@" domain

    local-part      =       dot-atom / quoted-string / obs-local-part

    domain          =       dot-atom / domain-literal / obs-domain

    domain-literal  =       [CFWS] "[" *([FWS] dcontent) [FWS] "]" [CFWS]

    dcontent        =       dtext / quoted-pair

    dtext           =       NO-WS-CTL /     ; Non white space controls
                            %d33-90 /       ; The rest of the US-ASCII
                            %d94-126        ;  characters not including "[",
                                            ;  "]", or "\"

    NO-WS-CTL       =       %d1-8 /         ; US-ASCII control characters
                            %d11 /          ;  that do not include the
                            %d12 /          ;  carriage return, line feed,
                            %d14-31 /       ;  and white space characters
                            %d127

    quoted-pair     =       ("\" text) / obs-qp

    text            =       %d1-9 /         ; Characters excluding CR and LF
                            %d11 /
                            %d12 /
                            %d14-127 /
                            obs-text

    FWS             =       ([*WSP CRLF] 1*WSP) /   ; Folding white space
                            obs-FWS

    CRLF            =       %d13.10

    CFWS            =       *([FWS] comment) (([FWS] comment) / FWS)

    comment         =       "(" *([FWS] ccontent) [FWS] ")"

    ccontent        =       ctext / quoted-pair / comment

    ctext           =       NO-WS-CTL /     ; Non white space controls
                            %d33-39 /       ; The rest of the US-ASCII
                            %d42-91 /       ;  characters not including "(",
                            %d93-126        ;  ")", or "\"
     
    dot-atom        =       [CFWS] dot-atom-text [CFWS]

    dot-atom-text   =       1*atext *("." 1*atext)

    atext           =       ALPHA / DIGIT / ; Any character except controls,
                            "!" / "#" /     ;  SP, and specials.
                            "$" / "%" /     ;  Used for atoms
                            "&amp;" / "'" /
                            "*" / "+" /
                            "-" / "/" /
                            "=" / "?" /
                            "^" / "_" /
                            "`" / "{" /
                            "|" / "}" /
                            "~"
     
    ALPHA           =       %x41-5A / %x61-7A   ; A-Z / a-z

    DIGIT           =       %x30-39  ; 0-9

    quoted-string   =       [CFWS]
                            DQUOTE *([FWS] qcontent) [FWS] DQUOTE
                            [CFWS]

    DQUOTE          =       %x22  ; " (Double Quote)

    qcontent        =       qtext / quoted-pair

    qtext           =       NO-WS-CTL /     ; Non white space controls
                            %d33 /          ; The rest of the US-ASCII
                            %d35-91 /       ;  characters not including "\"
                            %d93-126        ;  or the quote character

    obs-local-part  =       word *("." word)

    obs-domain      =       atom *("." atom)

    obs-FWS         =       1*WSP *(CRLF 1*WSP)

    obs-qp          =       "\" (%d0-127)

    obs-text        =       *LF *CR *(obs-char *LF *CR)

    CFWS            =       *([FWS] comment) (([FWS] comment) / FWS)

    WSP             =       SP / HTAB  ; white space

    atom            =       [CFWS] 1*atext [CFWS]

    word            =       atom / quoted-string


RFC 1035, section 2.3.1
=======================

RFC 1123 relaxed the definition of "label", reflected below.

    domain          =       subdomain / " "

    subdomain       =       *(label ".") label

    label           =       *let-dig-hyp 1*let-dig

    let-dig-hyp     =       1*let-dig "-"

    let-dig         =       ALPHA / DIGIT


RFC 3696
========

RFC 3696 doesn't appear to agree with RFC 1034.  It appears that one says the maximum domain length is 255 characters and the other says 253 characters when transmitted over the wire.  The good news is that the domain portion in the email can have brackets surrounding it, thus making the length 255 characters.</p>

That's a LOT!
=============

Yep.  The easiest thing I can do is summarize the rules.

* Email addresses are 7-bit ascii; each character has a value from 1 to 127
* The email has a localpart on the left of an `@`, the domain on the right.  Neither the localpart nor the domain may be empty.
* The localpart must be 64 characters or less.
* The localpart can consist of labels separated by dots but there can not be two successive dots, nor can it start or end with a dot.
* Labels can either be quoted or unquoted.
    * Unquoted labels must have at least one character.
        * This can only contain `a-z`, `A-Z`, `0-9`, or any of ``!#$%&amp;'*+-/=?^_{|}~`.
    * Quoted labels have a `"` at the beginning and end.
        * There does not need to be anything between the quotes.  (Weird.)
        * Tab, CR, LF, ", [, \, ^ must not exist in the email address unescaped.
        * Only CR and LF can't be escaped with a \ before the character.
* The domain can be bracketed, unbracketed, or an IP address..
    * An unbracketed domain consists of labels separated by periods and less than 253 characters.  No domain can start with a period, end with a period, or have two successive periods.
        * Labels consist of `a-z`, `A-Z`, `0-9`, or one of ``!#$%&amp;'*+-/=?^_{|}~`.
        * Labels must be less than 63 characters.
        * Labels must not start with a hyphen, end with a hyphen, or contain two successive hyphens.
        * The right-most label must be all alphabetic.
        </ul>
    * A bracketed domain starts with `[`, ends with `]` and the contents (after unescaping) must be less than 245 characters.
        * CR, LF, `{`, `}`, `|`, and `^` are not allowed unescaped.
        * If there is a `\`, any character except CR or LF is allowed.
        * Labels must be less than 63 characters.
        * Labels must not start with a hyphen, end with a hyphen, or contain two successive hyphens.
        * The right-most label must be all alphabetic.
    * IP addresses can be specified as `123.45.67.89` or `73f0:2bba::0562:0011` (IPv4 or IPv6).

It is not a lot better, but hopefully the rewording can help you understand the rules.
