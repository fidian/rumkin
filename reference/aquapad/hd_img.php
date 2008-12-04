<?php

include './functions.inc';
AquaStart('Hard Drive Images');

?>

<ul>
<li><a href="#linux">Linux Instructions</a></li>
<li><a href="#windows">Windows 98 Instructions</a></li>
<li><a href="#other_os">Other Operating Systems</a></li>
<li><a href="#get">Getting Images From The Aquapad</a></li>
<li><a href="#make_image">Make Your Own Image Under Linux</a></li>
</ul>

<p>Creating a DOS hard drive under Linux is annoying at times.  Formatting
the flash on the Aquapad would be tons easier if it had a CD-ROM or maybe
even just a floppy.  As it is, you need to rip out your flash and stick it
in another card reader to begin the process.</p>

<p>Even the people who are doing this upgrading under Windows might want
some assistance, and so I have collected my experiences here.</p>

<p>Using FreeDOS should work, but I haven't been able to spend enough time
to do so, so I just gave up and decided to use a M$ boot disk I had handy.</p>

<?php Section('Linux Instructions', 'linux'); ?>

<p>We will make a hard drive image on the computer and then copy it to the
CompactFlash.  This is due to the lack of drivers for DOS to read/write
CompactFlash drives.</p>

<ol>
<li>Find a Compact Flash card that doesn't contain any vital information --
it will be erased soon.</li>
<li>You have two routes &ndash; either download and extract a bootable hard
drive image or make one yourself with the instructions <?php echo l('#make_image', 'below') ?>.
   <ul>
   <li><?php echo l('media/blank.hd0.gz', 'Bare MS-DOS Bootable HD Image') ?> -
      4M uncompressed, 230k compressed
   <li><?php echo l('media/freedos.img.bz2', 'FreeDOS Image') ?> -
      10M uncompressed, 1.6M compressed
   </ul>
<li>Copy the hard drive image to the CompactFlash (/dev/sda is the address
of my CompactFlash reader; yours might differ):
   <blockquote>
   <tt>dd if=blank.hd0 of=/dev/sda</tt><br>
   <tt>sync</tt>
   </blockquote>
<p>Insert the CompactFlash into the Aquapad and plug in a USB keyboard.
Boot into the BIOS (press Page Up &ndash; ignore the message that says to
press Del).  Use the automatic configuration to identify the second hard
drive, then set the tablet up to boot from the second hard drive.</li>
<li>Reboot and you should boot to a command prompt.  If not, you could have
a dozen problems.  Your image could be wrong/corrupt, the CompactFlash could
be misidentified or have a different number of heads/tracks/cylinders.  Or,
what frustrated me to no end, you might not have identified the CompactFlash
before saying to boot to the second drive.
<li>At this point, you merely need to <tt>mount</tt> the CompactFlash card
and copy over whatever files are required for the BIOS update.  They should
run by themselves when you power on the Aquapad.
</ol>

<p>Also, if you want further information about how to create and mount the
hard drive image under Linux, make sure to check the <a
href="http://www.mega-tokyo.com/osfaq2/index.php/Disk%20Images%20Under%20Linux">Disk
Images Under Linux</a> page.</p>

<?php Section('Windows 98 Instructions', 'windows'); ?>

<p>This is a bit easier because you aren't trying to install a foreign OS
under another OS.</p>

<ul>
<li>Stick the CompactFlash card in the reader.  It should show up as a drive
on your computer.  Mine shows up as J:, so I'll use that in my examples.
<li>Go to DOS by clicking on Start, Run.  Type in <tt>command</tt> to get
a DOS shell.
<li>Wipe off the CompactFlash and make it bootable with this command.  If
your CompactFlash is 1 gig or bigger, I might suggest using
<tt>/FS:FAT32</tt> instead of <tt>/FS:FAT</tt> (try FAT first, just in case
you <b>need</b> to use that one).
   <blockquote>
   <tt>format J: /FS:FAT /V:BLANK /Q /S</tt>
   </blockquote>
<li>To copy files in, just stick it in your CF reader and treat it like a
normal disk.
</ul>

<?php Section('Other Operating Systems', 'other_os'); ?>

<p>You're probably stuck.  Windows 2000 (and NT, if I recall) and foreward
don't have the "sys" command and don't let you specify "/s" to format.
Possible options include:</p>

