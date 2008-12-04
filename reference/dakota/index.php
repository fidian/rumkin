<?php

require '../../functions.inc';
StandardHeader(array(
		'title' => 'Dakota Digital Single-Use Camera',
		'topic' => 'reference'
	));
MakeBoxTop('left');
echo '<a href="dakota_software.zip">Download<br>Software</a>';
MakeBoxBottom();

?>

<p>As is covered elsewhere on the net, Ritz is selling a "Dakota Digital
Single-Use Camera" for about $11, and they want you to return it for
processing (and they keep the camera at this point) for another $11.  You
get a CD with the images and a printed index.</p>

<p>To be able to download the photos yourself would be very nice, so
wonderful people have put together many sites on the subject.  This one will
just show the steps required to stick a mini-USB port in the camera with
as little modifications as possible.  With the USB port, you can use <a
href="media/dakota_software.zip">this software</a> to download the pictures from
your camera and erase them from the camera's memory.</p>

<img src="media/in_box.jpg">

<?php Section('Specs'); ?>

<ul>
<li>Weight: 5.3 oz
<li>Size: 4" x 2.6" x 1.5"
<li>Image Resolution: 1280 x 960
<li>1.31 Megapixels
<li>10 second timer
<li>Flash
<li>16 megs SDRAM
<li>2 x AA batteries
<li>Can store 25 pictures
</ul>

<?php Section('Things I Have Done'); ?>

<p>I have taken the information from other places on the web and just took
it a tiny step further.  I altered a set of cameras to have a standard
mini-USB port on it, then sealed the deal in epoxy to make it a solid,
durable, cheap camera.  This thing is great for kids, espeically since
everything costs under $20 and the kids can download pictures on their
own.</p>

<ol>

<li><b>Get The Equipment:</b>  You will require the following parts:

<ul>
<li><i>Dakota Digital Camera</i> - Get it from Ritz.  You'll need to walk
into a store to order it because the web site doesn't sell them.  I have 
not tested the one from Walgreens, but it is said that they use slightly
different hardware.</li>
<li><i>Ribbon Cable</i> - You will need about 2 inches of it with at least
4 wires.  Feel free to chop up a spare IDE cable or something.</li>
<li><i>USB Mini-B Receptacle</i> - I purchased mine at <a
href="http://www.ntcdistributing.com/products/usbcon.htm">NTC
Distributing</a></li>
<li><i>Mini-USB Cable</i> - Standard end on one side, mini-USB plug on the
other.  (See below)</li>
<li><i>Epoxy</i> - Something that bonds with metal and plastic.  Super Glue's
Plastic-Fusion works great, but try to get some slow setting stuff if you
can.</li>
</ul>

If you don't have the Mini-USB cable already, don't get one from Best Buy,
CompUSA, Circuit City, or other stores.  They will rip you off and charge
$20 or more.  Get one from an electronics hardware store or online.  You can
get them for $2 to $8.  <a
href="http://www.ntcdistributing.com/products/usbcables.htm">NTC
Distributing</a> sells them also.  (<i>I only recommend them because they
filled my order swiftly and properly.  I don't work for them or anything.
Use whomever you desire for parts.</i>)</li>
	
<li><b>Take Pictures:</b>  Take a couple pictures.  They will be needed when
you have the camera apart and you want to test downloading images.  Have at
least 1 picture in the camera's memory.</li>

<li><b>Prepare Camera:</b>  Dissassemble the camera.  I'd even suggest
unsoldering the wire from the battery compartment so you don't need to worry
about it flopping around when you work.  It won't be needed until you put
the camera back together again.  Put a little solder on the gold contacts
that you will be using (see the schematic below).  If the solder won't stick,
you should scuff up the gold contacts a bit.  Just scratch them with a
sharp piece of metal, or rub fine grain sandpaper on them.  You only need to
create a small bit of texture so the solder will stick to the metal.
Alternatively, I have read that you can use some conductive silver paint.
<br><img src=media/inside.jpg>
<br><img src=media/battery_compartment.jpg>
</li>

<li><b>Prepare Receptacle:</b>  Rip out the unused pin so you don't need to
worry about accidentally soldering stuff to it, and you get more space to
solder the other wires.  It is pin 4 on the receptacle.  See the diagram
near the bottom of this page or the photo below to determine which wire to
rip out.  Take your time with this step.
Do not pull out the wrong wire!  If you are a bit timid, you can bend the
wire out of the way, solder the rest, and once it works (the <B>Test</B>
step), you can pull out the wire then, or just leave it as is.  Also, this
is the time to dab a bit of solder on the leads for the receptacle to make
the next step go a bit faster.
<br><img src=media/pin_to_pull.jpg>
</li>

<li><b>Solder:</b>  Time to solder the wires onto the other parts.  Cut,
strip, put a bit of solder on the ends, then press the wire to the usb lead
or the gold contact, heat and pray that it works.  With the different wires
that I have tried, ribbon cable seems to work the best.  The stranded wire
is very flexible and sucks up solder readily.  Refer to the wiring diagram
to make sure you get the wires going to the right spots on the camera.
<br><img src=media/soldered_cable.jpg>
<br><img src=media/soldered.jpg>
</li>

