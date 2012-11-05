<?php

require_once('inc/common.php');
PageHeader('Progress');

?>

<p>This is a progress report of the features I want to add and the features
I have already added to the new uploader.  It might be considered "too
geeky" for the average web surfer, and it certainly will be removed once the
uploader is finished, or at least to a stage where I can pretend it is
finished.</p>

<h2>Features To Add</h2>

<ul>
<li>Edit Uploads
  <ul>
  <li>Flash or Javascript image resizer and cropper
  <li>MIDI editor
  <li>Sound file converter (probably using command-line tools)
  </ul>
<li>Performance
  <ul>
  <li>Rewrite database cleaning functions
  <li>Modularize code to allow for easier integration with other software
  <li>Use path_info, request_uri, or GET method for passing options to
dl.php and desc.php
  <li>Make sure it works when you can't fopen() an uploaded file directly.
  <li>Generate non-sequential jump codes.
  <li>Automatically generate smaller thumbnails for large images to cut
down processing time.
  </ul>
<li>Gallery
  <ul>
  <li>Add, edit, remove gallery files
  <li>Have a system where people can suggest gallery files
  <li>Make a "lite" version for people who only want to have a simple
gallery on their site
  <li>Sorted on name, newest to oldest
  <li>Gallery pagnation should be a list of numbers
  </ul>
<li>Error checking
  <ul>
  <li>Use file markers to ensure that an uploaded image (such as a file
ending in .jpg) really is the type it claims to be
  <li>Strip out EXIM data from images to shorten downloads and fix problems
with some phones
  <li>Resave progressive .jpg images as non-progressive to fix problems.
  <li>When phone requests an image or ringer that it doesn't support,
convert the file if possible.
  <li>Setup script that detects what's available, sets up the database,
provides suggestions.
  </ul>
<li>UI
  <ul>
  <li>Add uploading.
  <li>Add the gallery.
  <li>Allow people to upload .jad files and reparse them.  If they uploaded
a .jar, ask if they have a .jad.  If not, just fall back on generating one
from the Manifest file.
  <li>Use provider's SMS forms when possible.
  <li>Give user the option to send a link (HTML) or just the address (text)
when sending the jump code via SMS.
  <li>Allow sysadmins to set the "default" provider for SMS messages.
  </ul>
<li>Admin
  <ul>
  <li>Delete files from the user uploaded section
  </ul>
</ul>

<h2>Completed Tasks</h2>

<dl>

<dt>21-06-2006</dt>
<dd>Simplified phone detection code to run faster and be more correct.
<dd>Started filling gallery with a couple files.
<dd>Added this progress page to keep track of the history of changes.

<dt>14-06-2006</dt>
<dd>Image processing uses GD2 and ImageMagick, depending on what is
available on the system.

<dt>31-05-2006</dt>
<dd>Gallery engine for filesystems is created.
<dd>Gallery jump code searches are complete.
<dd>Gallery jump codes are separate from user uploads.

<dt>27-05-2006</dt>
<dd>Can handle phone information in a file.
<dd>No database is required anymore.
<dd>Significantly more detailed phone information can be retrieved via the
jump page.

</dl>

<?php

PageFooter();
