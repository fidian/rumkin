<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
?>

<ol>
<li>Find the picture/ringer/game/whatever that you want to upload.  Make
sure it is saved on your computer.
<li>Go to the <a href="../index.php">upload form</a>
<li>If you are uploading a Java midlet (game or application), you need to
skip down to the second form.  If you are trying to upload a ringer, image,
or other type of file, use the first upload form.
<li>In the "Send To" box, enter one of the following:
  <ul>
  <li>Your Sprint cellular phone number that you want to send the file to.
  <li>Your phone's SMS email address (any phone carrier).
  <li>Leave it blank (no SMS message will be sent)
  </ul>
<li>Press the "Browse" button and find the file you want to send to your
phone.
<li><u>Not Java Midlets:</u>  Enter a description of the file.  This is what
it would be named on your phone, so make your name short and to the point.
<li><u>Java Midlets Only:</u>  If you like, you can specify where the midlet
will be saved on your phone.  You don't need to do this if you don't want to.
<li>Press the Upload button.
<li>Wait for the page to load.  It could take a while if you are uploading a
large file or if you are using a slow connection.
<li><u>If you entered your Sprint phone number:</u>  A text message will be
sent to your phone with the URL you need to go to in order to download the
file.
<li><u>If you entered your phone's email address:</u>  A text message will
be sent to your phone with the URL you need to go to in order to download
the file.
<li>A <?PHP echo FAQLink('jumpcode', 'jump code') ?> will be displayed on the
screen.  You can point your phone's web browser to the address shown and
type in the <?PHP echo FAQLink('jumpcode', 'jump code') ?> shown to download the
file.
<li>Your phone may prompt you about downloading the file.  Eventually, you
should be able to make it through any further hoops and the file should be
saved on your phone.
<li>From here, you are on your own.  Consult your manual for further
information.
</ol>
