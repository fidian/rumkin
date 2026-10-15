---
layout: "@/layouts/default-layout.astro"
title: Email Validation RFC Rules
breadcrumbs:
    - name: Rumkin.com
      href: /
    - name: Software Projects
      href: /software/
    - name: Email Validation Done Right
      href: /software/email/
---

These rules govern email addresses.  I made sure [my validators](../) were correct by reading through the actual rules governing the internet.

My validators accept an address if SMTP could deliver mail to it, and nothing more.  RFC 5322 on its own is looser:  it still accepts obsolete forms, and it lets brackets hold almost anything.  Mail to those addresses can not be sent, so they are rejected here.


The RFCs
--------

Each of these is the current version.  RFCs are never edited after they are published; a newer one obsoletes them instead, so each entry lists the chain of RFCs it replaced.

* **RFC 5321**, *Simple Mail Transfer Protocol* (October 2008).  What a mail server will accept, which makes it the deciding one.  It obsoletes RFC 2821 (April 2001), which obsoleted RFC 821 (August 1982), which replaced RFC 788, RFC 780, and RFC 772.  RFC 2821 also obsoleted RFC 974 (January 1986), which described routing mail with MX records, and RFC 1869, which defined how SMTP is extended.  RFC 5321 is updated by RFC 7504.
* **RFC 5322**, *Internet Message Format* (October 2008).  How an address is written in a message.  It obsoletes RFC 2822 (April 2001), which obsoleted RFC 822 (August 1982), which obsoleted RFC 733 (November 1977), which obsoleted RFC 561, RFC 680, and RFC 724.  RFC 5322 is updated by RFC 6854.
* **RFC 6531**, *SMTP Extension for Internationalized Email* (February 2012).  The SMTPUTF8 extension, which lets an address use UTF-8.  It obsoletes the experimental RFC 5336.  It works with **RFC 6532**, *Internationalized Email Headers* (February 2012), which obsoletes RFC 5335, and with **RFC 6530**, the overview, which obsoletes RFC 4952, RFC 5504, and RFC 5825.  UTF-8 itself is RFC 3629, which obsoleted RFC 2279.
* **RFC 1034** and **RFC 1035**, *Domain Names* (November 1987).  DNS, including the "preferred name syntax" for host names.  Both obsolete RFC 882 and RFC 883 (November 1983) and RFC 973 (January 1986).  Dozens of RFCs have updated them since; RFC 2181 (section 11) is the one that matters here, because it points out that DNS itself allows any octets in a label, and the letters, digits, and hyphens rule comes from host names.
* **RFC 1123**, *Requirements for Internet Hosts* (October 1989).  It lets a host name label start with a digit.  RFC 5321 is one of the RFCs that update it.
* **RFC 5890**, **RFC 5891**, **RFC 5892**, and **RFC 5893** (August 2010).  IDNA2008, which defines internationalized domain names:  U-labels, A-labels, and which Unicode characters are allowed.  RFC 5890 and RFC 5891 obsolete IDNA2003, which was RFC 3490 and RFC 3491.  RFC 5892 is updated by RFC 8753.
* **RFC 3492**, *Punycode* (March 2003).  How a U-label becomes the `xn--` A-label that DNS stores.  IDNA2008 kept it; RFC 5891 updates it.
* **RFC 7505**, *A "Null MX" No Service Resource Record for Domains That Accept No Mail* (June 2015).
* **RFC 5234**, *Augmented BNF for Syntax Specifications* (January 2008).  The grammar notation below.  It obsoletes RFC 4234 (October 2005), which obsoleted RFC 2234.  It is updated by RFC 7405.
* **RFC 3696**, *Application Techniques for Checking and Transformation of Names* (February 2004).  Informational, and never obsoleted, but its own verified erratum 1690 corrects the length it gives for an address.

Replacements for RFC 5321 and RFC 5322 are on the way.  The IETF's EMAILCORE working group finished them, and both are waiting in the RFC Editor's queue as draft-ietf-emailcore-rfc5321bis and draft-ietf-emailcore-rfc5322bis.  The new SMTP RFC will also obsolete RFC 1846, RFC 7504, and RFC 7505.  Until they are published, the RFCs above are the current ones.


