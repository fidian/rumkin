<?php

include '../../functions.inc';
StandardHeader(array(
		'topic' => 'password',
		'title' => 'Passwords'
	));

?>

<p>If you use a computer, you more than likely have a password or a
passphrase.  Security is something that people often don't take seriously
enough.  Because of this, I have created a couple tools that help to make
things simpler.</p>


<?php Section('<a href="diceware.php">Diceware</a>'); ?>

<p>You can create high-quality passphrases with a lookup table and a set of
dice.  This web page will replace the lookup table, which means you won't
need to print our or reference a 30+ page list of words.  It also has the
ability to generate a passphrase for you, word by word.</p>


<?php Section('<a href="md5.php">MD5 Generator</a>'); ?>

<p>Calculate the MD5 checksum of a bit of text, password, or whatever you
like.  Runs in your browser and nothing is sent back to me, just in case
you need to use it offline.</p>

<?php Section('<a href="pass_gen.php">Password Generator</a>'); ?>

<p>If you need to make a password, generate random numbers, or create a
hexadecimal key for your wireless LAN, this tool is for you.  It is written
in JavaScript and will create random information for you with just a click
of a button.</p>


<?php Section('<a href="passchk.php">Password Strength Tester</a>') ?>

<p>Do you want to know how secure your new password is?  This JavaScript
tool will analyze your password and compare it to a list of common
passwords.  Then it will look closer at the letters and the "predictability"
of letter pairs in your words in order to generate a score of how random
your password really is.  It will show you the difference between "password"
and "Pa5$w0rD".

	
<?php Section('Links'); ?>

<ul>
<li><a href="http://www.surveillance-video.com/password-jan-2010.html">Security
Stats</a> - Tips for creating good passwords
<li><a href="http://www.diceware.com/">Diceware</a> -
Create good passphrases by shaking a few dice and looking up words on a
table
<li><a href="http://passwordmaker.org">Password Maker</a> - Extension for
IE, Firefox, Yahoo! widget, javascript, PHP.  Create a secure password for
a given web site and you only need to remember the "master password" that
is used to generate every site's password.
</ul>
	

<?php Section('More Tools?'); ?>

<p>Want me to write something for you?  Leave a message in the chat window
below.</p>

	
<?php

StandardFooter();
