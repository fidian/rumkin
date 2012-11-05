<?php

include './functions.inc';
AquaStart('Knoppix On An Aquapad');

?>

<p>First off, <i>far better</i> instructions are at <a 
href="http://www.knoppix.net/docs/index.php/HdBasedHowTo">Knoppix's Site</a>.
I only have mine here to explain what I did, which was a bit more annoying
since the Aquapad doesn't have any floppy disk.</p>
	
<hr>

<p>Because the AquaPad certainly supports the 386 instruction set, and
because I wanted to get <i>something</i> running on the pad as quickly as
possible, I tried out <a href="http://www.knoppix.net/">Knoppix</a> and 
wanted to get it booting off of the CF card.  This is what I had to do.</p>

<p>It is highly probable that this will work with any Debian live CD
distribution, and quite likely that it will work with others that also work
on 386 computers.  You want to get a lean, mean distro.  Perhaps <a
href="http://rescuecd.sourceforge.net">Timo's</a> or <a
href="http://www.knoppix-std.org/">Knoppix STD</a>.  Heck, build your own.
I plan on releasing one that works better for me until I can get a system
that can be 100% optimized for the tablet.</p>

<ol>
<li>Get a nice, big CF card.  512 bytes minimum (Knoppix is bigger, but you
can get a stripped down distribution.
<li>If not done already, format the card.  You can use a DOS style partition
(vfat works well), and you can probably work with ext2 or ext3.  Mount it to
/mnt/cf or wherever.  Non-Linux users need to find their own way of doing 
this &ndash; it is possible, but I have no knowledge of the tools (where
they are, how to use, etc).
<li>Burn/extract the .iso so you have access to the files within.
<li>Copy everything to the CF card.
<li>Set up lilo
  <ul>
  <li>Download my <a href="media/lilo-conf.zip">Lilo Setup</a>
  <li>Extract it on the CF card
  <li>Edit etc/lilo.conf to set it up for your system.  Here's some notes:
  <?php MakeBoxTop('center'); ?>
  <tt>boot=/dev/sda <?php echo N('device in host system') ?><br>
  read-only<br>
  root=/dev/hdc1 <?php echo N('device in aquapad') ?><br>
  <br>
  image=/boot/vmlinuz <?php echo N('relative to root of CF card') ?><br>
  root=/dev/hdc1 <?php echo N('device in aqupad') ?><br>
  label=Knoppix<br>
  read-only<br>
  initrd=/boot/miniroot.gz<br>
  append="lang=us 2 noeject" <?php echo N('additional parameters') ?></tt>
  <?php MakeBoxBottom(); ?>
  <li>Note that I moved the miniroot.gz and vmlinuz files to the boot
  directory.  You can put them wherever you like.
  <li>You may need to make the target device node in /dev.  You can either
  mount devfs to the CF's dev directory (mount -t devfs devfs /mnt/cf/dev) or
  copy a device file there (cp -a /dev/sda /mnt/cf/dev).
  <li>Time to get Lilo going.<br><tt>
  /sbin/lilo -r /mnt/cf -M /dev/sda<br>
  /sbin/lilo -r /mnt/cf -i boot-text.b</tt>
  <li>If all goes well, the CF is ready to boot.
  </ul>
<li>Everything should be a-ok and ready to go.  Stick in the card and boot.
If you have problems, make sure that the lilo.conf is set up properly (make
sure that you have all of the devices correct).
</ol>

<p>Feel free to experiment a bit.  The worst case, you messing up the CF
card, can be rectified by formatting and copying the CD again.

<p>The same instructions should be usable for nearly any live CD version of
Linux.  You want one that is small, since you only have 128 megs of RAM to
work with.  Just change the miniroot.gz and vmlinuz files appropriately.  A
splash image can be used with the boot-bmp.b boot image, see the lilo
documentation for more information.
	
<p>You might find this page on <a
href="http://linuxdevices.com/articles/AT4540125636.html">Embedding Debian
in 32MB CF</a> an interesting read ... especially since we are trying to do
about the same thing.

<?php

AquaStop();


function N($str) {
	return '<font color=red><b>* ' . htmlspecialchars($str) . '</b></font>';
}

