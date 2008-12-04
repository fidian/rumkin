<?php


// -*- text -*-
include './functions.inc';
AquaStart('My Progress');

?>

<p>In working with the AquaPad, I notieced that the hardware is pretty
good, but the software sucks.  It is also a pain in the butt to upgrade
properly, since FIC has essentially washed their hands of the product.
In order to use it, I have decided to put out my own distribution of
Linux and some bundled software so I can have a working machine.  Also,
I am going to host it here so that others can benefit from the work
Ido.</p>

<p>Want to help?  Let me get a booting base first, then I'd love to get any
assistance that anyone would be willing to offer.</p>

<ul>
<li><a href="#goals">Goals</a></li>
<li><a href="#status">Current Status</a></li>
<li><a href="#info">Useful Information</a></li>
<li><a href="#history">History</a></li>
</ul>


<?php Section('Goals', 'goals'); ?>

<ul>
<li>Upgrade to Linux 2.6.x
<li>Build everything from source so that I can ensure optimum speed, and
maybe upgrades will be nice and painless as well
<li>uClibc (that would be very nice, but it's a VERY difficult goal)
<li>Have a shell that is actually useful
<li>Install a newer icewm or another window manager (matchbox?)
<li>Change the partition system around (yaffs/yaffs2/jffs2 for config?, 
cloop for root?)
<li>Upgrade mozilla to firefox
<li>Better handwriting recognition
<li>Speech synthesis (at least see if it is a good idea)
<li>Touchscreen drivers (might be the hardest part of them all)
<li>Better USB hotplug support
<li>ssh and other useful network tools
<li>If I get really creative, perhaps <a href="http://linuxbios.org">Linux
BIOS</a> could speed things up even more!
<li>I know that this isn't exactly what I want to do, but it might be fun to
play with <a href="http://www.nu2.nu/pebuilder/">BartPE</a> and see if I can
get some version of Windows to work.
</ul>


<?php Section('Current Status', 'status'); ?>

<p>I installed Gentoo to the microdrive and compiled enough to get it to
boot.  I need to test my new kernel line (added <tt>noapic</tt>) and
install/upgrade several packages.  Once that boots, I'll be on my way to
X.org.</p>


<?php Section('Useful Information', 'info'); ?>

<p>The <a href="http://linuxfromscratch.org">Linux from Scratch</a> 
cookbook with a few pointers from the <a
href="http://linux.bytesex.org/cross-compiler.html">Cross Compiler Mini
HOWTO</a>, you can build your own distribution.  Also, you might want
to take a hard look at <a
href="http://linuxassembly.org/asmutils.html">asmutils</a>.</p>

<p>My Midori card has executables that were compiled with
<tt>--target=i386-pc-linux-gnu</tt>.  The Linux kernel uses
<tt>-mcpu=crusoe</tt> and if that is not supported, it uses <tt>-mcpu=i686
-falign-functions=0 -falign-jumps=0 -falign-loops=0</tt>.  When I specify
the CFLAGS for Gentoo, I also add <tt>-Os -pipe -fomit-frame-pointer</tt>
and I change <tt>-mcpu=i686</tt> to <tt>-march=i686</tt> which would mean
that the code won't run on non-i686 machines, but that's fine for me since I
am compiling things on my i686 desktop machine or on my tablet.</p>


<?php Section('History', 'history'); ?>

<dl>

<dt><b>2006-02-27</b>

<dd>I have a nearly-working install of Gentoo.

<dt><b>2006-02-23</b>

<dd>Received 8 gig CF microdrive.  It's pretty.

<dt><b>2006-02-17</b>

<dd>Ordered an 8 gig CF card from eBay.  Now I will just recompile
everything for the tablet on the tablet.  I will likely start with Gentoo
and see what happens.  I will also be releasing a bootable CF image with
FreeDOS so you can flash your bios easier.

<dt><b>2005-01-29</b>

<dd>I've started looking at crosstool.sh to set up my initial build
environment.  I've tried to merge crosstool.sh and the Linux From Scratch
cookbook, and I've gotten very close (only waiting for the compiles to
finish).  binutils, first pass gcc, and glibc all build just fine.  Waiting
for the second pass gcc.  If I ever figure out how to do this, I'm going to
add it to this web site.  It's a royal pain, but crosstool.sh and LFS have
helped tremendously.

<dt><b>2005-01-25</b>

<dd>Compiling glibc before gcc...  Gcc doesn't want to compile first;
probably due to me specifying --target, thus creating a cross-compiler.

<dt><b>2005-01-23</b>

<dd>Binutils compiled fine (first pass).

<dt><b>2005-01-22</b>

<dd>I've started over.  In the meantime, if people
wanted to get things working like I used to have, there are a few links I've
collected.  At this point, I have uClibc (development system with gcc and
binutils), Linux 2.6.5, Busybox 1.00 pre-9, and LILO 22.5.9 (pre-compiled).

<dd>With all of the distributions out there, I should be content to just
install Debian or something on the tablet.  I'm not.  I want the latest,
greatest, and most optimized for my tiny processor and 128M RAM.