In Summary
----------

Just in case you can't read the odd syntax for the rules and the rest of the RFCs (and I certainly don't blame you), here are the rules as I interpret them.  Where RFC 5322 allows more than SMTP will deliver, that is noted, and SMTP wins.

* Plain SMTP carries 7-bit US ASCII.  The SMTPUTF8 extension lets two servers that both support it use UTF-8 instead, so an address can hold any Unicode character where the rules below say so.  (RFC 5321, section 2.4; RFC 6531, section 3.3; RFC 6532, section 3.1)
* Email addresses consist of a local part, the `@` symbol, and the domain.  (RFC 5321, section 4.1.2)
* The local part is either unquoted or quoted in its entirety.  RFC 5322 also has an obsolete form that quotes it one piece at a time, like `"first".second`; software reading a message must still accept it, but SMTP does not allow it.  (RFC 5321, section 4.1.2; RFC 5322, section 4.4)
* An unquoted local part is made of atoms separated by periods.  No period can start or end the local part, and two periods together are invalid.  (RFC 5321, section 4.1.2)
* Atoms can contain letters, digits, these symbols:  `` `!#$%&'*+-/=?^_{|}~ ``, and any character outside of ASCII.  (RFC 5322, section 3.2.3; RFC 6531, section 3.3)
* A quoted local part starts and ends with a quotation mark.  (RFC 5321, section 4.1.2)
* Inside the quotes, any printable ASCII character, the space, and any character outside of ASCII can appear as they are, except `"` and `\`, which must be escaped.  Tabs and the other ASCII control characters are not allowed; RFC 5322 allows tabs there, but SMTP does not.  (RFC 5321, section 4.1.2; RFC 6531, section 3.3)
* A backslash in a quoted local part escapes the next character, which must be printable ASCII or a space.  A character outside of ASCII can not be escaped.  (RFC 5321, section 4.1.2)
* The local part can be at most 64 octets.  In UTF-8, a character outside of ASCII takes two to four of them.  (RFC 5321, section 4.5.3.1.1)
* The domain is either a domain name or an address literal in brackets.  (RFC 5321, section 4.1.2)
* A domain name consists of labels separated by periods.  No period can start or end a domain name, and no two periods can be together.  (RFC 5321, section 4.1.2; RFC 1035, section 2.3.1)
* A label contains only letters, digits, and hyphens.  RFC 5322's grammar would also allow the other atom symbols, but SMTP does not.  (RFC 5321, sections 2.3.5 and 4.1.2)
* A label must not start or end with a hyphen.  It can start with a digit:  RFC 1035 asked for a letter, and RFC 1123 relaxed that.  (RFC 1035, section 2.3.1; RFC 1123, section 2.1)
* Hyphens can come several in a row inside a label.  IDNA reserves labels with hyphens in their third and fourth positions for encodings, and `xn--` is the only one in use, but SMTP does not run IDNA on ASCII labels, so it delivers to the others too.  (RFC 5321, section 4.1.2; RFC 5890, section 2.3.1)
* A label can be at most 63 octets.  (RFC 1035, section 2.3.4)
* A label can also be a U-label:  the Unicode form of an internationalized label, like `bücher`.  DNS stores it as an A-label, which is `xn--` followed by its Punycode, so `bücher` becomes `xn--bcher-kva`.  The A-label is what has to fit in 63 octets.  (RFC 6531, section 3.3; RFC 5890, section 2.3.2.1; RFC 3492)
* A U-label must not start or end with a hyphen or have hyphens in its third and fourth positions.  (RFC 5891, section 4.2.3.1)
* A U-label must be in Unicode Normalization Form C, and which Unicode characters it may contain is a long table, along with rules for right-to-left scripts.  (RFC 5890, section 2.3.2.1; RFC 5892; RFC 5893)
* A domain name can be at most 253 characters, counting each U-label as its A-label.  DNS allows 255 octets, but that counts a length byte for each label and one for the root, which leaves 253 characters of text.  (RFC 1034, section 3.1; RFC 5321, section 4.5.3.1.2)
* The top-level domain can not be all digits.  Every top-level domain in [IANA's list](https://data.iana.org/TLD/tlds-alpha-by-domain.txt) is either all letters or an internationalized `xn--` label.  (RFC 3696, section 2)
* A domain name receives mail through its MX records, or, if it has none, through its own address records (A or AAAA).  A domain with a "null MX", one MX record of preference 0 pointing at `.`, accepts no mail at all.  (RFC 5321, section 5.1; RFC 7505, section 3)
* An address literal holds an IP address, not a name:  `[192.0.2.1]` for IPv4, or `[IPv6:2001:db8::1]` for IPv6.  The `IPv6:` tag is not case-sensitive.  The grammar allows other tags, but a tag must be registered with IANA, and IPv6 is the only one that is.  RFC 5322 lets brackets hold almost anything, but SMTP accepts only these.  SMTP also says hosts should not be identified by address literals at all, but mail to one can still be sent.  (RFC 5321, sections 2.3.4 and 4.1.3; RFC 5234, section 2.3)
* An IPv4 literal is four numbers from 0 to 255, each one to three digits long, so `010` is allowed.  (RFC 5321, section 4.1.3)
* An IPv6 literal is eight groups of one to four hex digits, or fewer with `::` standing in for at least two groups of zeros, so at most six groups can appear with it.  The last two groups can be written as an IPv4 address instead.  (RFC 5321, section 4.1.3)
* The whole address can be at most 254 octets.  SMTP limits a path to 256 octets, and that count includes the angle brackets around the address.  (RFC 5321, section 4.5.3.1.3; RFC 3696, erratum 1690)


RFC 5321, sections 4.1.2 and 4.1.3
----------------------------------

These are the rules a mail server applies to a recipient, so they are the ones that decide.  `atext` comes from RFC 5322, below, and ALPHA, DIGIT, and the other core rules come from RFC 5234.

    Mailbox        = Local-part "@" ( Domain / address-literal )

    Local-part     = Dot-string / Quoted-string
                   ; MAY be case-sensitive

    Dot-string     = Atom *("."  Atom)

    Atom           = 1*atext

    Quoted-string  = DQUOTE *QcontentSMTP DQUOTE

    QcontentSMTP   = qtextSMTP / quoted-pairSMTP

    quoted-pairSMTP  = %d92 %d32-126

    qtextSMTP      = %d32-33 / %d35-91 / %d93-126

    Domain         = sub-domain *("." sub-domain)

    sub-domain     = Let-dig [Ldh-str]

    Let-dig        = ALPHA / DIGIT

    Ldh-str        = *( ALPHA / DIGIT / "-" ) Let-dig

    address-literal  = "[" ( IPv4-address-literal /
                     IPv6-address-literal /
                     General-address-literal ) "]"

    IPv4-address-literal  = Snum 3("."  Snum)

    IPv6-address-literal  = "IPv6:" IPv6-addr

    General-address-literal  = Standardized-tag ":" 1*dcontent

    Standardized-tag  = Ldh-str
                      ; Standardized-tag MUST be specified in a
                      ; Standards-Track RFC and registered with IANA

    dcontent       = %d33-90 / ; Printable US-ASCII
                   %d94-126 ; excl. "[", "\", "]"

    Snum           = 1*3DIGIT
                   ; representing a decimal integer
                   ; value in the range 0 through 255

    IPv6-addr      = IPv6-full / IPv6-comp / IPv6v4-full / IPv6v4-comp

    IPv6-hex       = 1*4HEXDIG

    IPv6-full      = IPv6-hex 7(":" IPv6-hex)

    IPv6-comp      = [IPv6-hex *5(":" IPv6-hex)] "::"
                   [IPv6-hex *5(":" IPv6-hex)]
                   ; The "::" represents at least 2 16-bit groups of
                   ; zeros.  No more than 6 groups in addition to the
                   ; "::" may be present.

    IPv6v4-full    = IPv6-hex 5(":" IPv6-hex) ":" IPv4-address-literal

    IPv6v4-comp    = [IPv6-hex *3(":" IPv6-hex)] "::"
                   [IPv6-hex *3(":" IPv6-hex) ":"]
                   IPv4-address-literal
                   ; The "::" represents at least 2 16-bit groups of
                   ; zeros.  No more than 4 groups in addition to the
                   ; "::" and IPv4-address-literal may be present.


