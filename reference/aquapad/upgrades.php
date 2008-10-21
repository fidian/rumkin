<?PHP

include './functions.inc';

AquaStart('Upgrading The Tablet');

?>

<ul>
<li><a href="#warning">A Word of Caution</a></li>
<li><a href="#bios">How to Upgrade the BIOS under only Linux</a></li>
<li><a href="#memory">How to Upgrade the Memory and Processor</a></li>
<li><a href="#tolinux">Change an AquaPad's OS to Linux</a></li>
<li><a href="#cfimage">Obtaining an Image of the Compact Flash Card</a></li>
<li><a href="#midori">Upgrade the OS and Other Software</a></li>
<li><a href="#chroot">Changing a Root Partition (sda1, sda2)</a></li>
<li><a href="#chcomp">Changing a Multi-Compressed Partition (sda3,
sda4)</a></li>
<li><a href="#links">Related Links</a></li>
</ul>

<?PHP Section('A Word of Caution', 'warning'); ?>

<p>Because performing updates like this are potentially <i>EXTREMELY
DANGEROUS</i>, I <u>strongly urge</u> you to <b>not</b> perform any of these
activities unless you are ready to lose your AquaPad.  I can't be held
accountable if following these instructions fries your motherboard, nukes
your BIOS, or does any other negative thing.  I have tried these things
myself, so I know they worked for me, but they may not work for you.</p>

<p>That said, let's go make our AquaPads into the machines they want to be!</p>

<?PHP Section('How to Upgrade the BIOS under only Linux', 'bios'); ?>

<ol>
<li>Obtain a new BIOS image.  Check 
<?= l('ftp://ftp.fica.com/Notebooks_Tablets/AQUA/') ?> under the 
<tt>bios</tt> directory, and then the OS you intend to run.  
(Midori Linux, of course!)</li>
<li>Make a CompactFlash card bootable (see <?= l('hd_img.php',
'these instructions') ?>).
<li>Copy over the files required for the BIOS update.  This will run and
finish by itself when you turn on the Aquapad.  Just make sure that your
tablet will boot to the proper drive and that the BIOS (1) identifies your
CF card and (2) is set to boot from it.
</ol>

<?PHP MakeBoxTop('right'); ?>
<PRE>Disk /dev/sda: 1024 MB, 1024450560 bytes
16 heads, 63 sectors/track, 1985 cylinders
Units = cylinders of 1008 * 512 = 516096 bytes
 
   Device Boot    Start       End    Blocks   Id  System
/dev/sda1   *         1         8      4000+   e  Win95 FAT16 (LBA)
</PRE><?PHP MakeBoxBottom() ?>

<p><tt>fdisk -l /dev/sda</tt> shows me the output in the box.</p>

<?PHP Section('How to Upgrade the Memory and Processor', 'memory'); ?>

<p>The AquaPad comes with 128 Mb of marvelous memory.  The device is said to
support 256 Mb of memory.  It uses standard SO-DIMM SDRAM, 144 pin, non-ECC,
PC133.  However, just plugging in the memory won't work.  Apparently the CPU
needs to be code morphed to handle the additional memory.  Looks like we are
all stuck with 128 Mb until someone figures out how to do this "morphing" of
their processor.</p>

<p>The Crusoe processor can not be upgraded either -- it is soldered
directly on the board.  So, you are stuck with the 500 mhz CPU.</p>

<?PHP Section('Upgrade from a Windows version (or one without an OS)
to Midori Linux', 'tolinux'); ?>

<ol>
<li>Upgrade the BIOS (see above).  Making a bootable Compact Flash card
might be as easy as <tt>format d: /S</tt>, or maybe not.</li>
<li>Download Midori from somewhere</li>
<li>Install.  :-)</li>
<li>Once you get Midori tweaked the way you want on the external Compact
Flash card, you should be able to rebuild it for /dev/hda and away you
go.</li>
</ol>

<?PHP Section('Obtaining an Image of the Compact Flash Card', 'cfimage'); ?>

<p>This section is moved to be with the other portions dealing with
<?= l('hd_img.php#get', 'hard drive images') ?>.

<?PHP Section('Upgrade the Operating System and Other Software', 'midori'); ?>

<p>So far, I have not heard of anyone successfully compiling Midori to run
flawlessly on the AquaPad.  However, you can go ahead and patch your Compact
Flash image to have additional applications, upgraded software, etc.
Again, I have <a
href="http://www.geocities.com/ptkatch/aquapad.htm">Pavel Tkatchouk</a> to
thank for a great starting point.</p>

