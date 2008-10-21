<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
?>

<p>A GCD file is just a simple text file that describes where the actual
resource is, what it is named, etc.  Format is important and order might 
be important.  Here is a sample.</p>

<?PHP MakeBoxTop('center') ?>
<pre>Content-Type: image/jpeg
Content-Name: jmaple.jpg
Content-Version: 1.0
Content-Vendor: Rumkin
Content-URL: http://rumkin.com/images/jmaple.jpg
Content-Size: 12384
</pre>
<?PHP MakeBoxBottom() ?>

<p>Important things to know about the GCD file:</p>

<ul>
<li>It must have Unix-style linefeeds (LF, not CR/LF or CR)</li>
<li>It must have 2 linefeeds after the Content-Size line</li>
<li>The server must respond with the MIME type "<?PHP echo
   $GLOBALS['File Types'][FILE_TYPE_GCD][1] ?>"</li>
<li>Content-URL must be the correct URL, and must be an absolute URL (it
must start with http:// or https://)</li>
<li>Content-Size must be the exact number of bytes of the file</li>
<li>Content-Type must match the MIME type returned by the server and must
match the MIME type in the <?PHP echo FAQLink('mime_type', 'Mime Type List') ?></li>
<li>Only some Content-Types are usable with some phones -- Not all
phones understand GIF images or MP3 files, for example</li>
<li>Avoid spaces in filenames
<li>Only one space comes after the ":" for all of the headers.
</ul>
