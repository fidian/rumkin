<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>This should not happen with the uploader.  It only happens when the number
of bytes listed in the <?php echo FAQLink('gcd', 'GCD') ?> file doesn't exactly match
the number of bytes of the Content-URL file downloaded.  The only causes
for this are that the <?php echo FAQLink('gcd', 'GCD') ?> file had the wrong size or 
the server didn't send out the file properly.</p>
