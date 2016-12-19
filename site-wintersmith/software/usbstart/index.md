----
title: USBStart
template: index.jade
----

USBStart is designed to run with Windows XP SP2's autorun.  It also works well with [APO USB Autorun](http://www.archidune.com/apo/), which is a free program that will add the autorun functionality to any earlier version of Windows that supports flash drives (Windows 98 and up).


Description
===========

USBStart will run a program when it starts, then unmount the flash drive when that program finishes.  I use it to run [Floater](/software/floater/), which is a menu for the programs I keep on my flash drive.  When I close Floater, USBStart will copy an unmounting program and a little copy of itself to a temp directory on the host computer.  USBStart will close and the little copy will run, which will attempt to dismount the drive and then all temporary files are deleted.

Basically, once you have autorun enabled (or APO USB Autorun) and your flash drive set up properly, you need to just stick in your jump drive and the menu will start.  Run programs and do your thing, and finally close the menu to dismount the flash drive.  It couldn't be much simpler.


Setup
=====

Here are the suggested steps to get your flash drive working like mine.

1. Download and extract [usbstart.zip](usbstart.zip).
2. Create a directory on your flash drive called `Utils`.
3. Copy `deveject.exe`, `USBStart.exe` and `USBStart.ini` (in the `usbstart.zip` file) to the `Utils` folder.
4. Copy [Floater](/software/floater/) (just the .exe file) to your `Utils` directory (use Floater-txt).
5. Set up `Floater.txt` so that when you run Floater, it will show you an acceptable menu.
6. Set up an `autorun.ini` file in the root directory of your flash drive.  Instructions on this listed below, or you can use the APO Autorun Builder, which comes as part of the [APO Autorun Suite](http://www.archidune.com/apo/).

At this point, you should be able to dismount the drive, then reinsert it and have the autorun start up the floating menu.  When you close the menu, the flash drive should be dismounted automatically and you can remove it safely from the computer.


`autorun.inf`
=============

Right-click and create a new text file on your flash drive.  Name it `autorun.inf`.  Make sure that you have file extensions turned on; that way you won't accidentally create an `autorun.inf.txt` file and wonder what is wrong for the longest time.

In that file, add these lines:

    [autorun]
    open=Utils\USBStart.exe
    action=Open Floating Menu

    shell\Floating Menu=Floating Menu
    shell\Floating Menu\command=USBStart.exe

There are other things you can add to this file, but the lines above will be enough to get it to work.


Download
========

* [usbstart.zip](usbstart.zip) - The program, deveject (with .cpp source), and [NSIS](http://nsis.sourceforge.net/) source to USBStart.
