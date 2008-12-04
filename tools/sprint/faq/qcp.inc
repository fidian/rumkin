<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>To make a ringer out of an MP3 file or a WAV file for <b>only Sprint
phones</b>, you need to convert it into a <a href="../formats.php">QCP</a>
file.  Detailed instructions are at the
<a href="http://www.sprintusers.com/forum/showthread.php?t=11225">SprintUsers
Forum</a>, or you can follow my instructions.</p>

<p>First, if you are not starting with a WAV file, you need to convert your
file (probably a MP3 file) into a WAV file.  Use 
<a href="http://www.google.com/">Google</a> and search for "mp3 to wav
freeware" (or whatever type of file you are starting with).  You can find
several good programs this way.  One nice program is 
<a href="http://www.dbpoweramp.com/dmc.html">dBpowerAMP Music
Converter</a>.</p>

<p>Now you need to downsample the WAV file to make it smaller and so that
PureVoice can convert it.  Change it to 8 khz (8,000 hz), 16-bit sound, 
and mono.</p>

<p>At this point, I strongly suggest using the Windows sound editor to make
it about 30 seconds long or shorter.  If you plan on using it as a ringer,
you likely won't hear any more than 30 seconds of your song.  By making it 
shorter now, you make the file a lot smaller.</p>

<p>Now you need to use Qualcomm's PureVoice <a
href="http://www.cdmatech.com/solutions/products/purevoice_download.html">Converter</a>.
Download and unzip it.  The converter is a little DOS-based program.  The
easiest way to run it is to just drag your WAV file on top of the program,
and it will automatically create a QCP file for you.</p>

<p>Sounds complicated?  Check out <a
href="http://www.ajc.com/blogs/content/shared-blogs/ajc/geek/entries/2006/03/16/my_ringaling.html">Geekboy'a
article</a> for the Atlanta Journal-Constitution.  He walks you through the
entire process, step by step.</p>

<p>Alternatively, I have been told that there is a program called "CMX
Studio" that can make QCP files easier and of a higher quality.</p>