<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>Yes, but nobody seems to know for how long.  If you are writing your own
uploader and you change the data in a <?php echo FAQLink('gcd', 'GCD') ?> file or
change the data in the actual file you wish to transmit, the easiest thing 
to do is to change the file name.  Sprint's proxy caches both the
<?php echo FAQLink('gcd', 'GCD') ?> file and the target file.  If you try to
test a file and forget to upload it and Sprint's servers got a 404 error,
then you will not get good results by just uploading the file and trying
again.  Sprint's servers will remember that it got a 404 error and won't 
try again.</p>

<p>It's a royal pain in the butt, however it has an easy workaround.  Rename
both the <?php echo FAQLink('gcd', 'GCD') ?> file and the target file each time you
change either one.  Then try to download it again.</p>

<p>According to the Sprint Developer Forums, you can also use the
"Cache-Control" header (eg. "Cache-Control: no-cache") to prevent the proxy
from caching the page.  Some information about Cache-Control is available
from <a href="http://webmaster.info.aol.com/caching.html">AOL</a> and
<a href="http://www.mnot.net/cache_docs/">mnot.net</a>.  Make sure that you
do this <b>before</b> the problem hits -- otherwise you will need to wait a
while, rename the files, or do another trick to get things to work.  Also
using "Cache-Control: no-store" might work better for really dynamic data.</p>

<p>Lastly, trying to do cache control in the web page itself with meta tags
won't work.  Most proxies don't care about the actual content (i.e., the 
pragma meta tags) and only about the headers.</p>