<li><b>Test:</b>  Hook it up to your computer.  Get the software running
(see the links below or download this package for <a
href="dakota_software.zip">Windows</a> that contains the necessary drivers
and software.  If it doesn't work, then you did something wrong.
Double-check the wiring diagram, make sure that the wires did not come off
of the camera, and make sure you soldered the USB receptacle correctly.  It
took me forever to get this stuff soldered properly.  (Not sure if I should
admit that.)  Most of the time a wire came off the itty bitty USB 
receptacle.</li>

<li><b>Modify Battery Case:</b>  To get the USB connector securely situated,
I cut a tiny bit from my battery case.  This way the USB connector was flush
with the circuit board and was held down by the rest of the battery case.</li>

<li><b>Assemble:</b>  Screw on the battery case, push the wires around so
they fit in the propriatary connector, and test again.  If it doesn't work,
go back and see what went wrong.  You will also need to make sure that the
USB receptacle does <i>not</i> touch the other pads on the camera's circuit
board.  Use a spare piece of plastic, or a hunk of ribbon cable, or
anything.  Keep the USB port away from the other contacts.
<br><img src=media/before_fill.jpg>
</li>

<li><b>Epoxy:</b>  Any receptacle on a device can go through tons of stress.
I securely epoxied my USB receptacle and wiring to the battery case and the
circuit board.  This means that it's all set in stone now, but I shouldn't
need to open the camera up again.
<br><img src=media/done.jpg>
</li>

<li><b>Test Again:</b>  And if it doesn't work, you might be out of luck.
Try to test while the expoxy has not yet set, so if it does not work, you
can rip the parts out as fast as possible.  (I already lost 1 camera at
this step.)</li>

<li><b>Wait:</b>  Let the epoxy set.</li>

<li><b>Finish Assembling:</b>  Pretty self-explanatory.</li>

<li><b>Enjoy!</b>  You should now be done.</li>

</ol>

<?php Section('Wiring Diagram'); ?>

<p><img src="media/wiring.png"></p>

<table border=0>
<tr><td>
  <table border=1>
  <tr><th colspan=3>USB Pinout</th></tr>
  <tr><th>Pin</th><th>Color</th><th>Signal</th></tr>
  <tr><th>1</th><td>Red</td><td>+5 v</td></tr>
  <tr><th>2</th><td>White</td><td>Data -</td></tr>
  <tr><th>3</th><td>Green</td><td>Data +</td></tr>
  <tr><th>4</th><td>Key</td><td>Not connected</td></tr>
  <tr><th>5</th><td>Black</td><td>Ground</td></tr>
  </table>
</td><td>
  <table border=1>
  <tr><th colspan=2>Camera Pinout</th></tr>
  <tr><th>Pin</th><th>Signal</th></tr>
  <tr><th>1</th><td>R57, not stuffed</td></tr>
  <tr><th>2</th><td>Ground (battery -)</td></tr>
  <tr><th>3</th><td>R18-via-r68-r47</td></tr>
  <tr><th>4</th><td>R25, not stuffed</td></tr>
  <tr><th>5</th><td>R5 (1k ohm)</td></tr>
  <tr><th>6</th><td>5v in from USB (red wire)</td></tr>
  <tr><th>7</th><td>Ground</td></tr>
  <tr><th>8</th><td>USB Data + (green wire)</td></tr>
  <tr><th>9</th><td>USB Data - (white wire)</td></tr>
  <tr><th>10</th><td>USB Ground (black wire)</td></tr>
  </table>
</td></tr>
</table>
	
<p>Some people report that sending the ground to pin 7 instead of pin 10
works better for them.</p>

<?php Section('Links'); ?>

<ul>

<li><a href="http://revjim.net/wiki/DakotaDigitalCamera">Reverend Jim's
Wiki</a> - Lots of information about how the Ritz camera was usably hacked
and all about the hardware.

<li><a href="http://cexx.org/dakota/">Windows Software</a> and information
about the camera.

<li><a
href="http://frutsel.terrainhost.com/frutselapp/dump/dakota/images.htm">Sample
Images</a>

<li><a href="http://earth.prohosting.com/puredig/">Walgreens Camera
Information</a> - Similar to the Ritz camera.  Slightly different hardware,
slightly different communication.  Same information for how to connect the
USB connector.</li>

<li><a
href="http://www.maushammer.com/systems/dakotadigital/DakotaDigital.html">Software
for Linux, Mac</a> - Also contains a lot of information, links, and sample
images

<li><a href="http://www.cexx.org/dakota/pv2.htm">Dakota PV2 Series</a>
information (the one with the LCD)

<li><a href="http://www.maushammer.com/systems/dakotadigital/lcd.html">LCD
Camera</a> information

</ul>

<?php

StandardFooter();
