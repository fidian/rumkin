<?PHP

require '../../functions.inc';

StandardHeader(array('title' => 'Pocket Queries',
		     'topic' => 'gps'));
?>

<p>I take advantage of the power of the pocket queries at <a
href="http://www.geocaching.com/">Geocaching.com</a>, but there are a few
minor annoyances that I find with them and try to cope with the best I can.
The largest problem is that there are way more than 500 waypoints in my
area.  I can easily travel 20 miles, and there are 500 within 18 miles of my
home.  Also, I like to keep a little page with information about the cache
on my laptop if possible, so I can view the cache info at the cache.</p>

<p>I also believe that having more of a good thing is also good.  I download
the caches from <a href="http://www.navicache.com">Navicache</a> on a weekly
basis and they are also added to my master .gpx file.</p>

<p>I solve these issues by making multiple pocket queries that are sent
automatically to my email account.  My Linux server manages the caches and
merges the files together.  Old pocket queries get removed automatically, so
I can rename them and make special occasion queries without worry about
filling up my hard drive.  Individual HTML files are created for each cache
and Microsoft Streets and Trips CSV files are created (as soon as I get
DeLorme's software, M$'s garbage product will be removed from my computer).
URLs in the CSV file are altered to point to my local hard drive.</p>

<p>I don't do any extra work besides downloading a .zip file whenever I like
and the points are updated.  The HTML files are stripped for size, so you
can make a Plucker file or keep them on your laptop/handheld without much
worry.  This whole process is accomplished with a few tools.  You will need
procmail, shell access, PHP4 (as a CGI processor), gpsbabel, zip, and some
other standard command-line tools.</p>

<dl>

<dt><a href="auto_process/procmailrc.txt">procmailrc.txt</a></dt>
<dD>The procmail rules to process only incoming Pocket Queries.  Rename to
procmailrc and edit it (if needed) to match your directory structure.</dd>

<dt><a href="auto_process/geocache_shell.txt">geocache_shell.txt</a></dt>
<dd>The shell script that does the processing.  Rename to geocache_shell.
Change all references to ~fidian/public_html/geocaching to whatever
directory you want the processing done in.</dd>

<dt><a href="auto_process/geocache_regen.txt">geocache_regen.txt</a></dt>
<dd>The regen script will regenerate all of the cache files.  Useful if you
do not want geocache_shell to regenerate the caches automatically and if you
would rather use cron to do it every morning or something.  Again, change
directories as appropriate.</dd>

<dt><a href="auto_process/gpx2html.txt">gpx2html.txt</a></dt>
<dd>This PHP script will read in a GPX file and write out an individual HTML
file for each waypoint.  Rename to gpx2html.php and put into the processing
directory you set in geocache_shell.</dd>

<dt><a href="auto_process/navicache.txt">navicache.txt</a></dt>
<dd>Rename this to navicache and edit it to suit your needs.  The script
retrieves caches from navicache and then re-runs geocache_regen.  You'll
need to change the paths in this file as well.

</dl>

<p>When this works, you will see new files in the processing directory.  You
should always see the gpx2html.php file.  For each pocket query that was
sent to your email account in the last 2 weeks, you will see the .zip file
(from the pocket query), the .gpx file (the data of the .zip), and a .csv
file (M$ S&amp;T).  There will be MANY directories that
contain HTML files for each cache, which all get regenerated every time.
Geocaching.gpx is created, containing all points from the other GPX files.
Geocaching.zip has all of the HTML files and the generated CSV file.</p>

<p>Watch out!  Known hazards:</p>

<ul>
<li>Don't include funky punctuation in your pocket query name.  Only
numbers, letters, and spaces are fine.
<li>Don't name any of your pocket queries Geocaching.
<li>If you include any caches from navicache, the resulting Geocaching.gpx
file is not able to be read by <a
href="http://www.clayjar.com/gc/watcher/">Watcher</a>, but the
Geocaching.zip file will contain the individual .gpx files that you can load
and use.
</ul>

<?PHP

StandardFooter();
