---
title: Setting up Qmail on Gentoo
summary: Brief list of instructions necessary to get qmail up and running on an older version of Gentoo.
---

I ran a mail server for a long time.  I also really liked qmail, but setting it up in the past was a pain.


Problem
-------

You want to use qmail or netqmail on Gentoo.  Unfortunately, the guides out there all seem complex, inaccurate, or just not what you want.


Solution
--------

The solution presented will be succinct.  I won't go into how you set up use flags nor dependencies too much.  Feel free to alter my instructions to fit your needs.

1. Remove other MTAs - `emerge -C ssmtp sendmail postfix`
2. Tweak your use flags
    * fam (courier-imap) - We'll be installing a file alteration monitor (gamin)
    * qmail (spamassassin) - We use qmail now
    * pyzord (pyzor) - Use a daemon
    * spamassassin (qmail-scanner) - Compile in support for Spamassassin
3. Emerge packages
    * netqmail - An updated form of qmail
    * relay-ctrl - Allow relaying for authenticated users
    * courier-imap - IMAP daemon
    * gamin - File alteration monitor
    * razor - Spam scanner
    * Mail-SPF-Query - For SPF support in Spamassassin
    * spamassassin - Spam scanner
    * pyzor - Spam scanner
    * dcc - Spam scanner
    * clamav - Antivirus
    * zip, zoo, lha, rar, unrar (optional) - for scanning attachments
    * bitdefender-console - Antivirus
    * f-prot - Antivirus
    * ripmime, tnef - Attachment extractor
    * qmail-scanner - Message scanner
4. Configure qmail
    * Set up Qmail's certificate.  I already have certificates, so I just copied those in.
            cp rumkin.pem /var/qmail/control/servercert.pem
            chown root:qmail /var/qmail/control/servercert.pem
            chmod 644 /var/qmail/control/servercert.pem
            /etc/init.d/svscan restart
            ebuild /var/db/pkg/mail-mta/netqmail-1.05-r8/netqmail-1.05-r8.ebuild config
    * Set up common system aliases
            cd /var/qmail/alias/
            echo SOME_ADDRESS > .qmail-root
            for F in postmaster webaster mailer-daemon anonymous; do ln -s .qmail-root .qmail-${F}; done
            chmod 644 .qmail-*
    * List machines whose email you are allowed to receive - /var/qmail/control/locals
            YOUR_MACHINE'S_HOST_NAME
            localhost
            YOURDOMAIN.com
            YOUR_MACHINE.YOURDOMAIN.com
            localhost.YOURDOMAIN.com
    * Start at boot - `rc-update add svscan default`
    * Start qmail - `/etc/init.d/svscan start`
5. Test qmail
    * First off, `emerge telnet` if you don't have it or use `nc` if you prefer
    * Replace the stuff like _yourdomain.com_ in the transcript below and there is an intentional blank line so be careful
            telnet localhost smtp
            HELO yourdomain.com
            MAIL FROM: your.email@yourdomain.com
            RCPT TO: your.email@yourdomain.com
            DATA
            Subject:  Test message

            .
            QUIT
    * Check your email for a test message.
6. Install relay-ctrl
    * Edit `/etc/tcprules.d/tcp.qmail-*` and just follow the comments
    * Rebuild the tcprules
            cd /etc/tcprules.d
            make
            chmod 644 *.cdb
    * If you can receive email but can no longer send email, edit your tcp.qmail
    * Restart qmail - `/etc/init.d/svscan restart`
7. Install qmail-scanner
    * Edit `/etc/tcprules.d/tcp.qmail-*` and change the allow line
            :allow,QMAILQUEUE="/var/qmail/bin/qmail-scanner-queue"
    * Rebuild tcpfules as per "Install relay-ctrl" section

With luck, problem solved.


Shortcomings
------------

If you see some problems with qmail-scanner communicating with clamav, re-emerge perl with the perlsuid use flag.
