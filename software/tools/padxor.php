<?php

include '../../functions.inc';
StandardHeader(array(
		'topic' => 'tools',
		'title' => 'One Time Pad XOR'
	));

?>

<p>Need a secure method to encrypt files?  Want it to be quick, easy, and
unbreakable as long as you take care with it?  This is the tool for you!
For information on the technique and the tools, I suggest you go to <a
href="http://www.aspheute.com/english/20010924.asp">Unbreakable Encryption
Using One Time Pads</a> (Unbreakable).</p>
	
<p>The tools I have here are modeled after the ones designed there, but mine
work in DOS and don't require .NET.  If you have .NET, I suggest <i>not</i> 
using my tools and using Unbreakable's instead.  At least use Unbreakable's
padgen program -- I'm pretty sure it generates better random numbers than
mine does.</p>

<p>These tools also work on Linux, for people like me.</p>

<?php Section('Generating a one time pad'); ?>

<p>Just like on the Unbreakable site, you use the following syntax:</p>

<p><tt>padgen padfilename padfilesize</tt></p>

<p>Instead of using the random number generator and instead of compiling
your own program, you can generate a pad file from input files.  Good
candidates for random data from input files are compressed archives, video
and audio files, large .jpg files, executable programs, and other binary
sources of data.  However, you can use text files if you want -- but it is
not suggested.</p>

<p>To generate a random pad from input files, use the padfile program:</p>

<p><tt>padfile padfilename inputfile1 [inputfile2 [inputfile3 [...]]]</tt></p>

<p>You don't need to specify more than one input file, but you are allowed
to (do not have the [ and ] symbols around your file names).  padfile will
generate a pad file that is just a bit smaller than half the size of the
input files.  Plan accordingly.  It is good to have a pad file be bigger
than the file you wish to encrypt, but not 100% necessary for these tools.</p>

<?php Section('Encrypting and decrypting'); ?>

<p>This tool is similar to the one on the Unbreakable site, but I decided to
make a few parameters for it.</p>

<p><tt>padgen [options] inputfile padfile outputfile</tt></p>

<p>Options:<br>
<tt>-s byte</tt> :: Start using the padfile at the specified byte<br>
<tt>-l</tt> :: Loop the padfile when out of data<br>
<tt>-b</tt> :: Show the byte that was last used in the padfile<br>
<tt>-r</tt> :: Starts at a random byte in the padfile<br>
<tt>-x num</tt> :: XOR everything with the number (0 to 255)<br>
<tt>-i</tt> :: Increment -x when using -l</p>

<p>Lots of these options are a *BAD IDEA*, but I included them because they
were fun to toy with..</p>

<p><tt>-s byte</tt><br>
This will start using the padfile at the specified byte.  This is good if
you send a large padfile to someone, then you want to send tiny encrypted
files back and forth.  You can use a section of the padfile for each file
you send.</p>

<p><tt>-l</tt><br>
Loop the padfile when you use it up.  Normally, the padxor program will stop
running if you run out of bytes to encode a file with.  Looping will let you
use a 1 meg file to encrypt a 10 meg file, but doing that is bad for
security.  If you are ultra-paranoid, don't use this.  If you are just
trying to hide a large file from prying eyes (parents, coworkers, children),
then you can stick your key on some sort of removeable media and encrypt the
files with a smaller key and just keep looping through it.</p>

<p><tt>-b</tt><br>
Prints out what was the last byte used in the encryption/decription.  For
the totally paranoid, you would then use -s to start at the last byte used +
1.</p>

<p><tt>-r</tt><br>
Start at a random byte in a padfile.  See the "Funky Ideas" section below.</p>

<p><tt>-x num</tt><br>
Encrypt the result yet again with another static xor.  See the "Funky Ideas"
section below.</p>

<p><tt>-i</tt><br>
Change the -x value every time you loop through the key file.  See the
"Funky Ideas" section below.</p>

<?php Section('Example'); ?>

<p>This example is designed to be just like the one on Unbreakable, but for
my tools.</p>

<p><tt>padgen mypad.bin 200000<br>
padxor otp.cs mypad.bin otp.cs.enc<br>
padxor otp.cs.enc mypad.bin otp.cs.dec</tt></p>

<p>Or, if you wanted to use a large pre-generated key, start in the middle
of the file, and get the byte that it last used in the encoded file, use
something like:</p>

<p><tt>padxor -s 12047 -b otp.cs mypad.bin otp.cs.enc<br>
padxor -s 12047 -b otp.cs mypad.bin otp.cs.enc</tt></p>

<?php Section('Secure deletion of the one time pad'); ?>

