<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>This error pops up for many odd reasons.  I'll try to cover all of the
reasons that I have discovered.</p>

<p><b>Too Large</b> - Some phones don't allow uploads over 50k, so you need
to shorten your sound sample or decrease the size of the image you are
sending.</p>

<p><b>Invalid Image</b> - Make sure your images are not saved with
progressive encoding.  Also, you do not want EXIF information saved in the
.jpg file.</p>

<p><b>Bad <?php echo FAQLink('gcd', 'GCD') ?> File</b> - Double-check all of the 
information there (Content-Size, Content-Type, etc.) and verify that
the <?php echo FAQLink('gcd', 'GCD') ?> file only has LF newlines (Unix/Linux 
style) and not CR/LF (DOS/Windows style) or just CR (Macintosh).  
<i>(This won't happen if you are using this uploader.)</i></p>

<p><b>Midlets</b> - The Manifest file should only have LF newlines.
Additionally, the name, vendor, and version must match identically in 
the .jad file as it is in the Manifest file.  Also, case is important 
&ndash; the manifest file must be called META-INF/MANIFEST.mf.
<i>(The uploader just generates its own .jad file from the Manifest file, and
doesn't care about the case of the file, so it is a bit more flexible.)</i></p>

<p><b>Wrong MIME Type</b> - One user set up the uploader on his own machine,
and found out that his 905 errors were because Apache's MIME type for MP3 files
(audio/mpeg) was not the same as the delivered GCD file (audio/mp3).
<i>(This won't happen if you are using the uploader on rumkin.com)</i></p>