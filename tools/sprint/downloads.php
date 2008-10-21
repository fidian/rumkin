<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

require 'common.inc';

SprintStandardHeader('Uploader Downloads');

?>
	
<p>If you want to stay informed of updates to these scripts, I suggest you
subscribe to the Sprint <a href="/reference/email/lists.php">mailing list</a>
and have any news and notifications of code changes delivered to you.

<?PHP Section('<a href="messaging.inc">messaging.inc</a>'); ?>

<p>PHP function that will connect to Sprint's <a
href="http://messagings.sprintpcs.com">Messaging Server</a> and send a
properly formatted message.  This works far better than sending messages
with the email method, but you will need to update the script when/if Sprint
changes their messaging pages.</p>

<?PHP Section('<a href="makezip.php/uploader.zip">uploader.zip</a>'); ?>

<p>Want my uploader?  This file contains the PHP source code that is running
this uploader site.  To use it, you need a PHP web server and a MySQL 
database.  This is not software that runs on your home computer.  When you
download it, you get the absolutely latest version -- the zip file is 
created for you on the fly!  Can't beat that.  Apparently some browsers (IE)
has issues downloading the zip file, making it look password protected.
Try downloading it another way; there is <b>no password</b> on the zip file.</p>
	
<p>This comes with a live copy of the scripts that I have here, the
administration scripts, a quick and dirty message sending page, and other
things.</p>

<p>Older versions:</p>

<ul>

<li><a href="media/archive/older.zip">older.zip</a> - A really, really old copy of
the uploader.  This one uses the .jad file when you upload a .jar.

<li><a href="media/archive/20040203.zip">2004-02-03</a> - No database required
and doesn't resize images, but is also significantly less complicated than
what I'm running now.

<li><a href="media/archive/20051019.zip">2005-01-06</a> - Snapshot.

</ul>

<?PHP

StandardFooter();
