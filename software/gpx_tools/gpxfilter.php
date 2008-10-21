<?PHP

include '../../functions.inc';

StandardHeader(array('title' => 'GPX Tools for Geocaching',
		     'header' => 'GPX Tools: gpxfilter',
		     'topic' => 'gpx_tools'));

?>

<p>Removes waypoints from a GPX file based on the criteria you specify.
This can be used to limit your geocaches by difficulty, terrain, size, and
cache type.</p>

<?PHP Section('Command Line Syntax'); ?>

<?PHP MakeBoxTop('center'); ?>
<tt>gpxfilter gpx_in.gpx gpx_out.gpx [filter [filter [...]]]</tt><br>
<br>
<i>Example:</i><br>
<tt>gpxfilter my_query.gpx filtered_list.gpx -maxterr 2 -mindiff 3.5 -size
MSRL -type TU</tt>
<?PHP MakeBoxBottom(); ?>

<p>You can use "-" instead of gpx_in.gpx and gpx_out.gpx to use stdin or
stdout instead of an actual file.</p>

<?PHP Section('Filters') ?>

<dl>

<dt><b>-mindiff ###</b></dt>
<dd>Sets the minimum difficulty level to keep.</dd>
<dd>Example to keep all caches with at least a difficulty of 1.5:  <i>-mindiff 1.5</i></dd>

<dt><b>-maxdiff ###</b></dt>
<dd>Sets the maximum difficulty level that should be kept.</dd>
<dd>Example to eliminate caches with a 4.5 or 5 difficulty:  <i>-maxdiff
4</i></dd>

<dt><b>-minterr ###</b></dt>
<dd>Sets the minimum allowable terrain value for geocaches.</dD>
<dd>Example to keep terrains that are over a 2:  <i>-minterr 3.5</i></dd>

<dt><b>-maxterr ###</b></dt>
<dd>Removes all caches with a terrain rating greater than the value
specified.</dD>
<dd>Example to eliminate terrains over a 4: <i>-maxterr 4</i></dd>

<dt><b>-size ....</b></dt>
<dd>Sets what sizes are allowed.  If you do not specify a size code here,
geocaches of that size will not make it through the filter.</dd>
<dd>U = Unknown<bR>M = Micro<br>S = Small<br>R = regular<br>L = Large<br>V =
Virtual<br>O = Other</dd>
<dd>Example to keep only physical caches with a listed size (micro through
large):  <i>-size MSRL</i></dd>

<dt><b>-type ....</b></dt>
<dd>Keeps only geocaches with the listed container types.</dd>
<dd>X = Benchmark<br>C = Cache In Trash Out Event<br>G = Earthcache<br>E =
Event Cache<br>B = Letterbox Hybrid<br>L = Locationless (Reverse) Cache<br>E
= Mega-Event Cache<br>M = Multi-cache<br>A = Project APE Cache<br>T =
Traditional Cache<br>U = Unknown Cache<br>V = Virtual Cache<br>W = Webcam
Cache</dd>
<dd>Example to keep only traditionals, multi-caches, and webcams: <i>-size
TMW</i></dd>

</dl>

<?PHP

StandardFooter();
