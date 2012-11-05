<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

?>

<p>MIME types are descriptions of the contents of a file.  For a .jpg image,
the MIME type is "<?php echo $GLOBALS['File Types'][FILE_TYPE_JPG][1] ?>".
With the proper MIME type, the receiver knows instantly how to handle 
the incoming file.</p>

<p>Sprint's servers are just a bit more picky.  They require specific MIME
types to be sent by a web server in order for a file to make it to your
phone.  Here is a list of file extensions and their MIME types.</p>

<table align=center border=1 cellpadding=3 cellspacing=0>
<tr><th>Extensions</th><th>MIME type</th><th>Notes</th></tr>
<?php

foreach ($GLOBALS['File Types'] as $data) {
	echo '<tr><th>';
	
	if (is_array($data[0]))echo join(', ', $data[0]);
	else echo $data[0];
	echo '</th><td>' . htmlspecialchars($data[1]) . '</td><Td>' . htmlspecialchars($data[2]) . "</td></tr>\n";
}

?></table>

<p>For more information on the file formats see the <a
href="../formats.php">Formats Page</a>.</p>
