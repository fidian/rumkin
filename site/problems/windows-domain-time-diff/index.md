---
title: Windows Domain Time Issues
summary: Solving the login error, `There is a time difference between the client and server`.
---

While working on a Windows Domain, there were some computers that didn't behave well.  In particular, they didn't keep their time correctly.  When I attempted to log in with my domain credentials, a message would show up and I would not be allowed access.  This particular problem makes it very hard to log into a computer and fix the problem.


Symptoms
--------

When logging into a computer that is on a domain, or if you try to access a computer that is on a domain, you get one of the following error messages:

    There is a time difference between the client and server.


Causes
------

The clock on the machine that you are trying to log into is reporting a different time from what the domain controller has.


Solution
--------

You need to synchronize your clocks.  For the following examples, replace `%DOMAIN%` with your domain name and `%WORKSTATION%` with the name of any computer on the domain.  `%USERNAME%` refers to your network logon user id.

* Log in as a local administrator.  If you don't have access to a local administrator account, you can try the following:
  * Unplug the network cable and try to login as you normally would.  The client likely has your credentials cached.
  * You can download the [Offline NT Password & Registry Editor](http://home.eunet.no/pnordahl/ntpasswd/) floppy or CD image and use it to blank the admin password.
* Obtain a command shell with one of these methods:
  * Start -> Run -> `command`
  * Start -> Run -> `cmd`
* Sync the time with this command: `net time /domain:%DOMAIN% /set`
  * If that does not work, open a remote computer by `start \\%WORKSTATION%`
  * Log in with the username `%DOMAIN%\%USERNAME%` and your domain password.
  * Go back to the command prompt and type in `net time \\%WORKSTATION% /set`
* Type in `exit` to leave the command shell.
* At this point, your time will be synchronized with the domain.  Log out and try to log into the domain normally again.

Problem solved.


References
----------

* [Microsoft Knowledge Base](http://support.microsoft.com/?kbid=232386) - article that uses `net time` to fix the problem.
* [Microsoft Help and Support](http://support.microsoft.com/default.aspx?kbid=297234) - page that illustrates how to use regedit to fix a very similar problem.
