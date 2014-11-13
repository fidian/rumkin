----
title: BURP
template: index.jade
----

While searching for a good file encryption utility, I decided that I wanted one that was open source, cross-platform, and easy to use.  I wanted versions that would run on Linux, DOS, and Windows (Win32).  [BURP](http://www.geodyssey.com/cryptography/cryptography.html) fits the bill perfectly.  It stands for Blowfish Updated Re-entrant Project.  

The only problem was that there was no GUI for Windows.  Not a problem!  I quickly designed one in [AutoIt](http://www.autoitscript.com/), which is a wonderful scripting language.  Now there is BURP-GUI.  I also packed the BURP executables listed below with UPX to make them smaller, which is perfect for keeping them on my rescue CD and on flash drives.


Requirements
============

BURP-GUI needs a 32-bit Windows OS.  This includes Windows 94, 98, NT, 2000, ME, XP, or later.

Your temporary directory for Windows needs to be properly set.  BURP-GUI extracts BURP32.EXE to the temporary directory and runs it from there so you can include BURP-GUI on a CD or other read-only medium.  Output is captured to a temporary text file, read in by the GUI, and both files are removed from the filesystem.


Warnings
========

Your password could be cached in swap, held in the registry, and other assorted things.  This is just a front-end to a DOS command-line utility, so who really knows for certain where your password ends up.  However, it shouldn't swap unless you are low on available memory and it shouldn't stick it into the registry and cache your password (at least in my tests).

If you don't use the same password for decrypting as you did for encrypting, you will end up with a file full of garbage.  There are no special headers that BURP uses to make sure that everything went well.  BURP will say that the operation was successful and you'll end up with random-looking data.


Compiling
=========

To compile BURP-GUI, you will need a file named BURP32.EXE.  You can use the original BURP32.EXE or my UPX-compressed BURP32.EXE.  Just stick it in the same directory as BURP-GUI.AU3 before you run/compile the code.


License
=======

I place BURP-GUI in the public domain, just like how BURP was licensed.  The software comes with no warranty, so only execute it if you plan to take responsibility for all risks.  I suggest that if you are really cautious that you should read the source code and compile it yourself so that you can feel safer.


Download / Links
================

You should also check out the [official site](http://www.geodyssey.com/cryptography/cryptography.html) for news and updates to BURP.  You should get the freeware scripting language, [AutoIt](http://www.autoitscript.com/), if you want to recompile the GUI.

* [burp-gui.exe](burp-gui.exe) - Windows GUI (everything you need to use it)
* [burp-gui.zip](burp-gui.zip) - Windows GUI and the AutoIt 3 source code
* [burp.exe](burp.exe) - DOS executable, UPX compressed
* [burp32.exe](burp32.exe) - DOS/Win32 console executable, UPX compressed
* [burp](burp) - Linux executable, UPX compressed
* [burp120.zip](burp120.zip) - Mirror of the original BURP 1.20 archive


Changes
=======

* 2004-06-30 (1.1) - Removed 16-bit version (Windows 3.1) because AutoIt doesn't run on 16-bit systems.  Added additional features as suggested by BURP's author.

* 2004-06-27</b> (1.0) - Initial version.
