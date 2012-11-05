<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'Email Address Encoder',
		'topic' => 'mailto'
	));

?>

<p>Junk email (a.k.a. spam) is a part of everyone's life if they ever put
their email address on the web.  For HTML authors, site admins, and for
people who want a little credit on the page that they put online, it is a
constant problem.  You want to include your email address on the page, but
you don't want your email address to be harvested by spambots.</p>

<p>The best thing you can do is encode your email address so that browsers
can see it and spambots can not.  This is what this tool attempts to do. I
have created two different versions of the address encoder.  Please pick the
one that is appropriate:</p>

<?php MakeBoxTop('center'); ?>
<a href="simple.php">Simple</a> - <tt>Easy, quick, effective.</tt></a><br>
<a href="custom.php">Custom</a> - <tt>For really technically-minded
people.</tt></a>
<?php MakeBoxBottom() ?>

<p>These tools do not steal your email addresses.  Nothing is sent back to
my server, and everything runs in JavaScript in your browser.  If you don't
believe me, check out this <a
href="http://www.dslreports.com/forum/remark,7309390~root=spam~mode=flat">
independent review</a> of a mirror the tools provided here.
Keep in mind that this is not the end-all.  There are other solutions out
there, such as:</p>

<ul>
<li>Java applet that shows the address and lets you click on it, but will
foil spambots because they don't have a Java interpreter.</li>
<li>CGI scripts to send you mail directly without ever giving your address
out -- make sure you don't specify the target email address in the feedback
form!</li>
<li>A form button that will pop up a javascript window.</li>
<li>A public guestbook/forum.</li>
</ul>

<p>Remember -- creativity is the key when playing against spammers.  They
eventually adapt their techniques in order to make another $.05.</p>

<p>The disadvantages for using this encoder are limited:</p>

<ul>
<li>It can be foiled by a spambot that can parse and execute JavaScript.</li>
<li>If this becomes common, spammers will just write the proper parsers into
their programs and still rip out your email address.</li>
</ul>

<p>This program can be further enhanced to do the following neat ideas:</p>

<ul>
<li>Make the JavaScript put up a link that, when clicked, will pop open a
window and automatically roll-over to the right email address.</li>
<li>Generate the code necessary for a form button that will take appropriate
action when clicked.</li>
<li>Generate code for a java applet to display your email address.</li>
<li>Use this <a href="example.phps">PHP code</a> to make any email addresses
on your site encrypted.  It's the same stuff I use on my site.</li>
</ul>

<?php

StandardFooter();
