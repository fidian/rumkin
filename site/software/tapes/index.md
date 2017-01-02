---
title: Tape Tools
summary: C programs designed to get data off of tapes from a Linux system.  Especially geared for 3480/3490 tapes.
---

In the June 2002 issue of [Linux Journal](http://linuxjournal.org/">Linux Journal), Craig Johnson asked about [getting data off of tapes](http://www.linuxjournal.com/article/5972).  It is mentioned in his question that there is not a lot of help out there for reading data off of tapes.  Hopefully this will help out those select few who need to do this.

These tools are placed into the public domain.  Do with them what you will.


Preparation
-----------

This is a Linux-centric document.  If you don't run Linux, you may not get
a lot of information out of it.  I used [Debian](http://debian.org/) as my distribution of choice.  My tape readers are at `/dev/st0`.  Yours may vary.


Getting It To Work
------------------

Before you start, make sure you load the right modules for the job.  For my two tape readers, I first load the SCSI card driver (`aic7xxx`) and the SCSI Tape driver (`st`).  See `man insmod` and `man lsmod` for more information.  If you don't have them compiled as modules, you will either need to recompile them as modules or you'll need to just compile them into the kernel.  I like the module idea.

When you boot or when you load the modules, you should see that the tape drive has been located.  If not, try a different driver or a different card.  Make sure you can see it before continuing on.


Testing
-------

I installed the `mt-st` package so I could get the magnetic tools package that is compiled with SCSI Tape support.  I then inserted a tape into the reader and issued `mt eject`.  Well, then I issued `mt -f /dev/st0 eject` and then it worked.  This experiment proves to me that the tape reader is working.


Reading Data
------------

I quickly found out that the tapes that I was using (3480 and 3490 tapes, written by an IBM mainframe of some sort) were not just `tar` dumps.  All of the documentation I found at [Google](https://google.com) was basically useless.  I needed to read the tape data directly.  After days of searching, I found the holy grail of tape reading software, Fermi Tape Tools Library.  Now, it didn't recognize my EBCDIC written tapes, but that's a minor thing to convert.

Fermi Tape Tools Library is available at two places: [http://www.fnal.gov/docs/products/ftt](http://www.fnal.gov/docs/products/ftt) and [ftp://ftp.fnal.gov/pub/ftt](ftp://ftp.fnal.gov/pub/ftt).  In order to compile this library, you also need to get UPS from [ftp://ftp.fnal.gov/pub/ups](ftp://ftp.fnal.gov/pub/ups).  I had only minor troubles compiling the tools, so things should go fairly smoothly if you have experience compiling programs.

Fermi Tape Tools Library has many good features.  It is a C library (fast) that is cross platform (Linux, other Unixes, Windows NT, etc.).  It includes a little documentation on Exabyte drives.  It also works pretty good for me.  I encourage use of the library.


Writing Software
----------------

I found out that the library does not work with EBCDIC labels, so I had to [patch](ftt_patch.txt) the source.  Please note that the patch works with my version: v2.18 Linux+2.  I also had to write software to dump the header, show a structure of the tape, and do other things.  My [old version](tape_tools.tar.gz) has separate programs for each task, and the archive includes the source as well as the statically compiled binaries.  The [new version](tapetool.tar.gz) is all combined into just one program, and you use different command-line options.


Labels
------

If the tape is labeled, scanning the tape will say that there are a few blocks that contain 80 bytes, a tape mark, lots of big blocks of whatever size they want to be, another tape mark, and at least one more block at 80 bytes, then the tape is labeled.  The 80-byte blocks at the beginning and end are the tape header and footer.  You can find out more about tape labels at these fine pages:

* [http://www.loc.gov/marc/specifications/specexchtape1.html](http://www.loc.gov/marc/specifications/specexchtape1.html)
* [http://it-div-ds.web.cern.ch/it-div-ds/HO/labels.html](http://it-div-ds.web.cern.ch/it-div-ds/HO/labels.html)


More Help
---------

Beyond what I wrote in this web page, I am not a good source of information.  FTT comes with pretty good documentation, and the source for the simplistic tools that I wrote should get you off to a good start.  Perhaps you can find more help at [http://pcunix.com/Unixart/tapes.html](http://pcunix.com/Unixart/tapes.html).
