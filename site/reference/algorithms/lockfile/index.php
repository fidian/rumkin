<?php

require '../../../functions.inc';
StandardHeader(array(
		'title' => 'Lockfile',
		'topic' => 'algorithms'
	));

?>

<p>PERL does actually have a set of lockfile functions, but they didn't work
very well on my system (I honestly followed the instructions, but I couldn't
get it to lock reliably).  Because of that, I ripped out the lockfile
functions from Agora (an email-to-web gateway).</p>

<p>You can download these functions as <a
href="lockfile.txt">lockfile.txt</a> and then rename it to lockfile.pl.  You
add it to your PERL program with <tt>require "lockfile.pl"</tt> and use the
SetLockFile() function below.</p>

<p><b>$FN = SetLockFile("/directory", "filename")</b> - Creates a lockfile in the
specified directory with "filename" as the lockfile's prefix.  If there is a
lock file already, it will wait and try again.  It returns the full filename
of the lock file.  To remove the lock file, which you MUST do, call
<tt>unlink($FN)</tt>.</p>

<?php

StandardFooter();
