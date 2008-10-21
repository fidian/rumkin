<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Tape Tools', 
                     'header' => 'Using Tapes under Linux',
		     'topic' => 'tapes'));

?>
	
<P>In the June 2002 issue of 
<a href="http://linuxjournal.org/">Linux Journal</a>, Craig Johnson asked 
about <a href="http://www.linuxjournal.com/article/5972">getting data off 
of tapes</a>.  It is mentioned in his question that there
is not a lot of help out there for reading data off of tapes.  Hopefully 
this will help out those select few who need to do this.</p>
	
<p>These tools are placed into the public domain.  Do with them what you
will.</p>
	
<hr noshade>

<p><b>Preparation</b></p>

<p>This is a Linux-centric document.  If you don't run Linux, you may not get
a lot of information out of it.  I use <a href="http://debian.org/">Debian</a>
as my distribution of choice.  My tape readers are at /dev/st0.  Yours may
vary.</p>

<p><b>Getting It To Work</b></p>

<p>Before you start, make sure you load the right modules for the job.
For my two tape readers, I first load the SCSI card driver (aic7xxx) and 
the SCSI Tape driver (st).  See 'man insmod' and 'man lsmod' for more 
information.  If you don't have them compiled as modules, you will either
need to recompile them as modules or you'll need to just compile them into
the kernel.  I like the module idea.</p>

<p>When you boot or when you load the modules, you should see that the tape
drive has been located.  If not, try a different driver or a different
card.  Make sure you can see it before continuing on.</p>

<p><b>Testing</b></p>

<p>I installed the 'mt-st' packate so I could get the magnetic tools package
that is compiled with SCSI Tape support.  I then inserted a tape into the
reader and issued '<tt>mt eject</tt>'.  Well, then I issued 
'<tt>mt -f /dev/st0 eject</tt>' and then it worked.  That proves to me that
the tape reader is working.</p>

<p><b>Reading data</b></p>

<p>I quickly found out that the tapes that I was using (3480 and 3490 tapes,
written by an IBM mainframe of some sort) were not just 'tar' dumps.  All of
the documentation I found at <a href="http://www.google.com/">Google</a> was
basically useless.  I needed to read the tape data directly.  After days of
searching, I found the holy grail of tape reading software, Fermi Tape Tools
Library.  Now, it didn't recognize my EBCDIC written tapes, but that's a
minor thing to convert.</p>

<p>Fermi Tape Tools Library is available at two places:  <a
href="http://www.fnal.gov/docs/products/ftt">http://www.fnal.gov/docs/products/ftt</a>
and <a href="ftp://ftp.fnal.gov/pub/ftt">ftp://ftp.fnal.net/pub/ftt</a>.  In
order to compile this library, you also need to get UPS from <a
href="ftp://ftp.fnal.gov/pub/ups">ftp://ftp.fnal.gov</a>.  I had only minor
troubles compiling the tools, so things should go fairly smoothly if you
have experience compiling programs.</p>

<p>Fermi Tape Tools Library has many good features.  It is a C library
(fast) that is cross platform (Linux, other Unixes, Windows NT, etc.).  It
includes a little documentation on Exabyte drives.  It also works pretty
good for me.  I encourage use of the library.</p>

<p><b>Writing Software</b></p>

<p>I found out that the library does not work with EBCDIC labels, so I had
to <a href="media/ftt_patch.txt">patch</a> the source.  Please note that the patch
works with my version -- v2.18 Linux+2.  I also had to write software to
dump the header, show a structure of the tape, and do other things.  My <a
href="media/tape_tools.tar.gz">old version</a> has separate programs for each
task, and the archive includes the source as well as the statically compiled
binaries.  The <a href="media/tapetool.tar.gz">new version</a> is all combined into
just one program, and you use different command-line options.</p>

<p><b>Labels</b></p>

<p>If the tape is labeled, scanning the tape will say that there are a few
blocks that contain 80 bytes, a tape mark, lots of big blocks of whatever
size they want to be, another tape mark, and at least one more block at 80
bytes, then the tape is labeled.  The 80-byte blocks at the beginning and
end are the tape header and footer.  You can find out more about tape
labels at these fine pages:</p>

<ul>
<li><a href="http://www.loc.gov/marc/specifications/specexchtape1.html">
http://www.loc.gov/marc/specifications/specexchtape1.html</a></li>
<li><a href="http://it-div-ds.web.cern.ch/it-div-ds/HO/labels.html">
http://it-div-ds.web.cern.ch/it-div-ds/HO/labels.html</a></li>
</ul>

<p><b>More Help</b></p>

<p>Beyond what I wrote in this web page, I am not a good source of
information.  FTT comes with pretty good documentation, and the source for
the simplistic tools that I wrote should get you off to a good start.
Perhaps you can find more help at <a
href="http://pcunix.com/Unixart/tapes.html">http://pcunix.com/Unixart/tapes.html</a>.</p>

<?PHP

StandardFooter();