<ul>
<li>Pop in a spare hard drive, install Windows 98 on it, follow the <a
href="#windows">Windows 98 Instructions</a>.
<li>Download a Linux Live CD (there's MANY, I suggest Knoppix or a
derivative), boot to it, follow the Linux instructions.
<li>Download <?php echo l('http://fabrice.bellard.free.fr/qemu/', 'QEMU') ?> to set
up a hard drive image.  Head over to <?php echo l('http://www.freeoszoo.org/', 'Free OS Zoo') ?> for QEMU downloads for various platforms.
</ul>

<?php Section('Obtaining an Image of the Compact Flash Card', 'get'); ?>

<p>Want to make an exact copy of the Compact Flash card?  Need the original
images so that you can install and upgrade your own applications?  Here you
go.  Information for this process originally came from <a
href="http://www.geocities.com/ptkatch/aquapad.htm">Pavel Tkatchouk</a>.</p>

<ol>
<li><a href="dissect.php">Dissassemble</a> the AquaPad.  Remove the Compact
Flash card and walk over to your other computer with the Compact Flash 
reader.  My reader mounts Compact Flash cards as /dev/sda.</li>
<li><?php MakeBoxTop('right'); ?>
<PRE>Disk /dev/sda: 1024 MB, 1024450560 bytes
1 heads, 62 sectors/track, 32272 cylinders
Units = cylinders of 62 * 512 = 31744 bytes

   Device Boot    Start       End    Blocks   Id  System
/dev/sda1   *         2        88      2697   83  Linux
/dev/sda2            89       175      2697   83  Linux
/dev/sda3           176       180       155   83  Linux
/dev/sda4           181      1015     25885   83  Linux
</pre><?php MakeBoxBottom(); ?>

Check out the partitions on the card.  For me, <tt>fdisk -l /dev/sda</tt>
produces the results shown in the table to the right.</li>
<li>Change to whatever directory that you want the files stored in.
  <blockquote>
  <tt>mkdir ~/aquapad; cd ~/aquapad</tt>
  </blockquote></li>
<li>Copy over the master boot record.
  <blockquote>
  <tt>dd if=/dev/sda of=MBR bs=512 count=1</tt>
  </blockquote></li>
<li>Copy over each hard drive image.  You can use <tt>cp</tt> or
<tt>dd</tt>.  Just make sure that the sda1 image is the same size as the
sda2 image, otherwise you will get problems.  We know they are the same size
because of the output from <tt>fdisk</tt>.
  <blockquote>
  <tt>dd if=/dev/sda1 of=/dev/sda1</tt><br>
  <tt>dd if=/dev/sda2 of=/dev/sda2</tt><br>
  <tt>dd if=/dev/sda3 of=/dev/sda3</tt><br>
  <tt>dd if=/dev/sda4 of=/dev/sda4</tt>
  </blockquote></li>
<li>Compress and copy the images elsewhere so that you always have a nice,
clean install just in case something gets messed up.  They really won't
compress too well, but a k here and there add up.</li>
<li>The images are separated in the above instructions because it is easier
to work with them individually than all together.  If you want an exact copy
of the card you can just use <tt>dd if=/dev/sda of=CF_Copy.img</tt>
</ol>

<?php Section('Making Your Own Image Under Linux', 'make_image') ?>

<ol>
<li>Install <?php echo l('http://bochs.sourceforge.net/', 'Bochs') ?>.</li>
<li>Find a Windows or DOS boot floppy.  Insert it into your drive and copy
the floppy image to your hard drive.  Maybe a <?php echo l('http://freedos.org/', 'FreeDOS') ?> floppy will work for you; it didn't work for me.
  <blockquote>
  <tt>dd if=/dev/fd0 of=floppy.img</tt>
  </blockquote></li>
<li>Read the Bochs install instructions to set up a new 4 (or whatever) meg
hard drive.  You don't really need tons of space here.  Also set up Bochs to
use the floppy image as the A drive, boot from the A drive, and have the
hard drive image as the C drive.  Depending on your distribution, this could
take minutes or hours.  With Debian, just run Bochs and it will easily
create a new hard drive for you.</li>
<li>Boot the floppy image, <tt>fdisk</tt> the C drive, reboot.</li>
<li>Boot the floppy again and add the bootable MBR:  <tt>fdisk /MBR</tt></li>
<li>Format the hard drive, and add the system.
  <blockquote>
  <tt>format c: /S</tt>
  </blockquote></li>
<li>Shut down Bochs, and find your hard drive image.  Mine is called
guest.hd0.
  <blockquote>
  <tt>dd if=guest.hd0 of=/dev/sda</tt>
  </blockquote></li>
</ol>

<?php

AquaStop();
