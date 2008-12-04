<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Setting up Qmail on Gentoo',
		'topic' => 'problems'
	));

?>

<p>As opposed to using my standard "problem" template, this is more of
a HOWTO or README set of instructions.</p>

<p><b><font size="+1">Problem:</font></b>
You want to use qmail or netqmail on Gentoo.  (You rock.)  Unfortunately, the
guides out there all seem complex, inaccurate, or just not what you want.</p>

<p><b><font size="+1">Solution:</font></b>  The solution presented will be
brief.  I won't go into how you set up use flags nor dependencies too much.
Feel free to alter my instructions to fit your needs.</p>

<ol>

<li>Remove other MTAs - emerge -C ssmtp sendmail postfix</li>

<li>Tweak your use flags

	<ul>
	<li>fam (courier-imap) - We'll be installing a file alteration monitor (gamin)</li>
	<li>qmail (spamassassin) - We use qmail now
	<li>pyzord (pyzor) - Use a daemon
	<li>spamassassin (qmail-scanner) - Compile in support for Spamassassin
	</ul>

<li>Emerge packages

	<ul>
	<li>netqmail - An updated form of qmail</li>
	<li>relay-ctrl - Allow relaying for authenticated users</li>
	<li>courier-imap - IMAP daemon</li>
	<li>gamin - File alteration monitor</li>
	<li>razor - Spam scanner</li>
	<li>Mail-SPF-Query - For SPF support in Spamassassin</li>
	<li>spamassassin - Spam scanner</li>
	<li>pyzor - Spam scanner</li>
	<li>dcc - Spam scanner</li>
	<li>clamav - Antivirus</li>
	<li>zip, zoo, lha, rar, unrar (optional) - for scanning attachments</li>
	<li>bitdefender-console - Antivirus</li>
	<li>f-prot - Antivirus</li>
	<li>ripmime, tnef - Attachment extractor</li>
	<li>qmail-scanner - Message scanner</li>
	</ul></li>

<li>Configure qmail

	<ul>
	<li>Set up Qmail's certificate.  I already have certificates, so I just copied those in.
		<ul>
		<li>cp rumkin.pem /var/qmail/control/servercert.pem</li>
		<li>chown root:qmail /var/qmail/control/servercert.pem</li>
		<li>chmod 644 /var/qmail/control/servercert.pem</li>
		<li>/etc/init.d/svscan restart</li>
		<li>ebuild /var/db/pkg/mail-mta/netqmail-1.05-r8/netqmail-1.05-r8.ebuild config</li>
		</ul></li>
	<li>Set up common system aliases
		<ul>
		<li>cd /var/qmail/alias/</li>
		<li>echo SOME_ADDRESS > .qmail-root<li>
		<li>for F in postmaster webaster mailer-daemon anonymous; do ln -s .qmail-root .qmail-${F}; done</li>
		<li>chmod 644 .qmail-*</li>
		</ul></li>
	<li>List machines whose email you are allowed to receive - /var/qmail/control/locals
		<ul>
		<li>YOUR_MACHINE'S_HOST_NAME<li>
		<li>localhost</li>
		<li>YOURDOMAIN.com</li>
		<li>YOUR_MACHINE.YOURDOMAIN.com</li>
		<li>localhost.YOURDOMAIN.com</li>
		</ul></li>
	<li>Start at boot - rc-update add svscan default</li>
	<li>Start qmail - /etc/init.d/svscan start</li>
	</ul></li>

<li>Test qmail
	<li>First off, emerge telnet if you don't have it<li>
	<li>Replace the stuff that is underlined in the transcript below</li>
	<li>telnet localhost smtp
		<ul>
		<li>HELO <u>yourdomain.com</u></li>
		<li>MAIL FROM: <u>your.email@yourdomain.com</u></li>
		<li>RCPT TO: <u>your.email@yourdomain.com</u></li>
		<li>DATA</li>
		<li>Subject:  Test message</li>
		<li><u>insert blank line here</u></li>
		<li>.</li>
		<li>QUIT</li>
		</ul></li>
	<li>Check your email for a test message.</li>
	</li>

<li>Install relay-ctrl
	<li>Edit /etc/tcprules.d/tcp.qmail-* and just follow the comments
	<li>Rebuild the tcprules
		<ul>
		<li>cd /etc/tcprules.d</li>
		<li>make</li>
		<li>chmod 644 *.cdb</li>
		</ul></li>
	<li>If you can receive email but can no longer send email, edit your
		tcp.qmail
	<li>Restart qmail - /etc/init.d/svscan restart</li>
	</li>

<li>Install qmail-scanner
	<li>Edit /etc/tcprules.d/tcp.qmail-* and change the allow line</li>
	<li>:allow,QMAILQUEUE="/var/qmail/bin/qmail-scanner-queue"</li>
	<li>Rebuild tcpfules as per "Install relay-ctrl" section</li>
	</li>

</ol>

<p><b><font size="+1">Shortcomings:</font></b>  If you see some problems with
qmail-scanner communicating with clamav, re-emerge perl with the perlsuid use
flag.</p>

<p><b><font size="+1">References:</font></b>

<ol>
<li><a href="http://gentoo-wiki.com/QmailRocksOnGentoo">Qmail Rocks On Gentoo</a> - Informative site and what I tried first, but it did not bounce spam upon receipt.  Instead, the emails were accepted by my server and then I got SpamCop reports about sending unsolicited bounce messages.</li>
</ol>

<?php

StandardFooter();
