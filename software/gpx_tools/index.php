<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'GPX Tools for Geocaching',
		     'topic' => 'gpx_tools'));

?>

<p>This is a collection of free tools that will manipulate a GPX file that
you can get from <a href="http://www.geocaching.com">Geocaching.com</a> when
you are a premium member.  You can create "Pocket Queries" and get a listing
of caches all bundled into a GPX file.</p>

<p>With these tools you can change the names, descriptions, and symbols for
the waypoints in a very flexibile manner.  It is similar to how <a
href="http://www.gpxspinner.com">GPX Spinner</a> and <a
href="http://gsak.net">GSAK</a> will alter waypoints before sending them to
your GPS receiver.  You are also able to filter out waypoints to have a
certain sizes, types, difficulty, and terrain.  Coupled with <a
href="http://www.gpsbabel.org/">GPSBabel</a>, you have a powerful system
that can narrow waypoints geographically and send them to your GPS receiver
as well.</p>

<?PHP Section('gpxinfo'); ?>

<p><a href="gpxinfo.php">gpxinfo</a> lets you know some information about
the waypoints contained in a GPX file.  You can find out the number of
waypoints, the different difficulty levels, the number of caches with a
specific container size, and more.</p>

<?PHP Section('gpxfilter'); ?>

<p><a href="gpxfilter.php">gpxfilter</a> removes waypoints from a GPX file
that do not meet your specific requirements.  It can be used to filter out
caches based on difficulty, terrain, size, or cache type.</p>

<?PHP Section('gpxrewrite'); ?>

<p><a href="gpxrewrite.php">gpxrewrite</a> is based on the config file
used by <a href="http://www.gpxspinner.com">GPX
Spinner</a>, this allows for a very flexible set of rules to change waypoint
symbols as well as rewrite the name and description for each waypoint.
Instead of having your geocaches all called GCxxxx and the description
always containing the cache name, the waypoint can have the container type,
size, difficulty, terrain, and the "xxxx" part of the waypoint ID.  The
description can have the last 5 logs (F = found, D = didn't find it, etc.),
the hint, and if there are any travel bugs.</p>

<p>Everything is controlled by a single file that contains all of your
settings.  Once you get that set up, everything works like magic.</p>

<?PHP MakeBoxTop('center'); ?>
<table border=1 cellspacing=0 cellpadding=5>
<tr><th>Before</th><th>After</th></tr>
<tr><td>
<img src="media/not-found.gif"> GC1234<br>
Sample Cache Name
</td><td>
<img src="media/traditional.gif"> 1234 STB<br>
FFDFW 2.5 3 Sample Cache Name
</td></tr></table>
<center>There are more examples on the <a href="gpxrewrite.php">
page</a>.</center>
<?PHP MakeBoxBottom(); ?>

<?PHP Section('Compiling'); ?>

<p>These programs require the expat library, but then should compile cleanly
by executing your traditional "<tt>./configure</tt>" followed by 
"<tt>make</tt>".  Running "<tt>make install</tt>" copies the files to
/usr/local/bin unless you define an alternate path with the configure
command.</p>

<p>There is sometimes a slight hang-up with the expat library.  On one of my
systems I have to include expat.h and the expat library (Debian).  On
another, I have to include xmlparse.h and the xmlparse + xmltok libraries.
Since I have switched over to the automake system, I have not yet determined
if this works well.  If it does not detect the expat library automatically,
you should be able to use a configure option to specify where the library is
located.</p>

<?PHP Section('Licence'); ?>

<p>The gpx_tools package is released under the GNU General Public License,
as published by the Free Software Foundation; either version 3 of the
License, or (at your option) any later version.  See the GNU GPL
<a href="http://www.gnu.org/licenses/">Licenses Page</a> for more
information.</p>

<p>In short, this is very similar to freeware - you are essentially free
to use the program for whatever use you see fit.  If you are a
programmer-type-person, you can also get the source code to the software
and make changes to suit your will.</p>

<?PHP

StandardFooter();
