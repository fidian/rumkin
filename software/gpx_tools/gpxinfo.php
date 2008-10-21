<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'GPX Tools for Geocaching',
		     'header' => 'GPX Tools: gpxinfo',
		     'topic' => 'gpx_tools'));

?>

<p>Show aggregate information about all of the geocaches listed in a GPX
file.  The number of waypoints, some vital stats, and breakdowns of
attributes will be shown.</p>

<?PHP Section('Command Line Syntax'); ?>

<?PHP MakeBoxTop('center'); ?>
<tt>gpxinfo gpx_in.gpx</tt><br>
<br>
<i>Example:</i><br>
<tt>gpxinfo my_query.gpx</tt>
<?PHP MakeBoxBottom(); ?>

<p>It's pretty self-explanatory.  You can use "-" instead of "gpx_in.gpx" to
read the GPX file from stdin.  If that sounds too geeky, that's ok.  In the
end, you will get something like this:</p>

<?PHP MakeBoxTop('center'); ?>
<pre>Waypoints:  439
Available:  439
Archived:  0
ID Range:  662 - 95094
Latitude Range:  43.500717 - 48.603901
Longitude Range:  -96.623802 - -90.014969
Difficulty Counts:
        1:  113
        1.5:  110
        2:  135
        2.5:  45
        3:  26
        3.5:  5
        4:  4
        4.5:  1
Terrain Counts:
        1:  103
        1.5:  107
        2:  100
        2.5:  45
        3:  39
        3.5:  27
        4:  7
        4.5:  1
        5:  10
Type Counts:
        Traditional Cache:  356
        Virtual Cache:  49
        Multi-cache:  19
        Unknown Cache:  13
        Letterbox Hybrid:  2
Size Counts:
        Regular:  324
        Virtual:  44
        Micro:  22
        Small:  18
        Other:  16
        Not chosen:  12
        Large:  3
</pre><?PHP MakeBoxBottom(); ?>		

<p>There really isn't much to say about this tool.  I wrote it to make sure
that <a href="gpxfilter.php">gpxfilter</a> was really doing its job.</p>

<?PHP

StandardFooter();