<p>The "wipe" tool just writes random-ish data over and over and over and
over on the file.  This may not work, depending on the file system -- some
file systems are journaled, so the old data is not actually overwritten on
the disk.  However, for DOS, this would work fine.</p>

<p><tt>wipe some_file.bin</tt></p>

<?php Section('Alternate pad generation'); ?>

<p>Since padgen uses the rand() function, and that has been proven to be not
a good source for random data, you might want to edit the program and use a
different random number generator.  If you use .NET, I would suggest the
padgen program from Unbreakable's site.  If you don't, there are many other
ways to get a random one time pad, such as the program that is on the One
Time Pad site (see the Links section).</p>

<p>If using Linux, you can just use dd to create a 1 meg file (1024 bytes
per read * 1024 reads):</p>

<p><tt>dd if=/dev/random of=mypad.bin bs=1024 count=1024</tt></p>

<p>There are other tools and web sites that will give you statistically
random data.  To make sure that you feel safe using your key file, you can
use the padtest program to see how random the data is.  The guts of this
program are actually from the One Time Pad program (see the Links section).
It only includes the statistical testing that the otp.c program contains --
not the rest of the stuff.</p>

<p><tt>padtest mypad.bin</tt></p>

<p>Keep in mind that no program can ever verify that data is random -- it
can just test certain things that indicate non-randomness.  Also, the tests in 
padtest are not the best -- they are just quick little tests.  A better
tester is "ent," available in the Links section.</p>

<p>If you don't decide to change the random number generation function from
rand() in padgen, you could be vulnerable.  If a person uses <a
href="findpad.zip">special tools</a> that are designed to find your key, you
are in trouble.  If the cracker can figure out the first four bytes of the
key from the file header, the srand seed can be found with findpad.  Then,
if you know the length of the key file, padseed will make a pad with your
specified seed.  Not good for security, but good for simple security that
you can recover from.</p>

<p>padfile is a much better solution than padgen.  Heck, generate hundreds
of pad files and just padxor them together to create one good pad file.
If you xor two random data sources, the result will be random data that is as
good as the best source.  So, if you have many different programs generate
pad files for you and you xor them together, the strength of the resulting
file will be as strong, bit for bit, as the best source of data.</p>

<?php Section('Funky ideas'); ?>

<p>This is NOT good security.  These things were implemented to make
retrieval of the data by a random visitor impossible, but the NSA would
laugh at what we do here.</p>

<p>There is a situation where we need a zip file encoded with a key.  The
key is unable to be changed, and will be smaller than the zip file, thus we
need to use -l to loop through the key file.  This works just fine to keep
it out of casual view and would give any hacker problems due to the size of
the key file and that we are trying to decode a zip file.</p>

<p>However, if the key was leaked, it would be trivial to decode the zip
archive, so by using -r, it is made a bit harder.  The zip file now is
encrypted with the key, but in one of a million starting points.  This would
probably give the hacker a hassle for a bit.  The downside (and the part
that makes recovery of the zip file with the key possible) is that zip files
have a 4-byte "header" at the beginning of the file.  The hacker could just
decrypt the 4-byte header with each of the million starting places, note the
ones that have the correct header, and manually test those.  So, the number
of possible starting places in the key is limited down to maybe 10 in a few
seconds of decoding.</p>

<p>So, now by using the -x and maybe -i options, and by using a random
number for -x (not coded into padxor), any spot in the file could now be a
potential starting point.  The hacker would need to generate the -x and try
that versus the next three bytes.  Eventually, the person would get 30-50
potential starting points with -x keys, and will be able to hack their way
into the file again.</p>

<p>Because security through obscurity is not real security, we decided
that the -x, -i, and -r options wouldn't be that useful for our purposes.
Thus, development was stopped with them, but I left them in the program just
in case you wanted to use them.</p>

<?php Section('Download'); ?>

<p><a href="padxor.zip">padxor.zip</a> contains the source code that
compiles on several platforms, and includes DOS executables.</p>

<?php Section('Links'); ?>

<ul>
<li><a href="http://www.aspheute.com/english/20010924.asp">Unbreakable
Encryption Using One Time Pads</a> - What these tools were based on
<li><a href="http://www.vidwest.com/otp/index.htm">One Time Pad
Encryption</a> - The source for padtest's random number tests (link dead)
<li><a href="http://www.fourmilab.ch/hotbits/">HotBits</a> - A source for
random data
<li><a href="http://www.random.org/">Random.org</a> - Another source for
random data
<li><a href="http://www.fourmilab.ch/random/">Pseudorandom Number
Sequence Test Program</a> - Home of "ent"
</ul>

<?php

StandardFooter();