<ol>
<li>Get the images from your Compact Flash card, as described above.</li>
<li>Somehow get <tt>cramfsck</tt> and <tt>mkcramfs</tt> on your system.
Under Debian, just install the <tt>cramfsprogs</tt> package.</li>
<li>You can get <tt>packcramfs</tt> from the AquaPad image itself, or you
can build it from Midori.  There are two methods that you can use,
extraction and mounting.  To extract it from the AquaPad image itself, you
just need to use </tt>cramfsck</tt>, which can make a directory and expand
an image.  Keep or toss the expanded directory after you have
<tt>packcramfs</tt>.  Also, you may wish to copy it to your path or
somewhere else.  The <tt>packcramfs</tt> from the AquaPad doesn't have usage
instructions built into it, so I extracted <a href="media/packcramfs.txt">them</a>
for you from the source.
  <blockquote>
  <tt>cramfsck -x sda1_expanded sda1</tt><br>
  <tt>cp sda1_expanded/sbin/packcramfs .</tt>
  </blockquote></li>
<li>Alternately, instead of expanding the image, you could maybe just mount
it and copy it out.  Please note that you can not change anything if the
filesystem is mounted like this.  You can only change expanded images.
  <blockquote>
  <tt>mkdir extract</tt><br>
  <tt>mount sda1 extract -o loop -t cramfs</tt><br>
  <tt>cp extract/sbin/packcramfs .</tt><br>
  <tt>umount extract</tt><br>
  <tt>rmdir extract</tt>
  </blockquote></li>
<li>See the next two sections for information about changing the different
partitions.</li>
</ol>

<?PHP Section('Changing a Root Partition (sda1, sda2)', 'chroot'); ?>

<p>Keep in mind that the first two partitions should be identical.</p>

<ol>
<li>Copy the image from the partition if you have not done so already.
(See above, "Obtaining an Image")</li>
<li>You made a backup of the original image, right?</li>
<li>If you didn't do this already, extract the image.
  <blockquote>
  <tt>cramfsck -x sda1_expanded sda1</tt>
  </blockquote></li>
<li>Alter the image by copying in programs, editing files, deleting files,
etc.</li>
<li>Create a new image file.
  <blockquote>
  <tt>mkcramfs sda1_expanded sda1</tt>
  </blockquote></li>
<li>Copy the image back to the partition.  You can use <tt>dd</tt> or
<tt>cp</tt> for this.
  <blockquote>
  <tt>dd if=sda1 of=/dev/sda1</tt>
  </blockquote></li>
</ol>

<?PHP Section('Changing a Multi-Compressed Partition (sda3, sda4)', 'chcomp'); ?>

<ol>
<li>Copy the image from the partition if you have not done so already.
(See above, "Obtaining an Image")</li>
<li>You made a backup of the original image, right?</li>
<li>List the available partitions.
  <blockquote>
  <tt>packcramfs -p sda4</tt>
  </blockquote></li>
<li>Find the lines at the end that list the active partitions.  Determine
which one you want to expand.  I'll assume that you want to see the one that
is marked something like <tt>[02]: * usr/X11R6</tt>.</li>
<li>Pull the cramfs image out.
  <blockquote>
  <tt>packcramfs -x sda4 02 sda4_p02</tt>
  </blockquote></li>
<li>Extract the image
  <blockquote>
  <tt>cramfsck -x sda4_p02_expanded sda4_p02</tt>
  </blockquote></li>
<li>Alter the image by copying in programs, editing files, deleting files,
etc.</li>
<li>Create a new image file.
  <blockquote>
  <tt>mkcramfs sda4_p02_expanded sda4_p02</tt>
  </blockquote></li>
<li>Create a new multiple image file.  See either <tt>packcramfs --help</tt>, 
or check out the <a href="media/packcramfs.txt">usage information</a> that I
extracted from the source.</li>
<li>Copy the new multiple cramfs image back to the partition.  You can use 
<tt>dd</tt> or <tt>cp</tt> for this.
  <blockquote>
  <tt>dd if=sda1 of=/dev/sda1</tt>
  </blockquote></li>
</ol>

<?PHP Section('Related Links', 'links'); ?>

<p><a
href="http://www.aquapad.org/modules.php?op=modload&name=Forums&file=index&action=viewtopic&topic=24&forum=1&6">Booting
from external CF</a></p>

<p>Upgrading 2000 to Midori <a
href="http://www.aquapad.org/modules.php?op=modload&name=Forums&file=index&action=viewtopic&topic=91&forum=2&3">here</a>
-- don't forget to flash the BIOS</p>

<?PHP

AquaStop();