<ul>
<li><?php echo l('http://www.lugatgt.org/articles/smallfootprint/', 'Linux on small footprints') ?>
<li><?php echo l('http://linuxgazette.net/102/piszcz.html', 'Filesystem comparison') ?>
<li>Hints how to get 
<?php echo l('http://linuxfromscratch.org/pipermail/hints/2004-March/002408.html', '2.6.x kernels running with udev and sysfs.') ?>
</ul>

<dt><b>2004-08-01</b>

<dd>I took a distribution based off of <a
href="http://knoppix.net/">Knoppix</a> and put it on a CompactFlash card
with <a href="knoppix.php">these easy steps</a>.  With it, I was able to use
a USB keyboard and mouse, but not the audio and not the touch screen.  In
fact, when I touched the volume up/down buttons, the computer crashed.</dd>

<dt><B>2004-07-18</b>

<dd>Even with just the most basic system on the tablet, I still am using 83
megs of space on the CF.  That will go down when I prune away modules that
are unlikely to be ever used &ndash; about 74 megs is just modules.  It
also could easily get smaller if I use cramfs, cloop, or one of a dozen
other compressed filesystems.  Did I mention that it boots and automatically
loads drivers for stuff that you stick in (like keyboards)?  I'm so happy.
</dd>

<dt><b>2004-07-17</b>

<dd>Got udev set up finally.  I feel like such a moron.  At least things are
now going a tiny bet better for me.  Hotplug and module dependencies were
also equally silly once I figured out the thing I was doing wrong.</dd>

<dt><b>2004-07-03</b>

<dd>Since I really have nothing to do this weekend, because I strongly want
this project complete, I'm devoting the day to it.</dd>

<dt><b>2004-07-02</b>

<dd>Giving it another go.  Started installing udev.</dd>

<dt><b>2004-04-26</b>

<dd>Hotplug doesn't wanna work for me still.  No love.  I do have a shell
though.</dd>

<dt><b>2004-04-17</b>

<dd>Minor tweaks.</dd>

<dt><b>2004-04-16</b>

<dd>Working on some init stuff, which modules to load, and tweaking the
kernel.  I really need hotplug so I can get a keyboard running when I plug
one in.</dd>

<dt><b>2004-04-15</b>
<dd>Got it to boot.  Built some installation scripts to make things easier.
Life is good.  Need to remove PS/2 support from the kernel and do other
optimizations for size.  Need to get /etc/init.d/rcS script for system
initialization.  Need to remove files in /dev to only the ones that I need.
After that, I hope to get hotplug going so I can use my keyboard.  Then X
and finally I shall conquer the world!</dd>

<dt><b>2004-04-13</b>
<dd>In the 45 minutes I spent on the project today, I created an install
script to quickly get packages installed, and I downloaded and compiled
modutils.  Just need to write a lilo.conf and get lilo installed on the CF
card.  Hopefully I will have a bootable linux version after that.  I still
need a ton of stuff, but if it boots, then I have the major hurdle taken
care of.</dd>

<dt><b>2004-04-12</b>
<dd>The kernel compiles, things are rolling smoothly.  Just figured out that
I need to install modutils.</dd>

<dt><b>2004-04-11</b>
<dd>Gave up compiling gcc with uClibc.  Binutils worked like a charm.
Switched to use the uClibc development environment.  Thank goodness I'm on
an i386-compatible system and I'm compiling for an i386-compatible system.
Got the kernel compiled, busybox compiled, and working on making a bootable
image.  Supposedly, once it boots and gets to a shell, everything is 
downhill.</dd>

<dt><b>2004-04-03</b>
<dd>Still no luck.  I've downloaded the root fs image from uClibc, which
contains everything I need to build ... supposedly.  The image is 70+ megs,
meaning it is WAY too big for the trimmed down Aquapad image that I want,
but it might get me going.

<dt><b>2004-02-28</b>
<dd>Wiped out what I did so far.  Recompiled binutils (a snap).  Finally got
uClibc working (had to specify Generic i386 as processor instead of Crusoe).
Now I should just tweak the config file to get the libs and include files
installed in the right spot and I'll be off, working on gcc!

<dt><b>2004-02-27</b>
<dd>Been really sick.  Getting better.  Trying from scratch -- I think more
research is in order.  Wiping out current stuff, recompiling binutils (easy).

<dt><b>2004-02-19</b>
<dd>Trying again, using the includes and libraries from the current install,
which might just work.  We'll see.

<dt><b>2004-02-18</b>
<dd>Still trying to compile gcc 3.3.3

<dt><b>2004-02-15</b>
<dd>Compiling gcc 3.3.3

<dt><b>2004-02-06</b>
<dd>Compiled the cross-compiling binutils 2.14.</dd>

<dt><b>2004-02-01</b>
<dd>Installed Linux on a new machine that I will be dedicating for the
project.  Debian, testing.</dd>

</dl>

<?php

AquaStop();
