---
title: Linux on Averatec 6200
summary: Notes about getting this laptop to boot Linux and resolve some of the hardware issues.
---

I had purchased an Averatec 6200 series laptop.  The very first thing I did when I received it was to stick in a Linux boot CD and attempt to wipe off Windows.  Sadly, it had a problem during booting.


Symptoms
--------

* Linux just does not want to boot or run on an Averatec 6200 series laptop.
* There are also problems sometimes when the lid is closed.


Causes
------

* Broken APCI.


Solution
--------

Add `noapic nolapic` to your kernel boot parameters.  You can also add `vga=771` for the right text mode.

Problem solved.


Shortcomings
------------

Ubuntu also seems to have problems with 8.04 Hardy Heron.  In order to install Ubuntu 8.04, you will need to use the alternate boot cd.  Once that is done, you will need to edit /etc/default/acpi-support and change `SAVE_VBA_STATE=true` to `SAVE_VBA_STATE=false` before the system will boot properly.  The good news is that the rt2x00 drivers work great with the wireless, sound is flawless, and everything else just works.

The hardware doesn't support a 3D accelerated X server, so don't go trying to find something that will speed up your graphics-intensive screensaver.


Additional Information
----------------------

The Linux kernel has a problem with ACPI producing continuous lid events when the laptop is closed and with a 2.6.1x kernel (possibly others).  If you are compiling Linux yourself, edit drivers/acpi/button.c, line 77.  Just remove the PNP0C0D, save, compile.

To get sound to work, you may need to edit /etc/modules.d/alsa.  Also look at removing the audio plugin (`rmmod i810_audio`) and then `/etc/init.d/alsasound start` to make it all work well.

In the kernel config, the IDE controller is sIs5513.  If you use Gentoo, add `USE=-ipv6` to your make.conf and add `blacklist ipv6` to /etc/modprobe.d/blacklist, and turn off IPV6 in the kernel config (Networking -> TCP/IP networking -> The IPv6 protocol).  With IPv6 turned off, more things (like the networking) will work better.  This might have been fixed since the Linux kernel that I tried.

The keyboard scan codes are Vol- 174, Vol+ 176, Stop/Eject 164, Rew 144, Play/Pause 162, Fwd 153, Menu 237, On/Off (no code).  You can copy the text below and put it into ~/.Xmodmap, then add `/usr/bin/xmodmap ~/.Xmodmap &` and `/usr/bin/xbindkeys &` to your X startup file (IceWM is `.icewm/startup`).

    keycode 174 = XF86AudioLowerVolume
    keycode 176 = XF86AudioRaiseVolume
    keycode 164 = XF86AudioStop
    keycode 144 = XF86AudioPrev
    keycode 162 = XF86AudioPlay
    keycode 153 = XF86AudioNext
    keycode 237 = F22


References
----------

* [Averatec 6200 laptop deconstruction](http://fatpenguinblog.com/scott-rippee/averatec-6200-laptop-deconstruction/)
* [Continuous ACPI lid events and 100% cpu usage](http://mindspill.net/computing/linux-notes/acpi/continuous-acpi-lid-events-and-100-cpu-usage.html)
* [Ubuntu Help: Web Browsing Slow](https://help.ubuntu.com/community/WebBrowsingSlowIPv6IPv4)
* [Gentoo on the Averatec 6800 series](http://forums.gentoo.org/viewtopic-p-2645680.html)
