<?php

include './functions.inc';
AquaStart('Inside The Pad');

?>

<p>We dissect an AquaPad, piece by piece, in order to expose the guts to the
public.  This is only to prevent others from taking apart their AquaPad
to just see what the insides look like.  Higher resolution (but maybe a
little blurry from me moving the camera) images are available when you click
on any of the smaller images on this page.</p>

<p align=center><a href="media/front.jpg">
<img src="media/front_small.jpg"></a></p>

<p>First thing is first -- what does the AquaPad look like on the outside?
This is a nice image of the front of the tablet.</p>

<p>On the left side, near the top, you can see the housing for the speaker.
Moving down, you can see the volume and contrast buttons.  From what I can
tell, they affect the hardware directly, and there is no on-screen indicator
of the current contrast setting or volume level.</p>

<p>At the top you see three LEDs.  From left to right, they are suspend,
power, and battery indicator (low battery / charging).
The right-hand side has the power switch and a microphone.</p>

<p align=center><a href="media/back_battery_stylus.jpg">
<img src="media/back_battery_stylus_small.jpg"></a></p>

<p>Here, you will see an image of the AquaPad already beginning to be
taken apart.  This is the stylish back.  The ridges make it easier to grab,
and the rubber feet really make it stick nicely to hard surfaces.</p>

<p>The battery compartment is opened and the battery is exposed right above
the tape measure.  The included stylus is between the AquaPad and the tape
measure, and it is usually housed on the right-hand side of the tablet.  The
plastic things screw apart like some Palm styluses, but there is no
paperclip thingie to reset the device, unlike the Palm styluses.</p>

<p>In the upper left, you will see two rubber pads (blue) and 8 screws.
That's how many screws hold this together.  Two screws are under the rubber
pads by the battery compartment.  Make sure to remove them before prying too
hard.  When you get them all off, and remove the stylus, the device will
easily come apart.</p>

<p align=center><a href="media/lcd.jpg">
<img src="media/lcd_small.jpg"></a></p>

<p>The front panel comes off, giving you a nice image of the LCD behind it and
my grubby fingerprints.  Disconnect the pink and white wires to the lower
right, unscrew the four screws, lift up the LCD, disconnect the two flat
cables on the left.  You are now down to a shield.  Take out three more
screws and disconnect the red and black wires for the microphone.
We are in business.</p>

<p><a href="media/motherboard_front.jpg">
<img src="media/motherboard_front_small.jpg"></a></p>

<p>Ahh, the motherboard.  Please note the standard SO-DIMM SDRAM in the
lower right.  Don't try to upgrade that.  See <a
href="upgrades.php#memory">Upgrading Memory</a> for more information.  
You can also see the battery, processor, and what looks like a potential 
IDE port.</p>

<p>At this point, you will see four screws on the motherboard.  Don't undo
them.  If you do, you will be unscrewing the housing for the PCMCIA slot.
It should stay with the motherboard.  Also, these screws are tiny, so you
might lose one and have to end up scouring your floor for quite some time in
order to find it.  Additionally, if you unscrew them, you might have one
heck of a time getting them back in.  Yeah, that's right.  Everything that
could have gone wrong did go wrong with me.  So, don't do it.</p>

<p>After undoing a set of orangish wires on the bottom, and the red/black wires
that head on over to the speaker, the motherboard is nearly free.  It takes
some gentle wiggling to the left in order to free it.  For the pictures,
I flipped the motherboard over (down) and out of the case.  So, the top of
the motherboard in the previous image is now the bottom of the next picture.  
The left and right remained the same.</p>
	
<p>When you put the motherboard back, make sure to be VERY careful with
the orangish wires on the bottom.  They can overlap the screw hole right
there, so when you put the shield back on, it could crunch the wires and
possibly expose them and ground out the wires on the motherboard and break
the wire and do other nasty stuff.  That took a long time for me to figure
out.  "When I put in this one screw, why does my AquaPad not boot
anymore?"  Yeah.  Another hour lost there trying to diagnose the problem,
and getting the wrong idea in my head that it was because of the shield
shorting something out.</p>

<p><a href="media/motherboard_back.jpg">
<img src="media/motherboard_back_small.jpg"></a></p>

<p>Please note the 32 meg Compact Flash card.  This is what holds Midori.
It is held in with a small piece of foam.  You can also see the PCMCIA slot
and the other CF port.  There's also a large heatsink for the processor that
transfers heat to the case, and out of the device without a need for a fan.</p>

<p>Careful when putting your device back together again!</p>

<?php

AquaStop();
