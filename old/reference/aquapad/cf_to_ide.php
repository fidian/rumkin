<?php

include './functions.inc';
AquaStart('CF To IDE');

?>

<p>There are CompactFlash to IDE adaptors.  These are little devices that
will take your CF card and hook it up to an IDE cable.</p>

<p>There are also IDE to CompactFlash adaptors, which will hook up your IDE
hard drive (a standard size hard drive or a laptop drive) and let it plug
into a CompactFlash slot.  Whether the IDE hard drive will work in your
device depends on how it accesses the CF.</p>

<p>CompactFlash can be accessed in two different ways.  Most little devices
do it one way.  The Aquapad (among other devices, such as some cameras,
embedded systems, etc.) can access the CF card in "IDE mode."  If the CF is
accessed as an IDE device, you can hook up the adaptor and get a lot more
space.  The adaptors are difficult to find, but I really wanted one and I
was able to track down the following information.</p>

<p>The interesting thing is that if you have an embedded application and it
accesses the CF slot as though it is an IDE drive, you can hook up one of
these adaptors, an IDE cable, and then two IDE to CF adaptors and you'll get
to use two CF cards.  Omit the second set of adaptors and you can hook up
two hard drives to the one CF slot.</p>

<dl>

<dt>Esskabel - <a
href="http://en.esskabel.de/adapter/C68/lang/_eng/">ADA-COMPACTFLASH-ATA-IDE40</a></dt>
<dd>Type II adaptor.  <a
href="media/ADA-COMPACTFLASH-ATA-IDE40.pdf">datasheet (pdf)</a>
<dd>Price is reasonable, but international shipping and a minimum order of
10 pieces won't work for a hobbyist.

<dt>Advantec - <a
href="http://www.advantech.com/epc/newsletter/v28-07-15_00/4IDEsup.htm">CF-HDD-ADP</a>
<dd>Slightly odd shape, so it may not actually fit into your CF slot.
Standard IDE hard drive cable adaptor.
Discussion at <a
href="http://www.linux-hacker.net/cgi-bin/UltraBoard/UltraBoard.pl?Action=ShowPost&Board=MSNCompanion&Post=80">I-Appliance
BBS</a>.
<dd>$30 and you can buy them individually.  It isn't in their online catalog
and you have to just email them in order to buy the part.

</dl>

<p>Additionally, there is a very interesting product shown at <a
href="http://www.dansdata.com/danletters076.htm">Dan's Data letters #76</a>
(1/3 of the way down) that shows a CF card insert that is directly attached
to an IDE cable.  Unfortunately, it says that it is an engineering sample.
I was unable to find out more about the device.</p>

<p>If the adaptor won't fit properly into your device, you can get a CF
extender.  There are many different types available from <a
href="http://www.sycard.com/cflash1.html">Sycard Technology</a>.</p>

<p>Lastly, for those of you who work wonders with a soldering iron, I have a
diagram of the <a href="media/CFtoIDE.pdf">circuit</a> you can build in
order to fabricate your own IDE to CF device.  Some things are not labeled.
JP1 is a power connector.  If your CF has 5v power, you can connect J2 and
get power that way.  On JP1, pin 1 is +5v, pin 2 and 3 are Gnd.  There are
two connectors (a 44-pin for laptop and a 40-pin for desktop hard drives),
but only use one at a time.  The capacitor is a .1uF ceramic decoupling
capacitor.  The resistor and the capacitor can both be omitted and it will
still work.</p>

<p>Also, if you like pin mappings and whatnot, take a look at page 40 of the <a
href="media/cfspc3_0.pdf">CompactFlash Specifications</a>.

<?php

AquaStop();
