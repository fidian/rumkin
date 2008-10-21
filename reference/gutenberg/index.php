<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Project Gutenberg',
		     'topic' => 'reference'));

$Books = array(
   '2000010' => array('author' => 'Verne, Jules',
		      'title' => '20,000 Leagues Under The Sea'),
   '2000010a' => array('author' => 'Verne, Jules',
		       'title' => '20,000 Leagues Under the Seas ' .
		          '(Translation of Vingt mille lieues sous les mers)'),
   'alice30' => array('author' => 'Carroll, Lewis',
		      'title' => 'Alice\'s Adventures in Wonderland'),
   'crsto12' => array('author' => 'Dumas, Alexandre',
		      'title' => 'Count of Monte Cristo, The'),
   'doroz10' => array('author' => 'Baum, L. Frank',
		      'title' => 'Dorothy And The Wizard In Oz'),
   'dmoro11' => array('author' => 'Wells, H. G.',
		      'title' => 'Island of Doctor Moreau, The'),
   '8jrny10' => array('author' => 'Verne, Jules',
		      'title' => 'Journey to the Interior of the Earth'),
   'sfrbn10' => array('author' => 'Wyss, Johann David',
		      'title' => 'Swiss Family Robinson'),
   'lglass19' => array('author' => 'Carroll, Lewis',
		       'title' => 'Through the Looking-Glass'),
   'treas11' => array('author' => 'Stevenson, Robert Louis',
		      'title' => 'Treasure Island'),
   'bill11' => array('author' => 'United States',
		     'title' => 'United States Bill of Rights'),
   'const11' => array('author' => 'United States',
		      'title' => 'United States Constitution'),
   'wizoz10' => array('author' => 'Baum, L. Frank',
		      'title' => 'Wonderful Wizard of Oz, The'),
);

?>
	
<p>Project Gutenberg (<a
href="http://gutenberg.net/">http://gutenberg.net</a>)
is a wonderful project.  They distribute public domain books and ones that
are outside of their copyright period.  All books are converted into plain
text, and several are in HTML and other formats.</p>

<p>I created this page to redistribute the Palm versions of the texts that
I have read.  Feel free to download and read them yourself!  The Project
Gutenberg legal notice is still at the top, so you will need to page down a
little to get to the story, but that should not bother you too much.</p>

<p>As for the file formatting, I have decided to use Plucker (look at my 
<a href="../palm/">Palm OS</a> page for the reader).  It was a hard
decision that was based upon several factors.  The list of factors is at
the bottom of this page.  So, for your reading enjoyment, I provide three
versions of each book:</p>
	
<ul>
<li><b>ZIP</b> - Zipped copy of the text version, just like it is on Project
Gutenberg.
<li><b>HTML</b> - Formatted as a web page, then zipped up.  Converted by 
a modified version of
<a href="http://www.ee.ryerson.ca/~elf/gut/">gut</a> (my version is
<a href="newgut">here</a>).
<li><b>Plucker</b> - The HTML version make into a Palm OS database.  Use
Plucker to view it.  Converted with JPluck.  These are ZLib compressed 
databases, so make sure you have ZLib on your Palm, in addition to Plucker.
Also, your version of Plucker must do seamless breaks.  Version 1.6.1 is known
to work wonderfully with these documents.
</ul>

<table align=center border=1 cellpadding=3 cellspacing=0>
<TR><TH>Book</th><th>ZIP</th><th>HTML</th><th>Plucker</th></tr>
<?PHP

foreach ($Books as $fnbase => $Data)
{
   echo '<tr><td><b>' . htmlspecialchars($Data['title']) . '<br>' .
      htmlspecialchars($Data['author']) . '</b></td>';
   FileLink($fnbase, '.zip');
   FileLink($fnbase, '-html.zip');
   FileLink($fnbase, '.pdb');
   echo "</tr>\n";
}

?>
</table>

<p>The reason I picked Plucker over the numerous other etext readers out there
is for the following points:</p>

<ul>
<li>Great compression ratio.  The uncompressed text format of <i>Swiss
Family Robinson</i> is 697k.  In DOC format, it is 411k.  For the zTXT
format used by Weasel Reader (a.k.a. Gutenpalm), it is 325k.  For Plucker,
it is 303k.
<li>HTML is the base, meaning you can get formatting, bold, italics, links,
and much more.  DOC and zTXT do not do that.
<li>The format is open (not proprietary).  If the Plucker project dies, the
format will live on.  If Peanut Reader dies, the format is dead.
<li>Autoscrolling support.  Yes, I know that CSpotRun, Weasel Reader, and
others also have it.  This is just one thing I looked for.
</ul>
	
<p>The big differences between Plucker, zTXT, DOC:</p>

<table border=1 align=center cellspacing=0 cellpadding=3>
<tr><th>Aspect</th><th>Plucker</th><th>zTXT</th><th>DOC</th></tr>

<tr><th>Compression</th>
<td>Uses Zlib<br>Awesome compression</td>
<td>Custom format<br>Great compression</td>
<td>Custom format<br>Good compression</td></tr>

<tr><th>Program Size</th>
<td>~180k (~250k for hi-res)<br>+30k for Zlib</td>
<td>~100k</td>
<td>~20k - 300k<br>Varies greatly with<br>different readers</td></tr>

<tr><th>Formatting</th>
<td>HTML - bold, italics, font sizes,<br>images, document links, etc.</td>
<td>Plain text</td>
<td>Plain text</td></tr>

<tr><th>Cool Things</th>
<Td></td>
<td>Also reads DOC files</td>
<td>Supported by many programs</td>

</table>

<p>Summary:  Plucker was chosen because of the superior compression, HTML
markup, and the ability to show links and images.  When I travel around with
ten or more books at once, the extra 20k or more per book that I save makes
up for the larger reader.  Weasel Reader (zTXT) was a close competitor,
especially since it can also read DOC files, but lost in the end due to the
lack of image support and because it doesn't do any HTML markup.  DOC is a
great format for a tiny viewer, but Palms have grown to have more memory and
the better compression scheme should be used for ebooks.</p>

<p>Plucker has its issues too; for example, when stopping autoscrolling it
needs to refresh the screen.  Also, I need to have Zlib installed, and that
library isn't small (about 30k).  But I only want one text reader on my Palm
if I can help it, thus I use Plucker.  Now, if Plucker could read or convert
DOC files, I would be in heaven.</p>

<?PHP

StandardFooter();


function FileLink($base, $ext)
{
   $fn = $base . '/' . $base . $ext;
   $mediaFn = getenv('MEDIABASE') . 'reference/gutenberg/' . $fn;
   
   if (! file_exists($mediaFn))
   {
      echo '<td align=center>-</td>';
      return;
   }

   $fs = FidianFileSize($mediaFn);
   
   echo '<td><a href="media/' . $fn . '">' . $base . $ext . '</a><br>' . $fs .
      '</td>';
}

