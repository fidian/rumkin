<?php

require('../../functions.inc');
StandardHeader(array(
		'title' => 'Email Validation Done Right',
		'topic' => 'email',
		'callback' => 'insert_js'
	));

?>

<p>I have a problem.</p>

<p>I have a problem with most email validators on the web.  They let through things that are completely wrong.  They mark good email addresses as invalid.</p>

<p>I have decided to write my own validators.  In fact, I decided to write more than one to make sure that they are right and to have an algorithm that will likely work with my language of choice at the moment.</p>

<?php Section('The Rules'); ?>

<p>There are so many rules that I broke them out into two pages.  I have a <a href="rules.php">human-readable version</a> that explains the rules, and then there is the <a href="rfc.php">ABNF form</a> that shows most of the rules in a token-based style.</p>

<?php Section('Testing'); ?>

<p>I have a page that shows many <a href="test.php">crazy email addresses</a> and the correct results for those email addresses.  It also gives you a live evaluation of the different versions of my code, which is primarily there as a means for me to make sure that changes work.</p>

<p>Alternatively, you can try it yourself:</p>

<form method="post" action="index.php">
<p>Email: <input type=text name=email value="test_user@example.com" onchange="email_verify(this.value)" onkeypress="email_verify(this.value)" onkeyup="email_verify(this.value)"> <span id='results'>Valid</span></p>
</form>

<?php Section('Corrections?'); ?>

<p>I am very interested in correcting these algorithms.  If you have sample email addresses that are identified incorrectly by these programs, please let me know.  However, you should first make sure that the rules from the RFC allow or disallow that email address.  I have <a href="rfc.php">summarized these rules</a> to make your validation faster.</p>

<?php

StandardFooter();


function insert_js() {
	
	?>
<script language="JavaScript" src="email_test.js"></script>
<script language="JavaScript"><!--
function email_verify(e) {
	var result = "Invalid";
	if (is_valid_email(e)) {
		result = "Valid";
	}
	document.getElementById('results').innerHTML = result;
}
// --></script>
<?php
}

