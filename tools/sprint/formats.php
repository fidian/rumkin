<?PHP
/* Sprint File Uploader
 *
 * Copyright (C) 2003-2005 - Tyler Akins
 * Licensed under the GNU GPL software license.
 * See the LEGAL file for legal information
 * See http://rumkin.com/tools/sprint/ for more information about these tools
 */

include 'common.inc';

SprintStandardHeader('File Formats');

?>

<table border=1 cellpadding=5 cellspacing=0>
<tr><th>Extension</th><th>Type</th><th>Notes</th></tr>

<tr><th><a name="3gp">3gp</a></th>
<td align=center>Media</td>
<td>Text, compressed audio, and/or compressed video, specially designed
for use with mobile phones.  Explained a bit by RFC 3839.</td></tr>

<tr><th><a name="aac">aac</a></th>
<td align=center>Audio</td>
<td>MPEG-2 compressed audio.</td></tr>

<tr><th><a name="amr">amr</a></th>
<td align=center>Audio</td>
<td>Compressed mono audio for GSM networks.</td></tr>

<tr><th><a name="gif">gif</a></th>
<td align=center>Image</td>
<td>Typically cartoonish or images with a limited number of colors.  It used
to be a much more popular format, but it is being phased out slowly.  If you
want your animated gif on your phone, you might need to convert it to pmd
format first.  Check out the <a href="links.php#info">links page</a> for
other sites that detail this process.</td></tr>

<tr><th><a name="jad">jad</a></th>
<td align=center>App Desc</td>
<td>Java midlet descriptor.  This gives information about the Java 
program, such as which category the program should go into, the midlet's
name, and who made it.  Most of the same information is already in the
Manifest file in the java archive (the .jar file), so I just use that to
generate a .jad file.  Also, since Sprint is so gosh darn picky, having the
uploader write its own .jad file tends to work better.</td></tr>

<tr><th><a name="jar">jar</a></th>
<td align=center>Application</td>
<td>Java midlet program.  This is the compiled Java program.  Many fun games
and other applications are made into Java midlets.</td></tr>

<tr><th><a name="jpg">jpg, jpeg</a></th>
<td align=center>Image</td>
<td>Compressed images that are usually photographs.  Great format.  
Life is good.</td></tr>

<tr><th><a name="m4a">m4a</a></th>
<td align=center>Audio</td>
<td>The compressed audio layer from an <a href="#mp4">mp4</a> file.</td></tR>

<tr><th><a name="mid">mid, midi</a></th>
<td align=center>Music</td>
<td>These are tiny sound files.  It is essentially "sheet music" that your
phone translates into a song.  Great for the small size.  Most often, they 
are used as polyphonic ring tones. 
<a href="http://www.anvilstudio.com/">AnvilStudio</a> is free and
will let you edit midi files.</td></tr>

<tr><th><a name="mmf">mmf</a></th>
<td align=center>Audio</td>
<td>Another version of compressed music.  Same suggestions go for this one
as for the <a href="#mp3">mp3</a> format.</td></tr>

<tr><th><a name="mp3">mp3</a></th>
<td align=center>Audio</td>
<td>Compressed music, and a very common format for music that you will find
online.  If you are sending this to your phone, most likely you will want to
make it mono and some low bitrate to keep the size down.  Lots of phones
don't support mp3 files, but the non-Sprint phones seem to support them more
than the Sprint phones.  I might suggest only 30 second clips, and downgrade
them to mono, 96k/s or similar.</td></tr>
	
<tr><th><a name="mp4">mp4</a></th>
<td align=center>Media</td>
<td>Compressed video that some of the newer phones support.</td></tr>

<tr><th><a name="pmd">pmd</a></th>
<td align=center>Media</td>
<td>These are animations, screen savers, or little movies.  
To create them, you need either KTPIC or auAM.  A bit of information
about KTPIC is on <a href="http://www.craiggiven.com/ktpic.htm">Craig
Given's</a> site.  They are alternatively called CMX files (Quallcomm CMS
[Compact Media Extensions]).
You can get more information on the 
<a href="http://www.cdmatech.com/solutions/products/cmx.jsp">format</a> and
read a <a href="http://www.cdmatech.com/solutions/pdf/cmx_faq.pdf">FAQ</a>
on this type of file.  You can download CMX Studio from
<a href="http://www.faithwestinc.com/tdl/getcmx.htm">Faith West Inc.</a>
Also, there are other sites listed on the <a href="links.php#info">links
page</a> that tell you how to convert files into pmd format.</td></tr>

<tr><th><a name="png">png</a></th>
<td align=center>Image</td>
<td>Designed to replace <a href="#gif">gif</a> because Unisys irritated 
programmers about a software patent.  A good format to pick for your 
phone or web site.  Better compression for cartoons and animations.</td></tr>

<tr><th><a name="qcp">qcp</a></th>
<td align=center>Audio</td>
<td>Highly compressed audio.  You can compress any
sound instead of having just specific instruments.  The format is made by
Qualcomm PureVoice (<a
href="http://www.cdmatech.com/solutions/products/purevoice.jsp">info</a>)
and you can convert <a href="#wav">wav</a> files into qcp format with their <a
href="http://www.cdmatech.com/solutions/products/purevoice_download.html">converter</a>.
Just make sure you start with a 8 khz (8,000 hz), 16-bit, mono .wav file.
Detailed instructions are on the <a
href="http://www.sprintusers.com/forum/showthread.php?t=11225">SprintUsers</a>
forum.  Seems to be supported by just Sprint phones.
</td></tr>
	
<tr><th><a name="wav">wav</a></th>
<td align=center>Audio</td>
<td>Uncompressed audio.  This is the "standard" for ripping music (before it
is compressed to mp3), and it is a common Windows file format.  If you want
to play this on your phone, make the sound smaples short, mono, and probably
8khz.</td></tr>

<tr><th><a name="wbmp">wbmp</a></th>
<td align=center>Image</td>
<td>Wireless BMP files -- not the same as a Windows BMP file.  A 
Windows BMP file can be converted into a wbmp file with
WapTiger's <a href="http://www.waptiger.de/download/">bmp2wbmp</a> utility,
or you can use their <a href="http://www.waptiger.de/bmp2wbmp">online
form</a>.  This is a black and white format only.</td></tR>

<tr><th><a name="wma">wma</a></th>
<td align=center>Audio</td>
<td>An audio file that has been compressed into a Windows Media Player type
of format.  Much smaller than <a href="#wav">wav</a> files.</td></tr>

<tr><th><a name="wma">cab</a></th>
<td align=center>Data</td>
<td>Some phones let you send cab files as a way to transfer data.</td></tr>

</table>

<?PHP

StandardFooter();
