<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>There are several ways to report the screen size of a phone.  What I'm
interested in is the maximum size in pixels of an image that can be used as
wallpaper.  However, vendors and phone-related sites have various meanings
of screen size:</p>

<ul>
<li>Maximum screen size that is on the phone (physical size)
<li>Amount of area that the phone's firmware can access (includes the
"status bar" on top/bottom that shows signal strength and other things)
<li>Maximum image size for wallpaper (may or may not be able to fill the
area in the status bars)
<li>Area that a midlet can access (like the SysInfo midlet)
</ul>

<p>If your screen size doesn't match what I have, don't quite tell me about
it yet.  Try to determine what type of screen size you have.  If you are
using the SysInfo midlet, you should double-check to see if images can be
larger than what it reports.  In many cases, they can be bigger.</p>

<p>If possible, you should search the manual for your phone.  If you get to
the gory and boring technical specifications, it often will tell you the
maximum displayable image size.</p>

<p>If that fails, you could determine it with trial and error.
You should start with an image that is near to what you think your phone
accepts.  Then adjust the width bigger and smaller to see what the absolute
maximum is.  Do the same for the height.  Be careful and make sure you
adjust it slowly.  You should get the exact width and height of an image
that works, where one extra pixel wide or one extra pixel tall will not
fit.</p>

<p>The down side is that the uploader will resize images to be smaller than
what it thinks your maximum screen size is.  To avoid this, you should use
<a href="../links.php#uploaders">another uploader</a> that doesn't resize
images like this one.</p>

<p>This process can take a long time, but the information is very useful and
could help out everyone who has the same phone as yourself.</p>