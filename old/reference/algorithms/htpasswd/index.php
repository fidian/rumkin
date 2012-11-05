<?php

require '../../../functions.inc';
StandardHeader(array(
		'title' => 'HTPasswd',
		'topic' => 'algorithms'
	));

?>

<p>Restricting access to web pages and specific directories in Apache is
usually done with .htaccess and .htpasswd files.  This is not a tutorial on
them &ndash; instead, this just describes the PERL functions that I wrote to
help me out with altering .htpasswd files from a form.  They are not very
well written, but they worked well for a very small site.</p>

<p>If you have a site where there is just yourself or a small handful of
people and you won't be editing the .htpasswd files a lot, feel free to use
this script.  If you need multiple people to be able to update the files
simultaneously, you should add lockfiles or use a well-written PERL module
to do the work for you.</p>

<p>To include it, just download <a href="auth.txt">auth.txt</a>, save it as
whatever you like (I like "auth.pm"), and then add <tt>require
"auth.pm"</tt> to your PERL code.  From there, you get access to a handful
of functions.</p>

<p><b>%Data = LoadAuthFile(".htpasswd")</b> - Loads the specified .htpasswd
file into a hash.  Returns the hash where $Data{'username'} =
'encrypted_pass'.</p>

<p><b>SaveAuthFile(".htpasswd", %Data)</b> - Writes the users and passwords
in the %Data hash to the file specified.  Returns 1 on error, 0 on
success.</p>

<p><b>MakeRestrictedFile("Directory/To/Protect", "/path/to/.htaccess",
"Title For Prompt")</b> - Writes a .htaccess file to the specified
directory.  Make sure to not include a slash at the end of the directory
name.  In the .htaccess file, it sets the AuthName (the prompt for the
dialog box) to the "Title For Prompt", and tells to use any authorized user
from the .htpasswd file specified.  This function just makes it easy to
password protect a directory.</p>

<p><b>$Encrypted = EncryptPassword("password")</b> - Returns a crypt()'d
password with a random encryption key.  This is the type of password that is
stored in .htpass files.</p>

<p>To use this, you load the .htpass file, delete or add hash entries, and
then save the auth file.  If you create entries, encrypt the password with
EncryptPassword().</p>

<?php

StandardFooter();
