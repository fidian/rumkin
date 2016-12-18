<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2007 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>If you are trying to install the uploader on your own site and you get
this error message when visiting / using the jump page ...</p>

<blockquote>Could not run query (select * from Phones where ID = jump.php) ==
Unknown table 'jump' in where clause</blockquote>

<P>The problem is most likely that you do not have PHP running as an Apache
module.  If it is running as an external CGI, then the
$_SERVER['REQUEST_INFO'] variable doesn't have the information that I am
expecting.</p>

<p>There used to be a patch floating around to make this work again, but I
have since lost it.  If anyone wants to write that patch again, just let me
know and I'll add it to my site for everyone to use.</p>