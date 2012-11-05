<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>Lots of older phones don't support MP3 files.  Some of the newer phones
also don't support MP3 files.  So, you can't just upload your MP3
file to your phone and guarantee that it will work.  However, please
feel free to try, and I wish you luck.</p>

<p>Phones that do not work can give you an error message such as
<?php echo FAQLink('e907', 'Data Error 907') ?>, or they might say that you need
an additional plugin in order to handle that particular MIME type.  As far
as I know, you won't be able to get any additional plugins for you phone.</p>

<p>If you do want to stick a MP3 file on your phone, I suggest that you make
it smaller.  Try to trim it to 30 seconds or less.  Also, since phones don't
have the best sound quality in the world, maybe decreasing the audio to mono
and 96 k/s would be a good idea.</p>

<p><a href="http://www.mrbass.org/ringtones/">mrbass</a> has a guide showing
how to use <a href="http://audacity.sourceforge.net/">Audacity</a> to make
your own MP3 ringers, <a href="http://ww.mrbass.org/ringtones/">step by
step</a>.</p>

<p>If you own a Motorola Rokr, you can install software to synchronize
address books and do things.  Apparently there is a tool that will let you
take any MP3, crop any part to make a ringer, and then resave it or upload
it to your phone.  I've been told that this software is easy to use and can
make ringers for other phones by saving the modified MP3 file and using the
uploader to send it to different phones.</p>

<p>If you have a Sprint phone, you can try to convert the sound clip into
<?php echo FAQLink('qcp', 'QCP format') ?> and see if that works.</p>

<p>If you have an LG phone (like the PM-225 or 5350), you can just rename
the file from an .mp3 to .qcp and try uploading that.  It turns out that LG
phones have a "block" of sorts.  They do not let you download .mp3 ringers,
but if you get an .mp3 song into the phone, they will let you play .mp3
files just fine.  I suggest you convert your .mp3 into a .wav file, trim it
to 25-30 seconds, and then reconvert it back to 32 or 48 k/s, 22,000 hz,
mono.  [Tip submitted by Brad729]</p>