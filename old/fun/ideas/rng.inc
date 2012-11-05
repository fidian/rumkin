<p>A hardware random number generator.  With that, you can have very good
crypto and very good simulations of gambling games.  This is a copy of a
page that describes a very inexpensive random number generator that you can
hook up to the serial port on your computer.  Minor editing has taken place
-- to see the original document in all of its splendor, see the <a
href="http://www.cryogenius.com/hardware/rng/">this page</a>.  I just keep
this modified local copy around to make sure that the information doesn't
fall off the net.</p>

<p>While searching for inexpensive random number generator circuits, I
stumbled across other pages that use the same principle (<i>avalanche
noise</i>) as this one.</p>

<?php

$Links = array(
	array(
		'Name' => 'Hardware Random Bit Generator',
		'Desc' => 'More discussion about avalanche noise generators, ' . 'how random the bits are, and how to use this to feed ' . 'Linux\'s /dev/random.  (<a href="rng/hw-rng.html">Local ' . 'copy</a>)',
		'URL' => 'http://positron.jfet.org/hw-rng.html',
		'Escape' => false
	),
	array(
		'Name' => 'Zener Diode Nose Generator',
		'Desc' => 'A thread from a mailing list discussing another ' . 'similar circuit.  (<a href="rng/dzener.txt">Local copy</a>)',
		'URL' => 'http://webs.ono.com/usr005/jsuarez/dzener.txt',
		'Escape' => false
	),
);
MakeLinkList($Links);
echo Separator();

?>

<h2 align=center>Hardware Random Number Generator</h2>
<p align=center>Aaron Logue, May 2002</p>

<p>This page describes my effort to construct a random number generator
with as high a security-to-cost ratio as I can manage.</p>

<p>The PN junction of Q1 is reverse biased to produce avalanche noise.
The resultant signal is amplified for the purpose of driving a TTL-level
Schmitt trigger to produce a squarewave; a series of rising and falling
edges with unpredictable time intervals between edges.

<p align=center><img src="rng/random.gif">

<p>I then connected the circuit to an SX microcontroller so that I could
sample the squarewave, unbias the random bits, and transmit the results
to a PC's serial port.

<p align=center><img src="rng/random2.gif">

<p>To unbias the bits, I use the Von Neumann method, described in the
Schneier red book (Applied Cryptography 2nd Ed.) on page 425.
I sample two bits and discard them if they are equal.  If they are
not equal, then I accumulate one of the bits.  When enough bits are
accumulated, I output them.

<ul>
<li><a href="rng/rng.asm">rng.asm</a> source code
<li><a href="rng/mydefs.inc">mydefs.inc</a> include file
<li><a href="rng/rng.hex">rng.hex</a> hex file (for use w/ 50 Mhz ext oscillator)
</ul>

<p>I support four different output formats in the microcontroller firmware;
ASCII binary (sending a stream of "0" and "1" characters), ASCII hex
(sending bytes as two hex characters in the range of 0-9 and A-F),
base64 (0-63 values represented by uppercase A-Z, lowercase a-z,
numerals 0-9, and characters + and /) and 8-bit raw binary.
Formats are changed by sending the microcontroller
a "1", "4", "6" or "8" command, corresponding to the number of
actual bits encoded in each byte transmitted.

<p>If a "?" character is sent, the program will return a 1, 4, 6, or 8 to
indicate what its current format is.  This should be done only when the
program is not streaming random data.  The random data stream is turned
on and off with ^Q and ^S characters (ASCII XON and XOFF, or ctrl-Q and
ctrl-S).  The device streams at 9600 baud, and could probably sample at
a rate fast enough to support 19200 or 38400 at full entropy.


<p>I did it up in a little box with a 7-segment LED display and added
a MAX232 chip for the serial interface and some code to grab a random number
from zero to nine and display it twice a second.  Even when it's not
connected to a computer, it sits there displaying random numbers, looking
cool and making me happy.  Perhaps it's art.  Source code for the box as
shown below is <a href="rngbox.asm">rngbox.asm</a>.  I also wrote a program
that I could call outta crontab to keep my system's /dev/random entropy pool
stocked with sweet, sweet, randomness.  Source code for that is
<a href="rng/read_rng.c">read_rng.c</a>.

<p align=center><img src="rng/rngbox.jpg">

<p>I also put this circuit on an ISA card.  This allowed me to
generate numbers at a higher rate than 9600 baud, so I grabbed
10 megabytes worth of output and ran it through the Diehard tests.
It looked good.  The ISA card RNG project can be seen
<a href="http://www.cryogenius.com/hardware/isarng/">here</a>.
