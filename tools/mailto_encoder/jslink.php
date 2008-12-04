<?php

include '../../functions.inc';


function Insert_JS() {
	
	?>
<SCRIPT LANGUAGE="javascript" type="text/javascript" src="email.js"></SCRIPT>
<SCRIPT LANGUAGE="javascript" type="text/javascript" src="jslink.js"></SCRIPT>
<?php
}

StandardHeader(array(
		'title' => 'Mailto Encoder',
		'header' => 'JavaScript Link Encoder',
		'topic' => 'mailto',
		'callback' => 'Insert_JS'
	));

?>

<p>This is a variant of the <a href="index.php">mailto encoders</a> that I
have on my site.  It uses JavaScript to create a reusable hunk of code that
should hide your email address on web pages.  It foils the following kinds
of spambots:</p>

<ul>
<li>Really dumb ones that only parse text and search for
username@host.name</li>
<li>The smarter ones that can decode <tt>&amp;#075</tt> HTML encoded 
characters and <tt>%7f</tt> Javascript encoded characters</li>
<li>The even smarter ones that can run JavaScript on a web page that can
decode and run initial document.write() statements [very few, if any]</li>
</ul>

<p>As with the <a href="simple.php">simple version</a> and the JavaScript
encoding methods on the <a href="custom.php">advanced version</a>, this
method will require the user to have a JavaScript enabled browser in order
to let them email you.</p>

<?php Section('Method 1:  Plain Text'); ?>

<p>For this to work, you just put one JavaScript function in your web page,
then you alter your mailto links to call the JavaScript.</p>

<?php MakeBoxTop('center') ?>
<pre>&lt;script language="javascript"&gt;
function MailMe(user, host)
{
    window.location.replace("mailto:"+user+"@"+host);
}
&lt;/script&gt;
</pre>
<?php MakeBoxBottom() ?>

<p>Now, with this code, you just make your links look like this:</p>

<?php MakeBoxTop('center') ?>
<pre>&lt;a href="javascript:MailMe('user','host.name')"&gt;Mail Me&lt;/a&gt;
</pre>
<?php MakeBoxBottom() ?>

<p>Just make sure to not use your email address as the text part of the link
and you should be fine.</p>

<?php Section('Method 2:  Encrypted Text'); ?>

<p>Encode your email address and copy the JavaScript code.  Paste it into
the header of your web page, between a set of &lt;script&gt; tags.  Remove
the "document.write(...)" part, but remember what goes in the "..." area.</p>

<p>Now, just put that ... in the link below.  If you use the double-escaped
method, the "..." is "unescape(OutString)".  If you use the substitution
method, the "..." is "OT".

<?php MakeBoxTop('center'); ?>
<pre>&lt;a href="javascript:..."&gt;Mail Me&lt;/a&gt;
&lt;a href="javascript:unescape(OutString)"&gt;Double-Escaped&lt;/a&gt;
&lt;a href="javascript:OT"&gt;Substitution&lt;/a&gt;
</pre>
<?php

MakeBoxBottom();
StandardFooter();
