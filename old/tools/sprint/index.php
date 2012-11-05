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

$sendToMessage = "Enter your <a href=\"faq/index.php?Topic=sms_emails\">SMS email address</a> if you want a text message sent to your phone.  Sprint users can enter just their phone number.<br>If you leave this blank, you can use the generated <a href=\"faq/index.php?Topic=jumpcode\">jump code</a> to get the file.";

?>

<p>Send ringers, images, games, and screensavers to your phone with this tool.  It is provided completely <a href="faq/index.php?topic=charge">free of charge</a>.  Make sure you have a data plan and can access the internet; <i>your carrier</i> may charge you if you do not.  It will probably work with your phone &mdash; give it a try.</p>

<p>New here?  Check out the <a href="tutorials.php">video tutorials</a>.  Have questions?  Take a look at the <a href="faq/">FAQ</a>.  Experiencing problems?  Run through the <a href="../decision_tree/index.php?Tree=uploader">"Problems?" troubleshooter</a>.</p>

<?php Section('Upload Wallpapers, Ringers, Etc.'); ?>

<form method=post action="upload.php" enctype="multipart/form-data">
<input type=hidden name=MAX_FILE_SIZE value=<?php echo $GLOBALS['Max File Size'] ?>>
<input type=hidden name=handle value=upload>	
<table align=center border=1 cellpading=5 cellspacing=0>
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
  <th>Send To<br><font size="-1">(Optional)</font></th>
  <td><input type=text name="sendto" size=40 value=""><br>
      <font size="-1"><?PHP echo $sendToMessage; ?></font>
  </td>
</tr>
<tr>
  <td colspan=2 align=center><input type=submit value="Upload File"></td>
</tr>
</table>
</form>

<?php Section('Upload Games, Applications, Java Midlets'); ?>

<form method=post action="upload.php" enctype="multipart/form-data">
<input type=hidden name=MAX_FILE_SIZE value=<?php echo $GLOBALS['Max File Size'] ?>>
<input type=hidden name=handle value=upload2>
<table align=center border=1 cellpading=5 cellspacing=0>
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
</tr>
<tr>
  <th>Send To<br><font size="-1">(Optional)</font></th>
  <td><input type=text name="sendto" size=40 value=""><br>
      <font size="-1"><?PHP echo $sendToMessage; ?></font>
  </td>
</tr>
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
<a href="formats.php#amr">amr</a>, <a href="formats.php#wav">wav</a>,
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

<p><b>Will it mess up my phone?</b></p>

<p>Probably not.  Hundreds of thousands of files have been sent to phones.  However, if this messes up anything on your phone, you take all responsibility.</p>

<p><b>What if my question isn't answered here?</b></p>
	
<p>Don't worry.  I have a whole page set up to answer
<a href="faq/">Frequently Asked Questions</a>.  You will likely find
your answer there.  I commonly get questions about my <a href="faq/index.php?Topic=privacy">privacy policy</a>, how much this uploader <a href="faq/index.php?Topic=charge">charges</a>, and how to <a href="../decision_tree/index.php?Tree=uploader">troubleshoot problems</a>.</p>

<?php

StandardFooter();
