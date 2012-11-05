<?php

require('../../functions.inc');
require('email_test.php');
require('email_regexp.php');
$tests = array(
	// Plain addresses
	array(
		'testing@us.example.com',
		true,
		'Plain address'
	),
	array(
		'peter.piper@example.com',
		true
	),
	array(
		'_somename@example.com',
		true
	),
	array(
		'user+mailbox@example.com',
		true
	),
	array(
		'someone@3com.com',
		true,
		'RFC 1123 superceded RFC RFC 1035, which would have forbade this domain'
	),
	array(
		'testing@somewhere',
		true,
		'While "somewhere" is not a valid TLD yet, the email address violates no rules'
	),
	array(
		'abcdefghijklmnopqrstuvwxyz@abcdefghijklmnopqrstuvwxyz',
		true
	),
	
	
	// Plain with odd characters
	array(
		'customer/department=shipping@example.com',
		true,
		'Uncommon characters'
	),
	array(
		'!def!xyz.c%abc+@example.com',
		true,
		'Uncommon characters'
	),
	array(
		'good@host-name.com',
		true,
		'Hosts can have hyphens'
	),
	array(
		'1234567890.0987654321@EXAMPLE.WHATEVER.ABC.123.CAT',
		true,
		'Some check for letters in the local part'
	),
	array(
		'relay.mil%john.smith@EXAMPLE-WHATEVER.ARPA',
		true,
		'Old-school relays'
	),
	array(
		'test@localhost.com',
		true
	),
	array(
		'joe@123.45.67.89',
		true,
		'IPv4 addresses are valid'
	),
	array(
		'joe@2001:0db8::1428:57ab',
		true,
		'IPv6 addresses are valid'
	),
	
	
	// Bad plain emails
	array(
		'hello world@example.com',
		false,
		'Spaces are not allowed without quoting'
	),
	array(
		'moose@example com',
		false,
		'Domains with spaces must have brackets'
	),
	array(
		'bird@test example.com',
		false
	),
	array(
		'Abc\\\\@example.com',
		false,
		'Escaping not allowed without quoting'
	),
	array(
		'Abc\\@def@example.com',
		false
	),
	array(
		'Joe.\\\\Blow@example.com',
		false
	),
	array(
		'woo\\ yay@example.com',
		false
	),
	array(
		'\\$A12345@example.com',
		false
	),
	array(
		'abc@def@example.com',
		false,
		'Two @ symbols not allowed without brackets or quoting'
	),
	array(
		'one\\@two@example.com',
		false,
		'Escaping doesn\'t make it valid either'
	),
	array(
		'Abc\\\\@def@example.com',
		false
	),
	array(
		'one\.two@example.com',
		false
	),
	array(
		'joe@123.456.7.89',
		false,
		'This is not a valid IP address'
	),
	array(
		'mike@9472:0f6e::1bg0:9876',
		false,
		'Invalid IPv6 address'
	),
	array(
		'mike@9472:0f6e::1b810:9876',
		false,
		'Invalid IPv6 address'
	),
	
	
	// Quoted
	array(
		'"woo.yay"@example.com',
		true,
		'No need to quote this one, but no reason to not quote either'
	),
	array(
		'"Abc@def"@example.com',
		true,
		'Properly quoted'
	),
	array(
		'"Abc\\@def"@example.com',
		true,
		'Properly quoted, optionally escaped'
	),
	array(
		'"Fred Frederson"@example.com',
		true,
		'Spaces are allowed when quoted'
	),
	array(
		'" Test"@example.com',
		true,
		'Leading spaces may be evil but allowed'
	),
	array(
		'"Fred\\ Frederson"@example.com',
		true,
		'Spaces are allowed and can be escaped'
	),
	array(
		'"Joe.\\\\Test"@example.com',
		true,
		'An escaped backslash'
	),
	array(
		'"abc\\\\"@example.com',
		true,
		'Escaped backslash at the end confuses some parsers'
	),
	array(
		'"\\$A12345"@example.com',
		true
	),
	array(
		'"first".second@employs.allowable.trick',
		true,
		'Uses the obsolete, yet valid form'
	),
	array(
		'"Tyler \\"The Man\\" A."@example.com',
		true,
		'Quoted localparts can have escaped quotes'
	),
	array(
		'"Tyler\\ \\"The\\ Man\\"\\ A\\."@example.com',
		true,
		'Escaping a lot more'
	),
	array(
		'"Quote \\" Quote"@example.com',
		true,
		'Some parsers have issues with the singleton quote'
	),
	array(
		'""@the-void.example.com',
		true,
		'An empty quoted localpart is valid... somehow'
	),
	array(
		'"two..dot"@example.com',
		true,
		'Double periods are allowed in a quoted localpart'
	),
	
	
	// Quoted incorrectly
	array(
		'"quote@example.com',
		false,
		'Unbalanced quotes'
	),
	array(
		'quote"@example.com',
		false
	),
	array(
		'quote\\"@example.com',
		false,
		'Escaping doesn\'t make it valid either'
	),
	array(
		'"Tyler "The Man" A."@example.com',
		false,
		'Quotes in the middle must be escaped'
	),
	array(
		'Tyler\\ \\"The Man\\"\\ Akins@example.com',
		false,
		'Escaping characters requires the localpart to be quoted'
	),
	array(
		'Tyler\\ \\"The Man\\"\\ A\\.@example.com',
		false
	),
	array(
		'"first."second@bad-quoting.info',
		false,
		'If the quote and the period were swapped, this would be valid.'
	),
	
	
	// Length and simple tests
	array(
		'testingAVeryLongEmailAddressAgainstTheParser.ThisOneShouldBeGood@e.ca',
		true,
		'64 characters in the localpart'
	),
	array(
		'testingAVeryLongEmailAddressAgainstTheParser.ThisOneIsABadAddress@e.ca',
		false,
		'The localpart is one character too long'
	),
	array(
		'x@superduperlonglinethatisexactlysixtythreecharactersjustfortests.com',
		true,
		'63 letters is the maximum length of a label in the domain'
	),
	array(
		'x@superduperlonglinewaymorethansixtythreecharactersforsureblahblah.com',
		false,
		'Domain label is one character too long'
	),
	array(
		'@example.com',
		false,
		'No localpart'
	),
	array(
		'doug@',
		false,
		'No domain'
	),
	array(
		'.dot@example.com',
		false,
		'Localpart can not start with a period'
	),
	array(
		'dot.@example.com',
		false,
		'Localpart can not end with a period'
	),
	array(
		'two..dot@example.com',
		false,
		'Localpart can not have two successive periods'
	),
	array(
		'matt@.example.com',
		false,
		'Domain starts with a period'
	),
	array(
		'matt@example.com.',
		false,
		'Domain ends with a period'
	),
	array(
		'timothy@test-host..tld',
		false,
		'Domain contains double period'
	),
	array(
		'user@???',
		false,
		'Top level domain must be all alphabetic'
	),
	array(
		'user@domain.c0m',
		false
	),
	array(
		'user@-example.com',
		false,
		'Domain has leading hyphen on a label'
	),
	array(
		'user@example-.com',
		false,
		'Domain has trailing hyphen on a label'
	),
	array(
		'user@test.-example.com',
		false,
		'Domain has a leading hyphen on a label'
	),
	array(
		'user@test--example.com',
		false,
		'Domain has two successive hyphens'
	),
	
	
	// Bracketed
	array(
		'test@[example.com]',
		true,
		'Bracketed domain'
	),
	array(
		'example@[hello world.com]',
		true,
		'Bracketed domains can contain spaces'
	),
	array(
		'example@[hello\ world.com]',
		true,
		'Bracketed domains can have escaped characters'
	),
	array(
		'matt@[test--valid.tld]',
		false,
		'Bracketed domains still can\'t violate the period nor hyphen rules.'
	),
	array(
		'matt@[-host.tld]',
		false
	),
	array(
		'matt@[host-.tld]',
		false
	),
	array(
		'matt@[example..com]',
		false
	),
	array(
		'matt@[.example.com]',
		false
	),
	array(
		'matt@[example.com.]',
		false
	),
	array(
		'matt@[numeric.tld.l33t]',
		false
	),
	array(
		'test@[hello@world.com]',
		true,
		'Yes, domains can have an @ symbol'
	),
	
	
	// Incorrectly bracketed
	array(
		'cat@[example].com',
		false,
		'Invalid bracketing'
	),
	array(
		'mouse@[test example].com',
		false
	),
	array(
		'dog@[example.com',
		false
	),
	array(
		'ant@[test\\ example].com',
		false
	),
);
StandardHeader(array(
		'title' => 'Email Validation Done Right',
		'topic' => 'email',
		'callback' => 'insert_js'
	));

