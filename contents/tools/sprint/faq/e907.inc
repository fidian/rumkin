<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>Not sure.  Seems to be a generic error message.  Known solutions for 
this problem include:</p>

<ul>
<li>One person replaced the server name with the IP address in the
<?php echo FAQLink('gcd', 'GCD') ?> file and the data error was fixed.  
(Probably had issues with Sprint's <?php echo FAQLink('cache', 'caching technique') ?> or maybe a DNS lookup failure.)
<li>Make sure the full and complete URL is listed in your <?php echo FAQLink('gcd', 'GCD') ?> file.  Relative URLs are not allowed.
<li>If uploading a midlet, make sure the full and complete URL is listed
in your .jad file.  Relative URLs do not work.
<li>If uploading a midlet, make sure your .jar has a "META-INF/MANIFEST.mf"
file (case sensitive).
<li>If there is an HTTP error code, such as a 404 error, returned from the 
server, the phone will display the Data Error 907.
<li>If the file is too big for the phone, it might say Data Error 907.
</ul>
