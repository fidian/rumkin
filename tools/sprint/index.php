<?php
/* Sprint File Uploader
 * 
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */
include 'common.inc';
SprintStandardHeader('Phone Uploader');

?>

<p>This completely free uploader will let you send ringers, images, games,
and screensavers to your phone. It works really well with Sprint PCS Vision
phones, but it also works just fine with phones from most of the other
providers. It has been used by thousands of people, but if it wipes out
your phone or does something bad, it is your fault (standard disclaimer).
Experiencing problems? Have suggestions? Email me &ndash; link at the 
bottom of the page.</p>

<p><b>Samsung N400 Users:</b>  You can only use your
<i>username</i>@sprintpcs.com address.  Entering in your phone number
will not work.

	
<?php Section('Upload Images, Sounds, Etc.'); ?>

<form method=post action="upload.php" enctype="multipart/form-data">
<input type=hidden name=MAX_FILE_SIZE value=<?php echo $GLOBALS['Max File Size'] ?>>
<input type=hidden name=handle value=upload>	
<table align=center border=1 cellpading=5 cellspacing=0>
<tr>
  <th>Send To<br><font size="-1">(Optional)</font></th>
  <td><input type=text name="sendto" size=40 value=""><br>
      <font size="-1">If you use Sprint, you can enter your 10-digit
      phone number.  If not, you can enter your SMS email address.  If you
      leave this blank, a jump code will be generated for you
      automatically.
      </font></td>
</tr>
<tr>
  <th>Description</th>
  <td><input type=text name="desc" size=25 maxsize=50><br>
      <font size="-1">The file will be named this on your phone.  
      Keep it short.</font></td>
</tr>
<tr>
  <th>Filename</th>
  <td><input type=file name="fn" size=50></td>
</tr>
<tr>
  <td colspan=2 align=center><input type=submit value="Upload File"></td>
</tr>
</table>
</form>

<?php Section('Upload Java Midlets'); ?>

<form method=post action="upload.php" enctype="multipart/form-data">
<input type=hidden name=MAX_FILE_SIZE value=<?php echo $GLOBALS['Max File Size'] ?>>
<input type=hidden name=handle value=upload2>
<table align=center border=1 cellpading=5 cellspacing=0>
<tr>
  <th>Send To<br><font size="-1">(Optional)</font></th>
  <td><input type=text name="sendto" size=40 value=""><br>
      <font size="-1"><b>Sprint Users:</b>  Use your 10-digit phone number<br>
      <b>Everyone:</b>  Use your SMS email address to get a link delivered
      to you<br>
      Enter nothing and no SMS will be sent &ndash; use the jump code.
      </font></td>
</tr>
<tr>
  <th>JAR File</th>
  <td><input type=file name="jar" size=50><br>
      <font size="-1">This is the game, program, midlet, or other sort of
      application you want to run on your phone.</font></td>
</tr>
<tr>
  <th>Folder</th>
  <td><select name="fldr">
    <option value="default">Default Folder
    <option value="Applications">Applications
    <option value="Games">Games
    <option value="Others">Others
    <option value="userdef">Other (specify) --&gt;
    </select> <input type=text name=userdeffldr>
  </td>
<tr>
  <td colspan=2 align=center><input type=submit value="Upload Midlet"></td>
</tr>
</table>
</form>


<?php Section('Common Questions') ?>
	
<p><b>What files can I upload with this?</b></p>

<p>Here is a list of the different formats that the uploader supports.  Your
phone <u>may not support the file</u>, so some experimenation and trial &amp; 
error may be necessary.</p>

<ul>
<li><b>Images:</b> <a href="formats.php#jpg">jpg</a>, 
<a href="formats.php#gif">gif</a>,
<a href="formats.php#jpg">jpeg</a>, <a href="formats.php#png">png</a>, 
<a href="formats.php#wbmp">wbmp</a>, 
<a href="formats.php#cmx">cmx</a></li>
<li><b>Sounds:</b> <a href="formats.php#mid">mid</a>, 
<a href="formats.php#mid">midi</a>, <a href="formats.php#qcp">qcp</a>,
<a href="formats.php#mp3">mp3</a>, <a href="formats.php#mp4">mp4</a>,
<a href="formats.php#amr">amr</a>, <a href="formats.php#wav">wav</a>
<a href="formats.php#wma">wma</a></li>
<li><b>Misc:</b> <a href="formats.php#3gp">3gp</a>,
<a href="formats.php#pmd">pmd</a>,
<a href="formats.php#mp4">mp4</a></li>
<li><b>Midlets:</b> <a href="formats.php#jar">jar</a> 
(<a href="formats.php#jad">jad</a> files are not needed, nor can they be used)</li>
</ul>
	
<p>For a detailed description of the different file types, check out
the <a href="formats.php">File Formats</a> page.</p>

<p><b>What phones work with this uploader?</b></p>

<p>Lots and lots.  Probably yours.  For a detailed list of phone
manufacturers, models, and a brief list of capabilities, look in the
<a href="faq/index.php?Topic=phones">FAQ</a>.</p>

<p><b>What if my question isn't answered here?</b></p>
	
<p>Don't worry.  I have a whole page set up to answer
<a href="faq/">Frequently Asked Questions</a>.  You will likely find
your answer there.</p>

<?php Section('Privacy Information'); ?>

<p>I do not collect phone numbers nor email addresses submitted with this
program.  The information does go into the mail log, but I never look at
that unless there is a problem with my server, and I will not share
information in there without a warrant or other means of forcing me to hand
it over.  If you feel that this is still a security risk, you can email me
or just use <a href="links.php#uploaders">another tool</a>.</p>

<p>Files uploaded are stored in a database and are expired after a few days.
Also, information about who uploaded the file is not saved.</p>

<?php

StandardFooter();
