<?php

include '../../functions.inc';
StandardHeader(array(
		'title' => 'UNTGZ',
		'topic' => 'untgz'
	));

?>

<p>Tillmann Steinbrecher made a wonderful command-line tool for extracting
.tar.gz, .tar, and some .zip files.  It is called <a
href="http://www.t-st.org/untgz/">untgz</a> and version 0.95 is
the most recent, with that one being released February 17, 1997.  One very
great thing he did was to release the source code with the tool and put 
everything under the GPL, version 2.</p>

<?php Section('Features'); ?>

<ul>
<li>Command-line tool (no GUI, much smaller)
<li>Executables for various Intel x86 flavors:
  <ul>
  <li>DOS (really old machines)
  <li>DOS on 386+ machines
  <li>Win32 for 32-bit Windows machines (95/98/NT/2000/ME/XP)
  <li>Native OS/2 binary
  </ul>
<li>Extracts a .gz or .tgz and either decompresses it to the single .tar or
to the separate files inside the .tar
</ul>

<p>I was looking for a tiny tool that I would put on my boot disk to extract
an archive to a ramdisk so I could install more tools than the single floppy
would allow.  The method is similar to <a
href="http://www.nu2.nu/bootdisk/modboot/">Bart's Modular Boot Disk</a>.
Originally, I used .zip archives because I found a 50k unzip program.  Then
I switched to .rar because I located a 26k unrar program.  I upgraded my
Linux machine and found out that the newer version of rar can't be
decompressed with my unrar file, so I searched the web again for a standard
format that I could create on Linux and decompress on DOS.  I was very
fortunate and found untgz.</p>

<?php Section('SMALLER!'); ?>

<p>Since I had the source at my disposal, I felt an overwhelming urge to see
how much extra I could strip from this 57k program, especially since I would
be using this as a decompression tool only on my boot floppy, where space is
at a premium.  So, with a "just extract the file" type of mindset, I made
the following changes to reduce the size of the program:</p>

<ul>
<li>The ability to set the timestamp was removed
<li>All of the good output was removed &ndash; If the program did its job, you
won't see a thing
<li>Almost all of the error output was removed and just cryptic error
messages remain
<li>The CRC lookup table was eliminated by adding a tiny amount of code
<li>All calls to printf() were replaced with puts()
<li>All calls to sscanf() were replaced by a custom function
<li>Command-line options were eliminated
<li>Code that didn't actually extract the file was removed
<li>Other code was tweaked/optimized in order to save space
<li>Zip support was removed because it didn't actually support zip files; it
supported zipped tar files
<li>Optimization flags for the compilers were tweaked
<li><a href="http://upx.sourceforge.net/">UPX 1.25</a> was used to compress
the programs further
</ul>

<p>In the end, I had a 9k untgz program that only used the 8.3 DOS filename
standard, and a 15k executable that supported 32-bit and long filenames.  I
would say that's a significant savings!  1/6 the size for the little one,
1/4 the size for the 32-bit version.</p>

<p>I certainly don't think that this is a useful all-around tool anymore.
However, if you have a specific need for an extremely small program that can
extract .tar.gz files, this will work <b>wonders</b> for you!  If the
program reports an error while decompressing, use the larger version for a
more detailed description of what's going on at that moment.</p>

<?php Section('Tips'); ?>

<p>Use the original version first!  If you have any errors with your .tgz
file, you will see more detailed explanations of problems there.  If you
have no problems, you can then move on to the stripped version.</p>

<p>To achieve maximum compression and remove the "original filename" from
the gzip header, you should use pipes.  Pass the data directly to gzip from
tar like this:</p>

<blockquote><tt>tar cvf - data_directory/ | gzip -9 >
output.tgz</tt></blockquote>

<p>Using "tar cvfz" instead will use the default compression level (6) and
will include more data in the gzip header.  We're only talking about a few
bytes here, but that can be enough when you are dealing with a tiny boot
disk.</p>

<?php Section('Download'); ?>

<p><a href="media/untgz095.zip">original version</a> - 57k binaries for DOS,
Win32, OS/2.  Includes source.<br>
<a href="media/untgzs095.zip">smaller version</a> - 9k binary for DOS, 15k binary
for Win32.  Includes source, but large chunks of it were removed.</p>

<?php Section('Links'); ?>

<ul>
<li><a href="http://www.nu2.nu/bootdisk/modboot/">Bart's MODBOOT</a> -
Modular boot disk that uses a ramdisk and extracts .cab files when booting
<li><a href="http://www.t-st.org/untgz/">UNTGZ</a> - Official Site
<li><a href="http://upx.sourceforge.net/">UPX</a> - The Ultimate Packer for
eXecutables
</ul>

<?php

StandardFooter();
