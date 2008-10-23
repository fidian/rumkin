<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Email Validation Rules',
		'topic' => 'email'));
		
?>

<p>Oh my word!  There are so many rules that regulate email addresses.  Here are the ones that I found:</p>

<ul>
<li>All email addresses are in 7-bit US ASCII.  (RFC 2822, section 2.2)</li>
<li>Email addresses consist of a local part, the "@" symbol, and the domain.  (RFC 2822, section 3.4.1)</li>
<li>The local part can be unquoted, quoted in its entirity, or quoted on a per-label basis.  (RFC 2822, sections 3.4.1 and 4.4)</li>
<li>Unquoted local parts can consist of TEXT, optionally separated by periods.  No periods can start or end the local part.  Two periods together is invalid.  (RFC 2822, section 3.4.1)</li>
<li>TEXT can contain alphabetic, numeric, and these symbols:  !#$%'*+-/=?^_`{|}~ (RFC 2822, section 3.4.1)</li>
<li>The quoted local part starts with a quotation mark, ends with a quotation mark. (RFC 2822, section 3.4.1)</li>
<li>The contents of a quoted local part can not contain characters 9 (TAB), 10 (LF), 13 (CR), 32 (space), 34 ("), 91-94 ([, \, ], ^).  (RFC 2822, section 3.4.1)</li>
<li>If the quoted local part has a backslash, the following character is escaped and must not be 10 (LF), 13 (CR).  This supersedes the previous rule, allowing spaces and quotation marks in the email address as long as they are escaped.  (RFC 2822, section 3.4.1)</li>
<li>If an email is using the obsolete quoting on a per-label basis, then the email address consists of unquoted or quoted chunks separated by periods.  (RFC 2822, section 4.4)</li>
<li>The domain can be bracketed or plain.  (RFC 2822, section 3.4.1)</li>
<li>A plain domain consists of labels separated with periods.  No period can start or end a domain name.  No two periods in succession can be in a domain name.  (RFC 1035, section 2.3.4)</li>
<li>The maximum length of a label is 63 characters.  (RFC 1035, section 2.3.4)</li>
<li>A label may contain hyphens, but no two hyphens in a row.  A label must not start nor end with a hyphen.  (RFC 1035, section 2.3.4)</li>
<li>Bracketed domains must start with [, end with ], and must not contain characters 9 (TAB), 10 (LF), 13 (CR), 32 (space), 91-94 ([, \, ], ^).  (RFC 2822, section 3.4.1)</li>
<li>The contents of a bracketed domain can have a \ precede a character to escape it, and the following character must not be 10 (LF) or 13 (CR).  This allows spaces in the domain as long as they are escaped.  (RFC2822, section 3.4.1)</li>
<li>The maximum length of the local part is 64 characters.  (RFC 2821, section 4.5.3.1)</li>
<li>Domains must resolve with either an A or MX record.  (RFC 2821, section 3.6)</li>
<li>The maximum length of a domain must be 255 characters when being transmitted over the wire (for DNS lookups), thus the maximum length of the domain (the normal domain or the contents of the bracketed domain) is 253 characters.  (RFC 1034, section 3.1)</li>
<li>Any domain label can be at most 63 characters long.  (RFC 1034, section 2.3.1)</li>
<li>The maximum length of a "useful" email address is 255 characters.  (RFC 2821, section 4.5.3.1)</li>
<li>The maximum allowable length of an email address is 320 characters.  (RFC 3696)</li>
<li>The top level domain must be all alphabetic.  (RFC 3696, section 2)</li>
</ul>

<p>The code I have does not allow tabs, CR, or LF in the email address (intentionally).  It doesn't allow comments, as per the CWFS part of the RFC.  This makes the length checks a lot easier since we don't need to remove comments before checking the max lengths.  It also does not do any domain lookups, nor does it try to connect to the mail server and use a VRFY command to validate that the mailbox exists.  Lastly, empty emails (a string of length 0) is considered a valid email.</p>

<p>RFC 3696 doesn't appear to agree with RFC 1034.  It appears that one says the maximum domain length is 255 characters and the other says 253 characters when transmitted over the wire.  The good news is that the domain portion in the email can have brackets surrounding it, thus making the length 255 characters.</p>

<?PHP Section('That\'s A LOT!'); ?>

<p>Yep.  The easiest thing I can do is summarize the rules.</p>

<ul>
<li>Email addresses are 7-bit ascii; each character has a value from 1 to 127</li>
<li>The email has a localpart on the left of an @, the domain on the right.  Neither the localpart nor the domain may be empty.</li>
<li>The localpart must be 64 characters or less.</li>
<li>The localpart can consist of labels separated by dots but there can not be two successive dots, nor can it start or end with a dot.</li>
<li>Labels can either be quoted or unquoted.
	<ul>
	<li>Unquoted labels must have at least one character.
		<ul>
		<li>This can only contain <tt>a-z</tt>, <tt>A-Z</tt>, <tt>0-9</tt>, or any of <tt>!#$%&amp;'*+-/=?^_`{|}~</tt>.</li>
		</ul></li>
	<li>Quoted labels have a " at the beginning and end.
		<ul>
		<li>There does not need to be anything between the quotes.  (Weird.)</li>
		<li>Tab, CR, LF, ", [, \, ^ must not exist in the email address unescaped.</li>
		<li>Only CR and LF can't be escaped with a \ before the character.</li>
		</ul></li>
	</ul></li>
<li>The domain can be bracketed, unbracketed, or an IP address..
	<ul>
	<li>An unbracketed domain consists of labels separated by periods and less than 253 characters.  No domain can start with a period, end with a period, or have two successive periods.
		<ul>
		<li>Labels consist of <tt>a-z</tt>, <tt>A-Z</tt>, <tt>0-9</tt>, or one of <tt>!#$%&amp;'*+-/=?^_`{|}~</tt>.</li>
		<li>Labels must be less than 63 characters.</li>
		<li>Labels must not start with a hyphen, end with a hyphen, or contain two successive hyphens.</li>
		<li>The right-most label must be all alphabetic.</li>
		</ul></li>
	<li>A bracketed domain starts with [, ends with ] and the contents (after unescaping) must be less than 245 characters.
		<ul>
		<li>CR, LF, {, }, |, and ^ are not allowed unescaped.</li>
		<li>If there is a \, any character except CR or LF is allowed.</li>
		<li>Labels must be less than 63 characters.</li>
		<li>Labels must not start with a hyphen, end with a hyphen, or contain two successive hyphens.</li>
		<li>The right-most label must be all alphabetic.</li>
		</ul></li>
	<li>IP addresses can be specified as 123.45.67.89 or 73f0:2bba::0562:0011 (IPv4 or IPv6).</li>
	</ul></li>
</ul>

<p>It is not a lot better, but hopefully the rewording can help you understand the rules.</p>

<?PHP

StandardFooter();