?>

<p>Here is a bunch of email addresses.  You can also try your own on the <a href="index.php">main page</a>.</p>

<table border=0 cellspacing=0 cellpadding=0 style="border: 1px solid black" class="eTable">
<tr><th valign="top">Email Address</th><th valign="top">Good?</th><th valign="top">PHP</th><th valign="top">PHP Regex</th><th valign="top">Javascript</th><th valign="top" class="th_note">Notes</th></tr>
<?php

$row = 0;

foreach ($tests as $test) {
	if ((($row ++) / 2) % 2) {
		echo '<tr bgcolor="#EEEEDD">';
	} else {
		echo '<tr bgcolor="#FFFFFF">';
	}
	
	echo '<td valign="top" class="email">' . htmlspecialchars($test[0]) . '</td>';
	showResult($test[1], $test[1]);
	showResult($test[1], is_valid_email($test[0]));
	showResult($test[1], is_valid_email_regexp($test[0]));
	
	?>
<script language="JavaScript"><!--
test_email(<?php echo ($test[1]) ? '1' : '0'; ?>, "<?php echo addslashes($test[0]); ?>");
// --></script><noscript><td valign="top" class="wrong">?</td></noscript>
<?php
	
	echo '<td valign="top" class="note">';
	
	if (isset($test[2])) {
		echo htmlspecialchars($test[2]);
	} else {
		echo '&nbsp;';
	}
	
	echo '</td></tr>';
}

?>
</table>

<p>Do you have any you would like to add?</p>

<?php

StandardFooter();


function showResult($expected, $b) {
	if ($expected != $b) {
		echo '<td valign="top" align="center" class="wrong">';
	} else {
		echo '<td valign="top" align="center">';
	}
	
	if ($b) {
		echo 'Y';
	} else {
		echo 'n';
	}
	
	echo '</td>';
}


function insert_js() {
	
	?>
<script language="JavaScript" src="email_test.js"></script>
<script language="JavaScript"><!--
function test_email(expect, email) {
	var b = is_valid_email(email);
	if (expect != b) {
		html = '<td valign="top" align="center" class="wrong">';
	} else {
		html = '<td valign="top" align="center">';
	}
	if (b) {
		html += 'Y';
	} else {
		html += 'n';
	}
	html += '</td>';
	document.write(html);
}
// --></script>
<style type="text/css">
.eTable {
	border: 1px solid black;
}
.eTable th {
	border-bottom: 1px solid black;
	border-right: 1px solid black;
	padding: 0 1em;
}
.eTable .th_note {
	border-right: 0;
}
.email {
	font-size: 0.8em;
	font-face: monospace;
}
.note {
	font-size: 0.8em;
}
.wrong {
	background-color: red;
}
</style>
<?php
}

