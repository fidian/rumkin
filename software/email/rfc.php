<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Email Validation RFC Rules',
		'topic' => 'email'));
		
?>

<p>Here are the rules as copied from the specified RFCs.  If you are trying to say that an email should or should not validate, make sure that the rules support what you are saying.</p>

<?PHP Section('RFC 2822') ?>

<pre>addr-spec       =       local-part "@" domain

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
</pre>

<?PHP Section('RFC 1035, section 2.3.1') ?>

<p>RFC 1123 relaxed the definition of "label", reflected below.</p>

<pre>
domain          =       subdomain / " "

subdomain       =       *(label ".") label

label           =       *let-dig-hyp 1*let-dig

let-dig-hyp     =       1*let-dig "-"

let-dig         =       ALPHA / DIGIT
</pre>
<?PHP

StandardFooter();
