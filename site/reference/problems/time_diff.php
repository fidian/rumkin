<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'Windows Domain Time Issues',
		'topic' => 'problems'
	));

?>

<p><b><font size="+1">Symptom:</font></b>  When logging into a computer that
is on a domain, or if you try to access a computer that is on a domain, you
get one of the following error messages:</p>

<?php MakeBoxTop('center'); ?>

<tt>There is a time difference between the client and server.</tt>

<?php MakeBoxBottom(); ?>

<p><b><font size="+1">Causes:</font></b>  The clock on the machine that you
are trying to log into is reporting a different time from what the domain
controller has.</p>

<p><b><font size="+1">Solution:</font></b>  You need to synchronize your
clocks.  For the following examples, replace %DOMAIN% with your domain
name and %WORKSTATION% with the name of any computer on the domain.
%USERNAME% refers to your network logon user id.</p>

<ol>
<li>Log in as a local administrator.  If you don't have access to a local
administrator account, you can try the following:
  <ul>
  <li>Unplug the network cable and try to login as you normally would.  The
  client likely has your credentials cached.
  <li>You can download the <a href="home.eunet.no/pnordahl/ntpasswd/">Offline
  NT Password &amp; Registry Editor</a> floppy or CD image and use it to
  blank the admin password.
  </ul>
<li>Obtain a command shell with one of these methods:
  <ul>
  <li>Start &rarr; Run &rarr; command
  <li>Start &rarr; Run &rarr; cmd
  </ul>
<li>Sync the time with this command: <tt>net time /domain:%DOMAIN% /set</tt>
  <ul>
  <li>If that does not work, open a remote computer by <tt>start
  \\%WORKSTATION%</tt>
  <li>Log in with the username %DOMAIN%\%USERNAME% and your domain password.
  <li>Go back to the command prompt and type in <tt>net time \\%WORKSTATION%
  /set</tt>
<li>Type in <tt>exit</tt> to leave the command shell.
<li>At this point, your time will be synchronized with the domain.  Log out
and try to log into the domain normall again.
</ol>

<p><b><font size="+1">References:</font></b></p>

<ol>
<li><a href="http://support.microsoft.com/?kbid=232386">Microsoft Knowledge
Base</a> article that uses "<tt>net time</tt>" to fix the problem.
<li><a href="http://support.microsoft.com/default.aspx?kbid=297234">Microsoft
Help and Support</a> page that illustrates how to use regedit to fix a very
similar problem.
</ol>

<?php

StandardFooter();
