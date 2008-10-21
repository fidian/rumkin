<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
?>

<p>You should never get this file when using the uploader.  It happens when
files are linked directly without a <?PHP echo FAQLink('gcd', 'GCD') ?> file.  You
must link to a <?PHP echo FaqLink('gcd', 'GCD') ?> file instead of the image or MIDI
file.  Also, you <i>must</i> have the correct <?PHP echo FAQLink('mime_type',
'MIME type') ?> for both the target file and the <?PHP echo FAQLink('gcd', 'GCD')
?> file.</p>
