---
title: Uninstalling CSNW
summary: Fixing the `Cannot load VDM IPX/SPX support` message in DOS shells.  It occurs because of Novell's drivers.
---

I worked at a company that used a Novell server.  I also used DOS quite a bit.  Whenever I created a DOS shell, I got a funny error message.  One day I decided to remove that message but had a hard time figuring out what was causing it.


Symptoms
--------

* When you open a DOS shell or if you run some programs in the DOS shell, you will get an error:  `Cannot load VDM IPX/SPX support`


Causes
------

On Windows 2000 (maybe Windows XP and others), when you install CSNW and Novell's Netware client, it adds extra stuff to your autoexec.nt file.  When you uninstall the client, it leaves a few turds around on your system (don't they all?) that could cause problems.


Solution
--------

Edit your %SystemRoot%\system32\autoexec.nt file and delete three lines.

* Double-click on my computer
* Double-click on C:
* Look for "WINNT" or "WINDOWS".  Remember which one you saw.
* Start -> Run
* Type in `notepad c:\winnt\system32\autoexec.nt` or `notepad c:\windows\system32\autoexec.nt` depending on if you saw WINDOWS or WINNT.
* Look for these lines:
        REM Install network redirector
        lh %SystemRoot%\system32\nw16
        lh %SystemRoot%\system32\vwipxspx
* Delete those three lines, and only those three lines.
* File -> Save
* Close Notepad -- You are done!

Problem solved.
