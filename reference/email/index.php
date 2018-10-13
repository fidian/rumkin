<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Email on Rumkin.com',
		'topic' => 'reference'
	));

?>

<p>So, you have an account on this machine and you want to know more about
the situation with your email.  You've come to the right place.</p>

<?php Section('Secure Email'); ?>

<p>I have an SSL connection available for authenticated SMTP (port 465,
but you must enable <a href="https://www.rumkin.com/cgi-bin/tmda.cgi">TMDA</a>)
and IMAP (port 993).  If your email client allows you to, you should
connect with the encrypted ports.  Otherwise, you will be only able to
receive email and not send anything.
<a href="http://mozilla.com">Thunderbird</a> works wonderfully.</p>
	
<p>I need to remove TMDA and just set up a SSL enabled SMTP and IMAP
nobody on this system needs the added overhead of TMDA.</p>

<?php Section('Blocked Mail'); ?>

<p>If someone is trying to email you but gets their messages returned, tell
them to go to <a href="denied.php">this page</a>, which will explain what
that is all about and how to fix it.</p>

<?php Section('Webmail'); ?>

<p>Every account on rumkin.com can use the web-based email system at <a
href="http://mail.rumkin.com/">mail.rumkin.com</a>.  You can also use the <a
href="https://mail.rumkin.com/">secure version</a>, but your browser will be
asked if the security certificate is ok.  I am using a free certificate
from <a href="http://cert.startcom.org">Startcom</a>.  You can install the
<a href="http://cert.startcom.org/index.php?app=109">CA Cert</a> in your
web browser to eliminate this tiny hassle.</p>

<?php Section('Forwarding &amp; Procmail'); ?>

<p>Want to set up email forwarding?  I run <a
href="http://www.qmail.org">qmail</a>.  You'll just need to add a .qmail
file in your home directory and in there put just this one line:</p>

<blockquote>&amp;your_username@other.mail.host.com</blockquote>

<p>Want to use procmail?  Add a .qmail file and put in the following line.
Then just edit your .procmailrc to your liking.</p>

<blockquote>|preline procmail</blockquote>

<p>For more help (assuming you have a shell account), see the man pages for
dot-qmail, qmail-command, procmail, procmailrc.  If you don't, just look for
a man to html gateway or use <a href="http://www.google.com/">Google</a> for more
information.</p>

<?php Section('Spam and Virus Filters'); ?>

<p>This sitepublishes an <a href="http://spf.pobox.com/">SPF record</a>
and checks incoming connections for SPF records to help prevent people who
spam with a fake address such as @aol.com.
  
<p>All incoming connections are checked against several lists of known
spammers, open relays, and just plain evil sites using
<a href="http://cr.yp.to/ucspi-tcp/rblsmtpd.html">rblsmtpd</a>.
These lists come from
<a href="http://www.spamhaus.org/sbl/">sbl.spamhaus.org</a>,
<a href="http://www.spamhaus.org/xbl/">xbl.spamhaus.org</a>,
<a href="http://www.spamcop.net/bl.shtml">bl.spamcop.net</a>,
<a href="http://www.ordb.org/">relays.ordb.org</a>,
<a href="http://antispam.or.id/">dnsbl.antispam.or.id</a>,
<a href="http://njabl.org/">dnsbl.njabl.org</a>,
<a href="http://dsbl.org/main">list.dsbl.org</a>,
<a href="http://opm.blitzed.org/">opm.blitzed.org</a>,
<a href="http://dnsbl.net.au/t1/">dnsbl.net.au</a>,
<a href="http://cbl.abuseat.org/">cbl.abuseat.org</a>,
<a href="http://www.five-ten-sg.com/blackhole.php">blackholes.five-ten-sg.com</a>.
If you want to test out these lists to see if your IP is listed on one of
them, you can use this <a href="rblcheck.php">online tool</a>.  I also have
special honeypot email addresses on this server, which will help me make
my own blackhole list in the future.</p>

<p>After that, incoming email is scanned for viruses with
<a href="http://www.inter7.com/?page=simscan">simscan</a> and
<a href="http://clamav.elektrapro.com/">clamav</a>.  This will catch the
viruses before they even make it to your mailbox.</p>

<p>Following that, simscan also checks the email to see if the content
appears to be spam, based on spamassassin's rules.</p>

<p>Just to be extra-safe, all web email users also have a basic
pattern-matching virus scanner built into the mail reader, which will let
you know if a specific attachment is a known virus that is plaguing the
net.</p>

<p>Almost all of this is handled before the server actually receives the
email, so no separate bounce message is generated and the sender
automatically knows there is a problem.  Likewise, if any email is sent from
this system, it is also scanned for viruses and spam before I even think
about sending it to another machine.  That way, Rumkin.com does not get a
bad image on the net for condoning spam and evil things.</p>
	
<?php

StandardFooter();