RFC 6531, section 3.3
---------------------

SMTPUTF8 adds to the rules above.  `UTF8-non-ascii` is any character outside of ASCII, encoded as UTF-8 (RFC 6532, section 3.1), and `U-label` is defined in RFC 5890.

    sub-domain   =/  U-label
     ; extend the definition of sub-domain in RFC 5321, Section 4.1.2

    atext   =/  UTF8-non-ascii
     ; extend the implicit definition of atext in
     ; RFC 5321, Section 4.1.2, which ultimately points to
     ; the actual definition in RFC 5322, Section 3.2.3

    qtextSMTP  =/ UTF8-non-ascii
     ; extend the definition of qtextSMTP in RFC 5321, Section 4.1.2


RFC 5322
--------

This defines how an address is written in a message.  The rules starting with `obs-` are the obsolete forms, which software reading a message must still accept, but SMTP accepts none of them.  This is also where `atext` is defined.

    addr-spec       =   local-part "@" domain

    local-part      =   dot-atom / quoted-string / obs-local-part

    domain          =   dot-atom / domain-literal / obs-domain

    domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]

    dtext           =   %d33-90 /          ; Printable US-ASCII
                        %d94-126 /         ;  characters not including
                        obs-dtext          ;  "[", "]", or "\"

    dot-atom        =   [CFWS] dot-atom-text [CFWS]

    dot-atom-text   =   1*atext *("." 1*atext)

    atext           =   ALPHA / DIGIT /    ; Printable US-ASCII
                        "!" / "#" /        ;  characters not including
                        "$" / "%" /        ;  specials.  Used for atoms.
                        "&" / "'" /
                        "*" / "+" /
                        "-" / "/" /
                        "=" / "?" /
                        "^" / "_" /
                        "`" / "{" /
                        "|" / "}" /
                        "~"

    atom            =   [CFWS] 1*atext [CFWS]

    word            =   atom / quoted-string

    quoted-string   =   [CFWS]
                        DQUOTE *([FWS] qcontent) [FWS] DQUOTE
                        [CFWS]

    qcontent        =   qtext / quoted-pair

    qtext           =   %d33 /             ; Printable US-ASCII
                        %d35-91 /          ;  characters not including
                        %d93-126 /         ;  "\" or the quote character
                        obs-qtext

    quoted-pair     =   ("\" (VCHAR / WSP)) / obs-qp

    FWS             =   ([*WSP CRLF] 1*WSP) /  obs-FWS
                                           ; Folding white space

    CFWS            =   (1*([FWS] comment) [FWS]) / FWS

    comment         =   "(" *([FWS] ccontent) [FWS] ")"

    ccontent        =   ctext / quoted-pair / comment

    ctext           =   %d33-39 /          ; Printable US-ASCII
                        %d42-91 /          ;  characters not including
                        %d93-126 /         ;  "(", ")", or "\"
                        obs-ctext

    obs-local-part  =   word *("." word)

    obs-domain      =   atom *("." atom)

    obs-dtext       =   obs-NO-WS-CTL / quoted-pair

    obs-qtext       =   obs-NO-WS-CTL

    obs-ctext       =   obs-NO-WS-CTL

    obs-qp          =   "\" (%d0 / obs-NO-WS-CTL / LF / CR)

    obs-FWS         =   1*WSP *(CRLF 1*WSP)

    obs-NO-WS-CTL   =   %d1-8 /            ; US-ASCII control
                        %d11 /             ;  characters that do not
                        %d12 /             ;  include the carriage
                        %d14-31 /          ;  return, line feed, and
                        %d127              ;  white space characters

The core rules these use, from RFC 5234, appendix B.1:

    ALPHA           =   %x41-5A / %x61-7A  ; A-Z / a-z

    DIGIT           =   %x30-39            ; 0-9

    DQUOTE          =   %x22               ; " (Double Quote)

    VCHAR           =   %x21-7E            ; visible (printing) characters

    WSP             =   SP / HTAB          ; white space

    CRLF            =   CR LF              ; Internet standard newline


RFC 1035, section 2.3.1
-----------------------

This is the "preferred name syntax" for host names.  RFC 1123 relaxed the first character of a label from `<letter>` to `<let-dig>`, so a label can start with a digit.  Nothing here stops two hyphens in a row; IDNA only reserves the third and fourth positions, for encoded labels such as `xn--`.

    <domain> ::= <subdomain> | " "

    <subdomain> ::= <label> | <subdomain> "." <label>

    <label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]

    <ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>

    <let-dig-hyp> ::= <let-dig> | "-"

    <let-dig> ::= <letter> | <digit>

    <letter> ::= any one of the 52 alphabetic characters A through Z in
    upper case and a through z in lower case

    <digit> ::= any one of the ten digits 0 through 9


