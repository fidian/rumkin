<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Strength Test',
		'topic' => 'password',
		'callback' => 'insert_js'
	));

?>

<p>People wonder if their password is a good password.  I often come across
two distinct groups of people.  The first would fall into a "just use any
word" category, which is a very bad practice for picking passwords.  The
second group will mix in a few numbers in order to make the password a lot
harder to guess.  But, how do you know if you have a secure passphrase?</p>

<p>Good passwords / passphrases:
<ul>
<li>... should be 8 characters or longer, which forces you to use multiple
words or extra symbols.
<li>... should have upper case, lower case, symbols, and numbers; or at
least three of those four groups.
<li>... should not be a common word and should not be a common phrase.
<li>... should not contain a date, a name, or other things that can be
associated with you.
<li>... should be <a href="pass_gen.php">created randomly</a> or semi-randomly.
</ul>

<p>This password checker will gauge your password and give it a score
based on how good of a password it is.  It will let you know if you picked a
common password (don't do that!) and it will also take into account the
probability of letters landing close to each other.  For instance, "Q" is
almost always followed by "U", so your password's score won't increase much
when you type in the "U".</p>
	
<p>I use cryptographically-minded descriptions to describe how weak or
strong a password is.  For email accounts, passwords to log into your
personal machine, and other things that don't require the most strict
authentication, feel free to use a password that is deemed "Weak" or
"Reasonable".</p>

<p>This runs completely in your browser and sends no information back to me.
If you are paranoid, you can read the source code, unplug your machine from
the internet, or just use a password that is similar to yours.  Also, please
keep in mind that this is an estimate of how strong your password is, and
I make no guarantee that the information shown is correct.</p>
	
<form method="POST" action="#" onSubmit="return false" name="passchk_form">
<p><b>Enter your password or passphrase here:</b></p>
<p>&nbsp; &nbsp; &nbsp;<input type=password size=40 name="passchk_pass"></p>
</form>
<?php

MakeBoxTop('center', 'width: 50%');

?><span id="passchk_result">Loading ...</span><?php

MakeBoxBottom();

?>
<ul>
<li>Warnings are shown if you enter a common password.
<li>Warnings are shown if your password is very short (4 or less characters)
or if it is short (less than 8 characters)
<li>Password strength is determined with this chart, which might be a bit
of a stretch for a non-critical password:
<ul>
<li>&lt; 28 bits = Very Weak; might keep out family members
<li>28 - 35 bits = Weak; should keep out most people, often good for
desktop login passwords
<li>36 - 59 bits = Reasonable; fairly secure passwords for network and
company passwords
<li>60 - 127 bits = Strong; can be good for guarding financial information
<li>128+ bits = Very Strong; often overkill
</ul>
<li>The number of bits listed for entropy is an estimate based on letter
pair combinations in the English language.  To make the frequency tables
a reasonable size, I have lumped all non-alphabetic characters together
into the same group.  Because of this, your entropy score will be lower than
your real score when you use several symbols.</li>
<li>For determining the character set, letters are grouped into a-z, A-Z,
numbers, symbols above numbers, other symbols, and other characters.  If your
passphrase contains a character from the subset, that subset is added to
the pool, increasing the size of the character set and increasing the amount
of entropy in your password.
</ul>
  
<p>If you really like this program and you want to include it with your
software or on your site, you can download it here: <a
href="media/passchk.zip">passchk.zip</a> (<?php

echo FidianFileSize(getenv('MEDIABASE') . 'tools/password/passchk.zip'); ?>).
The code is licensed under the <a href="COPYING">GPLv3</a>, which may be of
importance to note if you are including it as part of your custom
software.</p>
	
<?php

StandardFooter();


function insert_js() {
	
	?>
<!-- The JavaScript code has licensing information in the file itself. -->
<script language="javascript" src="passchk.js"></script>
<script language="javascript" src="common.js"></script>
<script language="javascript" src="frequency.js"></script>
<?php
}

