<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
?>

<p>If you only have the .jad file and not the actual .jar file for a Java
Midlet (game, application, etc.), you can usually get the .jar file with
this process:</p>

<ol>
<li>[Try to do this]  Rename the .jad file to a .txt file.  So, if it was named SysInfo.jad,
it should be renamed to SysInfo.txt.  If you can't see the "file extensions"
and you aren't really a computer geek, skip to step 2.
<li>Double-click the file.  If you were able to rename it to a .txt file, it
should automatically open Notepad.  If not, you should associate .jad files
with Notepad.
  <ul>
  <li>Windows XP:  Pick the program from a list yourself.  When the list
pops up, select Notepad.
  <li>Windows 95, 98, 2000, NT:  When the list pops up, scroll down and
select Notepad.
  </ul>
<li>Look for "MIDlet-Jar-URL".  Copy the URL
("http://xxxxxxxx/xxx/xxxxx.jar").
<li>Open up a web browser and paste the URL into the address bar.
<li>You should download the .jar file to your computer.
<li>Now you can upload the .jar to your phone with this uploader.
</ul>
