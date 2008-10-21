<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'Extracting Novell SDIF Backups',
		     'header' => 'Novell Backups',
		     'topic' => 'sdif'));

?>

<p>Novell systems are pretty cool.  They compress data in the background,
and when you run a backup on a Novell server, it just sends the data off the
disk to the backup software.  This means that you don't need to compress the
data &ndash; it is already compressed.</p>

<p>The downside is when you try to restore the information.  You will get a
lot of files that do not contain the information you thought they contained.
The description of the problem is better explained in my <a
href="/reference/problems/sdif.php">solved problems</a> section.</p>

<p>I wrote a small tool to grab the uncompressed data from a SDIF-encoded
stream.  It is not verbose, does not double-check data, nor is it really
immune to errors in the stream.  It is a quick and dirty solution to pull
out whatever information you can without actually going to a Novell
server.</p>

<p>The tool runs currently on Linux, but should be almost no problem
whatsoever to port to another OS.  Andrea Manzini tested it (and fixed a
couple warnings) on Win32.</p>

<p>If the file was compressed by Novell, you will be out of luck.  The
compression method they use is not publically documented and it looks like
they are quite against the idea of having public documentation of the
decompression algorithm.  So, if the file was able to be compressed and was
actually compressed by Novell, this tool will not be able to decompress it
and you won't be able to restore the actual contents of the file.</p>

<p>If the stream appears to be corrupt, the file will not be written.</p>

<p>Good files have the full file path in the header and will be written to
the appropriate directory structure.  For instance, if the file says it was
backed up from <tt>SYS:PATH/TO/FILE.BIN</TT> it will be saved as
<tt>SYS/PATH/TO/FILE.BIN</tt>.  Case is preserved, and colons (":") are
translated into slashes ("/").</p>

<p>Download the C source here:  <a
href="extract_sdif_data.c">extract_sdif_data.c</a></p>

<p>To run it, just specify the SDIF file to pull the data from:<br>
<tt>./extract_sdif_data file.sdif</tt></p>

<?PHP Section('Links'); ?>

<ul>
<li><a
href="http://www.ecma-international.org/publications/standards/Ecma-208.htm">SDIF
Format as PDF</a> - Understand this binary format used often for backups.
<li><a
href="http://forums.novell.com/group/novell.devsup.smscomp/readerNoFrame.tpt/@thread@179@F@10@S-,D@NONE+179/@article@179">Novell's
Take on Compression Documentation</a> - It isn't likely that they will ever
allow the public to know how they decompress the data on their servers.
</ul>

<?PHP

StandardFooter();
