<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
?>

<p>Images bigger than the phone's screen might cause problems.  Try to
resize the image appropriately before sending it to the phone.  Also, images
take up a lot of room on your phone -- you might be sending a 5k .jpg file,
but it gets decompressed in the phone's memory and that could take quite a
bit more memory.  If you wish to get technical, it often takes (pixels wide)
x (pixels high) x (color depth) bits or more.</p>

<p>If you want to upload a midlet, the .jar and .jad files must be
identically named, except for the extension.</p>

<p>Specify the full, complete URL to the files in the .gcd and .jad files.
Also, the colon has only one space after it.
"Content-Type:&nbsp:image/jpeg" is good,
"Content-Type:&nbsp;&nbsp;image/jpeg" is bad.</p>

<p>Spaces in filenames is bad -- Sprint's servers will not be able to handle
them.  Also, keep filenames short in size if possible.  Long URLs also tend
to cause problems.  No exact figures available, but the numbers are welcome
if they ever get figured out.</p>
