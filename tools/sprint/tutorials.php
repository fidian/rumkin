<?php
include 'common.inc';
SprintStandardHeader('Phone Uploader');

?>

<p>I greatly appreciate the work that <a href="http://www.youtube.com/user/JarrodJS">JarrodJS</a> has put into making some videos on how to use this site.</p>

<?PHP

Section('Ringers');
YouTube('dzQWKWZurMQ', array('float' => 'right')); // Create a ringer

?>

<ol>
<li>Find a good chunk of audio that you want to turn into a ringer.
<li>Use free software to crop, run a high pass, run a low pass, and normalize the sounds.
<li>Save and convert to MP3 using an online tool.
<li>Upload to this web site.
<li>Use your phone's browser to go to the jump page and enter the jump code.
<li>Download the file to your phone.  It should now be an available ringer on your phone.  If not, please go to the <a href="/tools/decision_tree/index.php?Tree=uploader">problems troubleshooter</a>.
</ol>

<?PHP

Section('Wallpapers');
YouTube('Mo6TOw0EqK4', array('float' => 'right')); // wallpapers

?>

<ol>
<li>Find a picture and save it on your computer.
<li>Resize it to fit your phone's screen.  The uploader will do this automatically for you on some phones.
<li>Upload it to the uploader.
<li>Use your phone's browser to go to the jump page.
<li>Enter the jump code.
<li>Download to your phone.  If things work out well, you should now be able to set it as a wallpaper somehow.  Otherwise, check out the <a href="/tools/decision_tree/index.php?Tree=uploader">problems troubleshooter</a>.
</ol>

<?PHP

Section('Scaling Down Images');
YouTube('8X2JPFw93YM', array('float' => 'right'));  // scale down images

?>

<ol>
<li>Find a picture from your digital camera and load it in Paint.
<li>Resize it smaller so it loads much faster.  <i>NOTE:  You may need to resize and crop it so it exactly fits your phone.  That is not covered in this video.</i>
<li>Upload it to the uploader.
<li>Use your phone's browser to go to the jump page.
<li>Enter the jump code.
<li>Download the smaller image to your phone.  Depending on your phone, you may experience some <a href="/tools/decision_tree/index.php?Tree=uploader">issues</a>
</ol>

<?PHP

Section('Applications');
YouTube('tj6Ejg2ZHLo', array('float' => 'right'));  // app

?>

<ol>
<li>Find an application for your phone and save it on your computer.
<li>Upload it to the uploader.
<li>Use your phone's browser to go to the jump page.
<li>Enter the jump code.
<li>Download the program to your phone.
<li>Test the program.  It might not work for your phone, so don't get too upset if there are <a href="/tools/decision_tree/index.php?Tree=uploader">problems</a>.
</ol>

<?PHP

StandardFooter();
