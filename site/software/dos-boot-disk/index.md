---
title: DOS Boot Disk
summary: Copies of my old 1.44 MiB floppy disk image that I used to save so many different systems.
---

I remember the days of DOS and the limitations that came with it. You had to deal with high memory, load CDROM drivers, and were limited to very short filenames.

During this time I had helped many people with problems on their computers. I also had to fix my own computer lots of times, so I started building the most useful DOS boot disk that I could manage. It's tough to do that because the amount of space available on the floppy disk is extremely limited. To counter that problem, I experimented with using a ramdisk and decompressing utilities into memory there. Oh boy, those were MUCH faster once loaded into memory, plus I could compress them on disk and get almost double the amount of tools! The compressed archive initially started as a ZIP file, switched to RAR later, and finally I settled on TGZ because I adapted a truly minimal tool to [untgz](../untgz/) and decompress the file.

Totally worth it.

After that, this image became my El Torito boot image on several versions of my recovery tools CD.

What's Included
---------------

* Windows 95's `COMMAND.COM` and `IO.SYS`, which supports long filenames and isn't too large. If you ever felt the pain involved with making sure these files are in the right sectors of the floppy, never fear. That's been handled.
* `CONFIG.SYS` sets up larger defaults and loads both `HIMEM.SYS` and `EMM386.SYS`. Both of those are from FreeDOS because they work better. I believe they are compressed, but not with `UPX`.
* `AUTOEXEC.BAT` does a number of tasks.
    * Loads a 4MiB ramdisk using `XMSDSK` 1.9I from Franck Uberto (`UPX` compressed) as `Z:` into high memory.
    * Sets up some folders and copies `COMMAND.COM` to high memory for performance.
    * Decompresses the ramdisk to `Z:` using [`untgz`](../untgz/) (a tool I adapted). The ramdisk now has a BUNCH of tools and will be detailed below.
    * Using `DRVLOAD.COM` 1.0 from Rick Knoblaugh (`UPX` compressed) to load into high memory, `NANSI.SYS` 4.0a from [Daniel Kegel](http://www.kegel.com/nansi/) is included to get ANSI support.
    * Asks the user if they want to load CD drivers, skip loading them, or jump to quick formatting.
    * If quick formatting is desired, this basically skips everything else and will run `Z:\DOSTOOLS\QUICKFMT.BAT`.
    * Attempts to load *several* CD-ROM drivers in a way where a better driver is tried before more sketchy ones. They are loaded into high memory with `DRVLOAD.COM`.
    * If a CD-ROM is detected, it looks for `RESCUECD.TXT` on the CD and will run `\boot\add_path.bat` on the CD to include even more utilities. This is because using a CD-ROM was a lot more convenient than a floppy.
    * Loads `RECALL.COM` for a command history.
    * Loads `CTMOUSE.COM` for a mouse driver, including some copy and paste if I remember correctly.
    * Loads `PERUSE.COM` for a scrollback buffer.
    * If a CD-ROM was detected, loads `HXLDR32.COM` from the rescue CD for 32-bit handling for 32-bit Windows programs that are on the rescue CD image.
    * Speeds up the keyboard repeat rate.

What Else Is Included?
----------------------

Oh boy.

* `ANSI` - Contains an ANSI reference document plus colorful texts that are used by the boot process or the quick formatting batch file.
* `CDROM` - CD-ROM drivers. I never had them all fail when the CD-ROM in the computer was working.
* `DOS` - Utilities from Windows 95's version of DOS.
    * `CHKDSK.EXE`, `FORMAT.COM`, `MODE.COM`, `MORE.COM`, `MOVE.EXE` - Straight from Windows 95.
    * `SCANDISK.EXE` - `PKLITE` compressed, unsure of origin
    * `SYS_REAL.COM` - Windows 95's `SYS.COM` renamed so invoking `SYS C:` works. (See the batch file in `DOSTOOLS`.)
* `DOSTOOLS` - Utilities from elsewhere.
    * `ADD2PATH.BAT` - Adds another folder to the path. Easier than remembering environment variables.
    * `ATTR.COM` - More powerful version of DOS's tool. Written by Charles Petzold.
    * `CHOIX.COM` - Prompt the user and supplies result as an errorlevel, by Horst Schaeffer.
    * `CTMOUSE.COM` - Mouse driver. No information on where I found it.
    * `DELTREE.COM` - Delete entire directories. Freeware from Charles Dye.
    * `DERASE.EXE` - Undelete files in a directory, from Walter Bright. `UPX` compressed.
    * `DM.COM` - Directory Master, a user interface for navigating and managing files that is similar to Norton Commander. `UPX` compressed.
    * `DRVLOAD.COM` - Load files into high memory after `CONFIG.SYS` has finished, version 1.0 from Rick Knoblaugh. `UPX` compressed.
    * `EDIT.BAT` - Simply runs `NED` for people who are used to using the `EDIT` command.
    * `FDISK.EXE` - Check disk for errors from FreeDOS.
    * `FINDCD.COM` - Determines if the CD-ROM was found, freeware, version 1.2 from [Bart Lagerweij](http://www.nu2.nu/contact/bart).
    * `NANSI.SYS` - New ANSI driver, version 4.0a from [Daniel Kegel](http://www.kegel.com/nansi/).
    * `NC.BAT` - Simply runs `DM` for people who are used to running Norton Commander.
    * `NED.EXE` - Very small editor. Unsure where it was found. `UPX` compressed.
    * `NO.COM` - Great way to exclude files, such as `NO *.PDF DEL *.*`. Written by Charles Petzold.
    * `NTFSDOS.EXE` - Mount NTFS filesystems under DOS, from [Winternals Software](http://www.winternals.com).
    * `PERUSE.COM` - Screen scrollback buffer, from Bob Flanders and Michael Holmes, version 1.00.
    * `QUICKFMT.BAT` - Tool to format your computer and wipe all files from it. Uses files in `ANSI` for screen prompts. Pretty easy to use.
    * `RECALL.COM` - Command history, from TifaWARE, version 1.2c. `UPX` compressed.
    * `SEND.COM` - Echo replacement, with improvements.
    * `SHCDX32C.COM` - MSCDEX CD driver replacement. `UPX` compressed.
    * `SWEEP.COM` - Run a command across multiple directories.
    * `SYS.BAT` - Calls `SYS_REAL` and defaults `A:` as the first parameter if you only specify the destination drive.
    * `UNZIP.EXE` - Info-ZIP's utility to extract compressed ZIP files. `UPX` compressed.
    * `WIPE.EXE` - Repeatedly overwrites a file with random data. `UPX` compressed.
    * `XCOPY.EXE` - FreeDOS's version of `XCOPY`, which is an improved and powerful `COPY`. `UPX` compressed.
    * `ZAPIT.EXE` - FreeDOS disk or file hex editor.
    * `ZIP.EXE` - Create compressed ZIP files. Unsure of origin.


Downloads
---------

First, the magical DOS boot disk. These are all disk images that should be written using a tool - not just copying the file to the floppy drive.

* [dos-boot.zip](dos-boot.zip) - DOS bootable floppy, packed with useful tools and uses a ramdisk.
* [dos-old2.zip](dos-old2.zip) - Slightly older version that still uses a ramdisk.
* [dos-old.zip](dos-old.zip) - Last version before I started using a ramdisk.

Other assorted goodies.

* [rawrite.zip](rawrite.zip) - Utilities to write an image file to a floppy disk. Also included is `raread` to read a floppy disk image. After I discovered Linux, I switched from this tool to using `dd`, but the end result is the same.
* [bcdl.zip](bcdl.zip) - Boot floppy disk image that allows a computer to boot from the CD-ROM when the BIOS doesn't support it. ([Original source](http://bootcd.narod.ru/bcdl.htm))a
* [dban.zip](dban.zip) - Darik's Boot and Nuke floppy disk image. This one is quite old but still fits on a floppy.
