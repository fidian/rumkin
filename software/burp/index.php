<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'BURP',
                     'header' => 'BURP',
		     'topic' => 'burp'));

?>

<p>While searching for a good file encryption utility, I decided that I
wanted one that was open source, cross-platform, and easy to use.  I wanted
versions that would run on Linux, DOS, and Windows (Win32).  <a
href="http://www.geodyssey.com/cryptography/cryptography.html">BURP</a>,
which stands for Blowfish Updated Re-entrant Project.  It fits the bill
perfectly.</p>

<p>The only problem was that there was no GUI for Windows.  Not a
problem!  I quickly designed one in 
<a href="http://www.autoitscript.com/">AutoIt</a> (a wonderful scripting language)
and now we have BURP-GUI.  I also packed the BURP executables listed below
with UPX to make them smaller, which is perfect for keeping them on my
rescue CD and on flash drives.</p>

<?PHP Section('Requirements'); ?>

<p>BURP-GUI needs a 32-bit Windows OS.  This includes Windows 94, 98, NT,
2000, ME, XP, or later.</p>

<p>Your temporary directory for Windows needs to be properly set.  BURP-GUI
extracts BURP32.EXE to the temporary directory and runs it from there so you
can include BURP-GUI on a CD or other read-only medium.  Output is captured
to a temporary text file, read in by the GUI, and both files are removed
from the filesystem.</p>

<?PHP Section('Warnings'); ?>

<p>Your password could be cached in swap, held in the registry, and other
assorted things.  This is just a front-end to a DOS command-line utility, so
who really knows for certain where your password ends up.  However, it
shouldn't swap unless you are low on available memory and it shouldn't stick
it into the registry and cache your password (at least in my tests).</p>

<p>If you don't use the same password for decrypting as you did for
encrypting, you will end up with a file full of garbage.  There are no
special headers that BURP uses to make sure that everything went well.  BURP
will say that the operation was successful and you'll end up with 
random-looking data.</p>

<?PHP Section('Compiling'); ?>

<p>To compile BURP-GUI, you will need a file named BURP32.EXE.  You can use
the original BURP32.EXE or my UPX-compressed BURP32.EXE.  Just stick it in
the same directory as BURP-GUI.AU3 before you run/compile the code.</p>

<?PHP Section('License'); ?>

<p>I place BURP-GUI in the public domain, just like how BURP was licensed.
The software comes with no warranty, so only execute it if you plan to take
responsibility for all risks.  I suggest that if you are really cautious
that you should read the source code and compile it yourself so that you can
feel safer.</p>

<?PHP Section('Download / Links'); ?>

<p>You should also check out the <a
href="http://www.geodyssey.com/cryptography/cryptography.html">official
site</a> for news and updates to BURP.  You should get the freeware scripting
language, <a href="http://www.autoitscript.com/">AutoIt</a>, if you want to
recompile the GUI. </p>

<ul>
<?PHP

   $Files = array(
      'burp-gui.exe' => array('Windows GUI (everything you need)',
         '2e6aba649c3cadef963f4ed1b45b7d01'),
      'burp-gui.zip' => array('Windows GUI and the AutoIt 3 source code',
         'f6dc2570e0e153d9c713a3b832ba0fa8'),
      'burp.exe' => array('DOS executable (UPX compressed)',
         '4ea4781a80e2f2fe331c01f66a2a39fd'),
      'burp32.exe' => array('DOS/Win32 console executable (UPX compressed)',
         '96e40333aad9006ab34fcefb43716e84'),
      'burp' => array('Linux executable (UPX compressed)',
         '332bb15fe2c69b85ea3e21fcdc905500'),
      'burp120.zip' => array('Mirror of the BURP 1.20 archive',
         '977171e18fb7c54adbf7c00a63133d39'),
   );
   
   foreach ($Files as $n => $d)
   {
	  $mediaFile = getenv('MEDIABASE') . 'software/burp/' . $n;
      echo "<li><a href=\"media/$n\">$n</a> (" . FidianFileSize($mediaFile) .
         ") - $d[0] <font size=-2>(md5: $d[1])</font>\n";
   }
   
?>
</ul>

<?PHP Section('Changes'); ?>

<p><b>2004-06-30</b> (1.1) - Removed 16-bit version (Windows 3.1) because AutoIt
doesn't run on 16-bit systems.  Added additional features as suggested by
BURP's author.</p>

<p><b>2004-06-27</b> (1.0) - Initial version.</p>

<?PHP

StandardFooter();