Length Limits
-------------

The limits come from three places, and they look like they disagree until you see what each one counts.

* DNS allows a name of 255 octets, but that counts a length byte in front of each label and one for the root.  Written out with periods, that is 253 characters, with every U-label counted as its A-label.  (RFC 1034, section 3.1)
* SMTP allows 64 octets for the local part, 255 for the domain, and 256 for the whole path.  The path is the address with angle brackets around it, so the address itself gets 254.  With SMTPUTF8 these are octets of UTF-8, not characters.  (RFC 5321, section 4.5.3.1)
* RFC 3696 adds 64, 1, and 255 to get 320, but its verified erratum 1690 corrects its SMTP figure to 254, and that is the limit that matters.  (RFC 3696, section 3)


That's a LOT!
-------------

Yep.  The easiest thing I can do is summarize the rules.

* Spaces, tabs, and line breaks around the address are ignored.  Anything else has to follow the rules.
* The address is UTF-8.  Plain ASCII works everywhere; anything else needs servers that support SMTPUTF8.
* The email has a local part on the left of the last `@` and the domain on the right.  Neither the local part nor the domain may be empty.
* The whole address is at most 254 octets, and the local part is at most 64.  A character outside of ASCII counts for two to four.
* The local part is either unquoted or one quoted string.  Quoting only part of it, like `"first".second`, is not allowed.
    * Unquoted, it is made of pieces separated by dots.  It can not start or end with a dot or have two in a row.
        * Each piece can contain `a-z`, `A-Z`, `0-9`, any of `` `!#$%&'*+-/=?^_{|}~ ``, and any character outside of ASCII.
    * Quoted, it has a `"` at the beginning and the end.
        * There does not need to be anything between the quotes.  (Weird.)
        * `"` and `\` must be escaped with a `\`.  Any other printable character, spaces, and characters outside of ASCII can appear as they are.
        * Only printable ASCII and the space can be escaped.
        * Tabs, CR, LF, and the other ASCII control characters can't appear at all.
* The domain is either a domain name or an IP address in brackets.
    * A domain name consists of labels separated by periods.  It can't start or end with a period or have two in a row.
        * A label is `a-z`, `A-Z`, `0-9`, and hyphens, at most 63 characters.
        * A label can also contain characters outside of ASCII.  It has to fit in 63 octets once it is encoded as an `xn--` label.  Which Unicode characters are allowed, and whether the label is normalized, is not checked.
        * Labels must not start or end with a hyphen.  Two hyphens in a row are fine, which matters because internationalized domains start with `xn--`, but a label with characters outside of ASCII can't have them in its third and fourth places.
        * The whole domain name is at most 253 characters, counting each internationalized label in its `xn--` form.
        * The right-most label is all letters, an `xn--` label, or a label with characters outside of ASCII.
    * An IP address goes in brackets:  `[192.0.2.1]` for IPv4, or `[IPv6:2001:db8::1]` for IPv6.
        * IPv4 is four numbers from 0 to 255, each one to three digits.
        * IPv6 is eight groups of one to four hex digits, or up to six with a `::`.  The last two groups can be an IPv4 address.
* Whether the domain exists or accepts mail is not checked.  That takes a DNS lookup.

It is not a lot better, but hopefully the rewording can help you understand the rules.
