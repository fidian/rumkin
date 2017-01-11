---
title: SSH Applet
template: index.jade
---

Here is a quick and easy SSH client that only requires that your browser supports Java.  There is no archive file to download nor software to install.  Enjoy!  It may prompt you for a signature for "3SP LTD" who are the creators of this nifty program.  I'd suggest accepting the certificate if you want to use SSH.

<applet width="640" height="480" archive="SSHTermApplet-signed.jar,SSHTermApplet-jdkbug-workaround-signed.jar" code="com.sshtools.sshterm.SshTermApplet" codebase=".">
	<param name="sshapps.connection.authenticatonMethodi" value="password" />
	<param name="sshapps.connection.showConnectionDialogi" value="true" />
	<param name="sshapps.connection.disableHostKeyVerificationi" value="true" />
</applet>

From what I am able to gather, this applet is based on [SSHTools](http://sourceforge.net/projects/sshtools/) (also known as J2SSH).  If you would like to put this applet on your website, download [SSHTerm-0.2.2-applet-signed.zip](SSHTerm-0.2.2-applet-signed.zip).
